import { Locale } from "../locale";
export class fi implements Locale {
  use24HourTimeFormatByDefault() {
    return false;
  }

  anErrorOccuredWhenGeneratingTheExpressionD(): string {
    return "Virhe kuvauksen generoinnissa. Tarkista cron-syntaksi.";
  }
  at(): string {
    return "Klo";
  }
  atSpace(): string {
    return "Klo ";
  }
  atX0(): string {
    return "klo %s";
  }
  atX0MinutesPastTheHour(): string {
    return "%s minuuttia yli";
  }
  atX0MinutesPastTheHourGt20(): string {
    return "%s minuuttia yli";
  }
  atX0SecondsPastTheMinute(): string {
    return "%s sekunnnin jälkeen";
  }
  betweenX0AndX1(): string {
    return "%s - %s välillä";
  }
  commaBetweenDayX0AndX1OfTheMonth(): string {
    return ", kuukauden päivien %s ja %s välillä";
  }
  commaEveryDay(): string {
    return ", joka päivä";
  }
  commaEveryHour(): string {
    return ", joka tunti";
  }
  commaEveryMinute(): string {
    return ", joka minuutti";
  }
  commaEveryX0Days(): string {
    return ", joka %s. päivä";
  }
  commaEveryX0DaysOfTheWeek(): string {
    return ", joka %s. viikonpäivä";
  }
  commaEveryX0Months(): string {
    return ", joka %s. kuukausi";
  }
  commaEveryX0Years(): string {
    return ", joka %s. vuosi";
  }
  commaOnDayX0OfTheMonth(): string {
    return ", kuukauden %s päivä";
  }
  commaOnlyInX0(): string {
    return ", vain %s";
  }
  commaOnlyOnX0(): string {
    return ", vain %s";
  }
  commaOnThe(): string {
    return ",";
  }
  commaOnTheLastDayOfTheMonth(): string {
    return ", kuukauden viimeisenä päivänä";
  }
  commaOnTheLastWeekdayOfTheMonth(): string {
    return ", kuukauden viimeisenä viikonpäivänä";
  }
  commaOnTheLastX0OfTheMonth(): string {
    return ", kuukauden viimeinen %s";
  }
  commaOnTheX0OfTheMonth(): string {
    return ", kuukauden %s";
  }
  commaX0ThroughX1(): string {
    return ", %s - %s";
  }
  commaDaysBeforeTheLastDayOfTheMonth(): string {
    return ", %s päivää ennen kuukauden viimeistä päivää";
  }
  commaStartingX0(): string {
    return ", alkaen %s";
  }
  everyHour(): string {
    return "joka tunti";
  }
  everyMinute(): string {
    return "joka minuutti";
  }
  everyMinuteBetweenX0AndX1(): string {
    return "joka minuutti %s - %s välillä";
  }
  everySecond(): string {
    return "joka sekunti";
  }
  everyX0Hours(): string {
    return "joka %s. tunti";
  }
  everyX0Minutes(): string {
    return "joka %s. minuutti";
  }
  everyX0Seconds(): string {
    return "joka %s. sekunti";
  }
  fifth(): string {
    return "viides";
  }
  first(): string {
    return "ensimmäinen";
  }
  firstWeekday(): string {
    return "ensimmäinen viikonpäivä";
  }
  fourth(): string {
    return "neljäs";
  }
  minutesX0ThroughX1PastTheHour(): string {
    return "joka tunti minuuttien %s - %s välillä";
  }
  second(): string {
    return "toinen";
  }
  secondsX0ThroughX1PastTheMinute(): string {
    return "joka minuutti sekunttien %s - %s välillä";
  }
  spaceAnd(): string {
    return " ja";
  }
  spaceAndSpace(): string {
    return " ja ";
  }
  spaceX0OfTheMonth(): string {
    return " %s kuukaudessa";
  }
  third(): string {
    return "kolmas";
  }
  weekdayNearestDayX0(): string {
    return "viikonpäivä lähintä %s päivää";
  }
  atX0SecondsPastTheMinuteGt20(): string {
    return null;
  }
  commaMonthX0ThroughMonthX1(): string {
    return null;
  }
  commaYearX0ThroughYearX1(): string {
    return null;
  }
  lastDay() {
    return "viimeinen päivä";
  }
  commaAndOnX0() {
    return ", ja edelleen %s";
  }
  daysOfTheWeek() {
    return ["sunnuntai", "maanantai", "tiistai", "keskiviikko", "torstai", "perjantai", "lauantai"];
  }

  monthsOfTheYear() {
    return [
      "tammikuu",
      "helmikuu",
      "maaliskuu",
      "huhtikuu",
      "toukokuu",
      "kesäkuu",
      "heinäkuu",
      "elokuu",
      "syyskuu",
      "lokakuu",
      "marraskuu",
      "joulukuu"
    ];
  }
}
