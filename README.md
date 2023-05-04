# Bazarify

# Vor dem ersten Start ohne Docker

Vor dem ersten Start sollte man folgende Schritte ausführen:

 - Node.js installieren (Per Installer oder auf dem Mac per Homebrew)
 - MongoDB installieren
 - MongoDB starten mit: brew services start mongodb-community@6.0 (Nun sollte die Datenbank auf localhost:27017 erreichbar sein)
    - Im Terminal mit "mongosh" auf MongoDB zugreifen und dort folgende Befehle ausführen:
        - use admin
        - db.createUser({user:"maik",pwd:"abc123",roles:[{"role": "userAdminAnyDatabase","db": "admin" }, "readWriteAnyDatabase"]})
        - use Bazarify
 - Im Terminal nochmals npm install in backend- und frontend- Ordner ausführen



## Kurze Info zum Fronend/Backend starten

Zum backend folder navigieren

npm run dev 

Zum frontend folder navigieren

npm start

