import * as http from 'http';

/**
 * http.Server类继承自net.Server类
 */
const httpServer = http.createServer((req, res) => {
  res.end('hello world');
});

httpServer.listen(3000, () => {
  console.log('app start at port 3000');
});
