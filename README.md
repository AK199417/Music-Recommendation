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

Create a folder with any name and open it in VS Code.

Then, open the terminal from the top menu in VS Code. By default, it may open in PowerShell, and some commands might not work properly. So, it's recommended to switch the terminal to Git Bash before running the commands below.

git clone https://github.com/AK199417/Music-Recommendation.git

cd Music-Recommendation

# step 2 Switch to your feature branch

git checkout feature/dockerization

# step 3 Create environment variables file

Rename the .env.example file located in jukebox-backend/ to .env using the following command (or do it manually):

mv jukebox-backend/.env.example jukebox-backend/.env


Add the following keys and replace the values as needed (these values are shared through the OnTrack submission file at the last page unde values heading):

PORT=shared_prot
MONGO_URL=shared_mongo_connection_string
JWT_SECRET=shared_secret_key
SPOTIFY_CLIENT_ID=shared_ID
SPOTIFY_CLIENT_SECRET=shared_secret
SPOTIFY_REDIRECT_URI=shared_url
FRONTEND_URL=shared_url
MONGO_SECRET_KEY=shared_key


#  Step 4 Build and Run the Containers

Inside the Music-Recommendation folder, run the following commands:

build image - 'docker-compose build'
run the container - 'docker-compose up'


# step 5 access the web

Once running, open your browser and go to:

http://localhost:3000

To check the student identity endpoint, use:

GET http://localhost:3000/api/student

Expected Output:

{"name":"Arulrajah Kumaraguruparar","studentId":"s224961108"}
