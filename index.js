const jkr = require('./jkr');
const mongoose = require('mongoose');
const log = require('./log');

require('dotenv').config();

(async () => {
    mongoose.connect(process.env.JKR_TENDERDB, { useNewUrlParser: true, useUnifiedTopology: true });
    log.status('Database connected! 📡');
    log.line();
    await jkr.initialize();
    for (muka = 0; muka<=process.env.JKR_ALLPAGE; muka+=20){
    await jkr.scrapping(muka);
    }
    await jkr.end();
})();

