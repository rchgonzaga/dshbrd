import React from 'react'

const hr = (props) => {
    return (
        <hr style={{
            border: 0,
            height: 0,
            borderTop: '1px solid rgba(0, 0, 0, 0.1)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.3)'
        }}/>
    )
}

export default hr