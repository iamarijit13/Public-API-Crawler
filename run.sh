#!/bin/bash
mongod --fork --logpath /var/log/mongodb/mongod.log --quiet --port 27017 &>/dev/null
node src/app.js