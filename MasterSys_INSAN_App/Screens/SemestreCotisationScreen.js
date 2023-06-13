import React, { useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'


const SemestreCotisationScreen = () => {
  const [annee, setAnnee] = useState('') // État pour l'année
  const [semestre, setSemestre] = useState('') // État pour le semestre

  const navigation = useNavigation()

  const handleSuivantPress = () => {
    if (validateFields()) {
      // Navigue vers l'écran "Cotisation" avec les valeurs de l'année et du semestre
      navigation.navigate("Cotisation", { annee: annee, semestre: semestre });
    }
  }

  const validateFields = () => {
    if (annee.trim() === '' || annee.trim() != new Date().getFullYear()) {
      // Le champ "Année" est vide ou different de l'année courante
      return false;
    }

    if (semestre.trim() === '' || semestre.trim() < 1 || semestre.trim() > 2 ) {
      // Le champ "Semestre" est vide ou inférieur à 1 ou supérieur à 2
      return false;
    }

    return true;
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      >
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Anneé"
          value={annee}
          onChangeText={text => setAnnee(text)}
          style={styles.input}
          maxLength={4}
          keyboardType="numeric"
        />
        <TextInput
          placeholder="Semestre"
          value={semestre}
          onChangeText={text => setSemestre(text)}
          style={styles.input}
          maxLength={1}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleSuivantPress}
          // définir la propriété opacity du style en fonction de la valeur de la fonction validateFields()
          style={[styles.button, {opacity: validateFields() ? 1 : 0.5,}]}
          >
            <Text style={styles.buttonText}>Suivant</Text>
          </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default SemestreCotisationScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '40%',
    alignItems: 'center',
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
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#6750A4',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
})