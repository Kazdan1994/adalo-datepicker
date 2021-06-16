import React, {useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import initSchedule from './initSchedule';
import Calendar from './Calendar';

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

  const schedule = datesBooked === undefined ? undefined : initSchedule(availability, datesBooked, timezone);

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
    lineHeight: '200px',
    height: '200px',
  },
  calendar: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: '2%',
    marginLeft: '2%',
    marginRight: '2%',
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
