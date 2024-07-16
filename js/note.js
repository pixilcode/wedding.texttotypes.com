const noteFormApi = '/api/note/form'

const unloadedForm = document.querySelector('form.unloaded')
const loadingMessage = document.querySelector('.loading-message')

function setLoadingMessage(message) {
	console.log('setting loading message...')
	
	const messageP = loadingMessage.querySelector('p')
	messageP.textContent = message

	console.log('loading message set')
}

function hideLoadingMessage() {
	console.log('hiding loading message...')

	loadingMessage.style.display = 'none'

	console.log('loading message hidden')
}

function showLoadingMessage() {
	console.log('showing loading message...')

	loadingMessage.style.display = 'flex'

	console.log('loading message shown')
}

// load the form
fetch(noteFormApi)
	.then(response => response.text())
	.then(html => {
		hideLoadingMessage()
		unloadedForm.outerHTML = html
	})
	.catch(error => {
		console.error(error)
	})