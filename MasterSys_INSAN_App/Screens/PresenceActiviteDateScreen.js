import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, TextInput, Pressable, Platform, TouchableOpacity } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list'
import DateTimePicker from "@react-native-community/datetimepicker"
import { useNavigation } from '@react-navigation/native'

const PresenceActiviteDateScreen = () => {
  const [data, setData] = useState([]);

  const navigation = useNavigation()
  const [selected, setSelected] = React.useState(""); // État pour stocker la valeur de l'activité sélectionnée
  const [dateActivite, setDateActivite] = useState(""); // État pour stocker la date de l'activité
  const [idActivite, setIdActivite] = useState("")

  const [date, setDate] = useState(new Date()); // État pour stocker la date sélectionnée dans le sélecteur de date
  const [showPicker, setShowPicker] = useState(false); // État pour contrôler l'affichage du sélecteur de date

  const [isActivityValid, setActivityValid] = useState(false); // État pour indiquer si une activité valide est sélectionnée
  const [isDateValid, setDateValid] = useState(false); // État pour indiquer si une date valide est sélectionnée

  useEffect(() => {
    fetch('http://192.168.1.71:8080/api/v1/activite')
      .then(response => response.json())
      .then(data => {
        setData(data);
      })
      .catch(error => {
        console.error('Une erreur s\'est produite lors de la récupération des données :', error);
      });
  }, []);

  const handleSuivantPress = () => {
    if (isActivityValid && isDateValid) {
      navigation.navigate("Presence", { activite: selected, date: dateActivite, id_activite: idActivite}); // Naviguer vers l'écran "Presence" avec les données sélectionnées
    }
  }

  const handleActivitySelect = (selectedValue) => {
    setSelected(selectedValue); // Update the selected activity name
    setActivityValid(!!selectedValue); // Update the activity validity state by checking if a value is selected
  
    // Find the selected activity object
    const selectedActivity = data.find((item) => item.Nom === selectedValue);
  
    if (selectedActivity) {
      setIdActivite(selectedActivity.ID_Activite);
      // Use the ID_activité as needed
      console.log('ID_activité:', idActivite);
    }
  };
  
  const toggleDatepicker = () => {
    setShowPicker(!showPicker); // Inverser l'état d'affichage du sélecteur de date
    setDateValid(false); // Réinitialiser l'état de validité de la date
  };

  const formatDateToString = (rawDate) => {
    let date = new Date(rawDate);

    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    return `${year}-${month}-${day}`; // Formater la date en format jour-mois-année
  }

  const onChange = ({ type }, selectedDate) => {
    if(type == "set"){
      const currentDate = selectedDate;
      setDateActivite(currentDate); // Mettre à jour la date de l'activité
      setDateValid(true); // Mettre à jour l'état de validité de la date lorsque la date est sélectionnée

      if(Platform.OS === "android"){
        toggleDatepicker(); // Cacher le sélecteur de date
        setDateActivite(formatDateToString(currentDate)); // Formater la date et la stocker dans l'état
      }

    } else {
      toggleDatepicker(); // Cacher le sélecteur de date
    }
  };

  const confirmIOSDate = () => {
    setDateActivite(formatDateToString(dateActivite)); // Formater la date de l'activité
    toggleDatepicker(); // Cacher le sélecteur de date
    setDateValid(true); // Mettre à jour l'état de validité de la date quand on clique sur le bouton confirmer
  }
  
    return (
      <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      >
        <View
          style={styles.input}
        >
          <Text style={styles.label}>Activité</Text>
          <SelectList 
            setSelected={handleActivitySelect}
            data={data.map(item => item.Nom)} 
            save="value"
          />
        </View>

        <View>

          {showPicker && ( 
            <DateTimePicker
              mode="date"
              display="spinner"
              value={date}
              onChange={onChange}
              style={styles.datePicker}
              minimumDate={new Date()}
            />
          )}

          {showPicker && Platform.OS === "ios" && 
          (
            <View
              style={{ flexDirection: "row",
              justifyContent: "space-around" }}
            >
              <TouchableOpacity style={[
                styles.button,
                styles.pickerButton,
                {backgroundColor : "#11182711",
                borderColor : '#6750A4',
                borderWidth: 1}
              ]}
                onPress={toggleDatepicker}
                >
                <Text
                style={[
                  styles.buttonText,
                  { color: "#6750A4" }
                ]}>Supprimer</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[
                styles.button,
                styles.pickerButton,
              ]}
                onPress={confirmIOSDate}
                >
                <Text
                style={[
                  styles.buttonText,
                  { color: "white" }
                ]}>Confirmer</Text>
              </TouchableOpacity>

            </View>
          )}

          { !showPicker && (
            <Pressable
            onPress={toggleDatepicker}
          >
            <TextInput
              placeholder="Sélectionner date activité"
              value={dateActivite}
              onChangeText={setDateActivite}
              style={styles.input}
              editable={false}
              onPressIn={toggleDatepicker}
            />
          </Pressable>
          )}

        </View>

        <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleSuivantPress}
          style={[styles.button, {
                                  backgroundColor: '#6750A4',
                                  width: '100%',
                                  padding: 15,
                                  borderRadius: 10,
                                  alignItems: 'center',
                                  opacity: isDateValid && isActivityValid ? 1 : 0.5, // Désactive le bouton si la date n'est pas valide
                                  }]}
          >
            <Text style={styles.buttonText}>Suivant</Text>
          </TouchableOpacity>

      </View>
      
    </KeyboardAvoidingView>
    );
  };

export default PresenceActiviteDateScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: "30%",
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  selectedOptionText: {
    marginTop: 20,
    fontSize: 22,
  },
  inputContainer : {
    width: '80%'
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 25,
    paddingVertical: 20,
    marginTop: 40,
    borderColor : '#6750A4',
    borderWidth: 1,
    borderRadius: 10
  },
  datePicker: {
    height: 120,
    marginTop: -10,
  },
  pickerButton: {
    paddingHorizontal: 20,
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
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
