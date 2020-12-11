const express = require('express');

router = express.Router();

router.get('/invoice', function (req, res) {
   
    console.log('hice un get: ');
   
   /* MarcaModels.find({

    }).exec((err, respDB) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            marcas: respDB
        });
    });*/
});

router.post('/invoice', function (req, res) {
    let body = req.body;

    console.log('datos: ', body);
    res.json({
        ok: true,
        algo: body
    });
   /* let marca = new MarcaModels({
        ...body
    });
    marca.save((err, respDB) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            marca: respDB
        });
    });*/
});

module.exports = router;