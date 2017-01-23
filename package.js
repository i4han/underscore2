// import json from './package.json'

Package.describe({
    summary: 'Underscore2: Underscore-like library that provide a set of useful functions for Meteor.',
    version: '0.4.102',
    git: 'https://github.com/i4han/underscore2.git',
    documentation: 'README.md'
});

Package.on_use( function (api) {
    //api.use('coffeescript@1.0.6')
    api.use('ecmascript@0.1.6')
    api.add_files('__2.js', ['client', 'server'])
    api.export('__',       ['client', 'server'])
});
