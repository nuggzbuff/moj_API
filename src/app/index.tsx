import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';

export default function HomeScreen() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  // Funkcija, ki potegne podatke iz API-ja
  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/character')
      .then((response) => response.json())
      .then((data) => {
        setCharacters(data.results); // Shranimo like v stanje
        setLoading(false); // Izklopimo nalaganje
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  // Če se podatki še nalagajo, pokaži krogec
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#00ffcc" />
        <Text style={styles.text}>Nalagam podatke...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rick and Morty Liki</Text>
      
      {/* Seznam likov */}
      <FlatList
        data={characters}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.species}>{item.species}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#f1f1f1',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  species: {
    fontSize: 14,
    color: 'gray',
  },
  text: {
    marginTop: 10,
    fontSize: 16,
  },
});