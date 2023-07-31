import React, { useState } from 'react';
import { View, TextInput, Button, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const API_KEY = '3ad313351a7449639612b18f3969f4b3';
const API_URL = 'https://api.spoonacular.com/recipes/findByIngredients';

const App = () => {
  const [ingredientInput, setIngredientInput] = useState('');
  const [recipes, setRecipes] = useState([]);

  const handleIngredientChange = (text) => {
    setIngredientInput(text);
  };

  const fetchRecipes = async () => {
    try {
      const response = await fetch(`${API_URL}?ingredients=${ingredientInput}&apiKey=${API_KEY}`);
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const renderRecipeItem = ({ item }) => (
    <TouchableOpacity style={styles.recipeItem}>
      <Text style={styles.recipeTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter ingredients separated by commas"
        value={ingredientInput}
        onChangeText={handleIngredientChange}
      />
      <Button title="Find Recipes" onPress={fetchRecipes} />
      <FlatList
        data={recipes}
        renderItem={renderRecipeItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  recipeItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default App;
