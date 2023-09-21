window.onload = function (){
    window.setTimeout(function (){
        document.body.classList.add("loaded")
    }, 3000)
}
function printdoc() {
    let print_table = document.getElementById("print_table")
    let newWindow = window.open("Print_Win")
    newWindow.document.write('<html><body onload="window.print()">'+
        print_table.innerHTML + '</body> </html>')
    newWindow.document.close();
}


const clearLocalStorageLink = document.getElementById('clearLocalStorageLink');
clearLocalStorageLink.addEventListener('click', function(event) {
    localStorage.removeItem('selectedItems');
});

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

window.addEventListener("load", function () {
    var isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
        document.querySelector(".asside-login").style.display = "none";
        document.querySelector(".asside-user").style.display = "flex";
    } else {
        document.querySelector(".asside-user").style.display = "none";
    }
});
