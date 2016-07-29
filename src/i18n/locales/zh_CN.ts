import { Locale } from '../locale'
export class zh_CN implements Locale {
    AtX0SecondsPastTheMinuteGt20(): string { return null; }
    AtX0MinutesPastTheHourGt20(): string { return null; }
    ComaMonthX0ThroughMonthX1(): string { return null; }
    ComaYearX0ThroughYearX1(): string { return null; }

    Use24HourTimeFormatByDefault() { return false; }

    EveryMinute() {
        return "每分钟";
    }
    EveryHour() {
        return "每小时";
    }
    AnErrorOccuredWhenGeneratingTheExpressionD() {
        return "生成表达式描述时发生了错误，请检查cron表达式语法。";
    }
    AtSpace() {
        return "在 ";
    }
    EveryMinuteBetweenX0AndX1() {
        return "在 %s 和 %s 之间的每分钟";
    }
    At() {
        return "在";
    }
    SpaceAnd() {
        return " 和";
    }
    EverySecond() {
        return "每秒";
    }
    EveryX0Seconds() {
        return "每 %s 秒";
    }
    SecondsX0ThroughX1PastTheMinute() {
        return "在每分钟的 %s 到 %s 秒";
    }
    AtX0SecondsPastTheMinute() {
        return "在每分钟的 %s 秒";
    }
    EveryX0Minutes() {
        return "每 %s 分钟";
    }
    MinutesX0ThroughX1PastTheHour() {
        return "在每小时的 %s 到 %s 分钟";
    }
    AtX0MinutesPastTheHour() {
        return "在每小时的 %s 分";
    }
    EveryX0Hours() {
        return "每 %s 小时";
    }
    BetweenX0AndX1() {
        return "在 %s 和 %s 之间";
    }
    AtX0() {
        return "在 %s";
    }
    ComaEveryDay() {
        return ", 每天";
    }
    ComaEveryX0DaysOfTheWeek() {
        return ", 每周的每 %s 天";
    }
    ComaX0ThroughX1() {
        return ", %s 到 %s";
    }
    First() {
        return "第一个";
    }
    Second() {
        return "第二个";
    }
    Third() {
        return "第三个";
    }
    Forth() {
        return "第四个";
    }
    Fifth() {
        return "第五个";
    }
    ComaOnThe() {
        return ", 在 ";
    }
    SpaceX0OfTheMonth() {
        return "%s 每月";
    }
    ComaOnTheLastX0OfTheMonth() {
        return ", 每月的最后一个 %s ";
    }
    ComaOnlyOnX0() {
        return ", 仅在 %s";
    }
    ComaEveryX0Months() {
        return ", 每 %s 月";
    }
    ComaOnlyInX0() {
        return ", 仅在 %s";
    }
    ComaOnTheLastDayOfTheMonth() {
        return ", 每月的最后一天";
    }
    ComaOnTheLastWeekdayOfTheMonth() {
        return ", 每月的最后一个平日";
    }
    FirstWeekday() {
        return "第一个平日";
    }
    WeekdayNearestDayX0() {
        return "最接近 %s 号的平日";
    }
    ComaOnTheX0OfTheMonth() {
        return ", 每月的 %s ";
    }
    ComaEveryX0Days() {
        return ", 每 %s 天";
    }
    ComaBetweenDayX0AndX1OfTheMonth() {
        return ", 在每月的 %s 和 %s 号之间";
    }
    ComaOnDayX0OfTheMonth() {
        return ", 每月的 %s 号";
    }
    SpaceAndSpace() {
        return " 和 ";
    }
    ComaEveryMinute() {
        return ", 每分钟";
    }
    ComaEveryHour() {
        return ", 每小时";
    }
    ComaEveryX0Years() {
        return ", 每 %s 年";
    }
    CommaStartingX0() {
        return ", 开始 %s";
    }
    DaysOfTheWeek() {
        return ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    }
    MonthsOfTheYear() {
        return ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
    }
}
