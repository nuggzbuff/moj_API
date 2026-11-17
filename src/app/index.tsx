import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Image, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

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

  const handleSearch = (text) => {
    setSearchQuery(text);
    setLoading(true);
    fetchCharacters(text);
  };

  const getStatusColor = (status) => {
    if (status === 'Alive') return '#55cc44';
    if (status === 'Dead') return '#ff5555';
    return '#9e9e9e';
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
          <TouchableOpacity 
            style={styles.card}
            onPress={() => router.push({ pathname: '/detail', params: { character: JSON.stringify(item) } })}
          >
            <Image source={{ uri: item.image }} style={styles.avatar} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <View style={styles.statusRow}>
                <View style={[styles.dot, { backgroundColor: getStatusColor(item.status) }]} />
                <Text style={styles.species}>{item.status} - {item.species}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.text}>Ni najdenih likov.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: 50,
    paddingHorizontal: 15,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#1e1e1e',
    color: '#ffffff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#1e1e1e',
    borderRadius: 8,
    marginBottom: 10,
    overflow: 'hidden',
    alignItems: 'center',
  },
  avatar: {
    width: 70,
    height: 70,
  },
  info: {
    padding: 12,
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  species: {
    fontSize: 14,
    color: '#aaaaaa',
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
    color: '#ffffff',
  },
});