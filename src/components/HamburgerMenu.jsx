import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../utils/constants';
import useAuthStore from '../store/useAuthStore';

const HamburgerMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { isLoggedIn, logout } = useAuthStore();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        logout();
        setIsOpen(false);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <>
            <div className="hamburger-menu" onClick={toggleMenu}>
                <div className="hamburger-line"></div>
                <div className="hamburger-line"></div>
                <div className="hamburger-line"></div>
            </div>

            {isOpen && (
                <div className="mobile-menu">
                    <Link
                        to={ROUTES.HOME}
                        className="mobile-menu-link"
                        onClick={closeMenu}
                    >
                        메인
                    </Link>
                    <Link
                        to={ROUTES.MY_BOOKS}
                        className="mobile-menu-link"
                        onClick={closeMenu}
                    >
                        나의 책
                    </Link>
                    {isLoggedIn ? (
                        <div
                            className="mobile-menu-link"
                            onClick={handleLogout}
                            style={{ cursor: 'pointer' }}
                        >
                            로그아웃
                        </div>
                    ) : (
                        <Link
                            to={ROUTES.LOGIN}
                            className="mobile-menu-link"
                            onClick={closeMenu}
                        >
                            로그인
                        </Link>
                    )}
                </div>
            )}
        </>
    );
};

export default HamburgerMenu;