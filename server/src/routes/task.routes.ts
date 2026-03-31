import { Router } from 'express'
import * as taskController from '../controllers/task.controller'

const router = Router()

router.get('/', taskController.getAll)
router.get('/:id', taskController.getOne)
router.post('/', taskController.create)
router.put('/:id', taskController.update)
router.delete('/:id', taskController.remove)

export default router