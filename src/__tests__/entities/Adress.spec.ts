import { AdressParamsType } from "@/entities/@types/types";
import Adress from "@/entities/Adress";

describe("Adress", () => {
  describe("Constructor", () => {
    it("Should be a instance of Adress class", () => {
      const params: AdressParamsType = {
        street: "Rua X",
        number: "s/n",
        city: "São Paulo",
        state: "São Paulo",
        country: "Brasil",
        zip_code: "",
      };

      expect(new Adress(params)).toBeInstanceOf(Adress);
    });
    it("Should be a instance of Adress class with timestamps", () => {
      const params: AdressParamsType = {
        street: "Rua X",
        number: "s/n",
        city: "São Paulo",
        state: "São Paulo",
        country: "Brasil",
        zip_code: "",
        created_at: new Date(2020, 2, 20),
        updated_at: new Date(2022, 2, 2),
      };

      expect(new Adress(params)).toBeInstanceOf(Adress);
    });
  });

  describe("get", () => {
    describe("should be returns a object", () => {
      const params: AdressParamsType = {
        street: "Rua X",
        number: "s/n",
        city: "São Paulo",
        state: "São Paulo",
        country: "Brasil",
        zip_code: "",
      };

      const adress = new Adress(params);

      expect(adress.get()).toEqual(params);
    });

    describe("should be returns a object with timestamps", () => {
      const params: AdressParamsType = {
        street: "Rua X",
        number: "s/n",
        city: "São Paulo",
        state: "São Paulo",
        country: "Brasil",
        zip_code: "",
        created_at: new Date(2020, 2, 20),
        updated_at: new Date(2022, 2, 2),
      };

      const adress = new Adress(params);
      expect(adress.get()).toEqual(params);
    });
  });
});
