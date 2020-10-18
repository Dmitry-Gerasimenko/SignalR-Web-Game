var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();
var createMessageElement = function(userName, message, avatarUrl) {
    let messageElement = document.createElement("div");
        messageElement.classList.add("chat-message");
    let userPhotoElement = document.createElement("div");
        userPhotoElement.classList.add("user-photo");
    let messageInfoElement = document.createElement("div");
        messageInfoElement.classList.add("message-info");
    let messageSenderElement = document.createElement("p");
        messageSenderElement.classList.add("message-sender");
    let messageTextElement = document.createElement("p");
        messageTextElement.classList.add("message-text");
    let avatarImg = document.createElement('img');
        avatarImg.src = avatarUrl;

    messageSenderElement.textContent = userName;
    messageTextElement.textContent = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

    userPhotoElement.appendChild(avatarImg);
    messageElement.appendChild(userPhotoElement);
    messageInfoElement.appendChild(messageSenderElement);
    messageInfoElement.appendChild(messageTextElement)

    messageElement.appendChild(messageInfoElement);
    return messageElement;
}

//Disable send button until connection is established
document.getElementById("sendButton").disabled = true;

// Subscribe to events
connection.on("ReceiveMessage", function (user, message, avatarUrl) {
    var createdMessageElement = createMessageElement(user, message, avatarUrl);

    var msgList = document.getElementById("messagesList");
    msgList.appendChild(createdMessageElement);

    if (user.toLowerCase() == getCurrentUserNameWrapper().toLowerCase()) {
        msgList.scrollTop = msgList.scrollHeight;
    }
    else {
        notifyGetMsg();
        notifyAboutNewMessage();
    }
});
connection.on("NotifyOnConnection", function (messageInfo) {
    var createdMessageElement = createMessageElement("Connection listener", messageInfo, '/img/ls1.png');
    createdMessageElement.classList.add("shadow");
    createdMessageElement.classList.add("bg-light");

    var msgList = document.getElementById("messagesList");
    msgList.appendChild(createdMessageElement);
});

function startChathubConnection() {
    connection
        .start()
        .then(function () {
            document.getElementById("sendButton").disabled = false;
            console.dir('CHAT CONNECTION STARTED')
        })
        .catch(function (err) {
            return console.error(err.toString());
        });
}

// Add event listeners
document.getElementById("sendButton").addEventListener("click", function (event) {

    let msgArea = document.getElementById("messageTextArea");
    let msgText = msgArea.value;

    if (msgText == '') {
        msgArea.value = 'please no empty messages';
    }
    else {
        msgArea.value = '';
        connection.invoke("SendMessage", msgText)
            .catch(function (err) {
                return console.error(err.toString());
            });

        event.preventDefault();
    }
});