const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Top5ListSchema = new Schema(
    {
        name: { type: String, required: true },
        items: { type: [String], required: true },
        likes: { type: Number, required: true },
        dislikes: { type: Number, required: true },
        views: { type: Number, required: true },
        author: { type: String, required: true },
        published: { type: String, required: true },
        ispublished: { type: Boolean, required: true },
        comment: { type: [String], required: true },
        votes: { type: [Number], required: true },
        ownerEmail: { type: String, required: true }
        
    },
    { timestamps: true },
)

module.exports = mongoose.model('Top5List', Top5ListSchema)
