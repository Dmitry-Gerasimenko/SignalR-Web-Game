var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();
var createMessageElement = function(userName, message) {
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

    messageSenderElement.textContent = userName;
    messageTextElement.textContent = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

    messageElement.appendChild(userPhotoElement);
    messageInfoElement.appendChild(messageSenderElement);
    messageInfoElement.appendChild(messageTextElement)

    messageElement.appendChild(messageInfoElement);
    return messageElement;
}

//Disable send button until connection is established
document.getElementById("sendButton").disabled = true;

// Remove this const after
const senderName = 'usernameFromChat.js';

connection.on("ReceiveMessage", function (user, message) {
    var createdMessageElement = createMessageElement(user, message);

    var msgList = document.getElementById("messagesList");
    msgList.appendChild(createdMessageElement);

    if (user.toLowerCase() == getCurrentUserNameWrapper().toLowerCase()) {
        msgList.scrollTop = msgList.scrollHeight;
    }
    else {
        soundClick();
        //alert('Message has received from another people, needed to notify me for ex via bootstrap 4 badge')
    }
});
connection.on("NotifyOnConnection", function (messageInfo) {
    var createdMessageElement = createMessageElement("CONNECTION LISTENER", messageInfo);
    createdMessageElement.classList.add("bg-light");

    var msgList = document.getElementById("messagesList");
    msgList.appendChild(createdMessageElement);
});


connection
    .start()
    .then(function () {
        document.getElementById("sendButton").disabled = false;
    })
    .catch(function (err) {
        return console.error(err.toString());
    });

document.getElementById("sendButton").addEventListener("click", function (event) {
    let msgArea = document.getElementById("messageTextArea");
    let msgText = msgArea.value;

    msgArea.value = '';
    connection.invoke("SendMessage", msgText)
        .catch(function (err) {
            return console.error(err.toString());
        });

    event.preventDefault();
});