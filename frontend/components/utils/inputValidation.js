//bazar validation

export const checkBazarName = (name, setErrorMessage, setValidName) => {
  setValidName(false);
  const regex = /^[a-zA-Z0-9äöüÄÖÜß ]+$/;
  switch (true) {
    case name === "":
      setErrorMessage("Bitte gib einen Namen für deinen Basar ein!");
      break;
    case name.length < 3:
      setErrorMessage(
        "Der Name deines Basars muss mindestens 3 Zeichen lang sein!"
      );
      break;
    case name.length > 30:
      setErrorMessage(
        "Der Name deines Basars darf maximal 30 Zeichen lang sein!"
      );
      break;
    case !regex.test(name):
      setErrorMessage(
        "Der Name deines Basars darf nur Buchstaben und Zahlen enthalten!"
      );
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
    case year === "":
      setErrorMessage("Bitte gib ein Jahr für deinen Basar ein!");
      break;
    case year.length !== 4:
      setErrorMessage("Das Jahr deines Basars muss 4 Zeichen lang sein!");
      break;
    case !regex.test(year):
      setErrorMessage("Das Jahr deines Basars darf nur Zahlen enthalten!");
      break;
    case year < currentYear || year > currentYear + 2:
      setErrorMessage(
        "Dein Basar muss im aktuellen oder in den nächsten 2 Jahren stattfinden!"
      );
      break;
    default:
      setValidYear(true);
      break;
  }
};

//product validation

export const checkCommission = (
  commission,
  setErrorMessage,
  setValidCommission
) => {
  setValidCommission(false);
  // Provision muss zwischen 0 und 100 sein
  const regex = /^[0-9]+$/;
  switch (true) {
    case commission === "":
      setErrorMessage("Bitte gib eine Provision für deinen Basar ein!");
      break;
    case !regex.test(commission):
      setErrorMessage("Die Provision muss eine Zahl zwischen 0 und 100 sein!");
      break;
    case commission < 0 || commission > 100:
      setErrorMessage("Die Provision muss eine Zahl zwischen 0 und 100 sein!");
      break;
    default:
      setValidCommission(true);
      break;
  }
};

export const checkDescription = (
  description,
  setErrorMessage,
  setValidDescription
) => {
  setValidDescription(false);
  if (description.length > 100) {
    setErrorMessage("Die Beschreibung darf maximal 100 Zeichen lang sein!");
  } else {
    setValidDescription(true);
  }
};

export const checkProductName = async (name, setErrorMessage, setValidName) => {
  await setValidName(false);
  const regex = /^[a-zA-Z0-9äöüÄÖÜß ]+$/;
  switch (true) {
    case name === "":
      setErrorMessage({
        type: "error",
        text: "Bitte gib den Produktnamen ein!",
      });
      break;
    case name.length < 3:
      setErrorMessage({
        type: "error",
        text: "Der Produktname muss mindestens 3 Zeichen lang sein!",
      });
      break;
    case name.length > 15:
      setErrorMessage({
        type: "error",
        text: "Der Produktname darf maximal 15 Zeichen lang sein!",
      });
      break;
    case !regex.test(name):
      setErrorMessage({
        type: "error",
        text: "Der Produktname darf nur Buchstaben und Zahlen enthalten!",
      });
      break;
    default:
      setValidName(true);
      break;
  }
};

export const checkProductCategory = async (
  category,
  setErrorMessage,
  setValidCategory
) => {
  await setValidCategory(false);
  const regex = /^[a-zA-ZäöüÄÖÜß ]+$/;
  switch (true) {
    case category === "":
      setErrorMessage({ type: "error", text: "Bitte gib eine Kategorie ein!" });
      break;
    case category.length < 3:
      setErrorMessage({
        type: "error",
        text: "Die Kategorie muss mindestens 3 Zeichen lang sein!",
      });
      break;
    case category.length > 15:
      setErrorMessage({
        type: "error",
        text: "Die Kategorie darf maximal 15 Zeichen lang sein!",
      });
      break;
    case !regex.test(category):
      setErrorMessage({
        type: "error",
        text: "Die Kategorie darf nur Buchstabenenthalten!",
      });
      break;
    default:
      setValidCategory(true);
      break;
  }
};

export const checkPrice = async (price, setErrorMessage, setValidPrice) => {
  await setValidPrice(false);
  // Vor Komma muss Zahl sein, danach müssen 2 Zahlen kommen
  const regex = /^[0-9]+(\,[0-9]{2})?$/;
  switch (true) {
    case price === "":
      setErrorMessage({
        type: "error",
        text: "Bitte gib den Preis des Produkts ein!",
      });
      break;
    case !regex.test(price):
      setErrorMessage({
        type: "error",
        text: "Der Preis muss dem korrekten Format entsprechen! (z.B: 4,20€ oder 69€)",
      });
      break;
    case price.length > 4:
      console.log("preis länge: ", price.length);
      setErrorMessage({
        type: "error",
        text: "Das Produkt muss zwischen 0€ und 9999€ kosten!",
      });
      break;
    default:
      setValidPrice(true);
      break;
  }
};

//seller validation

export const checkName = async (name, setErrorMessage, setValidName, type) => {
  //type ist entweder "Vorname" oder "Nachname"
  await setValidName(false);
  const regex = /^[a-zA-ZäöüÄÖÜß]+[-]?[a-zA-ZäöüÄÖÜß]+$/;
  switch (true) {
    case name === "":
      setErrorMessage({
        type: "error",
        text: `Bitte gib den ${type}n des Verkäufers ein!`,
      });
      break;
    case name.length > 20:
      setErrorMessage({
        type: "error",
        text: `Der ${type} des Verkäufers darf maximal 20 Zeichen lang sein!`,
      });
      break;
    case !regex.test(name):
      setErrorMessage({
        type: "error",
        text: `Bitte gib einen gültigen ${type}n des Verkäufers ein!`,
      });
      break;
    default:
      setValidName(true);
      break;
  }
};

export const checkEmail = async (email, setErrorMessage, setValidEmail) => {
  await setValidEmail(false);
  // Basic email validation regex
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  switch (true) {
    case email === "":
      setErrorMessage({
        type: "error",
        text: "Bitte gib deine E-Mail-Adresse ein!",
      });
      break;
    case !regex.test(email):
      setErrorMessage({
        type: "error",
        text: "Bitte gib eine gültige E-Mail-Adresse ein!",
      });
      break;
    default:
      setValidEmail(true);
      break;
  }
};

export const checkPhoneNumber = async (
  phoneNumber,
  setErrorMessage,
  setValidPhoneNumber
) => {
  await setValidPhoneNumber(false);
  // Phone number validation regex
  const regex = /^(\d+\/\d+|\d+)$/;

  switch (true) {
    case phoneNumber === "":
      setErrorMessage({
        type: "error",
        text: "Bitte gib die Telefonnummer des Verkäufers ein!",
      });
      break;
    case !regex.test(phoneNumber):
      setErrorMessage({
        type: "error",
        text: "Die Telefonnummer muss aus 10 Zahlen bestehen!",
      });
      break;
    default:
      setValidPhoneNumber(true);
      break;
  }
};
