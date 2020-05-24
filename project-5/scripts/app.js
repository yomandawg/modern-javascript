// DOM queries
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const rooms = document.querySelector('.chat-rooms');

// check local storage for a name
const username = localStorage.username ? localStorage.username : 'Anonymous';

// class instances
const chatUI = new ChatUI(chatList, username);
const chatroom = new Chatroom('general', username);

// get chats and render
chatroom.getChats((doc, type) => chatUI.render(doc, type, chatroom.username));

// update the chat room
rooms.addEventListener('click', e => {
  if(e.target.tagName === 'BUTTON') {
    chatUI.clear();
    chatroom.updateRoom(e.target.getAttribute('id'));
    chatroom.getChats((doc, type) => chatUI.render(doc, type, chatroom.username));
  }
});

// add a new chat
newChatForm.addEventListener('submit', e => {
  e.preventDefault();
  const message = newChatForm.message.value.trim();
  chatroom.addChat(message)
    .catch(err => console.log(err));
  newChatForm.reset()
})

// delete my chat
chatList.addEventListener('click', e => {
  if(e.target.classList.contains('delete')) {
    db.collection('chats').doc(e.target.parentElement.id).delete();
  }
})

// update username
newNameForm.addEventListener('submit', e => {
  e.preventDefault();
  // update name via `chatroom` class
  const newName = newNameForm.name.value.trim();
  chatroom.updateName(newName);
  newNameForm.reset();
  // reload the page
  location.reload()
});