/* ---- Router ---- */
var yaml    = require('js-yaml');
var fs      = require('fs');
var log     = require('./log.js');

var CONTENTS_DIR    = 'contents';

function readYAML(yamlfile) {
  return yaml.safeLoad(fs.readFileSync(CONTENTS_DIR + '/' + yamlfile + '.yml', 'utf8'));
}

function sayOops(req, res, err) {
  res.status(500).render('err/500', {'params' : {
    'url' : req.originalUrl,
    'err' : err
  }});
}

exports.DoBoom = function(app) {
  // - / or /index
  app.get( /(^\/index$|^\/$)/ , function(req, res) {
    try{
      var dt = readYAML('distro');
      res.render('index', {'params' : {
        'distro' : dt
      }});
    }catch(err){sayOops(req, res, err);}
  });

  // !!! This route MUST be the LAST.
  app.get( '*' , function(req, res) {
    try{
      log.debug('router: Client requested a unreachable URI ' + req.originalUrl);
      res.status(404).render('err/404', {'params' : {
        'url' : req.path
      }});
    }catch(err){sayOops(req, res, err);}
  });
};
