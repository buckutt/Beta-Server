import fs           from 'fs';
import config       from '../config';
import thinky       from '../thinky';
import logger       from '../log';
import consoleTitle from 'console-title';

let log = logger(module);

let models = {
    r: thinky.r
};

//let allowed = ['fundation.js', 'purchase.js', 'point.js', 'device.js', 'period.js', 'group.js', 'price.js'];

fs
    .readdirSync(config.root + '/models/')
    .filter(file => file.slice(-3) === '.js')
    .filter(file => file !== 'index.js')
    //.filter(file => allowed.indexOf(file) > -1)
    .forEach(file => {
        let model = require(config.root + '/models/' + file);
        models[model.getTableName()] = model;
    });

let modelsLoaded = 0;

Object.keys(models).forEach((modelName, i, arr) => {
    if (modelName === 'r') {
        return;
    }

    models[modelName].associate(models);

    models[modelName].on('ready', () => {
        ++modelsLoaded;
        log.info('Model ' + modelName + ' ready');
        if (modelsLoaded === arr.length - 1) {
            log.info('Models ready');
            consoleTitle('Buckutt Server - Ready !');
            setTimeout(() => {
                consoleTitle('Buckutt Server');
            }, 1000);
            if (models.onReady) {
                models.onReady();
            }
        }
    });
});

export default models;
