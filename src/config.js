import path from 'path';

let secret   = 'NgWlfDWCbX4mPuxau1FmG3TPLHm7iglEA3mp1f8nrlT7zKDn8ZZAwWQOqUArvQBFfMEbFSAMnUHzgQW1FkczTiZYjPZWqdseNtk2';
let rootPath = path.normalize(__dirname);
let env      = process.env.NODE_ENV || 'development';

let rightsManagement = {
    all     : ['admin', 'seller'],
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

let config = {
    development: {
        root            : rootPath,
        secret          : secret,
        rightsManagement: rightsManagement,
        pinManagement   : pinLoggingAllowed,
        port            : 3000,
        level           : 'debug',
        app             : {
            name: 'buckuttServer'
        },
        db              : {
            db: 'buckuttServer_development'
        }
    },

    test       : {
        root             : rootPath,
        secret           : secret,
        rightsManagement : rightsManagement,
        pinLoggingAllowed: pinLoggingAllowed,
        level            : 'debug',
        port             : 3006,
        app              : {
            name: 'buckuttServer'
        },
        db               : {
            db: 'buckuttServer_test'
        }
    },

    production : {
        root             : rootPath,
        secret           : secret,
        rightsManagement : rightsManagement,
        pinLoggingAllowed: pinLoggingAllowed,
        port             : 3000,
        level            : 'info',
        app              : {
            name: 'buckuttServer'
        },
        db               : {
            db: 'buckuttServer_production'
        }
    }
};

export default config[env];
