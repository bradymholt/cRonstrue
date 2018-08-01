#!/usr/bin/env npx jbash

/* Converts a Cron Expression Descriptor (https://github.com/bradymholt/cron-expression-descriptor/blob/master/scripts/release.js)
   locale to a cronstrue locale.

   Example usage:
     convert-ced-locale.js /Users/jdoe/cron-expression-descriptor/lib/Resources.ja.resx
*/

const xmlHelper = require("pixl-xml");
const xmlContent = cat($1);
const parsed = xmlHelper.parse(xmlContent);
const locale = $1
  .split(".")
  .slice(-2)
  .shift();
const path = require("path");
const targetLocaleFile = path.join(__dirname, `../src/i18n/locales/${locale}.ts`);

let methodNamesTranslated = [];
const lines = [];
for (let key in parsed.data) {
  if (parsed.data.hasOwnProperty(key)) {
    let name = parsed.data[key].name.charAt(0).toLowerCase() + parsed.data[key].name.slice(1);
    if (name == "atX0SecondsPastTheMinuteGt20") {
      atX0SecondsPastTheMinuteGt20Specified = true;
    } else if (name == "atX0MinutesPastTheHourGt20") {
      atX0MinutesPastTheHourGt20Specified = true;
    }

    // Fix coma misspelling
    name = name.replace(/coma/g, "comma");

    const value = parsed.data[key].value.replace(/\{\d\}/g, "%s");
    lines.push(`${name}(): string {
      return "${value}";
    }`);

    methodNamesTranslated.push(name);
  }
}

// Add required but optional properties
const methodsToDefaultIfMissing = [
  "atX0SecondsPastTheMinuteGt20",
  "atX0MinutesPastTheHourGt20",
  "commaMonthX0ThroughMonthX1",
  "commaYearX0ThroughYearX1"
];
for (let property of methodsToDefaultIfMissing) {
  if (!methodNamesTranslated.includes(property)) {
    lines.push(`${property}(): string {
      return null;
    }`);
  }
}

// Calculate and add daysOfTheWeek, monthsOfTheYear methods
lines.push(`
daysOfTheWeek() {
  return ${JSON.stringify(getDaysOfTheWeek(locale))};
}`);

lines.push(`
monthsOfTheYear() {
  return ${JSON.stringify(getMonthsOfTheYear(locale))};
}`);

const localeFileOutput = `\
import { Locale } from "../locale";
export class ${locale} implements Locale {
  use24HourTimeFormatByDefault() {
    return false;
  }

  ${lines.join("\n")}
}
`;

// Write the locale file
echo(localeFileOutput, targetLocaleFile);
// Add locale file to list of available locales
$(`echo 'export { ${locale} } from \"./locales/${locale}\";' >> ${path.join(__dirname, `../src/i18n/allLocales.ts`)}`)

echo(`Done!`);

function getDaysOfTheWeek(locale) {
  var daysOfTheWeek = [];
  var monday = new Date();
  monday.setDate(monday.getDate() - ((monday.getDay() + 6) % 7));
  for (var i = 0; i <= 6; i++) {
    var currentDow = new Date();
    currentDow.setDate(monday.getDate() + i);
    var dowName = currentDow.toLocaleString(locale, { weekday: "long" });
    daysOfTheWeek.push(dowName);
  }
  return daysOfTheWeek;
}

function getMonthsOfTheYear(locale) {
  var monthsOfTheYear = [];
  var january = new Date(new Date().getFullYear(), 0, 1);
  for (var i = 0; i <= 11; i++) {
    var currentMonth = new Date();
    currentMonth.setMonth(january.getMonth() + i);
    var monthName = currentMonth.toLocaleString(locale, { month: "long" });
    monthsOfTheYear.push(monthName);
  }
  return monthsOfTheYear;
}
