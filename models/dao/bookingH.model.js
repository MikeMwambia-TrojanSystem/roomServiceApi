
const mongoose = require('mongoose');
const bookinHistory = require('../schemas/rooms.model');

bookinHistory.statics = {
    create : function(data, cb) {
        let rooms = new this(data);
        rooms.save(cb);
    },

    get: function(query, cb) {
        this.find(query, cb);
    },

    getById: function(query, cb) {
        this.find(query, cb);
    },

    updateOne: function(query, updateData, cb) {
        this.findOneAndUpdate(query, {$set: updateData},{new: true}, cb);
    },

    delete: function(query, cb) {
        this.findOneAndDelete(query,cb);
    }
}

let bookingHistory = mongoose.model('bookingHistory', bookinHistory);
module.exports = bookingHistory;