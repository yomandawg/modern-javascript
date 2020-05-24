const list = document.querySelector('ul');
const form = document.querySelector('form');
const button = document.querySelector('button');

const addRecipe = (recipe, id) => {
  let html = `
    <li data-id="${id}">
      <div>${recipe.title}</div>
      <div>${recipe.created_at.toDate()}</div>
      <button class="btn btn-danger btn-sm my-2">delete</button>
    </li>
  `;
  list.innerHTML += html;
}

// // get documents
// db.collection('recipes').get().then(snapshot => {
//   snapshot.docs.forEach(doc => {
//     addRecipe(doc.data(), doc.id);
//   });
// }).catch(err => {
//   console.log(err);
// });

// delete from the template
const deleteRecipe = (id) => {
  const recipes = document.querySelectorAll('li');
  recipes.forEach(recipe => {
    if(recipe.getAttribute('data-id') === id) {
      recipe.remove();
    }
  });
}

// get documents realtime by listening to the snapshot
const unsub = db.collection('recipes').onSnapshot(snapshot => {
  snapshot.docChanges().forEach(change => {
    const doc = change.doc;
    if(change.type === 'added') {
      addRecipe(doc.data(), doc.id);
    } else if(change.type === 'removed') {
      deleteRecipe(doc.id);
    }
  })
});

// add documents
form.addEventListener('submit', e => {
  e.preventDefault();
  const recipe = {
    title: form.recipe.value.trim(),
    created_at: firebase.firestore.Timestamp.fromDate(new Date()),
  };
  if(recipe.title.length) {
    db.collection('recipes').add(recipe).then(() => {
      console.log('recipe added');
    }).catch(err => {
      console.log(err);
    });
    form.reset();
  }
});

// deleting data
list.addEventListener('click', e => {
  if(e.target.tagName === 'BUTTON') {
    const id = e.target.parentElement.getAttribute('data-id');
    db.collection('recipes').doc(id).delete().then(() => {
      console.log('recipe deleted');
    }).catch(err => {
      console.log(err);
    });
  }
})

// unsubscribe from database changes
button.addEventListener('click', () => {
  unsub(); // cancel listening to the snapshot changes when invoked again
  console.log('unsubscribe from collection changes');
});