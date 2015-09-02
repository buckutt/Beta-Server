import thinky from '../thinky';

let type = thinky.type;

let Period = thinky.createModel('Period', {
    id         : type.string().optional(), // Optional => not specified in bodies but generated by RethinkDB
    name       : String,
    start      : Date,
    end        : Date,
    createdAt  : type.date().default(new Date()),
    editedAt   : Date,
    isRemoved  : type.boolean().default(false),
    // Force Thinky to show thoses additional fields that would be cut by enforce_extra
    fundationId: type.string().optional()
}, {
    enforce_missing: true,
    enforce_extra  : 'remove',
    enforce_type   : 'strict'
});

Period.pre('save', function (next) {
    this.editedAt = new Date();
    next();
});

Period.ensureIndex('name');
Period.ensureIndex('start');
Period.ensureIndex('end');
Period.ensureIndex('createdAt');
Period.ensureIndex('editedAt');

Period.associate = models => {
    models.Period.hasMany(models.Price, 'prices', 'id', 'periodId');
    models.Period.hasMany(models.Right, 'rights', 'id', 'periodId');
};

export default Period;
