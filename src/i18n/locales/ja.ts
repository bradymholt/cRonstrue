import { Locale } from "../locale";
export class ja implements Locale {
  use24HourTimeFormatByDefault() {
    return false;
  }

  everyMinute(): string {
    return "毎分";
  }
  everyHour(): string {
    return "毎時";
  }
  anErrorOccuredWhenGeneratingTheExpressionD(): string {
    return "式の記述を生成する際にエラーが発生しました。Cron 式の構文を確認してください。";
  }
  atSpace(): string {
    return "次において実施";
  }
  everyMinuteBetweenX0AndX1(): string {
    return "%s から %s まで毎分";
  }
  at(): string {
    return "次において実施";
  }
  spaceAnd(): string {
    return "と";
  }
  everySecond(): string {
    return "毎秒";
  }
  everyX0Seconds(): string {
    return "%s 秒ごと";
  }
  secondsX0ThroughX1PastTheMinute(): string {
    return "毎分 %s 秒から %s 秒まで";
  }
  atX0SecondsPastTheMinute(): string {
    return "毎分 %s 秒過ぎ";
  }
  everyX0Minutes(): string {
    return "%s 分ごと";
  }
  minutesX0ThroughX1PastTheHour(): string {
    return "毎時 %s 分から %s 分まで";
  }
  atX0MinutesPastTheHour(): string {
    return "毎時 %s 分過ぎ";
  }
  everyX0Hours(): string {
    return "%s 時間ごと";
  }
  betweenX0AndX1(): string {
    return "%s と %s の間";
  }
  atX0(): string {
    return "次において実施 %s";
  }
  commaEveryDay(): string {
    return "、毎日";
  }
  commaEveryX0DaysOfTheWeek(): string {
    return "、週のうち %s 日ごと";
  }
  commaX0ThroughX1(): string {
    return "、%s から %s まで";
  }
  first(): string {
    return "1 番目";
  }
  second(): string {
    return "2 番目";
  }
  third(): string {
    return "3 番目";
  }
  fourth(): string {
    return "4 番目";
  }
  fifth(): string {
    return "5 番目";
  }
  commaOnThe(): string {
    return "次に";
  }
  spaceX0OfTheMonth(): string {
    return "月のうち %s";
  }
  commaOnTheLastX0OfTheMonth(): string {
    return "月の最後の %s に";
  }
  commaOnlyOnX0(): string {
    return "%s にのみ";
  }
  commaEveryX0Months(): string {
    return "、%s か月ごと";
  }
  commaOnlyInX0(): string {
    return "%s でのみ";
  }
  commaOnTheLastDayOfTheMonth(): string {
    return "次の最終日に";
  }
  commaOnTheLastWeekdayOfTheMonth(): string {
    return "月の最後の平日に";
  }
  firstWeekday(): string {
    return "最初の平日";
  }
  weekdayNearestDayX0(): string {
    return "%s 日の直近の平日";
  }
  commaOnTheX0OfTheMonth(): string {
    return "月の %s に";
  }
  commaEveryX0Days(): string {
    return "、%s 日ごと";
  }
  commaBetweenDayX0AndX1OfTheMonth(): string {
    return "、月の %s 日から %s 日の間";
  }
  commaOnDayX0OfTheMonth(): string {
    return "、月の %s 日目";
  }
  spaceAndSpace(): string {
    return "と";
  }
  commaEveryMinute(): string {
    return "、毎分";
  }
  commaEveryHour(): string {
    return "、毎時";
  }
  commaEveryX0Years(): string {
    return "、%s 年ごと";
  }
  commaStartingX0(): string {
    return "、%s に開始";
  }
  aMPeriod(): string {
    return "AM";
  }
  pMPeriod(): string {
    return "PM";
  }
  commaDaysBeforeTheLastDayOfTheMonth(): string {
    return "月の最終日の %s 日前";
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
    return null;
  }
  lastDay() {
    return "最終日";
  }
  commaAndOnX0() {
    return "、〜と %s";
  }
  daysOfTheWeek() {
    return ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"];
  }
  monthsOfTheYear() {
    return ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
  }
}
