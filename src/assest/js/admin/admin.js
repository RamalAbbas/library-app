let searchBook = (book_name) => {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${book_name}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
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
}

let getData = (bookId) => {
    fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}`)
    .then((res) => res.json())
    .then((data) => {
        book_name_input.placeholder = data.volumeInfo.title
        book_author_input.placeholder = data.volumeInfo.authors[0]
        book_img_input.placeholder = data.volumeInfo.infoLink
        book_description_textarea.placeholder = data.volumeInfo.description
        book_type_input.placeholder = data.volumeInfo.industryIdentifiers.map((item) =>  item.type)
        admin_search_input.value = data.volumeInfo.title
        add_book_btn.addEventListener('click',function(e){
            e.preventDefault()
            sendData(data)
        })
    });
}


let sendData = (book_data) => {
    console.log(book_data);
}