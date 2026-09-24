// 18 indekslenebilir ilçe için elle yazılmış benzersiz içerik.
// Amaç: hizmet×ilçe sayfalarını şablon-duplike olmaktan çıkarıp
// her birine gerçek lokal sinyal (mahalle, mekan tipi, mesafe) vermek.

export interface DistrictInfo {
  blurb: string;
  neighborhoods: string[];
  venueNote: string;
  accessNote: string;
}

export const districtInfo: Record<string, DistrictInfo> = {
  "Sultanbeyli": {
    blurb:
      "Merkezimiz Sultanbeyli'de. Abdurrahmangazi'deki depomuzdan aynı gün kurulum yapıyoruz; evde söz, doğum günü ve sünnet işlerinin çoğunu burada kuruyoruz.",
    neighborhoods: ["Abdurrahmangazi", "Mehmet Akif", "Turgut Reis", "Battalgazi"],
    venueNote:
      "Apartman daireleri ve müstakil evlerde salon kurulumu, site sosyal tesislerinde doğum günü ve sünnet organizasyonu ağırlıklı.",
    accessNote: "Merkez ilçe — keşif ve kurulum aynı gün yapılabilir.",
  },
  "Pendik": {
    blurb:
      "Sultanbeyli'ye komşu Pendik, en yoğun çalıştığımız ilçelerden. Kurtköy ve Yenişehir'deki sitelerde hafta sonu kurulumlarımız düzenli.",
    neighborhoods: ["Kurtköy", "Yenişehir", "Kaynarca", "Pendik Merkez"],
    venueNote:
      "Site sosyal tesisleri, sahil bandındaki restoranlar ve müstakil ev bahçelerinde kurulum yapıyoruz.",
    accessNote: "Komşu ilçe — keşif ücretsiz, kurulum günü ek nakliye ücreti yok.",
  },
  "Kartal": {
    blurb:
      "Kartal'da Soğanlık ve Yakacık tarafında evde söz konseptleri, sahil tarafında restoran üstü organizasyonlar kuruyoruz.",
    neighborhoods: ["Soğanlık", "Yakacık", "Uğur Mumcu", "Kartal Merkez"],
    venueNote:
      "Ev salonları, apartman teras katları ve sahildeki davet mekanlarında çalışıyoruz.",
    accessNote: "Anadolu yakası merkezi — keşif ve kurulum aynı hafta içinde.",
  },
  "Maltepe": {
    blurb:
      "Maltepe'de Küçükyalı ve İdealtepe'deki dairelerde evde nişan, sahil parkı çevresinde doğum günü işleri yapıyoruz.",
    neighborhoods: ["Küçükyalı", "İdealtepe", "Zümrütevler", "Maltepe Merkez"],
    venueNote:
      "Apartman daireleri, site bahçeleri ve sahil bandı mekanlarında kurulum deneyimimiz yüksek.",
    accessNote: "Merkeze yakın — hafta içi keşif, hafta sonu kurulum planlanabilir.",
  },
  "Tuzla": {
    blurb:
      "Tuzla'da Postane ve Aydınlı taraflarında müstakil ev ve yazlık bahçelerde söz, sünnet ve piknik organizasyonları kuruyoruz.",
    neighborhoods: ["Postane", "Aydınlı", "İçmeler", "Şifa"],
    venueNote:
      "Müstakil ev bahçeleri, yazlık siteler ve sahil tesislerinde açık hava konseptleri ağırlıklı.",
    accessNote: "Uç ilçe — keşfi kurulum günüyle birleştirip tek seferde çözüyoruz.",
  },
  "Küçükçekmece": {
    blurb:
      "Avrupa yakasında en sık gittiğimiz ilçelerden biri. Atakent ve Halkalı'daki sitelerde doğum günü ve söz kurulumlarımız düzenli.",
    neighborhoods: ["Atakent", "Halkalı", "Kanarya", "Sefaköy"],
    venueNote:
      "Site sosyal tesisleri, göl çevresi mekanlar ve apartman dairelerinde kurulum yapıyoruz.",
    accessNote: "Avrupa yakası program günlerimizde keşif + kurulum birleştirilir.",
  },
  "Kadıköy": {
    blurb:
      "Kadıköy'de Moda ve Caddebostan'da butik ev organizasyonları, Koşuyolu tarafında doğum günü konseptleri kuruyoruz.",
    neighborhoods: ["Moda", "Caddebostan", "Koşuyolu", "Fenerbahçe"],
    venueNote:
      "Tarihi apartman daireleri, teras katlar ve kafe-restoran üstü davet alanlarında butik kurulumlar.",
    accessNote: "Otopark ve bina erişimi için ön keşif öneriyoruz — keşif ücretsiz.",
  },
  "Üsküdar": {
    blurb:
      "Üsküdar'da Kuzguncuk ve Çengelköy'ün tarihi evlerinde söz konseptleri, merkez mahallelerde doğum günü işleri yapıyoruz.",
    neighborhoods: ["Kuzguncuk", "Çengelköy", "Beylerbeyi", "Üsküdar Merkez"],
    venueNote:
      "Boğaz hattı evleri, tarihi konaklar ve apartman dairelerinde özenli kurulum.",
    accessNote: "Boğaz trafiğini hesaba katarak kurulum saatini erken planlıyoruz.",
  },
  "Ataşehir": {
    blurb:
      "Ataşehir'deki rezidans ve sitelerde evde söz, doğum günü ve açılış organizasyonları kuruyoruz. Site yönetim izni süreçlerini biliyoruz.",
    neighborhoods: ["Atatürk Mahallesi", "Örnek", "Esatpaşa", "Küçükbakkalköy"],
    venueNote:
      "Rezidans daireleri, site sosyal tesisleri ve plaza katlarındaki açılış-davet alanları.",
    accessNote: "Site izin prosedürü için 1 hafta önceden haberleşme yeterli.",
  },
  "Ümraniye": {
    blurb:
      "Ümraniye'de Atakent ve Çakmak taraflarında evde nişan ve sünnet, Dudullu tarafında açılış organizasyonları kuruyoruz.",
    neighborhoods: ["Atakent", "Çakmak", "Tepeüstü", "Dudullu"],
    venueNote:
      "Apartman daireleri, dükkan-mağaza açılışları ve site tesislerinde çalışıyoruz.",
    accessNote: "Anadolu yakası içi — keşif ve kurulum esnek planlanır.",
  },
  "Çekmeköy": {
    blurb:
      "Çekmeköy'de Taşdelen ve merkez mahallelerde müstakil ev ve villa bahçelerinde söz, sünnet ve piknik organizasyonları kuruyoruz.",
    neighborhoods: ["Taşdelen", "Hamidiye", "Mehmet Akif", "Çekmeköy Merkez"],
    venueNote:
      "Villa bahçeleri, müstakil evler ve orman çevresi kır mekanlarında açık hava konseptleri.",
    accessNote: "Komşu ilçe — keşif ücretsiz, bahçe ölçümü keşifte yapılır.",
  },
  "Sancaktepe": {
    blurb:
      "Sancaktepe'de Sarıgazi ve Yenidoğan'da evde söz konseptleri, Samandıra tarafında sünnet ve doğum günü işleri yapıyoruz.",
    neighborhoods: ["Sarıgazi", "Yenidoğan", "Samandıra", "Veysel Karani"],
    venueNote:
      "Apartman daireleri, site bahçeleri ve düğün salonlarıyla koordineli kurulum.",
    accessNote: "Merkeze yakın — aynı gün keşif mümkün.",
  },
  "Bahçelievler": {
    blurb:
      "Bahçelievler'de Şirinevler ve Yenibosna'da evde nişan, merkez mahallelerde mağaza açılışları kuruyoruz.",
    neighborhoods: ["Şirinevler", "Yenibosna", "Kocasinan", "Bahçelievler Merkez"],
    venueNote:
      "Apartman daireleri, cadde üstü mağazalar ve site tesislerinde kurulum.",
    accessNote: "Avrupa yakası program günlerimizde keşif + kurulum birleştirilir.",
  },
  "Bağcılar": {
    blurb:
      "Bağcılar'da Güneşli ve Mahmutbey'de evde söz ve sünnet organizasyonları, tekstil bölgesinde açılış işleri yapıyoruz.",
    neighborhoods: ["Güneşli", "Mahmutbey", "Kirazlı", "Bağcılar Merkez"],
    venueNote:
      "Apartman daireleri, iş hanı-mağaza açılışları ve dernek salonlarında kurulum.",
    accessNote: "Avrupa yakası program günlerimizde keşif + kurulum birleştirilir.",
  },
  "Esenyurt": {
    blurb:
      "Esenyurt'ta Esenkent ve Cumhuriyet mahallelerindeki sitelerde doğum günü ve söz organizasyonları kuruyoruz.",
    neighborhoods: ["Esenkent", "Cumhuriyet", "Mehterçeşme", "Esenyurt Merkez"],
    venueNote:
      "Yüksek katlı site daireleri, sosyal tesisler ve cadde mağazalarında çalışıyoruz.",
    accessNote: "Uzak Avrupa yakası — keşfi görüntülü ön keşifle hızlandırıyoruz.",
  },
  "Beylikdüzü": {
    blurb:
      "Beylikdüzü'nde Adnan Kahveci ve Barış mahallelerinde site konseptleri, sahil tarafında açılış ve davet işleri kuruyoruz.",
    neighborhoods: ["Adnan Kahveci", "Barış", "Yakuplu", "Gürpınar"],
    venueNote:
      "Site sosyal tesisleri, sahil mekanları ve AVM çevresi mağaza açılışları.",
    accessNote: "Uzak Avrupa yakası — keşfi görüntülü ön keşifle hızlandırıyoruz.",
  },
  "Başakşehir": {
    blurb:
      "Başakşehir'de Kayaşehir ve Başak mahallelerinde villa ve site bahçelerinde söz, sünnet ve doğum günü organizasyonları kuruyoruz.",
    neighborhoods: ["Kayaşehir", "Başak", "Kayabaşı", "Bahçeşehir"],
    venueNote:
      "Villa bahçeleri, site sosyal tesisleri ve yeni yaşam alanlarındaki davet mekanları.",
    accessNote: "Avrupa yakası program günlerimizde keşif + kurulum birleştirilir.",
  },
  "Şile": {
    blurb:
      "Şile'de merkez ve Ağva yolundaki kır bahçeleri, otel ve restoranlarda yaz sezonu söz, düğün ve piknik organizasyonları kuruyoruz.",
    neighborhoods: ["Balibey", "Çavuş", "Ağva", "Şile Merkez"],
    venueNote:
      "Kır bahçeleri, sahil otelleri ve köy evi bahçelerinde açık hava konseptleri ağırlıklı.",
    accessNote: "Sezonda (Mayıs–Eylül) en az 3 hafta önceden rezervasyon öneririz.",
  },
};

