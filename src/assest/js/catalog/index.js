import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getDatabase , ref , push , onValue , remove } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

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

const catalog = ref(db,"catalog")

function renderCatalog(){
    const link_group = document.querySelector("#link_group");
    onValue(catalog, (snapshot) => {
        const catalogData = snapshot.val();
        let catalogDataToArr = Object.entries(catalogData);
        let catalogItem = catalogDataToArr.map((item) => 
            `
                <div id="book_category" data-id="${item[0]}" class="catalog-link">
                    <a href="">${item[1].bookType}</a>
                </div>
            `
        ).join("");
        
        link_group.innerHTML = catalogItem;  
    });
}
renderCatalog();

