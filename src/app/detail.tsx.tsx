import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function DetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);

  // Prenos podatkov posebej za ta ID
  useEffect(() => {
    if (id) {
      fetch(`https://rickandmortyapi.com/api/character/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setCharacter(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#00ffcc" />
        <Text style={styles.text}>Nalagam podrobnosti...</Text>
      </View>
    );
  }

  if (!character) {
    return (
      <View style={styles.center}>
        <Text style={styles.text}>Podatki o liku niso na voljo.</Text>
        <TouchableOpacity style={styles.button} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Nazaj</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: character.image }} style={styles.image} />
      
      <Text style={styles.name}>{character.name}</Text>
      
      <View style={styles.infoCard}>
        <Text style={styles.label}>Status: <Text style={styles.value}>{character.status}</Text></Text>
        <Text style={styles.label}>Vrsta (Species): <Text style={styles.value}>{character.species}</Text></Text>
        <Text style={styles.label}>Spol (Gender): <Text style={styles.value}>{character.gender}</Text></Text>
        <Text style={styles.label}>Izvor (Origin): <Text style={styles.value}>{character.origin?.name}</Text></Text>
        <Text style={styles.label}>Lokacija: <Text style={styles.value}>{character.location?.name}</Text></Text>
        <Text style={styles.label}>Število epizod: <Text style={styles.value}>{character.episode?.length}</Text></Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Nazaj na seznam</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#121212',
    padding: 20,
    alignItems: 'center',
    paddingTop: 40,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  image: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 3,
    borderColor: '#00ffcc',
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoCard: {
    backgroundColor: '#1e1e1e',
    width: '100%',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#888',
    marginBottom: 10,
  },
  value: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#00ffcc',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  buttonText: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  text: {
    color: '#ffffff',
    fontSize: 16,
    marginBottom: 15,
  },
});