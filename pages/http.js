const axios = require("axios");

class Httpclient {
  constructor() {
    this.axios = axios.create({
      baseURL: "https://asgard-web-apis-stage.frt.one",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFROVVMSktJNmJDNXJ5NUVkZ1Q5ckEkJCIsImZpcnN0TmFtZSI6IlNrIiwibGFzdE5hbWUiOiJLYXVzaGlrIiwiZW1haWwiOm51bGwsIm1vYmlsZU51bWJlciI6NzAyNzIxODgwMSwiZGV2aWNlIjoiNSIsImRldmljZUlkIjoicXdlcnR5MTIzNjY1MiIsInByZWZlcnJlZE1hbGxJZCI6MiwiaXNFeGNsdXNpdmUiOjAsImdlbmRlciI6bnVsbCwiZG9iIjpudWxsLCJhbm5pdmVyc2FyeSI6bnVsbCwib3B0ZWRGb3JEZWxldGlvbiI6MCwicmVhY3RpdmF0aW9uQ29kZSI6bnVsbCwicHJvZmlsZVBpYyI6Imh0dHBzOi8vcHVibGljLWZ1dHVyZXJldGFpbC1kYXRhLnMzLmFtYXpvbmF3cy5jb20vcHJvZmlsZVBpYy84OTgwMzAwNjUzOS0xLTIwMjAtOC0yNi5wbmciLCJsYXN0TG9naW4iOiIwNi0xMC0yMDIyIiwiZGVsZXRpb25SZXF1ZXN0ZWRBdCI6bnVsbCwiaWF0IjoxNjY1MTIzMzIwLCJleHAiOjE2NjY0MTkzMjB9.KZkaP9ugft9QczofZRDiNV7ZuiTO4ZH1hczJRd18oHM",
        mallId: "mall_1",
      },
    });
  }

  async getSpinTheWheels() {
    try {
      let {
        data: { data },
      } = await this.axios.get(
        "/v1/web/spinWheel?pageNo=1&pageSize=10&sort=desc"
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async getSpinTheWheelDetails(id) {
    try {
      let {
        data: { data },
      } = await this.axios.get(`/v1/web/spinWheel/${id}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async spinNow(payload) {
    try {
      let {
        data: { data },
      } = await this.axios.post(`/v1/web/spinWheel`, payload);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}

let http = new Httpclient();
module.exports = http;
