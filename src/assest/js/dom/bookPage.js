// let comment_input = document.querySelector(".comment_input");
// let send_button = document.querySelector(".send_button");
// let comment_description = document.querySelector(".comment_description");

// send_button.addEventListener("click", function (e) {
//   e.preventDefault();
//   let inputValue = comment_input.value;

//   comment_description.innerHTML = inputValue;
//   comment_input.value = "";
// });

let comment_input = document.querySelector(".comment_input");
let send_button = document.querySelector(".send_button");
let comment_description = document.querySelector(".comment_description");
let comment_main = document.querySelector(".comment_main");
console.log(comment_main);
send_button.addEventListener("click", function (e) {
  e.preventDefault();
  let listItem = `
        <div class="comment_box">
            <div class="comment_head">
                <p class="comment_name">anonim</p>
                <p class="comment_title">18:32 today</p>
            </div>
            <div class="comment_description">
                ${comment_input.value}
            </div>
        </div>
      `;
  console.log(listItem);

  // comment_main.appendChild(listItem);
  comment_main.innerHTML += listItem;
  comment_input.value = "";
});

// document.addEventListener("DOMContentLoaded", function () {
//     let comment_input = document.querySelector(".comment_input");
//     let send_button = document.querySelector(".send_button");
//     let comment_list = document.querySelector(".comment_list"); // "comment_list" adındaki sırasız liste öğesini seçiyoruz

//     send_button.addEventListener("click", function (e) {
//       e.preventDefault();
//       let inputValue = comment_input.value;

//       if (inputValue.trim() !== "") {
//         let listItem = document.createElement("li");
//         listItem.textContent = inputValue;
//         comment_list.appendChild(listItem); // Yorumu "comment_list" içine ekliyoruz
//         comment_input.value = "";
//       }
//     });
//   });
