import { Locale } from "../locale"

export class es implements Locale {
    AtX0SecondsPastTheMinuteGt20(): string { return null; }
    AtX0MinutesPastTheHourGt20(): string { return null; }
    ComaMonthX0ThroughMonthX1(): string { return null; }
    ComaYearX0ThroughYearX1(): string { return null; }

    Use24HourTimeFormatByDefault() { return false; }

    AnErrorOccuredWhenGeneratingTheExpressionD() {
        return "Ocurrió un error mientras se generaba la descripción de la expresión. Revise la sintaxis de la expresión de cron.";
    };
    At() {
        return "A las";
    };
    AtSpace() {
        return "A las ";
    };
    AtX0() {
        return "a las %s";
    };
    AtX0MinutesPastTheHour() {
        return "a los %s minutos de la hora";
    };
    AtX0SecondsPastTheMinute() {
        return "a los %s segundos del minuto";
    };
    BetweenX0AndX1() {
        return "entre las %s y las %s";
    };
    ComaBetweenDayX0AndX1OfTheMonth() {
        return ", entre los días %s y %s del mes";
    };
    ComaEveryDay() {
        return ", cada día";
    };
    ComaEveryHour() {
        return ", cada hora";
    };
    ComaEveryMinute() {
        return ", cada minuto";
    };
    ComaEveryX0Days() {
        return ", cada %s días";
    };
    ComaEveryX0DaysOfTheWeek() {
        return ", cada %s días de la semana";
    };
    ComaEveryX0Months() {
        return ", cada %s meses";
    };
    ComaOnDayX0OfTheMonth() {
        return ", el día %s del mes";
    };
    ComaOnlyInX0() {
        return ", sólo en %s";
    };
    ComaOnlyOnX0() {
        return ", sólo el %s";
    };
    ComaOnThe() {
        return ", en el ";
    };
    ComaOnTheLastDayOfTheMonth() {
        return ", en el último día del mes";
    };
    ComaOnTheLastWeekdayOfTheMonth() {
        return ", en el último día de la semana del mes";
    };
    ComaOnTheLastX0OfTheMonth() {
        return ", en el último %s del mes";
    };
    ComaOnTheX0OfTheMonth() {
        return ", en el %s del mes";
    };
    ComaX0ThroughX1() {
        return ", de %s a %s";
    };
    EveryHour() {
        return "cada hora";
    };
    EveryMinute() {
        return "cada minuto";
    };
    EveryMinuteBetweenX0AndX1() {
        return "cada minuto entre las %s y las %s";
    };
    EverySecond() {
        return "cada segundo";
    };
    EveryX0Hours() {
        return "cada %s horas";
    };
    EveryX0Minutes() {
        return "cada %s minutos";
    };
    EveryX0Seconds() {
        return "cada %s segundos";
    };
    Fifth() {
        return "quinto";
    };
    First() {
        return "primero";
    };
    FirstWeekday() {
        return "primer día de la semana";
    };
    Forth() {
        return "cuarto";
    };
    MinutesX0ThroughX1PastTheHour() {
        return "del minuto %s al %s pasada la hora";
    };
    Second() {
        return "segundo";
    };
    SecondsX0ThroughX1PastTheMinute() {
        return "En los segundos %s al %s de cada minuto";
    };
    SpaceAnd() {
        return " y";
    };
    SpaceAndSpace() {
        return " y ";
    };
    SpaceX0OfTheMonth() {
        return " %s del mes";
    };
    Third() {
        return "tercer";
    };
    WeekdayNearestDayX0() {
        return "día de la semana más próximo al %s";
    };
    ComaEveryX0Years() {
        return ", cada %s años";
    };
    CommaStartingX0() {
        return ", comenzando %s";
    };
    DaysOfTheWeek() {
        return ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
    }
    MonthsOfTheYear() {
        return ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    }
}
