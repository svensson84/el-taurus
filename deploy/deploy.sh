#!/usr/bin/bash

if [ "$#" != "1" ]; then
    echo "usage: deploy.sh <password>"
    exit 1;
fi

cd /home/sven/dev/el-taurus
npm run build
tar czf build.tar.gz --directory=build .
expect -f /home/sven/dev/el-taurus/deploy/deploy.expect $1
rm build.tar.gz