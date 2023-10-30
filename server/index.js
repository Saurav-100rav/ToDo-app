const express = require("express")
const cors = require("cors");
const app = express(); 
app.use(cors(
    // {
    //     origin:"https://64f1e2a37069f6684aa28f92--deft-cranachan-421df6.netlify.app/"
    // }
));

//basically parse incoming Request Object as a JSON Object
app.use(express.json());
app.use(express.urlencoded());

const database_connection = require("./Database/db.js")
database_connection();



const routefunc = require("./Routes/route")
app.use("/",routefunc)

app.get("/",(req,res)=>{
    res.send("hello from homepage...");
})

const PORT = process.env.Port || 9000;
app.listen(PORT, ()=> console.log(`server is listening at port ${PORT}`) )