# ResponsivePreload, a selective preloader for responsive sites

## About
ResponsivePreload minimizes the amount of image requests for responsive sites, where media queries are used. A selective preloader that only downloads the images for the active media query, when the browser window is resized or when a tablet/phone changes orientation.

## Usage
By adding an attribute called `data-responsive-preload` to your `<img>` elements, and leaving the `src` attribute blank, you tell ResponsivePreload to only activate the images for the active media query.

## Which version should I choose?
ResponsivePreload comes in two different versions, one standard and one prefixed with `jquery`. The standard version should work cross browser and comes without dependencies, while the `jquery` version leaves a smaller footprint but depends on jQuery. So if you already use jQuery, the `jquery.responsive-preloader.js` should be preferred.

## Browser support
ResponsivePreload uses `document.querySelector` to select DOM nodes, which is only available in modern browsers. To support IE6 and/or IE7, [Sizzle](http://sizzlejs.com/) can be used for selection by specifying the URL to Sizzle.js when initializing ResponsivePreload. See the simple example below.

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
            <div class="visible-tablet">
                <img src="" data-responsive-preload="images/a-medium-image.png" />
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

## Galleries
Many sites uses image galleries where only the first image is displayed by default, and the rest is hidden. To enable ResponsivePreload to work with these elements as well, you can specify a *responsive dependency* by adding yet another attribute to these elements, called `data-responsive-preload-dep`. This attribute should point to the depended image element, by ID.

**gallery.html**

    <!DOCTYPE html>
    ...
        <div class="my-gallery-desktop visibile-desktop">
            <div class="item">
                <img src="" data-responsive-preload="large-image1.png" id="dekstop-gallery-img" />
            </div>
            <div class="item hidden">
                <img src="" data-responsive-preload="large-image2.png" data-responsive-preload-dep="#desktop-gallery-img" />
            </div>
            <div class="item hidden">
                <img src="" data-responsive-preload="large-image3.png" data-responsive-preload-dep="#desktop-gallery-img" />
            </div>
        </div>
        <div class="my-gallery-desktop visibile-tablet">
            <div class="item">
                <img src="" data-responsive-preload="medium-image1.png" id="tablet-gallery-img" />
            </div>
            <div class="item hidden">
                <img src="" data-responsive-preload="medium-image2.png" data-responsive-preload-dep="#desktop-gallery-img" />
            </div>
            <div class="item hidden">
                <img src="" data-responsive-preload="medium-image3.png" data-responsive-preload-dep="#desktop-gallery-img" />
            </div>
        </div>
        <div class="my-gallery-desktop visibile-phone">
            <div class="item">
                <img src="" data-responsive-preload="small-image1.png" id="phone-gallery-img" />
            </div>
            <div class="item hidden">
                <img src="" data-responsive-preload="small-image2.png" data-responsive-preload-dep="#phone-gallery-img" />
            </div>
            <div class="item hidden">
                <img src="" data-responsive-preload="small-image3.png" data-responsive-preload-dep="#phone-gallery-img" />
            </div>
        </div>
    ...

Happy coding!
