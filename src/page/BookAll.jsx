import React, { useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';


const BookAll = () => {
}

{
    <div>
        isLoading ? (
        <LoadingSpinner />
        ) : (
        <BookGrid
            books={books}
            isSearchResult={isSearchResult}
            isLoading={isLoading}
            searchQuery={searchQuery}
        />
        )

    </div >
};

export default BookAll;