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

const search_button = document.querySelector('#search_button');



search_button.addEventListener('click', function(e){
    const order_input = document.querySelector('#order_input').value.trim().toLowerCase();
    const src_books_container = document.querySelector("#src_books_container");
    const silder_vectors = document.querySelector('#silder_vectors');
    if (!order_input) {
        alert('Please write any book name');
        return 
    }
    onValue(books, (snapshot) => {
        const booksData = snapshot.val();
        let booksDataToArr = Object.entries(booksData);
        let booksItem = booksDataToArr.filter((item) => item[1].book_name.toLowerCase().includes(order_input) 
        );
        console.log(booksItem);
        if (booksItem.length === 0) {
            alert('This book does not exist');
            return
        }

        let showItem = booksItem.map((item) => 
        `
        <div class="src_books">
            <div>
                <img src="${item[1].book_img_url}" alt="book image" />
            </div>
            <div class="writing">
                <h2 class="src_book_name">${item[1].book_name}</h2>
                <h3 class="writer_name">${item[1].book_author}</h3>
                 <p class="bookDescription">
                    ${item[1].book_description}
                </p>
            </div>
        </div>
        `
        ).join("");
        
        silder_vectors.classList.remove('d-none');
        src_books_container.innerHTML = showItem; 


    });

    

});