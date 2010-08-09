#!/bin/bash

# From the root compile all
mvn clean install -Dmaven.test.skip=true

# From medigy-webapp deploy/run on development server
cd medigy-webapp/
mvn gae:run -Dmaven.test.skip=true
cd ..

#to skip tests add this to you mvn command
# -Dmaven.test.skip=true
