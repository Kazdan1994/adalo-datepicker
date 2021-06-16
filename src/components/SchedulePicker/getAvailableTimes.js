import moment from 'moment';

require('moment/locale/fr');

const getAvailableTimes = (start, end, duration) => {
  const times = [];
  const endTime = moment(end, 'HH:mm');
  const startTime = moment(start, 'HH:mm');

  while (startTime.diff(endTime) < 0) {
    times.push(startTime.format('HH:mm'));
    startTime.add(duration, 'm');
  }

  return times;
};

export default getAvailableTimes;
