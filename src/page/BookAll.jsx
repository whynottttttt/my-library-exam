import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { getBooksBySubject, searchBooks } from '../api/api';
import useBookStore from '../store/useBookStore';
import useAuthStore from '../store/useAuthStore';
import SearchBar from '../components/SearchBar';
import BookGrid from '../components/BookGrid';
import LoadingSpinner from '../components/LoadingSpinner';
import { MESSAGES } from '../utils/constants';

const BookAll = () => {
    const { isLoggedIn, user } = useAuthStore();
    const { searchQuery } = useBookStore();
    const [isLoading, setIsLoading] = useState(true);
    const [books, setBooks] = useState([]);
    const [isSearchResult, setIsSearchResult] = useState(false);

   
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <BookGrid
                    books={books}
                    isSearchResult={isSearchResult}
                    isLoading={isLoading}
                    searchQuery={searchQuery}
                />
            )}
        </div>
    );
};

export default BookAll;