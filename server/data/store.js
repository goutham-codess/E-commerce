// In-memory data store (in production, use a proper database)
const users = new Map();
const items = new Map();
const carts = new Map();

// Sample items data
const sampleItems = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    price: 199.99,
    category: 'Electronics',
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500',
    stock: 15
  },
  {
    id: '2',
    name: 'Smartphone Pro Max',
    description: 'Latest smartphone with advanced camera features',
    price: 999.99,
    category: 'Electronics',
    image: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=500',
    stock: 8
  },
  {
    id: '3',
    name: 'Designer Watch',
    description: 'Elegant luxury watch for special occasions',
    price: 459.99,
    category: 'Accessories',
    image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=500',
    stock: 5
  },
  {
    id: '4',
    name: 'Running Shoes',
    description: 'Comfortable running shoes for daily workouts',
    price: 129.99,
    category: 'Sports',
    image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=500',
    stock: 20
  },
  {
    id: '5',
    name: 'Coffee Maker Pro',
    description: 'Professional-grade coffee maker for coffee enthusiasts',
    price: 299.99,
    category: 'Home',
    image: 'https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=500',
    stock: 12
  },
  {
    id: '6',
    name: 'Gaming Laptop',
    description: 'High-performance laptop for gaming and productivity',
    price: 1499.99,
    category: 'Electronics',
    image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=500',
    stock: 6
  }
];

// Initialize sample data
sampleItems.forEach(item => items.set(item.id, item));

// Create a sample user for testing
const bcrypt = require('bcryptjs');
const createTestUser = async () => {
  const hashedPassword = await bcrypt.hash('password123', 10);
  users.set('test@example.com', {
    id: '999',
    email: 'test@example.com',
    password: hashedPassword,
    name: 'Test User',
    createdAt: new Date()
  });
  console.log('Test user created: test@example.com / password123');
};
createTestUser();

module.exports = {
  users,
  items,
  carts
};