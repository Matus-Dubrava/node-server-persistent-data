const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;
const user = {
  username: ''
};

// using user object to store data across requests
app.locals.user = user;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/login', (req, res) => {
  res.render('login', {
    error: undefined
  });
});

app.get('/logout', (req, res) => {
  // update user data - remove username
  user.username = '';
  res.redirect('/');
});

app.post('/login', (req, res) => {
  console.log(req.body.username);
  console.log(req.body.password);
  if (!req.body.username || !req.body.password) {
    res.render('login', {
      error: 'missing username or password'
    });
  } else if (req.body.username !== 'admin' || req.body.password !== 'admin') {
    res.render('login', {
      error: 'invalid username or password'
    });
  } else {
    // update user data if authentication was successful
    user.username = req.body.username;
    res.redirect('/');
  };
});

app.listen(port, () => {
  console.log(`application is running on port:${port}`);
});
