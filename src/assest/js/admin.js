let admin_search_input = document.querySelector("#admin_search_input");
let admin_search_button = document.querySelector("#admin_search_button");
let admin_result = document.querySelector("#admin_result");

admin_search_input.addEventListener('input', function (e) {
    admin_result.classList.add("active");
    let book_name = e.target.value;
    setTimeout(() => {
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${book_name}`)
            .then((res) => res.json())
            .then((data) => {
                let book_result = data.items.map((book_item) =>
                    `
                        <div data-book-id='${book_item.id}' onclick="getData('${book_item.id}')" id="admin_result_item" class="admin_result_item">
                            <img src="../assest/icons/admin/search/history.svg" alt="">
                            ${book_item.volumeInfo.title}
                        </div>
                    `
                ).join("");
                admin_result.innerHTML = book_result;
            });
    }, 2000);
});

let book_name_input = document.querySelector("#book_name_input")
let book_author_input = document.querySelector("#book_author_input")
let book_img_input = document.querySelector("#book_img_input")
let book_description_textarea = document.querySelector("#book_description_textarea")
let book_type_input = document.querySelector("#book_type_input")

function getData(bookId){
    fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}`)
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        book_name_input.placeholder = data.volumeInfo.title
        book_author_input.placeholder = data.volumeInfo.authors[0]
        book_img_input.placeholder = data.volumeInfo.infoLink
        book_description_textarea.placeholder = data.volumeInfo.description
        book_type_input.placeholder = data.volumeInfo.industryIdentifiers.map((item) =>  item.type)
    });
}