
function getUrlParams(search) {
	let hashes = search.slice(search.indexOf('?') + 1).split('&')
	let params = {}
	hashes.map(hash => {
		let [key, val] = hash.split('=')
		params[key] = decodeURIComponent(val)
	})

	return params
}
async function getModel(){
	const model = await tf.loadModel('https://raw.githubusercontent.com/bloc97/bloc97.github.io/master/azurlane/data/model.json');
	return model;
}
function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}
const MAX_INTEGER = Math.pow(2, 32);
function randomInt() {
	return getRandomInteger(0, MAX_INTEGER);
}
function JSF(seed) {
    function jsf() {
        var e = s[0] - (s[1]<<27 | s[1]>>5);
         s[0] = s[1] ^ (s[2]<<17 | s[2]>>15),
         s[1] = s[2] + s[3],
         s[2] = s[3] + e, s[3] = s[0] + e;
        return (s[3] >>> 0) / 4294967295; // 2^32-1
    }
    seed >>>= 0;
    var s = [0xf1ea5eed, seed, seed, seed];
    for(var i=0;i<20;i++) jsf();
    return jsf;
}
function slerp(p0, p1, t) {
	const omega = tf.dot(p0.div(p0.norm()), p1.div(p1.norm())).acos();
	const so = omega.sin();
	return tf.add(omega.mul(1 - t).sin().div(so).mul(p0), omega.mul(t).sin().div(so).mul(p1));
}

function lerp(p0, p1, t) {
	return tf.add(tf.mul(p0, (1 - t)), tf.mul(p1, t));
}
function render(latent, canvas, scale) {
	if (scale < 1) {
		scale = 1;
	}
	
	var image = tf.add(tf.div(tf.reshape(loadedModel.predictOnBatch(tf.reshape(latent, [1, 1, 1, latent.shape[0]])), [48, 48, 3]), 2), 0.5);
	image = tf.image.resizeNearestNeighbor(image, [48 * Math.floor(scale), 48 * Math.floor(scale)])
	
	tf.toPixels(image, canvas)
}

var loadedModel = false
var paramrange = 1.5;
const latentSize = 64;

function toBase64(tensor) {
	const data = Array.from(tensor.dataSync());
	
	for (i=0; i<data.length; i++) {
		data[i] = Math.round(((data[i] + paramrange) / (paramrange * 2)) * 255);
	}
	const ascii = new Uint8ClampedArray(data);
	return btoa(String.fromCharCode.apply(null, ascii));
	//Old encoding method
	//return btoa(JSON.stringify(data));
}

function fromBase64(base) {
	
	//Old decoding method
	if (base.length > 200) {
		const data = JSON.parse(atob(base));
		
		//Check if array is already floating point, then don't convert.
		var isFloat = true;
		for (i=0; i<data.length; i++) {
			if (isNaN(parseFloat(data[i]))) {
				isFloat = false;
				break;
			}
		}
		if (isFloat) {
			return tf.tensor1d(data);
		}
		
		for (i=0; i<data.length; i++) {
			data[i] = ((parseInt(data[i], 36) / 255) * (paramrange * 2)) - paramrange;
		}
		
		return tf.tensor1d(data);
	}
	
	//New decoding method
	const data = atob(base).split("");
	
	for (i=0; i<data.length; i++) {
		data[i] = ((data[i].charCodeAt(0) / 255) * (paramrange * 2)) - paramrange;
	}
	return tf.tensor1d(data);
}