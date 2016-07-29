import { Locale } from "../locale"
export class de implements Locale {
    AtX0SecondsPastTheMinuteGt20(): string { return null; }
    AtX0MinutesPastTheHourGt20(): string { return null; }
    ComaMonthX0ThroughMonthX1(): string { return null; }
    ComaYearX0ThroughYearX1(): string { return null; }

    Use24HourTimeFormatByDefault() { return true; }

    EveryMinute() {
        return "jede Minute";
    }
    EveryHour() {
        return "jede Stunde";
    }
    AnErrorOccuredWhenGeneratingTheExpressionD() {
        return "An error occured when generating the expression description.  Check the cron expression syntax.";
    }
    AtSpace() {
        return "Um ";
    }
    EveryMinuteBetweenX0AndX1() {
        return "Jede Minute zwischen %s und %s";
    }
    At() {
        return "Um";
    }
    SpaceAnd() {
        return " und";
    }
    EverySecond() {
        return "Jede Sekunde";
    }
    EveryX0Seconds() {
        return "alle %s Sekunden";
    }
    SecondsX0ThroughX1PastTheMinute() {
        return "Sekunden %s bis %s";
    }
    AtX0SecondsPastTheMinute() {
        return "bei Sekunde %s";
    }
    EveryX0Minutes() {
        return "alle %s Minuten";
    }
    MinutesX0ThroughX1PastTheHour() {
        return "Minuten %s bis %s";
    }
    AtX0MinutesPastTheHour() {
        return "bei Minute %s";
    }
    EveryX0Hours() {
        return "alle %s Stunden";
    }
    BetweenX0AndX1() {
        return "zwischen %s und %s";
    }
    AtX0() {
        return "um %s";
    }
    ComaEveryDay() {
        return ", jeden Tag";
    }
    ComaEveryX0DaysOfTheWeek() {
        return ", every %s days of the week";
    }
    ComaX0ThroughX1() {
        return ", %s bis %s";
    }
    First() {
        return "ersten";
    }
    Second() {
        return "zweiten";
    }
    Third() {
        return "dritten";
    }
    Forth() {
        return "vierten";
    }
    Fifth() {
        return "fünften";
    }
    ComaOnThe() {
        return ", am ";
    }
    SpaceX0OfTheMonth() {
        return " %s des Monats";
    }
    ComaOnTheLastX0OfTheMonth() {
        return ", am letzten %s des Monats";
    }
    ComaOnlyOnX0() {
        return ", nur am %s";
    }
    ComaEveryX0Months() {
        return ", alle %s Monate";
    }
    ComaOnlyInX0() {
        return ", nur im %s";
    }
    ComaOnTheLastDayOfTheMonth() {
        return ", am letzten Tag des Monats";
    }
    ComaOnTheLastWeekdayOfTheMonth() {
        return ", am letzten Werktag des Monats";
    }
    FirstWeekday() {
        return "ersten Werktag";
    }
    WeekdayNearestDayX0() {
        return "Werktag am nächsten zum %s Tag";
    }
    ComaOnTheX0OfTheMonth() {
        return ", am %s des Monats";
    }
    ComaEveryX0Days() {
        return ", alle %s Tage";
    }
    ComaBetweenDayX0AndX1OfTheMonth() {
        return ", zwischen Tag %s und %s des Monats";
    }
    ComaOnDayX0OfTheMonth() {
        return ", am %s Tag des Monats";
    }
    SpaceAndSpace() {
        return " und ";
    }
    ComaEveryMinute() {
        return ", jede Minute";
    }
    ComaEveryHour() {
        return ", jede Stunde";
    }
    ComaEveryX0Years() {
        return ", alle %s Jahre";
    }
    CommaStartingX0() {
        return ", beginnend %s";
    }
    DaysOfTheWeek() {
        return ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
    }
    MonthsOfTheYear() {
        return ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
    }
}
