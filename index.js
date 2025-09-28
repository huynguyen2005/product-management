const express = require('express');
const methodOverride = require('method-override');
const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const multer  = require('multer');
require('dotenv').config();

const routeClient = require('./routes/client/index.route');
const routeAdmin = require('./routes/admin/index.route');
const systemConfig = require('./config/system');

const database = require('./config/database');
database.connectDatabase();

const app = express();
const port = process.env.PORT;

app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.static('public'));
app.use(methodOverride('_method'));

//định nghĩa flash
app.use(cookieParser('HUYDZ'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

app.use(express.urlencoded({ extended: true })); // cho form, extended: true - dùng để hỗ trợ dữ liệu phức tạp
// app.use(express.json()); // cho JSON
//giúp express hiểu và parse dữ liệu từ form sang objectJS trong res.body



app.locals.preFixAdmin = systemConfig.preFixAdmin;



routeClient(app);
routeAdmin(app);

app.listen(port, () => {
    console.log(port);
});