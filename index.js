const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;

//schema
const schemaData = mongoose.Schema(
  {
    name: String,
    email: String,
    mobile: String,
  },
  {
    timestamps: true,
  }
);

const userModal = mongoose.model("user", schemaData);

// for address schema -----------------------------------------
const addressSchemaData = mongoose.Schema(
  {
    address: String,
    blood_group: String,
  },
  {
    timestamps: true,
  }
);

const userAddressModal = mongoose.modelNames("address", addressSchemaData);

app.get("/all-address", async (req, res) => {
  const data = await userAddressModal.find({});
  res.json({ success: true, data: data });
});

app.post("/create-address", async (req, res) => {
  const data = new userAddressModal(req.body);
  await data.save();
  res.send({ success: true, message: "save data successfully", data: data });
});

// for address schema End -----------------------------------------

//read
app.get("/", async (req, res) => {
  const data = await userModal.find({});
  res.json({ success: true, data: data });
});

//create data
app.post("/create", async (req, res) => {
  console.log(req.body);
  const data = new userModal(req.body);
  await data.save();
  res.send({ success: true, message: "save data successfully", data: data });
});

//update data
app.put("/update", async (req, res) => {
  console.log(req.body);
  const { id, ...rest } = req.body;
  console.log(rest);
  const data = await userModal.updateOne({ _id: id }, rest);
  res.send({ success: true, message: "save update successfully", data: data });
});

//Delete
app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const data = await userModal.deleteOne({ _id: id });
  res.send({ success: true, message: "save delete successfully", data: data });
});

// app.get("/",(req,res)=>{
//   res.json({message: "server crud running"})
// })

mongoose
  .connect(process.env.MONOGO_URL)
  .then(() => {
    console.log("connect to DB");
    app.listen(PORT, () => console.log("server is running"));
  })
  .catch((err) => console.log(err));
