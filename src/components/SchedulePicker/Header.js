import React from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {ArrowBack, ArrowForward} from '@material-ui/icons';

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
        <TouchableOpacity style={{flex:1}} onPress={prevActive ? prev : null}>
          <ArrowBack/>
        </TouchableOpacity>
        <Text style={styles.span}>
          Du {dateStart.format('DD MMM')} au {dateEnd.format('DD MMM')}
        </Text>
        <TouchableOpacity style={{flex:1}} onPress={nextActive ? next : null}>
          <ArrowForward/>
        </TouchableOpacity>
      </View>
  )
};

const styles = StyleSheet.create({
  dateInterval: {
    marginBottom: '8px',
    fontSize: '1.4rem',
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'space-around',
    textAlign: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  span: {
    width: '80%',
    fontSize: '1.25rem',
    marginTop: '5px',
    opacity: 0.9,
  },
});

export default Header;
