require('babel-register')({
    'presets':['env'],
    'plugins':['transform-runtime']
});

require('./app');