# n8n AI News Summary - Trợ Lý Tổng Hợp Tin Công Nghệ

Dự án này sử dụng n8n để tự động hóa việc tổng hợp tin tức công nghệ hàng ngày từ RSS feed của VNExpress, sau đó sử dụng AI (Google Gemini) để tóm tắt ngắn gọn và gửi thông báo tới Discord.

## Tính năng chính

- **Thu thập tin tức tự động**: Lấy các bài báo công nghệ mới nhất từ VNExpress RSS feed hàng ngày lúc 8:00 sáng.
- **Xử lý thông minh**: Giới hạn số lượng bài báo (tối đa 3 bài) để tóm tắt, tránh quá tải thông tin.
- **Tóm tắt bằng AI**: Sử dụng Google Gemini 2.5 Flash để tóm tắt nội dung bài báo thành 2 câu ngắn gọn.
- **Định dạng đẹp mắt**: Xuất dữ liệu theo định dạng Markdown sẵn sàng để copy/paste vào Discord.
- **Chạy trên Docker**: Triển khai dễ dàng và ổn định với Docker Compose.

## Công nghệ sử dụng

- **n8n**: Nền tảng tự động hóa quy trình (Workflow Automation).
- **Docker & Docker Compose**: Quản lý container và triển khai ứng dụng.
- **Google Gemini API**: Mô hình AI để tóm tắt tin tức.
- **RSS Feed**: Lấy dữ liệu từ VNExpress theo định dạng RSS.
- **Discord Webhooks**: Gửi thông báo tới Discord (tùy chọn).

## Cấu trúc thư mục

```text
.
├── docker-compose.yaml              # Cấu hình Docker để khởi chạy n8n
├── new-summary/
│   ├── ai-news-summary.json        # Workflow n8n đã được cấu hình sẵn
│   └── newSummaryREADME.md         # Tài liệu hướng dẫn sử dụng (file này)
└── docker-compose.yaml              # File cấu hình Docker chính
```

## Yêu cầu hệ thống

- Máy tính đã cài đặt Docker và Docker Compose.
- Một tài khoản Google Cloud với Google Gemini API được kích hoạt.
- API Key của Google Gemini.
- (Tùy chọn) Một kênh Discord và Webhook nếu muốn gửi thông báo.

## Hướng dẫn cài đặt

### 1. Khởi chạy n8n với Docker

Mở terminal tại thư mục gốc của dự án và chạy lệnh sau:

```bash
docker-compose up -d
```

n8n sẽ khởi chạy ngầm. Bạn có thể truy cập vào giao diện quản lý tại địa chỉ: **http://localhost:5678**.

### 2. Import Workflow vào n8n

1. Truy cập giao diện n8n (localhost:5678).
2. Tạo tài khoản admin (nếu là lần đầu sử dụng).
3. Tại menu bên trái, chọn **Workflows**.
4. Chọn nút **Add Workflow** (góc trên bên phải) → **Import from File**.
5. Tìm và chọn file **new-summary/ai-news-summary.json** trong thư mục dự án.
6. Nhấn **Import** để tải workflow vào.

### 3. Cấu hình Google Gemini API

1. Trong workflow vừa import, tìm đến node có tên **Message a model**.
2. Nhấp đúp vào node đó để mở bảng cấu hình.
3. Tại phần **Credentials**, chọn thêm một Google Gemini API mới hoặc chọn API hiện có nếu đã có.
4. Nhập API Key của Google Gemini vào.
5. Nhấn **Save** để lưu cấu hình.

### 4. Kích hoạt workflow (Tùy chọn)

Để chạy workflow tự động hàng ngày lúc 8:00 sáng:

1. Quay lại màn hình workflow chính.
2. Gạt thanh **Active** (góc trên bên phải) sang màu xanh để kích hoạt.
3. Workflow sẽ chạy tự động theo lịch đã cấu hình.

## Chi tiết Workflow

### Các Node trong Workflow:

1. **Schedule Trigger** (Bộ hẹn giờ)
   - Cấu hình: Chạy hàng ngày lúc 8:00 sáng (Múi giờ: Asia/Ho_Chi_Minh).
   - Mục đích: Kích hoạt workflow theo lịch.

