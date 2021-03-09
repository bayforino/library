const myLibrary = [];
const gridContainer = document.querySelector(".grid-container");
const addButton = document.querySelector(".add-book-button");
const emptyMessage = document.querySelector(".library-empty-message");
const main = document.querySelector("main");
const form = document.getElementById("book-form");

let newBook;

function sayIfRead(readStatus) {
  if (readStatus) {
    return `<p class="read">Read ✓</p>`;
  } else {
    console.log(readStatus);
    return `<p class="not-read">Not Read</p>`;
  }
}

function Book(title, author, length, readStatus) {
  this.title = title;
  this.author = author;
  this.length = length;
  this.readStatus = readStatus;
  this.info = `<h2>${this.title}</h2><p> by ${this.author}.</p> <p>${
    this.length
  } pages long.</p> ${sayIfRead(this.readStatus)}`;
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
  for (i = 0; i < gridItems.length; i++) {
    gridItems[i].setAttribute(`id`, i);
    clearButtons[i].setAttribute(`data-attribute`, i);
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
