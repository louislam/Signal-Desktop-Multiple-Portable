// Copyright 2017-2020 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only
const fs = require('fs');
const path = require('path');

const { app } = require('electron');

const { start } = require('./base_config');
const config = require('./config');

const dir = path.resolve('.');
console.log(`original appData: ${app.getPath('appData')}`);
console.log(`original userData: ${app.getPath('userData')}`);

const profilesPath = path.join(dir, 'profiles');
const profilePath = path.join(profilesPath, 'profile');
console.log(`New Path: ${profilePath}`);

if (!fs.existsSync(profilesPath)){
  fs.mkdirSync(profilesPath);
}

if (!fs.existsSync(profilePath)){
  fs.mkdirSync(profilePath);
}

app.setPath('userData', profilePath);
console.log(`updated userData: ${app.getPath('userData')}`);

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
