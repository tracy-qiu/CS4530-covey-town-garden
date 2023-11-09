// example database connection, should be moved to main app file location
import mongoose from 'mongoose';

// replace with env variable ( ref docs )
const CONNECTION_STRING =
  'mongodb+srv://surabhiKeesara:<password>@garden-cluster.jhykp3h.mongodb.net/garden-area?retryWrites=true&w=majority';

mongoose.connect(CONNECTION_STRING);
