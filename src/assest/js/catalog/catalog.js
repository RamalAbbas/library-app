import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import {
  getDatabase,
  ref,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyD3HMmh8FzxCdO2KD_tHiBaJJsMrrk_04I",
  authDomain: "library-app-70dbd.firebaseapp.com",
  databaseURL: "https://library-app-70dbd-default-rtdb.firebaseio.com",
  projectId: "library-app-70dbd",
  storageBucket: "library-app-70dbd.appspot.com",
  messagingSenderId: "262039424716",
  appId: "1:262039424716:web:7c9204bea43337af8ebc69"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const catalog = ref(db, "catalog");
const books = ref(db, "books");

let globalBookArr;

function renderCatalogTypes() {
  let category_type_body = document.querySelector("#category_type_body");
  onValue(catalog, (snapshot) => {
    const catalogData = snapshot.val();
    let catalogDataToArr = Object.entries(catalogData);
    let catalogItem = catalogDataToArr
      .map(
        (item) =>
          `
                <li data-id="${item[0]}" id="catalog_book_type">${item[1].bookType}</li>
            `
      )
      .join("");

    category_type_body.innerHTML = catalogItem;

    let catalog_book_type = document.querySelectorAll("#catalog_book_type");
    catalog_book_type.forEach((item) =>
      item.addEventListener("click", function () {
        filterBookType(globalBookArr, item.innerText);
      })
    );
  });
}
renderCatalogTypes();

let card_body_all = document.querySelector("#formList");

function renderBooks() {
  onValue(books, (snapshot) => {
    const bookData = snapshot.val();
    let bookDataToArr = Object.entries(bookData);
    globalBookArr = bookDataToArr;
    let bookItem = bookDataToArr
      .map(
        (item) =>
          `
                    <div id="book_item" class="book-box item">
                        ${
                          item[1].book_is_new
                            ? `<div class="new_button">New</div>`
                            : ``
                        }
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
                        <div id="read_more_button" data-id="${
                          item[0]
                        }" class="book-read-more">Read more</div>

                    </div>
            `
      )
      .join("");
    card_body_all.innerHTML = bookItem;
    if (bookDataToArr.length >= 6) {
      document.querySelector("#slider1").classList.remove("slider_min_class");
    } else {
      document.querySelector("#slider1").classList.add("slider_min_class");
    }
    let read_more_button = document.querySelectorAll("#read_more_button");
    read_more_button.forEach((item) =>
      item.addEventListener("click", function (e) {
        e.preventDefault();
        let book_id = item.dataset.id;
        window.location.href = `../pages/book.html#id=${book_id}`;
      })
    );
  });
}
renderBooks();

let filterBookType = (arr, item) => {
  let resultBook = arr.filter((items) => items[1].book_type == item);
  let bookItem = resultBook
    .map(
      (item) =>
        `
                <div class="book-box item">
                    ${
                      item[1].book_is_new
                        ? `<div class="new_button">New</div>`
                        : ``
                    }
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
                        <div id="read_more_button" data-id="${
                          item[0]
                        }" class="book-read-more">Read more</div>
                </div>
        `
    )
    .join("");
  card_body_all.innerHTML = bookItem;
  if (resultBook.length >= 6) {
    document.querySelector("#slider1").classList.remove("slider_min_class");
  } else {
    document.querySelector("#slider1").classList.add("slider_min_class");
  }
  let read_more_button = document.querySelectorAll("#read_more_button");
  read_more_button.forEach((item) =>
    item.addEventListener("click", function (e) {
      e.preventDefault();
      let book_id = item.dataset.id;
      window.location.href = `../pages/book.html#id=${book_id}`;
    })
  );
};

let card_body_new = document.querySelector(".formListNew");
function renderNewBooks() {
  onValue(books, (snapshot) => {
    const bookData = snapshot.val();
    let bookDataToArr = Object.entries(bookData);
    let bookItem = bookDataToArr.map((item) => {
        if (item[1].book_is_new) {
          return `
                    <div id="book_item" class="book-box item">
                        <div class="new_button">New</div>
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
                        <div id="read_more_button" data-id="${
                            item[0]
                          }" class="book-read-more">Read more</div>
                    </div>
            
                `;
        }
      })
      .join("");
    card_body_new.innerHTML = bookItem;
      if (bookDataToArr.length >= 6) {
        document.querySelector("#slider1").classList.remove("slider_min_class");
      } else {
        document.querySelector("#slider1").classList.add("slider_min_class");
      }
      let read_more_button = document.querySelectorAll("#read_more_button");
      read_more_button.forEach((item) =>
        item.addEventListener("click", function (e) {
          e.preventDefault();
          let book_id = item.dataset.id;
          window.location.href = `../pages/book.html#id=${book_id}`;
        })
      );
  });
}
renderNewBooks();
