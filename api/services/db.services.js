const database = require('../../config/connection')

const dbServices = (migrate)=>{
    const authenticateDB = () => database.authenticate();
    const dropDB = () => database.drop();
    const syncDB = () => database.sync();
    const successfulDBStart = () => (
        console.log('Database connection established')
    );
    const errorDBStart = (error) => (
        console.log('Error while connecting to database',error)
    );
    const startMigrateTrue = async()=>{
        try {
            await syncDB();
            successfulDBStart();
        } catch (error) {
            errorDBStart(error);
        }
    };
    const startMigrateFalse = async()=>{
        try {
            await dropDB();
            await syncDB();
            successfulDBStart();
        } catch (error) {
            errorDBStart(error);
        }
    };
    const start = async()=>{
        try {
            await authenticateDB();
            if(migrate) return startMigrateTrue();
            return startMigrateFalse();
        } catch (error) {
            return errorDBStart();
        }
    };
    return {
        start,
    };
}

module.exports = dbServices;