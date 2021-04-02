const arg = require('arg');
const fs = require('fs');
const path = require('path');

// Copy the array by using slice()
// https://stackoverflow.com/questions/7486085/copy-array-by-value
const args = parseArgv(process.argv.slice());
const profileName = args['--profile'] || 'default';
const dir = path.resolve('.');
const profilesPath = path.join(dir, 'profiles');
const profilePath = path.join(profilesPath, profileName);

let lockFileInterval;

if (! fs.existsSync(profilesPath)) {
    fs.mkdirSync(profilesPath);
}

if (! fs.existsSync(profilePath)) {
    fs.mkdirSync(profilePath);
}

function parseArgv(argv) {
    if (process.env.NODE_ENV === 'production') {
        argv.unshift('tempNameForJustParsing')
    }

    return arg({
        '--profile':    String,
    }, {
        arg: argv,
    });
}

const lockFile = path.join(profilePath, 'multiple_portable.lock');

function timestamp() {
    return Math.floor(Date.now() / 1000);
}

function createLockFile() {
    fs.writeFileSync(lockFile, timestamp());
}

function releaseLock() {
    clearInterval(lockFileInterval);

    if (fs.existsSync(lockFile))
        fs.unlinkSync(lockFile);
}

function requestLock(app) {

    if (fs.existsSync(lockFile)) {
        const lockTimestamp = parseInt(fs.readFileSync(lockFile, 'utf-8'), 10);

        if (timestamp() - lockTimestamp <= 21) {
            console.log('The profile is locking. Please try again later.');
            app.exit();
            return;
        }
    }

    // Start locking
    createLockFile();
    lockFileInterval = setInterval(() => {
        createLockFile();
    }, 20000);
}

module.exports = {
    args,
    profileName,
    profilePath,
    parseArgv,
    releaseLock,
    requestLock,
}
