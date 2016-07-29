import { Locale } from '../locale'
export class pt_BR implements Locale {
    AtX0SecondsPastTheMinuteGt20(): string { return null; }
    AtX0MinutesPastTheHourGt20(): string { return null; }
    ComaMonthX0ThroughMonthX1(): string { return null; }
    ComaYearX0ThroughYearX1(): string { return null; }

    Use24HourTimeFormatByDefault() { return false; }

    AnErrorOccuredWhenGeneratingTheExpressionD() {
        return "Ocorreu um erro ao gerar a descrição da expressão Cron.";
    }
    At() {
        return "às";
    }
    AtSpace() {
        return "às ";
    }
    AtX0() {
        return "Às %s";
    }
    AtX0MinutesPastTheHour() {
        return "aos %s minutos da hora";
    }
    AtX0SecondsPastTheMinute() {
        return "aos %s segundos do minuto";
    }
    BetweenX0AndX1() {
        return "entre %s e %s";
    }
    ComaBetweenDayX0AndX1OfTheMonth() {
        return ", entre os dias %s e %s do mês";
    }
    ComaEveryDay() {
        return ", a cada dia";
    }
    ComaEveryHour() {
        return ", a cada hora";
    }
    ComaEveryMinute() {
        return ", a cada minuto";
    }
    ComaEveryX0Days() {
        return ", a cada %s dias";
    }
    ComaEveryX0DaysOfTheWeek() {
        return ", a cada %s dias de semana";
    }
    ComaEveryX0Months() {
        return ", a cada %s meses";
    }
    ComaOnDayX0OfTheMonth() {
        return ", no dia %s do mês";
    }
    ComaOnlyInX0() {
        return ", somente em %s";
    }
    ComaOnlyOnX0() {
        return ", somente de %s";
    }
    ComaOnThe() {
        return ", na ";
    }
    ComaOnTheLastDayOfTheMonth() {
        return ", no último dia do mês";
    }
    ComaOnTheLastWeekdayOfTheMonth() {
        return ", no último dia da semana do mês";
    }
    ComaOnTheLastX0OfTheMonth() {
        return ", na última %s do mês";
    }
    ComaOnTheX0OfTheMonth() {
        return ", no %s do mês";
    }
    ComaX0ThroughX1() {
        return ", de %s a %s";
    }
    EveryHour() {
        return "a cada hora";
    }
    EveryMinute() {
        return "a cada minuto";
    }
    EveryMinuteBetweenX0AndX1() {
        return "a cada minuto entre %s e %s";
    }
    EverySecond() {
        return "a cada segundo";
    }
    EveryX0Hours() {
        return "a cada %s horas";
    }
    EveryX0Minutes() {
        return "a cada %s minutos";
    }
    EveryX0Seconds() {
        return "a cada %s segundos";
    }
    Fifth() {
        return "quinta";
    }
    First() {
        return "primeira";
    }
    FirstWeekday() {
        return "primeiro dia da semana";
    }
    Forth() {
        return "quarta";
    }
    MinutesX0ThroughX1PastTheHour() {
        return "do minuto %s até %s de cada hora";
    }
    Second() {
        return "segunda";
    }
    SecondsX0ThroughX1PastTheMinute() {
        return "No segundo %s até %s de cada minuto";
    }
    SpaceAnd() {
        return " e";
    }
    SpaceAndSpace() {
        return " e ";
    }
    SpaceX0OfTheMonth() {
        return " %s do mês";
    }
    Third() {
        return "terceira";
    }
    WeekdayNearestDayX0() {
        return "dia da semana mais próximo do dia %s";
    }
    ComaEveryX0Years() {
        return ", a cada %s anos";
    }
    CommaStartingX0() {
        return ", iniciando %s";
    }
    DaysOfTheWeek() {
        return ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"];
    }
    MonthsOfTheYear() {
        return ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
    }
}
