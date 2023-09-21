import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js'
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword  } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js'
//'https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js'
import { getDatabase } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js'

const firebaseConfig = {
    apiKey: "AIzaSyAvkFO2KYE26l-Qs9OFy8Zk_hlGoKJZX1w",
    authDomain: "logreg-91df6.firebaseapp.com",
    databaseURL: "https://logreg-91df6-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "logreg-91df6",
    storageBucket: "logreg-91df6.appspot.com",
    messagingSenderId: "113104341846",
    appId: "1:113104341846:web:a6ec45c30652e2efe164f7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

var email = document.getElementById("email-reg")
var client_name = document.getElementById("name")
var client_surname = document.getElementById("last-name")
var client_password = document.getElementById("password-reg")
window.signup = function (e){
    e.preventDefault()
    var user_obj = {
        email:email.value,
        client_name:client_name.value,
        client_surname:client_surname.value,
        client_password:client_password.value
    }
    createUserWithEmailAndPassword(auth,user_obj.email,user_obj.client_password,user_obj.client_name,user_obj.client_surname)
        .then(function (success) {
           // alert("success")
            document.getElementById("registerBlock").style.display = "none";
            document.getElementById("loginBlock").style.display = "block";
        })
        .catch(function (err) {
            if (err.code === "auth/email-already-in-use") {
                document.getElementById("email-error").textContent = "Ця пошта вже зареєстрована.";
                document.getElementById("email-reg").classList.add("input-error");
               // displayError("email-error", "Ця пошта вже зареєстрована.");
            } else if (err.code ==="auth/invalid-email") {
                document.getElementById("email-error").textContent = "Невірно введена пошта.";
                document.getElementById("email-reg").classList.add("input-error");
              //  displayError("email-error", "Невірно введена пошта.");
            }else if (err.code === "auth/weak-password"){
                document.getElementById("password-error").textContent = "Пароль повинен складатися з більше ніж 6 символів.";
                document.getElementById("password-reg").classList.add("input-error");
                //displayError("password-reg", "Пароль повинен складатися з більше ніж 6 символів.");
            }else if (err.code === "auth/missing-password"){
                document.getElementById("password-error").textContent = "Поле не може бути пустим.";
                document.getElementById("password-reg").classList.add("input-error");
               // displayError("password-reg", "Поле не може бути пустим.");
            } else{
                console.log("Помилка: " + err.message);
            }
        })
    document.getElementById("email-error").textContent = "";

    document.getElementById("password-error").textContent = "";
    document.getElementById("email-reg").classList.remove("input-error");
    document.getElementById("password-reg").classList.remove("input-error");

    console.log(user_obj)
};

function displayError(id, message) {
    var errorElement = document.getElementById(id);
    if (errorElement) {
        errorElement.textContent = message;
    }
}

 var email_log = document.getElementById("email")
var password_log = document.getElementById("password")

window.login = function (e){
    e.preventDefault()
    var user_obj = {
        email_log:email_log.value,
        password_log:password_log.value
    }
    signInWithEmailAndPassword(auth,user_obj.email_log,user_obj.password_log)
        .then(function (success) {
            //alert("success")
            localStorage.setItem("isLoggedIn", true);
           // window.location.reload();
        })
        .catch(function (err) {
            if (err.code === "auth/invalid-email") {
                document.getElementById("email-error-log").textContent = "Невірна пошта або таку не зареєстровано.";
                document.getElementById("email").classList.add("input-error");
                // displayError("email-error", "Ця пошта вже зареєстрована.");
            } else if (err.code ==="auth/wrong-password") {
                document.getElementById("password-error-log").textContent = "Невірний пароль.";
                document.getElementById("password").classList.add("input-error");
            }else if (err.code ==="auth/missing-password") {
                document.getElementById("password-error-log").textContent = "поле не може бути пустим";
                document.getElementById("password").classList.add("input-error");
            } else{
                //console.log("error"+err)
            }
        })
        // console.log(user_obj)

    document.getElementById("email-error-log").textContent = "";
    document.getElementById("password-error-log").textContent = "";
    document.getElementById("email").classList.remove("input-error");
    document.getElementById("password").classList.remove("input-error");

}

const createacc = document.querySelector(".create-acc");
const register = document.querySelector('.register')
var logInBlock = document.querySelector('.log-in');

createacc.addEventListener('click', function () {
    logInBlock.style.display = 'none';
    register.style.display = 'block';
});

window.addEventListener("load", function () {
    var isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
        document.getElementById("loginBlock").style.display = "none";
        document.getElementById("registerBlock").style.display = "none";
        document.querySelector(".asside-login").style.display = "none";
        document.querySelector(".asside-user").style.display = "flex";
    } else {
        document.querySelector(".asside-user").style.display = "none";
    }
});
