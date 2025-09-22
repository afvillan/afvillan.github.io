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

let socket = io();

socket.on("message", (message) => {
  console.log("message que me llega:", message);

  if (message.type !== messageTypes.LOGIN) {
    if (message.author === username) {
      message.type = messageTypes.RIGHT;
    } else {
      message.type = messageTypes.LEFT;
    }
  }

  messages.push(message);
  displayMessages();
  chatWindow.scrollTop = chatWindow.scrollHeight;
});

const messages = [
  //   {
  //     author: "Arthur",
  //     date: "11/11/2018",
  //     content: "cool message",
  //     type: messageTypes.RIGHT,
  //   },
  //   {
  //     author: "Claudia",
  //     date: "11/11/2020",
  //     content: "Hola desde el hogar!!",
  //     type: messageTypes.LEFT,
  //   },
  //   {
  //     author: "Arthur",
  //     date: "11/11/2020",
  //     type: messageTypes.LOGIN,
  //   },
];
// {author, date, content, type}

// take in message object, and return corresponding message HTML
function createMessageHTML(message) {
  if (message.type === messageTypes.LOGIN) {
    return `
    <p class="secondary-text text-center mb-2">
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

////////// login

usernameInput.focus();

loginBtn.addEventListener("click", (e) => {
  // prevent default of a form
  e.preventDefault();
  //set the username and create logged in message
  if (!usernameInput.value) {
    return console.log("Must supply a username.");
  }
  username = usernameInput.value;
  console.log("username:", username);

  //messages.push({ author: username, type: messageTypes.LOGIN });
  //displayMessages();

  sendMessage({ author: username, type: messageTypes.LOGIN });

  //hide login and show chat window
  chatWindow.classList.remove("hidden");
  loginWindow.classList.add("hidden");
  messageInput.focus();

  //display those messages
});

//////////// send Btn callback

Number.prototype.padLeft = function (base, chr) {
  var len = String(base || 10).length - String(this).length + 1;
  return len > 0 ? new Array(len).join(chr || "0") + this : this;
};
// usage
//=> 3..padLeft() => '03'
//=> 3..padLeft(100,'-') => '--3'

sendBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (!messageInput.value) {
    return console.log("Must supply a message.");
  }

  var d = new Date(),
    dformat =
      [
        (d.getMonth() + 1).padLeft(),
        d.getDate().padLeft(),
        d.getFullYear(),
      ].join("/") +
      " " +
      [
        d.getHours().padLeft(),
        d.getMinutes().padLeft(),
        d.getSeconds().padLeft(),
      ].join(":");

  const message = {
    author: username,
    // date: new Date(),
    date: dformat,
    content: messageInput.value,
    // type: messageTypes.RIGHT,
  };

  sendMessage(message);

  //messages.push(message);
  //displayMessages();

  messageInput.value = "";

  //chatWindow.scrollTop = chatWindow.scrollHeight;
});

function sendMessage(message) {
  socket.emit("message", message);
}
