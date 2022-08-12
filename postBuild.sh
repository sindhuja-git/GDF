#!/usr/bin/env bash

mkdir -p dist
mv build/* dist
rm -rf build
echo 'built out expected OpenShift structure'

cp nginx.conf dist/.
echo 'copied over nginx.conf'