2. **RSS Read** (Đọc RSS)
   - Nguồn: `https://vnexpress.net/rss/so-hoa.rss` (RSS tin công nghệ VNExpress).
   - Mục đích: Lấy danh sách các bài báo mới nhất.

3. **Limit** (Giới hạn số lượng)
   - Cấu hình: Giới hạn tối đa 3 bài báo.
   - Mục đích: Tránh dữ liệu quá lớn và giảm chi phí API.

4. **Aggregate** (Tổng hợp dữ liệu)
   - Mục đích: Gom gọn tất cả dữ liệu bài báo thành một object để gửi cho AI.

5. **Message a model** (Gửi thông điệp cho mô hình AI)
   - Mô hình: Google Gemini 2.5 Flash.
   - Nhiệm vụ: Tóm tắt nội dung bài báo thành 2 câu ngắn gọn theo định dạng Markdown.
   - Output: Dữ liệu tóm tắt được định dạng sẵn để copy vào Discord.

6. **Edit Fields** (Chỉnh sửa trường dữ liệu)
   - Mục đích: Trích xuất nội dung tóm tắt từ phản hồi của AI thành một trường riêng.

## Tùy chỉnh

### Thay đổi thời gian chạy

1. Mở node **Schedule Trigger**.
2. Thay đổi giá trị **Trigger at Hour** thành giờ mong muốn (0-23).
3. Chọn **Save** để lưu.

### Thay đổi nguồn RSS

1. Mở node **RSS Read**.
2. Thay đổi URL trong phần **URL** thành RSS feed khác.
3. Ví dụ: `https://vnexpress.net/rss/kinhdoanh.rss` (Tin kinh doanh).

### Thay đổi số lượng bài báo

1. Mở node **Limit**.
2. Thay đổi giá trị **Max Items** thành số lượng mong muốn.

### Tuỳ chỉnh prompt cho AI

1. Mở node **Message a model**.
2. Tìm đến phần **Messages** → chỉnh sửa nội dung prompt.
3. Bạn có thể thay đổi:
   - Yêu cầu tóm tắt (hiện tại: tối đa 2 câu).
   - Định dạng output (hiện tại: Markdown).
   - Ngôn ngữ tóm tắt (hiện tại: Tiếng Việt).

### Gửi kết quả tới Discord (Tùy chọn)

Để gửi bản tóm tắt thẳng vào Discord:

1. Thêm một node **Discord** mới.
2. Kết nối output từ node **Edit Fields** vào **Discord**.
3. Cấu hình Discord Webhook:
   - Lấy Webhook URL từ kênh Discord.
   - Nhập vào node **Discord**.
4. Lưu workflow và kích hoạt.

## Ví dụ Output

Workflow sẽ xuất dữ liệu tóm tắt theo định dạng sau:

```markdown
**BẢN TIN CÔNG NGHỆ SÁNG NAY**
-----------------------------------
**[Tiêu đề bài báo 1]**
> [Nội dung tóm tắt ngắn gọn 2 câu]

**[Tiêu đề bài báo 2]**
> [Nội dung tóm tắt ngắn gọn 2 câu]

**[Tiêu đề bài báo 3]**
> [Nội dung tóm tắt ngắn gọn 2 câu]
-----------------------------------
```

## Khắc phục sự cố

### Lỗi: "API Key không hợp lệ"
- Kiểm tra lại API Key của Google Gemini.
- Đảm bảo API Key còn hạn sử dụng và có quyền truy cập Gemini API.

### Lỗi: "RSS feed không trả về dữ liệu"
- Kiểm tra lại URL RSS feed có đúng hay không.
- Đảm bảo kết nối internet hoạt động bình thường.

### Workflow không chạy tự động
- Kiểm tra lại thanh **Active** có bật hay không (phải màu xanh).
- Kiểm tra múi giờ trong cấu hình **Schedule Trigger**.

## Tác giả

- Dự án phục vụ mục đích học tập và chia sẻ kiến thức về tự động hóa với n8n.

---

*Cập nhật lần cuối: Tháng 04 năm 2026*