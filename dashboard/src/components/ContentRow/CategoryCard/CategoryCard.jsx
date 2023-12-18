function CategoryCard({category}) {
    return (
        <div className="col-lg-6 mb-4">
			<div className="card bg-dark text-white shadow">
				<div className="card-body">
					{category.name + ' -- ' +category.count}
				</div>
			</div>
		</div>
    );
};
export default CategoryCard;