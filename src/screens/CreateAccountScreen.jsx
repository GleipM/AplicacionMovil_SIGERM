import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, StyleSheet, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import { categories } from '../utils/Categories';

const CreateAccountScreen = () => {
  const [selectedDishes, setSelectedDishes] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [modalVisible, setModalVisible] = useState(false);
  const [dishToAdd, setDishToAdd] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const navigation = useNavigation();

  const handleSelectDish = (dish) => {
    setDishToAdd(dish);
    setQuantity(1);
    setNotes('');
    setModalVisible(true);
  };

  const handleConfirmAddDish = () => {
    setSelectedDishes((prev) => {
      const existingDish = prev.find(dish => dish.name === dishToAdd.name);
      if (existingDish) {
        // Si el platillo ya existe, actualiza la cantidad y las observaciones
        return prev.map(dish =>
          dish.name === dishToAdd.name
            ? { ...dish, quantity: dish.quantity + quantity, notes: notes || dish.notes }
            : dish
        );
      } else {
        // Si el platillo no existe, agrégalo con la cantidad y observaciones actuales
        return [...prev, { ...dishToAdd, quantity, notes }];
      }
    });
    setModalVisible(false);
    setDishToAdd(null);
    setQuantity(1);
    setNotes('');
  };
  
  const handleGoToCart = () => {
    navigation.navigate('ConfirmAccountScreen', { selectedDishes });
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
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header title="Genera una cuenta" />
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Buscar platillo"
          placeholderTextColor="#A0A0A0"
          value={search}
          onChangeText={setSearch}
        />
      </View>
      <View style={styles.categoryContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.categoryItem,
                selectedCategory?.id === item.id && styles.selectedCategory
              ]}
              onPress={() => handleSelectCategory(item)}
            >
              <Image source={item.image} style={styles.categoryIcon} />
              <Text style={[
                styles.categoryText,
                selectedCategory?.id === item.id && styles.selectedCategoryText
              ]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <FlatList
        data={selectedCategory.dishes.filter(dish => dish.name.toLowerCase().includes(search.toLowerCase()))}
        renderItem={renderDish}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatListContent}
        style={styles.flatList}
      />
      <TouchableOpacity style={styles.cartButton} onPress={handleGoToCart}>
        <Image source={require('../../assets/favicon.png')} style={styles.cartIcon} />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            {dishToAdd && (
              <>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%' }}>
                  <Image source={dishToAdd.image} style={styles.modalImage} />
                  <View style={{ alignItems: 'center', justifyContent: "center" }}>
                    <Text style={styles.modalTitle}>{dishToAdd.name}</Text>
                    <View style={styles.quantityContainer}>
                      <TouchableOpacity onPress={() => setQuantity(Math.max(1, quantity - 1))}>
                        <Text style={styles.quantityButton}>-</Text>
                      </TouchableOpacity>
                      <Text style={styles.quantityText}>{quantity}</Text>
                      <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
                        <Text style={styles.quantityButton}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <TextInput
                  style={styles.observationsInput}
                  placeholder="Añadir observaciones..."
                  placeholderTextColor="#A0A0A0"
                  multiline
                  value={notes}
                  onChangeText={setNotes}
                />
                <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmAddDish}>
                  <Text style={styles.confirmButtonText}>Agregar</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  searchContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  searchBar: {
    width: '90%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#9B1C31',
  },
  categoryContainer: {
    marginVertical: 10,
  },
  categoryItem: {
    backgroundColor: '#FFF',
    padding: 8,
    width: 110,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#000',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  selectedCategory: {
    backgroundColor: '#F8E1E7',
    borderColor: '#9B1C31',
  },
  categoryText: {
    color: '#000',
    fontWeight: '400',
  },
  selectedCategoryText: {
    color: '#000',
  },
  categoryIcon: {
    width: 40,
    height: 40,
    marginBottom: 5,
  },
  flatList: {
    flex: 1,
  },
  flatListContent: {
    paddingBottom: 20,
    alignItems: 'center',
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
    width: '90%',
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
  cartButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#9B1C31',
    padding: 15,
    borderRadius: 50,
  },
  cartIcon: {
    width: 30,
    height: 30,
    tintColor: '#FFF',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityContainer: {
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#DDD',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  quantityButton: {
    fontSize: 20,
    paddingHorizontal: 10,
    color: '#DDD',
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  observationsInput: {
    width: '100%',
    height: 60,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    textAlignVertical: 'top',
  },
  confirmButton: {
    backgroundColor: '#9B1C31',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CreateAccountScreen;