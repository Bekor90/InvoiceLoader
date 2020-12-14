const express = require('express');
const winston = require('winston');
const moment = require('moment');
const fs = require('../services/utilsFile.js');

router = express.Router();

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console()
    ]
});

//get data by filters
router.post('/invoice/filters', function (req, res) {

   let body = req.body;
   let selectDateIni;
   let selectDateFin;
   let selectInvoiceNumber;
   let banderaDate= false;
   let banderaInvoice=false;
   let arrayResult= [];

   let arrayData =[];
   let invoice={};
    arrayData = fs.readDataFile();
    arrayData.pop();

    console.log(body);

 //validate if filters arrive
  if(body != 'undefined' && body != null && Object.keys(body).length > 0){
      //format filters date
      if( (body.dateIni.length === 10) && (body.dateFin.length === 10)){
        selectDateIni = new Date(body.dateIni);
        selectDateFin = new Date(body.dateFin);
        banderaDate = true;
        }
      if(body.invoiceNumber != 'undefined' && body.invoiceNumber.length > 0){
        selectInvoiceNumber = body.invoiceNumber;
        banderaInvoice = true;
      } 

   //read data file
    if(arrayData.length > 0){
        arrayData.map((data) => {

            let lineData = data.split("|"); //get fields of line
            let DateInvoice = new Date(lineData[1]);
            
            if(banderaInvoice === true && banderaDate === true){ //validate date and invoiceNumber
              //filter data by date and InvoiceNumber
                if((moment(selectDateIni).add(1, 'days').isSameOrBefore(DateInvoice, 'day') &&
                moment(selectDateIni).add(1, 'days').isSameOrBefore(DateInvoice, 'months') && 
                moment(selectDateIni).add(1, 'days').isSameOrBefore(DateInvoice, 'year') ) && 
               (moment(DateInvoice).add(1, 'days').isSameOrAfter(selectDateFin, 'day') &&
                moment(DateInvoice).add(1, 'days').isSameOrAfter(selectDateFin, 'months') && 
                moment(DateInvoice).add(1, 'days').isSameOrAfter(selectDateFin, 'year') ) && 
                lineData[2].trim().indexOf(selectInvoiceNumber) != -1) {
                    invoice ={
                        id: lineData[0],
                        date: lineData[1],
                        InvoiceNumber: lineData[2],
                        Net: lineData[3],
                        Tax: lineData[4],
                        Total: lineData[5]
                    }
                    arrayResult.push(invoice);
                }
            //filter data by date
            }else if(banderaDate === true && banderaInvoice ===false){  //validate date
                if((moment(selectDateIni).add(1, 'days').isSameOrAfter(DateInvoice, 'day') &&
                    moment(selectDateIni).add(1, 'days').isSameOrAfter(DateInvoice, 'months') && 
                    moment(selectDateIni).add(1, 'days').isSameOrAfter(DateInvoice, 'year')) &&
                    (moment(selectDateFin).add(1, 'days').isSameOrBefore(DateInvoice, 'day') &&
                    moment(selectDateFin).add(1, 'days').isSameOrBefore(DateInvoice, 'months') && 
                    moment(selectDateFin).add(1, 'days').isSameOrBefore(DateInvoice, 'year') ) ){
                      console.log('entre date fin: ', selectDateIni);
                      console.log('entre date fin: ', selectDateFin);
                      console.log('entre date fin: ', DateInvoice);
                    invoice ={
                        id: lineData[0],
                        date: lineData[1],
                        InvoiceNumber: lineData[2],
                        Net: lineData[3],
                        Tax: lineData[4],
                        Total: lineData[5]
                    }
                    arrayResult.push(invoice);
                }
            //filter data by InvoiceNumber
            } else if(banderaInvoice === true && banderaDate ===false){  //validate date
              if(lineData[2].trim().indexOf(selectInvoiceNumber) != -1){
                  invoice ={
                      id: lineData[0],
                      date: lineData[1],
                      InvoiceNumber: lineData[2],
                      Net: lineData[3],
                      Tax: lineData[4],
                      Total: lineData[5]
                  }
                  arrayResult.push(invoice);
              }
          }
        });
        res.json({
            ok: true,
            data: arrayResult
        });
    }else{
      res.json({
        ok: true,
        data: arrayResult
      });
    }
  }else{
    arrayData.map((data) => {
      let lineData = data.split("|"); //get fields of line
      invoice ={
        id: lineData[0],
        date: lineData[1],
        InvoiceNumber: lineData[2],
        Net: lineData[3],
        Tax: lineData[4],
        Total: lineData[5]
      }
      arrayResult.push(invoice);
    });

    res.json({
      ok: true,
      data: arrayResult
    });
  }
});

//save data
router.post('/invoice', function (req, res) {
    let body = req.body;
    let strData ='';
    if(body.data.length > 0){

        let arrayData =[];
        arrayData = fs.readDataFile();
        let secuence = arrayData.length; //get secuence of file

        body.data.map((data) => {
            try{
              let dateFormat = moment(new Date()).format("YYYY-MM-DD");
                strData +=  `${secuence} | ${dateFormat}| ${data.invoiceNumber} | ${data.net} | ${data.tax} | ${data.total},`;
                secuence += 1;
            }catch (error) {
                logger.info('error process data request /invoice');
                console.log('error process data');
                console.log(err);
            }
        });

        if(strData.length > 0){
            fs.saveDataFile(strData);
            res.json({
                ok: true,
                algo: body
            });
        }else{
            res.status(400).json({
                ok: false,
                err: 'bad request'
            });
        }
       
    }else{  //not data
        res.status(200).json({
            ok: true,
            err: 'not data'
        });
    }
});

//delete all data
router.delete('/invoice', function (req, res){

    fs.overwriteDataFile(''); //clean file data
    res.json({
      ok: true,
      data: 'Data delete'
    });
});

//delete by id
router.delete('/invoiceBy/:id', function (req, res){
        
  let idInvoice = req.params.id;
  let arrayData =[];
  let result =[];
  let exist =false;
  arrayData = fs.readDataFile();

  if(arrayData.length > 0){

    arrayData.pop();          //remove last position from array
    fs.overwriteDataFile(''); //clean file data

    arrayData.map((data) => {

    let lineData = data.split("|"); //get fields of line

      if(idInvoice != lineData[0].trim()){
        fs.saveDataFile(`${data},`);        //save new data file
        result.push(data);
      }else if(idInvoice === lineData[0].trim()){
        exist = true;
      }
    });

    if(!exist){
      res.json({
        ok: true,
        data: result
      });
    }else{
      res.json({
        ok: false,
        data: 'not data'
      });
    }
  }
});

module.exports = router;