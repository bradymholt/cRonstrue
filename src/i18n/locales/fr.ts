import { Locale } from '../locale'
export class fr implements Locale {
    AtX0SecondsPastTheMinuteGt20(): string { return null; }
    AtX0MinutesPastTheHourGt20(): string { return null; }
    ComaMonthX0ThroughMonthX1(): string { return null; }
    ComaYearX0ThroughYearX1(): string { return null; }

    Use24HourTimeFormatByDefault() { return false; }

    EveryMinute() {
        return "toutes les minutes";
    }
    EveryHour() {
        return "toutes les heures";
    }
    AnErrorOccuredWhenGeneratingTheExpressionD() {
        return "Une erreur est survenue en générant la description de l'expression cron. Vérifiez sa syntaxe.";
    }
    AtSpace() {
        return "À ";
    }
    EveryMinuteBetweenX0AndX1() {
        return "Toutes les minutes entre %s et %s";
    }
    At() {
        return "À";
    }
    SpaceAnd() {
        return " et";
    }
    EverySecond() {
        return "toutes les secondes";
    }
    EveryX0Seconds() {
        return "toutes les %s secondes";
    }
    SecondsX0ThroughX1PastTheMinute() {
        return "les secondes entre %s et %s après la minute";
    }
    AtX0SecondsPastTheMinute() {
        return "%s secondes après la minute";
    }
    EveryX0Minutes() {
        return "toutes les %s minutes";
    }
    MinutesX0ThroughX1PastTheHour() {
        return "les minutes entre %s et %s après l'heure";
    }
    AtX0MinutesPastTheHour() {
        return "%s minutes après l'heure";
    }
    EveryX0Hours() {
        return "toutes les %s heures";
    }
    BetweenX0AndX1() {
        return "de %s à %s";
    }
    AtX0() {
        return "à %s";
    }
    ComaEveryDay() {
        return ", tous les jours";
    }
    ComaEveryX0DaysOfTheWeek() {
        return ", every %s days of the week";
    }
    ComaX0ThroughX1() {
        return ", de %s à %s";
    }
    First() {
        return "premier";
    }
    Second() {
        return "second";
    }
    Third() {
        return "troisième";
    }
    Forth() {
        return "quatrième";
    }
    Fifth() {
        return "cinquième";
    }
    ComaOnThe() {
        return ", le ";
    }
    SpaceX0OfTheMonth() {
        return " %s du mois";
    }
    ComaOnTheLastX0OfTheMonth() {
        return ", le dernier %s du mois";
    }
    ComaOnlyOnX0() {
        return ", uniquement le %s";
    }
    ComaEveryX0Months() {
        return ", tous les %s mois";
    }
    ComaOnlyInX0() {
        return ", uniquement en %s";
    }
    ComaOnTheLastDayOfTheMonth() {
        return ", le dernier jour du mois";
    }
    ComaOnTheLastWeekdayOfTheMonth() {
        return ", le dernier jour ouvrable du mois";
    }
    FirstWeekday() {
        return "premier jour ouvrable";
    }
    WeekdayNearestDayX0() {
        return "jour ouvrable le plus proche du %s";
    }
    ComaOnTheX0OfTheMonth() {
        return ", le %s du mois";
    }
    ComaEveryX0Days() {
        return ", tous les %s jours";
    }
    ComaBetweenDayX0AndX1OfTheMonth() {
        return ", du %s au %s du mois";
    }
    ComaOnDayX0OfTheMonth() {
        return ", le %s du mois";
    }
    SpaceAndSpace() {
        return " et ";
    }
    ComaEveryMinute() {
        return ", toutes les minutes";
    }
    ComaEveryHour() {
        return ", toutes les heures";
    }
    ComaEveryX0Years() {
        return ", tous les %s ans";
    }
    ComaDaysX0ThroughX1() {
        return ", du %s au %s";
    }
    WeekSpaceAndSpace() {
        return " et le ";
    }
    CommaStartingX0() {
        return ", départ %s";
    }
    DaysOfTheWeek() {
        return ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"]
    }
    MonthsOfTheYear() {
        return ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
    }
}
