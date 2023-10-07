
const login_joinbtn = document.querySelector(".login_joinbtn");
login_joinbtn.addEventListener("click", function () {
  const login_username = document.querySelector("#login_username").value.trim();
  const login_password = document.querySelector("#login_password").value.trim();

  if (!login_username || !login_password) {
    showMessage("Please write your username and password");
  }
  else{
    const userLoginObject={
        username:login_username,
        password:login_password
    }



    // console.log(userLoginObject);
  }
});

// function showMessage(message) {
//   const errorDiv = document.createElement("div");
//   errorDiv.classList.add("error-div")
//   errorDiv.style.backgroundColor = "#E16A00";
// const errorMessage="please write your password and username"
//   const messageText = document.createElement("span");
//   messageText.textContent = errorMessage;
//   errorDiv.appendChild(messageText);

//   errorDiv.style.position = "fixed";
//   errorDiv.style.top = "20px";
//   errorDiv.style.right = "20px";
//   errorDiv.style.padding = "10px";
//   errorDiv.style.zIndex = "9999";
//   errorDiv.style.borderRadius = "10px";

//   document.body.appendChild(errorDiv);

//   setTimeout(function () {
//    errorDiv.remove();
//   }, 2000);
// }