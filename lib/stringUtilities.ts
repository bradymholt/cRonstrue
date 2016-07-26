export default class StringUtilities {
    static format(template:string, ...values:string[]){
        return template.replace(/%s/g, function () {
            return values.shift();
        });
    }

    static toProperCase(text:string) {
        return text.replace(/\w\S*/g, (txt) => {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

    static containsAny(text:string, searchStrings: string[]) {
        return searchStrings.some((c) => { return text.indexOf(c) > -1 })
    }
}