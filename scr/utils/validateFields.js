const validateFields = (fields) => {
    for (const [key, value] of Object.entries(fields)) {
        if (value === '' || value === undefined || value === null) {
            return `${key} is required`
        }
    }
    return null
}

export default validateFields
