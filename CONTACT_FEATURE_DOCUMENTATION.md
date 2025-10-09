# 📧 Dokumentasi Fitur Contact Me

## 🎯 Overview

Fitur Contact Me memungkinkan pengunjung portfolio untuk mengirim pesan langsung kepada pemilik portfolio melalui formulir kontak yang terintegrasi dengan sistem email notification.

## 🏗️ Arsitektur Sistem

### Backend Components

- **Model**: `Contact` - Menyimpan data pesan kontak
- **Controller**: `ContactController` - Menangani logika bisnis
- **Request**: `ContactRequest` - Validasi input form
- **Mail**: `ContactNotification` - Template email notification
- **Migration**: `create_contacts_table` - Struktur database

### Frontend Components

- **Component**: `ContactSection.tsx` - UI form kontak
- **Integration**: Inertia.js untuk komunikasi frontend-backend

## 📊 Database Schema

### Table: `contacts`

```sql
- id (bigint, primary key, auto increment)
- name (varchar 255, required)
- email (varchar 255, required)
- message (text, required)
- status (enum: 'new', 'read', 'replied', default: 'new')
- created_at (timestamp)
- updated_at (timestamp)
```

## 🔄 Alur Kerja (Workflow)

### 1. User Experience Flow

```
Pengunjung Portfolio → Scroll ke Contact Section → Isi Form → Submit →
Success Message → Email Notification ke Admin
```

### 2. Technical Flow

```
Frontend Form → Validation → ContactController → Database Storage →
Email Notification → Success Response → UI Feedback
```

## 📝 Detail Implementasi

### 1. Form Validation Rules

```php
'name' => 'required|string|max:255'
'email' => 'required|email|max:255'
'message' => 'required|string|max:2000'
```

### 2. Email Configuration

- **SMTP**: Gmail SMTP (sudah dikonfigurasi di .env)
- **Template**: HTML email dengan styling profesional
- **Content**: Detail pengirim, pesan, timestamp

### 3. Error Handling

- **Validation Errors**: Ditampilkan per field
- **System Errors**: Logged dan ditampilkan sebagai general error
- **Network Errors**: Graceful fallback dengan pesan user-friendly

## 🚀 Cara Menggunakan

### Untuk Pengunjung Portfolio

1. **Akses Contact Section**
    - Scroll ke bagian bawah portfolio
    - Atau klik link "Contact Me" di navigation

2. **Isi Formulir**
    - **Name**: Masukkan nama lengkap
    - **Email**: Masukkan email yang valid
    - **Message**: Tulis pesan (maksimal 2000 karakter)

3. **Submit Form**
    - Klik tombol "Send Message"
    - Tunggu konfirmasi sukses
    - Form akan otomatis ter-reset

4. **Konfirmasi**
    - Pesan sukses hijau akan muncul
    - Jika ada error, pesan error merah akan ditampilkan

### Untuk Admin (Pemilik Portfolio)

1. **Menerima Email Notification**
    - Email otomatis dikirim ke alamat yang dikonfigurasi di .env
    - Subject: "Pesan Baru dari Portfolio - [Nama Pengirim]"
    - Content: Detail lengkap pengirim dan pesan

2. **Melihat Pesan di Database** (Future Feature)
    - Akses admin panel
    - Lihat daftar semua pesan kontak
    - Filter berdasarkan status (new, read, replied)

## 🔧 Konfigurasi

### Environment Variables (.env)

```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your_email@gmail.com
MAIL_PASSWORD=your_app_password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=your_email@gmail.com
MAIL_FROM_NAME="${APP_NAME}"
```

### Routes

```php
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');
```

## 📱 Responsive Design

- **Desktop**: Form di sebelah kanan, info kontak di kiri
- **Mobile**: Form di bawah, info kontak di atas
- **Tablet**: Layout adaptif sesuai ukuran layar

## 🎨 UI/UX Features

### Visual Feedback

- **Loading State**: Tombol "Mengirim..." saat proses
- **Success State**: Pesan hijau dengan checkmark
- **Error State**: Pesan merah dengan error details
- **Validation**: Real-time validation dengan border merah

### Accessibility

- **Labels**: Semua input memiliki label yang jelas
- **ARIA**: Proper aria-labels untuk screen readers
- **Keyboard**: Full keyboard navigation support
- **Focus**: Clear focus indicators

## 🔒 Security Features

### Input Validation

- **Server-side**: Laravel validation rules
- **Client-side**: HTML5 validation
- **XSS Protection**: Automatic escaping
- **CSRF Protection**: Laravel CSRF tokens

### Data Protection

- **Email Sanitization**: Email format validation
- **Message Length**: Maksimal 2000 karakter
- **Rate Limiting**: (Future feature)

## 📈 Performance

### Optimization

- **Lazy Loading**: Form hanya load saat diperlukan
- **Minimal Dependencies**: Hanya Inertia.js untuk form handling
- **Efficient Queries**: Single database insert
- **Email Queue**: (Future feature untuk high volume)

## 🧪 Testing

### Manual Testing Checklist

- [ ] Form validation berfungsi
- [ ] Email notification terkirim
- [ ] Success message muncul
- [ ] Error handling bekerja
- [ ] Responsive design di semua device
- [ ] Accessibility features berfungsi

### Automated Testing (Future)

- Unit tests untuk ContactController
- Feature tests untuk form submission
- Email testing dengan Mail::fake()

## 🔮 Future Enhancements

### Phase 2 Features

1. **Admin Panel**
    - View all contact messages
    - Mark as read/replied
    - Export to CSV
    - Search and filter

2. **Advanced Features**
    - Auto-reply confirmation
    - Contact form analytics
    - Spam protection (reCAPTCHA)
    - File attachment support

3. **Integration**
    - CRM integration
    - Slack notifications
    - WhatsApp integration
    - Calendar booking

## 🐛 Troubleshooting

### Common Issues

1. **Email tidak terkirim**
    - Check SMTP configuration di .env
    - Verify Gmail App Password
    - Check Laravel logs

2. **Form tidak submit**
    - Check CSRF token
    - Verify route exists
    - Check browser console untuk errors

3. **Validation errors tidak muncul**
    - Check Inertia.js configuration
    - Verify error handling di controller
    - Check frontend error display logic

### Debug Commands

```bash
# Check email configuration
php artisan tinker
config('mail')

# Test email sending
php artisan tinker
Mail::raw('Test email', function($msg) { $msg->to('test@example.com')->subject('Test'); });

# Check database
php artisan tinker
App\Models\Contact::all()
```

## 📞 Support

Jika mengalami masalah dengan fitur Contact Me:

1. Check Laravel logs: `storage/logs/laravel.log`
2. Verify email configuration
3. Test dengan email yang berbeda
4. Check network connectivity

---

**Last Updated**: October 2025  
**Version**: 1.0.0  
**Author**: Portfolio Development Team
