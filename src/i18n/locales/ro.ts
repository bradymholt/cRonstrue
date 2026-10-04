// Romanian

import { Locale } from "../locale";

// Romanian puts "de" between a number and its noun when the number is 20 or more and ends in 00 or 20 to 99:
// "5 minute", "19 minute", "20 de minute", "101 minute", "120 de minute"
const getPhraseByNumber = (str: string | undefined, words: [string, string]) => {
  const number = Number(str);
  return number >= 20 && (number % 100 === 0 || number % 100 >= 20) ? words[1] : words[0];
};

export class ro implements Locale {
  use24HourTimeFormatByDefault() {
    return true;
  }

  anErrorOccuredWhenGeneratingTheExpressionD() {
    return "Eroare la generarea descrierii. Verificați sintaxa.";
  }
  at() {
    return "La";
  }
  atSpace() {
    return "La ";
  }
  atX0() {
    return "la %s";
  }
  atX0MinutesPastTheHour() {
    return "la și %s minute";
  }
  atX0SecondsPastTheMinute() {
    return "la și %s secunde";
  }
  betweenX0AndX1() {
    return "între %s și %s";
  }
  commaBetweenDayX0AndX1OfTheMonth() {
    return ", între zilele %s și %s ale lunii";
  }
  commaEveryDay() {
    return ", în fiecare zi";
  }
  commaEveryX0Days(s?: string) {
    return getPhraseByNumber(s, [", la fiecare %s zile", ", la fiecare %s de zile"]);
  }
  commaEveryX0DaysOfTheWeek() {
    return ", la fiecare a %s-a zi a săptămânii";
  }
  commaEveryX0Months(s?: string) {
    return getPhraseByNumber(s, [", la fiecare %s luni", ", la fiecare %s de luni"]);
  }
  commaEveryX0Years(s?: string) {
    return getPhraseByNumber(s, [", o dată la %s ani", ", o dată la %s de ani"]);
  }
  commaOnDayX0OfTheMonth() {
    return ", în ziua %s a lunii";
  }
  commaOnlyInX0() {
    return ", doar în %s";
  }
  commaOnlyOnX0() {
    return ", doar %s";
  }
  commaAndOnX0() {
    return ", și %s";
  }
  commaOnThe() {
    return ", în ";
  }
  commaOnTheLastDayOfTheMonth() {
    return ", în ultima zi a lunii";
  }
  commaOnTheLastWeekdayOfTheMonth() {
    return ", în ultima zi lucrătoare a lunii";
  }
  commaDaysBeforeTheLastDayOfTheMonth(s?: string) {
    return getPhraseByNumber(s, [
      ", %s zile înainte de ultima zi a lunii",
      ", %s de zile înainte de ultima zi a lunii",
    ]);
  }
  commaOnTheLastX0OfTheMonth() {
    return ", în ultima %s a lunii";
  }
  commaOnTheX0OfTheMonth() {
    return ", în %s a lunii";
  }
  commaX0ThroughX1() {
    return ", de %s până %s";
  }
  commaAndX0ThroughX1() {
    return ", și de %s până %s";
  }
  everyHour() {
    return "în fiecare oră";
  }
  everyMinute() {
    return "în fiecare minut";
  }
  everyMinuteBetweenX0AndX1() {
    return "În fiecare minut între %s și %s";
  }
  everySecond() {
    return "în fiecare secundă";
  }
  everyX0Hours(s?: string) {
    return getPhraseByNumber(s, ["la fiecare %s ore", "la fiecare %s de ore"]);
  }
  everyX0Minutes(s?: string) {
    return getPhraseByNumber(s, ["la fiecare %s minute", "la fiecare %s de minute"]);
  }
  everyX0Seconds(s?: string) {
    return getPhraseByNumber(s, ["la fiecare %s secunde", "la fiecare %s de secunde"]);
  }
  fifth() {
    return "a cincea";
  }
  first() {
    return "prima";
  }
  firstWeekday() {
    return "prima zi lucrătoare";
  }
  fourth() {
    return "a patra";
  }
  minutesX0ThroughX1PastTheHour() {
    return "între minutele %s și %s";
  }
  second() {
    return "a doua";
  }
  secondsX0ThroughX1PastTheMinute() {
    return "între secunda %s și secunda %s";
  }
  spaceAnd() {
    return " și";
  }
  spaceX0OfTheMonth() {
    return " %s a lunii";
  }
  lastDay() {
    return "ultima zi";
  }
  third() {
    return "a treia";
  }
  weekdayNearestDayX0() {
    return "cea mai apropiată zi lucrătoare de ziua %s";
  }
  commaMonthX0ThroughMonthX1() {
    return ", din %s până în %s";
  }
  commaYearX0ThroughYearX1() {
    return ", din %s până în %s";
  }
  atX0MinutesPastTheHourGt20() {
    return "la și %s de minute";
  }
  atX0SecondsPastTheMinuteGt20() {
    return "la și %s de secunde";
  }
  commaStartingX0() {
    return ", pornire %s";
  }
  daysOfTheWeek() {
    return ["duminică", "luni", "marți", "miercuri", "joi", "vineri", "sâmbătă"];
  }
  monthsOfTheYear() {
    return [
      "ianuarie",
      "februarie",
      "martie",
      "aprilie",
      "mai",
      "iunie",
      "iulie",
      "august",
      "septembrie",
      "octombrie",
      "noiembrie",
      "decembrie",
    ];
  }

  atReboot() {
    return "Rulează o dată, la pornire";
  }

  onTheHour() {
    return "fix la oră";
  }
}
