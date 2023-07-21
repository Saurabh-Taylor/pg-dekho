import express from "express";
import path from "path"
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


// Connecting mongoDb

mongoose.connect("mongodb://localhost:27017",{
    dbName:"pgdekho",
}).then(()=>console.log("DataBase Connected")).catch((e)=>console.log(e))


// Creating Schema

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
})



// owner details
const ownerSchema = new mongoose.Schema({
    Username:String,
    number:String,
    mobile:String,
    address:String,
    room:String,
    price:String,
})

// food services detail

const foodServicesSchema = new mongoose.Schema({
    Username:String,
    number:String,
    location:String,
    price:String,
})

//library details
const librarySchema = new mongoose.Schema({
    Username:String,
    number:String,
    location:String,
    price:String,
})



// Creating Model (Collection)

const User = mongoose.model("User",userSchema)

const Owner = mongoose.model("Owner",ownerSchema)

const Food = mongoose.model("Food",foodServicesSchema)

const Library = mongoose.model("Library",librarySchema)

/*const message = mongoose.model("Message",messageSchema)*/




const app = express()


// using middleware
app.use(express.static("./public"))
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.set("view engine","ejs")


// User defined Middleware

const isAuthenticated = async(req,res,next)=>{
    const token = req.cookies.token
    
    if(token){

        const decoded = jwt.verify(token,"Saurabh")
        req.user = await User.findById(decoded._id)
        next()
    }
    else{
        res.redirect("login")
    }

}


// Routes
//get routes

app.get("/homepage",(req,res)=>{
    res.sendFile(path.resolve("./public/Finalyearproject_homepage.html"))
})

app.get("/",isAuthenticated,(req,res,next)=>{
    res.render("logout",{name:req.user.name})
   
})

app.get("/login",(req,res)=>{
    res.render("login")
})


app.get("/register",(req,res)=>{
    res.render("register")
})

app.get("/owner",(req,res)=>{
    res.render("owner")
})

app.get("/food",(req,res)=>{
    res.render("food")
})

app.get("/library",(req,res)=>{
    res.render("library")
})


//post routes

app.post("/owner",async(req,res)=>{
    const {name,mobile,address,room,price} = req.body
    // console.log(req.body);
    let owner = await Owner.create({
        Username:name,
        number:mobile,
        address:address,
        room:room,
        price:price,
    })

    res.redirect('/homepage')
})


app.post("/food",async(req,res)=>{
    const {name,mobile,price,location} = req.body
    // console.log(req.body);
    let food = await Food.create({
        Username:name,
        number:mobile,
        price:price,
        location:location,
    })

    res.redirect('/homepage')
})

app.post("/library",async(req,res)=>{
    const {name,mobile,price,location} = req.body
    // console.log(req.body);
    let library = await Library.create({
        Username:name,
        number:mobile,
        price:price,
        location:location,
    })

    res.redirect('/homepage')
})



//login post route

app.post("/login",async(req,res)=>{
    const {email,password} = req.body;

    let user = await User.findOne({email})

    if(!user)  return res.redirect("/register")
    

    const isMatch = await bcrypt.compare(password,user.password)

    if(!isMatch) return res.render("login",{email,message:"Incorrect Password"})

    
    const token = jwt.sign({_id:user._id},"Saurabh")


    res.cookie("token",token,{
        httpOnly:true,
        // expires:new Date(Date.now()+60*1000)
    });
    res.redirect("/")

})



//register post route

app.post("/register",async(req,res)=>{

    const {name,email,password} = req.body

    console.log(req.body);

    let user = await User.findOne({email})
    if(user){
        return res.redirect("/login")
    }

    const hashedPassword = await bcrypt.hash(password,10)

    user = await User.create({
        name,
        email,
        password:hashedPassword,
    })

  
    res.redirect("/")
})






app.get("/logout",(req,res)=>{
    res.cookie("token",null,{
        httpOnly:true,
        expires:new Date(Date.now())
    });
    res.redirect("/")
})


app.listen(3000,()=>{
    console.log("Server is listening on port 3000");
})

