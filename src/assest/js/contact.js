const sendButton = document.querySelector(".sendButton");
var textLength = document.querySelector("#textLength");

sendButton.addEventListener("click", function () {
  const nameInput = document.querySelector(".name_Input").value.trim();
  const addressInput = document.querySelector(".address_Input").value.trim();
  const emailInput = document.querySelector(".email_Input").value.trim();
  const phoneInput = document.querySelector(".phone_Input").value.trim();
  const contactTextarea = document
    .querySelector("#contactTextarea")
    .value.trim();
  
  if (!nameInput || !addressInput || !emailInput || !phoneInput) {
    showMessage("Please fill in all fields.", true);
  } else if (emailInput.indexOf("@") === -1) {
    showMessage("Enter a valid email address.", true);
  } else {
    const contactObj = {
      name: nameInput,
      address: addressInput,
      email: emailInput,
      phone: phoneInput,
      message: contactTextarea,
    };
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
    // messageDiv.classList.add("message", "error");
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

function letterCounter() {
          var contactTextarea = document.querySelector("#contactTextarea");
          var enteredText = contactTextarea.value;
          var letterCount =enteredText.length;
  if (letterCount > 100) {
    contactTextarea.value = enteredText.substring(0, 100);
    letterCount = 100;
  }
  textLength.textContent = letterCount;
}
