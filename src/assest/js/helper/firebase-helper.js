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



function readData(collection) {
  const starCountRef = ref(db, collection);
  onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    const newData = Object.entries(data).map((item) => ({
      id: item[0],
      ...item[1]
    }));
    const passwords = newData.map((item) => item.password);
    const userName=newData.map((item)=>item.userName)
    console.log(newData);

    console.log("Passwords:", passwords);
    console.log("userName:",userName);
  
    const login_joinbtn = document.querySelector(".login_joinbtn");
    login_joinbtn.addEventListener("click", function () {
      const login_username = document.querySelector("#login_username").value.trim();
      const login_password = document.querySelector("#login_password").value.trim();
    
      const userIndex = userName.indexOf(login_username);
    
      if (userIndex !== -1 && passwords[userIndex] === login_password) {
    
        
        const adminData = {
          username: login_username,
          password: login_password,
        };
        
        const adminDataJSON = JSON.stringify(adminData);
        
        localStorage.setItem("userData", adminDataJSON);

        var adminPageURL = "../pages/admin.html";

        window.location.href = adminPageURL;
      } 
     
      else{if(!login_password || !login_username){
        showErrorMessage("Fill in all the information",true)
      
      }
      else{
        showErrorMessage("Username or password are incorrect",true)
      }
      }
      document.querySelector("#login_username").value=""
      document.querySelector("#login_password").value=""
    
      console.log("login_username", login_username);
      console.log("login_password", login_password);
    });
    
  })
}

readData("adminLogin");




//login end

