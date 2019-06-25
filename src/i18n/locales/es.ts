// Spanish

import { Locale } from "../locale";
export class es implements Locale {
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

  anErrorOccuredWhenGeneratingTheExpressionD() {
    return "Ocurrió un error mientras se generaba la descripción de la expresión. Revise la sintaxis de la expresión de cron.";
  }
  at() {
    return "A las";
  }
  atSpace() {
    return "A las ";
  }
  atX0() {
    return "a las %s";
  }
  atX0MinutesPastTheHour() {
    return "a los %s minutos de la hora";
  }
  atX0SecondsPastTheMinute() {
    return "a los %s segundos del minuto";
  }
  betweenX0AndX1() {
    return "entre las %s y las %s";
  }
  commaBetweenDayX0AndX1OfTheMonth() {
    return ", entre los días %s y %s del mes";
  }
  commaEveryDay() {
    return ", cada día";
  }
  commaEveryX0Days() {
    return ", cada %s días";
  }
  commaEveryX0DaysOfTheWeek() {
    return ", cada %s días de la semana";
  }
  commaEveryX0Months() {
    return ", cada %s meses";
  }
  commaOnDayX0OfTheMonth() {
    return ", el día %s del mes";
  }
  commaOnlyInX0() {
    return ", sólo en %s";
  }
  commaOnlyOnX0() {
    return ", sólo el %s";
  }
  commaAndOnX0(){
    return ", y el %s";
  }
  commaOnThe() {
    return ", en el ";
  }
  commaOnTheLastDayOfTheMonth() {
    return ", en el último día del mes";
  }
  commaOnTheLastWeekdayOfTheMonth() {
    return ", en el último día de la semana del mes";
  }
  commaDaysBeforeTheLastDayOfTheMonth(){
    return ", %s días antes del último día del mes"
  }
  commaOnTheLastX0OfTheMonth() {
    return ", en el último %s del mes";
  }
  commaOnTheX0OfTheMonth() {
    return ", en el %s del mes";
  }
  commaX0ThroughX1() {
    return ", de %s a %s";
  }
  everyHour() {
    return "cada hora";
  }
  everyMinute() {
    return "cada minuto";
  }
  everyMinuteBetweenX0AndX1() {
    return "cada minuto entre las %s y las %s";
  }
  everySecond() {
    return "cada segundo";
  }
  everyX0Hours() {
    return "cada %s horas";
  }
  everyX0Minutes() {
    return "cada %s minutos";
  }
  everyX0Seconds() {
    return "cada %s segundos";
  }
  fifth() {
    return "quinto";
  }
  first() {
    return "primero";
  }
  firstWeekday() {
    return "primer día de la semana";
  }
  fourth() {
    return "cuarto";
  }
  minutesX0ThroughX1PastTheHour() {
    return "del minuto %s al %s pasada la hora";
  }
  second() {
    return "segundo";
  }
  secondsX0ThroughX1PastTheMinute() {
    return "En los segundos %s al %s de cada minuto";
  }
  spaceAnd() {
    return " y";
  }
  spaceX0OfTheMonth() {
    return " %s del mes";
  }
  lastDay() {
    return "el último día";
  }
  third() {
    return "tercer";
  }
  weekdayNearestDayX0() {
    return "día de la semana más próximo al %s";
  }
  commaEveryX0Years() {
    return ", cada %s años";
  }
  commaStartingX0() {
    return ", comenzando %s";
  }
  daysOfTheWeek() {
    return ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
  }
  monthsOfTheYear() {
    return [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre"
    ];
  }
}
