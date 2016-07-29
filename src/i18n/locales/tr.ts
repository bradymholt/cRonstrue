import { Locale } from "../locale"
export class tr implements Locale {
    AtX0SecondsPastTheMinuteGt20(): string { return null; }
    AtX0MinutesPastTheHourGt20(): string { return null; }
    ComaMonthX0ThroughMonthX1(): string { return null; }
    ComaYearX0ThroughYearX1(): string { return null; }

    Use24HourTimeFormatByDefault() { return true; }

    EveryMinute() {
        return "her dakika";
    }
    EveryHour() {
        return "her saat";
    }
    AnErrorOccuredWhenGeneratingTheExpressionD() {
        return "İfade açıklamasını oluştururken bir hata oluştu. Cron ifadesini gözden geçirin.";
    }
    AtSpace() {
        return "Saat ";
    }
    EveryMinuteBetweenX0AndX1() {
        return "Saat %s ve %s arasındaki her dakika";
    }
    At() {
        return "Saat";
    }
    SpaceAnd() {
        return " ve";
    }
    EverySecond() {
        return "her saniye";
    }
    EveryX0Seconds() {
        return "her %s saniyede bir";
    }
    SecondsX0ThroughX1PastTheMinute() {
        return "dakikaların %s. ve %s. saniyeleri arası";
    }
    AtX0SecondsPastTheMinute() {
        return "dakikaların %s. saniyesinde";
    }
    EveryX0Minutes() {
        return "her %s dakikada bir";
    }
    MinutesX0ThroughX1PastTheHour() {
        return "saatlerin %s. ve %s. dakikaları arası";
    }
    AtX0MinutesPastTheHour() {
        return "saatlerin %s. dakikasında";
    }
    EveryX0Hours() {
        return "her %s saatte";
    }
    BetweenX0AndX1() {
        return "%s ile %s arasında";
    }
    AtX0() {
        return "saat %s";
    }
    ComaEveryDay() {
        return ", her gün";
    }
    ComaEveryX0DaysOfTheWeek() {
        return ", ayın her %s günü";
    }
    ComaX0ThroughX1() {
        return ", %s ile %s arasında";
    }
    First() {
        return "ilk";
    }
    Second() {
        return "ikinci";
    }
    Third() {
        return "üçüncü";
    }
    Forth() {
        return "dördüncü";
    }
    Fifth() {
        return "beşinci";
    }
    ComaOnThe() {
        return ", ayın ";
    }
    SpaceX0OfTheMonth() {
        return " %s günü";
    }
    ComaOnTheLastX0OfTheMonth() {
        return ", ayın son %s günü";
    }
    ComaOnlyOnX0() {
        return ", sadece %s günü";
    }
    ComaEveryX0Months() {
        return ", %s ayda bir";
    }
    ComaOnlyInX0() {
        return ", sadece %s için";
    }
    ComaOnTheLastDayOfTheMonth() {
        return ", ayın son günü";
    }
    ComaOnTheLastWeekdayOfTheMonth() {
        return ", ayın son iş günü";
    }
    FirstWeekday() {
        return "ilk iş günü";
    }
    WeekdayNearestDayX0() {
        return "%s. günü sonrasındaki ilk iş günü";
    }
    ComaOnTheX0OfTheMonth() {
        return ", ayın %s";
    }
    ComaEveryX0Days() {
        return ", %s günde bir";
    }
    ComaBetweenDayX0AndX1OfTheMonth() {
        return ", ayın %s. ve %s. günleri arası";
    }
    ComaOnDayX0OfTheMonth() {
        return ", ayın %s. günü";
    }
    SpaceAndSpace() {
        return " ve ";
    }
    ComaEveryMinute() {
        return ", her dakika";
    }
    ComaEveryHour() {
        return ", her saat";
    }
    ComaEveryX0Years() {
        return ", %s yılda bir";
    }
    CommaStartingX0() {
        return ", başlangıç %s";
    }
    DaysOfTheWeek() {
        return ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
    }
    MonthsOfTheYear() {
        return ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
    }
}
