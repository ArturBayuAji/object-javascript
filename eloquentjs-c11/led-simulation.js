/* 
Simulating SIG-5030 LED display 

LED Matrix -> grid of small LED lights in rows and columns

size : 50x30 matrix --> 50 LEDs wide, 30 LEDs high --> 1,500 individual LEDs.

state (brightness) : 
0 -> LED is off (black/dark)
1 -> LED is dim
2 -> LED is medium brightness
3 -> LED is fully bright (maximum)
*/


/* 
This below LEDMatrix = SIG-5030 LED that displayed in networked screens, meaning
we can send them commands remotely.
*/
class LEDMatrix {
    constructor(_width, _height) {
        this.width = _width;
        this.height = _height;
        this.pixels = Array(_height).fill(Array(_width).fill(0));
        /* 
        create array that has length of `_height`
        fill that array with `undefined`
        map each those `undefined` with a new array that has length of `_width` that contains 0s
        */
        this.pixels = Array(_height).fill().map(() => Array(_width).fill(0));
    }


    update(data) {
        if (data.length !== this.width * this.height) {
            throw new Error("Invalid data size!");
        }

        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                this.pixels[i][j] = data[i * this.width + j]; // map 1D array to 2d grid
            }
        }

        this.render(); // Show the updated display
    }

    render() {
        // console.clear();
        console.log("LED Display:\n");
        for (let row of this.pixels) {
            console.log(row.map(val => [" ", ".", "o", "O"][val]).join(" ")); 
            // 0 = " " (off), 1 = ".", 2 = "o", 3 = "O" (brightest)
        }
        console.log('\n');
    }

}

// create an LED display (50x30)
const myLed = new LEDMatrix(50, 30);


// // Example : create a simple pattern (e.t., diagonal line)
// let frameData = Array(1500).fill(1);
// for (let i = 0; i < 30; i++) {
//     frameData[i * 50 + i] = 2; // set a diagonal line of bright LEDs
// }

// // update the display with this pattern
// myLed.update(frameData);



// simulate 9 LED screens

// List of screen IP addresses
const screenAddresses = [
    "10.0.0.44", "10.0.0.45", "10.0.0.41",
    "10.0.0.31", "10.0.0.40", "10.0.0.42",
    "10.0.0.48", "10.0.0.47", "10.0.0.46"
];



// simulating network request function
function request(ip, data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`Sent to ${ip}`);
            resolve("OK"); // Simulating successful network response
        }, Math.random() * 100); // simulate network delay (10 - 4000 ms)
    });
}

// Funciton to display a single frame across all screens
function displayFrame(frame) {
    return Promise.all(
        frame.map((data, i) => request(screenAddresses[i], { command: "display", data }))
    );
}


// Example : creating a frame with simple patterns for 9 screens
let frameData1 = Array(9).fill().map((_, i) => {
    let data = Array(1500).fill(0);
    for (let j = 0; j < (i + 1) * 50; j++) {
        data[j] = 3; // light up a portion of each screen
    }
    return data;
});

// // send the frame to all screens
// displayFrame(frameData1).then(() => console.log("Frame displayed!"));


/* 
9 screens, each has 1 frames :
[
  [0, 0, 3, 3, 3, ...], // Screen 1 (10.0.0.44)
  [0, 0, 0, 3, 3, ...], // Screen 2 (10.0.0.45)
  [0, 0, 0, 0, 3, ...], // Screen 3 (10.0.0.41)
  ...
]

9 screens, each has 2 frames :
[
  [ [0, 0, ..., 0], [0, 0, ..., 0] ], // Screen 1 (10.0.0.44) (2 frames, each 1500 LEDs)
  [ [0, 0, ..., 0], [0, 0, ..., 0] ], // Screen 2 (10.0.0.45)
  [ [0, 0, ..., 0], [0, 0, ..., 0] ], // Screen 3 (10.0.0.41)
  [ [0, 0, ..., 0], [0, 0, ..., 0] ], // Screen 4 (10.0.0.31)
  [ [0, 0, ..., 0], [0, 0, ..., 0] ], // Screen 5 (10.0.0.40)
  [ [0, 0, ..., 0], [0, 0, ..., 0] ], // Screen 6 (10.0.0.42)
  [ [0, 0, ..., 0], [0, 0, ..., 0] ], // Screen 7 (10.0.0.48)
  [ [0, 0, ..., 0], [0, 0, ..., 0] ], // Screen 8 (10.0.0.47)
  [ [0, 0, ..., 0], [0, 0, ..., 0] ]  // Screen 9 (10.0.0.46)
]
*/

// Example : crating 2 frame for each screens (9 screens)
let numScreens = 9;
let numFrames = 2;
let ledsPerScreen = 1500;
let frameDelay = 500;

let frameData2 = Array(numScreens).fill().map(() => {
    return Array(numFrames).fill().map((_, frameIndex) => {
        return Array(ledsPerScreen).fill().map((_, ledIndex) => {
            return (ledIndex % 2 === frameIndex) ? 3 : 0;
        })
    });
});

/* 
example of 2 frames :
[undefined, undefined, undefined, .... undefined]   length = 9
     |
     |_ [undefined, undefined]   length = 2, frameIndex = 0 or 1
            |
            |_[undefined, undefined, undefined, ... undefined ]   length = 1.500  ledIndex = 0 to 1.499
                   |
                   |_[3, 0, 3, 0, 3 ....]

9 screens, each has 2 frames :
[
  [ [3, 0, ..., 0], [0, 3, ..., 0] ], // Screen 1 (10.0.0.44) (2 frames, each 1500 LEDs)
  [ [3, 0, ..., 0], [0, 3, ..., 0] ], // Screen 2 (10.0.0.45)
  [ [3, 0, ..., 0], [0, 3, ..., 0] ], // Screen 3 (10.0.0.41)
  [ [3, 0, ..., 0], [0, 3, ..., 0] ], // Screen 4 (10.0.0.31)
  [ [3, 0, ..., 0], [0, 3, ..., 0] ], // Screen 5 (10.0.0.40)
  [ [3, 0, ..., 0], [0, 3, ..., 0] ], // Screen 6 (10.0.0.42)
  [ [3, 0, ..., 0], [0, 3, ..., 0] ], // Screen 7 (10.0.0.48)
  [ [3, 0, ..., 0], [0, 3, ..., 0] ], // Screen 8 (10.0.0.47)
  [ [3, 0, ..., 0], [0, 3, ..., 0] ]  // Screen 9 (10.0.0.46)
]
*/


// Function to send all frame to all screen
async function sendFrameToAllScreens(frameIndex) {
    console.clear();
    console.log(`🖥️ Sending frame ${frameIndex + 1}\n`)

    let promises = screenAddresses.map((ip, screenNum) => { 
        // this below returns promise that resolve in 10 - 100 ms (simulating network delay)
        return request(ip, { command: "display", data: frameData2[screenNum][frameIndex] })
    });

    await Promise.all(promises)
    console.log(`🔄 Frame ${frameIndex + 1} sent to all screens!\n`)
}

// // Loop through frames
// let currentFrame = 0;
// setInterval(() => {
//     sendFrameToAllScreens(currentFrame);
//     currentFrame = (currentFrame + 1) % numFrames;
// }, frameDelay);
