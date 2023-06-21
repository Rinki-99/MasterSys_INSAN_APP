import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const CotisationScreen = () => {
  const [editable, setEditable] = useState(false);
  const [cotisations, setCotisations] = useState([]);
  const [valeurscotises, setValeurscotises] = useState([]);

  const navigation = useNavigation();
  const route = useRoute();
  const { annee, semestre } = route.params;

  useEffect(() => {
    fetch('http://192.168.1.71:8080/api/v1/membre')
      .then(response => response.json())
      .then(data => {
        setCotisations(data);
      })
      .catch(error => {
        console.error('Une erreur s\'est produite lors de la récupération des données :', error);
      });
  }, []);

  useEffect(() => {
    fetch('http://192.168.1.71:8080/api/v1/cotisation')
      .then(response => response.json())
      .then(data => {
        setValeurscotises(data);
      })
      .catch(error => {
        console.error('Une erreur s\'est produite lors de la récupération des données :', error);
      });
  }, []);

  console.log(valeurscotises);
  console.log(annee,semestre);

  const handleSave = () => {
    cotisations.forEach((person, index) => {
        const requestData = {
          Montant_cotise: person.montant_cotisation,
          Trimestre: semestre,
          Annee: annee,
          Membre: person.ID_Membre
        };

        const jsonData = JSON.stringify(requestData);

        fetch('http://192.168.1.71:8080/api/v1/cotisation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: jsonData
        })
          .then(response => response.json())
          .then(data => {
            navigation.navigate('Menu');
          })
          .catch(error => {
            console.error('Une erreur s\'est produite lors de la sauvegarde des données :', error);
          });
      }
    );
  };

  const handleModify = () => {
    setEditable(prevEditable => !prevEditable);
  };

  const handleCotisationChange = (index, montant) => {
    setCotisations(prevCotisations => {
      const updatedCotisations = [...prevCotisations];
      updatedCotisations[index] = {
        ...updatedCotisations[index],
        montant_cotisation: parseInt(montant)
      };
      return updatedCotisations;
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.legendeContainer}>
          <View style={styles.column}>
            <Text style={styles.label}>Annee : {annee}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Semestre : {semestre}</Text>
          </View>
        </View>
        <View style={styles.legendeContainer}>
          <View style={styles.column}>
            <Text style={[styles.label, {textAlign: "left", marginLeft:6 }]}>Nom</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Montant cotisation</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Montant cotisé</Text>
          </View>
        </View>
        {cotisations.map((person, index) => (
          <PersonListItem 
            key={index}  
            index={index} 
            person={person}
            valeurscotises={valeurscotises} 
            annee={annee}
            semestre={semestre}
            editable={editable} 
            handleCotisationChange={handleCotisationChange}
          />
        ))}
      </ScrollView>
      <View style={styles.legendeContainer}>
        <TouchableOpacity style={[styles.button, styles.column]} onPress={handleSave}>
          <Text style={styles.buttonText}>Sauvegarder</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.button, styles.column]} onPress={handleModify}>
          <Text style={styles.buttonText}>Modifier</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const PersonListItem = ({ person, index, editable, valeurscotises, annee, semestre, handleCotisationChange }) => {
  const [cotisation, setCotisation] = useState();
  const montantCotisation = useMemo(() => person.montant_cotisation, []); // Utilisez useMemo pour créer une version memoized de la constante

  useEffect(() => {
    const memberCotisation = valeurscotises.find(
      (cotisation) => cotisation.Membre === person.ID_Membre &&
      cotisation.Annee === parseInt(annee) &&
      cotisation.Trimestre === parseInt(semestre)
    );

    if (memberCotisation) {
      setCotisation(memberCotisation.Montant_cotise.toString());
    } else {
      setCotisation(person.montant_cotisation);
    }
  }, [person.ID_Membre, valeurscotises]);

  const handleInputChange = (text) => {
    setCotisation(text);
    handleCotisationChange(index, text);
  };

  return (
    <View style={styles.personContainer}>
      <View style={styles.column}>
        <Text style={styles.surname}>{person.Nom}</Text>
        <Text style={styles.name}>{person.Prenom}</Text>
      </View>

      <View style={styles.column}>
        <Text style={styles.cotisationstyle}>{montantCotisation}€</Text>
      </View>

      <View style={styles.column}>
        <TextInput
          style={styles.input}
          value={cotisation}
          onChangeText={handleInputChange}
          keyboardType="numeric"
          maxLength={3}
          editable={editable}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  personContainer: {
    flexDirection: 'row',
    marginBottom: 12,
    padding: 10,
    borderRadius: 8,
    borderBottomColor: '#6750A4',
    borderBottomWidth: 1,
  },
  legendeContainer: {
    flexDirection: 'row',
    marginBottom: 5,
    padding: 5,
  },
  column: {
    flex: 1,
    margin: 5,

  },
  name: {
    fontSize: 18,
    marginBottom: 8,
  },
  surname: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  input: {
    height: 45,
    width: "70%",
    marginLeft: "20%",
    borderColor: '#6750A4',
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 8,
    fontSize: 18,
  },
  button: {
    backgroundColor: '#6750A4',
    width: '50%',
    padding: 15,
    borderRadius: 60,
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  cotisationstyle: {
    fontSize: 16,
    padding: 15,
    fontWeight: 'normal',
    textAlign: 'center'
  },
});

export default CotisationScreen;