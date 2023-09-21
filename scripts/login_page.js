window.addEventListener("load", function () {
    var isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
        document.querySelector(".asside-login").style.display = "none";
        document.querySelector(".asside-user").style.display = "flex";
    } else {
        document.querySelector(".asside-user").style.display = "none";
    }
});

const clearLocalStorageLink = document.getElementById('clearLocalStorageLink');
clearLocalStorageLink.addEventListener('click', function(event) {
    localStorage.removeItem('selectedItems');
});
