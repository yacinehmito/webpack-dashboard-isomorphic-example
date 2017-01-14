const path = require('path')
const DashboardPlugin = require('webpack-dashboard/plugin')

// Socket ports are declared in a seperate json file
// Of course, you don't have to do this
const config = require('./config.json')

// This part of the configration is used by both the client
// and the server so we declare it here
const common = {
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: [
          { loader: 'babel-loader' }
      ]
    }]
  }
}

const server = Object.assign({
  name: 'server',
  entry: path.resolve(__dirname, 'server', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'dist', 'server'),
    filename: 'index.js'
  },
  target: 'node',
  plugins: [
    // By default the port is 3001 ; you can put it directly if you wish
    new DashboardPlugin({ port: config.server.port })
  ]
}, common)

const client = Object.assign({
  name: 'client',
  entry: path.resolve(__dirname, 'client', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'dist', 'server'),
    filename: 'index.js'
  },
  target: 'web',
  plugins: [
    // By default the port is 3002 ; you can put it directly if you wish
    new DashboardPlugin({ port: config.client.port })
  ]
}, common)

// We export multiple modules
module.exports = [ server, client ]

