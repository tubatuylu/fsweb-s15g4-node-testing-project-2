const router = require('express').Router();
const model = require('./hobiler-model');

// GET /api/hobiler - tüm hobiler
router.get('/', async (req, res, next) => {
  try {
    const hobiler = await model.getAll();
    res.json(hobiler);
  } catch (err) {
    next(err);
  }
});

// GET /api/hobiler/:id - tek hobi
router.get('/:id', async (req, res, next) => {
  try {
    const hobi = await model.getById(req.params.id);
    if (!hobi) {
      return res.status(404).json({ message: 'Hobi bulunamadı' });
    }
    res.json(hobi);
  } catch (err) {
    next(err);
  }
});

// POST /api/hobiler - yeni hobi oluştur
router.post('/', async (req, res, next) => {
  try {
    const { isim, kategori } = req.body;
    if (!isim || !kategori) {
      return res.status(400).json({ message: 'isim ve kategori zorunludur' });
    }
    const yeniHobi = await model.create({ isim, kategori });
    res.status(201).json(yeniHobi);
  } catch (err) {
    next(err);
  }
});

// PUT /api/hobiler/:id - hobi güncelle
router.put('/:id', async (req, res, next) => {
  try {
    const hobi = await model.getById(req.params.id);
    if (!hobi) {
      return res.status(404).json({ message: 'Hobi bulunamadı' });
    }
    const updated = await model.update(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/hobiler/:id - hobi sil
router.delete('/:id', async (req, res, next) => {
  try {
    const hobi = await model.getById(req.params.id);
    if (!hobi) {
      return res.status(404).json({ message: 'Hobi bulunamadı' });
    }
    await model.remove(req.params.id);
    res.json({ message: 'Hobi silindi', hobi });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
