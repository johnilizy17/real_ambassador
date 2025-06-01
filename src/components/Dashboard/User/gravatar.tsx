import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = {
	runtime: 'edge',
};

const padZero = (str: string, len = 2) => {
    const zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
}

/**
 * This function generates a random color in hexadecimal format.
 * @returns A string containing the hexadecimal code for the generated random color.
 */
const getRandomColor = () => {
	const letters = '0123456789ABCDEF';
	let color = '#';
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
};

/**
This function takes a color hex value and returns the opposite color. It also takes a boolean value,
which when set to true will return either white or black, depending on which color is closest to the given color.

Parameters

hex
 - a hexadecimal value representing a color
bw
 - a boolean value, which when set to true will return either white or black, depending on which color is closest to the given color
Return Value

A hexadecimal value representing the opposite color.

Example Usage
getOppositeColor('#FF0000', false); // will return '#00FFFF'
getOppositeColor('#FF0000', true); // will return '#FFFFFF'
 */

/**
 * This function takes a color hex value and returns the opposite color. It also takes a boolean value,
    which when set to true will return either white or black, depending on which color is closest to the given color.

 * @param hex a hexadecimal value representing a color
 * @param bw a boolean value, which when set to true will return either white or black, depending on which color is closest to the given color
Return Value
 * @returns A hexadecimal value representing the opposite color.
 */

const getOppositeColor = (hex: string, bw: boolean) => {
	if (hex.indexOf('#') === 0) {
		hex = hex.slice(1);
	}

	// convert 3-digit hex to 6-digits.
	if (hex.length === 3) {
		hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
	}
	if (hex.length !== 6) {
		throw new Error('Invalid HEX color.');
	}

	const r = parseInt(hex.slice(0, 2), 16),
		g = parseInt(hex.slice(2, 4), 16),
		b = parseInt(hex.slice(4, 6), 16);
        
	if (bw) {
		return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? '#000000' : '#FFFFFF';
	}

	// invert color components
	const r16 = (255 - r).toString(16);
	const g16 =  (255 - g).toString(16);
	const b16 =  (255 - b).toString(16);

	return '#' + padZero(r16) + padZero(g16) + padZero(b16);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function handler(req: NextRequest) {
	try {
		const { searchParams } = new URL(req.url);

		const hasTitle = searchParams.has('username');
		const title = hasTitle
			? searchParams.get('username')?.slice(0, 1).toUpperCase()
			: '@';

		const bgColor = getRandomColor();
		const textColor = getOppositeColor(bgColor, true);

		return new ImageResponse(
			(
				<div
					style={{
						fontSize: 40,
						fontWeight: 'bold',
						background: bgColor,
						color: textColor,
						width: '100%',
						height: '100%',
						display: 'flex',
						textAlign: 'center',
						alignItems: 'center',
						justifyContent: 'center',
						borderRadius: '50%',
					}}
				>
					{title}
				</div>
			),
			{
				width: 80,
				height: 80,
			}
		);
	} catch (e: any) {
		console.log(`${e.message}`);
		return new Response(`Failed to generate the image`, {
			status: 500,
		});
	}
} 