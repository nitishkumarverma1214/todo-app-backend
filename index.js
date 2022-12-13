const express = require("express");
const router = require("./routes/todoRoutes");
const cors = require("cors");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());
app.use(express.json());
app.use("/api/v1/", router);

const PORT = 1327;
app.listen(PORT, () => {
  console.log("app is running at port=", PORT);
});
