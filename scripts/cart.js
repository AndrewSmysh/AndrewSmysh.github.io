document.addEventListener("DOMContentLoaded", function () {
    function updateCartInfo() {
        var cartCountElement = document.querySelector(".total_cart");
        var cartCostElement = document.querySelector(".cart-cost");
        var calculated_cost = document.getElementById("calculated_total_cost")

        var selectedItems = JSON.parse(localStorage.getItem('selectedItems')) || [];
        var totalCount = selectedItems.length;
        let totalCost = 0;


        selectedItems.forEach(item => {
            totalCost += parseFloat(item.Ціна);
        });

        cartCountElement.textContent = totalCount;
        cartCostElement.textContent = "$" + totalCost;
        calculated_cost.textContent = "$ " + totalCost.toFixed(2);
    }
    updateCartInfo();
});

var selectedItems = JSON.parse(localStorage.getItem('selectedItems'));
var tableBody = document.getElementById('table-body');

for (var itemKey in selectedItems) {
    var item = selectedItems[itemKey];
    var row = document.createElement('tr');

    var manufacturerCell = document.createElement('td');
    manufacturerCell.textContent = item['Виробник'];

    var numberCell = document.createElement('td');
    numberCell.textContent = item['Номер'];

    var nameCell = document.createElement('td');
    nameCell.textContent = item['Назва'];

    var priceCell = document.createElement('td');
    priceCell.textContent = item['Ціна'] + '$';

    var deliveryCell = document.createElement('td');
    deliveryCell.textContent = item['Доставка'];

    row.appendChild(manufacturerCell);
    row.appendChild(numberCell);
    row.appendChild(nameCell);

    row.appendChild(priceCell);
    row.appendChild(deliveryCell);

    tableBody.appendChild(row);
}


var tableContainer = document.querySelector('.table-container');
tableContainer.style.maxHeight = '300px';

if (tableBody.scrollHeight > tableContainer.clientHeight) {
    tableContainer.style.overflowY = 'scroll';
}

var selectedItems2 = localStorage.getItem("selectedItems");
document.getElementById("selectedI").value = selectedItems2;
var selected = document.getElementById("selectedI")
console.log(selected.value)


document.getElementById("myForm").addEventListener("submit", function (event) {
    var valid = true;

    const nameField = document.getElementById("name");
    if (nameField.value === "") {
        valid = false;
        document.getElementById("name-error").textContent = "Поле з іменем є обов'язковим";
        nameField.classList.add("error");
    } else {
        document.getElementById("name-error").textContent = "";
        nameField.classList.remove("error");
    }

    const lastNameField = document.getElementById("surname");
    if (lastNameField.value === "") {
        valid = false;
        document.getElementById("last-name-error").textContent = "Поле з прізвищем є обов'язковим";
        lastNameField.classList.add("error");
    } else {
        document.getElementById("last-name-error").textContent = "";
        lastNameField.classList.remove("error");
    }

    const NumberField = document.getElementById("number");
    if (NumberField.value === "") {
        valid = false;
        document.getElementById("number-error").textContent = "Поле з номером телефорну є обов'язковим";
        NumberField.classList.add("error");
    } else {
        document.getElementById("number-error").textContent = "";
        NumberField.classList.remove("error");
    }

    const postNumberField = document.getElementById("post_num");
    if (postNumberField.value === "") {
        valid = false;
        document.getElementById("post-error").textContent = "Поле з номером пошти є обов'язковим";
        postNumberField.classList.add("error");
    } else {
        document.getElementById("post-error").textContent = "";
        postNumberField.classList.remove("error");
    }

    const cityField = document.getElementById("city");
    if (cityField.value === "") {
        valid = false;
        document.getElementById("city-error").textContent = "Поле з містом є обов'язковим";
        cityField.classList.add("error");
    } else {
        document.getElementById("city-error").textContent = "";
        cityField.classList.remove("error");
    }
    if (!valid) {
        event.preventDefault();
    }
});
