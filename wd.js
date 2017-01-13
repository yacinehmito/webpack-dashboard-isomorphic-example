#!/usr/bin/env node
'use strict'

const yargs = require('yargs')
const Dashboard = require('webpack-dashboard/dashboard')
const SocketIO = require('socket.io')
const config = require('./config.json')
const spawn = require('child_process').spawn

const spawnDashboard = (config = {}) => {
  const dashboard = new Dashboard({
    color: config.color || 'green',
    minimal: config.minimal || false,
    title: config.title || null
  })

  const port = config.port
  const server = SocketIO(port)

  server.on('error', (err) => {
    console.error(err)
  })

  server.on('connection', (socket) => {
    socket.on('message', (message) => {
      dashboard.setData(message)
    })
  })
}

const argv = yargs
  .usage('Usage: $0 <command>')
  .command(
    'server',
    'start webpack-dashboard for the server bundle',
    (yars) => {
      spawnDashboard(config.server)
    })
  .command(
    'client',
    'start webpack-dashboard for the client bundle',
    (yars) => {
      spawnDashboard(config.client)
    })
  .command(
    'bundle',
    'start the webpack job bundling client and server on changes',
    (yars) => {
      spawn('node_modules/.bin/webpack', [ '--watch' ], {
        env: process.env,
        stdio: 'inherit'
      })
    })
  .help('h')
  .alias('h', 'help')
  .argv

if (argv._.length < 1) {
  yargs.showHelp()
}

