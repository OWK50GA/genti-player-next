import React from 'react';
import ContentLoader from 'react-content-loader';

const LoaderBox = () => (
    <div className='new-release__wrapper'>
        <ContentLoader
            width={200}
            height={200}
            className='new-release_img__container'
            viewBox="0 0 200 200"
            backgroundColor="#262626"
            foregroundColor="#3a3a3a"
        >
            <rect x="0" y="0" rx="5" ry="5" width="200" height="200" />
        </ContentLoader>
    </div>

);

export default LoaderBox;