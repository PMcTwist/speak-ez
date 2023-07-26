const axios = require("axios")

function harperSaveMessage(message, username, room) {
    const dbUrl = process.env.HARPERDB_URL;
    const dbPw = process.env.HARPERDB_PW;
    if (!dbUrl || !dbPw) return null;

    var data = JSON.stringify({
        operation: 'insert',
        schema: 'realtime_chap_app',
        table: 'messages',
        records: [
            {
                message,
                username,
                room
            },
        ],
    });

    var config = {
        method: 'post',
        url: dbUrl,
        headers: {
            'Content-Type': 'application/json',
            Authorization: dbPw,
        },
        data: data,
    };

    return new Promise((resolve, reject) => {
        axios(config)
            .then(function (res) {
                resolve(JSON.stringify(res.data));
            })
            .catch(function (err) {
                reject(err);
            })
    })
};

module.exports = harperSaveMessage;