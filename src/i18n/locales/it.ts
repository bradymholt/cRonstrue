// Italian

import { Locale } from "../locale";
export class it implements Locale {
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

  anErrorOccuredWhenGeneratingTheExpressionD() {
    return "È verificato un errore durante la generazione la descrizione espressione. Controllare la sintassi delle espressioni cron.";
  }
  at() {
    return "Alle";
  }
  atSpace() {
    return "Alle ";
  }
  atX0() {
    return "alle %s";
  }
  atX0MinutesPastTheHour() {
    return "al %s minuto passata l'ora";
  }
  atX0SecondsPastTheMinute() {
    return "al %s secondo passato il minuto";
  }
  betweenX0AndX1() {
    return "tra le %s e le %s";
  }
  commaBetweenDayX0AndX1OfTheMonth() {
    return ", tra il giorno %s e %s del mese";
  }
  commaEveryDay() {
    return ", ogni giorno";
  }
  commaEveryX0Days() {
    return ", ogni %s giorni";
  }
  commaEveryX0DaysOfTheWeek() {
    return ", ogni %s giorni della settimana";
  }
  commaEveryX0Months() {
    return ", ogni %s mesi";
  }
  commaEveryX0Years() {
    return ", ogni %s anni";
  }
  commaOnDayX0OfTheMonth() {
    return ", il giorno %s del mese";
  }
  commaOnlyInX0() {
    return ", solo in %s";
  }
  commaOnlyOnX0() {
    return ", solo il %s";
  }
  commaAndOnX0(){
    return ", e il %s";
  }
  commaOnThe() {
    return ", il ";
  }
  commaOnTheLastDayOfTheMonth() {
    return ", l'ultimo giorno del mese";
  }
  commaOnTheLastWeekdayOfTheMonth() {
    return ", nell'ultima settimana del mese";
  }
  commaDaysBeforeTheLastDayOfTheMonth(){
    return ", %s giorni prima dell'ultimo giorno del mese"
  }
  commaOnTheLastX0OfTheMonth() {
    return ", l'ultimo %s del mese";
  }
  commaOnTheX0OfTheMonth() {
    return ", il %s del mese";
  }
  commaX0ThroughX1() {
    return ", %s al %s";
  }
  everyHour() {
    return "ogni ora";
  }
  everyMinute() {
    return "ogni minuto";
  }
  everyMinuteBetweenX0AndX1() {
    return "Ogni minuto tra le %s e le %s";
  }
  everySecond() {
    return "ogni secondo";
  }
  everyX0Hours() {
    return "ogni %s ore";
  }
  everyX0Minutes() {
    return "ogni %s minuti";
  }
  everyX0Seconds() {
    return "ogni %s secondi";
  }
  fifth() {
    return "quinto";
  }
  first() {
    return "primo";
  }
  firstWeekday() {
    return "primo giorno della settimana";
  }
  fourth() {
    return "quarto";
  }
  minutesX0ThroughX1PastTheHour() {
    return "minuti %s al %s dopo l'ora";
  }
  second() {
    return "secondo";
  }
  secondsX0ThroughX1PastTheMinute() {
    return "secondi %s al %s oltre il minuto";
  }
  spaceAnd() {
    return " e";
  }
  spaceX0OfTheMonth() {
    return " %s del mese";
  }
  lastDay() {
    return "l'ultimo giorno";
  }
  third() {
    return "terzo";
  }
  weekdayNearestDayX0() {
    return "giorno della settimana più vicino al %s";
  }
  commaStartingX0() {
    return ", a partire %s";
  }
  daysOfTheWeek() {
    return ["domenica", "lunedì", "martedì", "mercoledì", "giovedì", "venerdì", "sabato"];
  }
  monthsOfTheYear() {
    return [
      "gennaio",
      "febbraio",
      "marzo",
      "aprile",
      "maggio",
      "giugno",
      "luglio",
      "agosto",
      "settembre",
      "ottobre",
      "novembre",
      "dicembre"
    ];
  }
}
