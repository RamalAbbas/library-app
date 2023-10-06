// selector
let admin_dropdown_active_item = document.querySelector("#admin_dropdown_active_item")
let admin_dropdown_item_main = document.querySelector("#admin_dropdown_item_main")
// event
admin_dropdown_active_item.addEventListener('click',function(){
    admin_dropdown_item_main.classList.toggle("active")
})