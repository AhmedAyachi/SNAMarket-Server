from node:alpine
#Prepare Image
workdir /home/app
copy ./package.json .
copy ./src ./src
copy ./public ./public
run npm -g install nodemon
run npm install
run sed -i -e "1,21d" node_modules/vritra/index.d.ts
run sed -i -e "1,21d" node_modules/vritra/src/index.js
run sed -i".txt" '4i \"type\":\"module\",' node_modules/vritra/package.json

#Prepare Container
cmd npm start
