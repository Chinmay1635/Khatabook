let delBtn = document.querySelectorAll(".delete");
let noBtn = document.getElementById("no");

delBtn.forEach(function(delBtn){
    delBtn.addEventListener("click", function(){
        console.log("clicked")
        gsap.to("#cover, #delete-alert", {
            scale:1,
            opacity:1,
            duration:0,
    
        })
    })
})

noBtn.addEventListener("click", function(){
    console.log("clicked")
    gsap.to("#cover, #delete-alert", {
        scale:0,
        opacity:0,
        duration:0.2,

    })
})