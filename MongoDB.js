const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/certificateDB', {
  //.then(() => console.log('Connected to MongoDB'))
  //.catch((err) => console.error('Failed to connect to MongoDB', err));
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const certificateSchema = new mongoose.Schema({
  name: String,
  date: String,
  event: String,
});

const Certificate = mongoose.model('Certificate', certificateSchema);
