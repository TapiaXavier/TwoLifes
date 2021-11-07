const mongoose = require('mongoose');

const PlatformSchema = new mongoose.Schema({
    platform: {type: String, required: true}
}, {collection: 'platform_col'})

mongoose.model('Platform', PlatformSchema);
