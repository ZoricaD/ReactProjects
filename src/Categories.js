export default function Categories(props) {
    const categories = ['Technology', 'Sports', 'Politics', 'Business'];

    return (
        <div className="categories-container">
            {categories.map((category, index) => (
                <button
                    key={index}
                    onClick={() => props.setCategory(category)}
                >
                    {category}
                </button>
            ))}
        </div>
    );
}
