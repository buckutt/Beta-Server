import path from 'path';

let secret   = 'NgWlfDWCbX4mPuxau1FmG3TPLHm7iglEA3mp1f8nrlT7zKDn8ZZAwWQOqUArvQBFfMEbFSAMnUHzgQW1FkczTiZYjPZWqdseNtk2';
let env      = process.env.NODE_ENV || 'development';

let rightsManagement = {
    all     : ['admin'],
    seller  : {
        read : [
            '/api/articles',
            '/api/articleslinks',
            '/api/users',
            '/api/usersrights',
            '/api/usersgroups',
            '/api/devicespoints',
            '/api/devices',
            '/api/meanofloginsusers',
            '/api/services/availableArticles'
        ],
        write: [
            '/api/services/purchase'
        ]
    },
    reloader: {
        read : [
            '/api/users',
            '/api/usersrights',
            '/api/usersgroups',
            '/api/devicespoints',
            '/api/devices',
            '/api/reloadtypes',
            '/api/meanofloginsusers'
        ],
        write: [
            '/api/services/reload'
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
