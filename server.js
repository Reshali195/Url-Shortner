require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dns = require("dns");
const urlparser = require("url");
const app = express();
const mongoose = require("mongoose");
const { Schema } = mongoose;

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Your first API endpoint
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const urlSchema = new Schema({
  original: { type: String, required: true },
  short: Number,
});
let bodyParser = require("body-parser");

let Url = mongoose.model("Url", urlSchema);
app.use(cors());

let resObj = {};
let shorturl = 0;
app.post(
  "/api/shorturl",
  bodyParser.urlencoded({ extended: false }),
  (request, response) => {
    let inputUrl = request.body.url;

    const something = dns.lookup(
      urlparser.parse(inputUrl).hostname,
      (err, address) => {
        if (!address) {
          response.json({ error: "Invalid Url" });
        } else {
          Url.findOne({ original: inputUrl }, (err, data) => {
            if (err) {
              console.log(err);
            } else {
              if (data == null) {
                shorturl=shorturl+1;
                Url.findOneAndRemove({short:shorturl},(err,data)=>{
                  if(err){
                    console.log(err);
                  }
                   const url = new Url({ original: inputUrl ,short:shorturl});
                url.save((err, data) => {
                  resObj["original_url"] = data.original;
                  resObj["short_url"] = data.short;

                  response.json(resObj);
                });
                  
                }) 
               
              }else{
                response.json({original_url:data.original,short_url:data.short});
              }
              
            }
          });
        }
      }
    );
  }
);
app.get("/api/shorturl/:input", (req, res) => {
  let input = req.params.input;
  console.log(input);
  Url.findOne({short:input}, (err, data) => {
    if (data==null) {
      res.json({ error: "Invalid URL" });
    } else {
      res.redirect(data.original);
    }
  });
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
//  Url.findOneAndUpdate({original:inputUrl},{original:inputUrl,short:shorturl},{new:true},(err,data)=>{
//         if(!err){
//             resObj['original_url']=data.original;
//         resObj['short_url']=shorturl;

//       response.json(resObj);
//         }
//       })
