// Turkish

import { Locale } from "../locale";
export class tr implements Locale {
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
    return "her dakika";
  }
  everyHour() {
    return "her saat";
  }
  anErrorOccuredWhenGeneratingTheExpressionD() {
    return "İfade açıklamasını oluştururken bir hata oluştu. Cron ifadesini gözden geçirin.";
  }
  atSpace() {
    return "Saat ";
  }
  everyMinuteBetweenX0AndX1() {
    return "Saat %s ve %s arasındaki her dakika";
  }
  at() {
    return "Saat";
  }
  spaceAnd() {
    return " ve";
  }
  everySecond() {
    return "her saniye";
  }
  everyX0Seconds() {
    return "her %s saniyede bir";
  }
  secondsX0ThroughX1PastTheMinute() {
    return "dakikaların %s. ve %s. saniyeleri arası";
  }
  atX0SecondsPastTheMinute() {
    return "dakikaların %s. saniyesinde";
  }
  everyX0Minutes() {
    return "her %s dakikada bir";
  }
  minutesX0ThroughX1PastTheHour() {
    return "saatlerin %s. ve %s. dakikaları arası";
  }
  atX0MinutesPastTheHour() {
    return "saatlerin %s. dakikasında";
  }
  everyX0Hours() {
    return "her %s saatte";
  }
  betweenX0AndX1() {
    return "%s ile %s arasında";
  }
  atX0() {
    return "saat %s";
  }
  commaEveryDay() {
    return ", her gün";
  }
  commaEveryX0DaysOfTheWeek() {
    return ", ayın her %s günü";
  }
  commaX0ThroughX1() {
    return ", %s ile %s arasında";
  }
  first() {
    return "ilk";
  }
  second() {
    return "ikinci";
  }
  third() {
    return "üçüncü";
  }
  fourth() {
    return "dördüncü";
  }
  fifth() {
    return "beşinci";
  }
  commaOnThe() {
    return ", ayın ";
  }
  spaceX0OfTheMonth() {
    return " %s günü";
  }
  lastDay() {
    return "son gün";
  }
  commaOnTheLastX0OfTheMonth() {
    return ", ayın son %s günü";
  }
  commaOnlyOnX0() {
    return ", sadece %s günü";
  }
  commaAndOnX0(){
    return ", ve %s";
  }
  commaEveryX0Months() {
    return ", %s ayda bir";
  }
  commaOnlyInX0() {
    return ", sadece %s için";
  }
  commaOnTheLastDayOfTheMonth() {
    return ", ayın son günü";
  }
  commaOnTheLastWeekdayOfTheMonth() {
    return ", ayın son iş günü";
  }
  commaDaysBeforeTheLastDayOfTheMonth(){
    return ", %s ayın son gününden önceki günler"
  }
  firstWeekday() {
    return "ilk iş günü";
  }
  weekdayNearestDayX0() {
    return "%s. günü sonrasındaki ilk iş günü";
  }
  commaOnTheX0OfTheMonth() {
    return ", ayın %s";
  }
  commaEveryX0Days() {
    return ", %s günde bir";
  }
  commaBetweenDayX0AndX1OfTheMonth() {
    return ", ayın %s. ve %s. günleri arası";
  }
  commaOnDayX0OfTheMonth() {
    return ", ayın %s. günü";
  }
  commaEveryX0Years() {
    return ", %s yılda bir";
  }
  commaStartingX0() {
    return ", başlangıç %s";
  }
  daysOfTheWeek() {
    return ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
  }
  monthsOfTheYear() {
    return [
      "Ocak",
      "Şubat",
      "Mart",
      "Nisan",
      "Mayıs",
      "Haziran",
      "Temmuz",
      "Ağustos",
      "Eylül",
      "Ekim",
      "Kasım",
      "Aralık"
    ];
  }
}
