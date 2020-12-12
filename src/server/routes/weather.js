const express = require('express');
const clima = require('../services/weather.js');

router = express.Router();



router.get('/weather', function (req, res) {
    const lat = '3.43722';
    const lng = '-76.5225';
  
    let getInfo = async() => {
        try {
            let temp = await clima.getClima(lat, lng);
            return temp;
        }
        catch(err){
            return `No se pudo obtener la temperatura en ${ lng }`;
        }
    }

    getInfo()
    .then( (mensaje) => 
    {
        res.json({
        ok: true,
        data: mensaje
         });
    }) 
    .catch(err => 
    {
        res.status(400).json({
            ok: false,
            err: err
        });
    });
    
});

module.exports = router;