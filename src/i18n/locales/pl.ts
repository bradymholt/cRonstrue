import { Locale } from '../locale'
export class pl implements Locale {
    AtX0SecondsPastTheMinuteGt20(): string { return null; }
    AtX0MinutesPastTheHourGt20(): string { return null; }
    ComaMonthX0ThroughMonthX1(): string { return null; }
    ComaYearX0ThroughYearX1(): string { return null; }

    Use24HourTimeFormatByDefault() { return true; }

    AnErrorOccuredWhenGeneratingTheExpressionD() {
        return "Wystąpił błąd podczas generowania opisu wyrażenia cron. Sprawdź składnię wyrażenia cron.";
    }
    At() {
        return "O";
    }
    AtSpace() {
        return "O ";
    }
    AtX0() {
        return "o %s";
    }
    AtX0MinutesPastTheHour() {
        return "w %s minucie";
    }
    AtX0SecondsPastTheMinute() {
        return "w %s sekundzie";
    }
    BetweenX0AndX1() {
        return "od %s do %s";
    }
    ComaBetweenDayX0AndX1OfTheMonth() {
        return ", od %s-ego do %s-ego dnia miesiąca";
    }
    ComaEveryDay() {
        return ", co dzień";
    }
    ComaEveryHour() {
        return ", co godzinę";
    }
    ComaEveryMinute() {
        return ", co minutę";
    }
    ComaEveryX0Days() {
        return ", co %s dni";
    }
    ComaEveryX0DaysOfTheWeek() {
        return ", co %s dni tygodnia";
    }
    ComaEveryX0Months() {
        return ", co %s miesięcy";
    }
    ComaEveryX0Years() {
        return ", co %s lat";
    }
    ComaOnDayX0OfTheMonth() {
        return ", %s-ego dnia miesiąca";
    }
    ComaOnlyInX0() {
        return ", tylko %s";
    }
    ComaOnlyOnX0() {
        return ", tylko %s";
    }
    ComaOnThe() {
        return ", ";
    }
    ComaOnTheLastDayOfTheMonth() {
        return ", ostatni dzień miesiąca";
    }
    ComaOnTheLastWeekdayOfTheMonth() {
        return ", ostatni dzień roboczy miesiąca";
    }
    ComaOnTheLastX0OfTheMonth() {
        return ", ostatni %s miesiąca";
    }
    ComaOnTheX0OfTheMonth() {
        return ", %s miesiąca";
    }
    ComaX0ThroughX1() {
        return ", od %s do %s";
    }
    EveryHour() {
        return "co godzinę";
    }
    EveryMinute() {
        return "co minutę";
    }
    EveryMinuteBetweenX0AndX1() {
        return "Co minutę od %s do %s";
    }
    EverySecond() {
        return "co sekundę";
    }
    EveryX0Hours() {
        return "co %s godzin";
    }
    EveryX0Minutes() {
        return "co %s minut";
    }
    EveryX0Seconds() {
        return "co %s sekund";
    }
    Fifth() {
        return "piąty";
    }
    First() {
        return "pierwszy";
    }
    FirstWeekday() {
        return "pierwszy dzień roboczy";
    }
    Forth() {
        return "czwarty";
    }
    MinutesX0ThroughX1PastTheHour() {
        return "minuty od %s do %s";
    }
    Second() {
        return "drugi";
    }
    SecondsX0ThroughX1PastTheMinute() {
        return "sekundy od %s do %s";
    }
    SpaceAnd() {
        return " i";
    }
    SpaceAndSpace() {
        return " i ";
    }
    SpaceX0OfTheMonth() {
        return " %s miesiąca";
    }
    Third() {
        return "trzeci";
    }
    WeekdayNearestDayX0() {
        return "dzień roboczy najbliższy %s-ego dnia";
    }
    CommaStartingX0() {
        return ", startowy %s";
    }
    DaysOfTheWeek() {
        return ["niedziela", "poniedziałek", "wtorek", "środa", "czwartek", "piątek", "sobota"];
    }
    MonthsOfTheYear() {
        return ["styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec", "lipiec", "sierpień", "wrzesień", "październik", "listopad", "grudzień"];
    }
}
