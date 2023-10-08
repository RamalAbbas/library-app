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

let globalBookArr;

function renderCatalogTypes(){
    let category_type_body = document.querySelector("#category_type_body")
    onValue(catalog, (snapshot) => {
        const catalogData = snapshot.val();
        let catalogDataToArr = Object.entries(catalogData);
        let catalogItem = catalogDataToArr.map((item) => 
            `
                <li id="catalog_book_type">${item[1].bookType}</li>
            `
        ).join("");
        
        category_type_body.innerHTML = catalogItem;  

        let catalog_book_type = document.querySelectorAll("#catalog_book_type")
        catalog_book_type.forEach((item) => item.addEventListener('click',function(){
            filterBookType(globalBookArr,item.innerText);
        }))
    });
}
renderCatalogTypes();

let card_body_all= document.querySelector("#card_body_all")

function renderBooks(){
    onValue(books, (snapshot) => {
        const bookData = snapshot.val();
        let bookDataToArr = Object.entries(bookData);
        globalBookArr = bookDataToArr
        let bookItem = bookDataToArr.map((item) => 
            `
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
                            <div id="read_more_button" data-id="${item[0]}" class="book-read-more">Read more</div>
                        </div>
                    </div>
            `
        ).join("");
        card_body_all.innerHTML = bookItem; 
        
        let read_more_button = document.querySelectorAll("#read_more_button")
        read_more_button.forEach((item) => item.addEventListener('click',function(e){
            e.preventDefault()
            let book_id = item.dataset.id
            window.location.href = `../pages/book.html#id=${book_id}`
        }))
    });
}
renderBooks()

let filterBookType = (arr,item) => {
    let resultBook = arr.filter((items) => items[1].book_type == item )
    let bookItem = resultBook.map((item) => 
        `
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
                        <a data-id="${item[1].book_id}" href="../pages/book.html">
                            <div  class="book-read-more">Read more</div>
                        </a>
                    </div>
                </div>
        `
    ).join("");
    card_body_all.innerHTML = bookItem;  
}

// let card_body_new = document.querySelector("#card_body_new")
// function renderNewBooks(){
//     onValue(books, (snapshot) => {
//         const bookData = snapshot.val();
//         let bookDataToArr = Object.entries(bookData);
//         globalBookArr = bookDataToArr
//         let bookItem = bookDataToArr.map((item) => {
//             if(item[1].book_is_new){
//               return  `
//                 <div class="swiper-slide">
//                     <div class="book-box">
//                         <div class="new_button">New</div>
//                         <div>
//                             <img
//                                 height="179px"
//                                 width="135px"
//                                 src="${item[1].book_img_url}"
//                                 alt=""
//                             />
//                         </div>

//                         <div class="book-in-text1">${item[1].book_name}</div>
//                         <div class="book-in-text2">${item[1].book_author}</div>
//                             <a href="../pages/book.html">
//                                 <div class="book-read-more">Read more</div>
//                             </a>
//                         </div>
//                     </div>
//                 </div>
//                 `
//             }
        
//         }).join("");
//         card_body_new.innerHTML = bookItem;  
//         console.log(globalBookArr);
//     });
// }
// renderNewBooks()