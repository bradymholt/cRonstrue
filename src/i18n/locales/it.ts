import { Locale } from "../locale"
export class it implements Locale {
    AtX0SecondsPastTheMinuteGt20(): string { return null; }
    AtX0MinutesPastTheHourGt20(): string { return null; }
    ComaMonthX0ThroughMonthX1(): string { return null; }
    ComaYearX0ThroughYearX1(): string { return null; }

    Use24HourTimeFormatByDefault() { return true; }

    AnErrorOccuredWhenGeneratingTheExpressionD() {
        return "È verificato un errore durante la generazione la descrizione espressione. Controllare la sintassi delle espressioni cron.";
    }
    At() {
        return "Alle";
    }
    AtSpace() {
        return "Alle ";
    }
    AtX0() {
        return "alle %s";
    }
    AtX0MinutesPastTheHour() {
        return "al %s minuto passata l'ora";
    }
    AtX0SecondsPastTheMinute() {
        return "al %s secondo passato il minuto";
    }
    BetweenX0AndX1() {
        return "tra le %s e le %s";
    }
    ComaBetweenDayX0AndX1OfTheMonth() {
        return ", tra il giorno %s e %s del mese";
    }
    ComaEveryDay() {
        return ", ogni giorno";
    }
    ComaEveryHour() {
        return ", ogni ora";
    }
    ComaEveryMinute() {
        return ", ogni minuto";
    }
    ComaEveryX0Days() {
        return ", ogni %s giorni";
    }
    ComaEveryX0DaysOfTheWeek() {
        return ", ogni %s giorni della settimana";
    }
    ComaEveryX0Months() {
        return ", ogni %s mesi";
    }
    ComaEveryX0Years() {
        return ", ogni %s anni";
    }
    ComaOnDayX0OfTheMonth() {
        return ", il giorno %s del mese";
    }
    ComaOnlyInX0() {
        return ", solo in %s";
    }
    ComaOnlyOnX0() {
        return ", solo il %s";
    }
    ComaOnThe() {
        return ", il ";
    }
    ComaOnTheLastDayOfTheMonth() {
        return ", l'ultimo giorno del mese";
    }
    ComaOnTheLastWeekdayOfTheMonth() {
        return ", nell'ultima settimana del mese";
    }
    ComaOnTheLastX0OfTheMonth() {
        return ", l'ultimo %s del mese";
    }
    ComaOnTheX0OfTheMonth() {
        return ", il %s del mese";
    }
    ComaX0ThroughX1() {
        return ", %s al %s";
    }
    EveryHour() {
        return "ogni ora";
    }
    EveryMinute() {
        return "ogni minuto";
    }
    EveryMinuteBetweenX0AndX1() {
        return "Ogni minuto tra le %s e le %s";
    }
    EverySecond() {
        return "ogni secondo";
    }
    EveryX0Hours() {
        return "ogni %s ore";
    }
    EveryX0Minutes() {
        return "ogni %s minuti";
    }
    EveryX0Seconds() {
        return "ogni %s secondi";
    }
    Fifth() {
        return "quinto";
    }
    First() {
        return "primo";
    }
    FirstWeekday() {
        return "primo giorno della settimana";
    }
    Forth() {
        return "quarto";
    }
    MinutesX0ThroughX1PastTheHour() {
        return "minuti %s al %s dopo l'ora";
    }
    Second() {
        return "secondo";
    }
    SecondsX0ThroughX1PastTheMinute() {
        return "secondi %s al %s oltre il minuto";
    }
    SpaceAnd() {
        return " e";
    }
    SpaceAndSpace() {
        return " e ";
    }
    SpaceX0OfTheMonth() {
        return " %s del mese";
    }
    Third() {
        return "terzo";
    }
    WeekdayNearestDayX0() {
        return "giorno della settimana più vicino al %s";
    }
    CommaStartingX0() {
        return ", a partire %s";
    }
    DaysOfTheWeek() {
        return ["domenica", "lunedì", "martedì", "mercoledì", "giovedì", "venerdì", "sabato"];
    }
    MonthsOfTheYear() {
        return ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"];
    }
}
