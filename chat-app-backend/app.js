const express = require('express');
const http = require('http');
const path = require('path');
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const app = express();
const server = http.createServer(app);
const WebSocketServer = require('ws').Server;
const wss = new WebSocketServer({ server: server });

const colors = ['purple', 'green', 'orange', 'blue', 'pink', 'yellow'];
let clients = [];
let clientsData = [];

wss.on('connection', function (ws) {
	let userName = false;
	let userColor = false;

	clients.push(ws);

	ws.on('message', function (msg) {
		msg = JSON.parse(msg)

		if (msg.type === 'init') {
			userName = msg.data.userName;
			userColor = colors[Math.floor(Math.random() * colors.length)];

			let userNameCheckResult = checkUserName(userName);

			if(userNameCheckResult.isValid) {
				ws.send(JSON.stringify({
					type: 'authSuccess',
					data: {
						userName: userName,
						users: clientsData
					}
				}));
	
				let newUser = JSON.stringify({
					type: 'userConnected',
					data: {
						userName: userName,
						color: userColor
					}
				})
	
				for (client of clients) {
					client.send(newUser);
				}
	
				clientsData.push({userName: userName, color: userColor});
			} else {
				userName = '';
				userColor = '';

				ws.send(JSON.stringify({
					type: 'authError',
					data: {
						errors: userNameCheckResult.errors,
					}
				}));
			}

		} else if (msg.type === 'message') {
			let newMsg = JSON.stringify({
				type: 'message',
				data: {
					id: getUID(),
					date: new Date(),
					text: msg.data.text,
					author: userName,
					color: userColor
				}
			});

			for (client of clients) {
				client.send(newMsg);
			}
		}
	});

	ws.on('close', function () {
		let index = clients.indexOf(ws);
		clients.splice(index, 1);

		clientsData = clientsData.filter(client => {
			return client.userName != userName;
		});

		let disconnectedUser = JSON.stringify({
			type: 'userDisconnected',
			data: {
				id: getUID(),
				userName
			}
		});

		for (client of clients) {
			client.send(disconnectedUser);
		}
	});

});

const getUID = () => {
	return Date.now();
}

const checkUserName = (userName) => {
	let isValid = true, errors = [];

	for(let i = 0; i < clientsData.length; i++)
		if (clientsData[i].userName === userName) 
			return { isValid: false, errors: ['User with this username alreasy exists.'] }
	
	if(userName.length < 3) {
		isValid = false;
		errors.push('Username should contain at least 3 symbols.');
	}

	if(!(userName.match('^[a-zA-Z0-9_]+$'))) {
		isValid = false;
		errors.push('Username can only contain letters, numbers and underscores.');
	}

	return { isValid, errors }
}

console.log(process.env.PORT)

app.configure(function () {
	app.set('port', process.env.PORT || 4000);
	// app.set('views', __dirname + '/views');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function () {
	app.use(express.errorHandler());
});

// app.get('/', function (req, res) {
// 	res.sendfile('views/index.html');
// });

server.listen(app.get('port'), function () {
	console.log("Express server listening on port " + app.get('port'));
});
