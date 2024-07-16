const noteFormApi = '/api/note/form'

let form;
let submitButton;

const loadingMessage = document.querySelector('.loading-message')
const successMessage = document.querySelector('.success-message')
const errorMessage = document.querySelector('.error-message')

async function submitNote(event) {
	console.log('submitting note...')

	// prevent the form from submitting
	event.preventDefault()

	// create a form filled with the data from the form
	const formData = new FormData(form)

	// hide the form and show the loading spinner
	setLoadingMessage('Sending...')
	form.style.display = 'none'
	loadingMessage.style.display = 'flex'

	// send the request to the server
	const response = await fetch('/api/note', {
		method: 'POST',
		body: formData,
	})

	// if there was an error, log it to the console
	if (response.status >= 400) {
		// hide the loading spinner and show the error message
		loadingMessage.style.display = 'none'

		console.error(`failed to submit note: ${response.status} ${response.statusText}`)

		return
	}

	// hide the loading spinner and show the success message
	loadingMessage.style.display = 'none'

	console.log('submitted note successfully!')
}

function validateNote() {
	const formData = new FormData(form)

	const name = formData.get('name')
	const message = formData.get('message')

	const nameValid = name.length > 0
	const messageValid = message.length > 0

	const formValid = nameValid && messageValid

	console.error('TODO: implement form validation')
}

function setLoadingMessage(message) {
	console.log('setting loading message...')
	
	const messageP = loadingMessage.querySelector('p')
	messageP.textContent = message

	console.log('loading message set')
}

// load the form
fetch(noteFormApi)
	.then(response => response.text())
	.then(html => {
		// TODO: make form static, just get CSRF token for form
		form = document.querySelector('form')

		form.outerHTML = html

		loadingMessage.style.display = 'none'
		form.style.display = undefined

		form.addEventListener('submit', submitNote)
		form.addEventListener('change', validateNote)

		submitButton = form.querySelector('button')
		submitButton.addEventListener('click', validateNote)

	})
	.catch(error => {
		console.error(error)
	})