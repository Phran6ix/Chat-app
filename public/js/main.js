const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
const userList = document.getElementById("users");
const roomName = document.getElementById("room-name");

//Get username and room from url
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const socket = io();
//JOIN CHATROOM

socket.emit("joinRoom", { username, room });
// get room users
socket.on("roomUsers", ({ room, users }) => {
  outputRoomName(room);
  outputUser(users);
});

socket.on("message", (message) => {
  outputMessage(message);

  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// listen for message submit
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const message = e.target.elements.msg.value;
  //   emitting message to server
  socket.emit("chatMessage", message);

  e.target.elements.msg.value = "";
  e.target.elements.msg.focus();
});

//Send Message to DOM
function outputMessage(message) {
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
            <p class="text">
             ${message.text}
            </p>`;
  document.querySelector(".chat-messages").appendChild(div);
}

// add room name to dom
function outputRoomName(room) {
  roomName.innerText = room;
}

// add users to dom
function outputUser(users) {
  userList.innerHTML = `
    ${users.map((user) => `<l1>${user.username}</l1>`).join("\n")}`;
}
