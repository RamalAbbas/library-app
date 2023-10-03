let admin_mobil_menu = document.querySelector("#admin_mobil_menu")
let admin_overlay =  document.querySelector("#admin_overlay")
let admin_close_icon = document.querySelector("#admin_close_icon")
admin_mobil_menu.addEventListener('click',function(){
    admin_overlay.classList.add("show")
})

admin_close_icon.addEventListener('click',function(){
    admin_overlay.classList.remove("show")
})