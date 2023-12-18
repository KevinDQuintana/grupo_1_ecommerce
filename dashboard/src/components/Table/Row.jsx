import React from 'react';
function Row({product, productsCategories}) {
    return (
        <tr>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>{product.discount}</td>
            <td>{product.stock}</td>
            {
                Array.isArray(productsCategories) && productsCategories.map((category,i) => {
                    if (product.category_id === category.category_id) {
                        return <td key={i+category.name}>{category.name}</td>;
                    };
                    return null;
                })
            }
        </tr>
    );
};
export default Row;