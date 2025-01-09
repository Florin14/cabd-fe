import React, { useEffect, useState } from 'react';
import { fetchProducts, addProduct, deleteProduct } from './apiService';

const ProductComponent = () => {
    const [products, setProducts] = useState([]);
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');

    useEffect(() => {
        fetchProducts().then(response => setProducts(response.data));
    }, []);

    const handleAddProduct = () => {
        const newProduct = { productName, price };
        addProduct(newProduct).then(() => {
            fetchProducts().then(response => setProducts(response.data));
            setProductName('');
            setPrice('');
        });
    };

    const handleDelete = (id) => {
        deleteProduct(id).then(() => {
            fetchProducts().then(response => setProducts(response.data));
        });
    };

    return (
        <div>
            <h1>Product Management</h1>
            <input 
                type="text" 
                placeholder="Product Name" 
                value={productName} 
                onChange={(e) => setProductName(e.target.value)} 
            />
            <input 
                type="number" 
                placeholder="Price" 
                value={price} 
                onChange={(e) => setPrice(e.target.value)} 
            />
            <button onClick={handleAddProduct}>Add Product</button>

            <ul>
                {products.map(product => (
                    <li key={product.productId}>
                        {product.productName} - ${product.price}
                        <button onClick={() => handleDelete(product.productId)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductComponent;
