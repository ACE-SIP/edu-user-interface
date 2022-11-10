const requireLogin = require('../middleware/token');
const request = require("request");

/* GET pages. */
module.exports  = (app) => {
  // home page
  app.get('/', (req, res) => {
    res.render('index', {
      title: 'Home - Education Credential System',
      sub_title: "CVallet"
    });
  });

  app.get('/login', requireLogin, (req, res) => {
    res.render('login', {
      title: 'Login - Education Credential System',
      sub_title: "Login"
    });
  });

  app.get('/register', (req, res) => {
    res.render('register', {
      title: 'Register Page',
    });
  });

  app.get('/dashboard',requireLogin, (req, res) => {
    res.render('dashboard', {
      title: 'Dashboard - Education Credential System',
      sub_title: 'Dashboard',
      name: req.session.userName,
      role: req.session.userRole
    });
  });

  app.get('/cvallet', requireLogin, (req, res) => {
    const data_access_token = process.env['data_access_token']
    const uri = process.env['ENDPOINT']
    const options = {
      'method': 'GET',
      'url': uri + 'api/file/all?learner=' + req.session.userEmail,
      'headers': {
        'Authorization': 'Bearer ' + data_access_token
      }
    };
    request(options, function (error, response) {
      if (error){
        res.render('error', {
          title: 'Error',
          sub_title: 'Page',
          error: 'Page Not Found.',
        });
      }else{
        res.render('learner/cvallet', {
          title: 'CVallet - Education Credential System',
          sub_title: 'CVallet',
          name: req.session.userName,
          email: req.session.userEmail,
          role: req.session.userRole,
          files: JSON.parse(response.body)
        });
      }
    });

  });
  app.get('/createcv', requireLogin, (req, res) => {
    res.render('learner/createcv', {
      title: 'Create Presentable CV - Education Credential System',
      sub_title: 'Create Presentable CV',
      name: req.session.userName,
      role: req.session.userRole
    });
  });
  app.get('/upload',requireLogin, (req, res) => {
    const uri = process.env['ENDPOINT']
    const options = {
      'method': 'GET',
      'url': uri + 'api/issuer/all/',
      'headers': {
      }
    };
    request(options, function (error, response) {
      if (error) {
        res.render('error', {
          title: 'Error',
          sub_title: 'Page',
          error: 'Page Not Found.',
        });
      }
      res.render('learner/upload', {
        title: 'Upload - Education Credential System',
        sub_title: 'Upload Credentials',
        name: req.session.userName,
        email: req.session.userEmail,
        role: req.session.userRole,
        issuers: JSON.parse(response.body)
      });
    });

  });

  app.get('/cvalid', requireLogin, (req, res) => {
    const uri = process.env['ENDPOINT']
    const options = {
      'method': 'GET',
      'url': uri + 'api/issuer/all/',
      'headers': {
      }
    };
    request(options, function (error, response) {
      if (error) {
        res.render('error', {
          title: 'Error',
          sub_title: 'Page',
          error: 'Page Not Found.',
        });
      }
      res.render('verifier/verification', {
        title: 'Verification - Education Credential System',
        sub_title: 'Verification',
        name: req.session.userName,
        email: req.session.userEmail,
        role: req.session.userRole,
        issuers: JSON.parse(response.body)
      });
    });
  });


  app.get('/generator', requireLogin, (req, res) => {
    const request = require('request');
    const uri = process.env['ENDPOINT']
    const options = {
      'method': 'GET',
      'url': uri + 'api/learner/all/monash',
      'headers': {
      }
    };
    request(options, function (error, response) {
      if (error) {
        res.render('error', {
          title: 'Error',
          sub_title: 'Page',
          error: 'Page Not Found.',
        });
      }else {
        res.render('issuer/generator', {
          title: 'Generate Credential - Education Credential System',
          sub_title: 'Generate Credential',
          name: req.session.userName,
          email: req.session.userEmail,
          role: req.session.userRole,
          learners: JSON.parse(response.body),
          endpoint: uri
        });
      }
    });

  });

  app.get('/setting',requireLogin, (req, res) => {
    res.render('setting', {
      title: 'Setting - Education Credential System',
      sub_title: 'Setting',
      name: req.session.userName,
      role: req.session.userRole
    });
  });
}
