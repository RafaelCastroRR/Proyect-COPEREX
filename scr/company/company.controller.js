// company.controller.js

import { createCompany, getCompanies, updateCompany } from './company.service.js'
import { validateImpactLevel, validateCategory, validateYearsInBusiness } from '../helpers/validateFields.js'
import { generateExcelReport } from '../helpers/excelReport.js'

// Crear nueva empresa
export const createCompanyController = async (req, res) => {
    const { name, impactLevel, yearsInBusiness, category } = req.body

    // Validar los datos antes de crear la empresa
    if (!validateImpactLevel(impactLevel)) {
        return res.status(400).json({ message: 'Nivel de impacto no válido' })
    }

    if (!validateCategory(category)) {
        return res.status(400).json({ message: 'Categoría no válida' })
    }

    if (!validateYearsInBusiness(yearsInBusiness)) {
        return res.status(400).json({ message: 'Años en negocio no válidos' })
    }

    try {
        // Crear la empresa utilizando el servicio
        const company = await createCompany({ name, impactLevel, yearsInBusiness, category })
        res.status(201).json({ message: 'Empresa creada exitosamente', company })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// Obtener empresas con filtros
export const getCompaniesController = async (req, res) => {
    try {
        const filters = req.query
        const companies = await getCompanies(filters)
        res.status(200).json(companies)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// Generar el reporte en Excel
export const generateReportController = async (req, res) => {
    try {
        // Obtener todas las empresas
        const companies = await getCompanies({})
        const filePath = await generateExcelReport(companies)

        res.status(200).json({
            message: 'Reporte generado con éxito',
            filePath,
        })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// Actualizar información de una empresa
export const updateCompanyController = async (req, res) => {
    const { id } = req.params
    const { name, impactLevel, yearsInBusiness, category } = req.body

    try {
        const updatedCompany = await updateCompany(id, { name, impactLevel, yearsInBusiness, category })
        if (!updatedCompany) {
            return res.status(404).json({ message: 'Empresa no encontrada' })
        }
        res.status(200).json({ message: 'Empresa actualizada', updatedCompany })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
