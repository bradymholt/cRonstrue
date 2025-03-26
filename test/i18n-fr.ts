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

  describe("choice", function () {
    it("* * 3,8 * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Toutes les minutes, le 3 et 8 du mois");
    });

    it("* * * * 2,6", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Toutes les minutes, uniquement le mardi et samedi");
    });

    it("* * 3 * 2", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Toutes les minutes, le 3 du mois, et mardi");
    });

    it("* * 3 * 2,6", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Toutes les minutes, le 3 du mois, et mardi et samedi");
    });

    it("* * 3,8 * 2", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Toutes les minutes, le 3 et 8 du mois, et mardi");
    });

    it("* * 3,8 * 2,6", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Toutes les minutes, le 3 et 8 du mois, et mardi et samedi");
    });

    it("* * 1,3,5,7,9 * 2,4,6", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Toutes les minutes, le 1, 3, 5, 7, et 9 du mois, et mardi, jeudi, et samedi");
    });

    it("0,30,59 0,12,23 1,3,5,7,9 3,6,9,12 2,4,6", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "0, 30, et 59 minutes après l'heure, 00:00, 12:00, et 23:00, le 1, 3, 5, 7, et 9 du mois, et mardi, jeudi, et samedi, uniquement en mars, juin, septembre, et décembre");
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

    it("* * 3/6 * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Toutes les minutes, tous les 6 jours, à partir du 3 du mois");
    });

    it("* * * 3/6 *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Toutes les minutes, tous les 6 mois, de mars à décembre");
    });

    it("* * * * 3/6", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Toutes les minutes, tous les 6 jours de la semaine, de mercredi à samedi");
    });
  });
});
