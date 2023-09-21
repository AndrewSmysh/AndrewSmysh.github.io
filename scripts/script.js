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