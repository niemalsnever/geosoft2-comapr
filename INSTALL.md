# Installation Guide

##Advisory/Hinweis
CoMapR is neither safe nor secure and basically makes a shell available through a website. We strongly advise anyone not to use this project! This project was created during a course at WWU Münster and should only be used in the context of this course!

**This project MUST NOT be run as root!  
Please use only in a highly secured environment and DO NOT make a machine where this runs on available on the internet! Seriously, NEVER run this as root!**

CoMapR ist nicht sicher und hängt im Prinzip eine Shell ans Netz. Von einer Nutzung dieses Projekts wird deshalb dringend abgeraten! Das Projekt wurde im Rahmen eines Kurses an der WWU Münster erstellt und sollte nur in dessen Rahmen verwendet werden. 

**Dieses Projekt DARF UNTER KEINEN UMSTÄNDEN als root ausgeführt werden!  
Dieses Projekt sollte nur in einer hochgradig abgesicherten Umgebung installiert werden und KEINESFALLS im öffentlichen Internet erreichbar sein!** 

[German version below/Deutsche Version unten](#user-content-ger)

## Requirements
- Ubuntu 16.04 or comparable debian based Linux
- SciDB instance with data to do calculations on

## Installing the Neccessary Packages
 1. Cloning the repository
    ```bash
    git clone https://github.com/niemalsnever/geosoft2-comapr
    cd geosoft2-comapr # Change to the freshly cloned directory
    ```
 2. Updating installed packages
    ```bash
    sudo apt-get autoremove && sudo apt-get update && sudo apt-get upgrade
    ```
 3. Adding neccessary package sources
    ```bash
    sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys E084DAB9
    sudo echo "deb https://cran.rstudio.com/bin/linux/ubuntu xenial/" >> /etc/apt/sources.list
    curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
    
    sudo apt-get autoremove && sudo apt-get update && sudo apt-get upgrade
    ```
 4. Installing neccessary packages
    ```bash
    sudo apt-get install r-base-dev r-base openssl libssl libssl-dev libcurl4-openssl-dev nodejs sqlite3
    
    chmod +x install_gdal.sh
    sudo install_gdal.sh # This script takes about half an hour
    
    sudo apt-get autoremove && sudo apt-get update && sudo apt-get upgrade
    ```
 5. Installing the neccessary R packages  
 We'll be installing the R packages as root, so they are available to the whole system
    
    ```bash
    sudo R
    > install.packages("devtools")
    > devtools::install_github("Paradigm4/SciDBR")
    > devtools::install_github("appelmar/scidbst", ref="dev")
    > q()
    ```
 6. Optional - `screen` so that CoMapR may run in the background
 
    ```bash
    sudo apt-get install screen
    ```

## Creating the Configuration File for the connection to SciDB
 
 1. Make a copy of `scidb_connect.r.dist`

    ```bash
    cp data/system_files/scidb_connect.r.dist data/system_files/scidb_connect.r
    ```
 2. Adjust `scidb_connect.r`

    ```bash
    nano data/system_files/scidb_connect.r
    # Fill in the credentials to connect to you SciDB instance, save the file and exit nano
    ```


## Adjusting the Port CoMapR will listen on (optional)
The default port for CoMapR is `3000`, however you can change that by adjusting the environment variable `PORT` like so:

```bash
export PORT=YOUR_PORT
```

## First Start
```bash
# In the cloned directory
npm start
```
In your webbrowser navigate to http://YOURHOST.TLD:PORT, CoMapR should now be listening.

---

<a id="ger"></a>
# Installationsanleitung für CoMapR

## Voraussetzungen
 - Ubuntu 16.04 oder vergleichbar
 - Eine SciDB Instanz mit Daten auf denen gerechnet werden soll

## Installation der benötigten Pakete
 1. Clonen des Repositories
    ```bash
    git clone https://github.com/niemalsnever/geosoft2-comapr
    cd geosoft2-comapr # Wechseln in das frisch geclonete Verzeichnis
    ```
 2. Installierte Pakete aktualisieren
    ```bash
    sudo apt-get autoremove && sudo apt-get update && sudo apt-get upgrade
    ```
 3. Benötigte Paketquellen hinzufügen
    ```bash
    sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys E084DAB9
    sudo echo "deb https://cran.rstudio.com/bin/linux/ubuntu xenial/" >> /etc/apt/sources.list
    curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
    
    sudo apt-get autoremove && sudo apt-get update && sudo apt-get upgrade
    ```
 4. Benötigte Pakete installieren
    ```bash
    sudo apt-get install r-base-dev r-base openssl libssl libssl-dev libcurl4-openssl-dev nodejs sqlite3
    
    chmod +x install_gdal.sh
    sudo install_gdal.sh # Dieses Script braucht in etwa eine halbe Stunde
    
    sudo apt-get autoremove && sudo apt-get update && sudo apt-get upgrade
    ```
 5. Benötigte R Pakete installieren  
 Wir installieren die R Pakete als Root, damit sie dem gesamten System zur Verfügung stehen.
    
    ```bash
    sudo R
    > install.packages("devtools")
    > devtools::install_github("Paradigm4/SciDBR")
    > devtools::install_github("appelmar/scidbst", ref="dev")
    > q()
    ```
 6. Optional - `screen` damit wir CoMapR im Hintergrund laufen lassen können

    ```bash
    sudo apt-get install screen
    ```

## Installation der NodeJS Dependencies
```bash
# Im gecloneten Verzeichnis
npm install
```

## Anlegen der Konfiguration für die Verbindung zur SciDB
 1. Kopieren der Datei `scidb_connect.r.dist`
    ```bash
    cp data/system_files/scidb_connect.r.dist data/system_files/scidb_connect.r
    ```
 2. Anpassen der Datei scidb_`connect.r`
    ```bash
    nano data/system_files/scidb_connect.r
    # Daten für die Verbindung zur SciDB eintragen und die Datei speichern
    ```

## Anpassen des Ports auf dem CoMapR erreichbar sein soll (optional)
Standardmäßig läuft CoMapR auf Port `3000`, das kann allerdings durch anlegen der Umgebungsvariablen `PORT` angepasst werden

```bash
export PORT=YOUR_PORT
```

## Erster Start
```bash
# Im gecloneten Verzeichnis
npm start
```
Im Browser http://YOURHOST.TLD:PORT aufrufen, CoMapR sollte nun funktionieren.

---

