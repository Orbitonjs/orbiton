'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/orbiton.production');
} else {
  module.exports = require('./cjs/orbiton.development');
}
