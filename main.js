const myLibrary = [];
const gridContainer = document.querySelector(".grid-container");
const addButton = document.querySelector(".add-book-button");
const emptyMessage = document.querySelector(".library-empty-message");
const main = document.querySelector("main");


function Book(title, author, length, readStatus) {
  this.title = title;
  this.author = author;
  this.length = length;
  this.readStatus = readStatus;
  this.info = `<h2>${this.title}</h2><p> by ${this.author}.</p> <p>${this.length} pages long.</p> <p>${this.readStatus}</p>`;
}



function addBookToLibrary() {
  if (myLibrary.length >= 0) {
    emptyMessage.style.display = "none";
  }
  const title = prompt(`title`);
  const author = prompt(`author`);
  const length = prompt(`length`);
  const readStatus = prompt(`read status`);

  myLibrary.push(new Book(title, author, length, readStatus));
  generateLibrary();
}

function generateLibrary() {
  let div = document.createElement("div");
  div.classList.add("grid-item");

  gridContainer.appendChild(div);

  const gridItems = document.querySelectorAll(`.grid-item`);

  for (i = 0; i < myLibrary.length; i++) {
    gridItems[i].innerHTML = myLibrary[i].info;
    gridItems[i].setAttribute(`id`, i);
    createClearButton(gridItems);
  }
}

function createClearButton(gridItems) {
  let clearButton = document.createElement("button");
  clearButton.textContent = "X";
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
  for (i = 0; i < gridItems.length; i++) {
    gridItems[i].setAttribute(`id`, i);
    clearButtons[i].setAttribute(`data-attribute`, i);
  }
}

addButton.addEventListener("click", addBookToLibrary);
