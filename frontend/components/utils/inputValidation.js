//bazar validation

export const checkBazarName = (name, setErrorMessage, setValidName) => {
    setValidName(false);
    const regex = /^[a-zA-Z0-9äöüÄÖÜß ]+$/;
    switch (true) {
        case name === '':
            setErrorMessage('Bitte gib einen Namen für deinen Basar ein!');
            break;
        case name.length < 3:
            setErrorMessage('Der Name deines Basars muss mindestens 3 Zeichen lang sein!');
            break;
        case name.length > 30:
            setErrorMessage('Der Name deines Basars darf maximal 30 Zeichen lang sein!');
            break;
        case !regex.test(name):
            setErrorMessage('Der Name deines Basars darf nur Buchstaben und Zahlen enthalten!');
            break;
        default:
            setValidName(true);
            break;
    }
};

export const checkYear = (year, setErrorMessage, setValidYear) => {
    setValidYear(false);
    const regex = /^[0-9]+$/;
    const currentYear = new Date().getFullYear();
    switch (true) {
        case year === '':
            setErrorMessage('Bitte gib ein Jahr für deinen Basar ein!');
            break;
        case year.length !== 4:
            setErrorMessage('Das Jahr deines Basars muss 4 Zeichen lang sein!');
            break;
        case !regex.test(year):
            setErrorMessage('Das Jahr deines Basars darf nur Zahlen enthalten!');
            break;
        case year < currentYear || year > currentYear + 2:
            setErrorMessage('Dein Basar muss im aktuellen oder in den nächsten 2 Jahren stattfinden!');
            break;
        default:
            setValidYear(true);
            break;
    }
};


//product validation


export const checkCommission = (commission, setErrorMessage, setValidCommission) => {
    setValidCommission(false);
    // Provision muss zwischen 0 und 100 sein
    const regex = /^[0-9]+$/;
    switch (true) {
        case commission === '':
            setErrorMessage('Bitte gib eine Provision für deinen Basar ein!');
            break;
        case !regex.test(commission):
            setErrorMessage('Die Provision muss eine Zahl zwischen 0 und 100 sein!');
            break;
        case commission < 0 || commission > 100:
            setErrorMessage('Die Provision muss eine Zahl zwischen 0 und 100 sein!');
            break;
        default:
            setValidCommission(true);
            break;
    }
};

export const checkDescription = (description, setErrorMessage, setValidDescription) => {
    setValidDescription(false);
    if (description.length > 100) {
        setErrorMessage('Die Beschreibung darf maximal 100 Zeichen lang sein!');
    } else {
        setValidDescription(true);
    }
};

export const checkProductName = (name, setErrorMessage, setValidName) => {
    setValidName(false);
    const regex = /^[a-zA-Z0-9äöüÄÖÜß ]+$/;
    switch (true) {
        case name === '':
            setErrorMessage({type: "error", text:'Bitte gib den Produktnamen ein!'});
            break;
        case name.length < 3:
            setErrorMessage({type: "error", text:'Der Produktname muss mindestens 3 Zeichen lang sein!'});
            break;
        case name.length > 15:
            setErrorMessage({type: "error", text:'Der Produktname darf maximal 15 Zeichen lang sein!'});
            break;
        case !regex.test(name):
            setErrorMessage({type: "error", text:'Der Produktname darf nur Buchstaben und Zahlen enthalten!'});
            break;
        default:
            setValidName(true);
            break;
    }
};

export const checkProductCategory = (category, setErrorMessage, setValidCategory) => {
    setValidCategory(false);
    const regex = /^[a-zA-ZäöüÄÖÜß ]+$/;
    switch (true) {
        case category === '':
            setErrorMessage({type: "error", text:'Bitte gib eine Kategorie ein!'});
            break;
        case category.length < 3:
            setErrorMessage({type: "error", text:'Die Kategorie muss mindestens 3 Zeichen lang sein!'});
            break;
        case category.length > 15:
            setErrorMessage({type: "error", text:'Die Kategorie darf maximal 15 Zeichen lang sein!'});
            break;
        case !regex.test(category):
            setErrorMessage({type: "error", text:'Die Kategorie darf nur Buchstabenenthalten!'});
            break;
        default:
            setValidCategory(true);
            break;
    }
};

export const checkPrice = (price, setErrorMessage, setValidPrice) => {
    setValidPrice(false);
    // Vor Komma muss Zahl sein, danach müssen 2 Zahlen kommen
    const regex = /^[0-9]+(\,[0-9]{2})?$/;
    switch (true) {
        case price === '':
            setErrorMessage({type: "error", text:'Bitte gib den Preis des Produkts ein!'});
            break;
        case !regex.test(price):
            setErrorMessage({type: "error", text:'Der Preis muss dem korrekten Format entsprechen! (z.B: 4,20€ oder 69€)'});
            break;
        case price.length > 4:
            console.log ("preis länge: ", price.length)
            setErrorMessage({type: "error", text:'Das Produkt muss zwischen 0€ und 9999€ kosten!'});
            break;
        default:
            setValidPrice(true);
            break;
    }
};


