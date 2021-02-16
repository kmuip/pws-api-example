const PsrApiEnums = require("./api/psrApiEnums");
const { PsrApi, PsrApiTypes } = require("./api/psrApi");

module.exports = {
  PsrApiEnums,
  PsrApiTypes,
  getApiInstance() {
    return new PsrApi(process.env.API_URL);
  },
};
