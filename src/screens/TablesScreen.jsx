import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Logo from '../../assets/Logo.png';
import { Icon } from 'react-native-elements';
import { tables } from '../utils/Tables'

const TablesScreen = () => {
  const [mesaState, setMesaState] = useState(tables);
  const navigation = useNavigation();

  const handlePressTable = (id) => {
    const selectedTable = mesaState.find(mesa => mesa.id === id);
    if (selectedTable.enabled) {
      Alert.alert('Información', 'Esta mesa ya está habilitada.');
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

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.tableItem, item.enabled && styles.tableEnabled]}
      onPress={() => handlePressTable(item.id)}
      disabled={item.enabled}
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
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', justifyContent:"center", alignItems: 'center', }}>
          <Icon name="arrow-back-ios" size={35} color="black" onPress={() => navigation.goBack()} />        
          <Text style={styles.title}>Tus mesas</Text>  
        </View>
        
        <View style={{ flexDirection: 'row' }}>
          <Image source={Logo} style={styles.logo} />
        </View>
      </View>

      <FlatList
        data={mesaState}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingTop: 25,
  },
  listContainer: {
    marginTop:-10,
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
    borderColor: '#000',
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

export default TablesScreen;