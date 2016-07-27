import { CasingTypeEnum } from './casingTypeEnum'

export interface IOptions {
    throwExceptionOnParseError?: boolean;
    casingType?: CasingTypeEnum;
    verbose?: boolean;
    dayOfWeekStartIndexZero?: boolean;
    use24HourTimeFormat?: boolean;
}