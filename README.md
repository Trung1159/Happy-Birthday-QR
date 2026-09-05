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
index.html                      Trang tĩnh được GitHub Pages phục vụ
favicon.svg                     Favicon trình duyệt
bgm.mp3                         Nhạc nền "Ngày Hạnh Phúc"
love-birthday-background.png    Ảnh nền hoa hồng
og.png                          Ảnh xem trước khi chia sẻ link
Happy Birthday QR - Static.*    Mã QR tĩnh đen trắng (PNG + SVG)
Happy Birthday QR.*             Mã QR thiết kế đồng bộ màu hoa hồng (PNG + SVG)
QR-README.md                    Hướng dẫn sử dụng và bảo toàn mã QR
```

## Chạy thử nghiệm local

Trong thư mục repository, chạy:

```sh
python3 -m http.server 8080
```

Mở http://localhost:8080 để kiểm tra giao diện và âm nhạc.

## Chỉnh lời chúc và nhạc

- Lời chúc được cấu hình trực tiếp trong mảng `wishes` của `index.html`.
- Thời gian chuyển mỗi câu chúc (~7.5 giây) được đồng bộ nhịp nhàng theo tiết tấu âm nhạc (4 khuông nhạc).
- Nhạc nền sẽ tự động phát ngay khi người nhận bấm nút mở thiệp.
- Để đổi nhạc, chỉ cần thay file `bgm.mp3` bằng file âm thanh mới cùng tên.

## Cập nhật GitHub Pages

Giữ cấu hình Pages hiện tại: nhánh `main`, thư mục `/ (root)`. Commit và push
`index.html` cùng tài nguyên để cập nhật trang. Không đổi tên tài khoản, repository
hay địa chỉ trang nếu muốn giữ mã QR đã gửi/in.

Repository gồm mã nguồn và tài nguyên cần thiết; thư viện đã cài, cache, file môi
trường và bản ZIP xuất tạm được loại bằng `.gitignore`.