export function getDistrictInfo(district: string): DistrictInfo | null {
  return districtInfo[district] ?? null;
}

// Hizmet×ilçe sayfasına özel 3 SSS — ilçe adı + hizmet adı her soruda geçer,
// FaqSchema ile zengin sonuç üretir.
export function ilceFaqs(district: string, serviceTitle: string): { question: string; answer: string }[] {
  const st = serviceTitle.toLocaleLowerCase("tr");
  const info = getDistrictInfo(district);
  const mahalle = info ? `${info.neighborhoods.slice(0, 2).join(" ve ")} başta olmak üzere ` : "";
  return [
    {
      question: `${district}'de ${st} fiyatı ne kadar?`,
      answer: `${district}'de ${st} fiyatı konsept büyüklüğüne ve mekana göre değişir. ${mahalle}${district} genelinde ücretsiz keşif yapıyor, keşifte net fiyat veriyoruz. Telefonda ön fiyat için arayın: +90 531 663 29 30.`,
    },
    {
      question: `${district}'de evde ${st} kurulumu yapıyor musunuz?`,
      answer: `Evet. ${district} genelinde ev, apartman dairesi, site tesisi ve açık alanlarda kurulum yapıyoruz. ${info ? info.accessNote : "Keşif ücretsizdir."}`,
    },
    {
      question: `${district} için ne kadar önceden rezervasyon gerekli?`,
      answer: `Hafta sonları ve yaz sezonu hızlı dolar; en az 2-3 hafta önceden yazmanızı öneririz. ${district} içi müsaitliğe göre aynı hafta kurulum da yapabiliyoruz.`,
    },
  ];
}
