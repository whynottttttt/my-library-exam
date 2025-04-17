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

    // 데이터 가져오기
    useEffect(() => {
        const fetchBooks = async () => {
            setIsLoading(true);
            try {
                let data;
                if (searchQuery) {
                    // 검색어가 있으면 검색 결과 가져오기
                    data = await searchBooks(searchQuery);
                    setBooks(data.docs || []);
                    setIsSearchResult(true);
                } else {
                    // 없으면 기본 책 목록 가져오기
                    data = await getBooksBySubject('fiction');
                    setBooks(data.works || []);
                    setIsSearchResult(false);
                }
            } catch (error) {
                console.error('도서 가져오기 오류:', error);
                setBooks([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBooks();
    }, [searchQuery]);

    return (
        <div className="container">
            {isLoggedIn && user && (
                <div className="welcome-message">
                    {user.username}{MESSAGES.WELCOME}
                </div>
            )}

            <SearchBar />

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