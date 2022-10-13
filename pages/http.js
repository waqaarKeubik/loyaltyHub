const axios = require("axios");

class Httpclient {
  constructor() {
    this.axios = axios.create({
      baseURL: "https://asgard-web-apis-stage.frt.one",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        mallId: "mall_2",
      },
    });
  }

  async getSpinTheWheels() {
    try {
      let {
        data: { data },
      } = await this.axios.get(
        "/v1/web/spinWheel?pageNo=1&pageSize=10&sort=desc",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            mallId: "mall_2",
          },
        }
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async getSpinTheWheelDetails(id, token) {
    try {
      let {
        data: { data },
      } = await this.axios.get(`/v1/web/spinWheel/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          mallId: "mall_2",
        },
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async spinNow(payload) {
    try {
      let {
        data: { data },
      } = await this.axios.post(`/v1/web/spinWheel`, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          mallId: "mall_2",
        },
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  async getToken(number) {
    try {
      let {
        data: { data },
      } = await axios.post(
        `https://asgard-web-apis-stage.frt.one/v1/fct/getToken`,
        {
          mobileNumber: number,
        }
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  async getConstants() {
    try {
      let {
        data: { data },
      } = await axios.get(
        `https://asgard-web-apis-stage.frt.one/v1/constants/getMallConstants`
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  async getUserProfile(token) {
    try {
      let {
        data: { data },
      } = await axios.get(
        `https://asgard-web-apis-stage.frt.one/v1/web/userProfile`,
        { headers: { Authorization: `${token}`, mallId: "mall_2" } }
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}

let http = new Httpclient();
module.exports = http;
