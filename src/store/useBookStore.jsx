import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 도서 관련 Zustand 스토어
const useBookStore = create(
    persist(
        (set, get) => ({
            // 초기 상태
            likedBooks: [],
            searchQuery: '',

            // 검색어 설정 액션
            setSearchQuery: (query) => set({ searchQuery: query }),

            // 책 좋아요 액션
            toggleLikeBook: (book) => {
                const { likedBooks } = get();
                const isAlreadyLiked = likedBooks.some((likedBook) => likedBook.key === book.key);

                if (isAlreadyLiked) {
                    // 이미 좋아요한 책이면 제거
                    set({
                        likedBooks: likedBooks.filter((likedBook) => likedBook.key !== book.key)
                    });
                } else {
                    // 새로운 책은 추가
                    set({
                        likedBooks: [...likedBooks, book]
                    });
                }
            },

            // 책 좋아요 여부 확인
            isBookLiked: (bookKey) => {
                const { likedBooks } = get();
                return likedBooks.some((book) => book.key === bookKey);
            },

            // 모든 좋아요 책 가져오기
            getLikedBooks: () => get().likedBooks,
        }),
        {
            name: 'book-store-storage', // 로컬 스토리지 키 이름
        }
    )
);

export default useBookStore;