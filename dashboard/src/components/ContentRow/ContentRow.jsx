import React, {Component} from 'react';
import Card from './Card/Card';
import CategoryCard from './CategoryCard/CategoryCard';
import {getProducts} from '../../services/productService';

class ContentRow extends Component {
	constructor() {
		super();
		this.state = {
			products: [],
			categories: [],
			images: [],
			url: ''
		};
	};

	async componentDidMount() {
		const response = await getProducts();
		this.setState({products: response.data.products, categories: response.data.productsCategories, images: response.data.productsImages, url: response.data.imageUrl});
		// setTimeout(async() => {
		// }, 5000);
	};

	render() {
		let categories;
		if(this.state.categories.length > 0){
			categories = this.state.categories.map((category,i) => <CategoryCard key={i+category.name} category={category} />)
		} else {
			categories = <h3>Cargando...</h3>
		}
		
		let lastProduct = this.state.products[this.state.products.length-1]; 
		
		let url = this.state.url;
		let lastProductImage;
		this.state.images.map(image => {
			if (lastProduct.product_id === image.product_id) {
				lastProductImage = image.location
			};
		});
		console.log(lastProductImage);

		return (
			<div className="row">
				<Card title={'Último producto agregado'}>
					<div className="text-center">
						<img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: '40rem'}} src={lastProductImage && url && `${url}${lastProductImage}`} alt={lastProduct && lastProduct.name}/>
					</div>
					<p>{lastProduct && lastProduct.description}</p>
					<a className="btn btn-danger" target="_blank" rel="nofollow" href="/">Ver detalle del producto</a>
				</Card>
				<Card title={'Categorías de productos'}>
					<div className="row">
						{categories}
					</div>
				</Card>			
			</div>
		);
	};
};
export default ContentRow;