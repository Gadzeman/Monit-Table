#Run app
1. open 'monit-table' folder 
2. docker build ./api/ -t api
3. docker build ./client/ -t client
4. docker images (check images id)
5. docker run -d -p 8000:8000 <api image id>
6. docker run -d -p 3000:3000 <client image id>
7. http://localhost:3000
8. docker ps
9. docker stop <container id or name>