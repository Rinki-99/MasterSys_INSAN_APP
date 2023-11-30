import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { useNavigation } from '@react-navigation/native';
import config from '../fichier_configuration/config.json';
import DatePicker from 'react-datepicker';

// Importez le DateTimePicker seulement sur les plates-formes mobiles
let DateTimePicker;
if (Platform.OS === 'android' || Platform.OS === 'ios') {
  DateTimePicker = require('@react-native-community/datetimepicker').default;
}
else {
  require('react-datepicker/dist/react-datepicker.css');
}

const PresenceActiviteDateScreen = () => {
  const [data, setData] = useState([]);

  const navigation = useNavigation();
  const [selected, setSelected] = React.useState('');
  const [dateActivite, setDateActivite] = useState('');
  const [idActivite, setIdActivite] = useState('');

  const [date, setDate] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const [isActivityValid, setActivityValid] = useState(false);
  const [isDateValid, setDateValid] = useState(false);

  useEffect(() => {
    fetch(`${config.apiUrl}${config.activite}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error('Une erreur s\'est produite lors de la récupération des données :', error);
      });
  }, []);

  const handleSuivantPress = () => {
    if (isActivityValid && isDateValid) {
      navigation.navigate('Presence', { activite: selected, date: dateActivite, id_activite: idActivite });
    }
  };

  const handleActivitySelect = (selectedValue) => {
    setSelected(selectedValue);
    setActivityValid(!!selectedValue);

    const selectedActivity = data.find((item) => item.Nom === selectedValue);

    if (selectedActivity) {
      setIdActivite(selectedActivity.ID_Activite);
    }
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
    return `${year}-${month}-${day}`;
  };

  const onChange = (_, selectedDate) => {
    const currentDate = selectedDate || date;
    setDateActivite(currentDate);

    if (Platform.OS === 'android' || Platform.OS === 'web') {
      toggleDatepicker();
      setDateActivite(formatDateToString(currentDate));
    }
    setDateValid(true);
  };

  const confirmIOSDate = () => {
    setDateActivite(formatDateToString(dateActivite));
    toggleDatepicker();
    setDateValid(true);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.input}>
        <Text style={styles.label}>Activité</Text>
        <SelectList setSelected={handleActivitySelect} data={data.map((item) => item.Nom)} save="value" />
      </View>

      <View>
      {showPicker && (
          <>
            {Platform.OS === 'web' ? (
              <DatePicker
                 selected={date}
                 onChange={(newDate) => {
                    setDate(newDate);
                    onChange({ type: 'set' }, newDate);
                  }}
                  minDate={new Date()} // la date minimale à laquelle l'utilisateur peut remonter
              />
            ) : (
              <DateTimePicker
                mode="date"
                display="spinner"
                value={date}
                onChange={onChange}
                style={styles.datePicker}
                minimumDate={new Date()}
              />
            )}
          </>
        )}
        {showPicker && Platform.OS === 'ios' && (
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <TouchableOpacity
              style={[
                styles.button,
                styles.pickerButton,
                { backgroundColor: '#11182711', borderColor: '#6750A4', borderWidth: 1 },
              ]}
              onPress={toggleDatepicker}>
              <Text style={[styles.buttonText, { color: '#6750A4' }]}>Supprimer</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.pickerButton]} onPress={confirmIOSDate}>
              <Text style={[styles.buttonText, { color: 'white' }]}>Confirmer</Text>
            </TouchableOpacity>
          </View>
        )}

        {!showPicker && (
          <Pressable onPress={toggleDatepicker}>
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
          style={[
            styles.button,
            {
              backgroundColor: '#6750A4',
              width: '100%',
              padding: 15,
              borderRadius: 10,
              alignItems: 'center',
              opacity: isDateValid && isActivityValid ? 1 : 0.5,
            },
          ]}>
          <Text style={styles.buttonText}>Suivant</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default PresenceActiviteDateScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: "10%",
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
