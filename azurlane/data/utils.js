
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

function render(latent, canvas, scale) {
	if (scale < 1) {
		scale = 1;
	}
	
	var image = tf.add(tf.div(tf.reshape(loadedModel.predictOnBatch(tf.reshape(latent, [1, 1, 1, latent.shape[0]])), [48, 48, 3]), 2), 0.5);
	image = tf.image.resizeNearestNeighbor(image, [48 * Math.floor(scale), 48 * Math.floor(scale)])
	
	tf.toPixels(image, canvas)
}

var loadedModel = false
