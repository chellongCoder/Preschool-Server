var express = require('express');
var bodyParser = require('body-parser')

var app = express();

const RootRouter = require('./app/router/root_router');
const ApiRouter = require('./app/router/api_router');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/v1/swagger.json');

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('assets'));

// CORS support
app.all('*', function (req, res, next) {
    if (!req.get('Origin')) return next();
    // use "*" here to accept any origin
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    res.set('Access-Control-Allow-Credentials', 'true');
    res.set('Access-Control-Allow-Max-Age', 3600);
    if ('OPTIONS' == req.method) return res.send(200);
    next();
})
var options = {
    customCss: '.swagger-ui .topbar { display: none }'
};

app.use('/api', new ApiRouter().getRouter());
const useSchema = schema => (...args) => swaggerUi.setup(schema, options)(...args);
app.use('/docs', swaggerUi.serve, useSchema(swaggerDocument));
app.use('/', new RootRouter().getRouter());

var server = app.listen(8080, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})