import ResponseObject from "@/infra/adapters/controllers/http/protocols/ResponseObject";

describe("ResponseObject", () => {
  describe("getStatus", () => {
    it("Should return a number corresponding to http status code 201 ", () => {
      const responseObj = new ResponseObject(201);
      expect(responseObj).toBeInstanceOf(ResponseObject);
      expect(responseObj.getStatus()).toEqual(201);
    });

    it("Should return a number corresponding to http status code, with parameter containing body.", () => {
      const responseObj = new ResponseObject(201, {
        data: {
          message: "teste",
        },
      });
      expect(responseObj).toBeInstanceOf(ResponseObject);
      expect(responseObj.getStatus()).toEqual(201);
    });
  });
  describe("getBody", () => {
    it("Should return an object containing body of response.", () => {
      const responseObj = new ResponseObject(201, {
        data: {
          message: "teste",
        },
      });
      expect(responseObj).toBeInstanceOf(ResponseObject);
      expect(responseObj.getBody()).toEqual({
        data: {
          message: "teste",
        },
      });
    });

    it("Should return undefined.", () => {
      const responseObj = new ResponseObject(201);
      expect(responseObj).toBeInstanceOf(ResponseObject);
      expect(responseObj.getBody()).toBeUndefined();
    });
  });
});
