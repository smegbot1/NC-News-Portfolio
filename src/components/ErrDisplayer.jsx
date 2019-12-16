import React from 'react';

const ErrDisplayer = ({ err }) => {
    const msg = err ? err : 'Oops! Page not found...';

    return (
        <h5>
           ERROR: {msg}
        </h5>
    );
};

export default ErrDisplayer;