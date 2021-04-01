// Copyright 2017-2020 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only
const fs = require('fs');
const path = require('path');

const { app } = require('electron');

const { start } = require('./base_config');
const config = require('./config');
const arg = require('arg');

if (process.env.NODE_ENV === 'production') {
  process.argv.unshift('tempNameForJustParsing')
}

const args = arg({
  '--profile':    String,
}, {
  arg: process.argv,
});

console.log(process.argv)
console.log(args)

const dir = path.resolve('.');
const profilesPath = path.join(dir, 'profiles');

const profileName = args['--profile'] || 'default';

const profilePath = path.join(profilesPath, profileName);

if (!fs.existsSync(profilesPath)){
  fs.mkdirSync(profilesPath);
}

if (!fs.existsSync(profilePath)){
  fs.mkdirSync(profilePath);
}

app.setPath('userData', profilePath);

/*
// Use separate data directory for development
if (config.has('storageProfile')) {
  const userData = path.join(
    app.getPath('appData'),
    `Signal-${config.get('storageProfile')}`
  );

  app.setPath('userData', userData);
}
*/

console.log(`userData: ${app.getPath('userData')}`);

const userDataPath = app.getPath('userData');
const targetPath = path.join(userDataPath, 'config.json');

const userConfig = start('user', targetPath);

module.exports = userConfig;
