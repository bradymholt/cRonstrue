import "mocha";
import cronstrue from "../src/cronstrue-i18n";
import chai = require("chai");
let assert = chai.assert;

describe("i18n", function () {
  describe("de", function () {
    it("* * * * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string, { locale: "de" }), "Jede Minute");
    });

    it("*/5 15 * * MON-FRI", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string, { locale: "de" }),
        "Alle 5 Minuten, zwischen 15:00 und 15:59, Montag bis Freitag"
      );
    });
  });

  describe("es", function () {
    it("* * * * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string, { locale: "es" }), "Cada minuto");
    });

    it("*/5 15 * * MON-FRI", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string, { locale: "es" }),
        "Cada 5 minutos, entre las 15:00 y las 15:59, de lunes a viernes"
      );
    });
  });

  describe("fr", function () {
    it("* * * * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string, { locale: "fr" }), "Toutes les minutes");
    });

    it("*/5 15 * * MON-FRI", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string, { locale: "fr" }),
        "Toutes les 5 minutes, de 15:00 à 15:59, de lundi à vendredi"
      );
    });
  });

  describe("it", function () {
    it("* * * * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string, { locale: "it" }), "Ogni minuto");
    });

    it("*/5 15 * * MON-FRI", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string, { locale: "it" }),
        "Ogni 5 minuti, tra le 15:00 e le 15:59, lunedì al venerdì"
      );
    });
  });

  describe("id", function () {
    it("* * * * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string, { locale: "id" }), "Setiap menit");
    });

    it("*/5 15 * * MON-FRI", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string, { locale: "id" }),
        "Setiap 5 menit, diantara 15:00 dan 15:59, Senin sampai Jumat"
      );
    });
  });

  describe("nb", function () {
    it("* * * * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string, { locale: "nb" }), "Hvert minutt");
    });

    it("*/5 15 * * MON-FRI", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string, { locale: "nb", use24HourTimeFormat: true }),
        "Hvert 5 minutt, mellom 15:00 og 15:59, mandag til og med fredag"
      );
    });

    it("0 5 1/1 * *", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string, { locale: "nb", use24HourTimeFormat: true }),
        "Kl.05:00"
      );
    });

    it("15 11 * 1/1 MON#1", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string, { locale: "nb", use24HourTimeFormat: true }),
        "Kl.11:15, på første mandag i måneden"
      );
    });

    it("15 11 * 1/5 MON#1", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string, { locale: "nb", use24HourTimeFormat: true }),
        "Kl.11:15, på første mandag i måneden, hver 5 måned"
      );
    });

    it("0 7 * * MON,TUE,THU,FRI,SUN", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string, { locale: "nb", use24HourTimeFormat: true }),
        "Kl.07:00, på mandag, tirsdag, torsdag, fredag, og søndag"
      );
    });
  });

  describe("sv", function () {
    it("* * * * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string, { locale: "sv" }), "Varje minut");
    });

    it("*/5 15 * * MON-FRI", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string, { locale: "sv" }),
        "Var 5 minut, mellan 15:00 och 15:59, måndag till fredag"
      );
    });

    it("0 12 * * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string, { locale: "sv" }), "Kl 12:00");
    });

    it("0 15 10 ? * 6#3", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string, { locale: "sv" }),
        "Kl 10:15, den tredje lördagen av månaden"
      );
    });

    it("0 0 15 ? * MON *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string, { locale: "sv" }), "Kl 15:00, varje måndag");
    });
  });

  describe("nl", function () {
    it("* * * * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string, { locale: "nl" }), "Elke minuut");
    });

    it("*/5 15 * * MON-FRI", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string, { locale: "nl" }),
        "Elke 5 minuten, tussen 15:00 en 15:59, maandag t/m vrijdag"
      );
    });
  });

  describe("pl", function () {
    it("* * * * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string, { locale: "pl" }), "Co minutę");
    });

    it("*/5 15 * * MON-FRI", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string, { locale: "pl" }),
        "Co 5 minut, od 15:00 do 15:59, od poniedziałek do piątek"
      );
    });
  });
  describe("pt_BR", function () {
    it("* * * * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string, { locale: "pt_BR" }), "A cada minuto");
    });

    it("*/5 15 * * MON-FRI", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string, { locale: "pt_BR" }),
        "A cada 5 minutos, entre 15:00 e 15:59, de segunda-feira a sexta-feira"
      );
    });

    it("*/5 15 * * MON-FRI,SUN", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string, { locale: "pt_BR" }),
        "A cada 5 minutos, entre 15:00 e 15:59, somente de segunda-feira a sexta-feira e domingo"
      );
    });

    it("45 10 * * 6#2", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string, { locale: "pt_BR" }),
        "Às 10:45, no segundo sábado do mês"
      );
    });

    it("45 10 * * 0#3", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string, { locale: "pt_BR" }),
        "Às 10:45, no terceiro domingo do mês"
      );
    });

    it("45 10 * * 1#3", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string, { locale: "pt_BR" }),
        "Às 10:45, na terceira segunda-feira do mês"
      );
    });
  });


  describe("pt_PT", function () {
    it("* * * * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string, { locale: "pt_PT" }), "A cada minuto");
    });

    it("*/5 15 * * MON-FRI", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string, { locale: "pt_PT" }),
        "A cada 5 minutos, entre 15:00 e 15:59, de segunda-feira a sexta-feira"
      );
    });


    it("45 10 * * 6#2", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string, { locale: "pt_BR" }),
        "Às 10:45, no segundo sábado do mês"
      );
    });

    it("45 10 * * 0#3", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string, { locale: "pt_BR" }),
        "Às 10:45, no terceiro domingo do mês"
      );
    });

    it("45 10 * * 1#3", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string, { locale: "pt_BR" }),
        "Às 10:45, na terceira segunda-feira do mês"
      );
    });
  });

  describe("ro", function () {
    it("* * * * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string, { locale: "ro" }), "În fiecare minut");
    });

    it("*/5 15 * * MON-FRI", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string, { locale: "ro" }),
        "La fiecare 5 minute, între 15:00 și 15:59, de luni până vineri"
      );
    });
  });

  describe("ru", function () {
    it("* * * * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string, { locale: "ru" }), "Каждую минуту");
    });

    it("*/5 15 * * MON-FRI", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string, { locale: "ru" }),
        "Каждые 5 минут, с 15:00 по 15:59, с понедельника по пятницу"
      );
    });
  });

  describe("tr", function () {
    it("* * * * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string, { locale: "tr" }), "Her dakika");
    });

    it("*/5 15 * * MON-FRI", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string, { locale: "tr" }),
        "Her 5 dakikada bir, 15:00 ile 15:59 arasında, Pazartesi ile Cuma arasında"
      );
    });
  });

  describe("uk", function () {
    it("* * * * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string, { locale: "uk" }), "Щохвилини");
    });

    it("*/5 15 * * MON-FRI", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string, { locale: "uk" }),
        "Кожні 5 хвилин, між 15:00 та 15:59, понеділок по п'ятниця"
      );
    });
  });

  describe("zh_CN", function () {
    it("* * * * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string, { locale: "zh_CN" }), "每分钟");
    });

    it("*/5 15 * * MON-FRI", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string, { locale: "zh_CN" }),
        "每隔 5 分钟, 在 下午 03:00 和 下午 03:59 之间, 星期一至星期五"
      );
    });
  });

  describe("zh_TW", function () {
    it("* * * * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string, { locale: "zh_TW" }), "每分鐘");
    });

    it("*/5 15 * * MON-FRI", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string, { locale: "zh_TW" }),
        "每 5 分鐘, 在 15:00 和 15:59 之間, 星期一 到 星期五"
      );
    });
  });

  describe("he", function () {
    it("* * * * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string, { locale: "he" }), "כל דקה");
    });

    it("*/5 15 * * MON-FRI", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string, { locale: "he" }),
        "כל 5 דקות, 15:00 עד 15:59, יום שני עד יום שישי"
      );
    });
  });

  describe("da", function () {
    it("* * * * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string, { locale: "da" }), "Hvert minut");
    });

    it("*/5 15 * * MON-FRI", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string, { locale: "da" }),
        "Hvert 5. minut, mellem 15:00 og 15:59, mandag til og med fredag"
      );
    });

    it("0 3 * * 4", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string, { locale: "da" }),
        "Kl 03:00, på enhver torsdag"
      );
    });

    it("0 3 * * 4,5", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string, { locale: "da" }),
        "Kl 03:00, på enhver torsdag og fredag"
      );
    });
  });

  describe("fa", function () {
    it("* * * * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string, { locale: "fa" }), "هر دقیقه");
    });

    it("*/5 15 * * MON-FRI", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string, { locale: "fa" }),
        "هر 5 دقیقه, بین 15:00 و 15:59, دوشنبه تا جمعه"
      );
    });
  });

  describe("sl", function () {
    it("* * * * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string, { locale: "sl" }), "Vsako minuto");
    });

    it("*/5 15 * * MON-FRI", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string, { locale: "sl" }),
        "Vsakih 5 minut, od 15:00 do 15:59, od Ponedeljek do Petek"
      );
    });
  });

  describe("ca", function () {
    it("* * * * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string, { locale: "ca" }), "Cada minut");
    });

    it("*/5 15 * * MON-FRI", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string, { locale: "ca" }),
        "Cada 5 minuts, entre les 15:00 i les 15:59, de dilluns a divendres"
      );
    });
  });

  describe("ko", function () {
    it("* * * * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string, { locale: "ko" }), "1분마다");
    });

    it("*/5 15 * * MON-FRI", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string, { locale: "ko" }),
        "5분마다, 오후 03:00에서 오후 03:59 사이, 월요일에서 금요일까지"
      );
    });
  });

  describe("hu", function () {
    it("* * * * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string, { locale: "hu" }), "Minden percben");
    });

    it("*/5 15 * * MON-FRI", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string, { locale: "hu" }),
        "Minden 5. percben, 15:00 és 15:59 között, hétfő - péntek"
      );
    });
  });

  describe("af", function () {
    it("* * * * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string, { locale: "af" }), "Elke minuut");
    });

    it("*/5 15 * * MON-FRI", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string, { locale: "af" }),
        "Elke 5 minute, tussen 15:00 en 15:59, Maandag deur na Vrydag"
      );
    });
  });

  describe("th", function () {
    it("* * * * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string, { locale: "th" }), "ทุกๆ นาที");
    });

    it("0 * * * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string, { locale: "th" }), "ทุกๆ ชั่วโมง");
    });

    it("*/5 15 * * MON-FRI", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string, { locale: "th" }),
        "ทุกๆ 5 นาที, ระหว่าง 03:00 PM ถึง 03:59 PM, วันจันทร์ ถึง วันศุกร์"
      );
    });

    it("15 14 1 * *", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string, { locale: "th" }),
        "เมื่อ 02:15 PM, ในวัน 1 ของเดือน"
      );
    });
  });
  describe("ar", function () {
    it("* * * * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string, { locale: "ar" }), "كل دقيقة");
    });

    it("*/5 15 * * MON-FRI", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string, { locale: "ar" }),
        "كل 5 دقائق, بين 15:00 و 15:59، الإثنين حتى الجمعة"
      );
    });
  });

  describe("my", function () {
    it("* * * * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string, { locale: "my" }), "Setiap minit");
    });

    it("0 * * * *", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string, { locale: "my", use24HourTimeFormat: true }),
        "Setiap jam"
      );
    });

    it("*/5 15 * * MON-FRI", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string, { locale: "my", use24HourTimeFormat: true }),
        "Setiap 5 minit, antara 15:00 dan 15:59, Isnin hingga Jumaat"
      );
    });

    it("0 5 1/1 * *", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string, { locale: "my", use24HourTimeFormat: true }),
        "Pada 05:00"
      );
    });

    it("15 11 * 1/5 MON", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string, { locale: "my", use24HourTimeFormat: true }),
        "Pada 11:15, hanya pada Isnin, setiap bulan 5"
      );
    });

    it("0 7 * * MON,TUE,THU,FRI,SUN", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string, { locale: "my", use24HourTimeFormat: true }),
        "Pada 07:00, hanya pada Isnin, Selasa, Khamis, Jumaat, dan Ahad"
      );
    });

  });

  describe("bg", function () {
    it("* * * * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string, { locale: "bg" }), "Всяка минута");
    });
    it("0 * * * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string, { locale: "bg" }), "Всеки час");
    });
    it("*/5 15 * * MON-FRI", function () {
      assert.equal(cronstrue.toString(this.test?.title as string, { locale: "bg" }), "Всеки 5 минути, от 15:00 до 15:59, от понеделник до петък");
    });
  });

  describe("be", function () {
    it("* * * * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string, { locale: "be" }), "Кожную хвіліну");
    });

    it("*/5 15 * * MON-FRI", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string, { locale: "be" }),
        "Кожныя 5 хвілін, з 03:00 PM па 03:59 PM, панядзелак па пятніца"
      );
    });
  });

  describe("hr", function () {
    it("* * * * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string, { locale: "hr" }), "Svaku minutu");
    });

    it("0 * * * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string, { locale: "hr" }), "Svaki sat");
    });

    it("*/5 15 * * MON-FRI", function () {
      assert.equal(
        cronstrue.toString(this.test?.title as string, { locale: "hr" }),
        "Svakih 5 minuta, između 15:00 i 15:59, od ponedjeljka do petka"
      );
    });
  });


});
