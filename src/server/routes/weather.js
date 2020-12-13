const express = require('express');
const clima = require('../services/weather.js');

router = express.Router();



router.get('/weather/:lat/:lon', function (req, res) {

    const lat = req.params.lat;
    const lng = req.params.lon;
  
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