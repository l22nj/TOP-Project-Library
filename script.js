const myLibrary = [];

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

function resetDisplayedBooks() {
    let displayedBooks = document.querySelector(".main .books");
    while (displayedBooks.lastElementChild) {
        displayedBooks.removeChild(displayedBooks.lastElementChild);
    }
}

function updateLibrary(book="") {
    resetDisplayedBooks();
    for (let book of myLibrary) {
        // let item = document.createElement("div");
        // item.setAttribute("class", "filler");
        // document.querySelector(".main > .books")
        //     .appendChild(item);
        let bookContainer =  document.createElement("div");
        bookContainer.setAttribute("class", "book");
        bookContainer.setAttribute("id", book.id);

        let bookImage = document.createElement("img");
        bookImage.setAttribute("class", "bookImage");

        let url = book.url ? book.url : "";
        bookImage.setAttribute("src", url);
        bookImage.setAttribute("alt", book.title);

        //
        // for (let prop in book) {
        //     if (!prop) continue;
        //     if (prop.)
        // }

        document.querySelector(".main > .books").appendChild(bookContainer);
    }
}

const dummyBook1 = new Book("Paradise Lost", "John Milton");
const dummyBook2 = new Book("Samson Agonistes", "John Milton");

const dummyBooks = [dummyBook1, dummyBook2];

myLibrary.push(...dummyBooks);

const formAddBook = document.querySelector("#form-add-book");

formAddBook.addEventListener("submit", function(event) {
    event.preventDefault();
    myLibrary.push(createBook(this));
    updateLibrary();
    this.reset();
})