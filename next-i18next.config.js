const path = require("path");

module.exports = {
  i18n: {
    defaultLocale: "zh",
    locales: ["en", "de", 'zh'],
  },
  localePath: path.resolve("./public/locales"),
};
