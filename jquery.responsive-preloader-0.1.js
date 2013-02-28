/**
* ResponseivePreloader 0.1
*
* Load only images visible for the active media query,
* a separate version for jQuery.
*
* @author Björn Wikström <bjorn@welcom.se>
* @license LGPL v3 <http://www.gnu.org/licenses/lgpl.html>
* @version 0.1
* @copyright Welcom Web i Göteborg AB 2013
*/
;(function (window, document, $, undef) {
	
	/**
	* If ResponsivePreloader is already loaded, don't load it again
	*/
	if (typeof window.ResponsivePreloader !== typeof undef) {
		return;
	}

	var ResponsivePreloader = function () {

		/**
		* Load an image by populating it's `src` attribute,
		* in the HTMLImageElement scope (this == HTMLImageElement).
		* 
		* Remove the earlier set width, if any.
		*
		* @returns {Void}
		*/
		var _load = function () {
			
			if ($(this).attr('data-rprl-width')) {
				$(this).removeAttr('width');
				$(this).removeAttr('data-rprl-width');
			}
			
			$(this).attr('src', $(this).attr('data-responsive-preload'));
			
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
			
			if (!$(this).attr('width')) {
				$(this).attr('width', '1');
				$(this).attr('data-rprl-width', '1');
			}
			
			if ($(this).attr('src') == '' && $(this).is(':visible')) {
				_load.call(this);

				$('[data-responsive-preload-dep="' + $(this).attr('id') + '"]').each(_load);
			}

		};

		/**
		* Exposed initialize function, with conditions for entry point
		* of the library.
		*
		* @param options {Object} Options for ResponsivePreloader
		* @returns {Void}
		*/
		return {
			'init': function (options) {

				$('[data-responsive-preload]').each(_check);

				if (options && options.resizable) {
					$(window).on('resize', function () {
						$('[data-responsive-preload]').each(_check);
					});
				}

			}
		}

	}();

	/**
	* Attach ResponsivePreloader to global namespace
	*/
	window.ResponsivePreloader = ResponsivePreloader;

})(window, window.document, jQuery);