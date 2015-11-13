import path from 'path';

let secret   = 'NgWlfDWCbX4mPuxau1FmG3TPLHm7iglEA3mp1f8nrlT7zKDn8ZZAwWQOqUArvQBFfMEbFSAMnUHzgQW1FkczTiZYjPZWqdseNtk2';
let env      = process.env.NODE_ENV || 'development';

let rightsManagement = {
    all     : ['admin'],
    seller  : {
        read : [
            '/articles',
            '/articles/search',
            '/promotions',
            '/promotions/search',
            '/sets',
            '/sets/search',
            '/meansofpayment',
            '/meansofpayment/search',
            '/devices',
            '/devices/search'
        ],
        write: [
            '/services/basket'
        ]
    },
    reloader: {
        read : [
            '/users',
            '/usersrights',
            '/usersgroups',
            '/devicespoints',
            '/devices',
            '/reloadtypes',
            '/meanofloginsusers'
        ],
        write: [
            '/services/reload'
        ]
    }
};

let pinLoggingAllowed = ['seller'];

let config = require(`./${env}.json`);

config.secret            = secret;
config.rightsManagement  = rightsManagement;
config.pinLoggingAllowed = pinLoggingAllowed;
config.root              = path.join(__dirname, '..');

export default config;
