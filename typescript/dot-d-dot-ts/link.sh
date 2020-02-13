#!/usr/bin/env sh

cd export-library
npm link
cd ../use
npm link export-library
