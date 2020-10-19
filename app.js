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

// Register
app.use('/register', registerRouter)
app.use('/login', loginRouter)
app.use('/api', apiRouter)
app.use('/kids', childRouter)
app.use('/logout',logoutRouter )
app.use('/child', childLoginRouter)

//Check Auth
function checkAuth(req, res, next) {
  if (req.session.parent) {
    next();
  } else {
    console.log('nope')
    res.redirect('/login')
  }
}


//login
app.get('/chores', (req,res) => {
  res.render('child-dock', {
    locals: {
      error: null,
      child: req.session.child
    }
  })
})

// about us page
app.get('/about-us', (req,res) => {
  res.render('about-us', {
    locals: {
      error: null
    }
  })
})

//overview page
app.get('/overview', (req,res) => {
  res.render('overview', {
    locals: {
      error: null
    }
  })
})

//parent manage page
app.get('/manage',(req,res) => {
  res.render('parentDock', {
    locals: {
      error: null,
      kidId: req.query.kid
    }
  })
})

//post chores
app.post('/chores/:kid', (req,res) => {
  if (!req.body || !req.body.name) {
    res.render('child-dock', {
        locals: {
            error: 'Please complete all fields',
            kidId: req.query.kid
        }
    })
    console.log('Nope')
    return;
}
  const { name, complete, mon, tue, wed, thu, fri, sat, sun } = req.body
  console.log(req.body)
    db.Chore.create({
      name: req.body.name,
      complete: req.body.complete,
      mon: req.body.mon,
      tue: req.body.tue,
      wed: req.body.wed,
      thu: req.body.thu,
      fri: req.body.fri,
      sat: req.body.sat,
      sun: req.body.sun,
      ChildId: req.params.kid
    })
      .then((result) => {
        res.redirect(`/manage/?kid=${req.params.kid}`)
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: 'A Database Error has Occurred'})
      })
})





















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
