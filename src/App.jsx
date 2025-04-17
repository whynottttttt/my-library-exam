import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Navbar from './components/Navbar';
import BookAll from './page/BookAll';
import MyBooks from './page/Mybooks';
import Login from './page/Login';
import { ROUTES } from './utils/constants';
import './App.css';


// 1. 모든 페이지는 로딩 시 로딩 스피너가 가운데에서 뜬다.
// 2. 유저는 메인페이지에서 도서목록들을 볼 수 있다.
// 3. 유저는 메인페이지에서 도서 검색을 할 수 있다.
// 4. 검색한 도서결과가 없으면 도서결과 없음 메세지를 볼 수 있다. (책 목록이 없습니다.)
// 5. 도서에 사진이 없으면 엑박 대신 기본 이미지가 나와야 한다.
// 6. 유저는 상단에 메뉴바 (사이트 로고, 메인, 나의책, 로그인)를 볼 수 있다.
// 7. 유저는 로그인 버튼을 누르면 로그인 페이지로 넘어간다.
// 8. 아이디 비밀번호를 입력하면 로그인이 된다. (바로 store에 저장)
// 9. 로그인 후 00님 환영합니다. 메세지를 메인페이지에서 볼 수 있다.
// 10. 로그인 후 이전에 있었던 페이지로 돌아간다. (나의 책 페이지에서 로그인 페이지로 들어가면 로그인 후에는 나의 책 페이지로 돌아가야 함)
// 11. 로그인 후 로그인 버튼이 로그아웃이 된다.
// 12. 로그아웃 버튼을 누르면 로그아웃이 되면서 버튼이 로그인으로 바뀐다.
// 13. 로그아웃하면 메인 페이지에서 환영 메세지가 사라진다.
// 14. 나의 책 리스트 페이지는 로그인을 한 유저만 들어갈 수 있다.
// 15. 나의 책 리스트에 좋아요를 누른 책이 없다면 아직 좋아요를 누른 책이 없습니다. 메세지가 뜬다.
// 16. 도서에 하트를 누르면 좋아요 표시가 된다.
// 17. 만약 유저가 로그인을 하지 않았다면 로그인 페이지로 간다.
// 18. 하트를 누른 후 나의 책 페이지로 가면 좋아요를 누른 도서 리스트를 볼 수 있다.
// 19. 도서에 하트를 빼면 나의 책 리스트에서도 빠진다.
// 20. 모바일 버전에서는 책이 두개씩 보인다.
// 21. 모바일 버전에서는 메뉴가 햄버거 메뉴로 숨겨진다.
// 22. 햄버거 메뉴를 누르면 메뉴가 나온다. (사이드바던 밑으로 나오던 상관 없음)
// 23. 모든 디자인은 코알누 도서관 사이트 디자인과 거의 일지해야한다.
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  const [isLoading, setIsLoading] = useState(true);

 
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        {isLoading && (
          <div className="loading-spinner-container">
            <div className="loading-spinner"></div>
          </div>
        )}

        <Navbar />

        <Routes>
          <Route path="/" element={<BookAll />} />
          <Route path={ROUTES.HOME} element={<BookAll />} />
          <Route path={ROUTES.MY_BOOKS} element={<MyBooks />} />
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;