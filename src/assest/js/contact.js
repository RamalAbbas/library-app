
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

const contact = ref(db,"contact")
const sendButton = document.querySelector(".sendButton");
var textLength = document.querySelector("#textLength");

sendButton?.addEventListener("click", function (e) {
  e.preventDefault()
  const nameInput = document.querySelector(".name_Input").value.trim();
  const addressInput = document.querySelector(".address_Input").value.trim();
  const emailInput = document.querySelector(".email_Input").value.trim();
  const phoneInput = document.querySelector(".phone_Input").value.trim();
  const contactTextarea = document
    .querySelector("#contactTextarea")
    .value.trim();
  
  if(!nameInput || !addressInput || !emailInput || !phoneInput) {
    showMessage("Please fill in all fields.", true);
  }else if (emailInput.indexOf("@") === -1) {
    showMessage("Enter a valid email address.", true);
  }else {
    const contactObj = {
      name: nameInput,
      address: addressInput,
      email: emailInput,
      phone: phoneInput,
      message: contactTextarea,
    };
    push(contact,contactObj)
    document.querySelector(".name_Input").value = "";
    document.querySelector(".address_Input").value = "";
    document.querySelector(".email_Input").value = "";
    document.querySelector(".phone_Input").value = "";
    document.querySelector("#contactTextarea").value = "";
    showMessage("Successful process", false);
    textLength.textContent = "0";

    console.log(contactObj);
  }
});
function showMessage(message, isError) {
  const messageDiv = document.createElement("div");
  if (isError) {
    messageDiv.textContent = "Error: " + message;
    messageDiv.classList.add("message", "error");
    messageDiv.style.backgroundColor = "red";
  } else {
    messageDiv.textContent = message;
    messageDiv.classList.add("message", "success");
    messageDiv.style.backgroundColor = "green";
  }
  messageDiv.style.position = "fixed";
  messageDiv.style.top = "0";
  messageDiv.style.right = "0";
  messageDiv.style.padding = "10px";
  messageDiv.style.zIndex = "9999";
  document.body.appendChild(messageDiv);
  setTimeout(function () {
    messageDiv.remove();
  }, 3000);
}
let id = 1

let contact_tbody = document.querySelector("#contact_tbody")
onValue(contact, (snapshot) => {
    const contactData = snapshot.val();
    let contactDataToArr = Object.entries(contactData)
    let contactItem = contactDataToArr.map((item) => 
        `
        <tr>
            <td class="mobil-id">${id++}</td>
            <td>${item[1].name}</td>
            <td>${item[1].email}</td>
            <td>${item[1].address}</td>
            <td>${item[1].phone}</td>
        </tr>           
        `
    ).join("")
    contact_tbody ? contact_tbody.innerHTML = contactItem  : null 
});

contactTextarea?.addEventListener("input", function () {
  letterCounter();
});

function letterCounter() {
          var enteredText = contactTextarea.value;
          var letterCount =enteredText.length;
  if (letterCount > 100) {
    contactTextarea.value = enteredText.substring(0, 100);
    letterCount = 100;
  }
  textLength.textContent = letterCount;
}
