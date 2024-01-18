//const { request, response } = require("express");
import dotenv from "dotenv";
import express from "express";
import { Db, MongoClient } from "mongodb";
//import dotenv from "dotenv";
//const express=require("express");
const app=express();


/*const users=[
    {
     "createdAt": "2022-01-08T00:47:57.603Z",
     "name": "Velma Hoeger",
     "pic": "https://cdn.fakercloud.com/avatars/amayvs_128.jpg",
     "color": "teal",
     "age": 86,
     "id": "1"
    },
    {
     "createdAt": "2022-01-07T22:13:37.883Z",
     "name": "Myron Jenkins",
     "pic": "https://cdn.fakercloud.com/avatars/madebyvadim_128.jpg",
     "color": "color 8",
     "age": 92,
     "id": "2"
    },
    {
     "createdAt": "2022-01-07T19:40:02.041Z",
     "name": "Tammy Batz",
     "pic": "https://cdn.fakercloud.com/avatars/johannesneu_128.jpg",
     "color": "Red",
     "age": 74,
     "id": "3"
    },
    {
     "createdAt": "2022-01-08T05:59:23.901Z",
     "name": "Rosie Rodriguez",
     "pic": "https://cdn.fakercloud.com/avatars/guiiipontes_128.jpg",
     "color": "teal",
     "age": 78,
     "id": "8"
    },
    {
     "createdAt": "2022-01-08T10:42:31.252Z",
     "name": "Mrs. Josephine Roob",
     "pic": "https://cdn.fakercloud.com/avatars/psdesignuk_128.jpg",
     "color": "yellow",
     "age": 43,
     "id": "4"
    },
    {
     "createdAt": "2022-01-07T20:04:24.383Z",
     "name": "Woodrow Hane",
     "pic": "https://cdn.fakercloud.com/avatars/badlittleduck_128.jpg",
     "color": "teal",
     "age": 16,
     "id": "28"
    },
    {
     "createdAt": "2022-01-08T10:47:03.182Z",
     "name": "Betsy Gulgowski",
     "pic": "https://cdn.fakercloud.com/avatars/bermonpainter_128.jpg",
     "color": "Red",
     "age": 47,
     "id": "5"
    },
    {
     "createdAt": "2022-01-08T13:34:20.260Z",
     "name": "Angelina Jast",
     "pic": "https://cdn.fakercloud.com/avatars/pierrestoffe_128.jpg",
     "color": "teal",
     "age": 34,
     "id": "6"
    },
    {
     "createdAt": "2022-01-08T03:27:11.846Z",
     "name": "Roger Von I",
     "pic": "https://cdn.fakercloud.com/avatars/timmillwood_128.jpg",
     "color": "green",
     "age": 22,
     "id": "7"
    }
]*/;

app.use(express.json());
const PORT=5000;
dotenv.config();
console.log(process.env);

  async function createConnection(){
   const MONGO_URL=process.env.MONGO_URL;
   const Mongo_URL="mongodb://localhost/users";
 //const Mongo_URL="mongodb+srv://Malatesh:Malatesh95@cluster0.asaxd.mongodb.net/users";
   
   const client=new MongoClient(MONGO_URL);
   await client.connect();
   console.log("Succssfully Connected!!! ");
  // const user= await client.db("users").collection("people").findOne({id:"8"});
  // console.log(user);
 // const insertdata=await client.db("users").collection("people").insertMany(users)

  return client;
   }
   createConnection();

app.get("/",(request,response)=>{
     response.send("Hello world!!!");
});

app.get("/users/:id",async(request,response)=>{
    console.log(request.params);
    const {id}=request.params;
    const client=await createConnection();
    const user=await client.db("users").collection("people").findOne({id:id});
    console.log(user);
   // response.send(users.filter((user)=>user.id==id));
   response.send(user);
});

app.delete("/users/:id",async(request,response)=>{
    console.log(request.params);
    const {id}=request.params;
    const client=await createConnection();
    const deletdata=request.body;
    const user=await client.db("users").collection("people").deleteOne({id:id});
    console.log(deletdata,user);
   // response.send(users.filter((user)=>user.id==id));
   response.send(user);
});

app.patch("/users/:id",async(request,response)=>{
    console.log(request.params);
    const {id}=request.params;
    const client=await createConnection();
    const newData=request.body;
    const user=await client.db("users").collection("people").updateOne({id:id},{$set:newData});
    console.log(newData,user);
   // response.send(users.filter((user)=>user.id==id));
   response.send(user);
});


app.get("/users",async(request,response)=>{
    const client= await createConnection();
    const users=await client.db("users").collection("people").find({}).toArray();
    console.log(users);
    response.send(users);
    //console.log(request.query.color.age);
   // const {color,ageGt}=request.query;
   // console.log(request.params,color,ageGt)
   /* if(!color && !ageGt){
        response.send(users)
   }else if(color &&!ageGt){
        response.send(users.filter((user)=>user.color==color));
    }else if(!color && ageGt) {
        response.send(users.filter((user)=>user.age>=ageGt));
    }else{
        response.send(users.filter((user)=>user.color==color &&user.age>=ageGt));  
    }*/
    
});
app.post("/users",async(request,response)=>{
    const client=await createConnection();
    const addData=request.body;
    const result=await client.db("users").collection("people").insertMany(addData);
    console.log(addData,result);
    response.send(result);
})


app.listen(PORT,()=>console.log("The server is Started in :",PORT));