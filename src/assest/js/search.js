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

const books = ref(db,"books");

let list_search = document.getElementById("list-search");



const bookAdminItem = `
    <div class="item-search">
    <div class="avatar-search">
        <img src="../assest/images/search-page/book.svg">
    </div>
        <div class="content-slider-search">
                <h2>Order in Chaos</h2>
                <p class="content-search-name">Konstantin Koptelov</p>
                <p class="content-search-about">We work without holidays and weekends! Residents of Kiev can receive an order on the day of its registration. Customers from other cities of Ukraine can receive an order within 1-5 days, depending on the location of the settlement and the selected delivery method. Orders over UAH 1000 are delivered  free of charge *. You can see the available methods, exact terms and cost of delivery during checkout in the order basket, after selecting the delivery city</p>
        </div>
    </div>
    `
list_search.innerHTML = bookAdminItem





const search_input = document.querySelector("#search_input");
const search_button = document.querySelector("#search_button");

search_button.addEventListener("click", function (e) {
    e.preventDefault()
    filterBook(search_input.value);
})

const filterBook = (name) => {
    // console.log(name);
    onValue(books, (snapshot) => {
        const bookAdminData = snapshot.val();
        const bookAdminArr = Object.entries(bookAdminData);

        let resultArr = bookAdminArr.filter((item) => {
            return item[1].book_name == name
        })
        let prev_search = document.getElementById("prev-search")
        let next_search = document.getElementById("next-search")
        if (resultArr.length == 1) {
            prev_search.style.display = "none"
            next_search.style.display = "none"
        } else {
            prev_search.style.display = "flex"
            next_search.style.display = "flex"
        }
    
        const bookAdminItem = resultArr.map((item) => `
            <div class="item-search">
            <div class="avatar-search">
                <img src="${item[1].book_img_url}">
            </div>
                <div class="content-slider-search">
                        <h2>${item[1].book_name}</h2>
                        <p class="content-search-name">${item[1].book_author
                        }</p>
                        <p class="content-search-about">${item[1].book_description}</p>
                </div>
            </div>
        `)
        list_search.innerHTML = bookAdminItem
    })

}

// search slider
let prev_search = document.getElementById("prev-search");
let next_search = document.getElementById("next-search");


prev_search.addEventListener("click", function () {
    const widthItem = document.querySelector('.item-search').offsetWidth;
    document.getElementById('formList-search').scrollLeft -= widthItem;
})

next_search.addEventListener("click", function () {
    const widthItem = document.querySelector('.item-search').offsetWidth;
    document.getElementById('formList-search').scrollLeft += widthItem;
})


setInterval(() => {
    next_search.click()
}, 3000);
// const search_button = document.querySelector('#search_button');



// search_button.addEventListener('click', function(e){
//     const order_input = document.querySelector('#order_input').value.trim().toLowerCase();
//     const src_books_container = document.querySelector("#formList-search");
//     const silder_vectors = document.querySelector('#silder_vectors');
//     if (!order_input) {
//         alert('Please write any book name');
//         return 
//     }
//     onValue(books, (snapshot) => {
//         const booksData = snapshot.val();
//         let booksDataToArr = Object.entries(booksData);
//         let booksItem = booksDataToArr.filter((item) => item[1].book_name.toLowerCase().includes(order_input) 
//         );
//         console.log(booksItem);
//         if (booksItem.length === 0) {
//             alert('This book does not exist');
//             return
//         }

//         let showItem = booksItem.map((item) => 
//         `
//         <div class="src_books">
//             <div>
//                 <img src="${item[1].book_img_url}" alt="book image" />
//             </div>
//             <div class="writing">
//                 <h2 class="src_book_name">${item[1].book_name}</h2>
//                 <h3 class="writer_name">${item[1].book_author}</h3>
//                  <p class="bookDescription">
//                     ${item[1].book_description}
//                 </p>
//             </div>
//         </div>
//         `
//         ).join("");
        
//         silder_vectors.classList.remove('d-none');
//         src_books_container.innerHTML = showItem; 


//     });

    

// });