import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, TextInput, Pressable, Platform, TouchableOpacity } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list'
import DateTimePicker from "@react-native-community/datetimepicker"
import { useNavigation } from '@react-navigation/native'

const PresenceActiviteDateScreen = () => {
  const navigation = useNavigation()
  const [selected, setSelected] = React.useState("");
  const [dateActivite, setDateActivite] = useState("");

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const [isActivityValid, setActivityValid] = useState(false);
  const [isDateValid, setDateValid] = useState(false);


  const handleSuivantPress = () => {
    if (isActivityValid && isDateValid) {
      navigation.navigate("Presence", { activite: selected, date: dateActivite });
    }
  }

  const handleActivitySelect = (selectedValue) => {
    setSelected(selectedValue);
    setActivityValid(!!selectedValue); // Met à jour l'état de validité de l'activité en vérifiant si une valeur est sélectionnée
  };

  const toggleDatepicker = () => {
    setShowPicker(!showPicker);
    setDateValid(false);
  };

  const formatDateToString = (rawDate) => {
    let date = new Date(rawDate);

    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    return `${day}-${month}-${year}`;
  }

  const onChange = ({ type }, selectedDate) => {
    if(type == "set"){
      const currentDate = selectedDate;
      setDateActivite(currentDate);
      setDateValid(true); // Met à jour l'état de validité de la date lorsque la date est sélectionnée

      if(Platform.OS === "android"){
        toggleDatepicker();
        setDateActivite(formatDateToString(currentDate));
      }

    } else {
      toggleDatepicker();
    }
  };

  const confirmIOSDate = () => {
    setDateActivite(formatDateToString(dateActivite));
    toggleDatepicker();
    setDateValid(true); // Met à jour l'état de validité de la date quand on clique sur le bouton confirmer
  }
  
  const data = [
      { label: 'Sortie', value: 'sortie' },
      { label: 'Réunion hebdo', value: 'réunion hebdo' },
      { label: 'Réunion mensuelle', value: 'réunion mensuelle' },
      { label: 'Conférence', value: 'conférence' },
    ];
  
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
            data={data} 
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
