import { Locale } from "../locale"
export class ro implements Locale {

    Use24HourTimeFormatByDefault() { return true; }

    AnErrorOccuredWhenGeneratingTheExpressionD() {
        return "Eroare la generarea descrierii. Verificați sintaxa.";
    }
    At() {
        return "La";
    }
    AtSpace() {
        return "La ";
    }
    AtX0() {
        return "la %s";
    }
    AtX0MinutesPastTheHour() {
        return "la și %s minute";
    }
    AtX0SecondsPastTheMinute() {
        return "la și %s secunde";
    }
    BetweenX0AndX1() {
        return "între %s și %s";
    }
    ComaBetweenDayX0AndX1OfTheMonth() {
        return ", între zilele %s și %s ale lunii";
    }
    ComaEveryDay() {
        return ", în fiecare zi";
    }
    ComaEveryHour() {
        return ", în fiecare oră";
    }
    ComaEveryMinute() {
        return ", în fiecare minut";
    }
    ComaEveryX0Days() {
        return ", la fiecare %s zile";
    }
    ComaEveryX0DaysOfTheWeek() {
        return ", la fiecare a %s-a zi a săptămânii";
    }
    ComaEveryX0Months() {
        return ", la fiecare %s luni";
    }
    ComaEveryX0Years() {
        return ", o dată la %s ani";
    }
    ComaOnDayX0OfTheMonth() {
        return ", în ziua %s a lunii";
    }
    ComaOnlyInX0() {
        return ", doar în %s";
    }
    ComaOnlyOnX0() {
        return ", doar %s";
    }
    ComaOnThe() {
        return ", în ";
    }
    ComaOnTheLastDayOfTheMonth() {
        return ", în ultima zi a lunii";
    }
    ComaOnTheLastWeekdayOfTheMonth() {
        return ", în ultima zi lucrătoare a lunii";
    }
    ComaOnTheLastX0OfTheMonth() {
        return ", în ultima %s a lunii";
    }
    ComaOnTheX0OfTheMonth() {
        return ", în %s a lunii";
    }
    ComaX0ThroughX1() {
        return ", de %s până %s";
    }
    EveryHour() {
        return "în fiecare oră";
    }
    EveryMinute() {
        return "în fiecare minut";
    }
    EveryMinuteBetweenX0AndX1() {
        return "În fiecare minut între %s și %s";
    }
    EverySecond() {
        return "în fiecare secundă";
    }
    EveryX0Hours() {
        return "la fiecare %s ore";
    }
    EveryX0Minutes() {
        return "la fiecare %s minute";
    }
    EveryX0Seconds() {
        return "la fiecare %s secunde";
    }
    Fifth() {
        return "a cincea";
    }
    First() {
        return "prima";
    }
    FirstWeekday() {
        return "prima zi a săptămânii";
    }
    Forth() {
        return "a patra";
    }
    MinutesX0ThroughX1PastTheHour() {
        return "între minutele %s și %s";
    }
    Second() {
        return "a doua";
    }
    SecondsX0ThroughX1PastTheMinute() {
        return "între secunda %s și secunda %s";
    }
    SpaceAnd() {
        return " și";
    }
    SpaceAndSpace() {
        return " și ";
    }
    SpaceX0OfTheMonth() {
        return " %s a lunii";
    }
    Third() {
        return "a treia";
    }
    WeekdayNearestDayX0() {
        return "cea mai apropiată zi a săptămânii de ziua %s";
    }
    ComaMinX0ThroughMinX1() {
        return ", de la %s până la %s";
    }
    ComaMonthX0ThroughMonthX1() {
        return ", din %s până în %s";
    }
    ComaYearX0ThroughYearX1() {
        return ", din %s până în %s";
    }
    AtX0MinutesPastTheHourGt20() {
        return "la și %s de minute";
    }
    AtX0SecondsPastTheMinuteGt20() {
        return "la și %s de secunde";
    }
    CommaStartingX0() {
        return ", pornire %s";
    }
    DaysOfTheWeek() {
        return ["duminică", "luni", "marți", "miercuri", "joi", "vineri", "sâmbătă"];
    }
    MonthsOfTheYear() {
        return ["ianuarie", "februarie", "martie", "aprilie", "mai", "iunie", "iulie", "august", "septembrie", "octombrie", "noiembrie", "decembrie"];
    }
}
