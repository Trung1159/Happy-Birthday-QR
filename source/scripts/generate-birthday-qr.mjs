import QRCode from 'qrcode';
import { fileURLToPath } from 'node:url';

// A direct URL: no expiring token, URL shortener, or QR subscription service.
const destination = 'https://trung1159.github.io/Happy-Birthday-QR/';
const options = {
  errorCorrectionLevel: 'H',
  margin: 4,
  scale: 32,
  color: { dark: '#000000FF', light: '#FFFFFFFF' },
};

for (const type of ['png', 'svg']) {
  const output = fileURLToPath(new URL(`../Happy Birthday QR - Static.${type}`, import.meta.url));
  await QRCode.toFile(output, destination, { ...options, type });
  console.log(`Created ${output}`);
}
console.log(`Encoded destination: ${destination}`);
