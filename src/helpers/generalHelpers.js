const generatePassword = () => {
    const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const specialChars = '!@#$%&*()=+';

    // Generate three uppercase letters
    let password = '';
    for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * uppercaseLetters.length);
        password += uppercaseLetters[randomIndex];
    }

    // Generate three lowercase letters
    for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * lowercaseLetters.length);
        password += lowercaseLetters[randomIndex];
    }

    // Add a special character
    for (let i = 0; i < 3; i++) {
        const randomSpecialChar = Math.floor(Math.random() * specialChars.length);
        password += specialChars[randomSpecialChar];
    }

    // Add a number
    for (let i = 0; i < 3; i++) {
        const randomNum = Math.floor(Math.random() * numbers.length);
        password += numbers[randomNum];
    }
    return password;
}

const convertToSlug = (title, separator = "-") => {
    return title
        .toString()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')             // Remove accents
        .toLowerCase()                               // Convert to lowercase
        .trim()                                      // Trim leading and trailing spaces
        .replace(/[^a-z0-9\s]/g, '')                 // Remove invalid characters but keep spaces
        .replace(/\s+/g, separator)                  // Replace whitespace with separator
        .replace(new RegExp(`[${separator}]+`, 'g'), separator); // Replace multiple separators with a single one
}

const getCityName = (slug) => {
    let cityArray = slug?.split('-')
    if (cityArray?.length) {
        let cityName = cityArray[cityArray.length - 1]?.replaceAll("_", " ")
        cityName = cityName?.split(' ').map(word => {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }).join(' ');
        return cityName
    }
}



module.exports = { generatePassword, convertToSlug, getCityName };