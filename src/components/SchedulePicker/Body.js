import React from 'react';
import {Text, TouchableOpacity, View, ScrollView} from 'react-native';
import {DataTable} from 'react-native-paper';
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

const Body = ({
                dateStart,
                step,
                schedule,
                onClick,
                emptyRender,
                limited,
                setLimitFreeTimeShown,
                circleButton,
                rowDisplay,
                fontTextButton,
                colorButton
              }) => {
  const dates = moment(dateStart);
  const timeSlots = new Array(step)
    .fill(null)
    .map(() => ({date: [], times: new Set()}));
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
              marginTop: 20,
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
              marginTop: 20,
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
      <ScrollView stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false}>
        <DataTable>
          <DataTable.Header style={{ background: 'white' }}>
            {[...Array(step).keys()].map((i) => {
              const day = dates.format('ddd');
              const date = dates.format('DD');

              dates.add(1, 'd');
              return (
                <DataTable.Title key={i}>
                  {day} {date}
                </DataTable.Title>
              );
            })}
          </DataTable.Header>
        </DataTable>
        <DataTable>
          {aTimes.map((time, i) => (
            <DataTable.Row key={i}>
              {timeSlots.map((timeSlot, j) => (
                <DataTable.Cell key={(timeSlots.length * i + j).toString()} id={j.toString()}>
                  <TouchableOpacity
                    role="button"
                    tabIndex={0}
                    style={timeSlot.times.has(time) ? {
                      textAlign: 'center',
                      height: 40,
                      lineHeight: 40,
                      color: 'white',
                      backgroundColor: colorButton,
                      borderRadius: circleButton
                    } : ''}
                    onKeyDown={
                      timeSlot.times.has(time)
                        ? () => onClick(getDate(timeSlot, time))
                        : undefined
                    }
                    onPress={
                      timeSlot.times.has(time)
                        ? () => onClick(getDate(timeSlot, time))
                        : undefined
                    }>
                    <Text
                      style={{
                        fontWeight: fontTextButton,
                        paddingLeft: 8,
                        paddingRight: 8,
                      }}>
                      {timeSlot.times.has(time) ? time : null}
                    </Text>
                  </TouchableOpacity>
                </DataTable.Cell>
              ))}
            </DataTable.Row>
          ))}
        </DataTable>
        {times.size === 0 ? emptyRender : null}
        {renderMoreDisponibility()}
      </ScrollView>
    </>
  );
};

export default Body;
