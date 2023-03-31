/**
 * Required External Modules
 */
const express = require("express");
const session = require('express-session');
const flash = require('connect-flash');
const path = require("path");
const cors = require('cors');
const moment = require('moment');
const fs = require('fs');
const https = require('https');
const http = require('http');








/**
 * Required internal Modules
 */
var models = require("./models");





/**
 * App Variables
 */
const app = express();




/**
 *  App Configuration
 */
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(session({secret: 'asdf4321',saveUninitialized: true,resave: true}));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());
app.use(flash());
app.set('port', process.env.PORT || 8081);




/**
 * Routes Definitions
 */
var gyws = require('./routes/gyws');
app.use('/', gyws);

var admin = require('./routes/admin');
app.use('/admin', admin);






/**
 * The following 4 lines of code is required for HTTPS settings
 */                               
//var privateKey  = fs.readFileSync('/etc/letsencrypt/live/gyws.org/privkey.pem', 'utf8');
//var certificate = fs.readFileSync('/etc/letsencrypt/live/gyws.org/fullchain.pem', 'utf8'); //cert.pem
/* var ca = fs.readFileSync('/etc/letsencrypt/live/gexpr.com/cert.pem', 'utf8'); //cert.pem
var chain = fs.readFileSync('/etc/letsencrypt/live/gexpr.com/chain.pem', 'utf8'); //cert.pem */

//var credentials = {key: privateKey,cert:certificate};
//var httpsServer = https.createServer(credentials, app);


var server = app.listen(app.get('port'), function() {
    models.sequelize.sync().then(() => {
        console.log("\n----------------------------------------------------------------------------");
        console.log('IPRAYAS is ready to launch. URL - http://iprayas:' + app.get('port'));
        console.log("----------------------------------------------------------------------------");
    }).catch(function (e) {
          throw new Error(e);
      });
    console.log('Express server listening on port ' + app.get('port'));
  });


  /* var server = app.listen(app.get('port'), function() {
    models.sequelize.sync().then(() => {
        console.log("\n----------------------------------------------------------------------------");
        console.log('GYWS is ready to launch. URL - http://172.105.49.237:' + app.get('port'));
        console.log("----------------------------------------------------------------------------");
    }).catch(function (e) {
          throw new Error(e);
      });
    console.log('Express server listening on port ' + app.get('port'));
  }); */


  /* http.createServer(function (request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('Hello World! Node.js is working correctly.\n');
 }).listen(8080); */





/**
 * Server Activation
 */
/* var server = app.listen(port, () => {
	models.sequelize.sync({logging: console.log}).then(() => {
        console.log("\n----------------------------------------------------------------------------");
        console.log('GYWS is ready to launch. URL - http://172.105.49.237:' + port);
        console.log("----------------------------------------------------------------------------");
    }).catch(function (e) {
        throw new Error(e);
    });
}); */


/* app.locals.baseurl='https://gyws.org:'+app.get('port') +'/';
app.locals.adminbaseurl = 'https://gyws.org:' + app.get('port') + '/admin/'; */

app.locals.baseurl='http://iprayas.com:8081/';
app.locals.adminbaseurl = 'http://iprayas.com:8081/admin/';


// app.locals.baseurl='http://iprayas.com:'+server.address().port+'/';
var shortDateFormat = "DD-MM-YYYY"; // this is just an example of storing a date format once so you can change it in one place and have it propagate
app.locals.moment = moment; // this makes moment available as a variable in every EJS page
app.locals.shortDateFormat = shortDateFormat;
var dateFormatWithTime = "DD-MM-YYYY h:m:s";
app.locals.dateFormatWithTime = dateFormatWithTime;


/**
 * Get the media links and accessible on the whole website
 */
models.MediaLink.findOne({
    where:{media_link_id:1}
}).then(function(media_links_details) {
    app.locals.facebook = media_links_details.facebook;
    app.locals.youtube = media_links_details.youtube;
    app.locals.linkedin = media_links_details.linkedin;
});




module.exports = app;
