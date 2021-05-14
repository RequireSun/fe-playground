const fs = require('fs');
const path =require('path');
const { promisify, inspect } = require('util');
const { mapNreduce, statistics } = require('./process');

const aReadFile = promisify(fs.readFile);

(async function () {
  const content = await aReadFile(path.resolve(__dirname, './2015-01~2015-12.txt'), { encoding: 'utf-8' });
  // const content = await aReadFile(path.resolve(__dirname, './2016-01~2016-12.txt'), { encoding: 'utf-8' });
  const info = mapNreduce(content);
  console.log(inspect(statistics(info), false, 4, true));
}());
