import thinky   from '../thinky';

let type = thinky.type;

let Article = thinky.createModel('Article', {
    id        : type.string().optional(), // Optional => not specified in bodies but generated by RethinkDB
    name      : String,
    stock     : Number,
    createdAt : type.date().default(new Date()),
    editedAt  : Date,
    isRemoved : type.boolean().default(false),
    // Force Thinky to show thoses additional fields that would be cut by enforce_extra
    categoryId: type.string().optional(),
    pointId   : type.string().optional(),
    priceId   : type.string().optional()
}, {
    enforce_missing: true,
    enforce_extra  : 'remove',
    enforce_type   : 'strict'
});

Article.pre('save', function (next) {
    this.editedAt = new Date();
    next();
});

Article.ensureIndex('name');
Article.ensureIndex('createdAt');
Article.ensureIndex('editedAt');

Article.associate = models => {
    models.Article.belongsTo(models.Category, 'category', 'categoryId', 'id');
    models.Article.belongsTo(models.Point, 'point', 'pointId', 'id');
    // n:n instead of 1:n to allow one set containing multiple times the same article
    models.Article.hasAndBelongsToMany(models.Set, 'sets', 'id', 'id');
    // n:n instead of 1:n to allow one promotion containing multiple times the same article
    models.Article.hasAndBelongsToMany(models.Promotion, 'promotion', 'id', 'id');
    models.Article.hasAndBelongsToMany(models.Purchase, 'purchases', 'id', 'id');
    models.Article.hasMany(models.Price, 'prices', 'id', 'articleId');
};

export default Article;
