import express from 'express';
import path from 'path';
import webpack from 'webpack';
import webpackConfig from '../../webpack.config.js';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotReload from 'webpack-hot-middleware';

const server = express();
const buildPath = path.join(__dirname, '../../dist');
const compiler = webpack(webpackConfig);

server.use(webpackMiddleware(compiler));
server.use(webpackHotReload(compiler));

console.log('Build Path > ', buildPath);
/*
server.use(express.static(buildPath));
server.get('/', function(req, res) {
  res.sendFile(buildPath+'/index.html');
});
*/
server.listen(8080, () => {
  console.log('\n## Server Listening on ## \nhttp://localhost:8080 \n');
});