import React from 'react';

export default function DashboardIcon({ color, width, height }: SVGPropsDto) {

    return (
        <svg width={width ? width : "14"} height={height ? height : "19"} viewBox="0 0 14 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 17.1235V7.12354M7 17.1235V1.12354M1 17.1235V11.1235" stroke={color ? color : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}