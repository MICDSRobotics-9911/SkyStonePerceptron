var fs = require('fs');

// of the form: (accel, delta_angle, output)
var testData = [];
const train = 0.001;
const epochs = 50000;

/*
testData = fs.readFileSync("./collision.csv", "utf8").split("\n");
for (f = 0; f < testData.length; f++) {
    testData[f] = testData[f].split(",");
}
// now we need to bundle the data and take the highest of the three
for (g = testData.length; g > 0; g--) {
    // peek backwards
    var bundle = [testData[g-1][0], testData[g-2][0], testData[g-3][0]];

    //console.log(bundle)
    // push the greatest number
    var greatest = 0;
    bundle.forEach((number) => {
        if (number > greatest) {
            greatest = number;
        }
    })
    newData.push([greatest, testData[g-1][1], testData[g-1][2], testData[g-1][3]]);
    //newData.push(greatest);

    // update the index
    g -= 2;
}
console.log(newData)
console.log(`Original: ${testData.length}, New: ${newData.length}`);
*/


var accelWeight = 0.5;
var rotWeight = 0.5;

// first we need to generate some data
for (i = 1; i <= 200; i++) {
    var data = [];
    data[0] = Math.sqrt(Math.pow(Math.random() * (2-0.3) + 0.3,2) + Math.pow(Math.random() * (2-0.3) + 0.3,2)) ;
    data[1] = (Math.random() * 25);
    
    if (data[1] >= 10 || data[0] >= 1.5) {
        data[2] = 1;
    }
    else {
        data[2] = 0;
    }

    testData.push(data);
}
console.log(testData);

//fs.writeFileSync("./test.txt", JSON.stringify(testData));
for (var f in testData) {
    
}

// now let's train
for (e = 1; e <= epochs; e++) {
    testData.forEach((point) => {
        sum = (point[0] * accelWeight + point[1] * rotWeight);
        var output = 2;
        if (sum >= 0) {
            output = 1;
        }
        else {
            output = 0;
        }
		//console.log(`${point[0]}, ${point[2]}`);
        accelWeight = accelWeight + ((train * (point[2] - sum) * point[0]));
        rotWeight = rotWeight + ((train * (point[2] - sum) * point[1]));
        //console.log(`Sum: ${sum}, Waccel: ${accelWeight}, Wrot: ${rotWeight}`);
    })
}

fs.writeFileSync("./weights.txt", `Waccel: ${accelWeight}, Wrot: ${rotWeight}`);