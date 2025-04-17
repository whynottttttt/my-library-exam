import React from 'react';
import '../App.css';

// 로딩 스피너 컴포넌트
const LoadingSpinner = () => {
    return (
        <div className="loading-spinner-container">
            <div className="loading-spinner"></div>
        </div>
    );
};

export default LoadingSpinner;