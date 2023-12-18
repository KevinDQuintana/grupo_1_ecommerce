import React, { Component } from 'react';
import Card from './Card/Card';
import { getProducts } from '../../services/productService';
import { getUsers } from '../../services/userService';

class RowMovies extends Component {
	constructor() {
		super();
		this.state = {
			users: [],
			products: [],
			categories: [],
			colors: [],
			brands: [],
			images: [],
			url: ''
		};
	};

	async componentDidMount() {
		const response = await getProducts();
		const responseUser = await getUsers();
		this.setState({ 
			users: responseUser,
			products: response, 
			categories: response.data.productsCategories, 
			images: response.data.productsImages,
			colors: response.data.productsColors,
			brands: response.data.productsBrands,
			url: response.data.imageUrl });
		// setTimeout(async() => {
		// }, 5000);
	};

	render() {
		const listado = [
			{
				titulo: 'Total de productos',
				cifra: this.state.products && this.state.products.count,
				color: 'primary',
				icono: 'fas fa-shopping-cart fa-lg'
			},
			{
				titulo: 'Total de categorías de productos',
				cifra: this.state.categories && this.state.categories.length,
				color: 'success',
				icono: 'fas fa-wrench fa-lg'
			},
			{
				titulo: 'Total de usuarios',
				cifra: this.state.users && this.state.users.count,
				color: 'warning',
				icono: 'fas fa-user fa-2x'
			},
			{
				titulo: 'Total de colores',
				cifra: this.state.colors && this.state.colors.length,
				color: 'primary',
				icono: 'fas fa-palette fa-lg'
			},
			{
				titulo: 'Total de marcas',
				cifra: this.state.brands && this.state.brands.length,
				color: 'success',
				icono: 'fas fa-copyright fa-lg'
			}
		];
		return (
			<div className="row">
				{
					Array.isArray(listado) && listado.map((movie, i) => <Card key={i + movie.titulo} titulo={movie.titulo} cifra={movie.cifra} color={movie.color} icono={movie.icono} />)
				}
			</div>
		);
	};
};
export default RowMovies;