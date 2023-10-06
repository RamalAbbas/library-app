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

// join us start
const users = ref(db,"users")

// selector
let fullname_input = document.querySelector("#fullname_input")
let email_input = document.querySelector("#email_input")
let join_btn = document.querySelector("#join_btn")
let join_tbody = document.querySelector("#join_tbody")

let id  = 1 
join_btn?.addEventListener('click',function(e){
    e.preventDefault();

    if(email_input.value == 0 || fullname_input.value == 0){
        alert("formu doldurun")
    }else{
      let userInformation = {
        fullname: fullname_input.value,
        email: email_input.value
      }
      push(users,userInformation)
      fullname_input.value = ""
      email_input.value = ""
    }

})

function render(){
  onValue(users, (snapshot) => {
    const data = snapshot.val();
    let dataToArr = Object.entries(data)
    let dataItem = dataToArr.map((item) => `
          <tr>
            <td class="mobil-id">${id++}</td>
            <td>${item[1].fullname}</td>
            <td>${item[1].email}</td>
          </tr>
        `
    ).join("")
    join_tbody ? join_tbody.innerHTML = dataItem   : null
  });
}
render()

// join us over


//login start//

function writePushData(collection,data) {
  const colRef = ref(db, collection);
  push(colRef, data);
}
function readData(collection, onData) {
  const colRef = ref(db, collection);
  onValue(colRef, (snapshot) => {
    const data = snapshot.val();
    onData(data);
  });
}

readData("adminLogin", (adminLoginData) => {
  console.log(adminLoginData);

});

