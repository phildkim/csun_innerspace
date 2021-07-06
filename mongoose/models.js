import './init';
import mongoose, { ObjectId } from 'mongoose';

mongoose.model('User', {
  fullname: {
    type: String,
    required: true
  },
  usertype: {
    type: String,
    enum: ['student', 'teacher'],
    required: true
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  passwordHash: {
    type: String,
    select: true,
    required: true
  },
  lastOnline: {
    type: Date
  }
});

mongoose.model('Program', {
  title: {
    type: String,
    required: true
  },
  questions: {
    type: Array,
    required: true
  }
});

mongoose.model('Emotion', {
  id: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false
  },
  animations: {
    type: Array,
    required: false
  },
  emotions: {
    type: Array,
    required: true
  }
});

mongoose.model('Result', {
  user: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  titleId: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  emotionId: {
    type: Number,
    required: true
  },
  emotion: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
});

export const {
  User,
  Program,
  Emotion,
  Result
} = mongoose.models;