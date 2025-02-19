N'oubliez d'installer le package node avec npm i
J'ai téléchargé Keycloak Standalone depuis le site officiel : https://www.keycloak.org/downloads
aprés j'ai lancé le serveur avec la commande: kc.bat start-dev
et j'ai connecté sur l'url http://localhost:8080/ avec le username admin et le password admin 
En se connectant j'ai ajouté un realm nommé realmcreated et j'ai ajouté un client nommé client1 en lui configurant les protocoles OAuth 2.0 / OpenID Connect et comme routes de navigation http://localhost:3000/*
et aprés j'ai sécurisé tous mes routes. 
