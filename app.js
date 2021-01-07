// const http = require("http");
const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// app.use("/", (req, res, next) => {
//   //   console.log("this always runs");
//   next();
// });

// if we change the app.get or app.post into app.user in routes
//the order of calling adminRoutes & shopRoutes is important for us
// and in that situation we must call shopRoutes at the end

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(3000, () => {
  console.log("Server now is listening");
});

// const server = http.createServer(app);

// server.listen(3000);
