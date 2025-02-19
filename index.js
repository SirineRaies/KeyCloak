const express = require('express');
const db = require('./database');
const session = require('express-session');
const Keycloak = require('keycloak-connect');
const memoryStore = new session.MemoryStore();
const app = express();
app.use(express.json());
const PORT = 3000;

app.use(session({
    secret: 'sRXUCdSdaMvbSR5eLlItdxOzv8tbMu3D',
    resave: false,
    saveUninitialized: true,
    store: memoryStore
    }));

const keycloak = new Keycloak({ store: memoryStore }, './keycloak-config.json');
app.use(keycloak.middleware());
app.get('/secure', keycloak.protect(), (req, res) => {
    res.json({ message: 'Vous êtes authentifié !' });
});

app.get('/', (req, res) => {
    res.json("Registre de personnes! Choisissez le bon routage!")
})

app.get('/personnes', keycloak.protect(), (req, res) => {
    db.all("SELECT * FROM personnes", [], (err, rows) => {
    if (err) {
    res.status(400).json({ "error": err.message });
    return;
    }
    res.json({ "message": "success", "data": rows });
    });
    });

app.get('/personnes/:id', keycloak.protect(), (req, res) => {
    const id = req.params.id;
    db.get("SELECT * FROM personnes WHERE id = ?", [id], (err, row) => {
    if (err) {
        res.status(400).json({"error": err.message});
        return;
    }
    res.json({"message": "success","data": row });
    });
});
app.post('/personnes', keycloak.protect(), (req, res) => {
    const {nom,adresse} = req.body;
    db.run(`INSERT INTO personnes (nom,adresse) VALUES (?,?)`, [nom,adresse], function(err) {
    if (err) {
        res.status(400).json({"error": err.message});
        return;
    }
    res.json({"message": "success","data": {id: this.lastID }});
    });
});
app.put('/personnes/:id', keycloak.protect(), (req, res) => {
    const id = req.params.id;
    const nom = req.body.nom;
    const adresse = req.body.adresse;
    db.run(`UPDATE personnes SET nom = ?, adresse=? WHERE id = ?`, [nom,adresse, id], function(err) {
    if (err) {
        res.status(400).json({"error": err.message});
        return;
    }
    res.json({"message": "success"});
    });
});
app.delete('/personnes/:id', keycloak.protect(), (req, res) => {
    const id = req.params.id;
    db.run(`DELETE FROM personnes WHERE id = ?`, id, function(err) {
    if (err) {
        res.status(400).json({"error": err.message});
        return;
    }
    res.json({"message": "success" });
    });
});
app.listen(PORT, () => {console.log(`Server running on port ${PORT}`); });