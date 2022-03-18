function ordinalSuffixOf(n: string) {
  if (!n) {
    return "";
  }
  var i = Number(n);
  var j = i % 10,
    k = i % 100;
  if (j == 1 && k != 11) {
    return i + "st";
  }
  if (j == 2 && k != 12) {
    return i + "nd";
  }
  if (j == 3 && k != 13) {
    return i + "rd";
  }
  return i + "th";
}

export class StringUtilities {
  /**
   * Takes a string with '%s' placeholders and replaces them with provided values.
   * Works like sprintf in C or string.Format in C#.
   * Takes a string with '%t' placeholders and replaces them with provided values in 1st, 2nd, 3rd format.
   * @static
   * @param {string} template - The string template with enclosed %s replacements
   * @param {...string[]} values - The ordered replacement text
   * @returns {string}
   */
  static format(template: string, ...values: string[]): string {
    return template
      .replace(/%s/g, function (substring: string, ...args: any[]): string {
        return values.shift() as string;
      })
      .replace(/%t/g, function (substring: string, ...args: any[]): string {
        const value = ordinalSuffixOf(values.shift() || "");
        return value as string;
      });
  }

  /**
   *
   * Given a string and an array of search strings, determines if the string
   * contains any value from the array.
   * @static
   * @param {string} text - The string to search
   * @param {string[]} searchStrings - The array of values to search for
   * @returns {boolean}
   */
  static containsAny(text: string, searchStrings: string[]): boolean {
    return searchStrings.some((c) => {
      return text.indexOf(c) > -1;
    });
  }
}
