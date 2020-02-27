var fs = require('fs');

// of the form: (delta_angle, output)
var testData = [];
const train = 0.00001;
const epochs = 5000;

testData = fs.readFileSync("./collision.csv", "utf8").split("\n");
for (f = 0; f < testData.length; f++) {
    var currentRow = testData[f].split(",");
    testData[f] = [currentRow[2], currentRow[3]];
}

var rotWeight = 0.2;

// now let's train
for (e = 1; e <= epochs; e++) {
    testData.forEach((point) => {
        sum = (point[0] * rotWeight);
        var output = 2;
        if (sum >= 0) {
            output = 1;
        }
        else {
            output = 0;
        }
		//console.log(`${point[0]}, ${point[2]}`);
        rotWeight = rotWeight + ((train * (point[1] - sum) * point[0]));
        console.log(`Sum: ${sum}, Wrot: ${rotWeight}`);
    })
}
//fs.writeFileSync("./test.txt", JSON.stringify(newData));
fs.writeFileSync("./weights.txt", `Wrot: ${rotWeight}`);