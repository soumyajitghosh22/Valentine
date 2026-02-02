const answers_no = {
    english: [
        "No",
        "Are you sure?",
        "Are you really sure??",
        "Are you really realy sure???",
        "Think again?",
        "Don't believe in second chances?",
        "Why are you being so cold?",
        "Maybe we can talk about it?",
        "I am not going to ask again!",
        "Ok now this is hurting my feelings!",
        "You are now just being mean!",
        "Why are you doing this to me?",
        "Please give me a chance!",
        "I am begging you to stop!",
        "Ok, Let's just start over.."
    ],
    bengali: [
        "না",
        "তুমি কি নিশ্চিত?",
        "তুমি কি খুবই নিশ্চিত?",
        "তুমি কি সত্যিই খুবই নিশ্চিত?",
        "আরেকবার ভাব প্লিজ",
        "দ্বিতীয় বার সুযোগে বিশ্বাস করো না?",
        "এরকম পাষান হৃদয় কেন তোমার?",
        "এই বিষয়টা নিয়ে আমরা আরো কথা বলতে পারি!",
        "আমি কিন্তু আর জিজ্ঞেস করবো না কোনো দিন",
        "এবার কিন্তু আমাকে দুঃখ দিচ্ছ তুমি!",
        "তুমি কিন্তু এবার এটা খারাপ করছো",
        "কেন এরকম করছো আমার সাথে?",
        "একবার তো চান্স দাও!",
        "দয়া করে এরকম করো না আর লক্ষীটি!",
        "ঠিক আছে আরেকবার প্রথম থেকে শুরু করা যাক"
    ]
};

answers_yes = {
    "english": "Yes",
    "bengali": "হ্যাঁ"
}

let language = "english"; // Default language is English
const no_button = document.getElementById('no-button');
const yes_button = document.getElementById('yes-button');
let i = 1;
let size = 50;
let clicks = 0;

no_button.addEventListener('click', () => {
    // Change banner source
    let banner = document.getElementById('banner');
    if (clicks === 0) {
        banner.src = "public/images/no.gif";
        refreshBanner();
    }
    clicks++;
    // increase button height and width gradually to 250px
    const sizes = [40, 50, 30, 35, 45]
    const random = Math.floor(Math.random() * sizes.length);
    size += sizes[random]
    yes_button.style.height = `${size}px`;
    yes_button.style.width = `${size}px`;
    let total = answers_no[language].length;
    // change button text
    if (i < total - 1) {
        no_button.innerHTML = answers_no[language][i];
        i++;
    } else if (i === total - 1) {
        alert(answers_no[language][i]);
        i = 1;
        no_button.innerHTML = answers_no[language][0];
        yes_button.innerHTML = answers_yes[language];
        yes_button.style.height = "50px";
        yes_button.style.width = "50px";
        size = 50;
    }
});

yes_button.addEventListener('click', () => {
    // change banner gif path
    let banner = document.getElementById('banner');
    banner.src = "public/images/yes.gif";
    refreshBanner();
    // hide buttons div
    let buttons = document.getElementsByClassName('buttons')[0];
    buttons.style.display = "none";
    // show message div
    let message = document.getElementsByClassName('message')[0];
    message.style.display = "block";
});

function refreshBanner() {
    // Reload banner gif to force load  
    let banner = document.getElementById('banner');
    let src = banner.src;
    banner.src = '';
    banner.src = src;
}

function changeLanguage() {
    const selectElement = document.getElementById("language-select");
    const selectedLanguage = selectElement.value;
    language = selectedLanguage;

    // Update question heading
    const questionHeading = document.getElementById("question-heading");
    if (language === "bengali") {
        questionHeading.textContent = "তুমি কি আমার সাথে সারাজীবন কাটাবে প্রিয়তমা?";
    } else {
        questionHeading.textContent = "Will you be my valentine?";
    }

    // Reset yes button text
    yes_button.innerHTML = answers_yes[language];

    // Reset button text to first in the new language
    if (clicks === 0) {
        no_button.innerHTML = answers_no[language][0];
    } else {
        no_button.innerHTML = answers_no[language][clicks];
    }

    // Update success message
    const successMessage = document.getElementById("success-message");
    if (language === "bengali") {
        successMessage.textContent = "দুস্থ দরিদ্র মানুষ কে এরকম পরমানন্দ প্রদান করিবার জন্য অশেষ ধন্যবাদ, খুব শীঘ্রই দেখা হচ্ছে :)";
    } else {
        successMessage.textContent = "Yepppie, see you sooonnn :3";
    }
}
