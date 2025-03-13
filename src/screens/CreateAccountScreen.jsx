import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Logo from '../../assets/Logo.png';
import { Icon } from 'react-native-elements';
import { categories } from '../utils/Categories';

const CreateAccountScreen = () => {
  const [selectedDishes, setSelectedDishes] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categories[0]); // Seleccionar la primera categoría por defecto
  const navigation = useNavigation();

  const handleSelectDish = (dish) => {
    setSelectedDishes((prev) => [...prev, dish]);
  };

  const handleGoToCart = () => {
    navigation.navigate('CartScreen', { selectedDishes });
  };

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  const renderDish = ({ item }) => (
    <TouchableOpacity style={styles.dishItem} onPress={() => handleSelectDish(item)}>
      <Image source={item.image} style={styles.dishIcon} />
      <View style={styles.dishDetails}>
        <Text style={styles.dishName}>{item.name}</Text>
        <Text style={styles.dishDescription}>{item.description}</Text>
        <Text style={styles.dishPrice}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <View style={{ flexDirection: 'row', justifyContent:"center", alignItems: 'center', }}>
          <Icon name="arrow-back-ios" size={35} color="black" onPress={() => navigation.goBack()} />        
          <Text style={styles.title}>Genera una cuenta</Text>  
        </View>
        
        <View style={{ flexDirection: 'row' }}>
          <Image source={Logo} style={styles.logo} />
        </View>
      </View>

      <View>
        <View style={{paddingHorizontal:20}}>
            <TextInput
                style={styles.searchBar}
                placeholder="Buscar platillo"
                placeholderTextColor="#A0A0A0"
                value={search}
                onChangeText={setSearch}
            />
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryContainer}>
            {categories.map((category) => (
            <TouchableOpacity 
                key={category.id} 
                style={[
                styles.categoryItem, 
                selectedCategory?.id === category.id && styles.selectedCategory
                ]}
                onPress={() => handleSelectCategory(category)}
            >
                <Image source={category.image} style={styles.categoryIcon} />
                <Text style={[
                  styles.categoryText, 
                  selectedCategory?.id === category.id && styles.selectedCategoryText
                ]}>
                  {category.name}
                </Text>
            </TouchableOpacity>
            ))}
        </ScrollView>

        {selectedCategory && (
            <FlatList
            data={selectedCategory.dishes.filter(dish => dish.name.toLowerCase().includes(search.toLowerCase()))}
            renderItem={renderDish}
            keyExtractor={(item) => item.id}
            />
        )}
        
        
        
      </View>
        <TouchableOpacity style={styles.cartButton} onPress={handleGoToCart}>
            <Image source={require('../../assets/favicon.png')} style={styles.cartIcon} />
        </TouchableOpacity>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingTop: 25,
  },
  searchBar: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#9B1C31',
    marginBottom: 10,
  },
  categoryContainer: {
    marginBottom: 10,
  },
  categoryItem: {
    backgroundColor: '#FFF',
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  selectedCategory: {
    backgroundColor: '#9B1C31',
    borderColor: '#9B1C31',
  },
  categoryText: {
    color: 'black',
    fontWeight: 'bold',
  },
  selectedCategoryText: {
    color: '#FFF',
  },
  dishItem: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#DDD',
    alignItems: 'center',
    marginHorizontal:10,
  },
  dishIcon: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  dishDetails: {
    flex: 1,
  },
  dishName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dishDescription: {
    fontSize: 14,
    color: '#666',
  },
  dishPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#9B1C31',
  },
  cartButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#9B1C31',
    padding: 15,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  cartIcon: {
    width: 30,
    height: 30,
    tintColor: '#FFF',
  },
  categoryIcon: {
    width: 40,
    height: 40,
    marginBottom: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', 
    marginBottom: 20,
    paddingHorizontal: 15,
    padding:5,
    backgroundColor: "#ffffff",
    borderBottomColor: "#9B1C31",
    borderBottomWidth:1,
  },
  logo: {
    width: 45,
    height: 45,
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 15,
  },
});

export default CreateAccountScreen;