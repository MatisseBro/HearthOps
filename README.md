HearthOps – Projet de Télémétrie Industrielle

Ce projet simule un système complet de supervision d’un four industriel.
Il utilise n8n, Airtable, React (Replit) et Hoppscotch.

🚀 1. Architecture Résumée
Machine (Hoppscotch POST)
↓
n8n – telemetry_ing (webhook ➝ JSON nettoyé ➝ Airtable)
↓
Airtable – bulletins (données brutes)
↓
n8n – bulletin_public (GET ➝ expose JSON public)
↓
React Dashboard (Replit) – affiche les données en direct

🔧 2. Workflows n8n

1. telemetry_ing

Reçoit les mesures du four via POST webhook

Ajoute timestamp + correlation_id

Stocke les données dans Airtable / bulletins

Testé via Hoppscotch

2. fuel_balance

Déclenché tous les jours

Calcule les allocations carburant

Stocke dans Airtable / allocations

3. bulletin_public

Webhook GET public

Récupère le dernier bulletin

Renvoie un JSON propre destiné au front
Exemple :

{
"drumTemp": 180,
"pressure": 400,
"coalStock": 115,
"mode": "nominal"
}

🧪 3. Test via Hoppscotch (simulation machine)

Aller sur : https://hoppscotch.io

Méthode : POST

URL : Test URL du webhook n8n

Headers :

Content-Type: application/json

Body exemple :

{
"drumTemp": 205,
"pressure": 410,
"coalStock": 111,
"mode": "test"
}

Vérifier :

dans n8n → Executions

dans Airtable → bulletins

🖥️ 4. Dashboard Front-end (Replit)

React + Vite + Tailwind

Récupère automatiquement l’API :

https://essitam.app.n8n.cloud/webhook/public/bulletin.json

Affiche :

température tambour

pression

stock

mode

timestamp

JSON brut (debug)

✅ 5. Fonctionnement Global

Un POST simulé (Hoppscotch) → stocké dans Airtable

airtable → sert de base à bulletin_public

le front React lit ce JSON et l’affiche

fuel_balance calcule automatiquement les allocations chaque jour

Le projet reproduit un pipeline complet industriel :
collecte → traitement → stockage → API → dashboard.
