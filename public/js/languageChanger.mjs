import Dictionary from "./DictionaryModule.mjs";

const btn_en = document.querySelector('#btn_en');
const btn_no = document.querySelector('#btn_no');
const label_username = document.querySelector('label[for="username"]');
const label_password = document.querySelector('label[for="password"]');
const loginBtn = document.querySelector('#loginBtn');
const registerBtn = document.querySelector('#registerBtn');
const h1 = document.querySelector('h1');
const h2 = document.querySelector('h2');
const h3 = document.querySelector('h3');

let currentLanguage = "english";

function CheckLanguage() {
    return currentLanguage;
}

btn_no.addEventListener("click", function (e) {
    currentLanguage = "no";

    label_username.textContent = Dictionary.no.username;
    label_password.textContent = Dictionary.no.password;
    loginBtn.textContent = Dictionary.no.loginBtn;
    registerBtn.textContent = Dictionary.no.registerBtn;

    h1.textContent = Dictionary.no.h1;
    h2.textContent = Dictionary.no.h2;
    h3.textContent = Dictionary.no.h3;
})

btn_en.addEventListener("click", function (e) {
    currentLanguage = "en";

    label_username.textContent = Dictionary.en.username;
    label_password.textContent = Dictionary.en.password;
    loginBtn.textContent = Dictionary.en.loginBtn;
    registerBtn.textContent = Dictionary.en.registerBtn;

    h1.textContent = Dictionary.en.h1;
    h2.textContent = Dictionary.en.h2;
    h3.textContent = Dictionary.en.h3;
})

export default CheckLanguage;
