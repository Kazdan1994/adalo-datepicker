import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';

require('moment/locale/fr');

const Header = ({
  dateStart,
  dateEnd,
  prevActive,
  nextActive,
  prev,
  next,
}) => {
  return (
    <View style={styles.dateInterval}>
      <TouchableOpacity style={styles.icon} onPress={prevActive ? prev : null}>
        <Text>{'<'}</Text>
      </TouchableOpacity>
      <Text style={styles.span}>
        Du {dateStart.format('DD MMM')} au {dateEnd.format('DD MMM')}
      </Text>
      <TouchableOpacity style={styles.icon} onPress={nextActive ? next : null}>
        <Text>{'>'}</Text>
      </TouchableOpacity>
    </View>
  )
};

const styles = StyleSheet.create({
  dateInterval: {
    fontSize: 22,
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'space-around',
    textAlign: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    alignContent: 'center',
    alignItems: "center",
    zIndex: 1,
  },
  span: {
    margin: 8,
    opacity: 0.9,
  },
  icon: {
    fontWeight: 'bold',
    fontSize: 30,
    opacity: 0.6,
  }
});

export default Header;
