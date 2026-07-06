-- 12 Hizmeti Veritabanına Ekle
-- Neon SQL Editor'da çalıştırın

INSERT INTO "Service" (id, title, slug, description, icon, image, "order", "isActive", "createdAt", "updatedAt")
VALUES
  ('svc-001', 'Doğum Günü Organizasyonu', 'dogum-gunu-organizasyonu', 'Her yaş için özel temalı doğum günü organizasyonları.', 'Cake', '/images/service-dogum-gunu.jpg', 0, true, NOW(), NOW()),
  ('svc-002', 'Mezuniyet', 'mezuniyet', 'Mezuniyet sevincinizi profesyonel bir organizasyonla taçlandırın.', 'Graduation', '/images/mezuniyet.jpg', 1, true, NOW(), NOW()),
  ('svc-003', 'Söz & Nişan Konsepti', 'soz-nisan-konsepti', 'En özel anınızı unutulmaz kılacak profesyonel söz ve nişan organizasyonu.', 'Ring', '/images/service-soz.jpg', 2, true, NOW(), NOW()),
  ('svc-004', 'Sevgililer Günü', 'sevgililer-gunu', 'Sevdiklerinize unutulmaz bir Sevgililer Günü sürprizi.', 'Heart', '/images/service-dugun.jpg', 3, true, NOW(), NOW()),
  ('svc-005', 'Açılış Organizasyonu', 'acilis-organizasyonu', 'İşletmeniz için etkileyici açılış ve lansman organizasyonları.', 'Store', '/images/acilis.jpg', 4, true, NOW(), NOW()),
  ('svc-006', 'Masa Sandalye Kiralama', 'masa-sandalye-kiralama', 'Her tür etkinlik için şık ve kaliteli masa sandalye kiralama hizmeti.', 'Armchair', '/images/sandalye.jpg', 5, true, NOW(), NOW()),
  ('svc-007', 'Kokteyl Organizasyonu', 'kokteyl-organizasyonu', 'Davetlerinize şıklık katan profesyonel kokteyl organizasyon hizmeti.', 'Glass', '/images/kokteyl.jpg', 6, true, NOW(), NOW()),
  ('svc-008', 'Yapay Ağaç Dekoru', 'yapay-agac-dekoru', 'Mekanlarınıza doğal görünüm katan yapay ağaç dekorasyonları.', 'Stars', '/images/sunnet.jpg', 7, true, NOW(), NOW()),
  ('svc-009', 'Yapay Çiçek Dekoru', 'yapay-cicek-dekoru', 'Bakım gerektirmeyen yapay çiçek aranjmanları ile kalıcı güzellik.', 'Celebration', '/images/service-nisan.jpg', 8, true, NOW(), NOW()),
  ('svc-010', 'Piknik Organizasyonu', 'piknik-organizasyonu', 'Açık havada unutulmaz piknik organizasyonları.', 'Flag', '/images/asker.jpg', 9, true, NOW(), NOW()),
  ('svc-011', 'Sünnet Organizasyonu', 'sunnet-organizasyonu', 'Geleneksel ve modern çizgide unutulmaz sünnet töreni organizasyonu.', 'Stars', '/images/sunnet.jpg', 10, true, NOW(), NOW()),
  ('svc-012', 'Balon Aranjmanı', 'balon-aranjmani', 'Yaratıcı ve göz alıcı balon aranjman tasarımları.', 'Bubble', '/images/balon.jpg', 11, true, NOW(), NOW());
