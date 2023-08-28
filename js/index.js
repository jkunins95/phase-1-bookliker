const BASE_URL = "http://localhost:3000";

const listPanel = document.querySelector("#list-panel");
const bookList = document.querySelector("#list");
const showPanel = document.querySelector("#show-panel");

document.addEventListener("DOMContentLoaded", function() {
    listBooks();
});

function listBooks() {
    fetch(`${BASE_URL}/books`)
    .then(resp => resp.json())
    .then(function(resp) {
        resp.forEach(function(title) {
            displayTitles(title)
        })
    })
    .catch(function(err) {
        console.log(err)
    })
};

function displayTitles(books) {
    const titleList = document.createElement("li");
    titleList.className = "title-list";
    titleList.textContent = books.title;

    bookList.append(titleList);

    titleList.addEventListener("click", () => bookDetails(books))
};

function bookDetails(books) {
    const title = document.createElement("h1");
    title.textContent = books.title;

    const author = document.createElement("h2");
    author.textContent = books.author;

    const subtitle = document.createElement("h2");
    subtitle.textContent = books.subtitle;

    const description = document.createElement("p");
    description.textContent = books.description;

    const img = document.createElement("img");
    img.src = books.img_url;
    img.className = "img";

    const users = document.createElement("ul");
    books.users.forEach(user => {
        const userListItem = document.createElement("li");
        userListItem.textContent = user.username
        users.append(userListItem)
    })

    const likeBttn = document.createElement("button");
    likeBttn.textContent = "Like"
    likeBttn.addEventListener("click", () => submitLike(books))

    // If showPanel is already populated, remove its children so that it does not continously keep adding to the panel
    while(showPanel.firstChild) {
        showPanel.removeChild(showPanel.lastChild)
    };

    showPanel.append(img, title, author, subtitle, description, users, likeBttn);
};

function submitLike(books) {
    const newUserData = {
        "id": 1,
        "username": "pouros"
    };
    books.users.push(newUserData);

    fetch(`${BASE_URL}/books/${books.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({users: books.users})
    })
    .then(resp => {
        if(resp.ok) {
            console.log("Book liked successfully")
        } else {
            console.error("Failed to like the book")
        }
    })
    .catch(err => {
        console.error("An error occurred", err)
    })
};

const books = {
    "id": 123,
    "users": []
};
submitLike(books)