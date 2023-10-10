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

const books = ref(db,"books")

let comment_input = document.querySelector(".comment_input");
let send_button = document.querySelector(".send_button");
let comment_main = document.querySelector(".comment_main");
send_button.addEventListener("click", function (e) {
  e.preventDefault();
  let listItem = `
        <div class="comment_box">
            <div class="comment_head">
                <p class="comment_name">anonim</p>
                <p class="comment_title">18:32 today</p>
            </div>
            <div class="comment_description">
                ${comment_input.value}
            </div>
        </div>
      `;

  comment_main.innerHTML += listItem;
  comment_input.value = "";
});

function getTimeDifferenceInDays(date) {
    const currentDate = new Date();
    const releaseDate = new Date(date);
    const timeDifferenceInMilliseconds = currentDate - releaseDate;
    const daysDifference = Math.floor(timeDifferenceInMilliseconds / (1000 * 60 * 60 * 24));
    return daysDifference;
  }
  

let book_url = window.location.hash
let book_length = book_url.length
let book_id = book_url.slice(4,book_length)
let book_page = document.querySelector("#book_page")
let renderBookPageDetails = () => {
    onValue(books, (snapshot) => {
        const bookData = snapshot.val();
        let bookDataToArr = Object.entries(bookData);
        let bookPageArr = bookDataToArr.filter((item) => item[0] == book_id)
        let bookPage = bookPageArr.map((item) => {
            const daysAgo = getTimeDifferenceInDays(item[1].book_date);

            return  `
                <div class="book_top">
                    <div class="book_text">
                        <a class="back_navigation" href="./catalog-page.html">
                            <button class="back_btn">
                                &lt; BACK </button>
                        </a>
                        <a href="">
                            <button class="btn_primary">
                                ${item[1].book_apperance.slice(0,4)}
                            </button>
                        </a>
                        <p class="book_name">${item[1].book_name}</p>
                        <p class="book_apperance">${daysAgo} Days Ago</p>
                        <p class="book_writer">${item[1].book_author}</p>
                        <p class="book_description book_description_web">
                            ${item[1].book_description}
                        </p>

                        <form class="comment_form" action="">
                            <input class="comment_input" type="text" placeholder="your anonim comment...">
                            <button class="send_button">
                                <img src="../assest/icons/bookpage/send.svg" alt="">
                            </button>
                                
                        </form>

                        <div class="comment_main">
                            

                        </div>
                    </div>
                    <div class="book_img">
                    ${item[1].book_is_new ? `<div class="new_information_box">New</div>` : ``} 
                        <img src="${item[1].book_img_url}" alt="">
                    </div>
                </div>
            `
        })
        book_page.innerHTML = bookPage
    });
}
renderBookPageDetails()