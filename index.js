const express = require("express") ;
const cors= require("cors") ;
const mongoose= require("mongoose") ;
const authRoutes= require("./routes/authRoutes")
const doctorRoutes= require("./routes/doctorRoutes") ;
const config=require("./config") ;


const app= express() ;
const port= 7979 ;

app.use(cors());
app.use(express.json()) ;

mongoose.connect(config.mongoUrl,{

useNewUrlParser : true,
useUnifiedTopology:true,

})
.then(()=>{
    console.log("Connected to MongoDB Atlas ")
})
.catch((error)=>{
console.error("Error connection to Connected to MongoDB Atlas " ,error);

})


//Routes

app.get("/",(req,res)=>{
    res.send("hello Doctors")
})

app.use("/api/auth",authRoutes);
app.use("/api/doctors",doctorRoutes);

//Server



app.listen(port,()=>{
    console.log(`server is running on port ${port}` );
})