const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
require("./db/conn");
const Register = require("./models/registers");


const port = process.env.PORT || 3000;
const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partial_path = path.join(__dirname, "../templates/partials");


app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(static_path));
app.set("view engine","hbs");
app.set("views",template_path);
hbs.registerPartials(partial_path)

app.get("/", (req,res) => {
    res.render("index");
});
app.get("/index", (req,res) => {
    res.render("index");
});
app.post("/index", async (req,res) => {
    try {
        const psw = req.body.psw;
        const cpsw = req.body.cpsw;
        if(psw === cpsw)
        {
           const registerUser = new Register({
            uname:req.body.uname, 
            psw : req.body.psw,
             cpsw : req.body.cpsw
           })


          const registered =await registerUser.save();
          res.status(201).render("index");
        }
        else
        {
            res.send("password not same");
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

app.listen(port, ()=>
{
    console.log(`server is running at port no ${port}`);
})