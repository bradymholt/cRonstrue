export class StringUtilities {
  /**
   * Takes a string with '%s' placeholders and replaces them with provided values.
   * Works like sprintf in C or string.Format in C#.
   * @static
   * @param {string} template - The string template with enclosed %s replacements
   * @param {...string[]} values - The ordered replacement text
   * @returns {string}
   */
  static format(template: string, ...values: string[]): string {
    return template.replace(/%s/g, function() {
      return values.shift();
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
    return searchStrings.some(c => {
      return text.indexOf(c) > -1;
    });
  }
}
