import thinky from '../thinky';

let type = thinky.type;

let Reload = thinky.createModel('Reload', {
    id       : type.string().optional(), // Optional => not specified in bodies but generated by RethinkDB
    credit   : Number,
    trace    : String,
    createdAt: type.date().default(new Date()),
    editedAt : Date,
    isRemoved: type.boolean().default(false),
    pointId  : type.string().optional(), // Force Thinky to show thoses additional fields that would be cut by enforce_extra
    buyerId  : type.string().optional(), // Force Thinky to show thoses additional fields that would be cut by enforce_extra
    sellerId : type.string().optional() // Force Thinky to show thoses additional fields that would be cut by enforce_extra
}, {
    enforce_missing: true,
    enforce_extra  : 'remove',
    enforce_type   : 'strict'
});

Reload.pre('save', function (next) {
    this.editedAt = new Date();
    next();
});

Reload.ensureIndex('ip');
Reload.ensureIndex('credit');
Reload.ensureIndex('trace');
Reload.ensureIndex('createdAt');
Reload.ensureIndex('editedAt');

Reload.associate = models => {
    models.Reload.belongsTo(models.Point, 'point', 'pointId', 'id');
    models.Reload.belongsTo(models.User, 'buyer', 'buyerId', 'id');
    models.Reload.belongsTo(models.User, 'seller', 'sellerId', 'id');
};

export default Reload;
