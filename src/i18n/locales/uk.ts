import { Locale } from '../locale'
export class uk implements Locale {
    AtX0SecondsPastTheMinuteGt20(): string { return null; }
    AtX0MinutesPastTheHourGt20(): string { return null; }
    ComaMonthX0ThroughMonthX1(): string { return null; }
    ComaYearX0ThroughYearX1(): string { return null; }

    Use24HourTimeFormatByDefault() { return true; }

    EveryMinute() {
        return "щохвилини";
    }
    EveryHour() {
        return "щогодини";
    }
    AnErrorOccuredWhenGeneratingTheExpressionD() {
        return "ВІдбулася помилка підчас генерації опису. Перевірта правильність написання cron виразу.";
    }
    AtSpace() {
        return "О ";
    }
    EveryMinuteBetweenX0AndX1() {
        return "Щохвилини між %s та %s";
    }
    At() {
        return "О";
    }
    SpaceAnd() {
        return " та";
    }
    EverySecond() {
        return "Щосекунди";
    }
    EveryX0Seconds() {
        return "кожні %s секунд";
    }
    SecondsX0ThroughX1PastTheMinute() {
        return "з %s по %s секунду";
    }
    AtX0SecondsPastTheMinute() {
        return "о %s секунді";
    }
    EveryX0Minutes() {
        return "кожні %s хвилин";
    }
    MinutesX0ThroughX1PastTheHour() {
        return "з %s по %s хвилину";
    }
    AtX0MinutesPastTheHour() {
        return "о %s хвилині";
    }
    EveryX0Hours() {
        return "кожні %s годин";
    }
    BetweenX0AndX1() {
        return "між %s та %s";
    }
    AtX0() {
        return "о %s";
    }
    ComaEveryDay() {
        return ", щоденно";
    }
    ComaEveryX0DaysOfTheWeek() {
        return ", кожен %s день тижня";
    }
    ComaX0ThroughX1() {
        return ", %s по %s";
    }
    First() {
        return "перший";
    }
    Second() {
        return "другий";
    }
    Third() {
        return "третій";
    }
    Forth() {
        return "четвертий";
    }
    Fifth() {
        return "п'ятий";
    }
    ComaOnThe() {
        return ", в ";
    }
    SpaceX0OfTheMonth() {
        return " %s місяця";
    }
    ComaOnTheLastX0OfTheMonth() {
        return ", в останній %s місяця";
    }
    ComaOnlyOnX0() {
        return ", тільки в %s";
    }
    ComaEveryX0Months() {
        return ", кожен %s місяць";
    }
    ComaOnlyInX0() {
        return ", тільки в %s";
    }
    ComaOnTheLastDayOfTheMonth() {
        return ", в останній день місяця";
    }
    ComaOnTheLastWeekdayOfTheMonth() {
        return ", в останній будень місяця";
    }
    FirstWeekday() {
        return "перший будень";
    }
    WeekdayNearestDayX0() {
        return "будень найближчий до %s дня";
    }
    ComaOnTheX0OfTheMonth() {
        return ", в %s місяця";
    }
    ComaEveryX0Days() {
        return ", кожен %s день";
    }
    ComaBetweenDayX0AndX1OfTheMonth() {
        return ", між %s та %s днями місяця";
    }
    ComaOnDayX0OfTheMonth() {
        return ", на %s день місяця";
    }
    SpaceAndSpace() {
        return " та ";
    }
    ComaEveryMinute() {
        return ", щохвилини";
    }
    ComaEveryHour() {
        return ", щогодини";
    }
    ComaEveryX0Years() {
        return ", кожні %s роки";
    }
    CommaStartingX0() {
        return ", початок %s";
    }
    DaysOfTheWeek() {
        return ["неділя", "понеділок", "вівторок", "середа", "четвер", "п'ятниця", "субота"];
    }
    MonthsOfTheYear() {
        return ["січень", "лютий", "березень", "квітень", "травень", "червень", "липень", "серпень", "вересень", "жовтень", "листопад", "грудень"];
    }
}
