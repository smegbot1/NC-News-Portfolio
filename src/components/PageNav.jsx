import React from 'react';

const PageNav = ({ page, handlePage, next, previous }) => {
    return <div>
        <button onClick={handlePage} value={previous} >Previous</button>
        {page}
        <button onClick={handlePage} value={next} >Next</button>
    </div>
};

export default PageNav;