#Run app
1. open monit-table folder
2. run "npm install" in ./api and ./client folder
3. docker build ./api/ -t api
4. docker build ./client/ -t client
5. docker images (check images id)
6. docker run -d -p 8000:8000 <api image id>
7. docker run -d -p 3000:3000 <client image id>
8. http://localhost:3000
9. docker ps
10. docker stop <container id or name>