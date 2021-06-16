import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';

import moment from 'moment';

require('moment/locale/fr');

const getDate = (timeSlot, time) => {
  let i = 0;

  for (const t of timeSlot.times) {
    if (t === time) {
      return timeSlot.date[i];
    }
    ++i;
  }
  return null;
};

const Body = ({ dateStart, step, schedule, onClick, emptyRender, limited, setLimitFreeTimeShown, circleButton, rowDisplay, fontTextButton, colorButton }) => {
  const dates = moment(dateStart);
  const timeSlots = new Array(step)
    .fill(null)
    .map(() => ({ date: [], times: new Set() }));
  const times = new Set();

  schedule?.sort((a, b) => a - b)
    .forEach((date) => {
      const mDate = moment(date);
      const time = mDate.format('HH:mm');
      const index = mDate.diff(dateStart, 'd');

      times.add(time);
      timeSlots[index].date.push(mDate);
      timeSlots[index].times.add(time);
    });

  let aTimes = Array.from(times).sort();

  if (limited) {
    aTimes = aTimes.slice(0, rowDisplay);
  }

  const renderMoreDisponibility = () => {
    if (times.size > 0) {
      if (limited) {
        return (
          <View
            style={{
              textAlign: 'center',
              textDecoration: 'underline',
              marginTop: '20px',
            }}>
            <TouchableOpacity
              onPress={(e) => {
                e.preventDefault();
                setLimitFreeTimeShown(false);
              }}>
              <Text>Plus de disponibilités</Text>
            </TouchableOpacity>
          </View>
        )
      } else {
        return (
          <View
            style={{
              textAlign: 'center',
              textDecoration: 'underline',
              marginTop: '20px',
            }}>
            <TouchableOpacity
              onPress={(e) => {
                e.preventDefault();
                setLimitFreeTimeShown(true);
              }}>
              <Text>Moins de disponibilités</Text>
            </TouchableOpacity>
          </View>
        )
      }
    }
  }

  return (
    <>
      <TableContainer style={{
        display: 'flex',
      }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {[...Array(step).keys()].map((i) => {
                const day = dates.format('ddd');
                const date = dates.format('DD');

                dates.add(1, 'd');
                return (
                  <TableCell key={i}>
                    <Text style={styles.day}>{day}</Text>
                    <Text style={styles.date}>{date}</Text>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {aTimes.map((time, i) => (
              <TableRow key={i}>
                {timeSlots.map((timeSlot, j) => (
                  <TableCell key={(timeSlots.length * i + j).toString()} id={j.toString()}>
                    <TouchableOpacity
                      role="button"
                      tabIndex={0}
                      style={timeSlot.times.has(time) ? {
                        textAlign: 'center',
                        height: '2.5rem',
                        lineHeight: '2.5rem',
                        color: 'white',
                        backgroundColor: colorButton,
                        borderRadius: circleButton
                      } : ''}
                      onKeyDown={
                        timeSlot.times.has(time)
                          ? () => onClick?.(getDate(timeSlot, time))
                          : undefined
                      }
                      onPress={
                        timeSlot.times.has(time)
                          ? () => onClick?.(getDate(timeSlot, time))
                          : undefined
                      }>
                      <Text style={{ fontWeight: fontTextButton }}>{timeSlot.times.has(time) ? time : null}</Text>
                    </TouchableOpacity>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {times.size === 0 ? emptyRender : null}
      {renderMoreDisponibility()}
    </>
  );
};

const styles = StyleSheet.create({
  timeslot: {
    textAlign: 'center',
    height: '2.5rem',
    lineHeight: '2.5rem',
    color: 'white',
    backgroundColor: 'blue',
  },
  timeslotRound: {
    textAlign: 'center',
    height: '2.5rem',
    lineHeight: '2.5rem',
    color: 'white',
    backgroundColor: 'blue',
  },
  day: {
    fontSize: 1.25,
    opacity: 0.9,
  },
  date: {
    fontSize: 0.85,
    opacity: 0.6,
  },
});

export default Body;
