#!/bin/bash

npm install

npm uninstall bcrypt

npm install bcrypt

npm run migration:run

npm run dev