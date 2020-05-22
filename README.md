# cRonstrue ![Build Status](https://github.com/bradymholt/cRonstrue/workflows/build/badge.svg) [![NPM Package](https://img.shields.io/npm/v/cronstrue.svg)](https://www.npmjs.com/package/cronstrue)

cRonstrue is a JavaScript library that parses a cron expression and outputs a human readable description of the cron schedule.  For example, given the expression "*/5 * * * *" it will output "Every 5 minutes".

This library was ported from the original C# implemenation called [cron-expression-descriptor](https://github.com/bradymholt/cron-expression-descriptor) and is also available in a [few other languages](https://github.com/bradymholt/cron-expression-descriptor#ports).

## Features
- Zero dependencies
- Supports all cron expression special characters including * / , - ? L W, #
- Supports 5, 6 (w/ seconds or year), or 7 (w/ seconds and year) part cron expressions
- Supports [Quartz Job Scheduler](http://www.quartz-scheduler.org/) cron expressions
- i18n support with 25 languages

## Demo

A demo is available here [here](http://bradymholt.github.io/cRonstrue/#cronstrue-demo).

## Installation
cRonstrue is exported as an [UMD](https://github.com/umdjs/umd) module so it will work in an [AMD](https://github.com/amdjs/amdjs-api/wiki/AMD), [CommonJS](http://wiki.commonjs.org/wiki/CommonJS) or browser global context.

First, install the module:

```
npm install cronstrue
```

Then, depending upon your usage context, add a reference to it:

### Node

```js
var cronstrue = require('cronstrue');
```

### ESM / webpack / TypeScript

```js
import cronstrue from 'cronstrue';
```

### Browser
 The `cronstrue.min.js` file from the `/dist` folder in the npm package should be served to the browser.  There are no dependencies so you can simply include the library in a `<script>` tag.

```html
<script src="cronstrue.min.js" type="text/javascript"></script>
<script>
  var cronstrue = window.cronstrue;
</script>
```

#### CDN

A simple way to load the library in a browser is by using the [unpkg](https://unpkg.com/) CDN, which is a
"fast, global content delivery network for everything on npm".  To use it, include a script tag like this in your file:

```html
<script src="https://unpkg.com/cronstrue@latest/dist/cronstrue.min.js" async></script>
```

Using the "latest" tag will result in a 302 redirect to the latest version tag so it is highly recommended to use a specific version tag such as https://unpkg.com/cronstrue@1.48.0/dist/cronstrue.min.js to avoid this redirect.

## Usage

```js
cronstrue.toString("* * * * *");
> "Every minute"

cronstrue.toString("0 23 ? * MON-FRI");
> "At 11:00 PM, Monday through Friday"

cronstrue.toString("23 12 * * SUN#2");
> "At 12:23 PM, on the second Sunday of the month"

cronstrue.toString("23 14 * * SUN#2", { use24HourTimeFormat: true });
> "At 14:23, on the second Sunday of the month"

cronstrue.toString("* * * ? * 2-6/2", { dayOfWeekStartIndexZero: false });
> "Every second, every 2 days of the week, Monday through Friday"
```

For more usage examples, including a demonstration of how cRonstrue can handle some very complex cron expressions, you can [reference the unit tests](https://github.com/bradymholt/cRonstrue/blob/master/test/cronstrue.ts).

## Options

An options object can be passed as the second parameter to `cronstrue.toString`.  The following options are available:

- **throwExceptionOnParseError: boolean** - If exception occurs when trying to parse expression and generate description, whether to throw or catch and output the Exception message as the description. (Default: true)
- **verbose: boolean** - Whether to use a verbose description (Default: false)
- **dayOfWeekStartIndexZero: boolean** - Whether to interpret cron expression DOW `1` as Sunday or Monday. (Default: true)
- **?use24HourTimeFormat: boolean** - If true, descriptions will use a [24-hour clock](https://en.wikipedia.org/wiki/24-hour_clock) (Default: false but some translations will default to true)
- **locale: string** - The locale to use (Default: "en")

## i18n

To use the i18n support cRonstrue provides, you must use the packaged library that contains the locale transalations.  Once you do this, you can pass the name of a supported locale as an option to  `cronstrue.toString()`.  For example, for the es (Spanish) locale, you would use: `cronstrue.toString("* * * * *", { locale: "es" });`.

### Node
```js
var cronstrue = require('cronstrue/i18n');
cronstrue.toString("*/5 * * * *", { locale: "fr" });
```
### Browser
 The `cronstrue-i18n.min.js` file from the `/dist` folder in the npm package should be served to the browser.

```html
<script src="cronstrue-i18n.min.js" type="text/javascript"></script>
<script>
  cronstrue.toString("*/5 * * * *", { locale: "fr" });
</script>
```

## Frequently Asked Questions

> The cron expression I am passing in is not valid and this library is giving strange output.  What should I do?

This library does not do full validation of cron expressions and assumes the expression passed in is valid. If you need to validate an expression consider using a library like [cron-validator](https://www.npmjs.com/package/cron-validator) or [cron-parser](https://www.npmjs.com/package/cron-parser).

### Supported Locales

- en - English
- cs - Czech
- es - Spanish
- da - Danish
- de - German
- fi - Finnish
- fr - French
- fa - Farsi
- he - Hebrew
- it - Italian
- ja - Japanese
- ko - Korean
- nb - Norwegian
- nl - Dutch
- pl - Polish
- pt_BR - Portuguese (Brazil)
- ro - Romanian
- ru - Russian
- sk - Slovakian
- sl - Slovenian
- sw - Swahili
- sv - Swedish
- tr - Turkish
- uk - Ukrainian
- zh_CN - Chinese (Simplified)
- zh_TW - Chinese (Traditional)

## License

cRonstrue is freely distributable under the terms of the [MIT license](https://github.com/bradymholt/cronstrue/blob/master/LICENSE).
