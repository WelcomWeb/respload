/**
* ResponseivePreloader 0.1
*
* Load only images visible for the active media query
*
* @author Björn Wikström <bjorn@welcom.se>
* @license LGPL v3 <http://www.gnu.org/licenses/lgpl.html>
* @version 0.1
* @copyright Welcom Web i Göteborg AB 2013
*/
;(function (window, document, undef) {

	/**
	* If ResponsivePreloader is already loaded, don't load it again
	*/
	if (typeof window.ResponsivePreloader !== typeof undef) {
		return;
	}

	/**
	* Helper method for iterating through arrays
	*
	* @param fn {Function} Callback to handle item of array
	* @returns {Void}
	*/
	NodeList.prototype.each = function (fn) {
		for (var i = 0; i < this.length; i++) {
			fn.call(this[i]);
		}
	};


	var ResponsivePreloader = function () {

		/**
		* Get the computed style for an element
		*
		* @param element {HTMLImageElement} The element to get the style from
		* @returns {Object}
		*/
		var _computedStyle = function (element) {
			return window.getComputedStyle ? window.getComputedStyle(element) : element.currentStyle;
		};

		/**
		* Check the visibility of an element
		* Originally from http://stackoverflow.com/a/1069739/64495
		*
		* @param element {HTMLImageElement} The element to check
		* @returns {Boolean}
		*/
		var _hidden = function (element) {

			var w     = element.offsetWidth,
				h     = element.offsetHeight,
				force = (element.tagName.toLowerCase() === 'tr'),
				style = _computedStyle(element);
			return (w === 0 && h === 0 && !force) ?
						true : (w !== 0 && h !== 0 && !force) ?
								false : style.display === 'none' || style.visibility === 'hidden';

		};

		/**
		* Load an image by populating it's `src` attribute,
		* in the HTMLImageElement scope (this == HTMLImageElement).
		* 
		* Remove the earlier set width, if any.
		*
		* @returns {Void}
		*/
		var _load = function () {
			if (this.getAttribute('data-rprl-width')) {
				this.removeAttribute('data-rprl-width');
				this.removeAttribute('width');
			}
			var url = this.getAttribute('data-responsive-preload');
			this.setAttribute('src', url);
		};

		/**
		* Check if an HTMLImageElement is in the visible view,
		* if it is - load the referenced image (this == HTMLImageElement).
		* Force a width of the HTMLImageElement if none is present, to
		* check visibility.
		*
		* If the element has dependency children, load them as well.
		*
		* @returns {Void}
		*/
		var _check = function () {

			if (!this.getAttribute('width')) {
				this.setAttribute('width', '1');
				this.setAttribute('data-rprl-width', '1');
			}
			
			if (this.getAttribute('src') == '' && !_hidden(this)) {
				_load.call(this);

				document.querySelectorAll('[data-responsive-preload-dep="' + this.getAttribute('id') + '"]').each(_load);
			}

		};

		/**
		* Iterate through all marked elements, with the selector [data-responsive-preload],
		* and check visibility
		*
		* @returns {Void}
		*/
		var _initialize = function () {

			document.querySelectorAll('[data-responsive-preload]').each(_check);

		};

		/**
		* If document.querySelectorAll is not available (IE6/IE7),
		* load Sizzle from specified URL.
		*
		* @param url {String} The URL for Sizzle.js
		* @param callback {Function} What to do when Sizzle.js is loaded
		* @returns {Void}
		*/
		var _fetchSizzle = function (url, callback) {

			var head      = document.getElementsByTagName('head')[0];
			var script    = document.createElement('script');
			script.type   = 'text/javascript';
			script.src    = url;
			script.onload = function () {
				document.querySelectorAll = Sizzle;
				callback();
			};
			head.appendChild(script);

		};

		/**
		* If neither Sizzle.js nor document.querySelectorAll is
		* available, forget about preloading and load in every
		* image
		*
		* @returns {Void}
		*/
		var _full = function () {

			document.getElementsByTagName('img').each(function () {

				if (this.getAttribute('data-responsive-preload')) {
					_load.call(this);
				}

			});

		};

		/**
		* Exposed initialize function, with conditions for entry point
		* of the library.
		*
		* If document.querySelectorAll is not available, load Sizzle
		* if it was specified in the options object - and the initialize
		* the responsive preloader.
		*
		* Load every image if no Sizzle URL was specified (and querySelector
		* is unavailable).
		*
		* @param options {Object} Options for ResponsivePreloader
		* @returns {Void}
		*/
		return {
			'init': function (options) {

				if (!document.querySelectorAll && options && options.sizzle) {
					_fetchSizzle(options.sizzle, _initialize);
				} else if (document.querySelectorAll) {
					_initialize();
				} else {
					_full();
				}

				/**
				* Should we do a check for images when window is resized?
				* Could be a tilt of phone or tablet as well.
				*/
				if (options && options.resizable) {
					window.onresize = function () {
						_initialize();
					};
				}

			}
		}

	}();

	/**
	* Attach ResponsivePreloader to the global namespace
	*/
	window.ResponsivePreloader = ResponsivePreloader;

})(window, window.document);