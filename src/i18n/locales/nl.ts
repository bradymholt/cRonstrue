import { Locale } from "../locale"
export class nl implements Locale {
    AtX0SecondsPastTheMinuteGt20(): string { return null; }
    AtX0MinutesPastTheHourGt20(): string { return null; }
    ComaMonthX0ThroughMonthX1(): string { return null; }
    ComaYearX0ThroughYearX1(): string { return null; }

    Use24HourTimeFormatByDefault() { return false; }

    EveryMinute() {
        return "elke minuut";
    }
    EveryHour() {
        return "elk uur";
    }
    AnErrorOccuredWhenGeneratingTheExpressionD() {
        return "Er is een fout opgetreden bij het vertalen van de gegevens. Controleer de gegevens.";
    }
    AtSpace() {
        return "Op ";
    }
    EveryMinuteBetweenX0AndX1() {
        return "Elke minuut tussen %s en %s";
    }
    At() {
        return "Op";
    }
    SpaceAnd() {
        return " en";
    }
    EverySecond() {
        return "elke seconde";
    }
    EveryX0Seconds() {
        return "elke %s seconden";
    }
    SecondsX0ThroughX1PastTheMinute() {
        return "seconden %s t/m %s na de minuut";
    }
    AtX0SecondsPastTheMinute() {
        return "op %s seconden na de minuut";
    }
    EveryX0Minutes() {
        return "elke %s minuten";
    }
    MinutesX0ThroughX1PastTheHour() {
        return "minuut %s t/m %s na het uur";
    }
    AtX0MinutesPastTheHour() {
        return "op %s minuten na het uur";
    }
    EveryX0Hours() {
        return "elke %s uur";
    }
    BetweenX0AndX1() {
        return "tussen %s en %s";
    }
    AtX0() {
        return "op %s";
    }
    ComaEveryDay() {
        return ", elke dag";
    }
    ComaEveryX0DaysOfTheWeek() {
        return ", elke %s dagen van de week";
    }
    ComaX0ThroughX1() {
        return ", %s t/m %s";
    }
    First() {
        return "eerste";
    }
    Second() {
        return "tweede";
    }
    Third() {
        return "derde";
    }
    Forth() {
        return "vierde";
    }
    Fifth() {
        return "vijfde";
    }
    ComaOnThe() {
        return ", op de ";
    }
    SpaceX0OfTheMonth() {
        return " %s van de maand";
    }
    ComaOnTheLastX0OfTheMonth() {
        return ", op de laatste %s van de maand";
    }
    ComaOnlyOnX0() {
        return ", alleen op %s";
    }
    ComaEveryX0Months() {
        return ", elke %s maanden";
    }
    ComaOnlyInX0() {
        return ", alleen in %s";
    }
    ComaOnTheLastDayOfTheMonth() {
        return ", op de laatste dag van de maand";
    }
    ComaOnTheLastWeekdayOfTheMonth() {
        return ", op de laatste werkdag van de maand";
    }
    FirstWeekday() {
        return "eerste werkdag";
    }
    WeekdayNearestDayX0() {
        return "werkdag dichtst bij dag %s";
    }
    ComaOnTheX0OfTheMonth() {
        return ", op de %s van de maand";
    }
    ComaEveryX0Days() {
        return ", elke %s dagen";
    }
    ComaBetweenDayX0AndX1OfTheMonth() {
        return ", tussen dag %s en %s van de maand";
    }
    ComaOnDayX0OfTheMonth() {
        return ", op dag %s van de maand";
    }
    SpaceAndSpace() {
        return " en ";
    }
    ComaEveryMinute() {
        return ", elke minuut";
    }
    ComaEveryHour() {
        return ", elk uur";
    }
    ComaEveryX0Years() {
        return ", elke %s jaren";
    }
    CommaStartingX0() {
        return ", beginnend %s";
    }
    DaysOfTheWeek() {
        return ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"];
    }
    MonthsOfTheYear() {
        return ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"];
    }
}
