let next1 = document.getElementById('next1');

next1.addEventListener("click", function(){
    const widthItem = document.querySelector('.item').offsetWidth;
    document.getElementById('formList').scrollLeft += widthItem;
})


let prev1 = document.getElementById('prev1');

prev1.addEventListener("click", function(){
    const widthItem = document.querySelector('.item').offsetWidth;
    document.getElementById('formList').scrollLeft -= widthItem;
})


// setInterval(() => {
//     next1.click()
// },3000);

let next2 = document.getElementById('next2');

next2.addEventListener("click", function(){
    const widthItem = document.querySelector('.item').offsetWidth;
    document.getElementById('formLista').scrollLeft += widthItem;
})


let prev2 = document.getElementById('prev2');

prev2.addEventListener("click", function(){
    const widthItem = document.querySelector('.item').offsetWidth;
    document.getElementById('formLista').scrollLeft -= widthItem;
})

