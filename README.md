# Responsive Preloader - or Respload:
## A minimal selective preloader for responsive sites

### About
Respload minimizes the amount of image requests for responsive sites, where media queries are used. A selective preloader that only downloads the images for the active media query, when the browser window is resized or when a tablet/phone changes orientation.

### Installation
Respload supports CommonJS, AMD or simple script tag injection. It's also available as a NPM package, install via

    npm install --save-dev respload

or:

[Download development version](https://raw.githubusercontent.com/WelcomWeb/respload/master/dist/respload-1.0.js) (4KB)
[Download minified production version](https://raw.githubusercontent.com/WelcomWeb/respload/master/dist/respload-1.0.min.js) (1KB)

### Usage
By adding an attribute called `data-src` to your `<img>` elements, and leaving the `src` attribute blank, you tell Respload to only activate the images for the current matching media query.

### Browser support
Respload uses `document.querySelectorAll` internally for selecting DOM elements, either when no parameter is passed to it or a string selector is used. To support browsers without the query selector, simply pass in a node list of the elements that's going to be preloaded.

### A simple example using Twitter Bootstrap
**index.html**

    <!DOCTYPE html>
    <html>
    	<head>
    	    <meta charset="UTF-8" />
            <link rel="/stylesheets/bootstrap.min.css" />
    	</head>
        <body>
            <div class="visible-phone">
                <img src="" data-src="images/a-smaller-image.png" />
            </div>
            <div class="visible-tablet">
                <img src="" data-src="images/a-medium-image.png" />
            </div>
            <div class="visible-desktop">
                <img src="" data-src="images/a-larger-image.png" />
            </div>
            <script src="/javascripts/respload-1.0.min.js"></script>
            <script>
                window.onload = function () {
                    /**
                     * Respload's default selector is "img[data-src]"
                     */
                    Respload.init();
                    
                    /**
                     * Passing in a string selector
                     */
                    Respload.init("img[data-src]");
                    
                    /**
                     * Support for older browsers, simply pass in a list of elements.
                     * jQuery can be used effectively here;
                     */
                    var list = $('img[data-src]').toArray();
                    Respload.init(list);
                    
                    /**
                     * Or you can pass in just one element;
                     */
                    Respload.init(document.getElementsByTagName('img')[0]);
                }
            </script>
        </body>
    </html>

### React
Respload is also available as a React component, as a CommonJS module;

    var React = require('react'),
        ResploadImage = require('respload/react');
    
    var MyModule = React.createClass({
        render: function () {
            return (
                <div className="hidden-phone">
                    <ResploadImage src={"/images/large-image.png"} />
                </div>
            );
        }
    }); 

Happy coding!
