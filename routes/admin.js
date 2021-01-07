const path = require("path");

const express = require("express");

const rootDir = require("../util/path");

const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", (req, res, next) => {
  //   console.log("In another middleware");
  //   res.sendFile(path.join(__dirname, "..", "views/add-product.html"));
  res.sendFile(path.join(rootDir, "views/add-product.html"));
  //so because we don't say next() funtion
  //it never reaches '/' route
});

//instead of 'app.use()' we can  app.get or app.post & so on ...

// /admin/add-product => POST
router.post("/add-product", (req, res, next) => {
  console.log(req.body);

  res.redirect("/");
});

module.exports = router;
