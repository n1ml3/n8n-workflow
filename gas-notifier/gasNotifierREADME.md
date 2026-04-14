# n8n Daily Gas Price Notifier - NamLe Bot

Dự án này sử dụng n8n để tự động hóa việc theo dõi giá xăng dầu hàng ngày tại Việt Nam (nguồn Petrolimex) và gửi thông báo trực tiếp tới máy chủ Discord của bạn.

## Tính năng chính

- Tự động quét dữ liệu: Lấy dữ liệu giá xăng dầu thực tế từ webgia.com hàng ngày.
- Xử lý dữ liệu thông minh: Script JavaScript tự động làm sạch, loại bỏ các ký tự thừa và lọc chính xác loại xăng RON 95-III.
- Thông báo đa nền tảng: Tích hợp Discord Webhook để gửi thông báo định kỳ với định dạng đẹp mắt.
- Dễ dàng triển khai: Chạy hoàn toàn trên Docker, đảm bảo tính ổn định và dễ quản lý.

## Công nghệ sử dụng

- n8n: Nền tảng tự động hóa quy trình (Workflow Automation).
- Docker & Docker Compose: Quản lý container và triển khai ứng dụng.
- JavaScript (Node.js): Xử lý logic và lọc dữ liệu bên trong n8n.
- Discord Webhooks: Giao tiếp và gửi thông báo đến người dùng.

## Cấu trúc thư mục

```text
.
├── docker-compose.yaml      # Cấu hình Docker để khởi chạy n8n
├── workflows/
│   └── gasnotifier.json     # Workflow n8n đã được cấu hình sẵn
├── scripts/
│   └── data-parser.js       # Script JS tham khảo dùng trong node Code của n8n
└── README.md                # Tài liệu hướng dẫn sử dụng
```

## Yêu cầu hệ thống

- Máy tính đã cài đặt Docker và Docker Compose.
- Một kênh Discord và quyền tạo Webhook trong kênh đó.

## Hướng dẫn cài đặt

### 1. Khởi chạy n8n với Docker

Mở terminal tại thư mục gốc của dự án và chạy lệnh sau:

```bash
docker-compose up -d
```

n8n sẽ khởi chạy ngầm. Bạn có thể truy cập vào giao diện quản lý tại địa chỉ: http://localhost:5678.

### 2. Import Workflow vào n8n

1. Truy cập giao diện n8n (localhost:5678).
2. Tạo tài khoản admin (nếu là lần đầu sử dụng).
3. Tại menu bên trái, chọn Workflows.
4. Chọn nút Add Workflow (góc trên bên phải) -> Import from File.
5. Tìm và chọn file workflows/gasnotifier.json trong thư mục dự án.

### 3. Cấu hình Discord Webhook

1. Trong workflow vừa import, tìm đến node có tên là Discord.
2. Nhấp đúp vào node đó để mở bảng cấu hình.
3. Tại phần Authentication, chọn tạo một Discord Webhook API mới.
4. Dán Webhook URL mà bạn lấy từ Discord vào.
5. Nhấn Save và quay lại màn hình workflow.
6. Gạt thanh Active (góc trên bên phải) sang màu xanh để kích hoạt chạy tự động.

## Chi tiết Workflow

- Schedule Trigger: Được cấu hình để tự động chạy vào lúc 16:00 hàng ngày (Múi giờ Asia/Ho_Chi_Minh).
- HTTP Request: Gửi yêu cầu lấy dữ liệu từ: https://webgia.com/gia-xang-dau/petrolimex/.
- HTML Node: Trích xuất các bảng dữ liệu từ trang web.
- Code Node: Thực hiện logic JavaScript để:
    - Loại bỏ các loại tiền tệ không liên quan (USD, EUR...).
    - Làm sạch tên sản phẩm.
    - Tìm kiếm và trả về dữ liệu của loại xăng RON 95-III.
- Discord Node: Gửi thông báo với nội dung hiển thị loại xăng và giá niêm yết tương ứng.

## Tùy chỉnh

- Thay đổi thời gian: Mở node Schedule Trigger và thay đổi giờ trong phần Trigger at Hour.
- Thay đổi loại sản phẩm: Nếu bạn muốn theo dõi Dầu Diesel hoặc Xăng E5, hãy chỉnh sửa logic trong node Code (dựa trên file scripts/data-parser.js).

## Tác giả

- Tác giả: NamLe (n1ml3)
- Repo: [gas-notifier](https://github.com/n1ml3/gas-notifier)

---
*Dự án được tạo ra với mục đích học tập và chia sẻ kiến thức về tự động hóa.*
<img width="1763" height="844" alt="Image" src="https://github.com/user-attachments/assets/a52e3033-05d3-4fe5-b7d2-a1ff00e03329" />
<p></p>
<img width="1763" height="844" alt="Image" src="https://github.com/user-attachments/assets/e64d6d4c-1d94-430f-ad32-0e4c8bb199ca" />
