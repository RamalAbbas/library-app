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

const catalog = ref(db,"catalog")

function renderCatalog(){
    const link_group = document.querySelector("#link_group");
    onValue(catalog, (snapshot) => {
        const catalogData = snapshot.val();
        let catalogDataToArr = Object.entries(catalogData);
        let catalogItem = catalogDataToArr.map((item) => 
            `
                <div class="catalog-link">
                    <a href="">${item[1].bookType}</a>
                </div>
            `
        ).join("");
        
        link_group.innerHTML = catalogItem;  

    });
}
renderCatalog();