export class StringUtilities {
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
}