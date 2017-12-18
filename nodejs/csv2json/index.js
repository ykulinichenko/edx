const fs = require('fs');

const handleError = (error) => {
  console.error(`Got error: ${error.message}`);
  process.exit(-1);
}

const processFile = (filePath = "./data/customer-data.csv", callback) => {
  fs.readFile(filePath, (error, data) => {
    if (error) {
      handleError(error);
    }

    const lines = data.toString().split(/[\r\n]+/);
    callback(lines);
  })
};

const processLines = (lines, callback) => {
  if (!lines.length) {
    handleError({ message: "Empty or not valid file provided" });
  }

  const properties = lines[0].split(',');

  lines.splice(0, 1);

  const objects = lines.map(line => {
    const values = line.split(',');
    return properties.reduce((value, property, index) => {
      value[property] = values[index];
      return value;
    }, {})
  });

  callback(objects);
};

processFile(process.argv[2], (lines) => {
  processLines(lines, (objects) => {
    const stringifiedObjects = JSON.stringify(objects, null, 4);
    fs.writeFile('./data/result.json', stringifiedObjects, (error) => {
      if (error) {
        handleError(error);
      }

      console.log('Everything was done succesfully');
      process.exit(0);
    })
  });
});