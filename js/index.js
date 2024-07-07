const rsvpForm = document.getElementById('rsvp-form')
rsvpForm.addEventListener('submit', submitRsvp)

const rsvpFormLoading = document.getElementById('rsvp-form-loading')
const rsvpFormSuccess = document.getElementById('rsvp-form-success')
const rsvpFormError = document.getElementById('rsvp-form-error')

async function submitRsvp(event) {
	console.log('submitting RSVP...')

	// prevent the form from submitting
	event.preventDefault()

	// create a form filled with the data from the form
	const formData = new FormData(rsvpForm)

	// hide the form and show the loading spinner
	rsvpForm.style.display = 'none'
	rsvpFormLoading.style.display = 'flex'

	// send the request to the server
	const response = await fetch('/api/rsvp', {
		method: 'POST',
		body: new URLSearchParams(formData),
	})

	// if there was an error, log it to the console
	if (response.status >= 400) {
		// hide the loading spinner and show the error message
		rsvpFormLoading.style.display = 'none'
		rsvpFormError.style.display = 'flex'

		console.error(`failed to submit RSVP: ${response.status} ${response.statusText}`)

		return
	}

	// hide the loading spinner and show the success message
	rsvpFormLoading.style.display = 'none'
	rsvpFormSuccess.style.display = 'flex'

	console.log('submitted RSVP successfully!')
}