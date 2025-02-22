# E-Commerce App

Bu proje, Next.js ile geliştirilmiş, admin paneli ve müşteri tarafını içeren tam kapsamlı bir e-ticaret platformudur.

## 🚀 Özellikler

### **Admin Paneli**
- **Authentication:** Clerk ile kimlik doğrulama (middleware ile e-posta & şifre yönetimi)
- **Gösterge Paneli:**
  - Satılan ürünlerin türlerine göre dağılım grafiği (Chart.js)
  - Aylara göre sipariş sayısı grafiği (Chart.js)
- **Kategoriler Yönetimi:**
  - Kategori ekleme, düzenleme, silme
  - Fotoğraf ekleme (Cloudinary entegrasyonu)
  - Ana sayfada gösterim için kategori seçme
- **Ürün Yönetimi:**
  - Ürün ekleme, düzenleme, silme
  - Fotoğraf ekleme (Cloudinary)
  - Stok durumu, fiyat, kategori belirleme
  - JSON formatında ek özellikler ekleme
  - Ana sayfa vitrin ürünlerini belirleme
- **Sipariş Yönetimi:**
  - Satın alınan ürünlerin listesini görüntüleme
  - Siparişleri arama ve filtreleme
  
### **Müşteri Paneli**
- **Giriş ve Kayıt:**
  - JWT authentication (Cookies tabanlı oturum yönetimi)
- **Ana Sayfa:**
  - Kategorilerin dinamik gösterimi (Carousel bileşeni - ShadCN)
  - Ana sayfa vitrin ürünleri
  - Çok satan ürünler bölümü (Gerçek sipariş verileri baz alınarak)
- **Ürünler & Kategoriler:**
  - Fiyat aralığına göre filtreleme
  - Grid yapısında ürün listesi
  - Ürün detay sayfasında yorum ekleme ve görüntüleme
- **Sepet & Ödeme:**
  - Sepete ekleme, kaldırma, toplam tutarı görüntüleme
  - Adres yönetimi (Kullanıcı hesabında eklenen adresler arasından seçim)
  - İyzico entegrasyonu ile ödeme işlemleri (Express.js API ile entegrasyon)
  - Sipariş durumu: Ödenmiş ve ödenmemiş sipariş ayrımı
- **Hesap Yönetimi:**
  - Profil bilgileri güncelleme (İsim, e-posta, meslek, telefon, eğitim durumu vb.)
  - Siparişlerimi görüntüleme ve takip etme

## 🛠 Kullanılan Teknolojiler

### **Frontend:**
- Next.js (App Router)
- Tailwind CSS
- ShadCN UI bileşenleri
- React Hook Form & Zod (Form yönetimi ve validasyon)
- Chart.js (Grafik gösterimi)
- Spline & Blender (3D logo sahnesi)

### **Backend:**
- Next.js API Routes
- Express.js (İyzico entegrasyonu için)
- PostgreSQL (Docker ile konteynerleştirilmiş veritabanı)
- Prisma ORM
- Clerk (Authentication)
- Cloudinary (Medya yönetimi)

## 🔧 Kurulum

1. **Projeyi klonlayın:**
   ```sh
   git clone https://github.com/fahrimert/ecommerceapp.git
   cd ecommerceapp
   ```
2. **Dependencyi yükleyin:**
   ```sh
   npm install
   ```
3. **Env değişkenlerini ayarlayın (.env dosyasını oluşturun):**
   ```sh
   DATABASE_URL=postgresql://username:password@localhost:5432/ecommerce
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```
4. **Veritabanını migrate edin:**
   ```sh
   npx prisma migrate dev
   ```
5. **Geliştirme ortamında çalıştırın:**
   ```sh
   npm run dev
   ```

---


