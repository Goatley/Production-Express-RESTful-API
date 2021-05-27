/**
 * general email regex, used from https://www.regular-expressions.info/email.html
 */
export const emailRegex: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

/**
 * General password regex - requires password to have minium 8 chars, at least 1 uppercase letter, 1 lowercase letter, and 1 number
 * 
 * great regex here: https://stackoverflow.com/a/21456918
 */
export const passwordRegex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%_<>*?&])[A-Za-z\d@$_<>!%*?&]{8,}$/