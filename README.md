## Introduction

Most social-sharing-button services like [AddThis](https://addthis.com/) and [Shareaholic](https://shareaholic.com/) have little respect for your users' privacy, installing tracking cookies (for themselves and social networks) that follow people around the web. They also degrade the performance of your pages by making dozens of surreptitious requests in the background - bad enough that most adblockers now block them entirely, making it hard for people to share your stuff at all.

When I was trying to find alternatives, most of the ones I found, like [Social Share Privacy](https://github.com/panzi/SocialSharePrivacy) which Bruce Schneier [uses on his blog](https://www.schneier.com/blog/archives/2013/03/changes_to_the.html), seemed a bit overengineered / overcomplicated, requiring node.js, build scripts, asset folders, several dependent libraries, code and settings split across multiple files, etc. 

I wrote this slightly-more-than-one-pager script for use in my own projects (e.g. it's what I use on [phrasegenerator.com](https://phrasegenerator.com)) so thought I'd share it here for others to use too. 

It installs no cookies, makes zero additional HTTP requests, and does not call to any assets outside of your own server. It only notifies the social networks when the visitor clicks a sharing icon. By default it uses simple lightweight SVG icons from [Font Awesome](https://fontawesome.com) that are embedded right in the JS file, and simple CSS styles that you can customize to fit your site. It's written in pure native javascript, so doesn't require jQuery, React, Angular, or any other frameworks, which should make it easy to integrate into a most sites. 

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
         data-otherOptionName="Other option value"></div>
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

I tried to make the code and CSS simple and clear enough so that developers could copy it and adapt it as needed to fit their scenarios. So feel free to copy and customize.

### Options:

These are passed via `data-` attributes or the 2nd parameter to `AddSharingButtons()`:

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

Pull requests are welcome - while I don't want to add anything that makes it harder to use or understand the code (e.g. splitting into many files / functions), new social network / sharing services, alternate icons and stylings, etc. are most welcome, as well as fixes to any bugs or browser incompatibilities I might have unwittingly installed.

Thanks and enjoy!
