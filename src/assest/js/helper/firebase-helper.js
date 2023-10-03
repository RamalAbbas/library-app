// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getDatabase , ref , push , onValue} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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

const users = ref(db,"users")

// selector
let fullname_input = document.querySelector("#fullname_input")
let email_input = document.querySelector("#email_input")
let join_btn = document.querySelector("#join_btn")


join_btn?.addEventListener('click',function(e){
    e.preventDefault();
    let userInformation = {
        fullname: fullname_input.value,
        email: email_input.value
    }
    push(users,userInformation)
    fullname_input.value = ""
    email_input.value = ""
})

onValue(users, (snapshot) => {
  const data = snapshot.val();
  console.log(Object.entries(data));
});