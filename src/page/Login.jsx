import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import { ROUTES } from '../utils/constants';
import LoadingSpinner from '../components/LoadingSpinner';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login, isLoggedIn, previousPath } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            navigate(previousPath || '/');
        }
    }, [isLoggedIn, navigate, previousPath]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!username.trim() || !password.trim()) {
            alert('아이디와 비밀번호를 입력해주세요.');
            return;
        }

        setIsLoading(true);


        setTimeout(() => {
            login({ username, id: Date.now() });
            setIsLoading(false);
            navigate(previousPath || ROUTES.HOME);
        }, 1000);
    };

    return (
        <div className="container">
            {isLoading && <LoadingSpinner />}

            <form className="login-form" onSubmit={handleSubmit}>
                <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>로그인</h2>

                <div className="form-group">
                    <label htmlFor="username" className="form-label">아이디</label>
                    <input
                        type="text"
                        id="username"
                        className="form-input"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password" className="form-label">비밀번호</label>
                    <input
                        type="password"
                        id="password"
                        className="form-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="login-button">
                    로그인
                </button>
            </form>
        </div>
    );
};

export default Login;