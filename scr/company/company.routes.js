import express from 'express'
import { createCompanyController, getCompaniesController, updateCompanyController, generateReportController } from './company.controller.js'
import { protect } from '../auth/auth.middleware.js'  

const router = express.Router()

// Ruta para crear una empresa (requiere autorización)
router.post('/', protect, createCompanyController)

// Ruta para obtener todas las empresas con filtros (requiere autorización)
router.get('/', protect, getCompaniesController)

// Ruta para actualizar una empresa (requiere autorización)
router.put('/:id', protect, updateCompanyController)

// Ruta para generar un reporte Excel con las empresas (requiere autorización)
router.get('/report', protect, generateReportController)

export default router
