// render chat templates to the DOM
// clear the list of chats (when the room changes)
class ChatUI {
  constructor(list, name) {
    this.list = list;
    document.querySelector('.name-msg').innerHTML = `Your name is ${name}`
  }
  clear() {
    this.list.innerHTML = '';
  }
  render(doc, type, username) {
    if(type === 'added') {
      const data = doc.data();
      const when = dateFns.distanceInWordsToNow(
        data.created_at.toDate(),
        { addSuffix: true }
      );
      const html = data.username === username ? `
        <li id="${doc.id}" class="list-group-item">
          <span class="username">${data.username}</span>
          <span class="message">${data.message}</span>
          <i class="far fa-trash-alt delete"></i>
          <div class="time">${when}</div>
        </li>
      ` : `
        <li id="${doc.id}" class="list-group-item">
          <span class="username">${data.username}</span>
          <span class="message">${data.message}</span>
          <div class="time">${when}</div>
        </li>
      `;
      this.list.innerHTML += html;
    } else if(type === 'removed') {
      document.getElementById(doc.id).remove();
    }
  }
}