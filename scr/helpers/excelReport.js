import ExcelJS from 'exceljs'
import fs from 'fs'

export const generateExcelReport = async (companies) => {
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Companies')

    // Definir las columnas
    worksheet.columns = [
        { header: 'Name', key: 'name', width: 30 },
        { header: 'Impact Level', key: 'impactLevel', width: 20 },
        { header: 'Years in Business', key: 'yearsInBusiness', width: 20 },
        { header: 'Category', key: 'category', width: 20 },
        { header: 'Created At', key: 'createdAt', width: 20 },
        { header: 'Updated At', key: 'updatedAt', width: 20 },
    ]

    // Agregar las filas con los datos de las empresas
    companies.forEach(company => {
        worksheet.addRow({
            name: company.name,
            impactLevel: company.impactLevel,
            yearsInBusiness: company.yearsInBusiness,
            category: company.category,
            createdAt: company.createdAt,
            updatedAt: company.updatedAt,
        })
    })

    // Ruta donde se guardará el archivo Excel
    const filePath = './reports/companies_report.xlsx'

    // Asegurarse de que el directorio 'reports' exista
    if (!fs.existsSync('./reports')) {
        fs.mkdirSync('./reports')
    }

    // Guardar el archivo Excel
    await workbook.xlsx.writeFile(filePath)

    return filePath
}
