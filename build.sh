bash util/getLastCommit.sh;
node build.js;
rm -rf commitInfo;

if [ -d $STATIC_DIR -a $STATIC_DIR ]; then
    \cp -r $STATIC_DIR/* dist
fi;
