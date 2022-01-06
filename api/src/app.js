const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const { groupsRouter } = require('./routers');
const { DB_CONNECT_URL, PORT } = require('./config/variables');

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/groups', groupsRouter)
app.use('*', _error)

_start()

function _error(err, req, res, next) { // eslint-disable-line
    res
        .status(err.status)
        .json({
            status: err.status || 418,
            message: err.message || 'Something went wrong'
        });
}

async function _start() {
    try {
        await app.listen(PORT, () => {
            console.log(`Server connected on port: ${ PORT }`);
        });
        await mongoose.connect( DB_CONNECT_URL )
            .then(() => {
                console.log('Database successfully connected');
            })
            .catch(() => {
                console.error('Database connection failed!!!');
            });
    } catch (e) {
        console.error('Server connection failed!!!');
    }
}
