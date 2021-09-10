export const Searchbar = ({ onSearch }) => {
  const handleSearch = e => {
    e.preventDefault();
    onSearch(e.target.elements.imageName.value);
  };

  return (
    <header className="Searchbar">
      <form onSubmit={handleSearch} className="SearchForm">
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          name="imageName"
          autoComplete="off"
          // autofocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};
