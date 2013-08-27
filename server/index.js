var fs = require('fs');
var union = require('union');
var director = require('director');
var ecstatic = require('ecstatic');
var router = new director.http.Router();
var production = process.env.NODE_ENV === 'production';
var sass = production ? false : require('node-sass');

exports.router = router;

exports.start = function(options) {
  options = options || {};
  var root = process.cwd();
  var basePath = options.basePath ? root + options.basePath : root;
  var port = options.port || 3000;
  var name = options.name || 'serf';
  var asset_path = options.asset_path || '/assets';
  var public_path = options.public_path || '/public';

  var sass_options = options.sass_options || {
    src: basePath + asset_path,
    dest: basePath + public_path,
    debug: false
  };

  var ecstatic_options = options.ecstatic_options || {
    root       : basePath + public_path,
    baseDir    : '/',
    cache      : 3600,
    showDir    : false,
    autoIndex  : true,
    defaultExt : 'html',
    gzip       : false
  };

  var before = [
    ecstatic(ecstatic_options),
    function (req, res) {
      var found = router.dispatch(req, res);
      if (!found) {
        res.emit('next');
      }
    }
  ];

  if (!production) {
    before.unshift(sass.middleware(sass_options));
  }

  var server = union.createServer({ before: before });

  server.listen(port);

  console.log(name + ' listening on ' + port);
};
