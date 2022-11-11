// Russian

import { Locale } from "../locale";

const getPhraseByNumber = (str: string | undefined, words: Array<string>) => {
  const number = Number(str);
  return number !== undefined
    ? words[number % 100 > 4 && number % 100 < 20 ? 2 : [2, 0, 1, 1, 1, 2][number % 10 < 5 ? Math.abs(number) % 10 : 5]]
    : words[2];
};
const getPhraseByDayOfWeek = (str: string | undefined, words: Array<string>) => {
  const number = Number(str);
  return number !== undefined
    ? words[number === 0 ? 0 : number === 1 || number === 2 || number === 4 ? 1 : 2]
    : words[1];
};

export class ru implements Locale {
  atX0SecondsPastTheMinuteGt20(): string | null {
    return null;
  }
  atX0MinutesPastTheHourGt20(): string | null {
    return null;
  }
  commaMonthX0ThroughMonthX1(): string | null {
    return null;
  }
  commaYearX0ThroughYearX1(): string | null {
    return null;
  }
  use24HourTimeFormatByDefault() {
    return true;
  }
  everyMinute() {
    return "каждую минуту";
  }
  everyHour() {
    return "каждый час";
  }
  anErrorOccuredWhenGeneratingTheExpressionD() {
    return "Произошла ошибка во время генерации описания выражения. Проверьте синтаксис крон-выражения.";
  }
  atSpace() {
    return "В ";
  }
  everyMinuteBetweenX0AndX1() {
    return "Каждую минуту с %s по %s";
  }
  at() {
    return "В";
  }
  spaceAnd() {
    return " и";
  }
  everySecond() {
    return "каждую секунду";
  }
  everyX0Seconds(s?: string) {
    return getPhraseByNumber(s, ["каждую %s секунду", "каждые %s секунды", "каждые %s секунд"]);
  }
  secondsX0ThroughX1PastTheMinute() {
    return "секунды с %s по %s";
  }
  atX0SecondsPastTheMinute(s?: string) {
    return getPhraseByNumber(s, ["в %s секунду", "в %s секунды", "в %s секунд"]);
  }
  everyX0Minutes(s?: string) {
    return getPhraseByNumber(s, ["каждую %s минуту", "каждые %s минуты", "каждые %s минут"]);
  }
  minutesX0ThroughX1PastTheHour() {
    return "минуты с %s по %s";
  }
  atX0MinutesPastTheHour(s?: string) {
    return getPhraseByNumber(s, ["в %s минуту", "в %s минуты", "в %s минут"]);
  }
  everyX0Hours(s?: string) {
    return getPhraseByNumber(s, ["каждый %s час", "каждые %s часа", "каждые %s часов"]);
  }
  betweenX0AndX1() {
    return "с %s по %s";
  }
  atX0() {
    return "в %s";
  }
  commaEveryDay() {
    return ", каждый день";
  }
  commaEveryX0DaysOfTheWeek(s?: string) {
    return getPhraseByNumber(s, ["", ", каждые %s дня недели", ", каждые %s дней недели"]);
  }
  commaX0ThroughX1(s?: string) {
    return s && (s[0] == "2" || s[0] == "3") ? ", со %s по %s" : ", с %s по %s";
  }
  commaAndX0ThroughX1(s?: string) {
    return s && (s[0] == "2" || s[0] == "3") ? " и со %s по %s" : " и с %s по %s";
  }
  first(s?: string) {
    return getPhraseByDayOfWeek(s, ["первое", "первый", "первую"]);
  }
  second(s?: string) {
    return getPhraseByDayOfWeek(s, ["второе", "второй", "вторую"]);
  }
  third(s?: string) {
    return getPhraseByDayOfWeek(s, ["третье", "третий", "третью"]);
  }
  fourth(s?: string) {
    return getPhraseByDayOfWeek(s, ["четвертое", "четвертый", "четвертую"]);
  }
  fifth(s?: string) {
    return getPhraseByDayOfWeek(s, ["пятое", "пятый", "пятую"]);
  }
  commaOnThe(s?: string) {
    return s === "2" ? ", во " : ", в ";
  }
  spaceX0OfTheMonth() {
    return " %s месяца";
  }
  lastDay() {
    return "последний день";
  }
  commaOnTheLastX0OfTheMonth(s?: string) {
    return getPhraseByDayOfWeek(s, [", в последнее %s месяца", ", в последний %s месяца", ", в последнюю %s месяца"]);
  }
  commaOnlyOnX0(s?: string) {
    return s && s[0] === "2" ? ", только во %s" : ", только в %s";
  }
  commaAndOnX0() {
    return ", и %s";
  }
  commaEveryX0Months(s?: string) {
    return getPhraseByNumber(s, ["", " каждые %s месяца", " каждые %s месяцев"]);
  }
  commaOnlyInMonthX0() {
    return ", только %s";
  }
  commaOnlyInX0() {
    return ", только в %s";
  }
  commaOnTheLastDayOfTheMonth() {
    return ", в последний день месяца";
  }
  commaOnTheLastWeekdayOfTheMonth() {
    return ", в последний будний день месяца";
  }
  commaDaysBeforeTheLastDayOfTheMonth(s?: string) {
    return getPhraseByNumber(s, [
      ", за %s день до конца месяца",
      ", за %s дня до конца месяца",
      ", за %s дней до конца месяца",
    ]);
  }
  firstWeekday() {
    return "первый будний день";
  }
  weekdayNearestDayX0() {
    return "ближайший будний день к %s числу";
  }
  commaOnTheX0OfTheMonth() {
    return ", в %s месяца";
  }
  commaEveryX0Days(s?: string) {
    return getPhraseByNumber(s, [", каждый %s день", ", каждые %s дня", ", каждые %s дней"]);
  }
  commaBetweenDayX0AndX1OfTheMonth(s?: string) {
    return s && s.substring(0, s.indexOf("-")) == "2" ? ", со %s по %s число месяца" : ", с %s по %s число месяца";
  }
  commaOnDayX0OfTheMonth(s?: string) {
    return s && s[0] == "2" ? ", во %s число месяца" : ", в %s число месяца";
  }
  commaEveryX0Years(s?: string) {
    return getPhraseByNumber(s, [", каждый %s год", ", каждые %s года", ", каждые %s лет"]);
  }
  commaStartingX0() {
    return ", начало %s";
  }
  daysOfTheWeek() {
    return ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"];
  }
  daysOfTheWeekInCase(f: number = 2) {
    return f == 1
      ? ["воскресенья", "понедельника", "вторника", "среды", "четверга", "пятницы", "субботы"]
      : ["воскресенье", "понедельник", "вторник", "среду", "четверг", "пятницу", "субботу"];
  }
  monthsOfTheYear() {
    return [
      "январь",
      "февраль",
      "март",
      "апрель",
      "май",
      "июнь",
      "июль",
      "август",
      "сентябрь",
      "октябрь",
      "ноябрь",
      "декабрь",
    ];
  }
  monthsOfTheYearInCase(f?: number) {
    return f == 1
      ? [
          "января",
          "февраля",
          "марта",
          "апреля",
          "мая",
          "июня",
          "июля",
          "августа",
          "сентября",
          "октября",
          "ноября",
          "декабря",
        ]
      : this.monthsOfTheYear();
  }
}
