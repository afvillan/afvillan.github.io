const messageTypes = { LEFT: "left", RIGHT: "right", LOGIN: "login" };

// chat stuff
const chatWindow = document.getElementById("chat");
const messagesList = document.getElementById("messagesList");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");

//login stuff
let username = "";
const usernameInput = document.getElementById("usernameInput");
const loginBtn = document.getElementById("loginBtn");
const loginWindow = document.getElementById("login");

const messages = [
  {
    author: "Arthur",
    date: "11/11/2018",
    content: "cool message",
    type: messageTypes.RIGHT,
  },
  {
    author: "Claudia",
    date: "11/11/2020",
    content: "Hola desde el hogar!!",
    type: messageTypes.LEFT,
  },
];
// {author, date, content, type}

// take in message object, and return corresponding message HTML
function createMessageHTML(message) {
  if (message.type === messageTypes.LOGIN) {
    return `<p class="secondary-text text-center mb-2">
              ${message.author} has joined the chat...
            </p>`;
  } else {
    return `
    <div class="message ${
      message.type === messageTypes.LEFT ? "message-left" : "message-right"
    } ">
        <div id="message-details" class="flex">
            <p class="message-author">${
              message.type === messageTypes.LEFT ? message.author : ""
            }</p>
            <p class="message-date">${message.date}</p>
            </div>
        <p class="message-context">${message.content}</p>
    </div>
    `;
  }
}

function displayMessages() {
  const messagesHTML = messages
    .map((message) => createMessageHTML(message))
    .join("\n");

  console.log(messagesHTML);

  messagesList.innerHTML = messagesHTML;
}

displayMessages();
