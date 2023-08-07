const express=require("express");
const cors = require('cors');

const dotenv=require("dotenv").config();
const mongoose=require("mongoose");
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const Sales=require("./model/salesRecordModel")
const connectDb=async()=>{
    try{
const connect=await mongoose.connect(process.env.CONNECTION_STRING)
console.log("Database connected",connect.connection.host,connect.connection.name)
    }catch(err){
        console.log(err)
        process.exit
    }
}


const app=express();
app.use(express.json())
connectDb();


app.use(cors());
const port=process.env.PORT;



app.get(("/api/info"),async(req,res)=>{
    const anyname = await Sales.find()
    let temp=[...anyname]
        let ab=[]
        temp.map((el,i)=>ab.push([el.quantity,i]))
        
        ab.sort((a,b)=>b[0]-a[0]);
        let final=[];
        let temp2=[];
        ab.map((el)=>temp2.push(el[1]))
        temp.map((item,key)=>final.push(anyname[temp2[key]]))
        const z =final.slice(0,5)
        res.status(200).json(z.map((el)=>({name:el.name,quantity:el.quantity,amount:el.amount})))
    // // console.log(req.body)

    // const {name,quantity,amount}=req.body;

    // const contact=await Sales.create({
    //     name,quantity,amount
    // })
    // res.status(200).json({"name":anyname}) 
  
})

app.get(("/api/revenue"),async(req,res)=>{
    const anyname = await Sales.find()
    let temp=[...anyname]
        let ab=[]
        temp.map((el,i)=>ab.push([parseInt(el.amount)]))
    
        let final= 0;
        ab.forEach((elem)=>final = final + parseInt(elem))
        res.status(200).json({"total_revenue":final})
    // // console.log(req.body)

    // const {name,quantity,amount}=req.body;

    // const contact=await Sales.create({
    //     name,quantity,amount
    // })
    // res.status(200).json({"name":anyname}) 
  
})

app.listen(port,()=>console.log(`server running on port ${port}`))
// .