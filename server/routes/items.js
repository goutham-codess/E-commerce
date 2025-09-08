const express = require('express');
const { items } = require('../data/store');

const router = express.Router();

// Get all items with filters
router.get('/', (req, res) => {
  try {
    const { category, minPrice, maxPrice, search } = req.query;
    let filteredItems = Array.from(items.values());

    // Filter by category
    if (category && category !== 'All') {
      filteredItems = filteredItems.filter(item => 
        item.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Filter by price range
    if (minPrice) {
      filteredItems = filteredItems.filter(item => item.price >= parseFloat(minPrice));
    }
    if (maxPrice) {
      filteredItems = filteredItems.filter(item => item.price <= parseFloat(maxPrice));
    }

    // Filter by search term
    if (search) {
      const searchTerm = search.toLowerCase();
      filteredItems = filteredItems.filter(item =>
        item.name.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm)
      );
    }
    
    res.json(filteredItems);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching items' });
  }
});

// Get single item
router.get('/:id', (req, res) => {
  try {
    const item = items.get(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching item' });
  }
});

// Get all categories
router.get('/meta/categories', (req, res) => {
  try {
    const categories = [...new Set(Array.from(items.values()).map(item => item.category))];
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories' });
  }
});

module.exports = router;