module.exports = (Model, label) => ({
  // GET /api/resources
  getAll: async (req, res, next) => {
    try {
      res.status(200).json(await Model.find().sort({ createdAt: -1 }));
    } catch (err) {
      next(err);
    }
  },

  // GET /api/resources/:id
  getOne: async (req, res, next) => {
    try {
      const doc = await Model.findById(req.params.id);
      if (!doc) return res.status(404).json({ message: `${label} not found` });
      res.status(200).json(doc);
    } catch (err) {
      next(err);
    }
  },

  // POST /api/resources
  create: async (req, res, next) => {
    try {
      const doc = await Model.create(req.body || {});
      res.status(201).json(doc);
    } catch (err) {
      next(err);
    }
  },

  // PUT /api/resources/:id
  update: async (req, res, next) => {
    try {
      const doc = await Model.findByIdAndUpdate(req.params.id, req.body || {}, {
        returnDocument: "after",
        runValidators: true,
      });
      if (!doc) return res.status(404).json({ message: `${label} not found` });
      res.status(200).json(doc);
    } catch (err) {
      next(err);
    }
  },

  // DELETE /api/resources/:id
  remove: async (req, res, next) => {
    try {
      const doc = await Model.findByIdAndDelete(req.params.id);
      if (!doc) return res.status(404).json({ message: `${label} not found` });
      res.status(200).json({ message: `${label} deleted`, id: req.params.id });
    } catch (err) {
      next(err);
    }
  },

  // DELETE /api/resources  (admin only, test environment only)
  removeAll: async (req, res, next) => {
    try {
      const result = await Model.deleteMany({});
      res
        .status(200)
        .json({ message: `All ${label} records deleted`, deletedCount: result.deletedCount });
    } catch (err) {
      next(err);
    }
  },
});