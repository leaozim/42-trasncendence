function setupWebSocket(roomId, currentUser) {
	const base_url = 'ws://' + window.location.hostname + ':' + window.location.port + '/ws/chat/' + roomId + '/';
	chatSocket = new WebSocket(base_url);
	chatSocket.onmessage = (event) => {
		const parsed = JSON.parse(event.data);
		addReceivedMessage(currentUser, parsed.username, parsed.message, parsed.user_avatar, parsed.users);
	};
}

async function sendMessage() {
	const messageInputDom = document.getElementById('chat-message-input');
	const message = messageInputDom.value.trim();

	if (message !== '') {
        if (window.chatSocket) {
		console.log( "send messag")

            window.chatSocket.send(JSON.stringify({
                'message': message,
            }));
        }		
		ChatUpdater.renderUserWindow(otherUser.other_user_id, otherUser.other_user_username, otherUser.other_user_avatar)
	}
	messageInputDom.value = '';

}

function addReceivedMessage(currentUser, sender, message, userAvatar) {
	const messageElement = document.createElement('div')
	const avatarElement = document.createElement('img');
	const textElement = document.createElement('p');
	const divImgElement = document.createElement('div')

	if (sender === currentUser) {
		messageElement.className = 'sent-message';
	}
	else {
		if (sender != lastMessageSender) {
			userAvatar ? userAvatar : 'https://res.cloudinary.com/dw9xon1xs/image/upload/v1706288572/arya2_lr9qcd.png'; 
			avatarElement.src = userAvatar;
			avatarElement.alt = 'Avatar';
			textElement.className =  'special-style';

		}
		divImgElement.className = 'user-photo';
		messageElement.className = 'received-message';
		divImgElement.appendChild(avatarElement)
		messageElement.appendChild(divImgElement);
	}

	const clickableMessage = makeLinksClickable(message);
    textElement.innerHTML = clickableMessage;
	messageElement.appendChild(textElement);
	chatLog.appendChild(messageElement);
	messageElement.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });

	lastMessageSender = sender;
}


document.addEventListener('DOMContentLoaded', function() {
  	document.getElementById('chat-message-input').addEventListener('keydown', function(event) {

		if (event.key === 'Enter') {
			sendMessage();
			event.preventDefault(); 
		}
  });
});