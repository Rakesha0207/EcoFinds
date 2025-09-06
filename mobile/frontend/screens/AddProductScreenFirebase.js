import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Image
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addProduct } from '../services/firebaseProducts';

const categories = [
  'Electronics',
  'Clothing',
  'Books',
  'Furniture',
  'Sports',
  'Toys',
  'Home & Garden',
  'Other'
];

const conditions = ['Excellent', 'Good', 'Fair', 'Poor'];

export default function AddProductScreenFirebase({ navigation }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [condition, setCondition] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a product title');
      return;
    }

    if (!category) {
      Alert.alert('Error', 'Please select a category');
      return;
    }

    if (!price || isNaN(price) || parseFloat(price) < 0) {
      Alert.alert('Error', 'Please enter a valid price');
      return;
    }

    setLoading(true);

    try {
      // Get current user from AsyncStorage
      const userData = await AsyncStorage.getItem('userData');
      if (!userData) {
        Alert.alert('Error', 'User not authenticated');
        return;
      }

      const user = JSON.parse(userData);

      // Prepare product data for Firebase
      const productData = {
        ownerId: user.id,
        title: title.trim(),
        description: description.trim(),
        category,
        price: parseFloat(price),
        condition: condition || 'Good',
        image: image.trim() || null,
        status: 'available'
      };

      // Add product to Firebase
      const result = await addProduct(productData);

      if (result.success) {
        Alert.alert('Success', 'Product added successfully to Firebase!', [
          {
            text: 'OK',
            onPress: () => navigation.goBack()
          }
        ]);
      } else {
        Alert.alert('Error', result.error || 'Failed to add product');
      }
    } catch (error) {
      console.error('Add product error:', error);
      Alert.alert('Error', 'Failed to add product to Firebase');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.firebaseHeader}>🔥 Add Product to Firebase</Text>
        
        <Text style={styles.label}>Product Title *</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Enter product title"
          maxLength={100}
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={description}
          onChangeText={setDescription}
          placeholder="Describe your product"
          multiline
          numberOfLines={4}
          maxLength={500}
        />

        <Text style={styles.label}>Category *</Text>
        <View style={styles.categoryContainer}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryButton,
                category === cat && styles.categoryButtonSelected
              ]}
              onPress={() => setCategory(cat)}
            >
              <Text
                style={[
                  styles.categoryButtonText,
                  category === cat && styles.categoryButtonTextSelected
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Price ($) *</Text>
        <TextInput
          style={styles.input}
          value={price}
          onChangeText={setPrice}
          placeholder="0.00"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Condition</Text>
        <View style={styles.conditionContainer}>
          {conditions.map((cond) => (
            <TouchableOpacity
              key={cond}
              style={[
                styles.conditionButton,
                condition === cond && styles.conditionButtonSelected
              ]}
              onPress={() => setCondition(cond)}
            >
              <Text
                style={[
                  styles.conditionButtonText,
                  condition === cond && styles.conditionButtonTextSelected
                ]}
              >
                {cond}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Image URL (Optional)</Text>
        <TextInput
          style={styles.input}
          value={image}
          onChangeText={setImage}
          placeholder="https://example.com/image.jpg"
          keyboardType="url"
        />

        {image && (
          <View style={styles.imagePreview}>
            <Text style={styles.imagePreviewLabel}>Preview:</Text>
            <Image
              source={{ uri: image }}
              style={styles.previewImage}
              onError={() => setImage('')}
            />
          </View>
        )}

        <TouchableOpacity
          style={[styles.submitButton, loading && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.submitButtonText}>
            {loading ? 'Adding to Firebase...' : 'Add to Firebase'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  form: {
    padding: 20,
  },
  firebaseHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF9800',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 16,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#4CAF50',
    backgroundColor: '#fff',
  },
  categoryButtonSelected: {
    backgroundColor: '#4CAF50',
  },
  categoryButtonText: {
    color: '#4CAF50',
    fontSize: 14,
  },
  categoryButtonTextSelected: {
    color: '#fff',
  },
  conditionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  conditionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2196F3',
    backgroundColor: '#fff',
  },
  conditionButtonSelected: {
    backgroundColor: '#2196F3',
  },
  conditionButtonText: {
    color: '#2196F3',
    fontSize: 14,
  },
  conditionButtonTextSelected: {
    color: '#fff',
  },
  imagePreview: {
    marginTop: 10,
  },
  imagePreviewLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  previewImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  submitButton: {
    backgroundColor: '#FF9800',
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#ccc',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
