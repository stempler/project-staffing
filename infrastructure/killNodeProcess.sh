#!/bin/bash

echo "Killing running Node process"
PID=`ps aux | grep node | grep server.js | awk '{print $2}'`
echo "Killing PID $PID"
ps aux | grep $PID
sudo kill -9 $PID
ps aux | grep $PID
