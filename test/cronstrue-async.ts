import chai = require("chai");

import * as cronstrueAsync from "../src/cronstrue-async";
let assert = chai.assert;

describe("cronstrueAsync", () => {

  describe("fallback to english", () => {
    it("* * * * * *", async () => {
      const cronstrue = await cronstrueAsync.initialize();
      assert.equal(cronstrue.toString("* * * * * *", { locale: "pt_BR" }), "Every second");
    });
  });

  describe("de", () => {
    it("* * * * *", async () => {
      const cronstrue = await cronstrueAsync.initialize([{ languageCode: "de" }]);
      assert.equal(cronstrue.toString("* * * * *", { locale: "de" }), "Jede Minute");
    });

    it("*/5 15 * * MON-FRI", async () => {
      const cronstrue = await cronstrueAsync.initialize([{ languageCode: "de" }]);
      assert.equal(
        cronstrue.toString("*/5 15 * * MON-FRI", { locale: "de" }),
        "Alle 5 Minuten, um 15:00, Montag bis Freitag"
      );
    });
  });

  describe("de & es", () => {
    it("* * * * *", async () => {
      const cronstrue = await cronstrueAsync.initialize([{ languageCode: "de" }, { languageCode: "es" }]);
      assert.equal(cronstrue.toString("* * * * *", { locale: "de" }), "Jede Minute");
      assert.equal(cronstrue.toString("* * * * *", { locale: "es" }), "Cada minuto");
    });

    it("*/5 15 * * MON-FRI", async () => {
      const cronstrue = await cronstrueAsync.initialize([{ languageCode: "de" }, { languageCode: "es" }]);
      assert.equal(
        cronstrue.toString("*/5 15 * * MON-FRI", { locale: "de" }),
        "Alle 5 Minuten, um 15:00, Montag bis Freitag"
      );
      assert.equal(
        cronstrue.toString("*/5 15 * * MON-FRI", { locale: "es" }),
        "Cada 5 minutos, a las 03:00 PM, de lunes a viernes"
      );
    });
  });

  describe("locale override", () => {
    it("should return the overriden value", async () => {
      const cronstrue = await cronstrueAsync.initialize([{ languageCode: "de", localeOverride: { everyMinute: () => "Foo Bar" } }]);
      assert.equal(cronstrue.toString("* * * * *", { locale: "de" }), "Foo Bar");
      assert.equal(
        cronstrue.toString("*/5 15 * * MON-FRI", { locale: "de" }),
        "Alle 5 Minuten, um 15:00, Montag bis Freitag"
      );
    });

    it("should add daily only when needed (verbose mode)", async () => {
      const cronstrue = await cronstrueAsync.initialize([{ languageCode: "de", localeOverride: { commaEveryDay: () => "" } }]);
      assert.equal(cronstrue.toString("0 0 12 ? * SUN *", { locale: "de", verbose: true }), "Um 12:00, nur am Sonntag");

      const cronstrue2 = await cronstrueAsync.initialize([{ languageCode: "de", localeOverride: { commaEveryDay: () => ", täglich" } }]);
      assert.equal(cronstrue2.toString("0 0 12 ? * ? *", { locale: "de", verbose: true }), "Um 12:00, täglich");
    });
  });

});
