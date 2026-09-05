# QR sinh nhật — liên kết trực tiếp

Trang đích: https://trung1159.github.io/Happy-Birthday-QR/

- `Happy Birthday QR - Static.png`: ảnh QR đen trắng để gửi hoặc in.
- `Happy Birthday QR - Static.svg`: QR vector, có thể phóng lớn để in mà không bị vỡ.
- Các file QR cũ được giữ nguyên.

QR này mã hóa trực tiếp đường dẫn GitHub Pages. Không dùng dịch vụ QR trung gian,
không có thời hạn hết hạn trong mã, không cần gia hạn QR.

Không thể bảo đảm một website hoạt động vĩnh viễn. Để QR tiếp tục dùng được, hãy
duy trì tài khoản `trung1159`, repository `Happy-Birthday-QR`, chế độ GitHub Pages
công khai và đường dẫn trên. QR chứa đường dẫn, không chứa toàn bộ landing page;
người quét cần kết nối Internet.

Bạn có thể thay lời chúc, nhạc hoặc ảnh trên trang mà không cần đổi QR, miễn là
giữ nguyên đường dẫn. Nếu đổi đường dẫn, mã QR tĩnh đã in sẽ không tự đổi theo.

Khi in, giữ nền trắng và khoảng trắng xung quanh mã; không chèn logo hay cắt sát
các ô vuông. Thử quét bản in trước khi gửi tặng.

Tạo lại đúng hai file này từ thư mục project:

```sh
node scripts/generate-birthday-qr.mjs
```
