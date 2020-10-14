const express = require('express');
const session = require('express-session')
const db = require('./models')
const SequelizeStore =
  require('connect-session-sequelize')(session.Store);
const store = new SequelizeStore({ db: db.sequelize })

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const es6Renderer = require('express-es6-template-engine')
const bcrypt = require('bcrypt')
const registerRouter = require('./routes/register')
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: 'pancakes', // used to sign the cookie
    resave: false, // update session even w/ no changes
    saveUninitialized: false, // always create a session
    store: store,
  }))
  
  store.sync();
  
// view engine setup
app.use(express.static('./public'));

app.engine('html', es6Renderer); // use es6renderer for html view templates
app.set('views', 'templates'); // look in the 'templates' folder for view templates
app.set('view engine', 'html'); // set the view engine to use the 'html' views

//Practice Home Route
app.get('/',(req,res) => {
  res.render('index',{
    locals: {
      error: null,
    }
  })
})
// Practice Register
app.use('/register', registerRouter)
















// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
// //   res.status(err.status || 500);
//   res.render('index');
// });


app.listen(3000, function () {
  console.log('Todo List API is now listening on port 3000 ...');
});
module.exports = app;
