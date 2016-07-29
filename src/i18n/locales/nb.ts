import { Locale } from "../locale"
export class nb implements Locale {
    AtX0SecondsPastTheMinuteGt20(): string { return null; }
    AtX0MinutesPastTheHourGt20(): string { return null; }
    ComaMonthX0ThroughMonthX1(): string { return null; }
    ComaYearX0ThroughYearX1(): string { return null; }

    Use24HourTimeFormatByDefault() { return false; }

    AnErrorOccuredWhenGeneratingTheExpressionD() {
        return "En feil intraff ved generering av uttrykksbeskrivelse. Sjekk cron syntaks.";
    }
    At() {
        return "På";
    }
    AtSpace() {
        return "På ";
    }
    AtX0() {
        return "på %s";
    }
    AtX0MinutesPastTheHour() {
        return "på %s minutter etter timen";
    }
    AtX0SecondsPastTheMinute() {
        return "på %s sekunder etter minuttet";
    }
    BetweenX0AndX1() {
        return "mellom %s og %s";
    }
    ComaBetweenDayX0AndX1OfTheMonth() {
        return ", mellom dag %s og %s av måneden";
    }
    ComaEveryDay() {
        return ", hver dag";
    }
    ComaEveryHour() {
        return ", hver time";
    }
    ComaEveryMinute() {
        return ", hvert minutt";
    }
    ComaEveryX0Days() {
        return ", hver %s dag";
    }
    ComaEveryX0DaysOfTheWeek() {
        return ", hver %s ukedag";
    }
    ComaEveryX0Months() {
        return ", hver %s måned]";
    }
    ComaEveryX0Years() {
        return ", hvert %s år";
    }
    ComaOnDayX0OfTheMonth() {
        return ", på dag %s av måneden";
    }
    ComaOnlyInX0() {
        return ", bare i %s";
    }
    ComaOnlyOnX0() {
        return ", bare på %s";
    }
    ComaOnThe() {
        return ", på den ";
    }
    ComaOnTheLastDayOfTheMonth() {
        return ", på den siste dagen i måneden";
    }
    ComaOnTheLastWeekdayOfTheMonth() {
        return ", på den siste ukedagen i måneden";
    }
    ComaOnTheLastX0OfTheMonth() {
        return ", på den siste %s av måneden";
    }
    ComaOnTheX0OfTheMonth() {
        return ", på den %s av måneden";
    }
    ComaX0ThroughX1() {
        return ", %s til og med %s";
    }
    EveryHour() {
        return "hver time";
    }
    EveryMinute() {
        return "hvert minutt";
    }
    EveryMinuteBetweenX0AndX1() {
        return "Hvert minutt mellom %s og %s";
    }
    EverySecond() {
        return "hvert sekund";
    }
    EveryX0Hours() {
        return "hver %s time";
    }
    EveryX0Minutes() {
        return "hvert %s minutt";
    }
    EveryX0Seconds() {
        return "hvert %s sekund";
    }
    Fifth() {
        return "femte";
    }
    First() {
        return "første";
    }
    FirstWeekday() {
        return "første ukedag";
    }
    Forth() {
        return "fjede";
    }
    MinutesX0ThroughX1PastTheHour() {
        return "minuttene fra %s til og med %s etter timen";
    }
    Second() {
        return "sekund";
    }
    SecondsX0ThroughX1PastTheMinute() {
        return "sekundene fra %s til og med %s etter minuttet";
    }
    SpaceAnd() {
        return " og";
    }
    SpaceAndSpace() {
        return " og ";
    }
    SpaceX0OfTheMonth() {
        return " %s av måneden";
    }
    Third() {
        return "tredje";
    }
    WeekdayNearestDayX0() {
        return "ukedag nærmest dag %s";
    }
    CommaStartingX0() {
        return ", starter %s";
    }
    DaysOfTheWeek() {
        return ["søndag", "mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag"];
    }
    MonthsOfTheYear() {
        return ["januar", "februar", "mars", "april", "mai", "juni", "juli", "august", "september", "oktober", "november", "desember"];
    }
}
