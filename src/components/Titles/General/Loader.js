import React from 'react';
import ContentLoader from 'react-content-loader';

const LoaderBox = () => (
    <div className='popular-title__wrapper is-initial-select'>
        <ContentLoader
            width={140}
            height={140}
            className='popular-title_img__container position-relative'
            viewBox="0 0 140 140"
            backgroundColor="#262626"
            foregroundColor="#3a3a3a"
        >
            <rect x="0" y="0" rx="5" ry="5" width="140" height="140" />
        </ContentLoader>
    </div>

);

export default LoaderBox;