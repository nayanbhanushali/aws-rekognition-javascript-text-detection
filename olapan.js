// `var AWS = require('../olaface/node_modules/aws-sdk');`

//AWS access details
AWS.config.update({
    accessKeyId: 'AKIARBI34SIFAOHULDVU',
    secretAccessKey: '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',
    region: 'us-east-2'
  });


  const rekognition = new AWS.Rekognition();

// const selectedLabel = 'Person'; // label to show bounding boxes for

/**
 * Process Image
 * 
 * Handles image on upload
 */
function processImage() {
	const control = document.getElementById('upload');

	if (control.files.length > 0) {
		const file = control.files[0];

		const reader = new FileReader();
		reader.onload = function(e) {
			detectObjects(e.target.result);
		};
		reader.readAsArrayBuffer(file);
	}
}

/**
 * Detect Objects
 * 
 * Uses Rekognition to detect labels and objects
 */
function detectObjects(imgData) {
	const params = {
		Image: {
			Bytes: imgData
		},
		// MaxLabels: 5, // (optional) Max number of labels with highest confidence
		// MinConfidence: 0.55 // (optional) Confidence threshold from 0 to 1, default is 0.55 if left blank
  };
  


	rekognition.detectText(params, function(err, data) {
		if (err) {
			console.log(err, err.stack);
			alert('There was an error detecting the labels in the image provided. Check the console for more details.');
		} else {
			console.log(data);
			displayTXT(data);
			// showBoundingBoxes(data, imgData);
		}
	});
}

var detectedTXT;

// function displayTXT(data) {
// 	detectedTXT = data.Labels.map((obj) => obj.Name).join(', ');
// 	document.getElementById('labels').textContent = labels;
// }

/**
 * Display Labels
 * 
 * Shows a list of detected labels on the screen.
 */
function displayTXT(data) {
  for(var i = 0; i < data.TextDetections.length;i++){

    //console.log(data.TextDetections[i].Type)

    if(data.TextDetections[i].Type === 'LINE')
    {
      detectedTXT = data.TextDetections[i].DetectedText;
    }
  }

  console.log(detectedTXT);
  detectedTXT = data.TextDetections.map((obj) => obj.DetectedText).join(', ');
  document.getElementById('nayan').textContent = detectedTXT;

}

// /**
//  * Show Bounding Boxes
//  * 
//  * Converts ArrayBuffer into Image object
//  */
// function showBoundingBoxes(objData, imgData) {
// 	const filtered = objData.Labels.filter((obj) => selectedLabel === obj.Name);
// 	const boxes = filtered.length > 0 ? filtered[0].Instances : [];

// 	const blob = new Blob([ imgData ], { type: 'image/jpg' });
// 	const imageUrl = URL.createObjectURL(blob);

// 	const img = new Image();
// 	img.src = imageUrl;
// 	img.onload = function() {
// 		drawImage(img, boxes);
// 	};
// }

// /**
//  * Draw Image
//  * 
//  * Draws the image and bounding boxes on the canvas
//  */
// function drawImage(img, boxes) {
// 	const ctx = document.getElementById('canvas').getContext('2d');

// 	const width = ctx.canvas.width;
// 	const height = ctx.canvas.height;

// 	ctx.drawImage(img, 0, 0, width, height);

// 	boxes.forEach((obj) => {
// 		const box = obj.BoundingBox;
// 		ctx.beginPath();
// 		ctx.lineWidth = '2';
// 		ctx.strokeStyle = 'green';
// 		ctx.rect(box.Left * width, box.Top * height, box.Width * width, box.Height * height);
// 		ctx.stroke();
// 	});
// }
