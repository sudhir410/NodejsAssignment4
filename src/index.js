const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const { application } = require('express');
const port = 3000
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.set('views','./views');
app.set('view engine','ejs')

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
// your code goes here
app.get('/',(req,res)=>{
    res.send(`<h1>Hello World</h1> </br>
               <a href="/form">Form Page</a>  `)
})

app.get('/form',(req,res)=>{
    res.render('./form.ejs')
})

app.post('/add',(req,res)=>{
    
    // console.log(req.body)
    if(!isNaN(req.body.num1) && !isNaN(req.body.num2)){
        if((Number(req.body.num1)+Number(req.body.num2))<1000001 && (Number(req.body.num1)+Number(req.body.num2))>-1000001 ){
            res.status(200).send({
                status:"success",
                message: "the sum of given two numbers", 
                sum: Number(req.body.num1)+Number(req.body.num2)
            })

        }else if((Number(req.body.num1)+Number(req.body.num2))>-1000001){
            res.send({
                status:"error",
                message:"underflow"
            })
        }
        else{
            res.send({
                status:"error",
                message:"Overflow"
            })
        }
    }else{
        res.send({
            status:"error",
            message:"Invalid data types"
        })
    }
    
    
})

app.post("/sub",(req,res)=>{
    if(!isNaN(req.body.num1) && !isNaN(req.body.num2)){
        if((Number(req.body.num1)-Number(req.body.num2))>-1000001){
            res.status(200).send({
                status:"success",
                message: "the difference of given two numbers", 
                difference: Number(req.body.num1)-Number(req.body.num2)

            })

        }else if((Number(req.body.num1)-Number(req.body.num2))<1000001){
            res.send({
                status:"error",
                message:"overflow"
            })
        }
        else{
            res.send({
                status:"error",
                message:"underflow"
            })
        }
    }else{
        res.send({
            status:"error",
            message:"Invalid data types"
        })
    }
})

app.post("/multiply",(req,res)=>{
    if(!isNaN(req.body.num1) && !isNaN(req.body.num2)){
       
            res.status(200).send({
                status:"success",
                message: "The product of given numbers", 
                result: Number(req.body.num1)*Number(req.body.num2)
             })
    }else{
        res.send({
            status:"error",
            message:"Invalid data types"
        })
    }
})

app.post("/divide",(req,res)=>{
    if(!isNaN(req.body.num1) && !isNaN(req.body.num2)){
       if(req.body.num2!=0){
            res.status(200).send({
                status:"success",
                message: "The product of given numbers", 
                result: Number(req.body.num1)*Number(req.body.num2)
             })
       }else{
        res.send({
            status:"error",
            message:"Cannot divide by zero"
        })
       }
    }else{
        res.send({
            status:"error",
            message:"Invalid data types"
        })
    }
})



app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;