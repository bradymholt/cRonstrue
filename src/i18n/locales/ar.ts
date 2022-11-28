// Arabic

import { Locale } from "../locale";
export class ar implements Locale {
    atX0SecondsPastTheMinuteGt20(): string | null {
        return null;
    }
    atX0MinutesPastTheHourGt20(): string | null {
        return null;
    }
    commaMonthX0ThroughMonthX1(): string | null {
        return null;
    }
    commaYearX0ThroughYearX1(): string | null {
        return null;
    }

    use24HourTimeFormatByDefault() {
        return false;
    }

    anErrorOccuredWhenGeneratingTheExpressionD() {
        return "حدث خطأ في إنشاء وصف المصطلح٠ تأكد من تركيب مصطلح الكرون"
    }
    everyMinute() {
        return "كل دقيقة";
    }
    everyHour() {
        return "كل ساعة";
    }
    atSpace() {
        return " ";
    }
    everyMinuteBetweenX0AndX1() {
        return "كل دقيقة بين %s و %s";
    }
    at() {
        return "";
    }
    spaceAnd() {
        return " و";
    }
    everySecond() {
        return "كل ثانية";
    }
    everyX0Seconds() {
        return "كل %s ثواني";
    }
    secondsX0ThroughX1PastTheMinute() {
        return "الثواني %s حتى %s من بداية الدقيقة";
    }
    atX0SecondsPastTheMinute() {
        return "الثانية %s من بداية الدقيقة";
    }
    everyX0Minutes() {
        return "كل %s دقائق";
    }
    minutesX0ThroughX1PastTheHour() {
        return "الدقائق %s حتى %s من بداية الساعة"
    }
    atX0MinutesPastTheHour() {
        return "الدقيقة %s من بداية الساعة"
    }
    everyX0Hours() {
        return "كل %s ساعات"
    }
    betweenX0AndX1() {
        return "بين %s و %s";
    }
    atX0() {
        return "%s";
    }
    commaEveryDay() {
        return "، كل يوم";
    }
    commaEveryX0DaysOfTheWeek() {
        return "، كل %s من أيام الأسبوع";
    }
    commaX0ThroughX1() {
        return "، %s حتى %s";
    }
    commaAndX0ThroughX1() {
        return "، و %s حتى %s";
    }
    first() {
        return "أول";
    }
    second() {
        return "ثاني";
    }
    third() {
        return "ثالث";
    }
    fourth() {
        return "رابع";
    }
    fifth() {
        return "خامس";
    }
    commaOnThe() {
        return "، في ال";
    }
    spaceX0OfTheMonth() {
        return " %s من الشهر";
    }
    lastDay() {
        return "اليوم الأخير";
    }
    commaOnTheLastX0OfTheMonth() {
        return "، في اخر %s من الشهر";
    }
    commaOnlyOnX0() {
        return "، %s فقط";
    }
    commaAndOnX0() {
        return "، وفي %s";
    }
    commaEveryX0Months() {
        return "، كل %s أشهر";
    }
    commaOnlyInX0() {
        return "، %s فقط";
    }
    commaOnTheLastDayOfTheMonth() {
        return "، في اخر يوم من الشهر";
    }
    commaOnTheLastWeekdayOfTheMonth() {
        return "، في اخر يوم أسبوع من الشهر";
    }
    commaDaysBeforeTheLastDayOfTheMonth() {
        return "، %s أيام قبل اخر يوم من الشهر";
    }
    firstWeekday() {
        return "اول ايام الأسبوع";
    }
    weekdayNearestDayX0() {
        return "يوم الأسبوع الأقرب ليوم %s";
    }
    commaOnTheX0OfTheMonth() {
        return "، في %s من الشهر";
    }
    commaEveryX0Days() {
        return "، كل %s أيام";
    }
    commaBetweenDayX0AndX1OfTheMonth() {
        return "، بين يوم %s و %s من الشهر";
    }
    commaOnDayX0OfTheMonth() {
        return "، في اليوم %s من الشهر";
    }
    commaEveryHour() {
        return "، كل ساعة";
    }
    commaEveryX0Years() {
        return "، كل %s سنوات";
    }
    commaStartingX0() {
        return "، بداية من %s";
    }
    daysOfTheWeek() {
        return ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];
    }
    monthsOfTheYear() {
        return [
            "يناير",
            "فبراير",
            "مارس",
            "ابريل",
            "مايو",
            "يونيو",
            "يوليو",
            "أغسطس",
            "سبتمبر",
            "أكتوبر",
            "نوفمبر",
            "ديسمبر",
        ];
    }
}
