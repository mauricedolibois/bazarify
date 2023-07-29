# Bazarify 
## Dein einfachster Basar bisher.

Bazarify ist eine leistungsstarke Web-Anwendung zur Verwaltung von Basaren. Mit einer Datenbank und Barcodescanner-Integration können Verkäufer einfach ihre Artikel verwalten. Eine intuitive Benutzeroberfläche und ein Dashboard bieten klare Einblicke in den Verkauf und ermöglichen eine einfache Erstellung von Bilanzen.

## Setup

### Mit Docker:

(her damit Maik)
### Ohne Docker:
Vor dem ersten Start sollte man folgende Schritte ausführen:

 - Node.js installieren (Per Installer oder auf dem Mac per Homebrew)
 - MongoDB installieren
 - MongoDB starten mit: brew services start mongodb-community@6.0 (Nun sollte die Datenbank auf localhost:27017 erreichbar sein)
    - Im Terminal mit "mongosh" auf MongoDB zugreifen und dort folgende Befehle ausführen:
        - use admin
        - db.createUser({user:"maik",pwd:"abc123",roles:[{"role": "userAdminAnyDatabase","db": "admin" }, "readWriteAnyDatabase"]})
        - use Bazarify
 - Im Terminal nochmals npm install in backend- und frontend- und test-Ordner ausführen



## App builden

*npm run dev* zuerst im frontend- dannn im backend-Folder aufrufen

## Demo Daten laden

Im Dashbord Interface auf Demo Bazar laden clicken :)

## Entwicker

- Maik Bucher (mb389) 
- Maurice Dolibois (md147)
- Julius Beutel (jb266)
- Samuel Riester (sr185)