import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const MenuScreen = () => {
  const navigation = useNavigation()

  const handlePresencePress = () => {
    navigation.navigate("PresenceActiviteDate")
  }

  const handleCotisationPress = () => {
    navigation.navigate("SemestreCotisation")
  }

  return (
    <View
        style={styles.container}
    >
      <View style={styles.buttonContainer}>
          <TouchableOpacity
          onPress={handlePresencePress}
          style={styles.button}
          >
              <Text style={styles.buttonText}>Présence</Text>
          </TouchableOpacity>
      </View>
      
      <View style={styles.buttonContainer}>
          <TouchableOpacity
          onPress={handleCotisationPress}
          style={styles.button}
          >
              <Text style={styles.buttonText}>Cotisation</Text>
          </TouchableOpacity>
      </View>

    </View>
  )
}

export default MenuScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
        marginTop: '65%',
        alignItems: 'center',
      },
    buttonContainer: {
        width: '70%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
      },
    button: {
        backgroundColor: '#6750A4',
        width: '100%',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center'
      },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
      },
})