// import json from './package.json'

Package.describe({
    summary: 'Underscore2: Underscore-like library that provide a set of useful functions for Meteor.',
    "version": "0.5.41",
    git: 'https://github.com/i4han/underscore2.git',
    documentation: 'README.md'
});

Package.on_use( function (api) {
    api.use('ecmascript@0.6.1')
    api.add_files('__.js', ['client', 'server'])
    api.export('__',       ['client', 'server'])
});
