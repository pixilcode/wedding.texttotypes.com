const noteFormApi = '/api/note/form'

const unloadedForm = document.querySelector('form.unloaded')
const loadingMessage = document.querySelector('.loading-message')

function setLoadingMessage(message) {
	const messageP = loadingMessage.querySelector('p')
	messageP.textContent = message
}

function hideLoadingMessage() {
	loadingMessage.display = 'none'
}

function showLoadingMessage() {
	loadingMessage.display = 'flex'
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