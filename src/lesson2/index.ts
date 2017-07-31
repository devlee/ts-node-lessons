import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';

let favicon;

/**
 * http.Server类继承自net.Server类
 */
const httpServer = http.createServer((req, res) => {
  console.log(req.url);
  if (req.url === '/favicon.ico') {
    const t1 = process.hrtime();
    if (!favicon) {
      favicon = fs.readFileSync(path.join(__dirname, '../../favicon.ico'), 'binary');
    }
    const diff = process.hrtime(t1);
    console.log('time', `${diff[0]}秒${diff[1]}纳秒`);
    res.writeHead(200, {
      'Content-Type': 'image/ico',
    });
    res.write(favicon, 'binary');
    res.end();
  } else {
    res.end('hello world');
  }
});

httpServer.listen(3000, () => {
  console.log('app start at port 3000');
});
