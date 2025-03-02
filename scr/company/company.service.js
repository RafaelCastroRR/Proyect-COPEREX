import Company from './company.model.js'

// Crear una nueva empresa
export const createCompany = async (data) => {
    // Verificar si la empresa ya existe con el mismo nombre (puedes agregar más validaciones si es necesario)
    const existingCompany = await Company.findOne({ name: data.name })
    if (existingCompany) {
        throw new Error('Ya existe una empresa con este nombre')
    }

    const company = new Company(data)
    await company.save()
    return company
}

// Obtener empresas con filtros
export const getCompanies = async (filters) => {
    const query = {}

    // Aplicar filtros si se proporcionan
    if (filters.category) {
        query.category = filters.category
    }

    if (filters.impactLevel) {
        query.impactLevel = filters.impactLevel
    }

    if (filters.yearsInBusiness) {
        query.yearsInBusiness = { $gte: filters.yearsInBusiness }
    }

    // Devolver las empresas filtradas y ordenadas
    return await Company.find(query).sort(filters.sort || { yearsInBusiness: 1 })
}

// Actualizar una empresa
export const updateCompany = async (id, data) => {
    const company = await Company.findById(id)

    if (!company) {
        throw new Error('Empresa no encontrada')
    }

    // Actualizar la empresa con los nuevos datos
    Object.assign(company, data)

    await company.save()
    return company
}
