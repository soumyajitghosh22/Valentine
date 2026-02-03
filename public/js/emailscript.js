const btn = document.getElementById('yes-button');

document.getElementById('form')
 .addEventListener('click', function(event) {
   event.preventDefault();

   btn.value = 'Sending...';

   const serviceID = 'default_service';
   const templateID = 'template_0v9l8jw';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.id = 'yes-button';
    }, (err) => {
      btn.id = 'yes-button';
      alert(JSON.stringify(err));
    });
});
