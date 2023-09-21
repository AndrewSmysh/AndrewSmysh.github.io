async function loadTranslations() {
    try {
        const response = await fetch('json/catalog_language.json');
        if (!response.ok) {
            throw new Error('eror file');
        }
        const translations = await response.json();
        return translations;
    } catch (error) {
        console.error(error);
        return null;
    }
}


// Функція для оновлення тексту на сторінці, включаючи placeholder
async function updateText(language) {
    const translations = await loadTranslations();
    if (translations) {
        const elementsToTranslate = document.querySelectorAll('[data-translation-key]');
        elementsToTranslate.forEach(element => {
            const translationKey = element.getAttribute('data-translation-key');
            if (translations[language][translationKey]) {
                if (element.tagName === 'INPUT' && element.getAttribute('placeholder') !== null) {
                    element.setAttribute('placeholder', translations[language][translationKey]);
                } else {
                    element.textContent = translations[language][translationKey];
                }
            }
        });
    }
}


const savedLanguage = localStorage.getItem('selectedLanguage');


if (savedLanguage) {
    document.getElementById('languageSelector').value = savedLanguage;
    updateText(savedLanguage);
}

document.getElementById('languageSelector').addEventListener('change', function() {
    const selectedLanguage = this.value;
    localStorage.setItem('selectedLanguage', selectedLanguage); // Збережіть вибрану мову
    updateText(selectedLanguage);
});

