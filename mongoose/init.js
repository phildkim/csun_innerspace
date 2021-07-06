import mongoose from 'mongoose';
import config from '@/config';

/* If mongoose is already loaded, clear models */
Object.keys(mongoose.models).forEach(model => {
  mongoose.deleteModel(model);
});

/* Connect to MongoDB instance */
mongoose.connect(config.MongoDB.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});
