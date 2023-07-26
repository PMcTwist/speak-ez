let axios = require('axios');

function harperGetMessages(room) {
    const dbUrl = process.env.HARPERDB_URL;
    const dbPw = process.env.HARPERDB_PW;
    if(!dbUrl || !dbPw) return null;


    // Setup the DB query and get a JSON object back
    let data = JSON.stringify({
        operation: 'sql',
        sql: `SELECT * FROM realtime_chap_app.messages WHERE room = ${room} LIMIT 100`,
    });

    let config = {
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
            });
    });
}

module.exports = harperGetMessages;