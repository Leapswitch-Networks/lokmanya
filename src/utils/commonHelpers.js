import moment from "moment";

export const getProperty = (obj, keys) => {
    let value = obj;
    for (const key of keys) {
        if (value && value.hasOwnProperty(key)) {
            value = value[key];
        } else {
            value = undefined;
            break;
        }
    }
    return value;
};

export const customFilter = (data, filters, filterKeys) => {
    // return data?.filter(item => {
    //     return filters.every(filter => {
    //         const { value } = filter;
    //         return filterKeys.some(filterKey => {
    //             const filterParts = filterKey.split('.');
    //             const propertyValue = getProperty(item, filterParts);
    //             if (propertyValue !== undefined && propertyValue !== null && !!propertyValue) {
    //                 const stringValue = propertyValue?.toString().toLowerCase();
    //                 if (typeof value === 'number' || !isNaN(Number(value))) {

    //                     return stringValue.includes(value?.toString());
    //                 } else if (typeof value === 'string') {
    //                     return stringValue.includes(value?.toLowerCase());
    //                 }
    //             }
    //             return false;
    //         });
    //     });
    // });
};

export const imageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        if (!file) {
            reject(new Error('File is null or undefined.'));
            return;
        }

        if (!(file instanceof Blob)) {
            reject(new Error('Invalid file type. Expected a Blob.'));
            return;
        }

        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onloadend = () => {
            resolve(reader.result);
        };

        reader.onerror = (error) => {
            reject(error);
        };

    });
};

export const genrate_date_time = (date, type = null) => {
    let returndate = type
        ? { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true }
        : { day: '2-digit', month: 'short', year: 'numeric' }

    let formattedDate = new Date(date).toLocaleDateString('en-US', returndate);
    const indexOfSecondComma = formattedDate.indexOf(',', formattedDate.indexOf(',') + 1);

    const modifiedFormattedDate = indexOfSecondComma !== -1
        ? formattedDate.slice(0, indexOfSecondComma) + '  ' + formattedDate.slice(indexOfSecondComma + 1)
        : formattedDate;
    return modifiedFormattedDate;
}
export const calculateDifference = (start_date = null, end_date = null) => {

    const start = start_date ? start_date : new Date();
    const end = end_date ? end_date : new Date();
    const startDate = moment(start);
    const endDate = moment(end);

    const duration_new = moment.duration(endDate.diff(startDate));
    const years = duration_new.years();
    const months = duration_new.months();
    const days = duration_new.days();

    return years + ' Years ' + months + ' Months ' + days + ' Days';
};

export const findOptionByValue = (ids, options) => {
    let setValue = ids;
    if (setValue && typeof setValue === 'string') {
        if (setValue.includes(',')) {
            let allValues = setValue.split(",");
            if (allValues.length > 0) {
                return allValues.map((item) => options.find(option => option.value == item));
            }
        } else {
            return options.find(option => option.value == setValue);
        }
    }
    else {
        return options.find(option => option.value == setValue);
    }

    return null;
};

export const convertToSlug = (title) => {
    return title
        ?.toString()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
}


export const validateForm = (formData, validationRules) => {
    const errors = {};

    for (const field in validationRules) {
        const value = formData[field];
        const rules = validationRules[field];

        for (const rule of rules) {
            if (typeof rule === 'function') {
                const errorMessage = rule(value, formData);
                if (errorMessage) {
                    errors[field] = errorMessage;
                    break;
                }
            } else if (typeof rule === 'string') {
                errors[field] = rule;
                break;
            }
        }
    }

    return errors;
};

export const required = (value) => {
    if (!value || value.trim() === "") return "This field is required";
    return null;
};

export const validMobile = (value) => {
    if (!/^\d{10}$/.test(value)) return "Enter a valid 10-digit mobile number";
    return null;
};
export const validMail = (value) => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Enter a valid email address";
    return null;
};

export const validFullName = (value) => {
    if (!/^[A-Za-z\s]+$/.test(value)) {
        return "Enter a valid full name without numbers or special characters";
    }
    return null;
};

export const requiredFile = (value) => {
    if (!value || !(value instanceof File)) return "File is required";
    return null;
};