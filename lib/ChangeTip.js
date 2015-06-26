var rest = require('restler');
var moment = require('moment');

var ChangeTip = function(token) {
  this.token = token;
  this.base = 'https://api.changetip.com/v2/';
};

ChangeTip.prototype.get = function(url, params, cb) {
  var self = this;

  if (typeof params === 'function') {
    cb = params;
    params = {};
  }

  var qs = Object.keys( params ).map(function(k) {
    return k + '=' + params[k];
  });

  rest.get( self.base + url + '?' + qs.join('&') , {
    headers: {
      'Authorization': 'Bearer ' + self.token
    }
  }).on('complete', function(data) {
    cb( null , data );
  });
};

ChangeTip.prototype.post = function(url, params, cb) {
  var self = this;

  if (typeof params === 'function') {
    cb = params;
    params = {};
  }

  console.log('posting...');

  rest.post( self.base + url , {
    headers: {
      'Authorization': 'Bearer ' + self.token
    },
    data: params
  }).on('complete', function(data) {
    cb( null , data );
  }).on('error', cb );
};

module.exports = ChangeTip;