const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 8080

//schema
const schemaData = mongoose.Schema({
  name: String,
  email: String,
  mobile: String
},{
  timestamps: true
})

const userModal = mongoose.model("user",schemaData)

//read 
app.get("/",async(req,res)=>{
  const data = await userModal.find({})
  res.json({success:true, data : data})
})

//create data
app.post("/create", async(req,res)=>{
  console.log(req.body);
  const data = new userModal(req.body)
  await data.save()
  res.send({success : true, message : "save data successfully",data : data})
})


//update data
app.put("/update",async(req,res)=>{
  console.log(req.body);
  const {id,...rest} = req.body
  console.log(rest);
  const data = await userModal.updateOne({_id: id},rest)
  res.send({success : true, message : "save update successfully",data : data})
})

//Delete
app.delete("/delete/:id", async(req,res)=>{
  const id = req.params.id
  console.log(id);
  const data = await userModal.deleteOne({_id: id})
  res.send({success : true, message : "save delete successfully",data : data})
})

// app.get("/",(req,res)=>{
//   res.json({message: "server crud running"})
// })

mongoose.connect("mongodb://127.0.0.1:27017/crudOperation")
.then(()=>{
  console.log("connect to DB")
  app.listen(PORT,()=>console.log("server is running"))
})
.catch((err)=>console.log(err))
