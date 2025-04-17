import React, { useState } from 'react';
import useBookStore from '../store/useBookStore';

const SearchBar = () => {
    const { setSearchQuery } = useBookStore();
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setSearchQuery(inputValue.trim());
    };

    return (
        <div className="search-container">
            <form className="search-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="search-input"
                    placeholder="책 제목이나 작가를 검색하세요"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button type="submit" className="search-button">
                    검색
                </button>
            </form>
        </div>
    );
};

export default SearchBar;