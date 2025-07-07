// Privacy-respecting, secure, and simple social sharing buttons in native JS.
// Use them on your own projects:
// https://github.com/QuadrupleA/private-secure-sharing-buttons

// Adds sharing buttons inside the container elements selected by 'selector'.
function AddSharingButtons(selector, options) {

    // Add defaults to 'options' where missing
    let OPTION_DEFAULTS = {
        services: 'twitter facebook email reddit pinterest tumblr',
        url: location.href,
        title: document.title,
        text: (document.querySelector('meta[name=description]') || {}).content || '',
        image: (document.querySelector('meta[property="og:image"]') || {}).content || '',
        labelHtml: '<div class="share-label">Share this:</div>'
    };
    for (let key in OPTION_DEFAULTS) {
        if (!options.hasOwnProperty(key)) {
            options[key] = OPTION_DEFAULTS[key];
        }
    }

    // Icons below are courtesy Font Awesome Free ( https://fontawesome.com/license )
    //   under the CC BY 4.0 License ( https://creativecommons.org/licenses/by/4.0/ )

    // Set up available services
    let AVAILABLE_SERVICES = {
        twitter: {
            baseLink: 'https://x.com/intent/post?',
            urlParams: { text: options.text, url: options.url },
            windowParams: 'width=550,height=270',
            tooltip: 'Share on X',
            iconHtml: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/></svg>'
        },
        facebook: {
            baseLink: 'https://www.facebook.com/sharer/sharer.php?',
            urlParams: { u: options.url },
            windowParams: 'width=580,height=296',
            tooltip: 'Share on Facebook',
            iconHtml: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z"/></svg>'
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
            iconHtml: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M373 138.6c-25.2 0-46.3-17.5-51.9-41l0 0c-30.6 4.3-54.2 30.7-54.2 62.4l0 .2c47.4 1.8 90.6 15.1 124.9 36.3c12.6-9.7 28.4-15.5 45.5-15.5c41.3 0 74.7 33.4 74.7 74.7c0 29.8-17.4 55.5-42.7 67.5c-2.4 86.8-97 156.6-213.2 156.6S45.5 410.1 43 323.4C17.6 311.5 0 285.7 0 255.7c0-41.3 33.4-74.7 74.7-74.7c17.2 0 33 5.8 45.7 15.6c34-21.1 76.8-34.4 123.7-36.4l0-.3c0-44.3 33.7-80.9 76.8-85.5C325.8 50.2 347.2 32 373 32c29.4 0 53.3 23.9 53.3 53.3s-23.9 53.3-53.3 53.3zM157.5 255.3c-20.9 0-38.9 20.8-40.2 47.9s17.1 38.1 38 38.1s36.6-9.8 37.8-36.9s-14.7-49.1-35.7-49.1zM395 303.1c-1.2-27.1-19.2-47.9-40.2-47.9s-36.9 22-35.7 49.1c1.2 27.1 16.9 36.9 37.8 36.9s39.3-11 38-38.1zm-60.1 70.8c1.5-3.6-1-7.7-4.9-8.1c-23-2.3-47.9-3.6-73.8-3.6s-50.8 1.3-73.8 3.6c-3.9 .4-6.4 4.5-4.9 8.1c12.9 30.8 43.3 52.4 78.7 52.4s65.8-21.6 78.7-52.4z"/></svg>'
        },
        pinterest: {
            baseLink: 'https://pinterest.com/pin/create/button/?',
            urlParams: { url: options.url, media: options.image, description: options.title },
            windowParams: '',
            tooltip: 'Share on Pinterest',
            iconHtml: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M204 6.5C101.4 6.5 0 74.9 0 185.6 0 256 39.6 296 63.6 296c9.9 0 15.6-27.6 15.6-35.4 0-9.3-23.7-29.1-23.7-67.8 0-80.4 61.2-137.4 140.4-137.4 68.1 0 118.5 38.7 118.5 109.8 0 53.1-21.3 152.7-90.3 152.7-24.9 0-46.2-18-46.2-43.8 0-37.8 26.4-74.4 26.4-113.4 0-66.2-93.9-54.2-93.9 25.8 0 16.8 2.1 35.4 9.6 50.7-13.8 59.4-42 147.9-42 209.1 0 18.9 2.7 37.5 4.5 56.4 3.4 3.8 1.7 3.4 6.9 1.5 50.4-69 48.6-82.5 71.4-172.8 12.3 23.4 44.1 36 69.3 36 106.2 0 153.9-103.5 153.9-196.8C384 71.3 298.2 6.5 204 6.5z"/></svg>'
        },
        tumblr: {
            baseLink: 'https://www.tumblr.com/widgets/share/tool?',
            urlParams: { canonicalUrl: options.url, title: options.title, caption: options.description },
            windowParams: '',
            tooltip: 'Share on Tumblr',
            iconHtml: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M309.8 480.3c-13.6 14.5-50 31.7-97.4 31.7-120.8 0-147-88.8-147-140.6v-144H17.9c-5.5 0-10-4.5-10-10v-68c0-7.2 4.5-13.6 11.3-16 62-21.8 81.5-76 84.3-117.1 .8-11 6.5-16.3 16.1-16.3h70.9c5.5 0 10 4.5 10 10v115.2h83c5.5 0 10 4.4 10 9.9v81.7c0 5.5-4.5 10-10 10h-83.4V360c0 34.2 23.7 53.6 68 35.8 4.8-1.9 9-3.2 12.7-2.2 3.5 .9 5.8 3.4 7.4 7.9l22 64.3c1.8 5 3.3 10.6-.4 14.5z"/></svg>'
        },
    };

    // For each selected button container...
    let containers = document.querySelectorAll(selector);
    for (let i = 0; i < containers.length; i++) {

        // Add the 'share this' label if present
        let container = containers[i];
        container.innerHTML = options.labelHtml;

        // Add buttons for each chosen service
        options.services.split(' ').forEach(function(serviceName) {
            if (serviceName == 'x') { 
                serviceName = 'twitter'; 
            }
            let service = AVAILABLE_SERVICES[serviceName];
            let button = document.createElement('a');
            let urlParams = [];
            for (let key in service.urlParams) {
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
    let containers = document.querySelectorAll('[data-sharing-buttons=true]');
    for (let i = 0; i < containers.length; i++) {
        let container = containers[i];
        if (!container.id) {
            container.id = '_SharingButtons' + i;
        }
        let options = {};
        ['services', 'url', 'title', 'text', 'image', 'labelHtml'].forEach(function(key) {
            let value = container.getAttribute('data-' + key);
            if (value) {
                options[key] = value;
            }
        });
        AddSharingButtons('#' + container.id, options);
    }
}, { once : true });
