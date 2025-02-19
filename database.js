const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./maBaseDeDonnees.sqlite', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connecté à la base de données SQLite.');

        // Création de la table si elle n'existe pas
        db.run(`CREATE TABLE IF NOT EXISTS personnes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nom TEXT NOT NULL,
            adresse TEXT
        )`, (err) => {
            if (err) {
                console.error('Erreur lors de la création de la table :', err.message);
            } else {
                console.log('Table créée ou déjà existante.');

                // Liste des personnes avec nom et adresse
                const personnes = [
                    { nom: 'Bob', adresse: '123 Main St' },
                    { nom: 'Alice', adresse: '456 Elm St' },
                    { nom: 'Charlie', adresse: '789 Oak St' }
                ];

                personnes.forEach((person) => {
                    db.run(`INSERT INTO personnes (nom, adresse) VALUES (?, ?)`, [person.nom, person.adresse], (err) => {
                        if (err) {
                            console.error('Erreur lors de l’insertion :', err.message);
                        } else {
                            console.log(`Donnée insérée : ${person.nom} - ${person.adresse}`);
                        }
                    });
                });
            }
        });
    }
});

module.exports = db;
