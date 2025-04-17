import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 인증 관련 Zustand 스토어
const useAuthStore = create(
    persist(
        (set) => ({
            // 초기 상태
            isLoggedIn: false,
            user: null,
            previousPath: '/',

            // 로그인 액션
            login: (userData) => set({ isLoggedIn: true, user: userData }),

            // 로그아웃 액션
            logout: () => set({ isLoggedIn: false, user: null }),

            // 이전 경로 저장 액션 (로그인 후 돌아가기 위함)
            setPreviousPath: (path) => set({ previousPath: path }),
        }),
        {
            name: 'user-auth-storage', // 로컬 스토리지 키 이름
        }
    )
);

export default useAuthStore;