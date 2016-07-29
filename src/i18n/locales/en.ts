import { Locale } from '../locale'

export class en implements Locale {
    AtX0SecondsPastTheMinuteGt20(): string { return null; }
    AtX0MinutesPastTheHourGt20(): string { return null; }
    ComaMonthX0ThroughMonthX1(): string { return null; }
    ComaYearX0ThroughYearX1(): string { return null; }

    Use24HourTimeFormatByDefault() { return false; }

    AnErrorOccuredWhenGeneratingTheExpressionD() {
        return "An error occured when generating the expression description.  Check the cron expression syntax.";
    };
    EveryMinute() {
        return "every minute";
    };
    EveryHour() {
        return "every hour";
    };
    AtSpace() {
        return "At ";
    };
    EveryMinuteBetweenX0AndX1() {
        return "Every minute between %s and %s";
    };
    At() {
        return "At";
    };
    SpaceAnd() {
        return " and";
    };
    EverySecond() {
        return "every second";
    };
    EveryX0Seconds() {
        return "every %s seconds";
    };
    SecondsX0ThroughX1PastTheMinute() {
        return "seconds %s through %s past the minute";
    };
    AtX0SecondsPastTheMinute() {
        return "at %s seconds past the minute";
    };
    EveryX0Minutes() {
        return "every %s minutes";
    };
    MinutesX0ThroughX1PastTheHour() {
        return "minutes %s through %s past the hour";
    };
    AtX0MinutesPastTheHour() {
        return "at %s minutes past the hour";
    };
    EveryX0Hours() {
        return "every %s hours";
    };
    BetweenX0AndX1() {
        return "between %s and %s";
    };
    AtX0() {
        return "at %s";
    };
    ComaEveryDay() {
        return ", every day";
    };
    ComaEveryX0DaysOfTheWeek() {
        return ", every %s days of the week";
    };
    ComaX0ThroughX1() {
        return ", %s through %s";
    };
    First() {
        return "first";
    };
    Second() {
        return "second";
    };
    Third() {
        return "third";
    };
    Forth() {
        return "forth";
    };
    Fifth() {
        return "fifth";
    };
    ComaOnThe() {
        return ", on the ";
    };
    SpaceX0OfTheMonth() {
        return " %s of the month";
    };
    ComaOnTheLastX0OfTheMonth() {
        return ", on the last %s of the month";
    };
    ComaOnlyOnX0() {
        return ", only on %s";
    };
    ComaEveryX0Months() {
        return ", every %s months";
    };
    ComaOnlyInX0() {
        return ", only in %s";
    };
    ComaOnTheLastDayOfTheMonth() {
        return ", on the last day of the month";
    };
    ComaOnTheLastWeekdayOfTheMonth() {
        return ", on the last weekday of the month";
    };
    FirstWeekday() {
        return "first weekday";
    };
    WeekdayNearestDayX0() {
        return "weekday nearest day %s";
    };
    ComaOnTheX0OfTheMonth() {
        return ", on the %s of the month";
    };
    ComaEveryX0Days() {
        return ", every %s days";
    };
    ComaBetweenDayX0AndX1OfTheMonth() {
        return ", between day %s and %s of the month";
    };
    ComaOnDayX0OfTheMonth() {
        return ", on day %s of the month";
    };
    SpaceAndSpace() {
        return " and ";
    };
    ComaEveryMinute() {
        return ", every minute";
    };
    ComaEveryHour() {
        return ", every hour";
    };
    ComaEveryX0Years() {
        return ", every %s years";
    };
    CommaStartingX0() {
        return ", starting %s";
    };
    DaysOfTheWeek() {
        return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    }
    MonthsOfTheYear() {
        return ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    }
}
