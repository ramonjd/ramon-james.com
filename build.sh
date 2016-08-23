# !/bin/sh
docker build -t ramon-james-build -f Dockerfile.build . 
docker run -u "build" ramon-james-build  > build.tar.gz 
docker build -t ramon-james -f Dockerfile.dist .
