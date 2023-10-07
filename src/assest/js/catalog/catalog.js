import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getDatabase , ref , onValue } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

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

const catalog = ref(db,"catalog")
const books = ref(db,"books")

function renderCatalogTypes(){
    let category_type_body= document.querySelector("#category_type_body")
    onValue(catalog, (snapshot) => {
        const catalogData = snapshot.val();
        let catalogDataToArr = Object.entries(catalogData);
        let catalogItem = catalogDataToArr.map((item) => 
            `
                <li>${item[1].bookType}</li>
            `
        ).join("");
        
        category_type_body.innerHTML = catalogItem;  
    });
}
renderCatalogTypes();

function renderBooks(){
    let card_body_all= document.querySelector("#card_body_all")
    onValue(books, (snapshot) => {
        const bookData = snapshot.val();
        let bookDataToArr = Object.entries(bookData);
        let bookItem = bookDataToArr.map((item) => 
            `
                <div class="swiper-slide">
                    <div class="book-box">
                        ${item[1].book_is_new ? `<div class="new_button">New</div>` : ``}
                        <div>
                            <img
                                height="179px"
                                width="135px"
                                src="${item[1].book_img_url}"
                                alt=""
                            />
                        </div>

                        <div class="book-in-text1">${item[1].book_name}</div>
                        <div class="book-in-text2">${item[1].book_author}</div>
                            <a href="../pages/book.html">
                                <div class="book-read-more">Read more</div>
                            </a>
                        </div>
                    </div>
                </div>
            `
        ).join("");
        
        card_body_all.innerHTML = bookItem;  
    });
}
renderBooks()