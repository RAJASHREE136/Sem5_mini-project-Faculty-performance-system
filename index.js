import express from "express";
import bodyParser from "body-parser";
import bcrypt from 'bcrypt';
import ejs from "ejs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import collection from "./mongodb.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");


app.get("/", (req, res) => {
   res.render("login.ejs");
});

app.get("/signup", (req, res)=>{
    res.render("signup.ejs");
});

app.post("/signup", async (req, res)=>{
        const data = {
            username: req.body.name,
            password: req.body.password,
            confirmPassword: req.body.confirmpassword
        }
        
        const existUser = await collection.findOne({username: data.username});
       if(existUser){
        res.send("User already exists");
       } else {
        if(req.body.password === req.body.confirmpassword){
            // const saltRounds = 10;
            // const hashedPassword = await bcrypt.hash(data.password, saltRounds);

            // data.password = hashedPassword;

            const userdata = await collection.insertMany(data);
            console.log(userdata);
           }
           res.render("login.ejs"); 
       }
});

app.post("/signin", async (req, res)=>{
    try{
        const check = await collection.findOne({username: req.body.username});
        if(!check){
            res.send("user name cannot found");
        }

        if(check.password === req.body.password){
            res.render("index.ejs");
        } else{
            res.send("Wrong Password");
        }
    } catch(error){
        res.send(error);
    }
});


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

