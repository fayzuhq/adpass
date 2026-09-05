1. **Compte à rebours jusqu'à minuit** :
   - Remplacer `setTimeLeft(13338)` et la logique du `useEffect` par le calcul du temps jusqu'à minuit.
   - Ajouter `tabular-nums font-mono` sur la `div` qui affiche le temps restant.

2. **Formatage intelligent des inputs bancaires** :
   - Ajouter des états `cardNumber`, `expiry` et `cvc`.
   - Créer des gestionnaires `onChange` pour nettoyer et formater les entrées (espaces tous les 4 chiffres, limit 16; slash pour la date, limit 4; limit 3 numéros pour CVC).
   - Intégrer de petits badges Visa/Mastercard dans le champ carte bancaire.

3. **Habillage de l'arrière-plan flouté** :
   - Remplacer le `blur-2xl opacity-40` par `blur-xl opacity-30 select-none pointer-events-none`.
   - Ajouter une barre supérieure avec le titre de la galerie et un badge "18+ EXCLUSIF".
   - Affiner le faux lecteur vidéo (bouton play géant, ratio 16/9).
   - Remplacer les miniatures par une grille avec de petits cadenas rouges.

4. **Vérifications Pre-commit & Soumission**
   - Lancer le serveur/build pour s'assurer qu'il n'y a pas d'erreur.
   - Terminer les étapes de pre-commit (Lint, Prettier, etc. si nécessaire) et vérifier.
