import React, {useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import initSchedule from './initSchedule';
import Calendar from './Calendar';
import moment from 'moment';

const SchedulePicker = ({
                          availability,
                          timezone,
                          datesBooked,
                          actionsPriseRDV,
                          circleButton,
                          rowDisplay,
                          fontTextButton,
                          colorButton
                        }) => {
  const [appointment, setAppointment] = useState({
    date: null,
    fade: false,
  });
  const [limitFreeTimeShown, setLimitFreeTimeShown] = useState(true);

  const schedule = datesBooked === undefined ? undefined : initSchedule(availability, datesBooked, 'Europe/Paris');

  return schedule === undefined ? (<ActivityIndicator/>) : (
    <View style={styles.calendar}>
      <Calendar
        step={3}
        rowDisplay={rowDisplay}
        schedule={schedule}
        onClick={(date) => {
          setAppointment({ date, fade: true });
          actionsPriseRDV(moment(date).format());
          if (!limitFreeTimeShown) {
            setLimitFreeTimeShown(true);
          }
        }}
        emptyRender={
          <View className={styles.emptySlots}>
            <Text>Tous les créneaux sont déjà pris</Text>
          </View>
        }
        limited={limitFreeTimeShown}
        setLimitFreeTimeShown={setLimitFreeTimeShown}
        circleButton={circleButton}
        fontTextButton={fontTextButton}
        colorButton={colorButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptySlots: {
    textAlign: 'center',
    backgroundColor: 'grey',
    lineHeight: 200,
    height: 200,
  },
  calendar: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  button: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  dialog: {
    zIndex: 2,
    width: '100%',
    backgroundColor: 'white',
    alignSelf: 'center',
    textAlign: 'center',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
});

export default SchedulePicker;
