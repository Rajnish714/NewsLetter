//jshint esversion: 6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https=require("https")
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"))
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/",(req,res)=>{
  const fname=req.body.fname;
  const lname=req.body.lname;
  const email=req.body.email;
  const data={
    members:[
      {
        email_address:email,
        status:"subscribed",
        merge_fields:{
          FNAME:fname,
          LNAME:lname
        }
      }
    ]
  }

  const jsonData=JSON.stringify(data)
const url="https://us14.api.mailchimp.com/3.0/lists/5867fe2291";
const options={
  method:"POST",
  auth:"rajnish:9f0029a7b64a0566eb4aaaea30a5fb93-us14"
}
  const request =https.request(url,options,response=>{
    if(response.statusCode===200){
      res.sendFile(__dirname+ "/success.html")
    }
    else{
      res.sendFile(__dirname+ "/failure.html")
    }
response.on("data",data=>{
  JSON.parse(data);

  
  })
  })

  // request.write(jsonData);
   request.end();

  
})

app.post("/failure", (req,res)=>{
  res.redirect("/");
})

app.listen(process.env.PORT || 3000, () => {
  console.log("server has benn started on 3000 port!");
});
//api key
//9f0029a7b64a0566eb4aaaea30a5fb93-us14
//list id 5867fe2291