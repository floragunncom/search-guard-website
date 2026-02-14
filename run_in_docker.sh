#!/usr/bin/env bash

docker run --rm -it -v $(pwd):/website -w /website -p 3000:3000 node:20.18.1-bullseye bash -c "npm install; npm start"
