import React from 'react';
import BookCard from './BookCard';
import { MESSAGES } from '../utils/constants';

const BookGrid = ({ books, isSearchResult, isLoading, searchQuery }) => {
    console.log('BookGrid에 전달된 books:', books);

    // 책이 없는 경우
    if (!isLoading && (!books || books.length === 0)) {
        return (
            <div className="empty-message">
                {searchQuery ? `"${searchQuery}" ${MESSAGES.NO_BOOKS_FOUND}` : MESSAGES.NO_BOOKS_FOUND}
            </div>
        );
    }

    return (
        <div className="book-grid">
            {books.map((book, index) => (
                <BookCard
                    key={book.key || index}
                    book={book}
                    isSearchResult={isSearchResult}
                />
            ))}
        </div>
    );
};

export default BookGrid;