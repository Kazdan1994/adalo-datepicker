import React from 'react';
import moment from 'moment';
import Header from './Header';
import Body from './Body';

const filterDate = (scheduledDate, dateStart, dateEnd, step) => {
  const mDate = moment(scheduledDate).startOf('day');
  const cDate = moment(dateStart).startOf('day');
  const eDate = moment(dateEnd).startOf('day');
  const diffBegin = mDate.diff(cDate, 'd');
  const diffEnd = eDate.diff(mDate, 'd');

  return diffBegin >= 0 && diffBegin <= step && diffEnd >= 0 && diffEnd <= step;
};

const Calendar = ({
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
  const now = moment();
  const [date, setDate] = React.useState(now);
  const dateEnd = moment(date).add(step - 1, 'd');
  const nextDate = moment(date).add(step, 'd');

  return (
    <>
      <Header
        dateStart={date}
        dateEnd={dateEnd}
        prevActive={now.diff(date, 'd') !== 0}
        nextActive={
          schedule?.filter((scheduledDate) =>
            filterDate(
              scheduledDate,
              nextDate,
              moment(nextDate).add(step - 1, 'd'),
              step,
            ),
          ).length > 0
        }
        prev={() => {
          setDate(moment(date).subtract(step, 'd'));
        }}
        next={() => {
          setDate(nextDate);
        }}
      />
      <Body
        dateStart={moment(date).startOf('day')}
        step={step}
        schedule={schedule?.filter((scheduledDate) =>
          filterDate(scheduledDate, date, dateEnd, step),
        )}
        onClick={onClick}
        emptyRender={emptyRender}
        limited={limited}
        setLimitFreeTimeShown={setLimitFreeTimeShown}
        circleButton={circleButton}
        rowDisplay={rowDisplay}
        fontTextButton={fontTextButton}
        colorButton={colorButton}
      />
    </>
  );
};

export default Calendar;
