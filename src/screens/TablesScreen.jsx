import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, FlatList, Image, Modal, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import { tables } from '../utils/Tables';

const TablesScreen = () => {
  const [mesaState, setMesaState] = useState(tables);
  const [selectedTable, setSelectedTable] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const handlePressTable = (id) => {
    const table = mesaState.find(mesa => mesa.id === id);
    if (table.enabled) {
      setSelectedTable(table);
      setModalVisible(true);
      return;
    }

    Alert.alert(
      'Habilitar Mesa',
      '¿Quieres habilitar esta mesa?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Sí',
          onPress: () => {
            setMesaState(prevState => prevState.map(mesa =>
              mesa.id === id ? { ...mesa, enabled: true } : mesa
            ));
            navigation.navigate('CreateAccountScreen');
          },
        },
      ]
    );
  };

  const handleAddDishes = () => {
    setModalVisible(false);
    navigation.navigate('CreateAccountScreen');
  };

  const handleViewAccount = () => {
    setModalVisible(false);
    Alert.alert('Ver cuenta', `Mostrando cuenta para la mesa: ${selectedTable.name}`);
    // Aquí puedes redirigir a otra pantalla si es necesario
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.tableItem, item.enabled && styles.tableEnabled]}
      onPress={() => handlePressTable(item.id)}
      disabled={item.enabled && modalVisible}
    >
      <Image
        source={require('../../assets/mesa-de-comedor.png')}
        style={[styles.icon, item.enabled && { tintColor: '#9B1C31' }]}
      />
      <Text style={[styles.tableText, item.enabled && { color: '#9B1C31' }]}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Cambia el color de la barra de estado según el estado del modal */}
      <StatusBar
        barStyle={modalVisible ? 'dark-content' : 'light-content'}
        backgroundColor={modalVisible ? 'rgba(0,0,0,0.5)' : '#fff'}
      />
      <Header title="Tus mesas" />
      <FlatList
        data={mesaState}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
      />

      {/* Modal para opciones de mesa */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Opciones para {selectedTable?.name}</Text>
            <TouchableOpacity style={styles.modalButton} onPress={handleAddDishes}>
              <Text style={styles.modalButtonText}>Agregar platillos</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={handleViewAccount}>
              <Text style={styles.modalButtonText}>Ver cuenta</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
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
  listContainer: {
    marginTop: -10,
    alignItems: 'center',
  },
  tableItem: {
    width: 170,
    height: 170,
    backgroundColor: '#FFF',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderWidth: 2,
    borderColor: '#DDD',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 8,
  },
  tableEnabled: {
    borderColor: '#9B1C31',
    backgroundColor: '#F8E1E7',
  },
  icon: {
    width: 100,
    height: 100,
    tintColor: '#000',
  },
  tableText: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  modalContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalButton: {
    backgroundColor: '#9B1C31',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#999',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default TablesScreen;