const os = require('os');
const stream = require('stream');
class LineSplitStream extends stream.Transform {
  constructor(options) {
    super(options);
    this.buffer = '';
  }

  fillBuffer(str) {
    this.buffer += str;
  }
  clearBuffer() {
    this.buffer = '';
  }

  _transform(chunk, encoding, callback) {
    let str = '';
    let a = [];
    str = chunk.toString('utf-8');

    //Получаем первое вхождение конца файла, конкатенируем строку и отдаем
    if (str.includes(os.EOL)) {
      a = str.split(os.EOL);
      if (a.length == 2) {
        //если вхождение только одно, контатенируем буффер, освобождаем его, остаток заливаем в буффер
        this.buffer += a[0];
        this.push(this.buffer);
        this.buffer = a[1];
      } else {
        //если вхождений больше одного, контатенируем буффер, освобождаем его, остаток заливаем в буффер, дополнительно выдаем все вхождения между
        this.buffer += a[0];
        this.push(this.buffer);
        let result = a.filter(
          (item, index) => index != 0 && index != a.length - 1
        );
        result.map((item) => this.push(item));
        this.buffer = a[a.length - 1];
      }
    } else {
      this.buffer += str; //Если новой строки нет, просто увеличиваем буффер
    }
    callback();
  }

  _flush(callback) {
    //Если стрим завершился, то отдаем остатки из буффера
    this.push(this.buffer);
    callback();
  }
}

module.exports = LineSplitStream;
