import thinky from '../thinky';

let type = thinky.type;

let Group = thinky.createModel('Group', {
    id         : type.string().optional(), // Optional => not specified in bodies but generated by RethinkDB
    name       : String,
    createdAt  : type.date().default(new Date()),
    editedAt   : Date,
    isOpen     : type.boolean().default(true),
    isPublic   : type.boolean().default(false),
    isRemoved  : type.boolean().default(false),
    fundationId: type.string().optional() // Force Thinky to show thoses additional fields that would be cut by enforce_extra
}, {
    enforce_missing: true,
    enforce_extra  : 'remove',
    enforce_type   : 'strict'
});

Group.pre('save', function (next) {
    this.editedAt = new Date();
    next();
});

Group.ensureIndex('name');
Group.ensureIndex('createdAt');
Group.ensureIndex('editedAt');

Group.associate = models => {
    models.Group.belongsTo(models.Fundation, 'fundation', 'fundationId', 'id');
    models.Group.hasAndBelongsToMany(models.User, 'users', 'id', 'id');
    models.Group.hasMany(models.Price, 'prices', 'id', 'groupId');
};


export default Group;
