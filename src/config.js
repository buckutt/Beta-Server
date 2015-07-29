import path from 'path';

let secret   = 'NgWlfDWCbX4mPuxau1FmG3TPLHm7iglEA3mp1f8nrlT7zKDn8ZZAwWQOqUArvQBFfMEbFSAMnUHzgQW1FkczTiZYjPZWqdseNtk2';
let rootPath = path.normalize(__dirname);
let env      = process.env.NODE_ENV || 'development';

let config = {
    development: {
        root: rootPath,
        secret: secret,
        app: {
            name: 'buckuttServer'
        },
        port: 3000,
        db: {
            db: 'buckuttServer_development'
        },
        level: 'debug'
    },

    test: {
        root: rootPath,
        secret: secret,
        app: {
            name: 'buckuttServer'
        },
        port: 3006,
        db: {
            db: 'buckuttServer_test'
        },
        level: 'debug'
    },

    production: {
        root: rootPath,
        secret: secret,
        app: {
            name: 'buckuttServer'
        },
        port: 3000,
        db: {
            db: 'buckuttServer_production'
        },
        level: 'info'
    }
};

export default config[env];
