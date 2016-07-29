import { Locale } from '../locale'

export class es implements Locale {
    AtX0SecondsPastTheMinuteGt20(): string { return null; }
    AtX0MinutesPastTheHourGt20(): string { return null; }
    ComaMonthX0ThroughMonthX1(): string { return null; }
    ComaYearX0ThroughYearX1(): string { return null; }

    AnErrorOccuredWhenGeneratingTheExpressionD() { return "Ocurrió un error mientras se generaba la descripción de la expresión. Revise la sintaxis de la expresión de cron." };
    At() { return "A las" };
    AtSpace() { return "A las " };
    AtX0() { return "a las {0}" };
    AtX0MinutesPastTheHour() { return "a los {0} minutos de la hora" };
    AtX0SecondsPastTheMinute() { return "a los {0} segundos del minuto" };
    BetweenX0AndX1() { return "entre las {0} y las {1}" };
    ComaBetweenDayX0AndX1OfTheMonth() { return ", entre los días {0} y {1} del mes" };
    ComaEveryDay() { return ", cada día" };
    ComaEveryHour() { return ", cada hora" };
    ComaEveryMinute() { return ", cada minuto" };
    ComaEveryX0Days() { return ", cada {0} días" };
    ComaEveryX0DaysOfTheWeek() { return ", cada {0} días de la semana" };
    ComaEveryX0Months() { return ", cada {0} meses" };
    ComaOnDayX0OfTheMonth() { return ", el día {0} del mes" };
    ComaOnlyInX0() { return ", sólo en {0}" };
    ComaOnlyOnX0() { return ", sólo el {0}" };
    ComaOnThe() { return ", en el " };
    ComaOnTheLastDayOfTheMonth() { return ", en el último día del mes" };
    ComaOnTheLastWeekdayOfTheMonth() { return ", en el último día de la semana del mes" };
    ComaOnTheLastX0OfTheMonth() { return ", en el último {0} del mes" };
    ComaOnTheX0OfTheMonth() { return ", en el {0} del mes" };
    ComaX0ThroughX1() { return ", de {0} a {1}" };
    EveryHour() { return "cada hora" };
    EveryMinute() { return "cada minuto" };
    EveryMinuteBetweenX0AndX1() { return "cada minuto entre las {0} y las {1}" };
    EverySecond() { return "cada segundo" };
    EveryX0Hours() { return "cada {0} horas" };
    EveryX0Minutes() { return "cada {0} minutos" };
    EveryX0Seconds() { return "cada {0} segundos" };
    Fifth() { return "quinto" };
    First() { return "primero" };
    FirstWeekday() { return "primer día de la semana" };
    Forth() { return "cuarto" };
    MinutesX0ThroughX1PastTheHour() { return "del minuto {0} al {1} pasada la hora" };
    Second() { return "segundo" };
    SecondsX0ThroughX1PastTheMinute() { return "En los segundos {0} al {1} de cada minuto" };
    SpaceAnd() { return " y" };
    SpaceAndSpace() { return " y " };
    SpaceX0OfTheMonth() { return " {0} del mes" };
    Third() { return "tercer" };
    WeekdayNearestDayX0() { return "día de la semana más próximo al {0}" };
    ComaEveryX0Years() { return ", cada {0} años" };
    CommaStartingX0() { return ", comenzando {0}" };
}
