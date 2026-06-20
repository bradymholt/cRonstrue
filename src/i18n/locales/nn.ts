// Norwegian (Nynorsk)

import { Locale } from "../locale";
export class nn implements Locale {
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
    return true;
  }
  anErrorOccuredWhenGeneratingTheExpressionD() {
    return "Ein feil oppstod ved generering av uttrykksskildring. Sjekk cron-syntaksen.";
  }
  at() {
    return "Kl.";
  }
  atSpace() {
    return "Kl.";
  }
  atX0() {
    return "på %s";
  }
  atX0MinutesPastTheHour() {
    return "på %s minutt etter timen";
  }
  atX0SecondsPastTheMinute() {
    return "på %s sekund etter minuttet";
  }
  betweenX0AndX1() {
    return "mellom %s og %s";
  }
  commaBetweenDayX0AndX1OfTheMonth() {
    return ", mellom dag %s og %s av månaden";
  }
  commaEveryDay() {
    return ", kvar dag";
  }
  commaEveryX0Days() {
    return ", kvar %s dag i månaden";
  }
  commaEveryX0DaysOfTheWeek() {
    return ", kvar %s vekedag";
  }
  commaEveryX0Months() {
    return ", kvar %s månad";
  }
  commaEveryX0Years() {
    return ", kvart %s år";
  }
  commaOnDayX0OfTheMonth() {
    return ", på dag %s av månaden";
  }
  commaOnlyInX0() {
    return ", berre i %s";
  }
  commaOnlyOnX0() {
    return ", på %s";
  }
  commaAndOnX0() {
    return ", og på %s";
  }
  commaOnThe() {
    return ", på ";
  }
  commaOnTheLastDayOfTheMonth() {
    return ", på den siste dagen i månaden";
  }
  commaOnTheLastWeekdayOfTheMonth() {
    return ", den siste vekedagen i månaden";
  }
  commaDaysBeforeTheLastDayOfTheMonth() {
    return ", %s dagar før den siste dagen i månaden";
  }
  commaOnTheLastX0OfTheMonth() {
    return ", på den siste %s av månaden";
  }
  commaOnTheX0OfTheMonth() {
    return ", på den %s av månaden";
  }
  commaX0ThroughX1() {
    return ", %s til og med %s";
  }
  commaAndX0ThroughX1() {
    return ", og %s til og med %s";
  }
  everyHour() {
    return "kvar time";
  }
  everyMinute() {
    return "kvart minutt";
  }
  everyMinuteBetweenX0AndX1() {
    return "Kvart minutt mellom %s og %s";
  }
  everySecond() {
    return "kvart sekund";
  }
  everyX0Hours() {
    return "kvar %s time";
  }
  everyX0Minutes() {
    return "kvart %s minutt";
  }
  everyX0Seconds() {
    return "kvart %s sekund";
  }
  fifth() {
    return "femte";
  }
  first() {
    return "første";
  }
  firstWeekday() {
    return "første vekedag";
  }
  fourth() {
    return "fjerde";
  }
  minutesX0ThroughX1PastTheHour() {
    return "minutta frå %s til og med %s etter timen";
  }
  second() {
    return "andre";
  }
  secondsX0ThroughX1PastTheMinute() {
    return "sekunda frå %s til og med %s etter minuttet";
  }
  spaceAnd() {
    return " og";
  }
  spaceX0OfTheMonth() {
    return " %s i månaden";
  }
  lastDay() {
    return "den siste dagen";
  }
  third() {
    return "tredje";
  }
  weekdayNearestDayX0() {
    return "vekedag nærmast dag %s";
  }
  commaStartingX0() {
    return ", startar %s";
  }
  daysOfTheWeek() {
    return ["sundag", "måndag", "tysdag", "onsdag", "torsdag", "fredag", "laurdag"];
  }
  monthsOfTheYear() {
    return [
      "januar",
      "februar",
      "mars",
      "april",
      "mai",
      "juni",
      "juli",
      "august",
      "september",
      "oktober",
      "november",
      "desember",
    ];
  }

  onTheHour() {
    return "på timen";
  }
}
