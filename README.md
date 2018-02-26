# private-secure-sharing-buttons

Privacy-respecting, simple social sharing buttons in native JavaScript.

## Introduction

Most social-sharing-button services like [AddThis](https://addthis.com/) and [Shareaholic](https://shareaholic.com/) have little respect for your users' privacy, installing dozens of tracking cookies that follow them around the web, and degrading the performance of your pages by making surreptitious requests in the background. Because of this, most adblockers now block them, making it hard for people to share your stuff at all. 

Most of the alternatives I found, like [Social Share Privacy](https://github.com/panzi/SocialSharePrivacy) which Bruce Schneier [uses on his blog](https://www.schneier.com/blog/archives/2013/03/changes_to_the.html), seemed a bit overengineered / overcomplicated, requiring node.js, build scripts, asset folders, several dependent libraries, code and settings split across multiple files, etc. 

I wrote this simple one-file script for use in my own projects, and thought I'd share it here for others to use too. 

It's written in native JavaScript, and doesn't require jQuery, React, Angular, or any other frameworks, which should make it easy to integrate into most sites. It installs no cookies, makes no additional HTTP requests, and does not call to any assets outside of your own server. It embeds some lightweight SVG icons from [Font Awesome](https://fontawesome.com) right in the JS file, and is styled using CSS that you can easily customize. It only notifies social networks when the visitor clicks a sharing icon.  

## Examples

Download the files and open `example.html` in a browser to see it in action.

Also, here are a couple sites I use these on:

* Default style (`sharing_buttons.css`): [Random Phrase Generator](https://phrasegenerator.com/politics)
* White style: (`sharing_buttons_white.css`): [Battleships: Mindless Podcast Companion](https://lukerissacher.com/battleships)

## Usage

Add `sharing_buttons.js` and the CSS styles to your page. Then, do one of the following:

### Add buttons using data attributes: 

For this, no additional javascript is needed. Just add an element with `data-sharing-buttons="true"` and any other desired options prefixed by `data-`:

```html
<!doctype html>
<html>
  <head>
    <link rel="stylesheet" href="sharing_buttons.css" />
    <script src="sharing_buttons.js"></script>
  </head>
  <body>
    <div data-sharing-buttons="true" 
         data-services="twitter facebook email"
         data-otherOptionName="Other option value"
         class="sharing-buttons"></div>
  </body>
</html>
```

### Add buttons using javascript: 

For programmatic control, you can initialize buttons using `AddSharingButtons(selector, options)`:

```html
<!doctype html>
<html>
  <head>
    <link rel="stylesheet" href="sharing_buttons.css" />
    <script src="sharing_buttons.js"></script>
  </head>
  <body>
    <div class="sharing-buttons top-buttons"></div>
    <!-- ... -->
    <div class="sharing-buttons bottom-buttons"></div>
    <script>
      // ... after document is ready:
      AddSharingButtons('.sharing-buttons', { 
        services: 'pinterest tumblr reddit',
        otherOptionName: 'Other option value'
      });
    </script>
  </body>
</html>
```

### Options:

I tried to keep the code and CSS simple, rather than provide a ton of options, to encourage developers to dig in and customize it themselves to suit their needs.

Options are passed via `data-` attributes or the 2nd parameter to `AddSharingButtons()`.

* __services__
  * Space-separated list of services you want sharing buttons for. 
  * Default: `'twitter facebook email google reddit pinterest tumblr'` (all of them)
* __url__
  * URL you want to share. 
  * Default: `location.href`
* __title__
  * Title used in the post (not used by all services). 
  * Default: `document.title`
* __text__
  * Body text used in the post (not used by all services). 
  * Default: meta description.
* __image__
  * Absolute URL to image used in the post (not used by all services). 
  * Default: meta `og:image` tag.
* __labelHtml__
  * Label markup prefixing the buttons.
  * Default: `<div class="share-label">Share this:</div>`

## Contributions

Pull requests are welcome - new social network / sharing services, alternate icons and stylings, as well as fixes to any bugs or browser incompatibilities.

Thanks and enjoy!


