# Happy Birthday QR

Landing page sinh nhật tiếng Việt với phong thư tương tác, sáu đoạn lời chúc,
hiệu ứng chuyển chữ, nền hoa hồng và nhạc. Người nhận mở trang trực tiếp, không cần
đăng nhập.

**Trang đang dùng:** https://trung1159.github.io/Happy-Birthday-QR/

## Mã QR

- [QR PNG](Happy%20Birthday%20QR%20-%20Static.png): ảnh 1568 × 1568 để gửi hoặc in.
- [QR SVG](Happy%20Birthday%20QR%20-%20Static.svg): bản vector có thể phóng lớn.
- [Hướng dẫn duy trì QR](QR-README.md).

QR mã hóa trực tiếp đường dẫn GitHub Pages, không qua dịch vụ rút gọn link hay
thuê bao QR. Mã không có hạn dùng; website và địa chỉ trên cần được duy trì.

## Cấu trúc repository

```text
index.html                  Trang tĩnh được GitHub Pages phục vụ
bgm.mp3                     Nhạc nền của project
love-birthday-background.png Background love
og.png                      Ảnh chia sẻ
Happy Birthday QR - Static.* QR mới
source/
  app/                      Phiên bản React của landing page
  components/               Các thành phần giao diện
  public/                   Tài nguyên của phiên bản React
  scripts/                  Script tạo QR
  package.json              Thư viện và lệnh chạy
  package-lock.json         Phiên bản thư viện đã khóa
  .openai/hosting.json       Cấu hình được vite.config.ts tham chiếu
```

## Chạy bản tĩnh

Trong thư mục repository, chạy:

```sh
python3 -m http.server 8080
```

Mở http://localhost:8080. Bản tĩnh dùng các đường dẫn tài nguyên tương đối để hoạt
động trong thư mục `/Happy-Birthday-QR/` trên GitHub Pages.

## Chạy mã nguồn React

Cần Node.js từ 22.13.0 và npm.

```sh
cd source
npm ci
npm run dev
```

Tạo bản build bằng `npm run build`. Phiên bản này dùng Vinext/Vite và xuất Worker;
không tải thư mục `dist/server` trực tiếp lên GitHub Pages. Trang GitHub Pages
hiện sử dụng `index.html` ở gốc repository.

## Chỉnh lời chúc và nhạc

- Sửa mảng `wishes` trong `index.html` cho trang GitHub Pages.
- Sửa cùng nội dung trong `source/app/page.tsx` nếu cần giữ hai phiên bản đồng bộ.
- Mỗi đoạn tự chuyển sau 14 giây. Có nút dừng/tiếp tục; chọn đoạn thủ công sẽ dừng
  việc tự chuyển. Nút “Xem lại lời chúc” bắt đầu lại từ đầu.
- Nhạc bắt đầu sau khi mở thiệp. File là `bgm.mp3` cho bản tĩnh và
  `source/public/bgm.mp3` cho bản React.

Tạo lại QR với cùng địa chỉ:

```sh
cd source
node scripts/generate-birthday-qr.mjs
```

Hai file QR mới được ghi vào `source/`. Khi cần thay bản tải xuống ở gốc repository,
chép hai file `Happy Birthday QR - Static.png` và `.svg` ra gốc trước khi commit.

## Cập nhật GitHub Pages

Giữ cấu hình Pages hiện tại: nhánh `main`, thư mục `/ (root)`. Commit và push
`index.html` cùng tài nguyên để cập nhật trang. Không đổi tên tài khoản, repository
hay địa chỉ trang nếu muốn giữ mã QR đã gửi/in.

Repository gồm mã nguồn và tài nguyên cần thiết; thư viện đã cài, cache, file môi
trường và bản ZIP xuất tạm được loại bằng `.gitignore`.
