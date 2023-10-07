
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