const { rejects } = require('assert');
const mysql = require('mysql');
const { resolve } = require('path');

module.exports = async (params) => new Promise((resolve, reject) => {
    const connection = mysql.createConnection(params);
    connection.connect(error => {
        if (error) {
            reject(error);
            return;
        }
        resolve(connection);
    })
})