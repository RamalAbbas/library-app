let admin_join_btn = document.querySelector("#admin_join_btn")
let admin_body = document.querySelector("#admin_body")

admin_join_btn.addEventListener('click',function(){
    admin_body.classList.toggle("admin")
})