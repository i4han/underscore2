// import json from './package.json'

Package.describe({
    summary: 'Underscore2: Underscore-like library that provide a set of useful functions for Meteor.',
    "version": "0.5.108",
    git: 'https://github.com/i4han/underscore2.git',
    documentation: 'README.md'
});

Package.on_use( function (api) {
    api.use('ecmascript@0.6.1')
    api.add_files('src/__.js',     ['client', 'server'])
    api.add_files('src/extra.js',  ['client', 'server'])
    api.add_files('src/es6.js',    ['client'])
    api.add_files('src/client.js', ['client'])
    api.export('__',               ['client', 'server'])
});
