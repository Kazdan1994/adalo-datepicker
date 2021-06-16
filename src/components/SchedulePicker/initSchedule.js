import moment from 'moment-timezone';
import getAvailableTimes from './getAvailableTimes';

const initSchedule = (availableTimes, datesBooked, timezone) => {
  if (!availableTimes) {
    return [];
  }

  /* First get all available times of the week using week configuration */
  const days = [];

  const sortTimes = availableTimes.split(',').sort();
  sortTimes.forEach((sortTime) => {
    const [day, start, end, duration] = sortTime.split('-');
    const iDay = parseInt(day, 10);
    const dayAvailableTimes = getAvailableTimes(start, end, duration);

    if (Array.isArray(days[iDay])) {
      dayAvailableTimes.forEach((dayAvailableTime) => {
        if (days[iDay].findIndex((dayRegistered) => dayRegistered === dayAvailableTime) === -1) {
          days[iDay].push(dayAvailableTime);
        }
      });
    } else {
      days[iDay] = dayAvailableTimes;
    }
  });

  const nbDayToFill = 28;
  const schedule = [];
  const mDay = moment();

  /* Fill all calendar */
  const dateArrayBooked = datesBooked.map((el) => {
    return el?._meta?.record?.c_410cn9z32rz19ugnvve0hi6pg
  })
  const datesBookedInDate = dateArrayBooked.map((dateBooked) => moment(dateBooked).tz(timezone).second(0));

  for (
    let i = 0, day = mDay.day();
    i < nbDayToFill;
    i += 1, day = (day + 1) % 7, mDay.add(1, 'day')
  ) {
    if (Array.isArray(days[day])) {
      days[day].forEach((dayIt) => {
        const [hour, minute] = dayIt.split(':');
        mDay.set({hour: parseInt(hour, 10), minute: parseInt(minute, 10), second: 0});
        if (
          datesBookedInDate.findIndex((dateBooked) => dateBooked.diff(mDay, 'minutes') === 0) === -1
        ) {
          schedule.push(moment(mDay));
        }
      });
    }
  }

  /* Remove today already past times + next if 10 min */
  const now = moment().add(10, 'minute');

  while (schedule.length && now.diff(schedule[0]) > 0) {
    schedule.shift();
  }
  return schedule;
};

export default initSchedule;
