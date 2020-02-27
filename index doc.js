var fs = require('fs');

// of the form: (accel, delta_angle, output)
var testData = [];
const train = 0.001; // the training rate
const epochs = 50000;


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
        accelWeight = accelWeight + ((train * (point[2] - sum) * point[0]));
        rotWeight = rotWeight + ((train * (point[2] - sum) * point[1]));
        //console.log(`Sum: ${sum}, Waccel: ${accelWeight}, Wrot: ${rotWeight}`);
    })
}

fs.writeFileSync("./weights.txt", `Waccel: ${accelWeight}, Wrot: ${rotWeight}`); // write the data off to a file