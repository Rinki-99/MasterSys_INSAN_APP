import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const PresenceScreen = () => {
  const [membres, setMembres] = useState([]);
  const [toggleStates, setToggleStates] = useState([]);
  const [presence, setPresence] = useState([]);
  
  const navigation = useNavigation();
  const route = useRoute();
  const { activite, date, id_activite } = route.params;

  useEffect(() => {
    fetch('http://192.168.1.71:8080/api/v1/membre')
      .then(response => response.json())
      .then(data => {
        setMembres(data);
        setToggleStates(Array(data.length).fill(false));
        setPresence(Array(data.length).fill(0));
      })
      .catch(error => {
        console.error('Une erreur s\'est produite lors de la récupération des données :', error);
      });
  }, []);

  const handleToggle = (index) => {
    setToggleStates((prevToggleStates) => {
      const newToggleStates = [...prevToggleStates];
      newToggleStates[index] = !newToggleStates[index];
      return newToggleStates;
    });

    setPresence((prevPresence) => {
      const newPresence = [...prevPresence];
      newPresence[index] = prevPresence[index] === 0 ? 1 : 0;
      return newPresence;
    });
  };

  const handleSave = () => {
    membres.forEach((person, index) => {
      const requestData = {
        Activite: id_activite,
        Membre: person.ID_Membre,
        date_activite: date,
        present: presence[index]
      };

      console.log(requestData);

      const jsonData = JSON.stringify(requestData);

      fetch('http://192.168.1.71:8080/api/v1/presence', {
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
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.legendeContainer}>
          <View style={styles.column}>
            <Text style={styles.label}>Activité : </Text>
            <Text style={styles.label}>{activite}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Date : </Text>
            <Text style={styles.label}>{date}</Text>
          </View>
        </View>
        <View style={styles.legendeContainer}>
          <View style={styles.column}>
            <Text style={[styles.label, {textAlign: "left", marginLeft:6 }]}>Nom</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Présence</Text>
          </View>
        </View>
        {membres.map((person, index) => (
          <PersonListItem
            key={index}
            person={person}
            index={index}
            activite={activite}
            date={date}
            toggleState={toggleStates[index]}
            handleToggle={handleToggle}
          />
        ))}
      </ScrollView>
      <View style={styles.legendeContainer}>
        <TouchableOpacity style={[styles.button, styles.column]} onPress={handleSave}>
          <Text style={styles.buttonText}>Sauvegarder</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const PersonListItem = ({ index, person, toggleState, handleToggle, activite, date }) => {
  return (
    <View style={styles.personContainer}>
      <View style={styles.column}>
        <Text style={styles.surname}>{person.Nom}</Text>
        <Text style={styles.name}>{person.Prenom}</Text>
      </View>

      <View style={styles.column}>
        <Switch
          value={toggleState}
          onValueChange={() => handleToggle(index)}
          style={styles.toggleSwitch}
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
  toggleSwitch: {
    marginLeft: "35%",
    marginTop: "5%"
  },
});

export default PresenceScreen;