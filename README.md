# ResponsivePreload, a selective preloader for responsive sites

## About
ResponsivePreload minimizes the amount of image requests for responsive sites, where media queries are used. A selective preloader that only downloads the images for the active media query, when the browser window is resized or when a tablet/phone changes orientation.

## Which version should I choose?
ResponsivePreload comes in two different versions, one standard and one prefixed with `jquery`. The standard version should work cross browser and comes without dependencies, while the `jquery` version leaves a smaller footprint but depends on jQuery.

## Browser support
ResponsivePreload uses `document.querySelector` to select DOM nodes, which is only available in modern browsers. To support IE6 and/or IE7, Sizzle can be used for selection by specifying the URL to Sizzle.js when initializing ResponsivePreload. See the simple example below.

## A simple example using Twitter Bootstrap
**index.html**
    <!DOCTYPE html>
    <html>
    	<head>
    	    <meta charset="UTF-8" />
            <link rel="/stylesheets/bootstrap.min.css" />
    	</head>
        <body>
            <div class="visible-phone">
                <img src="" data-responsive-preload="images/a-smaller-image.png" />
            </div>
            <div class="visible-desktop">
                <img src="" data-responsive-preload="images/a-larger-image.png" />
            </div>
            <script src="/javascripts/responsive-preloader-0.1.min.js"></script>
            <script>
                window.onload = function () {
                    var options = {
                        // Should listen to `onresize` event
                        'resizable': true,

                        // To support IE6/IE7 we can use Sizzle,
                        // by specifying a URL to Sizzle.js
                        'sizzle': '/javascripts/sizzle.js'
                    }
                    ResponsivePreload.init(options);
                }
            </script>
        </body>
    </html>

