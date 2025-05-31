# Jukebox 

# Project Structure

MUSIC-RECOMMENDATION/
├── jukebox-backend/        # Node.js backend (APIs, Socket.IO, MongoDB)
├── jukebox-frontend/       # Frontend (HTML, JS, Materialize CSS)
├── docker-compose.yml      # Docker configuration for backend and frontend
├── .gitignore
├── contribs.md
├── package-lock.json
└── README.md               # This file


# step 1 Clone the repository

 git clone https://github.com/AK199417/Music-Recommendation.git

cd Music-Recommendation

# step 2 Switch to your feature branch

git checkout/dockerization

# step 3 Create environment variables file

Rename .env.example file under jukebox-backend/ to .env 

PORT=shared_prot
MONGO_URL=shared_mongo_connection_string
JWT_SECRET=shared_secret_key
SPOTIFY_CLIENT_ID=shared_ID
SPOTIFY_CLIENT_SECRET=shared_secret
SPOTIFY_REDIRECT_URI=shared_url
FRONTEND_URL=shared_url
MONGO_SECRET_KEY=shared_key

These values are shared through the OnTrack submission file. Once the .env file is created, please replace the values accordingly.

#  Step 4 Build and run

run the below commands inside Music-Recommendation folder

build image - 'docker-compose build'
run the container - 'docker-compose up'
to make sure wethere docker is runnning we can use given command ' docker ps'

# step 5 access the web

The app will be available at: http://localhost:3000

and Student Identity Endpoint
GET http://localhost:3000/api/student

Expected Output:
{
  "name": "Arulrajah Kumaraguruparar","studentId": "s224961108"
}
