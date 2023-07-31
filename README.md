# Bazarify 
## Beschreibung
Mit Bazarify machst du deinen einfachsten Basar bisher! Bazarify ist eine leistungsstarke Web-Anwendung zur Verwaltung von Basaren. Mit einer Datenbank und Barcodescanner-Integration können Verkäufer einfach ihre Artikel verwalten. Eine intuitive Benutzeroberfläche und ein Dashboard bieten klare Einblicke in den Verkauf und ermöglichen eine einfache Erstellung von Bilanzen.

## Setup

### Mit Docker:
#### Voraussetzungen
Vor dem Starten der App mit Docker solltest du sicherstellen, dass du Folgendes auf deinem System installiert hast:

Docker (getestet mit Version v4.19.0)
Schritte zum Starten der App
Folge diesen Schritten, um die App mit Docker zu starten:

#### Dockerfiles überprüfen

Stelle sicher, dass alle erforderlichen Dockerfiles in den entsprechenden Verzeichnissen (z. B. frontend, backend, etc.) vorhanden sind. Die Dockerfiles enthalten die Anweisungen zum Erstellen der Docker-Images für die einzelnen Dienste.

#### Docker-Images erstellen

Öffne ein Terminal oder eine Eingabeaufforderung und navigiere zum Root-Verzeichnis deiner App. Führe die folgenden Befehle aus, um die Docker-Images für das Frontend, das Backend und gegebenenfalls andere Dienste zu erstellen:

bash
Copy code
docker build -t frontend-image ./frontend
docker build -t backend-image ./backend
#### Führe diesen Befehl für weitere Dienste aus, falls vorhanden
Docker Compose ausführen

Um die App mithilfe von Docker Compose zu starten, führe den folgenden Befehl aus:

bash
Copy code
docker-compose up
Dieser Befehl wird alle Container starten, die in der docker-compose.yml-Datei definiert sind, und sie werden miteinander verbunden.

#### Zugriff auf die App

Nachdem die App erfolgreich mit Docker Compose gestartet wurde, kannst du auf sie zugreifen:

Frontend: Öffne deinen Webbrowser und navigiere zu http://localhost:3001.
Backend: Die Backend-API ist unter http://localhost:8085 verfügbar.
Beachte, dass die oben genannten Ports (3001 für das Frontend und 8085 für das Backend) standardmäßig in der docker-compose.yml-Datei konfiguriert sind und geändert werden können, wenn nötig.

#### Beenden der App

Um die App und die zugehörigen Container zu beenden, drücke CTRL+C in deinem Terminal oder deiner Eingabeaufforderung, oder führe den folgenden Befehl aus:

bash
Copy code
docker-compose down
Dadurch werden alle Container gestoppt und entfernt.

#### Anmerkungen
Falls du spezifische Konfigurationen für die Docker-Container oder die Netzwerkverbindung vornehmen möchtest, kannst du dies in der docker-compose.yml-Datei tun.
Stelle sicher, dass du über die notwendigen Berechtigungen verfügst, um Docker-Befehle auszuführen, oder führe sie gegebenenfalls mit Administrator- oder Root-Rechten aus.
Wenn du Hilfe benötigst oder auf Probleme stößt, zögere nicht, uns zu kontaktieren. Wir helfen dir gerne weiter.

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
*npm run dev* zuerst im frontend-Folder dannn im backend-Folder aufrufen

## Demodaten laden
Im Dashbord Interface auf "Demoversion laden" klicken

## Known Issues
Aufgrund eines unbekannten Fehlers funktioniert Bazarify innerhalb von Safari nicht. Wir haben für die Entwicklung Google Chrome verwendet, worin alles problemfrei geklappt hat.

## Entwickler
- Julius Beutel (jb266)
- Maik Bucher (mb389) 
- Maurice Dolibois (md147)
- Samuel Riester (sr185)
