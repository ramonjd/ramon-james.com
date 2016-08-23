#!/bin/bash
set -x
if [ $TRAVIS_BRANCH == 'master' ] ; then
    ssh deploy@ramon-james.com "cd /var/www/ramon-james.com && git pull"
else
    echo "Not deploying, since this branch isn't master."
fi
