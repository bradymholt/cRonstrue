import "mocha";
import { assert } from "chai";
import cronstrue from "../src/cronstrue-i18n";
import "../src/i18n/locales/fr";

describe("Cronstrue (fr)", function () {
  before(function () {
    cronstrue.defaultLocale = "fr";
  });

  describe("every", function () {
    it("* * * * * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Toutes les secondes");
    });

    it("* * * * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Toutes les minutes");
    });

    it("*/1 * * * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Toutes les minutes");
    });

    it("*/5 * * * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Toutes les 5 minutes");
    });

    it("0 0/1 * * * ?", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Toutes les minutes");
    });

    it("0 0 * * * ?", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Toutes les heures");
    });

    it("0 0 0/1 * * ?", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Toutes les heures");
    });
  });

  describe("interval", function () {
    it("*/45 * * * * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Toutes les 45 secondes");
    });

    it("*/5 * * * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Toutes les 5 minutes");
    });

    it("*/10 * * * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Toutes les 10 minutes");
    });

    it("0 */5 * * * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Toutes les 5 minutes");
    });

    it("0 * ? * 2/1 *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Toutes les heures, de mardi à samedi");
    });

    it("0 * ? * 1/1", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Toutes les heures, de lundi à samedi");
    });

    it("0 * ? * 2/1", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Toutes les heures, de mardi à samedi");
    });
  });

  describe("ranges", function () {

    it("23 12 * Jan-Mar *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "À 12:23, de janvier à mars");
    });

    it("23 12 * JAN-FEB *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "À 12:23, de janvier à février");
    });
  });

  describe("at", function () {
    it("29 10 * * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "À 10:29");
    });

    it("30 10 * * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "À 10:30");
    });

    it("29 10 * * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "À 10:29");
    });

    it("30 10 * * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "À 10:30");
    });

    it("23 12 * * SUN", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "À 12:23, uniquement le dimanche");
    });

    it("30 02 14 * * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "À 14:02:30");
    });

    it("0 0 6 1/1 * ?", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "À 06:00");
    });

    it("0 5 0/1 * * ?", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "5 minutes après l'heure");
    });

    it("23 12 * JAN *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "À 12:23, uniquement en janvier");
    });

    it("23 12 ? JAN *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "À 12:23, uniquement en janvier");
    });

  });

  describe("weekday", function () {
    it("* * LW * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Toutes les minutes, le dernier jour ouvrable du mois");
    });

    it("* * WL * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Toutes les minutes, le dernier jour ouvrable du mois");
    });

    it("* * 1W * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Toutes les minutes, le premier jour ouvrable du mois");
    });

    it("* * W1 * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Toutes les minutes, le premier jour ouvrable du mois");
    });
  });

  describe("last", function () {
    it("* * * * 4L", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Toutes les minutes, le dernier jeudi du mois");
    });

    it("0 15 10 L * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "À 10:15, le dernier jour du mois");
    });
  });

  describe("non-trivial expressions", function () {
    it("* * * * MON#3", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Toutes les minutes, le troisième lundi du mois");
    });

    it("* * 5/8 * * ?", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Toutes les secondes, toutes les 8 heures, à partir de 05:00");
    });

    it("3/6 * * * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Toutes les 6 minutes, à partir de 3 minutes après l'heure");
    });

    it("* 3/6 * * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Toutes les minutes, toutes les 6 heures, à partir de 03:00");
    });

    // ERROR: This is false but it can't be fixed properly for french language
    // "à partir de 3" should be "à partir du 3"
    // See https://github.com/bradymholt/cRonstrue/pull/338
    it("* * 3/6 * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Toutes les minutes, tous les 6 jours, à partir de 3 du mois");
    });

    it("* * * 3/6 *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Toutes les minutes, tous les 6 mois, de mars à décembre");
    });

    it("* * * * 3/6", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Toutes les minutes, tous les 6 jours de la semaine, de mercredi à samedi");
    });
  });
});
