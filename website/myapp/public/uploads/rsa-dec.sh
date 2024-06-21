#!/bin/bash

# Usage : ./rsa-dec.sh archive_de_fragments_chiffres cle_rsa_publique
#
# Cree un fichier dechiffre a partir des fragments de l'archive construite avec
# rsa-enc.sh.  Le fichier resultat porte le nom du fichier original (avec
# l'extension .bis s'il existe pour ne pas l'ecraser). Si le nom du fichier
# initial contenait %, alors le nom final sera tronque.
#
# v1 18/05/2020
# v2 28/04/2022 test nombre d'arguments fournis
#
# Suggestions : ducourth@utc.fr

# Test du nombre d'arguments ---------------------------------------------------
if ! [ $# -eq 2 ]; then
		echo "- $0 : arguments manquants"
		echo "  usage : ./rsa-dec.sh archive_de_fragments_chiffres cle_rsa_publique"
		exit
fi;

# Premier argument : archive de fragments chiffres -----------------------------
FILE=$1
if ! [ -e $FILE ]; then
		echo "- $0 : fichier inexistant ($FILE)"
		exit
fi;

if ! [ "x`tar tzf $FILE 2>&1 | grep -i error`" == "x" ]; then
		echo "- $0 : erreur en exploitant l'archive de fragments ($FILE)"
		exit
fi

echo "+ $0 : dechiffrement des fragments de l'archive '$FILE'"



# Second argument : cle privee de chiffrement ----------------------------------
FKEY=$2
if ! [ -e $FKEY ] || \
				[ "x`head -1 $FKEY | grep PRIVATE`" = "x" ];
then
	 # Ce n'est pas une cle privee RSA
		echo "- $0 : cle privee RSA non trouvee ($FKEY)"
		exit
fi

# C'est une cle privee RSA (on suppose que le fichier est correct...)
# Calcul de la taille de la cle en bits	 
LEN_FKEY=`openssl rsa -in $2 -text -noout| head -1|cut -d'(' -f 2 | cut -d ' ' -f1`

echo "+ $0 : utilisation de la cle privee $KEY_TYPE RSA $FKEY ($LEN_FKEY bits)"



# Recuperation des fragments chiffres ------------------------------------------
# Creation d'un repertoire temporaire pour les fragments chiffres
TMP_ENC=`mktemp -d`

tar xzf $FILE -C $TMP_ENC

NUM_FRAG=`ls -1 $TMP_ENC | wc -l`

echo "+ $0 : recuperation de $NUM_FRAG fragments chiffres"



# Dechiffrement des fragments --------------------------------------------------
# Utilisation de la cle privee fournie

# Creation d'un repertoire temporaire pour les fragments dechiffres
# (facilite le tri ensuite)
TMP_DEC=`mktemp -d`                  
i=0
for FRAG in $TMP_ENC/* ; do
		i=$((i+1))
		# Nom du fragment sans le repertoire
		F=`basename $FRAG`
		# Les eventuelles erreurs openssl seront affichees autant de fois
		# que de fragments...
		openssl rsautl -decrypt -inkey $FKEY -in $FRAG -out $TMP_DEC/$F
done

echo "+ $0 : dechiffrement de $i fragments de $LEN_FRAG octets"



# Creation du fichier resultat -------------------------------------------------
# Recuperation du nom du fichier a partir du nom de l'archive
ORI_FILE=`echo $FILE | cut -d '%' -f 1`
if [ -e $ORI_FILE ]; then
		# Le fichier original existe deja dans le repertoire ; on ne l'ecrase pas.
		# Le resultat sera disponible avec l'extension .bis
		ORI_FILE=$ORI_FILE.bis
fi

echo "+ $0 : creation du fichier resultat dechiffre $ORI_FILE"

# Creation du fichier resultat vide (ecrase l'eventuel existant .bis) dans le
# repertoire courant (on suppose que les droits le permettent...).
# Option -n pour qu'il n'y ait pas de retour a la ligne (fichier vide).
echo -n "" > $ORI_FILE

# Concatenation des fragments dechiffres
for FRAG in $TMP_DEC/* ; do
		cat $FRAG >> $ORI_FILE
done

echo "+ $0 : terminé"
echo "+ $0 : les fragments clairs pourraient être supprimés (répertoire $TMP_DEC)"
echo "+ $0 : les fragments chiffrés pourraient être supprimés (répertoire $TMP_ENC)"

# NB : il serait preferable de supprimer les fragments non chiffres (repertoire
# $TMP_DEC) et chiffres (repertoire $TMP_ENC)
