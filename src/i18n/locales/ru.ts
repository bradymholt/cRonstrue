import { Locale } from "../locale"
export class ru implements Locale {
    AtX0SecondsPastTheMinuteGt20(): string { return null; }
    AtX0MinutesPastTheHourGt20(): string { return null; }
    ComaMonthX0ThroughMonthX1(): string { return null; }
    ComaYearX0ThroughYearX1(): string { return null; }

    Use24HourTimeFormatByDefault() { return true; }

    EveryMinute() {
        return "каждую минуту";
    }
    EveryHour() {
        return "каждый час";
    }
    AnErrorOccuredWhenGeneratingTheExpressionD() {
        return "Произошла ошибка во время генерации описания выражения. Проверьте синтаксис крон-выражения.";
    }
    AtSpace() {
        return "В ";
    }
    EveryMinuteBetweenX0AndX1() {
        return "Каждую минуту с %s по %s";
    }
    At() {
        return "В";
    }
    SpaceAnd() {
        return " и";
    }
    EverySecond() {
        return "каждую секунду";
    }
    EveryX0Seconds() {
        return "каждые %s секунд";
    }
    SecondsX0ThroughX1PastTheMinute() {
        return "секунды с %s по %s";
    }
    AtX0SecondsPastTheMinute() {
        return "в %s секунд";
    }
    EveryX0Minutes() {
        return "каждые %s минут";
    }
    MinutesX0ThroughX1PastTheHour() {
        return "минуты с %s по %s";
    }
    AtX0MinutesPastTheHour() {
        return "в %s минут";
    }
    EveryX0Hours() {
        return "каждые %s часов";
    }
    BetweenX0AndX1() {
        return "с %s по %s";
    }
    AtX0() {
        return "в %s";
    }
    ComaEveryDay() {
        return ", каждый день";
    }
    ComaEveryX0DaysOfTheWeek() {
        return ", каждые %s дней недели";
    }
    ComaX0ThroughX1() {
        return ", %s по %s";
    }
    First() {
        return "первый";
    }
    Second() {
        return "второй";
    }
    Third() {
        return "третий";
    }
    Forth() {
        return "четвертый";
    }
    Fifth() {
        return "пятый";
    }
    ComaOnThe() {
        return ", в ";
    }
    SpaceX0OfTheMonth() {
        return " %s месяца";
    }
    ComaOnTheLastX0OfTheMonth() {
        return ", в последний %s месяца";
    }
    ComaOnlyOnX0() {
        return ", только в %s";
    }
    ComaEveryX0Months() {
        return ", каждые %s месяцев";
    }
    ComaOnlyInX0() {
        return ", только в %s";
    }
    ComaOnTheLastDayOfTheMonth() {
        return ", в последний день месяца";
    }
    ComaOnTheLastWeekdayOfTheMonth() {
        return ", в последний будний день месяца";
    }
    FirstWeekday() {
        return "первый будний день";
    }
    WeekdayNearestDayX0() {
        return "ближайший будний день к %s";
    }
    ComaOnTheX0OfTheMonth() {
        return ", в %s месяца";
    }
    ComaEveryX0Days() {
        return ", каждые %s дней";
    }
    ComaBetweenDayX0AndX1OfTheMonth() {
        return ", с %s по %s число месяца";
    }
    ComaOnDayX0OfTheMonth() {
        return ", в %s число месяца";
    }
    SpaceAndSpace() {
        return " и ";
    }
    ComaEveryMinute() {
        return ", каждую минуту";
    }
    ComaEveryHour() {
        return ", каждый час";
    }
    ComaEveryX0Years() {
        return ", каждые %s лет";
    }
    CommaStartingX0() {
        return ", начало %s";
    }
    DaysOfTheWeek() {
        return ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"];
    }
    MonthsOfTheYear() {
        return ["январь", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"];
    }
}
