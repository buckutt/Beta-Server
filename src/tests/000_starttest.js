import app          from '../app';
import config       from '../config';
import logger       from '../log';
import consoleTitle from 'console-title';

let log = logger(module);

describe('Should start the test application', () => {
    app.listen(config.port, () => {
        log.info('Server is listening on port %d', config.port);
        log.warn('Please wait for models to be ready...');
        consoleTitle('Buckutt Server *');
    });
});

