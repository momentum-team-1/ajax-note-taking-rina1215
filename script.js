console.log ("hello")

//add event listener for a form submission//

/* eslint-disable no-unused-vars, prefer-const */
/* globals fetch, moment */



let noteForm = document.querySelector("#note-form")
let todoList = document.querySelector('.notes')
/*let noteList = document.querySelector('.notes mar-t-xles')*/

// 1. Add event listener for form submission//
noteForm.addEventListener('submit', function (event) {
event.preventDefault()
let noteTextInput = document.querySelector('#note-text')
let noteText = noteTextInput.value
  // create the new todo item on the list (by sending a POST request so that it is added to the database)
noteTextInput.value =''
createNewNote(noteText)
})

// 2. write the fetch request to post request//
function createNewNote (noteText) 
return fetch('http://localhost:3000/notes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ item: noteText, done: false, created: moment().format() })
})
    .then(() =>renderTodos())
    // .then(response=> response.json())
    // .then(data=> console.log(data))
  // moment time stamp
  //   what should I write on item???????????????????????
  // A successful POST response from this server contains the newly created data,
  //   so you could use that to insert each created item individually.


// 3. render NOTE using the data that is now on the server
function renderNotes () {
noteList.innerHTML = ''
fetch('http://localhost:3000/notes', {
    method: 'GET'
})
    .then(response => response.json())
    .then(function (data) {

      // add the content to the DOM
      // create the ul
      // create an li for each item
let list = document.createElement('ul')
list.id = 'item-list'
for (let item of data) {
        let listItem = document.createElement('li')
        listItem.dataset.id = item.id
        listItem.innerText = item.item
        let deleteIcon = document.createElement("span")
        deleteIcon.id = 'delete'
        deleteIcon.classList.add('fa', 'fa-trash', 'mar-l-xs')
        listItem.appendChild(deleteIcon)
        list.appendChild(listItem)
        // this is just one idea; you don't need to use an icon. You could just use a button or a link!
      } //its a class not id----should i use shoelace class #note-form or #note-text
        noteList.appendChild(list) 
    })



// 4. Delete todo items
todoList.addEventListener('click', function (event) {
    //console log. (event.target)
let targetEl = event.target
if (targetEl.matches('#delete')) {
    deleteNoteItem(event.target.parentElement.dataset.id)
}
})

function deleteNoteItem (itemId) {
    let itemToDelete = document.querySelector(`li[data-id='${itemId}']`)
    fetch ('http://localhost:3000/notes/', {itemId}, {
method: 'DELETE'
})
.then(function () {
    document.querySelector('#item-list').removeChild(itemToDelete)
})
    // .then(response => response.json ())
    // .then(data => console.log(data))
    //   // Remove the item from the list
    // document.querySelector('#item-list').removeChild(itemToDelete)
    // })

}
renderNotes()