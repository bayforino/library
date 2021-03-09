const myLibrary = [];
const gridContainer = document.querySelector(".grid-container");
const addButton = document.querySelector(".add-book-button");
const emptyMessage = document.querySelector(".library-empty-message");
const main = document.querySelector("main");
const form = document.getElementById("book-form");


let newBook;

function sayIfRead(readStatus) {
  if (readStatus) {
    return `<p class="read-text" id="read">Read ✓</p>`;
  } else {
    return `<p class="read-text" id="not-read">Not Read</p>`;
  }
}

function Book(title, author, length, readStatus) {
  this.title = title;
  this.author = author;
  this.length = length;
  this.readStatus = readStatus;
  this.info = `<h2>${this.title}</h2><p> by ${this.author}.</p> <p>${
    this.length
  } pages long.</p>`;
}

function generateLibrary() {
  let div = document.createElement("div");
  div.classList.add("grid-item");

  gridContainer.appendChild(div);

  const gridItems = document.querySelectorAll(`.grid-item`);

  for (i = 0; i < myLibrary.length; i++) {
    gridItems[i].innerHTML = myLibrary[i].info;
    gridItems[i].setAttribute(`id`, i);
    createReadText(gridItems);
    createClearButton(gridItems);
  }
}

function createReadText(gridItems) {
  let readText = document.createElement("p");
  readText.classList.add('read-text');
  if (myLibrary[i].readStatus){
  readText.textContent = "Read ✓";
} else {
  readText.textContent = "Not read";
  readText.setAttribute(`id`, `not-read`);
}
readText.setAttribute(`data-attribute`, i);
gridItems[i].appendChild(readText);
readText.addEventListener("click", (e) => {
  const readText = document.querySelectorAll('.read-text');
  
  if (myLibrary[e.target.dataset.attribute].readStatus){
    myLibrary[e.target.dataset.attribute].readStatus = false;
    readText[e.target.dataset.attribute].setAttribute(`id`, `not-read`);
    readText[e.target.dataset.attribute].textContent = "Not read"
  } else { 
    myLibrary[e.target.dataset.attribute].readStatus = true;
    readText[e.target.dataset.attribute].removeAttribute(`id`, `not-read`);
    readText[e.target.dataset.attribute].textContent = "Read ✓"
}

})
}

function createClearButton(gridItems) {
  let clearButton = document.createElement("button");
  clearButton.textContent = "✖";
  clearButton.setAttribute(`data-attribute`, i);
  clearButton.classList.add("remove-button");
  gridItems[i].appendChild(clearButton);
  clearButton.addEventListener("click", removeBookFromLibrary);
}



function removeBookFromLibrary(e) {
  myLibrary.splice(e.target.dataset.attribute, 1);
  let itemToRemove = document.querySelector(
    `[id="${e.target.dataset.attribute}"]`
  );
  gridContainer.removeChild(itemToRemove);

  resetDataTagOrder();

  if (myLibrary.length === 0) {
    emptyMessage.style.display = "inherit";
  }
}

function removeAllBooks() {
  gridContainer.textContent = "";
}

function resetDataTagOrder() {
  const gridItems = document.querySelectorAll(`.grid-item`);
  const clearButtons = document.querySelectorAll(`.remove-button`);
  const readText = document.querySelectorAll(`.read-text`);
  for (i = 0; i < gridItems.length; i++) {
    gridItems[i].setAttribute(`id`, i);
    clearButtons[i].setAttribute(`data-attribute`, i);
    readText[i].setAttribute(`data-attribute`, i);
  }
}

function openForm() {
  form.style.display = "block";
}

function closeForm() {
  form.style.display = "none";
}



addButton.addEventListener("click", openForm);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (myLibrary.length >= 0) {
    emptyMessage.style.display = "none";
  }
  let formValue = event.target.elements;

  newBook = new Book(
    formValue.title.value,
    formValue.author.value,
    formValue.pages.value,
    formValue.read.checked
  );

  myLibrary.push(newBook);
  closeForm();
  generateLibrary();
});
