// Endpoints for external data
const { Router } = require('express');
const router = new Router();

const fetch = require('node-fetch');

router.get('/', async (req, res) => {
    const response = await fetch('https://c840cfx2we.execute-api.us-east-1.amazonaws.com/dev/isw/printer-report');
    var data = await response.json();
    var i = 0;
    while(i < data.Items.length){
        delete data.Items[i].status;
        delete data.Items[i].printer_vid;
        delete data.Items[i].printer_type;
        delete data.Items[i].material_cost;
        delete data.Items[i].last_print_date_time;
        delete data.Items[i].account;
        //delete data.Items[i].online_offline;
        delete data.Items[i].print_errors;
        delete data.Items[i].real_print_time_h;
        delete data.Items[i].prints;
        delete data.Items[i].material_used_kg;
        delete data.Items[i].material_cost;
        delete data.Items[i].client_version;
        i=i+1;
    }

    
    res.json(data.Items);
});

module.exports = router;