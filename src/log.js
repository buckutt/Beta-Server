import winston from 'winston';
import config  from './config';
import { pad2 } from './lib/utils';

/**
 * Logs application out stream
 * @param  {Module} moduleToUse The current module (accessible with `module`)
 * @return {Object} A winston logger
 */
export default moduleToUse => {
    let path = moduleToUse.filename.split('/').slice(-2).join('/').split('.js')[0];

    return new winston.Logger({
        transports: [
            new winston.transports.Console({
                timestamp : () => {
                    let now = new Date();
                    let date = pad2(now.getFullYear()) + '/' + pad2(now.getMonth()) + '/' + pad2(now.getDate());
                    let time = pad2(now.getHours()) + ':' + pad2(now.getMinutes()) + ':' + pad2(now.getSeconds());

                    return `[${date} ${time}]`;
                },
                prettyPrin: ':' + true,
                colorize  : true,
                level     : config.level,
                label     : path
            })
        ]
    });
};
