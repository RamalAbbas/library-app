let comment_input = document.querySelector(".comment_input");
let send_button = document.querySelector(".send_button");
let comment_description = document.querySelector(".comment_description");

send_button.addEventListener("click", function (e) {
  e.preventDefault();
  let inputValue = comment_input.value;
  comment_input.value = "";

     
    
  comment_description.innerHTML = inputValue;
});
