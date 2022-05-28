//imports
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const request = require('request');
const xml2js = require('xml2js');
const convert = require('xml-js');
const { response } = require('express');
var unirest = require('unirest');

const app = express();
app.use(bodyParser.json());
app.use(cors());

//Config .env
require('dotenv').config();


var rest = {};
const PORT = process.env.PORT || 3000
app.listen(PORT, function() {
  console.log(`App listening on port ${PORT}`);
});

app.get('/',(req,res)=>{
  res.send("API IS UP AND RUNNING !!");
});

var postBody = '<?xml version="1.0" encoding="UTF-8"?><ns0:ZFM_GETEMPDETAIL xmlns:ns0="urn:sap-com:document:sap:rfc:functions"><ID>900628</ID><PASSWORD>1001</PASSWORD><ZLOGGEDINTABLE><item><ID/><PASSWORD/><NAME/><AGE/></item></ZLOGGEDINTABLE></ns0:ZFM_GETEMPDETAIL>'

app.get('/employee',(req,res)=>{
  
  var req = unirest('POST','http://dxktpipo.kaarcloud.com:50000/RESTAdapter/getEmplDetail')
  .headers({
    'Authorization' : 'Basic UE9VU0VSQDE6VGVjaEAyMDIy',
    'Content-Type' : 'text/xml'
  })
  .send(postBody)
  .end(function(result){
    if(result.error){
      console.log('Unable to fetch data');
    }else{
      this.res = result.body;
      rest = result.body;
      console.log(rest);
    }
    res.status(200).json(result.body)
  })

});

//IF NOT FOUND
app.use((req, res, next) => {
  res.status(404).json({
      success: false,
      message: "Page not found"
  })
});
