# Jukebox 

# Project Structure

MUSIC-RECOMMENDATION/<br>
├── jukebox-backend/       <br> # Node.js backend (APIs, Socket.IO, MongoDB)
├── jukebox-frontend/    <br>   # Frontend (HTML, JS, Materialize CSS)
├── docker-compose.yml   <br>   # Docker configuration for backend and frontend
├── .gitignore<br>
├── contribs.md<br>
├── package-lock.json<br>
└── README.md             <br>  # This file


# step 1 Clone the repository

Create a folder with any name and open it in VS Code.

Then, open the terminal from the top menu in VS Code. By default, it may open in PowerShell, and some commands might not work properly. So, it's recommended to switch the terminal to Git Bash before running the commands below.

git clone https://github.com/AK199417/Music-Recommendation.git

cd Music-Recommendation

# step 2 Create environment variables file

Rename the .env.example file located in jukebox-backend/ to .env using the following command (or do it manually):

mv jukebox-backend/.env.example jukebox-backend/.env


Add the following keys and replace the values as needed (these values are shared through the OnTrack submission file at the last page unde values heading):


PORT=shared_prot<br>
MONGO_URL=shared_mongo_connection_string<br>
MONGO_ATLAS_URI=cloud_monog_connection_string<br>
JWT_SECRET=shared_secret_key<br>
SPOTIFY_CLIENT_ID=shared_ID<br>
SPOTIFY_CLIENT_SECRET=shared_secret<br>
SPOTIFY_REDIRECT_URI=shared_url<br>
FRONTEND_URL=shared_url<br>
AWS_ACCESS_KEY_ID=shared_aws_key_id<br>
AWS_SECRET_ACCESS_KEY=shared_aws_access_key<br>
AWS_REGION=shared_region<br>
MONGO_SECRET_KEY=shared_key<br>
ADMIN_EMAIL=provide_any_valid_email<br>
ADMIN_PASSWORD=provide_any_password<br>


#  Step 3 Build and Run the Containers

Inside the Music-Recommendation folder, run the following commands:

removing all images which may can cause conflict in new build as well 'docker system prune -a --volumes -f'<br>
build image - 'docker-compose build'<br>
run the container - 'docker-compose up'<br>


# step 4 access the web

Once running, open your browser and go to:

http://localhost:3000

To check the student identity endpoint, use:

GET http://localhost:3000/api/student

Expected Output:

{"name":"Arulrajah Kumaraguruparar","studentId":"s224961108"}
