import chai = require("chai");
import construe from "../src/cronstrue-i18n";
let assert = chai.assert;

describe("i18n", function () {
    describe("de", function () {
        it("* * * * *", function () {
            assert.equal(construe.toString(this.test.title, { locale: "de" }), "Jede Minute");
        });

        it("*/5 15 * * MON-FRI", function () {
            assert.equal(construe.toString(this.test.title, { locale: "de" }), "Alle 5 Minuten, um 15:00, Montag bis Freitag");
        });
    });

    describe("es", function () {
        it("* * * * *", function () {
            assert.equal(construe.toString(this.test.title, { locale: "es" }), "Cada minuto");
        });

        it("*/5 15 * * MON-FRI", function () {
            assert.equal(construe.toString(this.test.title, { locale: "es" }), "Cada 5 minutos, a las 03:00 PM, de lunes a viernes");
        });
    });

    describe("fr", function () {
        it("* * * * *", function () {
            assert.equal(construe.toString(this.test.title, { locale: "fr" }), "Toutes les minutes");
        });

        it("*/5 15 * * MON-FRI", function () {
            assert.equal(construe.toString(this.test.title, { locale: "fr" }), "Toutes les 5 minutes, à 03:00 PM, de lundi à vendredi");
        });
    });

    describe("it", function () {
        it("* * * * *", function () {
            assert.equal(construe.toString(this.test.title, { locale: "it" }), "Ogni minuto");
        });

        it("*/5 15 * * MON-FRI", function () {
            assert.equal(construe.toString(this.test.title, { locale: "it" }), "Ogni 5 minuti, alle 15:00, lunedì al venerdì");
        });
    });

    describe("nb", function () {
        it("* * * * *", function () {
            assert.equal(construe.toString(this.test.title, { locale: "nb" }), "Hvert minutt");
        });

        it("*/5 15 * * MON-FRI", function () {
            assert.equal(construe.toString(this.test.title, { locale: "nb" }), "Hvert 5 minutt, på 03:00 PM, mandag til og med fredag");
        });
    });

    describe("sv", function () {
        it("* * * * *", function () {
            assert.equal(construe.toString(this.test.title, { locale: "sv" }), "Varje minut");
        });

        it("*/5 15 * * MON-FRI", function () {
            assert.equal(construe.toString(this.test.title, { locale: "sv" }), "Var 5 minut, kl 15:00, måndag till fredag");
        });

        it("0 12 * * *", function () {
            assert.equal(construe.toString(this.test.title, { locale: "sv" }), "Kl 12:00");
        });

        it("0 15 10 ? * 6#3", function () {
            assert.equal(construe.toString(this.test.title, { locale: "sv" }), "Kl 10:15, den tredje lördagen av månaden");
        });

        it("0 0 15 ? * MON *", function () {
            assert.equal(construe.toString(this.test.title, { locale: "sv" }), "Kl 15:00, varje måndag");
        });
    });

    describe("nl", function () {
        it("* * * * *", function () {
            assert.equal(construe.toString(this.test.title, { locale: "nl" }), "Elke minuut");
        });

        it("*/5 15 * * MON-FRI", function () {
            assert.equal(construe.toString(this.test.title, { locale: "nl" }), "Elke 5 minuten, op 03:00 PM, maandag t/m vrijdag");
        });
    });

    describe("pl", function () {
        it("* * * * *", function () {
            assert.equal(construe.toString(this.test.title, { locale: "pl" }), "Co minutę");
        });

        it("*/5 15 * * MON-FRI", function () {
            assert.equal(construe.toString(this.test.title, { locale: "pl" }), "Co 5 minut, o 15:00, od poniedziałek do piątek");
        });
    });

    describe("pt_BR", function () {
        it("* * * * *", function () {
            assert.equal(construe.toString(this.test.title, { locale: "pt_BR" }), "A cada minuto");
        });

        it("*/5 15 * * MON-FRI", function () {
            assert.equal(construe.toString(this.test.title, { locale: "pt_BR" }), "A cada 5 minutos, Às 03:00 PM, de segunda-feira a sexta-feira");
        });
    });

    describe("ro", function () {
        it("* * * * *", function () {
            assert.equal(construe.toString(this.test.title, { locale: "ro" }), "În fiecare minut");
        });

        it("*/5 15 * * MON-FRI", function () {
            assert.equal(construe.toString(this.test.title, { locale: "ro" }), "La fiecare 5 minute, la 15:00, de luni până vineri");
        });
    });

    describe("ru", function () {
        it("* * * * *", function () {
            assert.equal(construe.toString(this.test.title, { locale: "ru" }), "Каждую минуту");
        });

        it("*/5 15 * * MON-FRI", function () {
            assert.equal(construe.toString(this.test.title, { locale: "ru" }), "Каждые 5 минут, в 15:00, понедельник по пятница");
        });
    });

    describe("tr", function () {
        it("* * * * *", function () {
            assert.equal(construe.toString(this.test.title, { locale: "tr" }), "Her dakika");
        });

        it("*/5 15 * * MON-FRI", function () {
            assert.equal(construe.toString(this.test.title, { locale: "tr" }), "Her 5 dakikada bir, saat 15:00, Pazartesi ile Cuma arasında");
        });
    });

    describe("uk", function () {
        it("* * * * *", function () {
            assert.equal(construe.toString(this.test.title, { locale: "uk" }), "Щохвилини");
        });

        it("*/5 15 * * MON-FRI", function () {
            assert.equal(construe.toString(this.test.title, { locale: "uk" }), "Кожні 5 хвилин, о 15:00, понеділок по п'ятниця");
        });
    });

    describe("zh_CN", function () {
        it("* * * * *", function () {
            assert.equal(construe.toString(this.test.title, { locale: "zh_CN" }), "每分钟");
        });

        it("*/5 15 * * MON-FRI", function () {
            assert.equal(construe.toString(this.test.title, { locale: "zh_CN" }), "每 5 分钟, 在 03:00 PM, 星期一 到 星期五");
        });
    });
});
