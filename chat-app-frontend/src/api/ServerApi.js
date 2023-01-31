import store from '../redux/store';
import { authSuccess, userConnected, userDisconnected, newMessage, authError } from '../redux/actions';

export const ServerApi = (serverUrl) => {
	const ws = new WebSocket(serverUrl)
	const { dispatch } = store

	ws.onopen = () => {
		// console.log('WS Open!')
	}

	ws.onmessage = (message) => {
		const messageObj = JSON.parse(message.data)

		switch (messageObj.type) {
			case 'authSuccess':
				dispatch(authSuccess(messageObj.data))
				break;
			case 'authError':
				dispatch(authError(messageObj.data.errors))
				break;
			case 'userConnected':
				dispatch(userConnected(messageObj.data))
				break;
			case 'userDisconnected':
				dispatch(userDisconnected(messageObj.data))
				break;
			case 'message':
				dispatch(newMessage(messageObj.data))
				break;
		}
	}

	const send = (message) => {

		let reconnectCount = 0;

		if (reconnectCount > 5) return

		if (ws.readyState === ws.CONNECTING) {
			setTimeout(() => {
				send(message)
				reconnectCount++
			}, 500)
			return
		}

		ws.send(message)
		reconnectCount = 0

	}

	const createNewMessage = (msgText) => {
		return {
			type: 'message',
			data: {
				text: msgText,
			}
		}
	};

	const createInitMessage = (userName) => {
		return {
			type: 'init',
			data: {
				userName: userName
			}
		}
	}
	
	return { 
		sendMessage(msgText) {
			send(JSON.stringify(createNewMessage(msgText)));
		},

		initUser(userName) {
			send(JSON.stringify(createInitMessage(userName)));
		}
	}
}

export default ServerApi(process.env.REACT_APP_SERVER_URL);