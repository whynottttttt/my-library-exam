import { create } from 'zustand';
import { persist } from 'zustand/middleware';


const useAuthStore = create(
    persist(
        (set) => ({

            isLoggedIn: false,
            user: null,
            previousPath: '/',

            login: (userData) => set({ isLoggedIn: true, user: userData }),

            logout: () => set({ isLoggedIn: false, user: null }),

            setPreviousPath: (path) => set({ previousPath: path }),
        }),
        {
            name: 'user-auth-storage',
        }
    )
);

export default useAuthStore;