const SearchWord = ({ handleSearch, searchQuery }) => {
  return (
    <>
      <div className="search-container  ">
        <input
          type="text"
          placeholder="Search for words"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
    </>
  );
};

export default SearchWord;
