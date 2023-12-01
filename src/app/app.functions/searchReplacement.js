const axios = require('axios');

exports.main = async (context = {}, callback) => {

    const replacement = await axios.get(`https://partner-app.antoinebrossault.com/api/devices/replacement`);

    return callback(replacement.data)


};

