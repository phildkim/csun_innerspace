import EmotionData from './EmotionData';
import moment from 'moment';
const title = EmotionData(5);
const daily = EmotionData(7);

function createTotal(total, title) {
  return { total, title };
};
function createCount(title, total) {
  return { title, total };
};
function createCollections(
  date, Happy, Sadness, Anger, Fearful, Boredom, Disgust) {
  return { date, Happy, Sadness, Anger, Fearful, Boredom, Disgust };
};
export default function EmotionsDaily(data, type) {
  function count(id) {
    let total = 0;
    data.map((obj) => (total += (obj.titleId === id) ? 1 : 0));
    return total;
  };
  const emotionsCount = [];
  for (let i = 0; i < 6; i += 1) {
    emotionsCount.push(createCount(title[i], count(i)));
  }
  const emotionsTotal = [];
  for (let i = 0; i < 6; i += 1)
    emotionsTotal.push(createTotal(count(i), title[i]));

  function countCollections(day, srn) {
    let counter = 0;
    data.map((obj) => { counter += (moment(obj.date).format('dddd') === day && obj.titleId === srn) ? 1 : 0 });
    return counter;
  };
  const emotionsCollection = [];
  for (let i = 0; i < 7; i += 1) {
    emotionsCollection.push(createCollections(
      daily[i],
      countCollections(daily[i], 0),
      countCollections(daily[i], 1),
      countCollections(daily[i], 2),
      countCollections(daily[i], 3),
      countCollections(daily[i], 4),
      countCollections(daily[i], 5)
    ));
  }
  switch (type) {
    case 0:
      return emotionsCount;
    case 1:
      return emotionsTotal;
    case 2:
      return emotionsCollection;
  }
};