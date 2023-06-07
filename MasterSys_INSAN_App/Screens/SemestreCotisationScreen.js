import React, { useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'


const SemestreCotisationScreen = () => {
  const [annee, setAnnee] = useState('')
  const [semestre, setSemestre] = useState('')

  const navigation = useNavigation()

  const handleSuivantPress = () => {
    navigation.navigate("Cotisation")
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
          style={styles.button}
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
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
})