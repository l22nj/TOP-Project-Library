const myLibrary = [];

let html = document.querySelector('html');

let bookHeight = getComputedStyle(html).getPropertyValue('--book-height');
let bookWidth = getComputedStyle(html).getPropertyValue('--book-width');

bookHeight = bookHeight.split('px')[0];
bookWidth = bookWidth.split('px')[0];

function Book(title, author = null,
              pages= 0, imgURL = null) {
    if (!new.target) {
        console.log("Error: no 'new' keyword when creating Book element");
        return;
    }
    this.title = title;
    if (author) this.author = author;
    else this.author = "Unknown author";
    if (!isNaN(pages)) this.pages = pages;
    else this.pages = null;
    this.url = imgURL;
    this.id = crypto.randomUUID();
}

function createBook(form) {
    let bookProperties = [...form.getElementsByTagName("input")].map(input => input.value);
    return new Book(...bookProperties);
}

function addBook(book) {
    myLibrary.push(book);
}

function removeBook(id) {
    for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].id === id) {
            myLibrary.splice(i, 1);
            return;
        }
    } console.log("Error: book to remove not present in library");
}

function resetDisplayedBooks() {
    let displayedBooks = document.querySelector(".main .books");
    while (displayedBooks.lastElementChild) {
        displayedBooks.removeChild(displayedBooks.lastElementChild);
    }
}

function updateLibrary() {
    resetDisplayedBooks();
    let displayedBooks = document.querySelector(".main > .books");
    for (let book of myLibrary) {
        let bookContainer =  document.createElement("div");
        bookContainer.setAttribute("class", "book");
        bookContainer.setAttribute("id", book.id);

        let bookImageContainer = document.createElement("div");
        bookImageContainer.setAttribute("class", "bookImageContainer");
        bookContainer.appendChild(bookImageContainer);

        let bookImage = document.createElement("img");
        bookImageContainer.appendChild(bookImage);

        let bookButtons = document.createElement("div");
        bookButtons.setAttribute("class", "bookButtonContainer");
        bookContainer.appendChild(bookButtons);

        let editButton = document.createElement("button");
        // editButton.setAttribute("class", "editButton");
        editButton.innerText = 'Edit';
        bookButtons.appendChild(editButton);

        editButton.addEventListener("click", () => {
            alert("Edit! Work in progress...");
            updateLibrary();
        })

        let removeButton = document.createElement("button");
        // removeButton.setAttribute("class", "removeButton");
        removeButton.innerText = 'X'
        bookButtons.appendChild(removeButton);

        removeButton.addEventListener("click", () => {
            removeBook(book.id);
            updateLibrary();
        });

        if (book.url) bookImage.setAttribute("src", book.url);
        bookImage.setAttribute("alt", book.title);

        let titleText = document.createElement("p");
        titleText.innerText = book.title;
        bookContainer.appendChild(titleText);

        let authorText = document.createElement("p");
        authorText.innerText = book.author;
        bookContainer.appendChild(authorText);

        if (book.pages) {
            let pagesText = document.createElement("p");
            pagesText.innerText = book.pages + " pages";
            bookContainer.appendChild(pagesText);
        }

        displayedBooks.appendChild(bookContainer);
    }
}

const dummyBook1 = new Book("Paradise Lost", "John Milton", 0, "https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/william-blake-adam-eve-granger.jpg");
const dummyBook2 = new Book("Samson Agonistes", "John Milton", 0, "https://i.pinimg.com/originals/22/62/b3/2262b3eeccbb039eaeba921e8dc8597b.jpg");

const dummyBooks = [dummyBook1, dummyBook2];

myLibrary.push(...dummyBooks);

updateLibrary();

const formAddBook = document.querySelector("#form-add-book");

formAddBook.addEventListener("submit", function(event) {
    event.preventDefault();
    addBook(createBook(this));
    updateLibrary();
    this.reset();
})