// List Books

// When the page loads, get a list of books from `http://localhost:3000/books` and
// display their titles by creating a `li` for each book and adding each `li` to
// the `ul#list` element.
const BOOKS_API = "http://localhost:3000/books";
const bookListElement = document.getElementById("book-list");
const myUser = {
    id: 666,
    username: "jyeo"
}

fetch(BOOKS_API)
    .then(resp => resp.json())
    .then(renderBooks);


function renderBooks(books) {
    books.forEach(renderBook)
    // console.log(books)
}

function renderBook(book) {
    const bookListItem = document.createElement("li");
    bookListItem.textContent = book.title;

    bookListItem.addEventListener("click", () => renderShowPanel(book));
    bookListElement.append(bookListItem);
}
    
function renderShowPanel(book) {
    () => {
        const showPanel = document.getElementById("show-panel");

        showPanel.innerHTML = `
        <img src="${book.img_url}" alt="${book.title}" />
        <div><b>${book.title}</b></div>
        <div><b>${book.subtitle}</b></div>
        <div><b>${book.author}</b></div>
        <div><b>${book.description}</b></div>
        <ul>
            // map is used ONLY for arrays
            ${book.users.map(user => `<li>${user.username}</li>`).join('')}
        </ul>
        `
        // Alternative method for slapping the book usernames onto the DOM
        // const userList = document.createElement("ul")
        // book.users.forEach(user => {
        //     const userLi = document.createElement("li")
        //     userLi.textContent = user.username
        //     userList.append(userLi)
        // })
        // showPanel.append(userList);

        const likeButton = document.createElement("button");
        likeButton.textContent = "LIKE";
        likeButton.addEventListener("click", () => {
            // PATCH request would go here, when it comes back, do a get and render again OR do this:
            book.users.push(myUser);
            renderShowPanel(book);
        })

        showPanel.append(likeButton);
    };
};

// When a user clicks the title of a book, display the book's thumbnail, description,
// and a list of users who have liked the book. This information should be displayed in
// the `div#show-panel` element.

