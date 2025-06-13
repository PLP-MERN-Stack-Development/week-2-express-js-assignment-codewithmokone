const express = require('express');
const router = express.Router();
const products = require('./products');
const apiKeyAuth = require('./middleware/apiKeyAuth');
const validateProduct = require('./middleware/validation');


// ------------- Middleware --------------
router.use(apiKeyAuth);

// --------------- ROUTES ----------------
// Root route
router.get('/', (req, res) => {
  res.send('Welcome to the Product API! Go to /api/products to see all products.');
});


// GET /api/products - Get all products
router.get('/api/products', (req, res) => {
    const { category, page = 1, limit = 5 } = req.query;

    // Filter by category if provided
    let filtered = products
    if (category){
        const filtered = products.filter(
            product => product.category.toLowerCase() === category.toLowerCase()
        );
        return res.json(filtered);
    }

    //Pagination logic
    const pageInt = parseInt(page);
    const limitInt = parseInt(limit);
    const startIndex = (pageInt - 1) * limitInt;
    const endIndex = startIndex + limitInt;

    const paginated = filtered.slice(startIndex, endIndex);

    res.json({
        totalItems: filtered.length,
        totalPages: Math.ceil(filtered.length / limitInt),
        currentPage: pageInt,
        pageSize: paginated.length,
        products: paginated
    
    });
});


// GET /api/products/:id - Get a specific product
router.get('/api/products/:id', (req, res) => {
  const product = products.find(product => product.id === (req.params.id));

  if (!product) return res.status(404).send('Product not found');

  res.json(product);
});

router.get('/api/products/search', (req, res) => {
    const { name } = req.query;

    if (!name || name.trim() === ''){
        return res.status(400).json({error: 'Search via name'})
    }
})



// POST /api/products - Create a new product
router.post('/api/products', validateProduct, (req, res) => {
  try {
    // Assign a unique ID
    const newProduct = {id: products.length + 1, ...req.body };

    // Add new item to the in-memory product
    products.push(newProduct);

    // Log the updated products list
    console.log("Updated Products: ", products);

    // HTTP status code 201 for resource creation
    res.status(201).json(newProduct);
  } catch (err) {
    // Error passed to error-handling middleware
    next(err);
  }
});


// PUT /api/products/:id - Update a product by its ID
router.put('/api/products/:id', validateProduct, (req, res) => {
  try {
    // Find the product in the products array that matches the ID from the request parameters
    // Note: Ensure that the ID types match (convert if necessary)
    const product = products.find(product => product.id === (req.params.id));

    // If the product is not found, return a 404 Not Found response
    if (!product) return res.status(404).send('Product not found');

    // Update the found product by copying all properties from req.body onto the product object
    Object.assign(product, req.body);

    // Log the updated products array for debugging purposes
    console.log("Updated Products: ", products);

    // Return the updated product as a JSON response
    res.json(product);
  } catch (err) {
    // If an error occurs during the update process, pass it to the error handler middleware
    next(err);
  }
});


// DELETE /api/products/:id - Endpoint to delete a product by its ID
router.delete('/api/products/:id', (req, res) => {
    // Find the index of the product in the products array with the matching ID
    const index = products.findIndex(product => product.id === (req.params.id));

    // If no product is found, respond with a 404 Not Found status
    if (index === -1) return res.status(404).send('Product not found');

    // Remove the product from the array and store the deleted product
    const deletedProduct = products.splice(index, 1)[0];

    // Log the updated list of products for debugging purposes
    console.log("Updated Products: ", products);

    // Return the deleted product as a JSON response
    res.json(deletedProduct);
});

module.exports = router;