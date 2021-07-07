const { response, request } = require("express");
const path = require("path");

const rewrite = (req = request, res = response) => {
  res.sendFile(path.join(__dirname, "../../public/index.html"), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
};

module.exports = {
  rewrite,
};
