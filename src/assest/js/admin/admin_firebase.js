import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getDatabase , ref , push , onValue , remove } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyA0cVkqdtT7Sp5nmr-RYn1k4CeDeEQmeqM",
  authDomain: "our-project-6d4a4.firebaseapp.com",
  projectId: "our-project-6d4a4",
  storageBucket: "our-project-6d4a4.appspot.com",
  messagingSenderId: "805479077338",
  appId: "1:805479077338:web:6c77c3377543c2e6ee9ce3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const books = ref(db,"books")
const catalog = ref(db,"catalog")


// add book
add_book_btn?.addEventListener('click',function(e){
    e.preventDefault()
    let book = 
        {
            book_id:globalData.id,
            book_name:book_name_input.value,
            book_author:book_author_input.value,
            book_img_url:book_img_input.value,
            book_description:book_description_textarea.value,
            book_is_new:is_New.checked,
            book_type:admin_dropdown_active_item.innerText
        }
    let book_type = {
        book_type:admin_dropdown_active_item.innerText
    }
    push(books,book)
    push(catalog,book_type)
})
let id = 1;
// read book
function renderBook(){
    let books_tbody = document.querySelector("#books_tbody")
    onValue(books, (snapshot) => {
        const bookData = snapshot.val();
        let bookDataToArr = Object.entries(bookData)
        let bookItem = bookDataToArr.map((item) => 
            `
                <tr>
                    <td class="mobil-id">${id++}</td>
                    <td class="custom_td">
                        <img class="admin_book_img" src="${item[1].book_img_url}" alt="">
                        ${item[1].book_name}
                    </td>
                    <td class="admin_book_description">
                        <div class="description_body">
                            <p class="description_item">
                                ${item[1].book_description}
                            </p>
                        </div>
                    </td>
                    <td>${item[1].book_type}</td>
                    <td>${item[1].book_author}</td>
                    <td>
                        <button class="delete_item" data-id="${item[0]}">
                            <i class="material-icons">&#xe872;</i>
                        </button>
                    </td>
                </tr>
            `
        ).join("")
        
        books_tbody.innerHTML = bookItem  


        let delete_item = document.querySelectorAll(".delete_item")
        console.log(delete_item);

        delete_item.forEach((el) => el.addEventListener('click',function(){
            let id = el.dataset.id
            deleteBookDetail(id)
        }))

    });
}
renderBook()

function deleteBookDetail(id) {
    let rmv = ref(db, "books/" + id);
    remove(rmv);
}

// delete
