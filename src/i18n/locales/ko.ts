// Korean

import { Locale } from "../locale";

export class ko implements Locale {
  public setPeriodBeforeTime(): boolean {
    return true;
  }

  public pm(): string {
    return "오후";
  }

  public am(): string {
    return "오전";
  }

  public atX0SecondsPastTheMinuteGt20(): string {
    return null;
  }

  public atX0MinutesPastTheHourGt20(): string {
    return null;
  }

  public commaMonthX0ThroughMonthX1(): string {
    return null;
  }

  public commaYearX0ThroughYearX1(): string {
    return null;
  }

  public use24HourTimeFormatByDefault() {
    return false;
  }

  public anErrorOccuredWhenGeneratingTheExpressionD() {
    return "표현식 설명을 생성하는 중 오류가 발생했습니다. cron 표현식 구문을 확인하십시오.";
  }

  public everyMinute() {
    return "1분마다";
  }

  public everyHour() {
    return "1시간마다";
  }

  public atSpace() {
    return "에서 ";
  }

  public everyMinuteBetweenX0AndX1() {
    return "%s 및 %s 사이에 매 분";
  }

  public at() {
    return "에서";
  }

  public spaceAnd() {
    return " 및";
  }

  public everySecond() {
    return "1초마다";
  }

  public everyX0Seconds() {
    return "%s초마다";
  }

  public secondsX0ThroughX1PastTheMinute() {
    return "정분 후 %s초에서 %s초까지";
  }

  public atX0SecondsPastTheMinute() {
    return "정분 후 %s초에서";
  }

  public everyX0Minutes() {
    return "%s분마다";
  }

  public minutesX0ThroughX1PastTheHour() {
    return "정시 후 %s분에서 %s까지";
  }

  public atX0MinutesPastTheHour() {
    return "정시 후 %s분에서";
  }

  public everyX0Hours() {
    return "%s시간마다";
  }

  public betweenX0AndX1() {
    return "%s에서 %s 사이";
  }

  public atX0() {
    return "%s에서";
  }

  public commaEveryDay() {
    return ", 매일";
  }

  public commaEveryX0DaysOfTheWeek() {
    return ", 주 중 %s일마다";
  }

  public commaX0ThroughX1() {
    return ", %s에서 %s가지";
  }

  public first() {
    return "첫 번째";
  }

  public second() {
    return "두 번째";
  }

  public third() {
    return "세 번째";
  }

  public fourth() {
    return "네 번째";
  }

  public fifth() {
    return "다섯 번째";
  }

  public commaOnThe() {
    return ", 해당 ";
  }

  public spaceX0OfTheMonth() {
    return " 해당 월의 %s";
  }

  public lastDay() {
    return "마지막 날";
  }

  public commaOnTheLastX0OfTheMonth() {
    return ", 해당 월의 마지막 %s";
  }

  public commaOnlyOnX0() {
    return ", %s에만";
  }

  public commaAndOnX0() {
    return ", 및 %s에";
  }

  public commaEveryX0Months() {
    return ", %s개월마다";
  }

  public commaOnlyInX0() {
    return ", %s에서만";
  }

  public commaOnTheLastDayOfTheMonth() {
    return ", 해당 월의 마지막 날에";
  }

  public commaOnTheLastWeekdayOfTheMonth() {
    return ", 해당 월의 마지막 평일에";
  }

  public commaDaysBeforeTheLastDayOfTheMonth() {
    return ", 해당 월의 마지막 날 %s일 전";
  }

  public firstWeekday() {
    return "첫 번째 평일";
  }

  public weekdayNearestDayX0() {
    return "평일 가장 가까운 날 %s";
  }

  public commaOnTheX0OfTheMonth() {
    return ", 해당 월의 %s에";
  }

  public commaEveryX0Days() {
    return ", %s일마다";
  }

  public commaBetweenDayX0AndX1OfTheMonth() {
    return ", 해당 월의 %s일 및 %s일 사이";
  }

  public commaOnDayX0OfTheMonth() {
    return ", 해당 월의 %s일에";
  }

  public commaEveryMinute() {
    return ", 1분마다";
  }

  public commaEveryHour() {
    return ", 1시간마다";
  }

  public commaEveryX0Years() {
    return ", %s년마다";
  }

  public commaStartingX0() {
    return ", %s부터";
  }

  public daysOfTheWeek() {
    return ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
  }

  public monthsOfTheYear() {
    return [
      "1월",
      "2월",
      "3월",
      "4월",
      "5월",
      "6월",
      "7월",
      "8월",
      "9월",
      "10월",
      "11월",
      "12월"
    ];
  }
}
