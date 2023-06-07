import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Switch } from 'react-native';
import data from '../fichier_json/personnes.json'

const PresenceScreen = () => {

  const handleSave = () => {
    
  };
  const handleModify = () => {
    
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.legendeContainer}>
          <View style={styles.column}>
            <Text style={styles.label}>Nom</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Présence</Text>
          </View>
        </View>
        {data.map((person, index) => (
          <PersonListItem key={index} person={person} index={index}/>
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

const PersonListItem = ({ index, person }) => {
  const [toggleStates, setToggleStates] = useState(Array(person.length).fill(false));

  const handleToggle = (index) => {
    setToggleStates((prevToggleStates) => {
      const newToggleStates = [...prevToggleStates];
      newToggleStates[index] = !newToggleStates[index];
      return newToggleStates;
    });
  };
  
  return (
    <View style={styles.personContainer}>
          <View style={styles.column}>
            <Text style={styles.surname}>{person.Nom}</Text>
            <Text style={styles.name}>{person.Prénom}</Text>
          </View>

          <View style={styles.column}>
          <Switch
                  value={toggleStates[index]}
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
  toggleSwitch: {
    marginLeft: "35%",
    marginTop: "5%"
  },
});

export default PresenceScreen;