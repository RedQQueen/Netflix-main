const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/UserRoutes");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://RedQQueen:Lovely101@netlflix-clone.b1vzfdc.mongodb.net/netflix-clone"
  )
  .then(() => console.log("DB Connected Ah Successfully"))
  .catch((err) => {
    console.log(err.message);
  });

app.use("/api/user", userRoutes);

app.listen(5000, () => console.log("server started"));
