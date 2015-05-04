/**
* Responseive Preload 1.0
*
* Load only images visible for the active media query
*
* @author Björn Wikström <bjorn@welcom.se>
* @license Apache License 2.0 <https://www.apache.org/licenses/LICENSE-2.0.html>
* @version 1.0
* @copyright Welcom Web i Göteborg AB 2015
*/
(function(name, definition) {
    if (typeof module != 'undefined') {
        module.exports = definition();
    } else if (typeof define == 'function' && typeof define.amd == 'object') {
        define(definition);
    } else {
        this[name] = definition();
    }
}('Respload', function () {
    
    /**
     * Helper method for iterating through arrays of nodes (as if they were an array),
     * and also used as a polyfill for browsers where Array.prototype.forEach is not available
     * 
     * @param fn    {Function}  Callback to handle the item
     * @returns     {Void}
     */
    Array.prototype.forEach = NodeList.prototype.forEach = Array.prototype.forEach || function (fn) {
        for (var i = 0; i < this.length; i++) {
            fn.call(this[i], this[i]);
        }
    };
    
    /**
     * Get the computed style for an element
     * 
     * @param el    {HTMLImageElement}  The img element to get the style from
     * @returns     {Object}
     */
    var getComputedStyle = function (el) {
        return window.getComputedStyle ? window.getComputedStyle(el) : el.currentStyle;
    };
    
    /**
     * Check the visibility of an element
     * Originally from http://stackoverflow.com/a/1069739/64495
     * 
     * @param el    {HTMLImageElement}  The img element to check
     * @returns     {Boolean}
     */
    var isElementVisible = function (el) {
        var width = el.offsetWidth,
            height = el.offsetHeight,
            force = (el.tagName.toLowerCase() === 'tr'),
            style = getComputedStyle(el);
        
        return (width === 0 && height === 0 && !force) ?
                    true : (width !== 0 && height !== 0 && !force) ? 
                        false : style.display === 'none' || style.visibility === 'hidden';
    };
    
    /**
     * Check if the image should be visible and load the image accordingly
     * 
     * @param el    {HTMLImageElement}  The img element to validate
     * @returns     {Void}
     */
    var showElementIfVisible = function (el) {
        if (!isElementVisible(el)) {
            var source = el.getAttribute('data-src');
            el.setAttribute('src', source);
        }
    };
    
    /**
     * Exposed library function
     * 
     * @param selector  {Mixed}     Selector or node list
     * @returns         {Void}
     */
    return {
        "init": function (selector) {
            selector = !!selector ? selector : "img[data-src]";
                        
            var runner = function () {
                if (typeof selector === "string") {
                    document.querySelectorAll(selector).forEach(check);
                } else if (typeof selector.length === "number") {
                    selector.forEach(showElementIfVisible);
                } else if (typeof selector.style === 'object') {
                    showElementIfVisible(selector);
                }
            };
            
            if (window.addEventListener) {
                window.addEventListener('resize', runner, false);
            } else if (window.attachEvent) {
                window.attachEvent('onresize', runner);
            }
            runner();
        },
        "isElementVisible": isElementVisible,
        "transformElement": showElementIfVisible
    };
    
}));