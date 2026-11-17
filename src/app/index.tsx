import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Image, TextInput } from 'react-native';

export default function HomeScreen() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Funkcija za pridobivanje podatkov (lahko sprejme ime za iskanje)
  const fetchCharacters = (name = '') => {
    const url = name 
      ? `https://rickandmortyapi.com/api/character/?name=${name}`
      : 'https://rickandmortyapi.com/api/character';

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.results) {
          setCharacters(data.results);
        } else {
          setCharacters([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  // Funkcija, ko uporabnik nekaj vpiše v iskalno polje
  const handleSearch = (text) => {
    setSearchQuery(text);
    setLoading(true);
    fetchCharacters(text);
  };

  if (loading && characters.length === 0) {
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
      
      {/* Iskalno polje */}
      <TextInput
        style={styles.input}
        placeholder="Išči lika po imenu..."
        placeholderTextColor="#888"
        value={searchQuery}
        onChangeText={handleSearch}
      />

      <FlatList
        data={characters}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.avatar} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.species}>{item.species} - {item.status}</Text>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.text}>Ni najdenih likov.</Text>}
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
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#f1f1f1',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 10,
    overflow: 'hidden',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
  },
  info: {
    padding: 10,
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  species: {
    fontSize: 14,
    color: 'gray',
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
  },
});