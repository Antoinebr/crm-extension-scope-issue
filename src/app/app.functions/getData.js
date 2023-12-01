const axios = require('axios');

exports.main = async (context = {}, callback) => {

    const order = await axios.get(`https://partner-app.antoinebrossault.com/api/devices/${context.parameters.deviceNumber}`);

    return callback(order.data)

};

