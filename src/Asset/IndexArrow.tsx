import React from 'react';

export default function IndexArrow({ color }: { color: string }) {

    return (
        <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M0 6.6665L6 0.666504L12 6.6665H0Z" fill={color} />
        </svg>
    )
}