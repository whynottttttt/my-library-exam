// OpenLibrary API 함수 모음
const BASE_URL = 'https://openlibrary.org';

// 검색 API 호출 함수
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

// 주제별 책 가져오기
export const getBooksBySubject = async (subject = 'fiction', limit = 12) => {
    try {
        const response = await fetch(`${BASE_URL}/subjects/${subject}.json?limit=${limit}`);
        if (!response.ok) {
            throw new Error('주제별 책 가져오기에 실패했습니다');
        }
        const data = await response.json();
        console.log('API 응답 데이터:', data); // 디버깅용
        return data;
    } catch (error) {
        console.error('Error fetching books by subject:', error);
        throw error;
    }
};

// 인기 책 가져오기 (대체 방법)
export const getTrendingBooks = async (limit = 10) => {
    try {
        // 여러 인기 주제의 책을 가져옴
        const subjects = ['love', 'fiction', 'fantasy', 'adventure', 'romance'];
        const randomSubject = subjects[Math.floor(Math.random() * subjects.length)];
        const response = await fetch(`${BASE_URL}/subjects/${randomSubject}.json?limit=${limit}`);

        if (!response.ok) {
            throw new Error('인기 책 가져오기에 실패했습니다');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching trending books:', error);
        throw error;
    }
};

// 책 표지 이미지 URL 얻기
export const getBookCoverUrl = (coverId, size = 'M') => {
    if (!coverId) return null;
    return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
};

// 책 상세 정보 가져오기
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