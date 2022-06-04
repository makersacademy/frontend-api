const ChitterApi = require("./chitterApi");

require("jest-fetch-mock").enableFetchMocks();

describe("Api", () => {
  describe("loadPeeps", () => {
    it("fetches peeps from the server", (done) => {
      const api = new ChitterApi();

      fetch.mockResponseOnce(async (request) => {
        try {
          expect(request.method).toBe("GET");
        } catch (error) {
          console.log(error);
          done(error);
        }

        return JSON.stringify(["This peep is coming from the server"]);
      });

      api.loadPeeps((response) => {
        expect(response[0]).toBe("This peep is coming from the server");
        expect(fetch.mock.calls[0][0]).toEqual("http://localhost:3000/peeps");

        done();
      });
    });
  });
});
