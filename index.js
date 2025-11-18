const express = require('express');
const methodOverride = require('method-override');
const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
const moment = require('moment');

const http = require('http');
const { Server } = require('socket.io');

require('dotenv').config();

const routeClient = require('./routes/client/index.route');
const routeAdmin = require('./routes/admin/index.route');
const systemConfig = require('./config/system');


//Kết nối với database
const database = require('./config/database');
database.connectDatabase();

const app = express();
const port = process.env.PORT;

//Socket IO
const server = http.createServer(app);
const io = new Server(server);
global._io = io;
//End Socket IO

//__dirname để lấy ra đường dẫn của project
app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');

app.use(express.static(`${__dirname}/public`));
app.use(methodOverride('_method'));

//định nghĩa flash
app.use(cookieParser('HUYDZ'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

app.use(express.urlencoded({ extended: true })); // cho form, extended: true - dùng để hỗ trợ dữ liệu phức tạp
// app.use(express.json()); // cho JSON
//giúp express hiểu và parse dữ liệu từ form sang objectJS trong res.body


//app local variables
app.locals.preFixAdmin = systemConfig.preFixAdmin;
app.locals.moment = moment;

//TinyMCE
app.use('/tinymce', 
    express.static(path.join(__dirname, 'node_modules', 'tinymce'))
);

routeClient(app);
routeAdmin(app);

server.listen(port, () => {
    console.log(port);
});