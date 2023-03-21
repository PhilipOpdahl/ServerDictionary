import Dictionary from "./DictionaryModule.mjs";

const changeLanguage = (language) => {
    const elementsToUpdate = [
        { key: "username", elementId: "usernameLabel" },
        { key: "password", elementId: "passwordLabel" },
        { key: "loginBtn", elementId: "loginBtn" },
        { key: "registerBtn", elementId: "registerBtn" },
        { key: "searchButton", elementId: "searchButton" },
        { key: "h1", elementId: "mainHeading" },
        { key: "h2", elementId: "watchlistHeading" },
    ];

    elementsToUpdate.forEach(({ key, elementId }) => {
        document.getElementById(elementId).textContent = Dictionary[language][key];
    });
};

document.getElementById("englishBtn").addEventListener("click", () => {
    changeLanguage("en");
});

document.getElementById("norskBtn").addEventListener("click", () => {
    changeLanguage("no");
});
