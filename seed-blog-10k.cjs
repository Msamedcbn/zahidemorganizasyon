// 10K gösterim planı: 10 uzun-kuyruk blog yazısı.
// Her yazı soru-odaklı başlık + h3 SSS içerir (sayfa otomatik FaqSchema üretir).
// Çalıştırma: DATABASE_URL production'a işaret ederken `node seed-blog-10k.cjs`
const { Pool } = require('pg');
const crypto = require('crypto');

if (!process.env.DATABASE_URL) {
  console.error('HATA: DATABASE_URL ortam değişkeni ayarlanmamış.');
  process.exit(1);
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const posts = [
  {
    title: "Evde Söz Organizasyonu Nasıl Yapılır? Adım Adım Rehber",
    slug: "evde-soz-organizasyonu-nasil-yapilir",
    excerpt: "Evde söz organizasyonu için eksiksiz rehber: masa düzeni, arka fon, ikram listesi, gün akışı ve fiyat aralıkları.",
    category: "Rehber",
    seoTitle: "Evde Söz Organizasyonu Nasıl Yapılır? Adım Adım Rehber 2026",
    seoDescription: "Evde söz organizasyonu nasıl yapılır? Masa düzeni, arka fon, ikram ve gün akışı adım adım. İstanbul'da evde söz kurulumu için ücretsiz keşif alın.",
    focusKeyword: "evde söz organizasyonu nasıl yapılır",
    tags: "söz organizasyonu, evde söz, nişan konsepti",
    content: `<p>Evde söz organizasyonu, son yıllarda salon törenlerinden çok daha popüler hale geldi. Hem samimi hem ekonomik olması, hem de ailenin kendi evinde rahat etmesi en büyük avantajı. Peki evde söz organizasyonu nasıl yapılır, nereden başlanır? 12 yıllık deneyimimizle adım adım anlatıyoruz.</p>
<h2>1. Misafir Sayısını ve Alanı Belirleyin</h2>
<p>Önce davetli sayısını netleştirin. 20-30 kişilik bir söz için salonun bir köşesi yeter; 50+ kişide tüm salon + koridor planlaması gerekir. Koltukların bir kısmını geçici olarak başka odaya taşımak alanı ciddi rahatlatır.</p>
<h2>2. Konsept ve Renk Seçin</h2>
<p>2026'da en çok istenen konseptler: beyaz-gold klasik, bej-bohem, yeşil-beyaz doğal ve pembe-beyaz romantik. Renk kararını erken verin; çiçek, fon perdesi ve masa örtüsü buna göre alınır. <a href="/hizmetler/soz-nisan-konsepti">Söz & nişan konseptlerimize</a> göz atabilirsiniz.</p>
<h2>3. Arka Fon ve Söz Masası</h2>
<p>Söz masası törenin kalbidir: yüzüklerin takıldığı, fotoğrafların çekildiği yer. Standart kurulumda fon perdesi, isimlik veya "Sözümüz Söz" yazısı, çiçek aranjmanı ve masa süslemesi olur. Pencere önü veya düz duvar en ideal fon alanıdır; ölçü almayı unutmayın.</p>
<h2>4. İkram Düzeni</h2>
<p>Sözde klasik ikram: kahve-çay, şerbet veya limonata, tuzlu-pastane çeşitleri ve çikolata. 30 kişi için 4-5 çeşit tuzlu, 2 çeşit tatlı yeterlidir. İkram masasını girişe yakın ama geçişi kapatmayacak yere kurun.</p>
<h2>5. Gün Akışı</h2>
<p>Kurulum tören saatinden en az 3 saat önce bitmeli. Klasik akış: karşılama ve kahve → isteme konuşması → yüzük takma ve dua → takı ve fotoğraf → ikram ve sohbet. Fotoğraf için gün ışığı bitmeden yüzük faslını planlayın.</p>
<h3>Evde söz organizasyonu kaç TL tutar?</h3>
<p>Fiyat konsept büyüklüğüne göre değişir; sade fon + masa kurulumu ile full konsept (fon, çiçek, masa sandalye, balon, ikram düzeni) arasında ciddi fark vardır. Telefonda ön fiyat, ücretsiz keşifte net fiyat veriyoruz: +90 531 663 29 30.</p>
<h3>Evde söz için kaç gün önceden rezervasyon gerekir?</h3>
<p>En az 2 hafta öneririz. Yaz sezonu ve hafta sonları hızlı dolar; son dakika işlerde müsaitliğe göre aynı hafta kurulum da yapıyoruz.</p>
<h3>Söz masasını kendim mi kursam profesyonel mi tutsam?</h3>
<p>Küçük bir aile arası sözde kendiniz kurabilirsiniz; ama 25+ kişilik törenlerde profesyonel kurulum günün stresini tamamen alır. Kurulum, söküm ve temizlik dahil olduğu için ev sahibi törenin tadını çıkarır.</p>`,
  },
  {
    title: "Söz Organizasyonu Fiyatları 2026: Neye Göre Değişir?",
    slug: "soz-organizasyonu-fiyatlari-2026",
    excerpt: "2026 söz organizasyonu fiyatlarını belirleyen 6 faktör: konsept, mekan, misafir sayısı, çiçek, masa sandalye ve ilçe.",
    category: "Fiyat",
    seoTitle: "Söz Organizasyonu Fiyatları 2026 | İstanbul Güncel Rehber",
    seoDescription: "2026 söz organizasyonu fiyatları neye göre değişir? Konsept, mekan ve misafir sayısına göre fiyat rehberi. Ücretsiz keşif ve net fiyat için arayın.",
    focusKeyword: "söz organizasyonu fiyatları",
    tags: "söz fiyatları, nişan fiyatları, 2026 fiyatlar",
    content: `<p>"Söz organizasyonu ne kadara mal olur?" bize en çok sorulan soru. Net rakam vermeden önce bilmeniz gereken: fiyat tek kalemden değil, 6 ayrı kalemin toplamından oluşur. Bu yazıda her kalemi ve tasarruf yollarını açıklıyoruz.</p>
<h2>1. Konsept Büyüklüğü</h2>
<p>En belirleyici faktör. Sade fon perdesi + masa süslemesi ile full konsept (fon, çiçek duvarı, balon, isimlik, ışıklandırma) arasında 3-4 kat fark olabilir. Bütçenizi söyleyin, ona göre konsept önerelim — en sık yaptığımız şey bu.</p>
<h2>2. Mekan: Ev mi Salon mu?</h2>
<p>Evde organizasyonda mekan kirası yoktur; salonda kira + salonun kural ve saat kısıtları eklenir. Ev, toplam bütçeyi ciddi düşürür.</p>
<h2>3. Misafir Sayısı ve Masa Sandalye</h2>
<p>Her 10 ek misafir yaklaşık 1 masa + 10 sandalye demektir. <a href="/hizmetler/masa-sandalye-kiralama">Masa sandalye kiralama</a> adetle fiyatlandığı için davetli listesi fiyatı doğrudan etkiler.</p>
<h2>4. Çiçek: Yapay mı Canlı mı?</h2>
<p>Canlı çiçek tek günlük törenlerde maliyeti katlar. <a href="/hizmetler/yapay-cicek-dekoru">Yapay çiçek dekoru</a> fotoğrafta ayırt edilemez, maliyeti ciddi düşürür ve kurulumu daha dayanıklıdır.</p>
<h2>5. İkram Kapsamı</h2>
<p>Ev yapımı ikram + profesyonel sunum düzeni en ekonomik formüldür. Full catering, fiyatın en hızlı yükselen kalemidir.</p>
<h2>6. İlçe ve Nakliye</h2>
<p>Merkezimize (Sultanbeyli) yakın ilçelerde nakliye maliyeti düşüktür; uzak ilçelerde tek seferlik nakliye eklenir. Keşfi kurulum günüyle birleştirerek bu maliyeti sıfırladığımız olur.</p>
<h3>Söz organizasyonu için ortalama bütçe nedir?</h3>
<p>Sade ev konsepti ile full salon konsepti arasında geniş bir aralık vardır. Net fiyat için konsept ve misafir sayınızı söyleyin, aynı gün ön fiyat verelim: +90 531 663 29 30.</p>
<h3>Fiyatı düşürmenin en etkili yolu nedir?</h3>
<p>Üçlü formül: ev mekanı + yapay çiçek + ev yapımı ikram. Bu üç karar toplam bütçeyi yarıya kadar düşürebilir, görsellikten neredeyse hiç kaybettirmez.</p>
<h3>Keşif ücreti alıyor musunuz?</h3>
<p>Hayır. İstanbul genelinde keşif ücretsizdir; keşifte ölçü alınır, konsept seçilir ve net fiyat verilir. Karar vermezseniz hiçbir ücret ödemezsiniz.</p>`,
  },
  {
    title: "Nişan Masası Süsleme Fikirleri: 2026'nın 7 Favori Konsepti",
    slug: "nisan-masasi-susleme-fikirleri",
    excerpt: "Nişan masası süsleme fikirleri: beyaz-gold klasik, bohem, yeşil-beyaz doğal ve daha fazlası. Fotoğraflı konsept rehberi.",
    category: "Fikirler",
    seoTitle: "Nişan Masası Süsleme Fikirleri 2026 | 7 Konsept",
    seoDescription: "Nişan masası süsleme fikirleri: 2026'nın en sevilen 7 konsepti, renk kombinasyonları ve bütçe ipuçları. İstanbul'da kurulum için teklif alın.",
    focusKeyword: "nişan masası süsleme",
    tags: "nişan konsepti, masa süsleme, söz masası",
    content: `<p>Nişan masası, törenin en çok fotoğraflanan köşesidir. Doğru konsept seçimi hem fotoğrafları güzelleştirir hem bütçeyi korur. İşte 2026'da en çok kurduğumuz 7 nişan masası konsepti.</p>
<h2>1. Beyaz-Gold Klasik</h2>
<p>Vazgeçilmez klasik: beyaz fon, gold detaylar, beyaz-gül çiçekler. Her eve uyar, fotoğrafta her zaman şık durur. En güvenli seçimdir.</p>
<h2>2. Bej-Bohem</h2>
<p>Pampas otu, hasır detaylar, krem tonları. Modern ve sıcak bir hava verir; gündüz törenlerde harika görünür.</p>
<h2>3. Yeşil-Beyaz Doğal</h2>
<p>Okaliptüs ve beyaz çiçek ağırlıklı, sade ama zarif. Az malzeme ile çok etki — bütçe dostu konseptlerin başında gelir.</p>
<h2>4. Pembe-Beyaz Romantik</h2>
<p>Özellikle genç çiftlerin favorisi. Pembe şakayık tonları ve tül detaylarla masalsı bir masa kurulur.</p>
<h2>5. Bordo-Gold Kış Konsepti</h2>
<p>Kış aylarındaki sözler için: bordo çiçekler, gold şamdanlar, sıcak ışık. Kapalı mekan törenlerde çok etkileyici.</p>
<h2>6. Minimalist Tek Renk</h2>
<p>Tek renk (ör. tamamen beyaz) + bol yeşillik. Az eşya, temiz çizgiler; küçük salonlarda alanı büyük gösterir.</p>
<h2>7. Kişiselleştirilmiş İsimlikli</h2>
<p>Çiftin isimlerinin yazdığı ışıklı isimlik + tarih detayı. Hangi renk seçilirse seçilsin masayı "size özel" yapar; fotoğraflarda imza etkisi yaratır.</p>
<h3>Nişan masası süslemede en çok ne unutuluyor?</h3>
<p>Işıklandırma. Gün ışığı biten akşam törenlerde fon ışıklandırması olmazsa fotoğraflar kararır. Mutlaka LED veya spot planlayın.</p>
<h3>Küçük salonda büyük masa olur mu?</h3>
<p>Olur ama oran önemli. Salonun en uzun duvarının üçte birini geçmeyen masa, alanı boğmaz. Keşifte ölçü alıp orantılı konsept öneriyoruz.</p>
<h3>Konsepti kendim seçebilir miyim?</h3>
<p>Tabii. Referans fotoğraflarla gelin, aynı konsepti evinize uyarlayalım. <a href="/hizmetler/soz-nisan-konsepti">Söz & nişan sayfamızda</a> kurulum detayları var.</p>`,
  },
  {
    title: "Doğum Günü Organizasyonu Fiyatları İstanbul 2026",
    slug: "dogum-gunu-organizasyonu-fiyatlari-istanbul",
    excerpt: "İstanbul'da doğum günü organizasyonu fiyatları: çocuk partisi, yetişkin konsept ve mekanlı kutlama bütçeleri.",
    category: "Fiyat",
    seoTitle: "Doğum Günü Organizasyonu Fiyatları İstanbul 2026",
    seoDescription: "İstanbul doğum günü organizasyonu fiyatları: çocuk partisi, yetişkin konsept ve balon süsleme bütçeleri. Ücretsiz keşif için hemen arayın.",
    focusKeyword: "doğum günü organizasyonu fiyatları",
    tags: "doğum günü, parti fiyatları, çocuk partisi",
    content: `<p>Doğum günü organizasyonu fiyatları; yaş grubuna, mekana ve konsept büyüklüğüne göre geniş aralıkta değişir. Bu rehberde İstanbul için güncel bütçe kalemlerini ve tasarruf yollarını bulacaksınız.</p>
<h2>Çocuk Doğum Günü Partisi</h2>
<p>En popüler kategori. Standart paket: tema fonu (ör. prenses, uzay, çizgi karakter), balon zinciri ve sütunlar, pasta masası düzeni, masa sandalye. Karakter lisanslı temalar maliyeti artırır; lisanssız renk-temaları (pembe-gold, mavi-beyaz) çok daha ekonomiktir.</p>
<h2>Yetişkin Doğum Günü Konsepti</h2>
<p>Yetişkin partilerde genelde daha sade ama şık konseptler istenir: rakam balon + arka fon, kokteyl masası düzeni, ışıklandırma. Mekan ev ise maliyet ciddi düşer; <a href="/hizmetler/kokteyl-organizasyonu">kokteyl düzeni</a> eklenirse ikram kalemi büyür.</p>
<h2>Balon Süslemenin Payı</h2>
<p>Balon, doğum günü bütçesinin en görünür kalemidir: giriş tagı, zincir, sütun ve rakam balonlar adetle fiyatlanır. <a href="/hizmetler/balon-aranjmani">Balon aranjmanı sayfamızda</a> modelleri görebilirsiniz. Az balon + iyi fon, çok balon + boş fondan her zaman daha şık durur.</p>
<h2>Mekan Seçimi</h2>
<p>Ev partisi en ekonomik; site sosyal tesisi orta; restoran kapatma en yüksek bütçelidir. 15 kişiye kadar ev, 30+ kişide sosyal tesis idealdir.</p>
<h3>Çocuk partisi için kaç gün önceden rezervasyon?</h3>
<p>2 hafta idealdir. Hafta sonu pastane ve palyaço gibi tedarikçiler erken dolar; dekorasyon tarafında biz aynı hafta da kurulum yapabiliyoruz.</p>
<h3>Evde doğum günü partisi mi dışarıda mı daha ucuz?</h3>
<p>Evde parti neredeyse her zaman daha ucuzdur: mekan kirası yok, ikramı kendiniz hazırlarsınız. Tek maliyet dekorasyon + masa düzeni olur.</p>
<h3>1 yaş doğum günü için özel konsept var mı?</h3>
<p>Evet, 1 yaş en çok konsept istediğimiz yaş grubudur: rakam balon, aylık fotoğraf panosu ve pastel tema standart pakettir. Aylık fotoğrafları önceden hazırlayın.</p>`,
  },
  {
    title: "Balon Süsleme Fiyatları İstanbul: Model Model Rehber",
    slug: "balon-susleme-fiyatlari-istanbul",
    excerpt: "Balon süsleme fiyatları: zincir, sütun, giriş tagı, rakam balon ve arka fon modellerine göre güncel rehber.",
    category: "Fiyat",
    seoTitle: "Balon Süsleme Fiyatları İstanbul 2026 | Model Rehberi",
    seoDescription: "İstanbul balon süsleme fiyatları: zincir, sütun, tag ve fon modelleri. Doğum günü, açılış ve söz için aynı hafta kurulum.",
    focusKeyword: "balon süsleme fiyatları",
    tags: "balon süsleme, balon zinciri, açılış süsleme",
    content: `<p>Balon süsleme, organizasyonun en hızlı etki yaratan kalemidir. Fiyatlar modele, balon adedine ve kurulum yerine göre değişir. İşte model model rehber.</p>
<h2>Balon Zinciri (Garland)</h2>
<p>En çok istenen model. Metre hesabı yapılır; 2-3 metrelik standart zincir masa arkası veya merdiven için yeter. Renk sayısı arttıkça işçilik ve fiyat artar — 2 renk en ekonomik şık sonuçtur.</p>
<h2>Giriş Tagı ve Sütunlar</h2>
<p>Mağaza açılışları ve doğum günlerinde girişe kurulan tag ve iki yan sütun, mekanın dikkat çekiciliğini katlar. Açılışlarda cadde görünürlüğü için özellikle etkilidir.</p>
<h2>Rakam ve Harf Balonlar</h2>
<p>Yaş ve isim balonları adetle fiyatlanır; folyo kalitesi önemlidir. Ucuz folyo 1 günde söner, kaliteli folyo 3-5 gün dayanır.</p>
<h2>Arka Fon + Balon Kombosu</h2>
<p>Fotoğraf köşesi için fon perdesi + balon çerçeve kombosu en şık sonuçtur. Sadece balondan fon yapmaktan daha ekonomik, fotoğrafta daha temiz durur.</p>
<h2>Açık Hava Dayanıklılığı</h2>
<p>Güneş ve rüzgar balonun ömrünü kısaltır. Açık hava kurulumlarda çift katman ve sabitleme gerekir; yazın öğle kurulumundan kaçının, akşam törenler için öğleden sonra kurulum idealdir.</p>
<h3>Balon süsleme ne kadar dayanır?</h3>
<p>İç mekanda 3-7 gün, açık havada 1-2 gün. Tören günü kurulum her zaman en taze sonucu verir.</p>
<h3>Kendim balon şişirsem olur mu?</h3>
<p>10-15 balon için olur; ama zincir ve tag işçiliği profesyonel el gerektirir. Dengesiz zincir fotoğrafta hemen belli olur.</p>
<h3>Aynı gün kurulum mümkün mü?</h3>
<p>Stok durumuna göre evet. Sabah arayıp akşam törenine kurulum yaptığımız çok olur: +90 531 663 29 30.</p>`,
  },
  {
    title: "Sünnet Düğünü Nasıl Yapılır? Eksiksiz Kontrol Listesi",
    slug: "sunnet-dugunu-nasil-yapilir",
    excerpt: "Sünnet düğünü planlama rehberi: taht, konvoy, mevlüt düzeni, eğlence ve gün akışı kontrol listesi.",
    category: "Rehber",
    seoTitle: "Sünnet Düğünü Nasıl Yapılır? Kontrol Listesi 2026",
    seoDescription: "Sünnet düğünü nasıl yapılır? Taht, konvoy, mevlüt ve eğlence dahil eksiksiz kontrol listesi. İstanbul'da sünnet organizasyonu için arayın.",
    focusKeyword: "sünnet düğünü nasıl yapılır",
    tags: "sünnet organizasyonu, sünnet tahtı, mevlüt",
    content: `<p>Sünnet düğünü, ailenin en kalabalık ve en duygusal organizasyonlarından biridir. İyi planlanmış bir sünnet; çocuğun eğlendiği, misafirin rahat ettiği, ailenin stres yaşamadığı törendir. İşte eksiksiz kontrol listesi.</p>
<h2>1. Tarih ve Mekan</h2>
<p>Yaz ayları ve hafta sonları ilk dolar. Mekan seçenekleri: ev bahçesi, site sosyal tesisi, düğün salonu veya kır bahçesi. 100+ davetlide salon, 50 kişiye kadar ev/tesis idealdir.</p>
<h2>2. Sünnet Tahtı ve Kostüm</h2>
<p>Taht törenin sembolüdür: klasik Osmanlı tahtı, modern tasarım veya karakterli konsept. Kostümle uyumlu renk seçin. Taht kurulumu ve ışıklandırması fotoğrafların %80'ini belirler.</p>
<h2>3. Konvoy Planı</h2>
<p>Konvoy güzergahını önceden belirleyin: ev → tur → mekan. Araç süslemesi, müzik ve güvenlik (çocukların araçtan sarkmaması) planlanmalı. Trafik saatlerini hesaba katın.</p>
<h2>4. Mevlüt Düzeni</h2>
<p>Mevlütlü sünnetlerde hoca, ses sistemi ve oturma düzeni (kadın-erkek ayrı veya karışık) önceden netleşmeli. Ses sistemi için elektrik ve alan kontrolü keşifte yapılır.</p>
<h2>5. İkram ve Eğlence</h2>
<p>Pilav-ayran klasik menüdür; kokteyl tarzı da tercih edilir. Çocuklar için palyaço, yüz boyama veya şişme oyun parkı; yetişkinler için canlı müzik veya DJ düşünün. <a href="/hizmetler/sunnet-organizasyonu">Sünnet organizasyonu sayfamızda</a> paket detayları var.</p>
<h2>6. Gün Akışı Örneği</h2>
<p>14:00 konvoy → 15:30 mekana varış ve karşılama → 16:00 mevlüt → 17:30 ikram → 18:30 eğlence ve taht fotoğrafları → 20:00 kapanış. Akışı yazılı hale getirip tüm görevlilerle paylaşın.</p>
<h3>Sünnet düğünü kaç kişiyle yapılır?</h3>
<p>Aile arası 30 kişiden 500 kişilik salon düğününe kadar her ölçek olur. Ortalama İstanbul sünneti 100-150 kişidir.</p>
<h3>Mevlüt ve eğlence aynı günde olur mu?</h3>
<p>Evet, en yaygın format budur: öğleden sonra mevlüt, akşam eğlence. İki bölüm arası ikram servisi geçişi yumuşatır.</p>
<h3>Sünnet tahtı kiralamak mı almak mı mantıklı?</h3>
<p>Tek günlük kullanımda kiralamak her zaman mantıklıdır: nakliye, kurulum ve söküm dahildir, evde depolama derdi olmaz.</p>`,
  },
  {
    title: "Mağaza Açılışı Nasıl Yapılır? Açılış Organizasyonu Rehberi",
    slug: "magaza-acilisi-nasil-yapilir",
    excerpt: "Mağaza açılış organizasyonu rehberi: balon süsleme, kokteyl, sunucu, davetli yönetimi ve açılış günü akışı.",
    category: "Rehber",
    seoTitle: "Mağaza Açılışı Nasıl Yapılır? Açılış Rehberi 2026",
    seoDescription: "Mağaza açılışı nasıl yapılır? Balon süsleme, kokteyl, kurdele kesimi ve davetli yönetimi. İstanbul'da kurumsal açılış için teklif alın.",
    focusKeyword: "mağaza açılışı nasıl yapılır",
    tags: "açılış organizasyonu, mağaza açılışı, kurumsal",
    content: `<p>İyi bir mağaza açılışı, ilk gün cirosunu ve mahalledeki bilinirliği doğrudan etkiler. Cadde trafiğini içeri çeviren açılışın formülü bellidir: görünürlük + ikram + program. İşte adım adım rehber.</p>
<h2>1. Görünürlük: Balon ve Yönlendirme</h2>
<p>Açılışın olmazsa olmazı giriş tagı ve balon sütunlardır; 50 metre öteden fark edilirsiniz. Kaldırım dubası, yönlendirme panosu ve müzik sesi caddeyi içeri taşır.</p>
<h2>2. Kurdele Kesim Töreni</h2>
<p>Saatini önceden duyurun (ör. 13:00). Protokol davetlisi varsa (muhtar, oda başkanı) saati onlara göre ayarlayın. Makas-kurdele seti ve fotoğrafçı hazır olmalı.</p>
<h2>3. Kokteyl ve İkram</h2>
<p>Açılış ikramı pratik olmalı: mini atıştırmalıklar, içecek standı, tek el yenebilen ürünler. <a href="/hizmetler/kokteyl-organizasyonu">Kokteyl düzenimiz</a> 50-500 kişiye ölçeklenir.</p>
<h2>4. Sunucu ve Müzik</h2>
<p>Sunucu açılış konuşmalarını yönetir, çekiliş ve kampanya duyurularını anons eder. Arka planda canlı müzik veya DJ cadde ilgisini canlı tutar.</p>
<h2>5. Davetli ve Tanıtım</h2>
<p>Esnaf komşular, muhtarlık, sosyal medya duyurusu ve açılışa özel indirim broşürü ilk gün trafiğini belirler. Açılış günü sosyal medya çekimi için fotoğraf köşesi kurun.</p>
<h3>Mağaza açılışı için belediyeden izin gerekir mi?</h3>
<p>Kaldırım işgali ve ses yayını için ilçe belediyesinden izin gerekebilir. Başvuruyu en az 1 hafta önceden yapın; süreçte yardımcı oluyoruz.</p>
<h3>Açılış organizasyonu kaç saat sürer?</h3>
<p>Standart program 3-4 saattir: kurdele kesimi + ikram + müzik. Kurulum sabah erken, söküm akşam yapılır; mağaza operasyonu aksamaz.</p>
<h3>Küçük dükkan için de organizasyon olur mu?</h3>
<p>Evet. Tek kapılı dükkanlarda mini paket (giriş balonu + ikram standı + müzik) yeterlidir ve maliyeti düşüktür.</p>`,
  },
  {
    title: "Masa Sandalye Kiralama Fiyatları İstanbul 2026",
    slug: "masa-sandalye-kiralama-fiyatlari",
    excerpt: "Masa sandalye kiralama fiyatları: modeller, adet hesabı, kurulum ve nakliye dahil güncel rehber.",
    category: "Fiyat",
    seoTitle: "Masa Sandalye Kiralama Fiyatları İstanbul 2026",
    seoDescription: "İstanbul masa sandalye kiralama fiyatları: model seçenekleri, adet hesabı ve kurulum detayları. Günlük kiralama için hemen arayın.",
    focusKeyword: "masa sandalye kiralama fiyatları",
    tags: "sandalye kiralama, masa kiralama, söz masası",
    content: `<p>Masa sandalye kiralama; söz, nişan, düğün, mevlüt ve açılışların görünmez kahramanıdır. Doğru adet ve model seçimi hem bütçeyi hem konforu belirler.</p>
<h2>Model Seçenekleri</h2>
<p>En çok kiralananlar: plastik Tiffany (şeffaf/şık), ahşap bahçe sandalyesi, kumaş kaplı klasik ve metal katlanır. Tiffany söz-nişanda, ahşap kır düğününde, katlanır mevlütte idealdir. Masa tarafında yuvarlak (8-10 kişilik) ve dikdörtgen (6 kişilik) seçenekler var.</p>
<h2>Adet Hesabı Nasıl Yapılır?</h2>
<p>Formül basit: davetli sayısı + %10 yedek. 100 kişilik törende 110 sandalye, 11-12 yuvarlak masa gerekir. Çocuklar için ayrı mini masa düşünün. <a href="/hizmetler/masa-sandalye-kiralama">Kiralama sayfamızda</a> modelleri görebilirsiniz.</p>
<h2>Fiyata Neler Dahil?</h2>
<p>Bizde fiyata nakliye, kurulum ve tören sonrası söküm dahildir. Masa örtüsü, sandalye giydirme ve süsleme ayrı kalemlerdir; konseptle birlikte alınırsa paket indirimi yapılır.</p>
<h2>Kaç Gün Önceden Rezervasyon?</h2>
<p>Standart adetlerde 1 hafta, 200+ adet ve düğün sezonunda (Mayıs-Eylül) 3 hafta önceden rezervasyon öneririz. Stok durumuna göre aynı hafta da karşılanabilir.</p>
<h3>Tek günlük kiralama mı olur?</h3>
<p>Evet, standart kiralama tek günlüktür: sabah kurulum, akşam/gece söküm. Ertesi güne sarkacaksa 2 günlük fiyat verilir.</p>
<h3>Nakliye ücreti ayrı mı?</h3>
<p>İlçeye göre değişir; yakın ilçelerde fiyata dahildir, uzak ilçelerde tek seferlik nakliye eklenir. Teklifte net yazılır, sürpriz çıkmaz.</p>
<h3>Kırık-kayıp durumunda ne olur?</h3>
<p>Normal kullanım yıpranması sorun değildir; kırılma-kayıpta rayiç bedel üzerinden uzlaşılır. Sözleşmede önceden yazar.</p>`,
  },
  {
    title: "Kız İsteme Merasiminde Ne Alınır? Çikolata, Çiçek ve Adetler",
    slug: "kiz-isteme-merasiminde-ne-alinir",
    excerpt: "Kız istemede ne alınır? Çikolata, çiçek seçimi, takı adeti ve isteme günü akışı rehberi.",
    category: "Rehber",
    seoTitle: "Kız İstemede Ne Alınır? Çikolata, Çiçek ve Adetler",
    seoDescription: "Kız isteme merasiminde ne alınır? Çikolata ve çiçek seçimi, takı adetleri ve gün akışı. Söz organizasyonu için ücretsiz keşif alın.",
    focusKeyword: "kız istemede ne alınır",
    tags: "kız isteme, söz adeti, isteme çikolatası",
    content: `<p>Kız isteme, söz töreninin ilk perdesidir ve adetleri merak edilir. Damat tarafının ne götüreceğinden o günkü sıraya kadar tüm detaylar bu rehberde.</p>
<h2>Çikolata ve Çiçek</h2>
<p>Klasik set: gösterişli kutuda çikolata + canlı buket çiçek. Çikolata kutusu sonradan evde sergilenir; bu yüzden kutu seçimi önemlidir. Çiçekte kırmızı gül klasik, beyaz-pembe karışık buket moderndir. Sözleşme değil ama beklenti: çikolata damat tarafındandır.</p>
<h2>Takı ve Yüzük</h2>
<p>İsteme günü genelde söz yüzükleri takılır; tam takı seti nişanda takılır. Aileler arası önceden konuşulması şart — sürpriz beklenti farkları gerginlik yaratır. Yüzük kurdelesini kimin keseceği (genelde gelinin babası veya aile büyüğü) önceden belirlenir.</p>
<h2>Kıyafet</h2>
<p>Gelin adayı abiye veya şık elbise, damat takım elbise. Aileler smart-casual ile şık arası. Fotoğraflar yıllarca saklanır; renk uyumuna dikkat edin.</p>
<h2>Gün Akışı</h2>
<p>Karşılama ve tanışma → kahve ikramı (tuzlu kahve adeti!) → isteme konuşması → yüzük ve dua → takı → fotoğraf → yemek/ikram. Toplam 2-3 saat sürer. Tuzlu kahve şakası için damadı önceden hazırlayın.</p>
<h3>İstemeye kaç kişi gidilir?</h3>
<p>Çekirdek aile + yakınlar, genelde 6-12 kişi. Kalabalık gidilecekse kız tarafına önceden haber verin; oturma düzeni buna göre yapılır.</p>
<h3>İsteme ile söz aynı gün olur mu?</h3>
<p>Evet, İstanbul'da en yaygın format budur: isteme faslı + söz konsepti aynı günde. <a href="/hizmetler/soz-nisan-konsepti">Söz konsepti kurulumumuz</a> isteme saatine yetişecek şekilde planlanır.</p>
<h3>Dini hassasiyetlerde nelere dikkat edilir?</h3>
<p>Dua faslı, hoca daveti ve haremlik-selamlık oturma gibi talepleri önceden bildirin; mekan ve akış planını buna göre kuruyoruz.</p>`,
  },
  {
    title: "Söz Mekanı Seçimi: Ev mi Salon mu? Karşılaştırma",
    slug: "soz-mekani-secimi-ev-mi-salon-mu",
    excerpt: "Söz mekanı seçimi rehberi: ev ve salonun maliyet, konfor ve atmosfer karşılaştırması.",
    category: "Rehber",
    seoTitle: "Söz Mekanı: Ev mi Salon mu? Karşılaştırma 2026",
    seoDescription: "Söz için ev mi salon mu? Maliyet, konfor ve atmosfer karşılaştırması. İstanbul'da evde söz kurulumu için ücretsiz keşif alın.",
    focusKeyword: "söz evde mi salonda mı",
    tags: "söz mekanı, evde söz, salon sözü",
    content: `<p>Çiftlerin ilk büyük kararı: söz evde mi olsun salonda mı? İki seçeneğin gerçek artı-eksi tablosu ve hangi durumda hangisinin mantıklı olduğu.</p>
<h2>Evde Söz: Artıları</h2>
<p>Mekan kirası yok, saat kısıtı yok, samimi atmosfer, kendi mutfağınız, dekorasyonda tam özgürlük. Toplam bütçe salonun neredeyse yarısına iner. Aile büyükleri ev ortamında daha rahat eder.</p>
<h2>Evde Söz: Eksileri</h2>
<p>Alan sınırlı (50+ kişi zorlanır), otopark sorunu, komşu hassasiyeti (ses), temizlik yükü. Asansörsüz binada malzeme taşıma zorlaşır — profesyonel ekip bu yükü alır.</p>
<h2>Salonda Söz: Artıları</h2>
<p>Geniş alan, hazır masa-sandalye, otopark, hava durumundan bağımsızlık, profesyonel mutfak. 100+ davetlide salon neredeyse zorunludur.</p>
<h2>Salonda Söz: Eksileri</h2>
<p>Kira + kişi başı menü maliyeti yüksektir; saat kısıtı (genelde 4-5 saat) ve salon kuralları (dışarıdan süsleme yasağı gibi) olabilir. Dekorasyon salonun iznine tabidir.</p>
<h2>Karar Tablosu</h2>
<p>30 kişiye kadar: ev açık ara mantıklı. 30-70 kişi: büyük ev veya site sosyal tesisi. 70+: salon. Bütçe kısıtlıysa ev + profesyonel kurulum, salon kirasından ucuza gelir ve daha şık durur.</p>
<h3>Site sosyal tesisi iyi bir orta yol mu?</h3>
<p>Evet. Düşük kira, geniş alan, ev konforuna yakınlık — 40-80 kişilik sözler için en akıllı seçenektir. Site yönetiminden izin ve saat onayı almayı unutmayın.</p>
<h3>Salonun süsleme yasağı varsa ne yapılır?</h3>
<p>Salonla önceden yazılı mutabakat yapın. Yasak varsa bağımsız fon (ayaklı sistem, duvara değmeyen) kuruyoruz; çoğu salon bunu kabul eder.</p>
<h3>Kararsızım, keşifte yardımcı olur musunuz?</h3>
<p>Evet. Evinizi görüp "buraya kaç kişi sığar, hangi konsept olur" raporu çıkarıyoruz. Keşif ücretsiz: +90 531 663 29 30.</p>`,
  },
];

async function main() {
  console.log(`Toplam ${posts.length} yazı işleniyor...`);
  for (const p of posts) {
    const id = "c" + crypto.randomBytes(12).toString("hex");
    await pool.query(
      `INSERT INTO "BlogPost" (id, title, slug, content, excerpt, category, author, published, "seoTitle", "seoDescription", "focusKeyword", tags, "createdAt", "updatedAt")
       VALUES ($1,$2,$3,$4,$5,$6,'Zahidem Organizasyon',true,$7,$8,$9,$10,NOW(),NOW())
       ON CONFLICT (slug) DO UPDATE SET title=EXCLUDED.title, content=EXCLUDED.content,
         excerpt=EXCLUDED.excerpt, category=EXCLUDED.category, published=true,
         "seoTitle"=EXCLUDED."seoTitle", "seoDescription"=EXCLUDED."seoDescription",
         "focusKeyword"=EXCLUDED."focusKeyword", tags=EXCLUDED.tags, "updatedAt"=NOW()`,
      [id, p.title, p.slug, p.content, p.excerpt, p.category, p.seoTitle, p.seoDescription, p.focusKeyword, p.tags]
    );
    console.log("OK:", p.slug);
  }
  await pool.end();
  console.log("Bitti.");
}

main().catch((e) => { console.error(e); process.exit(1); });
