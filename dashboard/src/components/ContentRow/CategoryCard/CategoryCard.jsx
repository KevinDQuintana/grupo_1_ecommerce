function CategoryCard({category}) {
    return (
        <div className="col-lg-6 mb-4">
			<div className="card bg-dark text-white shadow">
				<div className="card-body">
					{category.name}
				</div>
			</div>
		</div>
    );
};
export default CategoryCard;