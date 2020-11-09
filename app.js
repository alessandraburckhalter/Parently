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
const loginRouter = require('./routes/login')
const apiRouter = require('./routes/api')
const childRouter = require('./routes/childsignup')
const childLoginRouter = require('./routes/childlogin')
const logoutRouter = require('./routes/logout')
const aboutRouter = require('./routes/aboutus')
const choreRouter = require('./routes/chores')
const overviewRouter = require('./routes/overview')
const manageRouter = require('./routes/manage')

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
//middleware to show logins
app.use((req, res, next) => {
  console.log('===== USER =====')
  console.log(req.session.user);
  console.log('========')
  next();
})
  
// view engine setup
app.use(express.static('./public'));
app.use('/uploads', express.static('uploads'));

app.engine('html', es6Renderer); // use es6renderer for html view templates
app.set('views', 'templates'); // look in the 'templates' folder for view templates
app.set('view engine', 'html'); // set the view engine to use the 'html' views


//Render home
app.get('/', (req,res) => {
  res.render('home', {
    locals: {
      error: null
    }
  })
})

//Check Auth
function checkAuth(req, res, next) {
  if (req.session.parent) {
    next();
  } else {
    console.log('nope')
    res.redirect('/login')
  }
}


// Render Routes
app.use('/register', registerRouter)
app.use('/login', loginRouter)
app.use('/api', apiRouter)
app.use('/kids', childRouter)
app.use('/logout',logoutRouter )
app.use('/child', childLoginRouter)
app.use('/about-us', aboutRouter)
app.use('/chores', choreRouter)
app.use('/overview', overviewRouter)
app.use('/manage', manageRouter)


// Runs Server
app.listen(process.env.PORT || 3000, function () {
  console.log(`App is running on port ${process.env.PORT || 3000}`);
});
module.exports = app;





















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






