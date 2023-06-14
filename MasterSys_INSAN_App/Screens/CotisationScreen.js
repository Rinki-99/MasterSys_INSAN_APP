import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import data from '../fichier_json/réunion mensuelle_10-09-2023.json';  // Importer les données JSON depuis un fichier local
import { useNavigation, useRoute } from '@react-navigation/native';


const CotisationScreen = () => {
  const [editable, setEditable] = useState(false); // État pour indiquer si le formulaire est éditable ou non
  const [cotisations, setCotisations] = useState([...data]); // État pour stocker les cotisations (initialisées avec les données JSON)

  const navigation = useNavigation();
  const route = useRoute();
  const { annee, semestre } = route.params; // Récupérer les paramètres de la route

  // Lire les composantes transférées
  console.log(annee, semestre);

  const handleSave = () => {
    const jsonData = JSON.stringify(data); // Convertir les données en JSON
    console.log(jsonData); // Afficher les données JSON dans la console à titre d'exemple
    navigation.navigate("Menu"); // Naviguer vers l'écran "Menu"
  };

  const handleModify = () => {
    setEditable(prevEditable => !prevEditable); // Inverser l'état d'édition du formulaire
  };

  const handleCotisationChange = (index, text) => {
    setCotisations(prevCotisations => {
      const updatedCotisations = [...prevCotisations];
      updatedCotisations[index].Montant_cotisation = parseInt(text); // Mettre à jour le montant de la cotisation pour un index donné
      return updatedCotisations;
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.legendeContainer}>
          <View style={styles.column}>
            <Text style={styles.label}>Nom</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Montant</Text>
          </View>
        </View>
        {data.map((person, index) => (
          <PersonListItem 
            key={index}  
            index={index} 
            person={person} 
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

const PersonListItem = ({ person, index, editable, handleCotisationChange }) => {
  const [cotisation, setCotisation] = useState(person.Montant_cotisation.toString()); // État pour stocker le montant de la cotisation

  useEffect(() => {
    setCotisation(person.Montant_cotisation.toString()); // Mettre à jour le montant de la cotisation lorsque les données changent
  }, [person.Montant_cotisation]);

  const handleInputChange = (text) => {
    setCotisation(text); // Mettre à jour le montant de la cotisation dans l'état local
    handleCotisationChange(index, text); // Appeler la fonction parent pour mettre à jour le montant de la cotisation dans l'état global
  };

  return (
    <View style={styles.personContainer}>
      <View style={styles.column}>
        <Text style={styles.surname}>{person.Nom}</Text>
        <Text style={styles.name}>{person.Prénom}</Text>
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
    marginLeft: 10,
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
});

export default CotisationScreen;
