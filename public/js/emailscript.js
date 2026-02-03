function sendMail(){
    let parms = {
        name : document.getElementById("name").value,
    }

    
    emailjs.sendMail("service_m2bhx0d","template_0v9l8jw",parms)

}


