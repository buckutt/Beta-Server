import thinky from '../thinky';

let type = thinky.type;

let Promotion = thinky.createModel('Promotion', {
    id       : type.string().optional(), // Optional => not specified in bodies but generated by RethinkDB
    name     : String,
    createdAt: type.date().default(new Date()),
    editedAt : Date,
    isRemoved: type.boolean().default(false),
    // Force Thinky to show thoses additional fields that would be cut by enforce_extra
    priceId  : type.string().optional(),
    pointId  : type.string().optional()
}, {
    enforce_missing: true,
    enforce_extra  : 'remove',
    enforce_type   : 'strict'
});

Promotion.pre('save', function (next) {
    this.editedAt = new Date();
    next();
});

Promotion.ensureIndex('name');
Promotion.ensureIndex('createdAt');
Promotion.ensureIndex('editedAt');

Promotion.associate = models => {
    models.Promotion.belongsTo(models.Point, 'point', 'pointId', 'id');
    models.Promotion.belongsTo(models.Price, 'price', 'priceId', 'id');
    // n:n instead of 1:n to allow one promotion containing multiple times the same article
    models.Promotion.hasAndBelongsToMany(models.Article, 'articles', 'id', 'id');
    // n:n instead of 1:n to allow one promotion containing multiple times the same set
    models.Promotion.hasAndBelongsToMany(models.Set, 'sets', 'id', 'id');
    models.Promotion.hasMany(models.Purchase, 'purchases', 'id', 'promotionId');
};

export default Promotion;
