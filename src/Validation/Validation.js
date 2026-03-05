// isValidUsername
export const isValidUsername = username => {
    let isValid = false;
    var pattern = /^\d+\.?\d*$/;
    var emailRgx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isNumber = !!parseInt(username)
    if (username === '') {
        return false;
    }
    if (isNumber && username !== '') {
        if (username.length === 8 && pattern.test(username)) {
            isValid = true;
        }
        else {
            isValid = false;
        }
    }
    else if (username !== '') {
        if (!username.toLowerCase()
            .match(emailRgx)) {
            isValid = false;
        }
        else {
            isValid = true;
        }
    }
    return isValid;
}

// validatePassword
export const validatePassword = password => {
    // Define your password validation criteria using regular expressions or other conditions
    const isValidPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/g.test(password);
    return isValidPassword;
};
export const validateEmail = email => {
    // Define your password validation criteria using regular expressions or other conditions
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
export   function isValidName(name) {
    const namePattern = /^[A-Za-z\s]+$/;
    return namePattern.test(name);
  }