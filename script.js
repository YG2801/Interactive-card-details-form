// Handling Inputs
const cardNameEl = document.getElementById('card-name')
const nameInputField = document.getElementById('name')

const cardNumberEl = document.getElementById('card-number')
const numberInputField = document.getElementById('number')

const cardMonthEl = document.getElementById('card-month')
const cardYearEl = document.getElementById('card-year')
const monthInputField = document.getElementById('month')
const yearInputField = document.getElementById('year')

const cardCvvEl = document.getElementById('card-cvv')
const cvvInputField = document.getElementById('cvv')

function handleInputs() {
    nameInputField.addEventListener('input', () => {
        fillCard(cardNameEl, nameInputField.value)
    })

    numberInputField.addEventListener('input', () => {
        const value = numberInputField.value
        let number = ''
        for (let i = 0; i < value.length; i++) {
            if (i % 4 === 0 && i !== 0) {
                number += ' ' + value[i]
            } else {
                number += value[i]
            }
        }
        cardNumberEl.textContent = number
    })

    monthInputField.addEventListener('input', () => {
        fillCard(cardMonthEl, monthInputField.value)
    })

    yearInputField.addEventListener('input', () => {
        fillCard(cardYearEl, yearInputField.value)
    })

    cvvInputField.addEventListener('focusin', () => {
        cardContainerEl.classList.add('flip')
    })

    cvvInputField.addEventListener('focusout', () => {
        cardContainerEl.classList.remove('flip')
    })

    cvvInputField.addEventListener('input', () => {
        fillCard(cardCvvEl, cvvInputField.value)
    })
}

function fillCard(element, value) {
    element.textContent = value
}

handleInputs()

// Flip card
const cardContainerEl = document.getElementById('card-container')
cardContainerEl.addEventListener('mouseenter', () => {
    cardContainerEl.classList.add('flip')
})

cardContainerEl.addEventListener('mouseleave', () => {
    cardContainerEl.classList.remove('flip')
})

// Validation

function validate() {
    nameInputField.addEventListener('focusout', () => {
        const name = nameInputField.value
        if (name === '') {
            setError(nameInputField, "Can't be blank")
        } else if (!/^[a-zA-Z ]+$/.test(name)) {
            setError(nameInputField, 'Only alphabets allowed')
        } else {
            setSuccess(nameInputField)
        }
    })
    numberInputField.addEventListener('focusout', () => {
        const number = numberInputField.value
        if (number === '') {
            setError(numberInputField, "Can't be blank")
        } else if (!/^[0-9 ]+$/.test(number)) {
            setError(numberInputField, 'Only numbers allowed')
        } else if (number.length !== 16) {
            setError(numberInputField, 'Should be 16 digits')
        } else {
            setSuccess(numberInputField)
        }
    })
    monthInputField.addEventListener('focusout', () => {
        const month = monthInputField.value
        if (month === '') {
            setError(monthInputField, "Can't be blank")
        } else if (!/^[0-9]+$/.test(month)) {
            setError(monthInputField, 'Only numbers allowed')
        } else if (month < 1 || month > 12) {
            setError(monthInputField, 'Invalid month')
        } else if (month.length !== 2) {
            setError(monthInputField, 'Should be 2 digits')
        } else {
            setSuccess(monthInputField)
        }
    })
    yearInputField.addEventListener('focusout', () => {
        const year = yearInputField.value
        if (year === '') {
            setError(yearInputField, "Can't be blank")
        } else if (!/^[0-9]+$/.test(year)) {
            setError(yearInputField, 'Only numbers allowed')
        } else if (
            Number(year) <= Number(new Date().getFullYear().toString().slice(2))
        ) {
            setError(yearInputField, 'Invalid year')
        } else if (year.length !== 2) {
            setError(yearInputField, 'Should be 2 digits')
        } else {
            setSuccess(yearInputField)
        }
    })
    cvvInputField.addEventListener('focusout', () => {
        const cvv = cvvInputField.value
        if (cvv === '') {
            setError(cvvInputField, "Can't be blank")
        } else if (!/^[0-9]+$/.test(cvv)) {
            setError(cvvInputField, 'Only numbers allowed')
        } else if (cvv.length !== 3) {
            setError(cvvInputField, 'Should be 3 digits')
        } else {
            setSuccess(cvvInputField)
        }
    })
}

function setError(input, message) {
    let formControl = input.parentElement
    if (input === monthInputField || input === yearInputField) {
        formControl = formControl.parentElement
    }
    const errorPara = formControl.querySelector('p')
    errorPara.textContent = message
    formControl.classList.add('error')
}

function setSuccess(input) {
    let formControl = input.parentElement
    if (input === monthInputField || input === yearInputField) {
        formControl = formControl.parentElement
    }
    const errorPara = formControl.querySelector('p')
    errorPara.textContent = 'error'
    formControl.classList.remove('error')
}

validate()

const form = document.querySelector('form')
form.addEventListener('submit', (event) => {
    event.preventDefault()
    const formControls = form.querySelectorAll('.form-control')
    let error = false
    formControls.forEach((formControl) => {
        if (formControl.classList.contains('error')) {
            error = true
        }
    })
    if (
        !error &&
        nameInputField.value !== '' &&
        numberInputField.value !== '' &&
        monthInputField.value !== '' &&
        yearInputField.value !== '' &&
        cvvInputField.value !== ''
    ) {
        alert('Form submitted successfully')
    }
})
