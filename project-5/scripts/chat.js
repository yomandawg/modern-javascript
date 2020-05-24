// adding new chat documents
// setting up a real-time listener to get new chats
// updating the username
// updating the room
class Chatroom {
  constructor(room, username) {
    this.room = room;
    this.username = username;
    this.chats = db.collection('chats');
    this.unsub;
    document.querySelector(`#${room}`).classList.add('selected');
  }
  async addChat(message) {
    // format a chat object
    const chat = {
      message,
      username: this.username,
      room: this.room,
      created_at: firebase.firestore.Timestamp.fromDate(new Date())
    };
    // save the chat document
    const response = await this.chats.add(chat);
    return response;
  }
  getChats(callback) {
    this.unsub = this.chats
      .where('room', '==', this.room)
      .orderBy('created_at')
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if(change.type === 'added' || change.type === 'removed') {
            // update the UI
            callback(change.doc, change.type);
          }
        })
      });
  }
  updateName(username) {
    this.username = username;
    localStorage.setItem('username', username);
  }
  updateRoom(room) {
    this.room = room;
    document.querySelector('.selected').classList.remove('selected');
    document.querySelector(`#${room}`).classList.add('selected');
    if(this.unsub) {
      this.unsub();
    }
  }
}