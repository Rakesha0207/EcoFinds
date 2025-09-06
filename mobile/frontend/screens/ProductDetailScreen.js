import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function ProductDetailScreen({ route, navigation }) {
  const { product } = route.params;
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCurrentUser();
  }, []);

  const loadCurrentUser = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        setCurrentUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const handleContactSeller = () => {
    Alert.alert(
      'Contact Seller',
      'This feature will be implemented with messaging functionality.',
      [{ text: 'OK' }]
    );
  };

  const handleAddToCart = () => {
    Alert.alert(
      'Add to Cart',
      'This feature will be implemented with cart functionality.',
      [{ text: 'OK' }]
    );
  };

  const handleEditProduct = () => {
    navigation.navigate('AddProduct', { product, isEdit: true });
  };

  const handleDeleteProduct = () => {
    Alert.alert(
      'Delete Product',
      'Are you sure you want to delete this product?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: deleteProduct
        }
      ]
    );
  };

  const deleteProduct = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('authToken');
      await axios.delete(
        `http://localhost:3000/api/products/${product.id}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      Alert.alert('Success', 'Product deleted successfully', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      console.error('Delete product error:', error);
      Alert.alert('Error', 'Failed to delete product');
    } finally {
      setLoading(false);
    }
  };

  const isOwner = currentUser && currentUser.id === product.ownerId;

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{
          uri: product.image || 'https://via.placeholder.com/300x300?text=No+Image'
        }}
        style={styles.image}
      />

      <View style={styles.content}>
        <Text style={styles.title}>{product.title}</Text>
        
        <View style={styles.metaInfo}>
          <Text style={styles.category}>{product.category}</Text>
          <Text style={styles.condition}>Condition: {product.condition}</Text>
          <Text style={styles.status}>Status: {product.status}</Text>
        </View>

        <Text style={styles.price}>${product.price}</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>
            {product.description || 'No description provided.'}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Product Details</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Listed:</Text>
            <Text style={styles.detailValue}>
              {new Date(product.createdAt).toLocaleDateString()}
            </Text>
          </View>
          {product.updatedAt && product.updatedAt !== product.createdAt && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Updated:</Text>
              <Text style={styles.detailValue}>
                {new Date(product.updatedAt).toLocaleDateString()}
              </Text>
            </View>
          )}
        </View>

        {isOwner ? (
          <View style={styles.ownerActions}>
            <TouchableOpacity
              style={[styles.actionButton, styles.editButton]}
              onPress={handleEditProduct}
            >
              <Text style={styles.actionButtonText}>Edit Product</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.deleteButton]}
              onPress={handleDeleteProduct}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.actionButtonText}>Delete Product</Text>
              )}
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.buyerActions}>
            <TouchableOpacity
              style={[styles.actionButton, styles.contactButton]}
              onPress={handleContactSeller}
            >
              <Text style={styles.actionButtonText}>Contact Seller</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.cartButton]}
              onPress={handleAddToCart}
            >
              <Text style={styles.actionButtonText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: '100%',
    height: 300,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  metaInfo: {
    marginBottom: 15,
  },
  category: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  condition: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  status: {
    fontSize: 14,
    color: '#2196F3',
    fontWeight: 'bold',
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    width: 80,
  },
  detailValue: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  ownerActions: {
    marginTop: 20,
  },
  buyerActions: {
    marginTop: 20,
  },
  actionButton: {
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: '#2196F3',
  },
  deleteButton: {
    backgroundColor: '#f44336',
  },
  contactButton: {
    backgroundColor: '#4CAF50',
  },
  cartButton: {
    backgroundColor: '#FF9800',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
