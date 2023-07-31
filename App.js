import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet } from 'react-native';

const API_KEY = '3ad313351a7449639612b18f3969f4b3';
const API_URL = 'https://api.spoonacular.com/recipes/findByIngredients';
const IMAGE_URL = 'https://spoonacular.com/recipeImages/';

const App = () => {
  const [ingredients, setIngredients] = useState('');
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState('');

  const fetchRecipe = async () => {
    setError('');
    try {
      const response = await fetch(
        `${API_URL}?apiKey=${API_KEY}&ingredients=${encodeURIComponent(
          ingredients
        )}&number=1`
      );
      const data = await response.json();

      if (data && data.length > 0) {
        const recipeId = data[0].id;
        const recipeResponse = await fetch(
          `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${API_KEY}`
        );
        const detailedRecipe = await recipeResponse.json();
        setRecipe(detailedRecipe);
      } else {
        setError('No recipe found for the provided ingredients.');
      }
    } catch (error) {
      setError('Error fetching data from the server.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recipe Recommendation</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your ingredients (comma-separated)"
        value={ingredients}
        onChangeText={(text) => setIngredients(text)}
      />
      <Button title="Get Recipe" onPress={fetchRecipe} />
      {recipe && (
        <View style={styles.recipeContainer}>
          <Text style={styles.recipeTitle}>{recipe.title}</Text>
          {recipe.image && (
            <Image
              source={{ uri: `${IMAGE_URL}${recipe.image}` }}
              style={styles.recipeImage}
            />
          )}
          <Text style={styles.recipeInstructions}>
            {recipe.instructions || 'Instructions not available.'}
          </Text>
        </View>
      )}
      {error !== '' && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  recipeContainer: {
    marginTop: 30,
  },
  recipeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  recipeImage: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  recipeInstructions: {
    fontSize: 16,
    textAlign: 'justify',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});

export default App;
