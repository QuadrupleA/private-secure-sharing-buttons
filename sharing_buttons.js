// Privacy-respecting, secure, and simple social sharing buttons in native JS.
// Use them on your own projects:
// https://github.com/QuadrupleA/private-secure-sharing-buttons

// Adds sharing buttons inside the container elements selected by 'selector'.
function AddSharingButtons(selector, options) {

    // Add defaults to 'options' where missing
    var OPTION_DEFAULTS = {
        services: 'twitter facebook email reddit pinterest tumblr',
        url: location.href,
        title: document.title,
        text: (document.querySelector('meta[name=description]') || {}).content || '',
        image: (document.querySelector('meta[property="og:image"]') || {}).content || '',
        labelHtml: '<div class="share-label">Share this:</div>'
    };
    for (var key in OPTION_DEFAULTS) {
        if (!options.hasOwnProperty(key)) {
            options[key] = OPTION_DEFAULTS[key];
        }
    }

    // Icons below are courtesy Font Awesome Free ( https://fontawesome.com/license )
    //   under the CC BY 4.0 License ( https://creativecommons.org/licenses/by/4.0/ )

    // Set up available services
    var AVAILABLE_SERVICES = {
        twitter: {
            baseLink: 'https://twitter.com/intent/tweet?',
            urlParams: { text: options.text, url: options.url },
            windowParams: 'width=550,height=270',
            tooltip: 'Share on Twitter',
            iconHtml: '<svg aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path></svg>'
        },
        facebook: {
            baseLink: 'https://www.facebook.com/sharer/sharer.php?',
            urlParams: { u: options.url },
            windowParams: 'width=580,height=296',
            tooltip: 'Share on Facebook',
            iconHtml: '<svg aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 264 512"><path fill="currentColor" d="M76.7 512V283H0v-91h76.7v-71.7C76.7 42.4 124.3 0 193.8 0c33.3 0 61.9 2.5 70.2 3.6V85h-48.2c-37.8 0-45.1 18-45.1 44.3V192H256l-11.7 91h-73.6v229"></path></svg>'
        },
        email: {
            baseLink: 'mailto:?',
            urlParams: { subject: options.title, body: options.text + ' ' + options.url },
            windowParams: '',
            tooltip: 'Share via email',
            iconHtml: '<svg aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"></path></svg>'
        },
        reddit: {
            baseLink: 'https://www.reddit.com/submit?',
            urlParams: { url: options.url, title: options.title },
            windowParams: '',
            tooltip: 'Share on Reddit',
            iconHtml: '<svg aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M440.3 203.5c-15 0-28.2 6.2-37.9 15.9-35.7-24.7-83.8-40.6-137.1-42.3L293 52.3l88.2 19.8c0 21.6 17.6 39.2 39.2 39.2 22 0 39.7-18.1 39.7-39.7s-17.6-39.7-39.7-39.7c-15.4 0-28.7 9.3-35.3 22l-97.4-21.6c-4.9-1.3-9.7 2.2-11 7.1L246.3 177c-52.9 2.2-100.5 18.1-136.3 42.8-9.7-10.1-23.4-16.3-38.4-16.3-55.6 0-73.8 74.6-22.9 100.1-1.8 7.9-2.6 16.3-2.6 24.7 0 83.8 94.4 151.7 210.3 151.7 116.4 0 210.8-67.9 210.8-151.7 0-8.4-.9-17.2-3.1-25.1 49.9-25.6 31.5-99.7-23.8-99.7zM129.4 308.9c0-22 17.6-39.7 39.7-39.7 21.6 0 39.2 17.6 39.2 39.7 0 21.6-17.6 39.2-39.2 39.2-22 .1-39.7-17.6-39.7-39.2zm214.3 93.5c-36.4 36.4-139.1 36.4-175.5 0-4-3.5-4-9.7 0-13.7 3.5-3.5 9.7-3.5 13.2 0 27.8 28.5 120 29 149 0 3.5-3.5 9.7-3.5 13.2 0 4.1 4 4.1 10.2.1 13.7zm-.8-54.2c-21.6 0-39.2-17.6-39.2-39.2 0-22 17.6-39.7 39.2-39.7 22 0 39.7 17.6 39.7 39.7-.1 21.5-17.7 39.2-39.7 39.2z"></path></svg>'
        },
        pinterest: {
            baseLink: 'https://pinterest.com/pin/create/button/?',
            urlParams: { url: options.url, media: options.image, description: options.title },
            windowParams: '',
            tooltip: 'Share on Pinterest',
            iconHtml: '<svg aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M204 6.5C101.4 6.5 0 74.9 0 185.6 0 256 39.6 296 63.6 296c9.9 0 15.6-27.6 15.6-35.4 0-9.3-23.7-29.1-23.7-67.8 0-80.4 61.2-137.4 140.4-137.4 68.1 0 118.5 38.7 118.5 109.8 0 53.1-21.3 152.7-90.3 152.7-24.9 0-46.2-18-46.2-43.8 0-37.8 26.4-74.4 26.4-113.4 0-66.2-93.9-54.2-93.9 25.8 0 16.8 2.1 35.4 9.6 50.7-13.8 59.4-42 147.9-42 209.1 0 18.9 2.7 37.5 4.5 56.4 3.4 3.8 1.7 3.4 6.9 1.5 50.4-69 48.6-82.5 71.4-172.8 12.3 23.4 44.1 36 69.3 36 106.2 0 153.9-103.5 153.9-196.8C384 71.3 298.2 6.5 204 6.5z"></path></svg>'
        },
        tumblr: {
            baseLink: 'https://www.tumblr.com/widgets/share/tool?',
            urlParams: { canonicalUrl: options.url, title: options.title, caption: options.description },
            windowParams: '',
            tooltip: 'Share on Tumblr',
            iconHtml: '<svg aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M309.8 480.3c-13.6 14.5-50 31.7-97.4 31.7-120.8 0-147-88.8-147-140.6v-144H17.9c-5.5 0-10-4.5-10-10v-68c0-7.2 4.5-13.6 11.3-16 62-21.8 81.5-76 84.3-117.1.8-11 6.5-16.3 16.1-16.3h70.9c5.5 0 10 4.5 10 10v115.2h83c5.5 0 10 4.4 10 9.9v81.7c0 5.5-4.5 10-10 10h-83.4V360c0 34.2 23.7 53.6 68 35.8 4.8-1.9 9-3.2 12.7-2.2 3.5.9 5.8 3.4 7.4 7.9l22 64.3c1.8 5 3.3 10.6-.4 14.5z"></path></svg>'
        },
    };

    // For each selected button container...
    var containers = document.querySelectorAll(selector);
    for (var i = 0; i < containers.length; i++) {

        // Add the 'share this' label if present
        var container = containers[i];
        container.innerHTML = options.labelHtml;

        // Add buttons for each chosen service
        options.services.split(' ').forEach(function(serviceName) {
            var service = AVAILABLE_SERVICES[serviceName];
            var button = document.createElement('a');
            var urlParams = [];
            for (var key in service.urlParams) {
                urlParams.push(key + '=' + encodeURIComponent(service.urlParams[key]));
            }
            button.href = service.baseLink + urlParams.join('&');
            button.target = serviceName;
            button.className = serviceName;
            button.title = service.tooltip;
            button._windowParams = service.windowParams;
            button.addEventListener('click', function(e) {
                e.preventDefault();
                window.open(this.href, this.target, this._windowParams);
            });
            button.innerHTML = service.iconHtml;
            container.appendChild(button);
        });

    } // next button container

} // end AddSharingButtons()


// Optional: on page load, adds sharing buttons to any element with the attribute:
//   data-sharing-buttons="true"
// Options can be specified using the attributes:
//   data-<OptionName>="<OptionValue>"
document.addEventListener('DOMContentLoaded', function() {
    var containers = document.querySelectorAll('[data-sharing-buttons=true]');
    for (var i = 0; i < containers.length; i++) {
        var container = containers[i];
        if (!container.id) {
            container.id = '_SharingButtons' + i;
        }
        var options = {};
        ['services', 'url', 'title', 'text', 'image', 'labelHtml'].forEach(function(key) {
            var value = container.getAttribute('data-' + key);
            if (value) {
                options[key] = value;
            }
        });
        AddSharingButtons('#' + container.id, options);
    }
}, { once : true });
