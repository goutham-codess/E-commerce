const express = require('express');
const authenticateToken = require('../middleware/auth');
const { carts, items } = require('../data/store');

const router = express.Router();

// Get user's cart
router.get('/', authenticateToken, (req, res) => {
  try {
    const userCart = carts.get(req.userId) || [];
    res.json(userCart);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart' });
  }
});

// Add item to cart
router.post('/add', authenticateToken, (req, res) => {
  try {
    const { itemId, quantity = 1 } = req.body;

    if (!itemId) {
      return res.status(400).json({ message: 'Item ID is required' });
    }

    const item = items.get(itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    let userCart = carts.get(req.userId) || [];
    const existingItemIndex = userCart.findIndex(cartItem => cartItem.itemId === itemId);

    if (existingItemIndex > -1) {
      userCart[existingItemIndex].quantity += quantity;
    } else {
      userCart.push({
        itemId,
        quantity,
        addedAt: new Date()
      });
    }

    carts.set(req.userId, userCart);
    res.json({ message: 'Item added to cart', cart: userCart });
  } catch (error) {
    res.status(500).json({ message: 'Error adding item to cart' });
  }
});

// Update item quantity in cart
router.put('/update', authenticateToken, (req, res) => {
  try {
    const { itemId, quantity } = req.body;

    if (!itemId || quantity < 0) {
      return res.status(400).json({ message: 'Invalid item ID or quantity' });
    }

    let userCart = carts.get(req.userId) || [];
    const itemIndex = userCart.findIndex(cartItem => cartItem.itemId === itemId);

    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    if (quantity === 0) {
      userCart.splice(itemIndex, 1);
    } else {
      userCart[itemIndex].quantity = quantity;
    }

    carts.set(req.userId, userCart);
    res.json({ message: 'Cart updated', cart: userCart });
  } catch (error) {
    res.status(500).json({ message: 'Error updating cart' });
  }
});

// Remove item from cart
router.delete('/remove/:itemId', authenticateToken, (req, res) => {
  try {
    const { itemId } = req.params;
    let userCart = carts.get(req.userId) || [];
    
    userCart = userCart.filter(cartItem => cartItem.itemId !== itemId);
    carts.set(req.userId, userCart);
    
    res.json({ message: 'Item removed from cart', cart: userCart });
  } catch (error) {
    res.status(500).json({ message: 'Error removing item from cart' });
  }
});

module.exports = router;