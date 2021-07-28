'use strict';

if (process.env.NODE_ENV === "production") {
  module.exports = require("./layout_antd.cjs.prod.js");
} else {
  module.exports = require("./layout_antd.cjs.dev.js");
}
