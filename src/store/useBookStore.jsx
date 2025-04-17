import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useBookStore = create(
    persist(
        (set, get) => ({

            likedBooks: [],
            searchQuery: '',


            setSearchQuery: (query) => set({ searchQuery: query }),


            toggleLikeBook: (book) => {
                const { likedBooks } = get();
                const isAlreadyLiked = likedBooks.some((likedBook) => likedBook.key === book.key);

                if (isAlreadyLiked) {

                    set({
                        likedBooks: likedBooks.filter((likedBook) => likedBook.key !== book.key)
                    });
                } else {

                    set({
                        likedBooks: [...likedBooks, book]
                    });
                }
            },


            isBookLiked: (bookKey) => {
                const { likedBooks } = get();
                return likedBooks.some((book) => book.key === bookKey);
            },


            getLikedBooks: () => get().likedBooks,
        }),
        {
            name: 'book-store-storage',
        }
    )
);

export default useBookStore;