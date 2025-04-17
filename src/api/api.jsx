
const BASE_URL = 'https://openlibrary.org';

export const searchBooks = async (query, page = 1) => {
    try {
        const response = await fetch(`${BASE_URL}/search.json?q=${encodeURIComponent(query)}&page=${page}`);
        if (!response.ok) {
            throw new Error('책 검색에 실패했습니다');
        }
        return await response.json();
    } catch (error) {
        console.error('Error searching books:', error);
        throw error;
    }
};


export const getBookCoverUrl = (coverId, size = 'M') => {
    if (!coverId) return null;
    return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
};

export const getBookDetails = async (bookId) => {
    try {
        const response = await fetch(`${BASE_URL}/works/${bookId}.json`);
        if (!response.ok) {
            throw new Error('책 상세 정보 가져오기에 실패했습니다');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching book details:', error);
        throw error;
    }
};