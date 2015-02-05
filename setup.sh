#! /bin/sh

echo  "YO IM IN main folder"

node=`exec ls | grep "node"`

echo $node;
cd $node && `exec ./setup.sh`;


echo "DONE"
