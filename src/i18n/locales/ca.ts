// Catalan
import { Locale } from "../locale";

export class ca implements Locale {
  atX0SecondsPastTheMinuteGt20(): string|null {
    return null;
  }
  atX0MinutesPastTheHourGt20(): string|null {
    return null;
  }
  commaMonthX0ThroughMonthX1(): string|null {
    return null;
  }
  commaYearX0ThroughYearX1(): string|null {
    return null;
  }

  use24HourTimeFormatByDefault() {
    return false;
  }

  anErrorOccuredWhenGeneratingTheExpressionD() {
    return "S'ha produït un error mentres es generava la descripció de l'expressió. Revisi la sintaxi de la expressió de cron.";
  }
  at() {
    return "A les";
  }
  atSpace() {
    return "A les ";
  }
  atX0() {
    return "a les %s";
  }
  atX0MinutesPastTheHour() {
    return "als %s minuts de l'hora";
  }
  atX0SecondsPastTheMinute() {
    return "als %s segonds del minut";
  }
  betweenX0AndX1() {
    return "entre les %s i les %s";
  }
  commaBetweenDayX0AndX1OfTheMonth() {
    return ", entre els dies %s i %s del mes";
  }
  commaEveryDay() {
    return ", cada dia";
  }
  commaEveryX0Days() {
    return ", cada %s dies";
  }
  commaEveryX0DaysOfTheWeek() {
    return ", cada %s dies de la setmana";
  }
  commaEveryX0Months() {
    return ", cada %s mesos";
  }
  commaOnDayX0OfTheMonth() {
    return ", el dia %s del mes";
  }
  commaOnlyInX0() {
    return ", sólo en %s";
  }
  commaOnlyOnX0() {
    return ", només el %s";
  }
  commaAndOnX0() {
    return ", i el %s";
  }
  commaOnThe() {
    return ", en el ";
  }
  commaOnTheLastDayOfTheMonth() {
    return ", en l'últim dia del mes";
  }
  commaOnTheLastWeekdayOfTheMonth() {
    return ", en l'últim dia de la setmana del mes";
  }
  commaDaysBeforeTheLastDayOfTheMonth() {
    return ", %s dies abans de l'últim dia del mes";
  }
  commaOnTheLastX0OfTheMonth() {
    return ", en l'últim %s del mes";
  }
  commaOnTheX0OfTheMonth() {
    return ", en el %s del mes";
  }
  commaX0ThroughX1() {
    return ", de %s a %s";
  }
  commaAndX0ThroughX1() {
    return ", i de %s a %s";
  }
  everyHour() {
    return "cada hora";
  }
  everyMinute() {
    return "cada minut";
  }
  everyMinuteBetweenX0AndX1() {
    return "cada minut entre les %s i les %s";
  }
  everySecond() {
    return "cada segon";
  }
  everyX0Hours() {
    return "cada %s hores";
  }
  everyX0Minutes() {
    return "cada %s minuts";
  }
  everyX0Seconds() {
    return "cada %s segons";
  }
  fifth() {
    return "cinquè";
  }
  first() {
    return "primer";
  }
  firstWeekday() {
    return "primer dia de la setmana";
  }
  fourth() {
    return "quart";
  }
  minutesX0ThroughX1PastTheHour() {
    return "del minut %s al %s passada l'hora";
  }
  second() {
    return "segon";
  }
  secondsX0ThroughX1PastTheMinute() {
    return "En els segons %s al %s de cada minut";
  }
  spaceAnd() {
    return " i";
  }
  spaceX0OfTheMonth() {
    return " %s del mes";
  }
  lastDay() {
    return "l'últim dia";
  }
  third() {
    return "tercer";
  }
  weekdayNearestDayX0() {
    return "dia de la setmana més proper al %s";
  }
  commaEveryX0Years() {
    return ", cada %s anys";
  }
  commaStartingX0() {
    return ", començant %s";
  }
  daysOfTheWeek() {
    return ["diumenge", "dilluns", "dimarts", "dimecres", "dijous", "divendres", "dissabte"];
  }
  monthsOfTheYear() {
    return [
      "gener",
      "febrer",
      "març",
      "abril",
      "maig",
      "juny",
      "juliol",
      "agost",
      "setembre",
      "octubre",
      "novembre",
      "desembre",
    ];
  }
}
