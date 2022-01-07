#Run app
1. open monit-table folder
2. cd ./api
3. run "npm install"
4. cd ../client
5. run "npm install"
6. cd ../
7. use console in the next steps:
8. docker build ./api/ -t api
9. docker build ./client/ -t client
10. docker images (check images id)
11. docker run -d -p 8000:8000 <api image id>
12. docker run -d -p 3000:3000 <client image id>
13. http://localhost:3000

#Stop api or client
1. docker ps
2. docker stop <container id or name>