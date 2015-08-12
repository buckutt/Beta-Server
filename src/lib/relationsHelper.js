import { clone } from './utils';

export default {
    /**
     * Extracts relations from JSON data. Useful to insert them later (with restore) to user Thinky's setters
     * @param  {Function} Model     The Model to treat
     * @param  {Object}   modelData The model data
     * @return {Object[]} First item is data without left keys, second item will be leftkeys only
     */
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

    /**
     * Restores left keys to item using Thinky's setters
     * @param  {Object} instance          Instance of a model
     * @param  {Object} leftKeysExtracted Left keys extracted by sanitize
     * @return {Object}                   Instance extended
     */
    restore (instance, leftKeysExtracted) {
        Object.keys(leftKeysExtracted).forEach(function (leftKey) {
            instance[leftKey] = leftKeysExtracted[leftKey];
        });
    }
};
