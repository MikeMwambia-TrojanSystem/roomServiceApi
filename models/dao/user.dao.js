
const mongoose = require('mongoose');
const userSchema = require('../schemas/users.model');


userSchema.statics = {
    create : function(data, cb) {
        let users = new this(data);
        users.save(cb);
    },

    get: function(query, cb) {
        this.find(query, cb);
    },

    getById: function(query, cb) {
        this.find(query, cb);
    },

    update: function(query, updateData, cb) {
        this.findOneAndUpdate(query, {$set: updateData},{new: true}, cb);
    },

    delete: function(query, cb) {
        this.findOneAndDelete(query,cb);
    }
}

let usersDao = mongoose.model('users', userSchema);
module.exports = usersDao;