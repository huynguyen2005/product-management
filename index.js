const express = require('express');

require('dotenv').config();

const routeClient = require('./routes/client/index.route');
const routeAdmin = require('./routes/admin/index.route');

const database = require('./config/database');
database.connectDatabase();

const app = express();
const port = process.env.PORT;

app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.static('public'));

routeClient(app);
routeAdmin(app);

app.listen(port, () => {
    console.log(port);
});