import React from 'react';

export default function CancelIcon({ color, width, height }: SVGPropsDto) {

    return (
        <svg
            width={width ? width : '12'}
            height={height ? height : '12'}
            viewBox='0 0 12 12'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <path
                d='M10.1664 1.8335L1.83301 10.1668M1.83301 1.8335L10.1664 10.1668'
                stroke={color ? color : '#222D37'}
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    )
}