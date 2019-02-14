const MongoClient = require('mongodb').MongoClient

let MONGODB_USER = process.env['MONGODB_USER']
let MONGODB_PASSWORD = process.env['MONGODB_PASSWORD']
let MONGODB_HOST = process.env['MONGODB_HOST']

let clientOptions = {
  keepAlive: true,
  connectTimeoutMS: 5000,

  reconnectTries: 3,
  reconnectInterval: 1000,

  useNewUrlParser: true,
}

function connectionUrl() {
  return `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_HOST}/admin`
}

async function connect() {
  const connectUrl = connectionUrl()
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

function configure(cfg) {
  if ('MONGODB_USER' in cfg) MONGODB_USER = cfg['MONGODB_USER']
  if ('MONGODB_PASSWORD' in cfg) MONGODB_PASSWORD = cfg['MONGODB_PASSWORD']
  if ('MONGODB_HOST' in cfg) MONGODB_HOST = cfg['MONGODB_HOST']
}


module.exports = {
  connect, connectionUrl, configure,
}
