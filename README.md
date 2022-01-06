#Run app
1. open 'my-table' folder
2. console: docker build ./api/ -t api
3. console: docker build ./client/ -t client
4. console: docker images
5. console: docker run -d -p 8000:8000 <api image id>
6. console: docker run -d -p 3000:3000 <client image id>
7. http://localhost:3000
8. console: docker ps
9. console: docker stop <container id>