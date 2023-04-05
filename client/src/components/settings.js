export const initialStateLogin = {
    email: '',
    password: ''
}

export const initialStateSignup = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
}

export const errors = {
    user_undefined: 'User not found',
    invalid_email: 'This email is invalid. Please try again.',
    password_undefined: 'Wrong password. Please try again.',
    password_mismatch: 'Passwords do not match. Please try again.',
    password_too_short: 'Password must be at least 8 characters long.',
    email_taken: 'This email is already taken. Please choose another email.'
}