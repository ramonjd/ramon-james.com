#!/bin/bash
set -x
if [ $TRAVIS_BRANCH == 'master' ] ; then
    mkdir _site
    cp dist api assets index.js server.js /_site
    cd _site
    git init
    git remote add deploy "deploy@ramon-james.com:/var/www/ramon-james.com"
    git config user.name "Travis CI"
    git config user.email "ramonjd+travisCI@gmail.com"
    git push --force deploy master
else
    echo "Not deploying, since this branch isn't master."
fi
