import CasingTypeEnum from './casingTypeEnum'

export default class Options {
    
    throwExceptionOnParseError: boolean;
    casingType: CasingTypeEnum;
    verbose: boolean;
    dayOfWeekStartIndexZero: boolean;
    use24HourTimeFormat: boolean;

    constructor(){
        this.throwExceptionOnParseError = true;
        this.casingType = CasingTypeEnum.SENTENCE;
        this.verbose = false;
        this.dayOfWeekStartIndexZero = true;
        this.use24HourTimeFormat = false;

    }
}