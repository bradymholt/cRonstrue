// Ukranian

import { Locale } from "../locale";
export class uk implements Locale {
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
  use24HourTimeFormatByDefault() {
    return true;
  }
  everyMinute() {
    return "щохвилини";
  }
  everyHour() {
    return "щогодини";
  }
  anErrorOccuredWhenGeneratingTheExpressionD() {
    return "ВІдбулася помилка підчас генерації опису. Перевірта правильність написання cron виразу.";
  }
  atSpace() {
    return "О ";
  }
  everyMinuteBetweenX0AndX1() {
    return "Щохвилини між %s та %s";
  }
  at() {
    return "О";
  }
  spaceAnd() {
    return " та";
  }
  everySecond() {
    return "Щосекунди";
  }
  everyX0Seconds() {
    return "кожні %s секунд";
  }
  secondsX0ThroughX1PastTheMinute() {
    return "з %s по %s секунду";
  }
  atX0SecondsPastTheMinute() {
    return "о %s секунді";
  }
  everyX0Minutes() {
    return "кожні %s хвилин";
  }
  minutesX0ThroughX1PastTheHour() {
    return "з %s по %s хвилину";
  }
  atX0MinutesPastTheHour() {
    return "о %s хвилині";
  }
  everyX0Hours() {
    return "кожні %s годин";
  }
  betweenX0AndX1() {
    return "між %s та %s";
  }
  atX0() {
    return "о %s";
  }
  commaEveryDay() {
    return ", щоденно";
  }
  commaEveryX0DaysOfTheWeek() {
    return ", кожен %s день тижня";
  }
  commaX0ThroughX1() {
    return ", %s по %s";
  }
  first() {
    return "перший";
  }
  second() {
    return "другий";
  }
  third() {
    return "третій";
  }
  fourth() {
    return "четвертий";
  }
  fifth() {
    return "п'ятий";
  }
  commaOnThe() {
    return ", в ";
  }
  spaceX0OfTheMonth() {
    return " %s місяця";
  }
  lastDay() {
    return "останній день";
  }
  commaOnTheLastX0OfTheMonth() {
    return ", в останній %s місяця";
  }
  commaOnlyOnX0() {
    return ", тільки в %s";
  }
  commaAndOnX0(){
    return ", і в %s";
  }
  commaEveryX0Months() {
    return ", кожен %s місяць";
  }
  commaOnlyInX0() {
    return ", тільки в %s";
  }
  commaOnTheLastDayOfTheMonth() {
    return ", в останній день місяця";
  }
  commaOnTheLastWeekdayOfTheMonth() {
    return ", в останній будень місяця";
  }
  commaDaysBeforeTheLastDayOfTheMonth(){
    return ", %s днів до останнього дня місяця"
  }
  firstWeekday() {
    return "перший будень";
  }
  weekdayNearestDayX0() {
    return "будень найближчий до %s дня";
  }
  commaOnTheX0OfTheMonth() {
    return ", в %s місяця";
  }
  commaEveryX0Days() {
    return ", кожен %s день";
  }
  commaBetweenDayX0AndX1OfTheMonth() {
    return ", між %s та %s днями місяця";
  }
  commaOnDayX0OfTheMonth() {
    return ", на %s день місяця";
  }
  commaEveryX0Years() {
    return ", кожні %s роки";
  }
  commaStartingX0() {
    return ", початок %s";
  }
  daysOfTheWeek() {
    return ["неділя", "понеділок", "вівторок", "середа", "четвер", "п'ятниця", "субота"];
  }
  monthsOfTheYear() {
    return [
      "січень",
      "лютий",
      "березень",
      "квітень",
      "травень",
      "червень",
      "липень",
      "серпень",
      "вересень",
      "жовтень",
      "листопад",
      "грудень"
    ];
  }
}
