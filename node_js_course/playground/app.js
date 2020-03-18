const WebSocket = require('ws')

const ws = new WebSocket('wss://btc.data.hxro.io/live')

ws.on('message', function incoming(data) {
	console.log(data)
})
