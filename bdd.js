const mysql = require('mysql')

const options = {
    user: 'test',
    password: 'test',
    database: 'test'
}

const connection = mysql.createConnection(options)

connection.connect(err => {
    if (err) {
      console.error('An error occurred while connecting to the DB')
      throw err
    }
})