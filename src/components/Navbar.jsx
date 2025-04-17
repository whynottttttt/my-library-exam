import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const { isLoggedIn, logout } = useAuthStore();

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to={ROUTES.HOME} className="navbar-logo">
                    코딩알려주는 누나 도서관
                </Link>

                <div className="navbar-links">
                    <Link to={ROUTES.HOME} className="navbar-link">
                        메인
                    </Link>
                    <Link to={ROUTES.MY_BOOKS} className="navbar-link">
                        나의 책
                    </Link>
                    {isLoggedIn ? (
                        <span
                            className="navbar-link"
                            onClick={logout}
                            style={{ cursor: 'pointer' }}
                        >
                            로그아웃
                        </span>
                    ) : (
                        <Link to={ROUTES.LOGIN} className="navbar-link">
                            로그인
                        </Link>
                    )}
                </div>

                <HamburgerMenu />
            </div>
        </nav>
    );
};

export default Navbar;