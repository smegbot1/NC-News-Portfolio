import React from 'react';

export default function ErrDisplayer({ err }) {
    const msg = err ? err : 'Oops! Page not found...';

    return (
        <h5>
           ERROR: {msg}
        </h5>
    );
};