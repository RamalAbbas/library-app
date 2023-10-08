import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getDatabase , ref , push , onValue , remove , update} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

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
const about = ref(db,"about")

// book part
let date = new Date
let create_book_date = `${date.getFullYear()}:${date.getMonth()}:${date.getDay()}`
// add book
add_book_btn?.addEventListener('click',function(e){
    e.preventDefault()
    console.log(globalData);
    let book = {
            book_id:globalData.id,
            book_name:book_name_input.value,
            book_author:book_author_input.value,
            book_img_url:book_img_input.value,
            book_description:book_description_textarea.value,
            book_is_new:is_New.checked,
            book_type:admin_dropdown_active_item.innerText,
            book_apperance:globalData.volumeInfo.publishedDate,
            book_date:create_book_date,
    }
    push(books,book)
    categoriesSorter(admin_dropdown_active_item.innerText)
})
let id = 1;
// read book
function renderBook(){
    let books_tbody = document.querySelector("#books_tbody")
    onValue(books, (snapshot) => {
        const bookData = snapshot.val();
        if(!bookData){
            books_tbody.classList.add("d-none")
        }else{
            books_tbody.classList.remove("d-none")
        }
        let bookDataToArr = Object.entries(bookData)
        let bookItem = bookDataToArr.map((item) => 
            `
                <tr class="a">
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

// delete book
function deleteBookDetail(id) {
    let rmv = ref(db, "books/" + id);
    remove(rmv);
}

// book type

function renderCatalog(){
    onValue(catalog,(snapshot) => {
        const catalogData = snapshot.val();
        let catalogDataToArr = Object.entries(catalogData)
        let catalogItem = catalogDataToArr.map((item) => 
            `
            <div class="admin_dropdown_item">
                ${item[1].bookType}                
            </div>
            `
        ).join("")
        
        admin_dropdown_item_main.innerHTML = catalogItem  

        let admin_dropdown_item = document.querySelectorAll(".admin_dropdown_item")
        admin_dropdown_item.forEach((item) => item.addEventListener('click',function(){
            admin_dropdown_active_item.innerHTML = item.innerText
            admin_dropdown_item_main.classList.remove("active")
        }))
    })
}
renderCatalog()
// about page

// add about info
add_info?.addEventListener('click',function(e){
    e.preventDefault()
    let about_info = {
        title: about_title_input.value,
        book_img_url: about_image_url_input.value,
        description: about_description_textarea.value,
    };
    if(!about_title_input.value || !about_image_url_input.value || !about_description_textarea.value){
        alert("formu doldurun")
    }else{
        update(about, about_info);
    }
})

// read about
function renderAbout(){
    let about_container = document.querySelector("#about_container")
    onValue(about, (snapshot) => {
        const aboutData = snapshot.val();
       
        // let aboutDataToArr = Object.entries(aboutData)
        let aboutItem = [aboutData].map((item) => 
            `
                <div class="text_container">
                    <p class="about_title">
                        ${item.title}
                    </p>
                    <p class="about_description">
                        ${item.description}
                    </p>
                </div>
                <div class="about_book_img_body">
                    <img src="${item.book_img_url}" alt="">
                </div>
            `
        ).join("")
        about_container.innerHTML = aboutItem
    });
}
renderAbout()


function categoriesSorter(categories) {
    let arr = [];
    onValue(catalog, (snapshot) => {
      const data = snapshot.val();
      let catagorieArr = Object.entries(data);
      catagorieArr.forEach((item) => {
        arr.push(item[1].bookType);
      });
      if(!arr.includes(categories)) {
        push(catalog, {
          bookType: admin_dropdown_active_item.innerText,
        });
      }
    });
}