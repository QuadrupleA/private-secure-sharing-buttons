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
            baseLink: 'https://x.com/intent/tweet?',
            urlParams: { text: options.text, url: options.url },
            windowParams: 'width=550,height=270',
            tooltip: 'Share on X',
            iconHtml: '<svg aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/></svg>'
        },
        facebook: {
            baseLink: 'https://www.facebook.com/sharer/sharer.php?',
            urlParams: { u: options.url },
            windowParams: 'width=580,height=296',
            tooltip: 'Share on Facebook',
            iconHtml: '<svg aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z"/></svg>'
        },
        email: {
            baseLink: 'mailto:?',
            urlParams: { subject: options.title, body: options.text + ' ' + options.url },
            windowParams: '',
            tooltip: 'Share via email',
            iconHtml: '<svg aria-hidden="true" role="img"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/></svg>'
        },
        reddit: {
            baseLink: 'https://www.reddit.com/submit?',
            urlParams: { url: options.url, title: options.title },
            windowParams: '',
            tooltip: 'Share on Reddit',
            iconHtml: '<svg aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M64 32l320 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96C0 60.7 28.7 32 64 32zM305.9 166.4c20.6 0 37.3-16.7 37.3-37.3s-16.7-37.3-37.3-37.3c-18 0-33.1 12.8-36.6 29.8c-30.2 3.2-53.8 28.8-53.8 59.9l0 .2c-32.8 1.4-62.8 10.7-86.6 25.5c-8.8-6.8-19.9-10.9-32-10.9c-28.9 0-52.3 23.4-52.3 52.3c0 21 12.3 39 30.1 47.4c1.7 60.7 67.9 109.6 149.3 109.6s147.6-48.9 149.3-109.7c17.7-8.4 29.9-26.4 29.9-47.3c0-28.9-23.4-52.3-52.3-52.3c-12 0-23 4-31.9 10.8c-24-14.9-54.3-24.2-87.5-25.4l0-.1c0-22.2 16.5-40.7 37.9-43.7l0 0c3.9 16.5 18.7 28.7 36.3 28.7zM155 248.1c14.6 0 25.8 15.4 25 34.4s-11.8 25.9-26.5 25.9s-27.5-7.7-26.6-26.7s13.5-33.5 28.1-33.5zm166.4 33.5c.9 19-12 26.7-26.6 26.7s-25.6-6.9-26.5-25.9c-.9-19 10.3-34.4 25-34.4s27.3 14.6 28.1 33.5zm-42.1 49.6c-9 21.5-30.3 36.7-55.1 36.7s-46.1-15.1-55.1-36.7c-1.1-2.6 .7-5.4 3.4-5.7c16.1-1.6 33.5-2.5 51.7-2.5s35.6 .9 51.7 2.5c2.7 .3 4.5 3.1 3.4 5.7z"/></svg>'
        },
        pinterest: {
            baseLink: 'https://pinterest.com/pin/create/button/?',
            urlParams: { url: options.url, media: options.image, description: options.title },
            windowParams: '',
            tooltip: 'Share on Pinterest',
            iconHtml: '<svg aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M496 256c0 137-111 248-248 248-25.6 0-50.2-3.9-73.4-11.1 10.1-16.5 25.2-43.5 30.8-65 3-11.6 15.4-59 15.4-59 8.1 15.4 31.7 28.5 56.8 28.5 74.8 0 128.7-68.8 128.7-154.3 0-81.9-66.9-143.2-152.9-143.2-107 0-163.9 71.8-163.9 150.1 0 36.4 19.4 81.7 50.3 96.1 4.7 2.2 7.2 1.2 8.3-3.3 .8-3.4 5-20.3 6.9-28.1 .6-2.5 .3-4.7-1.7-7.1-10.1-12.5-18.3-35.3-18.3-56.6 0-54.7 41.4-107.6 112-107.6 60.9 0 103.6 41.5 103.6 100.9 0 67.1-33.9 113.6-78 113.6-24.3 0-42.6-20.1-36.7-44.8 7-29.5 20.5-61.3 20.5-82.6 0-19-10.2-34.9-31.4-34.9-24.9 0-44.9 25.7-44.9 60.2 0 22 7.4 36.8 7.4 36.8s-24.5 103.8-29 123.2c-5 21.4-3 51.6-.9 71.2C65.4 450.9 0 361.1 0 256 0 119 111 8 248 8s248 111 248 248z"/></svg>'
        },
        tumblr: {
            baseLink: 'https://www.tumblr.com/widgets/share/tool?',
            urlParams: { canonicalUrl: options.url, title: options.title, caption: options.description },
            windowParams: '',
            tooltip: 'Share on Tumblr',
            iconHtml: '<svg aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M448 96c0-35.3-28.7-64-64-64H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96zM256.8 416c-75.5 0-91.9-55.5-91.9-87.9v-90H135.2c-3.4 0-6.2-2.8-6.2-6.2V189.4c0-4.5 2.8-8.5 7.1-10c38.8-13.7 50.9-47.5 52.7-73.2c.5-6.9 4.1-10.2 10-10.2h44.3c3.4 0 6.2 2.8 6.2 6.2v72h51.9c3.4 0 6.2 2.8 6.2 6.2v51.1c0 3.4-2.8 6.2-6.2 6.2H249.1V321c0 21.4 14.8 33.5 42.5 22.4c3-1.2 5.6-2 8-1.4c2.2 .5 3.6 2.1 4.6 4.9L318 387.1c1 3.2 2 6.7-.3 9.1c-8.5 9.1-31.2 19.8-60.9 19.8z"/></svg>'
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
            // Catch Elon's stupid new name and change it back to the original name
            if (serviceName=='x') serviceName='twitter';
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
