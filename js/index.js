const rsvpForm = document.getElementById('rsvp-form')
rsvpForm.addEventListener('submit', submitRsvp)
rsvpForm.addEventListener('change', validateRsvp)

const rsvpSendButton = rsvpForm.querySelector('.rsvp-send-button')
rsvpForm.addEventListener('click', validateRsvp)

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
	// const response = await fetch('/api/rsvp', {
	// 	method: 'POST',
	// 	body: new URLSearchParams(formData),
	// })

	// mimic a request to the server
	const response = await new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				status: 200,
				statusText: 'OK',
			})
		}, 2000)
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

const numberRegex = /^[1-9][0-9]*$/

function checkFormIsValid(formData) {
	const name = formData.get('name')
	const guestCount = formData.get('guest_count')
	const guestCountValue = parseInt(guestCount, 10)

	if (name.length === 0) return 'NAME_REQUIRED'
	if (!numberRegex.test(guestCount)) return 'GUEST_COUNT_INVALID'
	if (guestCountValue < 1) return 'GUEST_COUNT_TOO_LOW'
	if (guestCountValue > 30) return 'GUEST_COUNT_TOO_HIGH'
	return 'OK'
}

function validateRsvp() {
	console.log('validating RSVP...')

	const formData = new FormData(rsvpForm)

	const formStatus = checkFormIsValid(formData)

	if (formStatus === 'NAME_REQUIRED') {
		displayInputProblem('Please enter your name')
		return
	}

	if (formStatus === 'GUEST_COUNT_INVALID') {
		displayInputProblem('Please enter a valid number of guests')
		return
	}

	if (formStatus === 'GUEST_COUNT_TOO_LOW') {
		displayInputProblem('Please enter at least one guest')
		return
	}

	if (formStatus === 'GUEST_COUNT_TOO_HIGH') {
		displayInputProblem('Please enter a maximum of 30 guests. For more guests, submit another RSVP.')
		return
	}

	hideInputProblem();
}

const rsvpFormInputProblem = rsvpForm.querySelector('.input-problem-message')

function displayInputProblem(message) {
	rsvpFormInputProblem.style.display = 'block'
	rsvpFormInputProblem.innerText = message
}

function hideInputProblem() {
	rsvpFormInputProblem.style.display = 'none'
	rsvpFormInputProblem.innerText = ''
}