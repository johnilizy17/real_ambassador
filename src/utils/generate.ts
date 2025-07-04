export function generateUniqueChars(): string {
  const pool = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const result: string[] = [];

  while (result.length < 12) {
    const char = pool[Math.floor(Math.random() * pool.length)];
    if (!result.includes(char)) {
      result.push(char);
    }
  }

  return result.join('');
}

export async function generateSignature(requestRef: string, clientSecret: string): Promise<string> {
  const plainText = `${requestRef};${clientSecret}`;
  console.log('Plain Text:', plainText);

  // Use TextEncoder to convert to Uint8Array
  const encoder = new TextEncoder();
  const data = encoder.encode(plainText);

  // Use Web Crypto API to create MD5 hash
  const hashBuffer = await crypto.subtle.digest('MD5', data);

  // Convert the ArrayBuffer to hex string
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

  console.log('hash:', hashHex);
  return hashHex;
}
