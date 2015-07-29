import { clone } from './utils';

export default {
    sanitize (Model, modelData) {
        let leftKeys  = Object.keys(Model._joins);
        let saved     = {};

        leftKeys.forEach(function (key) {
            if (modelData[key]) {
                saved[key] = clone(modelData[key]); // Save the relation
                delete modelData[key]; // And deletes the relation from the result object
            }
        });

        return [modelData, saved];
    },

    restore (instance, leftKeysExtracted) {
        Object.keys(leftKeysExtracted).forEach(function (leftKey) {
            instance[leftKey] = leftKeysExtracted[leftKey];
        });
    }
};
