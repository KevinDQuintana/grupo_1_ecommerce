import React, {Component} from 'react';
import Row from './Row';
import {getProducts} from '../../services/productService';
class Table extends Component{
    constructor() {
        super();
        this.state = {
            products: [],
            categories: []
        };
    };

    async componentDidMount() {
        const response = await getProducts();
        this.setState({products: response.data.products, categories: response.data.productsCategories});
    };

    render() {
        return (
            <table className="table table-stripped">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Descuento</th>
                        <th>Stock</th>
                        <th>Categoría</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Array.isArray(this.state.products) && this.state.products.map((product,i) => <Row key={i+product.name} product={product} productsCategories={this.state.categories}/>)
                    }
                </tbody>
            </table>
        );
    };
};
export default Table;