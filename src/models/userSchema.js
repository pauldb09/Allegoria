const mongoose = require('mongoose');
const channeldb = new mongoose.Schema({
    userID: { type: String, required: true },
    join_date: { type: Date, required: false, default: Date().now },
    nickname: { type: String, required: false },
    accepted: { type: Boolean, required: false },
    hasBeenInAClan: { type: Object, required: false },
    coins: { type: Number, required: false },
    wood: { type: Number, required: false, default: 0 },
    diamants: { type: Number, required: false, default: 0 },
    pets: { type: Array, required: false },
    items: { type: Array, required: false },
    clan: { type: String, required: false },
    books: { type: Array, required: false },
    own_shop: { type: Array, required: false },
    daily: { type: Number, required: false },
    premium: { type: Boolean, required: false },
    done: { type: Boolean, required: false },
    private: { type: Boolean, required: false, default: false },
    character: { type: String, required: false, default: false },
    cooldowns: { type: Object, required: false, default: null },
    lastRedeems: { type: Array, required: false },
    level: { type: Number, required: false, default: 0 },
    nextLvlCoins: { type: Number, required: false, default: 150 },
    bonuses: { type: Object, required: false, default: [] },
    completed_quests: { type: Array, required: false, default: [] }
})
const userSchema = module.exports = mongoose.model('userSchema', channeldb)