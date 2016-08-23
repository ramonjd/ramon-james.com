#!/bin/bash
set -x
if [ $TRAVIS_BRANCH == 'master' ] ; then
    # mkdir _site
    # cp dist  _site/
    # cp api _site/
    # cp assets _site/
    # cp server.js _site/
    # cp index.js _site/
    #
    # cd _site
    # git init
    # git remote add deploy "deploy@ramon-james.com:/var/www/ramon-james.com"
    # git config user.name "Travis CI"
    # git config user.email "ramonjd+travisCI@gmail.com"
    # git push --force deploy master
    ssh deploy@ramon-james.com 'cd /var/www/ramon-james.com && git pull'
else
    echo "Not deploying, since this branch isn't master."
fi
