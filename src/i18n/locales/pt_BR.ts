// Portuguese

import { Locale } from "../locale";
export class pt_BR implements Locale {
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
    return "Ocorreu um erro ao gerar a descrição da expressão Cron.";
  }
  at() {
    return "às";
  }
  atSpace() {
    return "às ";
  }
  atX0() {
    return "Às %s";
  }
  atX0MinutesPastTheHour() {
    return "aos %s minutos da hora";
  }
  atX0SecondsPastTheMinute() {
    return "aos %s segundos do minuto";
  }
  betweenX0AndX1() {
    return "entre %s e %s";
  }
  commaBetweenDayX0AndX1OfTheMonth() {
    return ", entre os dias %s e %s do mês";
  }
  commaEveryDay() {
    return ", a cada dia";
  }
  commaEveryX0Days() {
    return ", a cada %s dias";
  }
  commaEveryX0DaysOfTheWeek() {
    return ", a cada %s dias de semana";
  }
  commaEveryX0Months() {
    return ", a cada %s meses";
  }
  commaOnDayX0OfTheMonth() {
    return ", no dia %s do mês";
  }
  commaOnlyInX0(s?: string) {
    return s && s.length > 1 && s[1] === "-" ? "somente %s" : ", somente em %s";
  }
  commaOnlyOnX0(s?: string) {
    return s && s.length > 1 && s[1] === "-" ? ", somente %s" : ", somente de %s";
  }
  commaAndOnX0() {
    return ", e de %s";
  }
  commaOnThe(s?: string, day?: string) {
    return day === '6' || day === '0' ? ", no" : ", na ";
  }
  commaOnTheLastDayOfTheMonth() {
    return ", no último dia do mês";
  }
  commaOnTheLastWeekdayOfTheMonth() {
    return ", no último dia da semana do mês";
  }
  commaDaysBeforeTheLastDayOfTheMonth() {
    return ", %s dias antes do último dia do mês";
  }
  commaOnTheLastX0OfTheMonth() {
    return ", na última %s do mês";
  }
  commaOnTheX0OfTheMonth() {
    return ", no %s do mês";
  }
  commaX0ThroughX1() {
    return ", de %s a %s";
  }
  commaAndX0ThroughX1() {
    return ", e de %s a %s";
  }
  everyHour() {
    return "a cada hora";
  }
  everyMinute() {
    return "a cada minuto";
  }
  everyMinuteBetweenX0AndX1() {
    return "a cada minuto entre %s e %s";
  }
  everySecond() {
    return "a cada segundo";
  }
  everyX0Hours() {
    return "a cada %s horas";
  }
  everyX0Minutes() {
    return "a cada %s minutos";
  }
  everyX0Seconds() {
    return "a cada %s segundos";
  }
  fifth(s?: string) {
    return s === '6' || s === '0' ? "quinto" : "quinta";
  }
  first(s?: string) {
    return s === '6' || s === '0' ? "primeiro" : "primeira";
  }
  firstWeekday() {
    return "primeiro dia da semana";
  }
  fourth(s?: string) {
    return s === '6' || s === '0' ? "quarto" : "quarta";
  }
  minutesX0ThroughX1PastTheHour() {
    return "do minuto %s até %s de cada hora";
  }
  second(s?: string) {
    return s === '6' || s === '0' ? "segundo" : "segunda";
  }
  secondsX0ThroughX1PastTheMinute() {
    return "No segundo %s até %s de cada minuto";
  }
  spaceAnd() {
    return " e";
  }
  spaceX0OfTheMonth() {
    return " %s do mês";
  }
  lastDay() {
    return "o último dia";
  }
  third(s?: string) {
    return s === '6' || s === '0' ? "terceiro" : "terceira";
  }
  weekdayNearestDayX0() {
    return "dia da semana mais próximo do dia %s";
  }
  commaEveryX0Years() {
    return ", a cada %s anos";
  }
  commaStartingX0() {
    return ", iniciando %s";
  }
  daysOfTheWeek() {
    return ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"];
  }
  monthsOfTheYear() {
    return [
      "janeiro",
      "fevereiro",
      "março",
      "abril",
      "maio",
      "junho",
      "julho",
      "agosto",
      "setembro",
      "outubro",
      "novembro",
      "dezembro",
    ];
  }

  onTheHour() {
    return "na hora certa";
  }
}
