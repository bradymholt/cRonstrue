// Chinese (Simplified)

import { Locale } from "../locale";
export class zh_CN implements Locale {
  setPeriodBeforeTime(): boolean {
    return true;
  }

  pm(): string {
    return "下午";
  }

  am(): string {
    return "上午";
  }

  atX0SecondsPastTheMinuteGt20(): string {
    return null;
  }
  atX0MinutesPastTheHourGt20(): string {
    return null;
  }
  commaMonthX0ThroughMonthX1(): string {
    return null;
  }
  commaYearX0ThroughYearX1(): string {
    return ", 从%s年至%s年";
  }
  use24HourTimeFormatByDefault() {
    return false;
  }
  everyMinute() {
    return "每分钟";
  }
  everyHour() {
    return "每小时";
  }
  anErrorOccuredWhenGeneratingTheExpressionD() {
    return "生成表达式描述时发生了错误，请检查cron表达式语法。";
  }
  atSpace() {
    return "在";
  }
  everyMinuteBetweenX0AndX1() {
    return "在 %s 至 %s 之间的每分钟";
  }
  at() {
    return "在";
  }
  spaceAnd() {
    return " 和";
  }
  everySecond() {
    return "每秒";
  }
  everyX0Seconds() {
    return "每隔 %s 秒";
  }
  secondsX0ThroughX1PastTheMinute() {
    return "在每分钟的第 %s 到 %s 秒";
  }
  atX0SecondsPastTheMinute() {
    return "在每分钟的第 %s 秒";
  }
  everyX0Minutes() {
    return "每隔 %s 分钟";
  }
  minutesX0ThroughX1PastTheHour() {
    return "在每小时的第 %s 到 %s 分钟";
  }
  atX0MinutesPastTheHour() {
    return "在每小时的第 %s 分钟";
  }
  everyX0Hours() {
    return "每隔 %s 小时";
  }
  betweenX0AndX1() {
    return "在 %s 和 %s 之间";
  }
  atX0() {
    return "在%s";
  }
  commaEveryDay() {
    return ", 每天";
  }
  commaEveryX0DaysOfTheWeek() {
    return ", 每周的每 %s 天";
  }
  commaX0ThroughX1() {
    return ", %s至%s";
  }
  first() {
    return "第一个";
  }
  second() {
    return "第二个";
  }
  third() {
    return "第三个";
  }
  fourth() {
    return "第四个";
  }
  fifth() {
    return "第五个";
  }
  commaOnThe() {
    return ", 限每月的";
  }
  spaceX0OfTheMonth() {
    return "%s";
  }
  lastDay() {
    return "本月最后一天";
  }
  commaOnTheLastX0OfTheMonth() {
    return ", 限每月的最后一个%s";
  }
  commaOnlyOnX0() {
    return ", 仅%s";
  }
  commaAndOnX0(){
    return ", 并且为%s";
  }
  commaEveryX0Months() {
    return ", 每隔 %s 个月";
  }
  commaOnlyInX0() {
    return ", 仅限%s";
  }
  commaOnlyInMonthX0() {
    return ", 仅于%s份";
  }
  commaOnlyInYearX0() {
    return ", 仅于 %s 年";
  }
  commaOnTheLastDayOfTheMonth() {
    return ", 限每月的最后一天";
  }
  commaOnTheLastWeekdayOfTheMonth() {
    return ", 限每月的最后一个工作日";
  }
  commaDaysBeforeTheLastDayOfTheMonth(){
    return ", 限每月最后%s天";
  }
  firstWeekday() {
    return "第一个工作日";
  }
  weekdayNearestDayX0() {
    return "最接近 %s 号的工作日";
  }
  commaOnTheX0OfTheMonth() {
    return ", 限每月的%s";
  }
  commaEveryX0Days() {
    return ", 每隔 %s 天";
  }
  commaBetweenDayX0AndX1OfTheMonth() {
    return ", 限每月的 %s 至 %s 之间";
  }
  commaOnDayX0OfTheMonth() {
    return ", 限每月%s";
  }
  commaEveryX0Years() {
    return ", 每隔 %s 年";
  }
  commaStartingX0() {
    return ", %s开始";
  }
  dayX0() {
    return " %s 号";
  }
  daysOfTheWeek() {
    return ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
  }
  monthsOfTheYear() {
    return ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
  }
}
