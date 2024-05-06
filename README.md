# cRonstrue ![Build Status](https://github.com/bradymholt/cRonstrue/workflows/Build/badge.svg) [![NPM Package](https://img.shields.io/npm/v/cronstrue.svg)](https://www.npmjs.com/package/cronstrue)

<img align="left" src="https://user-images.githubusercontent.com/759811/210273710-b13913e2-0a71-4d9d-94da-1fe538b8a73e.gif"/>

<br/>

 &nbsp;**Would you take a quick second and ⭐️ my repo?**

<br/>

cRonstrue is a JavaScript library that parses a cron expression and outputs a human readable description of the cron schedule.  For example, given the expression "*/5 * * * *" it will output "Every 5 minutes".

This library was ported from the original C# implementation called [cron-expression-descriptor](https://github.com/bradymholt/cron-expression-descriptor) and is also available in a [few other languages](https://github.com/bradymholt/cron-expression-descriptor#ports).

## Features
- Zero dependencies
- Supports all cron expression special characters including * / , - ? L W, #
- Supports 5, 6 (w/ seconds or year), or 7 (w/ seconds and year) part cron expressions
- [Quartz Job Scheduler](http://www.quartz-scheduler.org/) cron expressions are supported
- Supports time specification _nicknames_ (@yearly, @annually, @monthly, @weekly, @daily)
- i18n support with 30+ languages

## Demo

A demo is available [here](http://bradymholt.github.io/cRonstrue/#cronstrue-demo).

## Installation
cRonstrue is exported as an [UMD](https://github.com/umdjs/umd) module so it will work in an [AMD](https://github.com/amdjs/amdjs-api/wiki/AMD), [CommonJS](http://wiki.commonjs.org/wiki/CommonJS) or browser global context.

First, install the module:

```
npm install cronstrue
```

Then, depending upon your usage context, add a reference to it:

### Node / CommonJS

```js
const cronstrue = require('cronstrue');
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

Using the "latest" tag will result in a 302 redirect to the latest version tag so it is recommended to use a specific version tag such as https://unpkg.com/cronstrue@1.48.0/dist/cronstrue.min.js to avoid this redirect.

## Usage

```js
cronstrue.toString("* * * * *");
> "Every minute"

cronstrue.toString("0 23 ? * MON-FRI");
> "At 11:00 PM, Monday through Friday"

cronstrue.toString("0 23 * * *", { verbose: true });
> "At 11:00 PM, every day"

cronstrue.toString("23 12 * * SUN#2");
> "At 12:23 PM, on the second Sunday of the month"

cronstrue.toString("23 14 * * SUN#2", { use24HourTimeFormat: true });
> "At 14:23, on the second Sunday of the month"

cronstrue.toString("* * * ? * 2-6/2", { dayOfWeekStartIndexZero: false });
> "Every second, every 2 days of the week, Monday through Friday"

cronstrue.toString("* * * 6-8 *", { monthStartIndexZero: true });
> "Every minute, July through September"

cronstrue.toString("@monthly");
> "At 12:00 AM, on day 1 of the month"

```

For more usage examples, including a demonstration of how cRonstrue can handle some very complex cron expressions, you can [reference the unit tests](https://github.com/bradymholt/cRonstrue/blob/main/test/cronstrue.ts).

### CLI Usage

```sh
$ npm install -g cronstrue

$ cronstrue 1 2 3 4 5
At 02:01 AM, on day 3 of the month, and on Friday, only in April

$ cronstrue 1 2 3
Error: too few arguments (3): 1 2 3
Usage (5 args): cronstrue minute hour day-of-month month day-of-week
or
Usage (6 args): cronstrue second minute hour day-of-month month day-of-week
or
Usage (7 args): cronstrue second minute hour day-of-month month day-of-week year
```

## Options

An options object can be passed as the second parameter to `cronstrue.toString`.  The following options are available:

- **throwExceptionOnParseError: boolean** - If exception occurs when trying to parse expression and generate description, whether to throw or catch and output the Exception message as the description. (Default: true)
- **verbose: boolean** - Whether to use a verbose description (Default: false)
- **dayOfWeekStartIndexZero: boolean** - Whether to interpret cron expression DOW `1` as Sunday or Monday. (Default: true)
- **monthStartIndexZero: boolean** - Wether to interpret January as `0` or `1`. (Default: false)
- **use24HourTimeFormat: boolean** - If true, descriptions will use a [24-hour clock](https://en.wikipedia.org/wiki/24-hour_clock) (Default: false but some translations will default to true)
- **locale: string** - The locale to use (Default: "en")
- **tzOffset: number** - Your time offset (in hours) from UTC (Default: 0)

## i18n

To use the i18n support cRonstrue provides, you can either import all the supported locales at once (using `cronstrue/i18n`) or import individual locales (using `cronstrue/locales/[locale]`).  Then, when calling `toString` you pass in the name of the locale you want to use.  For example, for the es (Spanish) locale, you would use: `cronstrue.toString("* * * * *", { locale: "es" })`.

### All Locales

You can import all locales at once with `cronstrue/i18n`.  This approach has the advantage of only having to load one module and having access to all supported locales.  The tradeoff with this approach is a larger module (~130k, minified) that will take longer to load, particularly when sending down to a browser.

```js
// Node / CommonJS
const cronstrue = require('cronstrue/i18n');

// ESM / webpack / TypeScript
import cronstrue from 'cronstrue/i18n';

// Browser
<script src="https://unpkg.com/cronstrue@latest/cronstrue-i18n.min.js" async></script>

cronstrue.toString("*/5 * * * *", { locale: "fr" }); // => Toutes les 5 minutes
cronstrue.toString("*/5 * * * *", { locale: "es" }); // => Cada 5 minutos
```

### Individual Locales

You can also load the main cronstrue module and then load individual locale modules you want to have access to.  This works well when you have one or more locales you know you need access to and want to minimize load time, particularly when sending down to a browser.  The main cronstrue module is about 42k (minified) and each locale is about 4k (minified) in size.

```js
// Node / CommonJS
const cronstrue = require('cronstrue');
require('cronstrue/locales/fr');
require('cronstrue/locales/es');

// ESM / webpack / TypeScript
import cronstrue from 'cronstrue';
import 'cronstrue/locales/fr';
import 'cronstrue/locales/es';

// Browser
<script src="https://unpkg.com/cronstrue@latest/dist/cronstrue.min.js" async></script>
<script src="https://unpkg.com/cronstrue@latest/locales/fr.min.js" async></script>
<script src="https://unpkg.com/cronstrue@latest/locales/es.min.js" async></script>

cronstrue.toString("*/5 * * * *", { locale: "fr" }); // => Toutes les 5 minutes
cronstrue.toString("*/5 * * * *", { locale: "es" }); // => Cada 5 minutos
```

## Frequently Asked Questions

1. The cron expression I am passing in is not valid and this library is giving strange output.  What should I do?

    This library does not do full validation of cron expressions and assumes the expression passed in is valid. If you need to validate an expression consider using a library like [cron-parser](https://www.npmjs.com/package/cron-parser).  Example validation with cron-parser:

   ```
   const cronParser = require("cron-parser");
   const cronstrue = require("cronstrue");

   const expression = "* * * * * *";

   // Validate expression first
   let isCronValid = true;
   try { cronParser.parseExpression(expression) } catch(e) { isCronValid = false; }

   // If valid, then pass into cRonstrue
   if (isCronValid) {
     console.log(cronstrue.toString("* * * * *"));
   }
   ```

2. Can cRonstrue output the next occurrence of the cron expression?

    No, cRonstrue does not support this.  This library simply describes a cron expression that is passed in.

### Supported Locales

The following locales can be passed in for the `locale` option.  Thank you to the author (shown below) of each translation!

- en - English ([Brady Holt](https://github.com/bradymholt))
- af - Afrikaans (Michael van Niekerk(https://github.com/mvniekerk))
- ar - Arabic ([Mohamed Nehad Shalabi](https://github.com/mohamednehad450))
- be - Belarusian ([Kirill Mikulich](https://github.com/KirillMikulich))
- bg - Bulgarian ([kamenf](https://github.com/kamenf))
- ca - Catalan ([Francisco Javier Barrena](https://github.com/fjbarrena))
- cs - Czech ([hanbar](https://github.com/hanbar))
- es - Spanish ([Ivan Santos](https://github.com/ivansg))
- da - Danish ([Rasmus Melchior Jacobsen](https://github.com/rmja))
- de - German ([Michael Schuler](https://github.com/mschuler))
- fi - Finnish ([Mikael Rosenberg](https://github.com/MR77FI))
- fr - French ([Arnaud TAMAILLON](https://github.com/Greybird))
- fa - Farsi ([A. Bahrami](https://github.com/alirezakoo))
- he - Hebrew ([Ilan Firsov](https://github.com/IlanF))
- hu - Hungarian ([Orcsity Norbert](https://github.com/Northber), Szabó Dániel)
- it - Italian ([rinaldihno](https://github.com/rinaldihno))
- id - Indonesia ([Hasan Basri](https://github.com/hasanbasri1993))
- ja - Japanese ([Alin Sarivan](https://github.com/asarivan))
- ko - Korean ([Ion Mincu](https://github.com/ionmincu))
- my - Malay (Malaysia) ([Ikhwan Abdullah](https://github.com/leychay))
- nb - Norwegian ([Siarhei Khalipski](https://github.com/KhalipskiSiarhei))
- nl - Dutch ([TotalMace](https://github.com/TotalMace))
- pl - Polish ([foka](https://github.com/foka))
- pt_BR - Portuguese (Brazil) ([Renato Lima](https://github.com/natenho))
- pt_PT - Portuguese (Portugal) ([POFerro](https://github.com/POFerro))
- ro - Romanian ([Illegitimis](https://github.com/illegitimis))
- ru - Russian ([LbISS](https://github.com/LbISS))
- sk - Slovakian ([hanbar](https://github.com/hanbar))
- sl - Slovenian ([Jani Bevk](https://github.com/jenzy))
- sw - Swahili ([Leylow Lujuo](https://github.com/leyluj))
- sv - Swedish ([roobin](https://github.com/roobin))
- th - Thai ([Teerapat Prommarak](https://github.com/xeusteerapat))
- tr - Turkish ([Mustafa SADEDİL](https://github.com/sadedil))
- uk - Ukrainian ([Taras](https://github.com/tbudurovych))
- vi - Vietnamese ([Nguyen Tan Phap](https://github.com/rikkapro0128))
- zh_CN - Chinese (Simplified) ([Star Peng](https://github.com/starpeng))
- zh_TW - Chinese (Traditional) ([Ricky Chiang](https://github.com/metavige))

## Sponsors

Thank you to the following sponsors of this project!

<a href="https://github.com/github"><img src="https://github.com/github.png" width="50px" alt="robjtede" style="max-width: 100%;"></a>
<a href="https://github.com/DevUtilsApp"><img src="https://github.com/DevUtilsApp.png" width="50px" alt="robjtede" style="max-width: 100%;"></a>
<a href="https://github.com/getsentry"><img src="https://github.com/getsentry.png" width="50px" alt="robjtede" style="max-width: 100%;"></a>
<a href="https://github.com/KevinWang15"><img src="https://github.com/KevinWang15.png" width="50px" alt="robjtede" style="max-width: 100%;"></a>
<a href="https://github.com/timheuer"><img src="https://github.com/timheuer.png" width="50px" alt="robjtede" style="max-width: 100%;"></a>


## License

cRonstrue is freely distributable under the terms of the [MIT license](https://github.com/bradymholt/cronstrue/blob/main/LICENSE).
