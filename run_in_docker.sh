#!/usr/bin/env bash

docker run --rm -it -v $(pwd):/website -w /website -p 3000:3000  node:14.21.3-bullseye bash -c "yarn install; yarn start"