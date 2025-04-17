import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useBookStore from '../store/useBookStore';
import useAuthStore from '../store/useAuthStore';
import BookGrid from '../components/BookGrid';
import { MESSAGES, ROUTES } from '../utils/constants';

const MyBooks = () => {
    const { isLoggedIn, setPreviousPath } = useAuthStore();
    const { likedBooks } = useBookStore();
    const navigate = useNavigate();

    // 로그인 여부 확인 및 리다이렉션
    useEffect(() => {
        if (!isLoggedIn) {
            // 현재 경로 저장 후 로그인 페이지로 리다이렉트
            setPreviousPath(ROUTES.MY_BOOKS);
            navigate(ROUTES.LOGIN);
        }
    }, [isLoggedIn, navigate, setPreviousPath]);

    // 로그인되지 않았으면 렌더링하지 않음
    if (!isLoggedIn) {
        return null;
    }

    return (
        <div className="container">
            <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>내가 좋아하는 책</h2>

            {likedBooks.length === 0 ? (
                <div className="empty-message">{MESSAGES.NO_LIKED_BOOKS}</div>
            ) : (
                <BookGrid
                    books={likedBooks}
                    isSearchResult={false}
                    isLoading={false}
                />
            )}
        </div>
    );
};

export default MyBooks;