
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCAFHGfGAb6S1K13MSQnwU68cDzZF6F694",
    authDomain: "catalogue-37dfc.firebaseapp.com",
    databaseURL: "https://catalogue-37dfc-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "catalogue-37dfc",
    storageBucket: "catalogue-37dfc.appspot.com",
    messagingSenderId: "540560814757",
    appId: "1:540560814757:web:c1a879576532f8987a134c"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const dataCollection = collection(db, '/Catalogue');
getDocs(dataCollection)
    .then((querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
            data.push(doc.data());
        });
        console.log("Catalogue Data:", data);
    })
    .catch((error) => {
        console.error("Error getting data from Firestore:", error);
    });







document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.getElementById("table-body");
    const loadMoreButton = document.getElementById("load-more");
    const partNumberInput = document.getElementById("search_input");


    let data = []; // Масив для зберігання всіх даних
    let startIndex = 0; // Індекс першого відображеного елемента
    let itemsPerPage = 14; // Кількість елементів на сторінці

    // Функція для завантаження наступних елементів
    function loadMoreItems() {
        const endIndex = startIndex + itemsPerPage;
        const itemsToLoad = data.slice(startIndex, endIndex);

        itemsToLoad.forEach(item => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.Виробник}</td>
                <td>${item.Номер}</td>
                <td>${item.Назва}</td>
                <td>${item.Кількість}</td>
                <td>${item.Ціна}$</td>
                <td>${item.Доставка}</td>
             
            `;
            row.addEventListener("click", () => {
                // Додайте дані обраного елемента в Local Storage
                addToLocalStorage(item);
                // Викличте функцію для оновлення відображення кількості та вартості обраних елементів
                updateCartInfo();
            });

            tableBody.appendChild(row);

            row.addEventListener("mouseenter", () => {
                row.style.cursor = "pointer";
            });
        });

        startIndex = endIndex;

        // Приховуємо кнопку, якщо всі елементи вже завантажені
        if (startIndex >= data.length) {
            loadMoreButton.style.display = "none";
        }
    }


    function filterDataByPartNumber() {
        const searchTerm = partNumberInput.value.trim().toLowerCase();
        const filteredData = data.filter(item => {
            // Перевірка, чи item.Номер може бути перетвореним в рядок
            const itemNumberAsString = String(item.Номер);
            return itemNumberAsString.toLowerCase().includes(searchTerm);
        });

        // Очистити таблицю перед оновленням
        tableBody.innerHTML = '';

        filteredData.forEach(item => {
            const row = document.createElement("tr");
            row.innerHTML = `
            <td>${item.Виробник}</td>
            <td>${item.Номер}</td>
            <td>${item.Назва}</td>
            <td>${item.Кількість}</td>
            <td>${item.Ціна}$</td>
            <td>${item.Доставка}</td>
            
        `;
            row.addEventListener("click", () => {
                // Додайте дані обраного елемента в Local Storage
                addToLocalStorage(item);
                updateCartInfo();
            });

            row.addEventListener("mouseenter", () => {
                row.style.cursor = "pointer";
            });

            tableBody.appendChild(row);
        });
    }

    // Отримуємо дані з JSON-файлу (припустимо, що дані розміщені в файлі data.json)
    fetch("json/csvjson.json")
        .then(response => response.json())
        .then(jsonData => {
            data = jsonData; // Зберігаємо дані
            console.log(data)
            loadMoreItems(); // Відображаємо перші 10 елементів
        });

    // Обробник події для кнопки "Завантажити ще"
    loadMoreButton.addEventListener("click", loadMoreItems);
    partNumberInput.addEventListener("keyup", filterDataByPartNumber);


    function addToLocalStorage(selectedItem) {
        // Перевірте, чи 'selectedItems' вже існує у Local Storage
        let selectedItems = JSON.parse(localStorage.getItem('selectedItems')) || [];

        // Додайте обраний елемент до масиву
        selectedItems.push(selectedItem);

        // Збережіть масив у Local Storage, перетворивши його у JSON-рядок
        localStorage.setItem('selectedItems', JSON.stringify(selectedItems));
    }


    function updateCartInfo() {
        const cartCountElement = document.querySelector(".cart-item");
        const cartCostElement = document.querySelector(".cart-cost");

        // Отримайте дані з Local Storage і оновіть відображення
        const selectedItems = JSON.parse(localStorage.getItem('selectedItems')) || [];
        const totalCount = selectedItems.length;
        let totalCost = 0;

        // Обчисліть загальну вартість обраних елементів
        selectedItems.forEach(item => {
            totalCost += parseFloat(item.Ціна);
        });

        cartCountElement.textContent = totalCount + " items for ";
        cartCostElement.textContent = "$" + totalCost;
    }
    updateCartInfo();
});


window.addEventListener("load", function () {
    var isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
        document.querySelector(".asside-login").style.display = "none";
        document.querySelector(".asside-user").style.display = "flex";
    } else {
        document.querySelector(".asside-user").style.display = "none";
    }
});