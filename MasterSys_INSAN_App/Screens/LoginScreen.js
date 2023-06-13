import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { auth } from '../firebase' // Importation du module Firebase
import { useNavigation } from '@react-navigation/native'

const LoginScreen = () => {
  const [email, setEmail] = useState('') // État pour l'adresse e-mail
  const [password, setPassword] = useState('') // État pour le mot de passe

  const navigation = useNavigation()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user){
        navigation.navigate("Menu") // Navigue vers l'écran "Menu" si l'utilisateur est connecté
      }
    })

    return unsubscribe
  }, [])

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password) // Connexion avec l'adresse e-mail et le mot de passe fournis
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Logged in with:', user.email); // Affiche l'e-mail de l'utilisateur connecté dans la console
      })
      .catch(error => alert(error.message)) // Affiche une alerte en cas d'erreur lors de la connexion
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      >
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleLogin}
          style={styles.button}
          >
            <Text style={styles.buttonText}>Entrer</Text>
          </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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