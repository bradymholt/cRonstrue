// French

import { Locale } from "../locale";
export class fr implements Locale {
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
    return false;
  }

  everyMinute() {
    return "toutes les minutes";
  }
  everyHour() {
    return "toutes les heures";
  }
  anErrorOccuredWhenGeneratingTheExpressionD() {
    return "Une erreur est survenue en générant la description de l'expression cron. Vérifiez sa syntaxe.";
  }
  atSpace() {
    return "À ";
  }
  everyMinuteBetweenX0AndX1() {
    return "Toutes les minutes entre %s et %s";
  }
  at() {
    return "À";
  }
  spaceAnd() {
    return " et";
  }
  everySecond() {
    return "toutes les secondes";
  }
  everyX0Seconds() {
    return "toutes les %s secondes";
  }
  secondsX0ThroughX1PastTheMinute() {
    return "les secondes entre %s et %s après la minute";
  }
  atX0SecondsPastTheMinute() {
    return "%s secondes après la minute";
  }
  everyX0Minutes() {
    return "toutes les %s minutes";
  }
  minutesX0ThroughX1PastTheHour() {
    return "les minutes entre %s et %s après l'heure";
  }
  atX0MinutesPastTheHour() {
    return "%s minutes après l'heure";
  }
  everyX0Hours() {
    return "toutes les %s heures";
  }
  betweenX0AndX1() {
    return "de %s à %s";
  }
  atX0() {
    return "à %s";
  }
  commaEveryDay() {
    return ", tous les jours";
  }
  commaEveryX0DaysOfTheWeek() {
    return ", every %s days of the week";
  }
  commaX0ThroughX1() {
    return ", de %s à %s";
  }
  first() {
    return "premier";
  }
  second() {
    return "second";
  }
  third() {
    return "troisième";
  }
  fourth() {
    return "quatrième";
  }
  fifth() {
    return "cinquième";
  }
  commaOnThe() {
    return ", le ";
  }
  spaceX0OfTheMonth() {
    return " %s du mois";
  }
  lastDay() {
    return "le dernier jour";
  }
  commaOnTheLastX0OfTheMonth() {
    return ", le dernier %s du mois";
  }
  commaOnlyOnX0() {
    return ", uniquement le %s";
  }
  commaAndOnX0(){
    return ", et %s";
  }
  commaEveryX0Months() {
    return ", tous les %s mois";
  }
  commaOnlyInX0() {
    return ", uniquement en %s";
  }
  commaOnTheLastDayOfTheMonth() {
    return ", le dernier jour du mois";
  }
  commaOnTheLastWeekdayOfTheMonth() {
    return ", le dernier jour ouvrable du mois";
  }
  commaDaysBeforeTheLastDayOfTheMonth(){
    return ", %s jours avant le dernier jour du mois"
  }
  firstWeekday() {
    return "premier jour ouvrable";
  }
  weekdayNearestDayX0() {
    return "jour ouvrable le plus proche du %s";
  }
  commaOnTheX0OfTheMonth() {
    return ", le %s du mois";
  }
  commaEveryX0Days() {
    return ", tous les %s jours";
  }
  commaBetweenDayX0AndX1OfTheMonth() {
    return ", du %s au %s du mois";
  }
  commaOnDayX0OfTheMonth() {
    return ", le %s du mois";
  }
  commaEveryX0Years() {
    return ", tous les %s ans";
  }
  commaDaysX0ThroughX1() {
    return ", du %s au %s";
  }
  commaStartingX0() {
    return ", départ %s";
  }
  daysOfTheWeek() {
    return ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
  }
  monthsOfTheYear() {
    return [
      "janvier",
      "février",
      "mars",
      "avril",
      "mai",
      "juin",
      "juillet",
      "août",
      "septembre",
      "octobre",
      "novembre",
      "décembre"
    ];
  }
}
