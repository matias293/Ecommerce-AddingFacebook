const mongoose = require('mongoose');
import Config from '../config/index'


const dbConnection = async() => {

    try {
        

        await mongoose.connect(Config.MONGO_INGRESS);
        console.log('BASE DE DATOS ONLINE')
        

    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la base de datos');
    }


}

module.exports = {
    dbConnection
}