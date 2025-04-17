import { useQuery } from 'react-query';
import { searchBooks } from '../api/api';


// 책 검색을 위한 커스텀 훅
export const useSearchBooks = (query, page = 1) => {
    return useQuery(
        ['searchBooks', query, page],
        () => searchBooks(query, page),
        {
            enabled: !!query, // 쿼리가 있을 때만 API 요청
            keepPreviousData: true,
            staleTime: 5 * 60 * 1000, // 5분 캐시
        }
    );
};