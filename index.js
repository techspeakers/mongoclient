const MongoClient = require('mongodb').MongoClient

const MONGODB_USER = process.env['MONGODB_USER']
const MONGODB_PASSWORD = process.env['MONGODB_PASSWORD']
const MONGODB_HOST = process.env['MONGODB_HOST']

let clientOptions = {
  keepAlive: true,
  connectTimeoutMS: 5000,
  connectTimeoutMS: 15000,

  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 1000,

  useNewUrlParser: true,
}

async function connect() {
  const connectUrl = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_HOST}/admin`
  console.log('Connecting... ')

  try {
    const client = await MongoClient.connect(
      connectUrl,
      clientOptions
    )

    const db = client.db('moztechspeakers')

    return db
  }
  catch (e) {
    console.log(e)
    throw e
  }
}


module.exports = {
  connect,
}
