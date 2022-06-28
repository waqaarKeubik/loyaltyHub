const axios = require("axios");

class Httpclient {
  constructor() {
    this.axios = axios.create({
      baseURL: "https://asgard-web-apis-stage.frt.one",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjNjRkVXVGdFbDVqZ1FNYkp3c0tDX2ckJCIsImZpcnN0TmFtZSI6IldhcWFhciIsImxhc3ROYW1lIjoiQXNsYW0iLCJlbWFpbCI6IndhcWFhcjFAdW5pZnluZC5jb20iLCJtb2JpbGVOdW1iZXIiOjg4NzkzNDc2NDYsImRldmljZSI6IjUiLCJkZXZpY2VJZCI6InF3ZXJ0eTEyMzY2NTIiLCJwcmVmZXJyZWRNYWxsSWQiOjEsImlzRXhjbHVzaXZlIjowLCJnZW5kZXIiOiJtYWxlIiwiZG9iIjoiMjAwOS0wMi0xMSIsImFubml2ZXJzYXJ5IjoiMjAyMC0wOC0xMiIsIm9wdGVkRm9yRGVsZXRpb24iOjAsInJlYWN0aXZhdGlvbkNvZGUiOm51bGwsInByb2ZpbGVQaWMiOiJodHRwczovL3B1YmxpYy1mdXR1cmVyZXRhaWwtZGF0YS5zMy5hbWF6b25hd3MuY29tL3Byb2ZpbGVQaWMvODk4MDMwMDY1MzktMS0yMDIwLTgtMjYucG5nIiwibGFzdExvZ2luIjoiMjctMDYtMjAyMiIsImRlbGV0aW9uUmVxdWVzdGVkQXQiOm51bGwsImlhdCI6MTY1NjQwNzIwMSwiZXhwIjoxNjU3NzAzMjAxfQ.30NEV04IBnhBcXeH7maU_wUElfcDPPXxz8edJYQ2Z9U",
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
      let {data: {data}} = await this.axios.post(`/v1/web/spinWheel`, payload);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}

let http = new Httpclient();
module.exports = http;
