// 상수 정의
export const DEFAULT_BOOK_COVER = 'https://covers.openlibrary.org/b/id/-1-M.jpg';

// API 상수
export const API_BASE_URL = 'https://openlibrary.org';

// 메시지 상수
export const MESSAGES = {
    NO_BOOKS_FOUND: '책 목록이 없습니다.',
    NO_LIKED_BOOKS: '아직 좋아요를 누른 책이 없습니다.',
    WELCOME: '님 환영합니다.',
    LOGIN_REQUIRED: '좋아요 기능은 로그인이 필요합니다.',
};

// 경로 상수
export const ROUTES = {
    HOME: '/',
    MY_BOOKS: '/my-books',
    LOGIN: '/login',
};

// 로컬 스토리지 키
export const STORAGE_KEYS = {
    AUTH: 'user-auth-storage',
    BOOKS: 'book-store-storage',
};

// 이미지 사이즈
export const COVER_SIZES = {
    SMALL: 'S',
    MEDIUM: 'M',
    LARGE: 'L',
};