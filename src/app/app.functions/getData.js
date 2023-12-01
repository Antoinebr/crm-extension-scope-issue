const axios = require('axios');

exports.main = async (context = {}, callback) => {

    const order = await axios.get(`https://partner-app.antoinebrossault.com/api/devices/${context.parameters.deviceNumber}`);

    

    // console.log(context.parameters.deviceNumber)

    // console.log([deviceInfo[context.parameters.deviceNumber]]);

    return callback(order.data)

    //return callback([order.data])

};

