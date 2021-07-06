import { colors } from '@material-ui/core';

// emotions id
const emotionids = [0, 1, 2, 3, 4, 5];

// rows counter
const rows = [0, 1, 2, 3, 4, 5, 6];

// columns array
const columns = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

// emotions title
const title = ['Happy', 'Sadness', 'Anger', 'Fearful', 'Boredom', 'Disgust'];

// emotions daily
const daily = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturdy', 'Sunday'];

// emotions color list
const colorlist = [
  colors.yellow[700],
  colors.blue[500],
  colors.red[600],
  colors.purple[300],
  colors.blueGrey[500],
  colors.green[600]
];

// table header titles
const header = [
  { id: 0, label: 'Happy', minWidth: 150, align: 'right', numeric: false, disablePadding: true, },//happy
  { id: 1, label: '#', minWidth: 30, align: 'left', numeric: true, disablePadding: false, },//#
  { id: 2, label: 'Sadness', minWidth: 150, align: 'right', numeric: false, disablePadding: true, },//sad
  { id: 3, label: '#', minWidth: 30, align: 'left', numeric: true, disablePadding: false, },//#
  { id: 4, label: 'Anger', minWidth: 150, align: 'right', numeric: false, disablePadding: true, },//anger
  { id: 5, label: '#', minWidth: 30, align: 'left', numeric: true, disablePadding: false, },//#
  { id: 6, label: 'Fearful', minWidth: 150, align: 'right', numeric: false, disablePadding: true, },//fear
  { id: 7, label: '#', minWidth: 30, align: 'left', numeric: true, disablePadding: false, },//#
  { id: 8, label: 'Boredom', minWidth: 150, align: 'right', numeric: false, disablePadding: true, },//boredom
  { id: 9, label: '#', minWidth: 30, align: 'left', numeric: true, disablePadding: false, },//#
  { id: 10, label: 'Disgust', minWidth: 150, align: 'right', numeric: false, disablePadding: true, },//disgust
  { id: 11, label: '#', minWidth: 30, align: 'left', numeric: true, disablePadding: false, },
];

// table body titles
const body = [
  { id: 0, label: ['Joyful', 'Individual Success', 'Team Success', 'Parent Congratulations', 'Friend Congratulations', 'Physical Love', 'Happy'], minWidth: 150, height: 50, align: 'right', numeric: false, disablePadding: true, },
  { id: 1, minWidth: 30, height: 50, align: 'left', numeric: true, disablePadding: false, },
  { id: 2, label: ['Personal Loss', 'Family Loss', 'Tangible Loss', 'Neglect/Bullying', 'Sad Alone', 'Self Image (Reflection)', 'Sadness'], minWidth: 150, height: 50, align: 'right', numeric: false, disablePadding: true, },
  { id: 3, minWidth: 30, height: 50, align: 'left', numeric: true, disablePadding: false, },
  { id: 4, label: ['Fighting With Others', 'Lashing Out', 'Tantrum (Internal)', 'Tantrum (External)', 'Jealousy', 'Loss', 'Anger'], minWidth: 150, height: 50, align: 'right', numeric: false, disablePadding: true, },
  { id: 5, minWidth: 30, height: 50, align: 'left', numeric: true, disablePadding: false, },
  { id: 6, label: ['External Fear of Objects', 'Anxiety in Social Situation', 'Fear of Spiders', 'Internal Fear', 'External Non-Real Fear', 'Fear of Physical Danger', 'Fearful'], minWidth: 150, height: 50, align: 'right', numeric: false, disablePadding: true, },
  { id: 7, minWidth: 30, height: 50, align: 'left', numeric: true, disablePadding: false, },
  { id: 8, label: ['Uninterested of Objects', 'Bored Alone', 'Lacking Responsiveness', 'Uninterested in Playing', 'Bored With Chore', 'Ignoring Authority Figure', 'Boredom'], minWidth: 150, height: 50, align: 'right', numeric: false, disablePadding: true, },
  { id: 9, minWidth: 30, height: 50, align: 'left', numeric: true, disablePadding: false, },
  { id: 10, label: ['Smelling Stinky Laundry', 'Smelling Skunk Skunk Odor', 'Smelling Garbage', 'Stepping on Gum', 'Dirty Hands', 'Disgust With Littering', 'Disgust'], minWidth: 150, height: 50, align: 'right', numeric: false, disablePadding: true, },
  { id: 11, minWidth: 30, height: 50, align: 'left', numeric: true, disablePadding: false, },
];

export default function EmotionsData(e) {
  switch (e) {
    case 0:
      return rows;
    case 1:
      return columns;
    case 2:
      return colorlist;
    case 3:
      return header;
    case 4:
      return body;
    case 5:
      return title;
    case 6:
      return emotionids;
    case 7:
      return daily;
  }
};