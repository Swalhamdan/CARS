const express = require('express');
const router = express.Router();
const serviceController = require('../controller/service');

router.get('/',serviceController.index)

router.get('/create',serviceController.renderNewForm)
router.post('/create',serviceController.createService)

router.get('/:id', serviceController.showService)

router.get('/:id/edit', serviceController.renderUpdateForm)
router.put('/:id', serviceController.updateService)
router.delete('/:id',serviceController.deleteService)

module.exports = router;