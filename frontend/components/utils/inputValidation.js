export const checkName = (name, setErrorMessage, setValidName, bazarName) => {
    setValidName(false);
    const regex = /^[a-zA-Z0-9äöüÄÖÜß ]+$/;
    switch (true) {
        case bazarName === '':
            setErrorMessage('Bitte gib einen Namen für deinen Basar ein!');
            break;
        case bazarName.length < 3:
            setErrorMessage('Der Name deines Basars muss mindestens 3 Zeichen lang sein!');
            break;
        case bazarName.length > 30:
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

export const checkYear = (year, setErrorMessage, setValidYear, bazarYear) => {
    setValidYear(false);
    const regex = /^[0-9]+$/;
    const currentYear = new Date().getFullYear();
    switch (true) {
        case bazarYear === '':
            setErrorMessage('Bitte gib ein Jahr für deinen Basar ein!');
            break;
        case bazarYear.length !== 4:
            setErrorMessage('Das Jahr deines Basars muss 4 Zeichen lang sein!');
            break;
        case !regex.test(year):
            setErrorMessage('Das Jahr deines Basars darf nur Zahlen enthalten!');
            break;
        case bazarYear < currentYear || bazarYear > currentYear + 2:
            setErrorMessage('Dein Basar muss im aktuellen oder in den nächsten 2 Jahren stattfinden!');
            break;
        default:
            setValidYear(true);
            break;
    }
};

export const checkCommission = (commission, setErrorMessage, setValidCommission, bazarCommission) => {
    setValidCommission(false);
    // Provision muss zwischen 0 und 100 sein
    const regex = /^[0-9]+$/;
    switch (true) {
        case bazarCommission === '':
            setErrorMessage('Bitte gib eine Provision für deinen Basar ein!');
            break;
        case !regex.test(commission):
            setErrorMessage('Die Provision muss eine Zahl zwischen 0 und 100 sein!');
            break;
        case bazarCommission < 0 || bazarCommission > 100:
            setErrorMessage('Die Provision muss eine Zahl zwischen 0 und 100 sein!');
            break;
        default:
            setValidCommission(true);
            break;
    }
};

export const checkDescription = (description, setErrorMessage, setValidDescription, bazarDescription) => {
    setValidDescription(false);
    if (bazarDescription.length > 100) {
        setErrorMessage('Die Beschreibung darf maximal 100 Zeichen lang sein!');
    } else {
        setValidDescription(true);
    }
};

