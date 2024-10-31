const { getAllLogs, getLogsByUser, getLogsByFonctionnality, insertLog } = require('../models/Log');

const getLogs = async () => {
    return await getAllLogs();
}



module.exports = { getLogs }; 