const { Router } = require('express');
const router = new Router();
const _ = require('underscore');
const fileName = '../reservas.json';
const reservas = require(fileName);

router.get('/', (req, res) => {
    res.json(reservas);
});

router.post('/', (req, res) => {
    
    const { id_sesion, id_maquina} = req.body;
    var timestamp = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    const nuevaReserva = { ...req.body, timestamp};

    if (id_sesion && id_maquina) {
        reservas.push(nuevaReserva);
        res.json({res: 'ok'});

    } else {
        res.status(500).json({error: 'There was an error.'});
    }

    

});

router.delete('/:id_sesion', (req, res) => {
    const {id_sesion} = req.params;
    if (id_sesion) {
        _.each(reservas, (reserva, i) => {
            if (reserva.id_sesion == id_sesion) {
                reservas.splice(i, 1);
            }
        });
        res.json(reservas);
    }

});
module.exports = router;
