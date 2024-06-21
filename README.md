# SR10

## Projet : développement d’une application web de recrutement

### Organisation du répertoire :

Le dossier "conception" contient tous nos fichiers de conception.
Le dossier "out" contient les versions .svg de notre MCD et user_case.
L'ensemble de notre site se trouve dans le dossier website/myapp. Les dossiers website/css et website/html contiennent les maquettes de notre site en html avant le passage en ejs.
Dans le dossier myapp, le dossier model contient tous les modèles que nous avons définis.
Le dossier routes contient toutes les routes et le dossier view contient les vues.
Le dossier utils contient le fichier permettant de créer les sessions et d'envoyer des mails.
Le dossier test contient l'ensemble de nos fichiers de test.
Le dossier public contient tous les images et fichiers utilisés sur notre site. C'est également ici que se rajoutent les fichiers upload en utilisant le site.

### Comment lancer l'application

- Cloner le repo
- cd website/myapp

- Sur Linux : DEBUG=myapp:* npm start
- Sur Windows : SET DEBUG=myapp:* & npm start