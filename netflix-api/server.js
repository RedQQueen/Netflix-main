const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/UserRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// const uri = process.env.MONGODB_URI;
mongoose
  // .connect(uri)
  .connect("mongodb+srv://RedQQueen:Lovely101@netlflix-clone.b1vzfdc.mongodb.net/netflix-clone?retryWrites=true&w=majority")
  .then(() => console.log("DB Connected Ah Successfully"))
  .catch((err) => {
    console.log(err.message);
  });

app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server started on port ${PORT}`));
