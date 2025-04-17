import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getBookCoverUrl } from '../api/api';
import { DEFAULT_BOOK_COVER, MESSAGES, ROUTES } from '../utils/constants';
import useBookStore from '../store/useBookStore';
import useAuthStore from '../store/useAuthStore';

const BookCard = ({ book, isSearchResult }) => {
    const navigate = useNavigate();
    const { isLoggedIn, setPreviousPath } = useAuthStore();
    const { toggleLikeBook, isBookLiked } = useBookStore();

    console.log('BookCard에 전달된 book:', book);

    // 책 키 (ID)
    const bookKey = book.key || '';

    // 책 표지 이미지 URL (검색 결과와 주제별 책의 데이터 구조가 다름)
    const getCoverUrl = () => {
        if (isSearchResult && book.cover_i) {
            return getBookCoverUrl(book.cover_i);
        } else if (!isSearchResult && book.cover_id) {
            return getBookCoverUrl(book.cover_id);
        } else if (book.covers && book.covers.length > 0) {
            return getBookCoverUrl(book.covers[0]);
        } else if (book.cover_edition_key) {
            return `https://covers.openlibrary.org/b/olid/${book.cover_edition_key}-M.jpg`;
        } else {
            return DEFAULT_BOOK_COVER;
        }
    };

    const coverUrl = getCoverUrl();

    // 좋아요 상태 확인
    const isLiked = isBookLiked(bookKey);

    // 책 제목
    const title = book.title || '제목 없음';

    // 저자 이름 (검색 결과와 주제별 책의 데이터 구조가 다름)
    const getAuthorName = () => {
        if (isSearchResult) {
            // 검색 결과 데이터 구조
            return book.author_name && book.author_name.length > 0
                ? book.author_name[0]
                : '작가 미상';
        } else {
            // 주제별 데이터 구조
            return book.authors && book.authors.length > 0
                ? book.authors[0].name
                : '작가 미상';
        }
    };

    const authorName = getAuthorName();

    // 좋아요 버튼 클릭 핸들러
    const handleLikeClick = (e) => {
        e.stopPropagation();

        if (!isLoggedIn) {
            // 로그인되지 않았으면 현재 경로 저장 후 로그인 페이지로 이동
            alert(MESSAGES.LOGIN_REQUIRED);
            setPreviousPath(window.location.pathname);
            navigate(ROUTES.LOGIN);
            return;
        }

        toggleLikeBook(book);
    };

    return (
        <div className="book-card">
            <img
                src={coverUrl}
                alt={title}
                className="book-cover"
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = DEFAULT_BOOK_COVER;
                }}
            />
            <div className="book-info">
                <h3 className="book-title">{title}</h3>
                <p className="book-author">{authorName}</p>
                <button
                    className={`like-button ${isLiked ? 'active' : ''}`}
                    onClick={handleLikeClick}
                    aria-label={isLiked ? '좋아요 취소' : '좋아요'}
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill={isLiked ? "#e91e63" : "none"}
                        stroke={isLiked ? "#e91e63" : "#ccc"}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default BookCard;