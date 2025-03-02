export const validateImpactLevel = (impactLevel) => {
    const validLevels = ['Low', 'Medium', 'High']
    return validLevels.includes(impactLevel)
}

export const validateCategory = (category) => {
    const validCategories = ['Technology', 'Health', 'Education', 'Retail']
    return validCategories.includes(category)
}

export const validateYearsInBusiness = (years) => {
    return years > 0 && years <= 100 // Asegurarse de que los años sean un número positivo razonable
}
