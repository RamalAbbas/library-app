// selector
let admin_dropdown_active_item = document.querySelector("#admin_dropdown_active_item")
let admin_dropdown_item_main = document.querySelector("#admin_dropdown_item_main")
// event
admin_dropdown_active_item.addEventListener('click',function(){
    admin_dropdown_item_main.classList.toggle("active")
})

let admin_dropdown_item = document.querySelectorAll("#admin_dropdown_item")
admin_dropdown_item.forEach((item) => item.addEventListener('click',function(){
    admin_dropdown_active_item.innerHTML = item.innerText
    admin_dropdown_item_main.classList.remove("active")
}))