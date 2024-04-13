
const login_joinbtn = document.querySelector(".login_joinbtn");
const login_container = document.querySelector("#login_container")
const admin_container = document.querySelector("#admin_container")
const logout_button = document.querySelector("#logout_button")
login_joinbtn.addEventListener("click", function () {
  const login_username = document.querySelector("#login_username").value.trim();
  const login_password = document.querySelector("#login_password").value.trim();

  if (!login_username || !login_password) {
    showErrorMessage("Please write your username and password");
  }
  else{
    const userLoginObject={
        username:login_username,
        password:login_password
    }
    if(login_username == "admin" && login_password == "admin"){
        localStorage.setItem("token",true)
        login_container.style.display = "none"
        admin_container.style.display = "flex"
    }else{
      showErrorMessage("Please Enter correct username and password");
    }
  }
});
logout_button.addEventListener('click',function(){
  login_container.style.display = "flex"
  admin_container.style.display = "none"
  localStorage.removeItem("token")
})
console.log(localStorage.getItem("token"));
if(localStorage.getItem("token") == true){
  login_container.style.display = "none"
  admin_container.style.display = "flex"
  localStorage.setItem("token","true")

}else{
  login_container.style.display = "flex"
  admin_container.style.display = "none"
  localStorage.removeItem("token")
}

function showErrorMessage(message,isError) {
  const errorDiv = document.createElement("div");
  errorDiv.classList.add("error-div")
  errorDiv.style.backgroundColor = "#E16A00";
  const messageText = document.createElement("span");
  messageText.textContent = "Error:"+message
  errorDiv.appendChild(messageText);
  errorDiv.style.position = "fixed";
  errorDiv.style.top = "20px";
  errorDiv.style.right = "20px";
  errorDiv.style.padding = "10px";
  errorDiv.style.zIndex = "9999";
  errorDiv.style.borderRadius = "10px";
  document.body.appendChild(errorDiv);
  setTimeout(function () {
   errorDiv.remove();
  }, 3000);
}