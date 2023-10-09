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