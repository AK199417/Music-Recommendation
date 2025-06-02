require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const http = require('http');
const socketIO = require('socket.io');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const app = express();
const server = http.createServer(app);

// Use central socket manager
const socketManager = require('./socket');
const io = socketManager.init(server); // Automatically hooks in collabPlaylist.js

// Middleware order matters! 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); // Apply cookie-parser before session
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true
}));


// MongoDB
const dockerUri = process.env.MONGO_URL;
const atlasUri = process.env.MONGO_ATLAS_URI;

let usingCloud = false;

const connectMongo = async (uri, label) => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(`Connected to ${label} MongoDB`);
    return true;
  } catch (err) {
    console.error(`Failed to connect to ${label} MongoDB:`, err.message);
    return false;
  }
};

const initMongoConnection = async () => {
  const connected = await connectMongo(dockerUri, "Docker");

  if (!connected) {
    const fallbackConnected = await connectMongo(atlasUri, "Cloud");
    if (fallbackConnected) usingCloud = true;
  }

  const createAdminUser = require('./adminSetup');
  await createAdminUser();
};

// Handle disconnections dynamically
mongoose.connection.on('disconnected', async () => {
  console.warn('MongoDB disconnected!');

  if (!usingCloud) {
    console.log('Attempting to connect to MongoDB Atlas...');
    const fallbackConnected = await connectMongo(atlasUri, "Cloud");

    if (fallbackConnected) usingCloud = true;
    else console.error('All reconnection attempts failed. Retrying in 10 seconds...');
  }
});

initMongoConnection();

// API Routes (After session & cookieParser!)
const authRoutes = require('./routes/authRoutes');
const songRoutes = require('./routes/songRoutes');
const adminRoutes = require('./routes/adminRoutes');
const userListRoutes = require('./routes/userlistRoutes');
const viewRoutes = require('./routes/viewRoutes');
const playlistRoutes = require('./routes/playlistRoutes');
const collabPlaylistRoutes = require('./routes/collabPlaylistRoutes');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/songs', songRoutes);
app.use('/api/users', userListRoutes);
app.use('/api/users', adminRoutes);
app.use('/api/playlists', playlistRoutes);
app.use('/', viewRoutes);
app.use('/api/playlist', collabPlaylistRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// WebSocket Chat
require('./socket/chat')(io);

// Serve frontend assets
app.use(express.static(path.join(__dirname, 'jukebox-frontend')));
console.log('Landing path:', path.join(__dirname, 'jukebox-frontend', 'views', 'landing.html'));

// Start server
const PORT = process.env.PORT || 3000;


app.get('/api/student', (req, res) => {
  res.json({
    name: 'Arulrajah Kumaraguruparar',
    studentId: 's224961108'
  });
});
// if (cluster.isMaster) {
//   console.log(`Master ${process.pid} is running`);

//   // Fork workers for each CPU
//   for (let i = 0; i < numCPUs; i++) {
//     cluster.fork();
//   }

//   cluster.on('exit', (worker, code, signal) => {
//     console.log(`Worker ${worker.process.pid} died`);
//     cluster.fork();
//   });
// } else {
//   server.listen(PORT, () => {
//     console.log(`Server running at http://localhost:${PORT}`);
//   });
// }

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
