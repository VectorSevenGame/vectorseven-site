// Vector Seven sitesi: statik sayfa üretici.
// Kullanım: node build.mjs  → kök klasöre TR, en/ ve de/ altına EN ve DE sayfaları yazar.
// Yeni ürün eklemek için PRODUCTS listesine bir kayıt ve TEXT[dil].products altına metin eklemek yeterli.
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';

const SITE = {
  name: 'Vector Seven',
  url: 'https://vectorseven.com.tr',
  email: 'info@bortuapp.com',
  year: new Date().getFullYear(),
};

const LANGS = ['tr', 'en', 'de'];
/** Önbellek kırıcı: her derlemede CSS/JS yeniden indirilsin */
const V = Date.now().toString(36);
const PREFIX = { tr: '', en: 'en/', de: 'de/' };

/** Ürünler: kind = 'app' | 'game' */
const PRODUCTS = [
  {
    slug: 'bortu',
    kind: 'app',
    icon: 'assets/img/bortu-icon.png',
    privacy: 'https://vectorsevengame.github.io/bortu-privacy/privacy.html',
    platforms: ['Android', 'iOS'],
  },
  {
    slug: 'afterself',
    kind: 'game',
    icon: 'assets/img/afterself-icon.png',
    shots: ['assets/img/afterself-oyun.png', 'assets/img/afterself-menu.png'],
    privacy: 'https://vectorseven.com.tr/games/afterself/privacy/',
    platforms: ['Android', 'iOS'],
  },
];

const TEXT = {
  tr: {
    htmlLang: 'tr',
    theme: 'Gece / gündüz modu',
    nav: { games: 'Oyunlar', apps: 'Uygulamalar', about: 'Stüdyo', contact: 'İletişim' },
    metaDesc: 'Vector Seven; oyunlar ve öğrenmeyi oyuna çeviren mobil uygulamalar geliştiren bağımsız bir stüdyo.',
    hero: {
      eyebrow: 'Bağımsız oyun ve uygulama stüdyosu',
      title: 'Oynarken öğrenilen, <em>akılda kalan</em> dünyalar kuruyoruz.',
      lead: 'Vector Seven, mobil oyunlar ve öğrenmeyi oyun kadar keyifli hâle getiren uygulamalar geliştirir. Küçük bir ekip, büyük bir özen.',
      ctaApps: 'Uygulamalarımız',
      ctaContact: 'Bize yazın',
      stackGame: 'İlk oyunumuz',
      stackGameSub: 'Geliştiriliyor',
    },
    apps: { eyebrow: 'Uygulamalar', title: 'Öğrenmeyi oyuna çeviren uygulamalar' },
    games: {
      eyebrow: 'Oyunlar',
      title: 'Oyunlarımız yolda',
      titleHas: 'Oyunlarımız',
      soonTitle: 'İlk oyunumuz geliştiriliyor',
      soonText: 'Duyurulardan ilk sen haberdar olmak istersen bize bir e-posta bırak.',
      soonCta: 'Haberdar et',
    },
    count: (n) => `${n} ürün`,
    detail: 'Detaylar →',
    about: {
      eyebrow: 'Stüdyo',
      title: 'Nasıl çalışıyoruz',
      lead: 'Her ürünü üç ilkeye göre tasarlıyoruz.',
      items: [
        ['Önce eğlence', 'Kısa oturumlar, anında geri bildirim ve ilerleme hissi. İnsanlar zorunda oldukları için değil, istedikleri için geri gelsin.'],
        ['Doğru içerik', 'Öğreten ürünlerimizde bilgiyi özenle hazırlıyor, hataları bildirildiği anda düzeltiyoruz.'],
        ['Kullanıcıya saygı', 'Hesap zorunluluğu yok, gereksiz veri toplama yok. Reklam varsa dengeli, satın alma varsa şeffaf.'],
      ],
    },
    contact: { eyebrow: 'İletişim', title: 'Bir fikriniz, ortaklık teklifiniz ya da geri bildiriminiz mi var?', lead: 'Oyuncular, öğretmenler, yayıncılar ve yatırımcılar: size dönmekten mutluluk duyarız.' },
    foot: { rights: 'Tüm hakları saklıdır.', privacy: 'Gizlilik' },
    status: { beta: 'Kapalı beta', soon: 'Yakında' },
    products: {
      bortu: {
        name: 'Börtü',
        tagline: 'Türk tarihini oynayarak öğren',
        short: 'İlk Türklerden bugüne Türk tarihini kısa dersler, hafıza teknikleri ve oyunlarla öğreten uygulama.',
        tags: ['Eğitim', 'Tarih'],
        status: 'beta',
        lead: 'Börü adındaki kurt yavrusu, İlk Türklerden günümüze uzanan yolculukta sana rehberlik ediyor. Her ders birkaç dakika sürüyor, her bilgi bir hafıza tekniğiyle kalıcı hâle geliyor.',
        join: 'Beta’ya katıl',
        joinSubject: 'Börtü beta katılım',
        playSoon: 'Google Play · yakında',
        iosSoon: 'App Store · yakında',
        figures: [
          ['10', 'tarih dönemi'],
          ['50', 'ders'],
          ['200+', 'soru'],
          ['70', 'olaylı zaman tüneli'],
          ['36', 'tarihi kişi kartı'],
          ['2', 'dil: Türkçe, Almanca'],
        ],
        featuresTitle: 'Neler var?',
        features: [
          ['📚', 'Cep boyu dersler', 'Her ders birkaç dakika. Bilgi kartları, çoktan seçmeli, eşleştirme, sıralama ve boşluk doldurma.'],
          ['🧠', 'Hafıza teknikleri', 'Kodlama, hikâyeleştirme, görselleştirme gibi 7 teknikle bilgiler ezber değil, anlam olarak kalır.'],
          ['🔁', 'Aralıklı tekrar', 'Yanlış yaptığın sorular unutmaya başlayacağın anda yeniden karşına çıkar.'],
          ['🎮', 'Oyunlar', '“Hangisi Önce?” ve “Kim Bu?” oyunlarıyla bildiklerini yarışarak pekiştir.'],
          ['🔥', 'Seri, rozet, rütbe', 'Günlük hedef, seri, 18 rozet ve Börü’nün kostümleriyle ilerlemeni gör.'],
          ['📱', 'Her ekrana uygun', 'Telefonda, tablette ve yatay ekranda rahat kullanım.'],
        ],
        mascotTitle: 'Börü ile tanış',
        mascotText: 'Doğru cevapta sevinir, yanlışta düşünür, serin uzayınca coşar. Börü, uygulamanın her anında yanında olan yol arkadaşın.',
        plansTitle: 'Ücretsiz başla',
        plans: [
          ['Ücretsiz', 'Tüm dersler açık', ['Bütün dönemler ve dersler', 'Tekrar ve oyunlar', 'Reklam destekli']],
          ['Börtü Premium', 'Aylık 100 TL', ['Reklamsız', 'Sınırsız can', 'Özel kurt kostümleri ve rozetler']],
        ],
        support: 'Destek ve geri bildirim',
        privacy: 'Gizlilik politikası',
        back: '← Tüm ürünler',
      },
      afterself: {
        name: 'Afterself',
        tagline: 'Rakibin, geçmiş sensin',
        short: 'Parmağınla kaç, veri topla, hayatta kal. Her turun sonunda o turda yaptığın hareket bir hayalete dönüşüp peşine düşüyor.',
        tags: ['Arcade', 'Refleks'],
        status: 'soon',
        lead: 'Sekiz saniyelik turlar. Tur bitince o turdaki hareketin kaydediliyor ve bir hayalet olarak sahaya geri dönüp aynısını tekrar ediyor. Sonraki tur bir hayalet daha ekleniyor. Yani oyunun zorluğunu tasarımcı değil, sen belirliyorsun: nereye gidersen, gelecekte orası tehlikeli.',
        join: 'Testçi olmak istiyorum',
        joinSubject: 'Afterself test katılım',
        playSoon: 'Google Play · yakında',
        iosSoon: 'App Store · yakında',
        figures: [
          ['8', 'saniyelik turlar'],
          ['12', 'hayalete kadar'],
          ['6', 'görünüm'],
          ['3', 'dil: TR, EN, DE'],
        ],
        featuresTitle: 'Nasıl oynanır?',
        features: [
          ['👆', 'Tek parmak', 'Ekranda parmağını sürükle, karakterin peşinden gelsin. Buton yok, öğrenmesi beş saniye.'],
          ['👻', 'Hayaletler sensin', 'Her turun sonunda o turdaki hareketin birebir tekrar eden bir hayalete dönüşüyor. Değersen ölüyorsun.'],
          ['💠', 'Topla ve sil', 'Topladığın veriler etrafındaki halkayı doldurur. Halka dolunca en eski hayalet yok olur.'],
          ['📈', 'Artan bedel', 'Her silme bir sonrakini pahalılaştırır. Ne zaman harcayacağın, oyunun asıl kararı.'],
          ['🎨', 'Görünümler', 'Kazandığın verilerle yeni renkler aç.'],
          ['📱', 'Çevrimdışı', 'Hesap yok, internet zorunluluğu yok. Aç ve oyna.'],
        ],
        support: 'Destek ve geri bildirim',
        privacy: 'Gizlilik politikası',
        back: '← Tüm ürünler',
      },
    },
    mail: { copy: 'Adresi kopyala', copied: 'Kopyalandı ✓', open: 'E-posta uygulamasında aç', hint: 'Bu adrese yazman yeterli, en kısa sürede dönüyoruz.' },
    notFound: { title: 'Sayfa bulunamadı', text: 'Aradığın sayfa taşınmış ya da hiç var olmamış olabilir.', home: 'Ana sayfaya dön' },
  },

  en: {
    htmlLang: 'en',
    theme: 'Dark / light mode',
    nav: { games: 'Games', apps: 'Apps', about: 'Studio', contact: 'Contact' },
    metaDesc: 'Vector Seven is an independent studio making games and mobile apps that turn learning into play.',
    hero: {
      eyebrow: 'Independent game & app studio',
      title: 'We build worlds you learn in <em>while you play</em>.',
      lead: 'Vector Seven makes mobile games and apps that make learning as enjoyable as playing. A small team with great care.',
      ctaApps: 'Our apps',
      ctaContact: 'Get in touch',
      stackGame: 'Our first game',
      stackGameSub: 'In development',
    },
    apps: { eyebrow: 'Apps', title: 'Apps that turn learning into play' },
    games: {
      eyebrow: 'Games',
      title: 'Our games are on the way',
      titleHas: 'Our games',
      soonTitle: 'Our first game is in development',
      soonText: 'Want to hear about it first? Drop us an email.',
      soonCta: 'Notify me',
    },
    count: (n) => `${n} ${n === 1 ? 'product' : 'products'}`,
    detail: 'Details →',
    about: {
      eyebrow: 'Studio',
      title: 'How we work',
      lead: 'Every product is built on three principles.',
      items: [
        ['Fun first', 'Short sessions, instant feedback and a real sense of progress. People should come back because they want to, not because they have to.'],
        ['Accurate content', 'In our learning products we prepare every fact with care and fix mistakes as soon as they are reported.'],
        ['Respect for users', 'No forced accounts, no unnecessary data collection. Ads, if any, are balanced; purchases are transparent.'],
      ],
    },
    contact: { eyebrow: 'Contact', title: 'Have an idea, a partnership offer or feedback?', lead: 'Players, teachers, publishers and investors: we would love to hear from you.' },
    foot: { rights: 'All rights reserved.', privacy: 'Privacy' },
    status: { beta: 'Closed beta', soon: 'Coming soon' },
    products: {
      bortu: {
        name: 'Börtü',
        tagline: 'Learn Turkish history by playing',
        short: 'Bite-sized lessons, memory techniques and games covering Turkish history from the earliest Turks to today.',
        tags: ['Education', 'History'],
        status: 'beta',
        lead: 'Börü the wolf pup guides you on a journey from the earliest Turks to the present day. Each lesson takes a few minutes, and every fact is anchored with a memory technique.',
        join: 'Join the beta',
        joinSubject: 'Börtü beta signup',
        playSoon: 'Google Play · soon',
        iosSoon: 'App Store · soon',
        figures: [
          ['10', 'historical eras'],
          ['50', 'lessons'],
          ['200+', 'questions'],
          ['70', 'timeline events'],
          ['36', 'historical figures'],
          ['2', 'languages: Turkish, German'],
        ],
        featuresTitle: 'What’s inside',
        features: [
          ['📚', 'Bite-sized lessons', 'A few minutes each: fact cards, multiple choice, matching, ordering and fill-in-the-blank.'],
          ['🧠', 'Memory techniques', 'Seven techniques such as encoding, storytelling and visualisation make facts stick through meaning, not rote.'],
          ['🔁', 'Spaced repetition', 'Questions you missed come back right when you are about to forget them.'],
          ['🎮', 'Games', 'Reinforce what you know with “Which came first?” and “Who is this?”.'],
          ['🔥', 'Streaks, badges, ranks', 'Daily goals, streaks, 18 badges and costumes for Börü show your progress.'],
          ['📱', 'Fits every screen', 'Comfortable on phones, tablets and in landscape.'],
        ],
        mascotTitle: 'Meet Börü',
        mascotText: 'Cheers when you are right, thinks it over when you are wrong and celebrates your streaks. Börü is your companion through every moment of the app.',
        plansTitle: 'Start for free',
        plans: [
          ['Free', 'All lessons included', ['Every era and lesson', 'Reviews and games', 'Supported by ads']],
          ['Börtü Premium', 'Monthly subscription', ['No ads', 'Unlimited hearts', 'Exclusive wolf costumes and badges']],
        ],
        support: 'Support & feedback',
        privacy: 'Privacy policy',
        back: '← All products',
      },
      afterself: {
        name: 'Afterself',
        tagline: 'Your rival is your past self',
        short: 'Drag to run, collect data, stay alive. At the end of every round your own movement becomes a ghost and comes after you.',
        tags: ['Arcade', 'Reflex'],
        status: 'soon',
        lead: 'Eight-second rounds. When a round ends, the way you moved through it is recorded and sent back onto the field as a ghost that repeats it exactly. The next round adds another one. The difficulty is not designed — you write it yourself: wherever you go now is dangerous later.',
        join: 'I want to test it',
        joinSubject: 'Afterself testing',
        playSoon: 'Google Play · soon',
        iosSoon: 'App Store · soon',
        figures: [
          ['8', 'second rounds'],
          ['12', 'ghosts max'],
          ['6', 'skins'],
          ['3', 'languages'],
        ],
        featuresTitle: 'How it plays',
        features: [
          ['👆', 'One finger', 'Drag anywhere and the ball follows. No buttons, five seconds to learn.'],
          ['👻', 'The ghosts are you', 'Each round your movement becomes a ghost that repeats it frame for frame. Touch one and the run is over.'],
          ['💠', 'Collect and wipe', 'Collected data fills the ring around you. A full ring destroys the oldest ghost.'],
          ['📈', 'Rising cost', 'Every wipe makes the next one more expensive. When to spend it is the real decision.'],
          ['🎨', 'Skins', 'Spend what you collect on new colours.'],
          ['📱', 'Offline', 'No account, no connection needed. Open and play.'],
        ],
        support: 'Support and feedback',
        privacy: 'Privacy policy',
        back: '← All products',
      },
    },
    mail: { copy: 'Copy address', copied: 'Copied ✓', open: 'Open in email app', hint: 'Just write to this address, we will get back to you soon.' },
    notFound: { title: 'Page not found', text: 'The page you are looking for may have moved or never existed.', home: 'Back to home' },
  },

  de: {
    htmlLang: 'de',
    theme: 'Dunkel- / Hellmodus',
    nav: { games: 'Spiele', apps: 'Apps', about: 'Studio', contact: 'Kontakt' },
    metaDesc: 'Vector Seven ist ein unabhängiges Studio für Spiele und mobile Apps, die Lernen zum Spiel machen.',
    hero: {
      eyebrow: 'Unabhängiges Spiele- und App-Studio',
      title: 'Wir bauen Welten, in denen man <em>spielend lernt</em>.',
      lead: 'Vector Seven entwickelt mobile Spiele und Apps, die Lernen so unterhaltsam machen wie Spielen. Ein kleines Team mit viel Sorgfalt.',
      ctaApps: 'Unsere Apps',
      ctaContact: 'Schreib uns',
      stackGame: 'Unser erstes Spiel',
      stackGameSub: 'In Entwicklung',
    },
    apps: { eyebrow: 'Apps', title: 'Apps, die Lernen zum Spiel machen' },
    games: {
      eyebrow: 'Spiele',
      title: 'Unsere Spiele sind unterwegs',
      titleHas: 'Unsere Spiele',
      soonTitle: 'Unser erstes Spiel ist in Entwicklung',
      soonText: 'Du willst als Erstes davon erfahren? Schreib uns eine E-Mail.',
      soonCta: 'Benachrichtigen',
    },
    count: (n) => `${n} ${n === 1 ? 'Produkt' : 'Produkte'}`,
    detail: 'Details →',
    about: {
      eyebrow: 'Studio',
      title: 'So arbeiten wir',
      lead: 'Jedes Produkt folgt drei Grundsätzen.',
      items: [
        ['Spaß zuerst', 'Kurze Einheiten, sofortiges Feedback und spürbarer Fortschritt. Man soll zurückkommen, weil man will – nicht weil man muss.'],
        ['Korrekte Inhalte', 'In unseren Lern-Apps bereiten wir jede Information sorgfältig auf und korrigieren Fehler, sobald sie gemeldet werden.'],
        ['Respekt vor Nutzern', 'Kein Kontozwang, keine unnötige Datensammlung. Werbung maßvoll, Käufe transparent.'],
      ],
    },
    contact: { eyebrow: 'Kontakt', title: 'Eine Idee, ein Partnerschaftsangebot oder Feedback?', lead: 'Spieler, Lehrkräfte, Publisher und Investoren: Wir freuen uns auf deine Nachricht.' },
    foot: { rights: 'Alle Rechte vorbehalten.', privacy: 'Datenschutz' },
    status: { beta: 'Geschlossene Beta', soon: 'Demnächst' },
    products: {
      bortu: {
        name: 'Börtü',
        tagline: 'Türkische Geschichte spielend lernen',
        short: 'Kurze Lektionen, Gedächtnistechniken und Spiele zur türkischen Geschichte – von den ersten Türken bis heute.',
        tags: ['Bildung', 'Geschichte'],
        status: 'beta',
        lead: 'Der Wolfswelpe Börü begleitet dich auf einer Reise von den ersten Türken bis in die Gegenwart. Jede Lektion dauert nur wenige Minuten, und jede Information wird mit einer Gedächtnistechnik verankert.',
        join: 'An der Beta teilnehmen',
        joinSubject: 'Börtü Beta-Anmeldung',
        playSoon: 'Google Play · demnächst',
        iosSoon: 'App Store · demnächst',
        figures: [
          ['10', 'Epochen'],
          ['50', 'Lektionen'],
          ['200+', 'Fragen'],
          ['70', 'Ereignisse im Zeitstrahl'],
          ['36', 'historische Persönlichkeiten'],
          ['2', 'Sprachen: Türkisch, Deutsch'],
        ],
        featuresTitle: 'Was steckt drin?',
        features: [
          ['📚', 'Lektionen im Taschenformat', 'Wenige Minuten pro Lektion: Wissenskarten, Multiple Choice, Zuordnen, Ordnen und Lückentext.'],
          ['🧠', 'Gedächtnistechniken', 'Sieben Techniken wie Kodieren, Geschichten und Visualisieren – Wissen bleibt durch Bedeutung, nicht durch Pauken.'],
          ['🔁', 'Verteilte Wiederholung', 'Falsch beantwortete Fragen kommen genau dann wieder, wenn du sie zu vergessen beginnst.'],
          ['🎮', 'Spiele', 'Festige dein Wissen mit „Was war zuerst?“ und „Wer ist das?“.'],
          ['🔥', 'Serien, Abzeichen, Ränge', 'Tagesziel, Serien, 18 Abzeichen und Kostüme für Börü zeigen deinen Fortschritt.'],
          ['📱', 'Für jeden Bildschirm', 'Bequem auf Handy, Tablet und im Querformat.'],
        ],
        mascotTitle: 'Das ist Börü',
        mascotText: 'Freut sich über richtige Antworten, grübelt bei falschen und jubelt über deine Serien. Börü ist in jedem Moment der App an deiner Seite.',
        plansTitle: 'Kostenlos starten',
        plans: [
          ['Kostenlos', 'Alle Lektionen enthalten', ['Alle Epochen und Lektionen', 'Wiederholungen und Spiele', 'Werbefinanziert']],
          ['Börtü Premium', 'Monatsabo · 4,99 €', ['Keine Werbung', 'Unbegrenzte Herzen', 'Exklusive Wolfskostüme und Abzeichen']],
        ],
        support: 'Support & Feedback',
        privacy: 'Datenschutzerklärung',
        back: '← Alle Produkte',
      },
      afterself: {
        name: 'Afterself',
        tagline: 'Dein Gegner ist dein früheres Ich',
        short: 'Zieh, sammle Daten, überlebe. Am Ende jeder Runde wird deine eigene Bewegung zu einem Geist und verfolgt dich.',
        tags: ['Arcade', 'Reflexe'],
        status: 'soon',
        lead: 'Runden von acht Sekunden. Endet eine Runde, wird deine Bewegung aufgezeichnet und als Geist zurück ins Spiel geschickt, der sie exakt wiederholt. Die nächste Runde bringt einen weiteren. Den Schwierigkeitsgrad entwirft kein Designer — du schreibst ihn selbst: Wohin du jetzt gehst, wird später gefährlich.',
        join: 'Ich möchte testen',
        joinSubject: 'Afterself Test',
        playSoon: 'Google Play · bald',
        iosSoon: 'App Store · bald',
        figures: [
          ['8', 'Sekunden pro Runde'],
          ['12', 'Geister maximal'],
          ['6', 'Skins'],
          ['3', 'Sprachen'],
        ],
        featuresTitle: 'So spielt es sich',
        features: [
          ['👆', 'Ein Finger', 'Zieh über den Bildschirm, der Ball folgt. Keine Knöpfe, in fünf Sekunden verstanden.'],
          ['👻', 'Die Geister bist du', 'Jede Runde wird deine Bewegung zu einem Geist, der sie Bild für Bild wiederholt. Eine Berührung beendet den Lauf.'],
          ['💠', 'Sammeln und löschen', 'Gesammelte Daten füllen den Ring um dich. Ein voller Ring zerstört den ältesten Geist.'],
          ['📈', 'Steigende Kosten', 'Jede Löschung macht die nächste teurer. Wann du sie einsetzt, ist die eigentliche Entscheidung.'],
          ['🎨', 'Skins', 'Gib das Gesammelte für neue Farben aus.'],
          ['📱', 'Offline', 'Kein Konto, keine Verbindung nötig. Öffnen und spielen.'],
        ],
        support: 'Support und Feedback',
        privacy: 'Datenschutz',
        back: '← Alle Produkte',
      },
    },
    mail: { copy: 'Adresse kopieren', copied: 'Kopiert ✓', open: 'In E-Mail-App öffnen', hint: 'Schreib einfach an diese Adresse, wir melden uns bald.' },
    notFound: { title: 'Seite nicht gefunden', text: 'Die gesuchte Seite wurde verschoben oder existiert nicht.', home: 'Zur Startseite' },
  },
};

// ------------------------------------------------------------------ yardımcılar

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Sayfa derinliğine göre köke göreli yol */
const rootOf = (path) => '../'.repeat(path.split('/').length - 1);

const LOGO = `<svg viewBox="0 0 40 40" aria-hidden="true"><rect width="40" height="40" rx="11" fill="currentColor"/><path d="M11 12h18l-9 17" fill="none" stroke="var(--paper)" stroke-width="4.2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="29" cy="12" r="3.4" fill="var(--accent)"/></svg>`;

function layout({ lang, path, title, desc, body, alt }) {
  const t = TEXT[lang];
  const root = rootOf(path);
  const home = `${root}${PREFIX[lang]}`;
  const langLinks = LANGS.map(
    (l) => `<a href="${root}${alt(l)}" hreflang="${l}" aria-current="${l === lang}">${l.toUpperCase()}</a>`,
  ).join('');
  const hreflang = LANGS.map((l) => `<link rel="alternate" hreflang="${l}" href="${root}${alt(l)}">`).join('\n');
  return `<!doctype html>
<html lang="${t.htmlLang}">
<head>
<meta charset="utf-8">
<script>(function(){var d=document.documentElement;d.classList.add('js');var t='dark';try{t=localStorage.getItem('v7-theme')||'dark'}catch(e){}d.setAttribute('data-theme',t)})()</script>
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta property="og:title" content="${esc(title)}">
<link rel="canonical" href="${SITE.url}/${path.replace(/index\.html$/, '')}">
<meta property="og:description" content="${esc(desc)}">
<meta name="theme-color" content="#0e1016">
${hreflang}
<link rel="icon" href="${root}assets/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=Figtree:wght@400;500;600;700&display=swap">
<link rel="stylesheet" href="${root}assets/style.css?v=${V}">
<link rel="stylesheet" href="${root}assets/motion.css?v=${V}">
</head>
<body>
<header class="top">
  <div class="wrap">
    <a class="brand" href="${home}">${LOGO}<span>${SITE.name}</span></a>
    <nav class="nav" aria-label="${esc(t.nav.apps)}">
      <a href="${home}#games">${t.nav.games}</a>
      <a href="${home}#apps">${t.nav.apps}</a>
      <a href="${home}#studio">${t.nav.about}</a>
      <a href="${home}#contact">${t.nav.contact}</a>
    </nav>
    <div class="langs">${langLinks}</div>
    <button class="theme" type="button" data-theme-toggle aria-label="${esc(t.theme)}" title="${esc(t.theme)}">
      <svg class="sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.2M12 19.3v2.2M4.6 4.6l1.6 1.6M17.8 17.8l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.6 19.4l1.6-1.6M17.8 6.2l1.6-1.6"/></svg>
      <svg class="moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7Z"/></svg>
    </button>
  </div>
</header>
<main>
${body}
</main>
<footer class="foot">
  <div class="wrap">
    <span>© ${SITE.year} ${SITE.name}. ${t.foot.rights}</span>
    <nav>
      <a href="${home}#games">${t.nav.games}</a>
      <a href="${home}#apps">${t.nav.apps}</a>
      <a href="mailto:${SITE.email}">${SITE.email}</a>
    </nav>
  </div>
</footer>
<script src="${root}assets/site.js?v=${V}" defer></script>
</body>
</html>
`;
}

let boxId = 0;
/** Tıklayınca açılan e-posta kutusu: adres, kopyala, e-posta uygulamasında aç */
function mailButton(lang, label, subject, cls = 'btn btn-ghost') {
  const t = TEXT[lang];
  const id = `mailbox-${++boxId}`;
  const href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}`;
  return `<a class="${cls}" href="${href}" data-mail aria-expanded="false" aria-controls="${id}">${label}</a>
<div class="mailbox" id="${id}" hidden>
  <small>${t.mail.hint}</small>
  <span class="addr">${SITE.email}</span>
  <div class="row">
    <button type="button" data-copy="${SITE.email}">${t.mail.copy}</button>
    <a href="${href}">${t.mail.open}</a>
    <span class="ok" data-done hidden role="status">${t.mail.copied}</span>
  </div>
</div>`;
}

function productCard(lang, p, root) {
  const t = TEXT[lang];
  const c = t.products[p.slug];
  return `<a class="card reveal" href="${root}${PREFIX[lang]}${p.kind === 'app' ? 'apps' : 'games'}/${p.slug}/">
  <div class="card-top">
    <img class="card-icon" src="${root}${p.icon}" alt="" width="64" height="64">
    <div><h3>${c.name}</h3><p>${c.tagline}</p></div>
  </div>
  <p>${c.short}</p>
  <div class="pills">
    <span class="pill status">${t.status[c.status]}</span>
    ${c.tags.map((x) => `<span class="pill">${x}</span>`).join('')}
    ${p.platforms.map((x) => `<span class="pill">${x}</span>`).join('')}
  </div>
  <strong>${t.detail}</strong>
</a>`;
}

function homePage(lang) {
  const t = TEXT[lang];
  const path = `${PREFIX[lang]}index.html`;
  const root = rootOf(path);
  const apps = PRODUCTS.filter((p) => p.kind === 'app');
  const games = PRODUCTS.filter((p) => p.kind === 'game');
  const bortu = t.products.bortu;

  const body = `
<section class="hero">
  <div class="wrap">
    <div>
      <p class="eyebrow">${t.hero.eyebrow}</p>
      <h1>${t.hero.title}</h1>
      <p class="lead">${t.hero.lead}</p>
      <div class="btns">
        <a class="btn btn-primary" href="#apps">${t.hero.ctaApps}</a>
        <a class="btn btn-ghost" href="#contact">${t.hero.ctaContact}</a>
      </div>
    </div>
    <div class="stack" aria-hidden="true">
      <a class="stack-card app" href="${root}${PREFIX[lang]}apps/bortu/" tabindex="-1">
        <img src="${root}assets/img/bortu-selam.png" alt="" width="240" height="240">
        <strong>${bortu.name}</strong>
        <span>${bortu.tagline}</span>
      </a>
      ${games.length
        ? `<a class="stack-card game live" href="${root}${PREFIX[lang]}games/${games[0].slug}/" tabindex="-1">
        <img src="${root}${games[0].icon}" alt="" width="240" height="240" style="border-radius:28px">
        <strong>${t.products[games[0].slug].name}</strong>
        <span>${t.products[games[0].slug].tagline}</span>
      </a>`
        : `<div class="stack-card game">
        <div class="glyph">V7</div>
        <strong>${t.hero.stackGame}</strong>
        <span>${t.hero.stackGameSub}</span>
      </div>`}
    </div>
  </div>
</section>

<section class="section" id="apps">
  <div class="wrap">
    <div class="section-head reveal">
      <div><p class="eyebrow">${t.apps.eyebrow}</p><h2>${t.apps.title}</h2></div>
      <span class="count">${t.count(apps.length)}</span>
    </div>
    <div class="cards">${apps.map((p) => productCard(lang, p, root)).join('')}</div>
  </div>
</section>

<section class="section" id="games">
  <div class="wrap">
    <div class="section-head reveal">
      <div><p class="eyebrow">${t.games.eyebrow}</p><h2>${games.length ? t.games.titleHas : t.games.title}</h2></div>
      ${games.length ? `<span class="count">${t.count(games.length)}</span>` : ''}
    </div>
    <div class="cards">
      ${games.map((p) => productCard(lang, p, root)).join('')}
      ${games.length ? '' : `<div class="card soon reveal" style="--d:.1s">
        <div class="glyph">+</div>
        <h3>${t.games.soonTitle}</h3>
        <p>${t.games.soonText}</p>
        <div>${mailButton(lang, t.games.soonCta, `${SITE.name} – ${t.games.soonCta}`)}</div>
      </div>`}
    </div>
  </div>
</section>

<section class="section band" id="studio">
  <div class="wrap">
    <div class="section-head reveal">
      <div><p class="eyebrow">${t.about.eyebrow}</p><h2>${t.about.title}</h2></div>
      <p class="lead">${t.about.lead}</p>
    </div>
    <div class="principles">
      ${t.about.items
        .map(([h, p], i) => `<div class="principle reveal" style="--d:${i * 0.12}s"><div class="mark">${i + 1}</div><h3>${h}</h3><p>${p}</p></div>`)
        .join('')}
    </div>
  </div>
</section>

<section class="section" id="contact">
  <div class="wrap contact reveal">
    <div>
      <p class="eyebrow">${t.contact.eyebrow}</p>
      <h2 style="font-size:clamp(28px,3.6vw,40px);margin:8px 0 12px">${t.contact.title}</h2>
      <p class="lead">${t.contact.lead}</p>
      <p style="margin-top:22px"><a class="mail" href="mailto:${SITE.email}">${SITE.email}</a></p>
    </div>
  </div>
</section>`;

  return {
    path,
    html: layout({
      lang,
      path,
      title: `${SITE.name} — ${t.hero.eyebrow}`,
      desc: t.metaDesc,
      body,
      alt: (l) => `${PREFIX[l]}`,
    }),
  };
}

function productPage(lang, p) {
  const t = TEXT[lang];
  const c = t.products[p.slug];
  const section = p.kind === 'app' ? 'apps' : 'games';
  const path = `${PREFIX[lang]}${section}/${p.slug}/index.html`;
  const root = rootOf(path);

  const body = `
<section class="product-hero">
  <div class="wrap">
    <div>
      <a class="crumb" href="${root}${PREFIX[lang]}#${section}">${c.back}</a>
      <div class="app-id" style="margin-top:22px">
        <img src="${root}${p.icon}" alt="" width="72" height="72">
        <div class="pills" style="margin:0">
          <span class="pill status">${t.status[c.status]}</span>
          ${p.platforms.map((x) => `<span class="pill">${x}</span>`).join('')}
        </div>
      </div>
      <h1>${c.name}</h1>
      <p class="lead" style="font-size:21px;font-weight:600;color:#fff;margin-bottom:10px">${c.tagline}</p>
      <p class="lead">${c.lead}</p>
      <div class="btns" style="margin-top:28px">
        ${mailButton(lang, c.join, c.joinSubject, 'btn btn-primary')}
        <span class="btn btn-ghost" aria-disabled="true">${c.playSoon}</span>
        ${c.iosSoon ? `<span class="btn btn-ghost" aria-disabled="true">${c.iosSoon}</span>` : ''}
      </div>
    </div>
    ${p.shots
      ? `<img class="mascot" src="${root}${p.shots[0]}" alt="${esc(c.name)}" width="300" height="533" style="border-radius:22px">`
      : `<img class="mascot" src="${root}assets/img/bortu-selam.png" alt="${esc(c.mascotTitle)}" width="380" height="380">`}
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="figures reveal">
      ${c.figures
        .map(([n, l]) => {
          const m = /^(\d+)(.*)$/.exec(n);
          const count = m ? ` data-count="${m[1]}" data-suffix="${m[2]}"` : '';
          return `<div class="figure"><b${count}>${n}</b><span>${l}</span></div>`;
        })
        .join('')}
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="section-head reveal"><h2>${c.featuresTitle}</h2></div>
    <div class="features">
      ${c.features
        .map(([e, h, d], i) => `<div class="feature reveal" style="--d:${(i % 3) * 0.1}s"><div class="dot" aria-hidden="true">${e}</div><div><h3>${h}</h3><p>${d}</p></div></div>`)
        .join('')}
    </div>
  </div>
</section>

${c.mascotTitle ? `<section class="section">
  <div class="wrap split reveal">
    <img src="${root}assets/img/bortu-anlatiyor.png" alt="" width="320" height="320">
    <div>
      <h2 style="font-size:clamp(30px,4vw,44px);margin-bottom:14px">${c.mascotTitle}</h2>
      <p class="lead">${c.mascotText}</p>
      <h3 style="font-size:24px;margin-top:40px">${c.plansTitle}</h3>
      <div class="plans">
        ${c.plans
          .map(
            ([name, price, items], i) =>
              `<div class="plan${i === 1 ? ' gold' : ''}"><h3>${name}</h3><div class="price">${price}</div><ul>${items
                .map((x) => `<li>${x}</li>`)
                .join('')}</ul></div>`,
          )
          .join('')}
      </div>
    </div>
  </div>
</section>` : ''}

${p.shots && p.shots.length > 1 ? `<section class="section">
  <div class="wrap reveal" style="display:flex;gap:22px;flex-wrap:wrap;justify-content:center">
    ${p.shots.map((s) => `<img src="${root}${s}" alt="" width="260" height="462" style="border-radius:20px;max-width:46%;height:auto">`).join('')}
  </div>
</section>` : ''}

<section class="section">
  <div class="wrap contact">
    <div>
      <p class="eyebrow">${c.support}</p>
      <p style="margin-top:12px"><a class="mail" href="mailto:${SITE.email}">${SITE.email}</a></p>
      ${p.privacy ? `<p style="margin-top:18px"><a href="${p.privacy}">${c.privacy} ↗</a></p>` : ''}
    </div>
  </div>
</section>`;

  return {
    path,
    html: layout({
      lang,
      path,
      title: `${c.name} — ${c.tagline} · ${SITE.name}`,
      desc: c.short,
      body,
      alt: (l) => `${PREFIX[l]}${section}/${p.slug}/`,
    }),
  };
}

function notFoundPage() {
  const t = TEXT.tr;
  const e = TEXT.en;
  const path = '404.html';
  const body = `<section class="section"><div class="wrap">
  <p class="eyebrow">404</p>
  <h1 style="font-size:clamp(40px,6vw,64px);margin:10px 0 16px">${t.notFound.title}</h1>
  <p class="lead">${t.notFound.text}<br>${e.notFound.text}</p>
  <div class="btns" style="margin-top:28px"><a class="btn btn-primary" href="/">${t.notFound.home}</a></div>
</div></section>`;
  // GitHub Pages 404 sayfası farklı derinliklerden sunulur; kök yolları mutlak kullanılmalı
  const html = layout({ lang: 'tr', path, title: `404 · ${SITE.name}`, desc: t.metaDesc, body, alt: (l) => PREFIX[l] })
    .replaceAll('href="assets/', 'href="/assets/')
    .replaceAll('src="assets/', 'src="/assets/');
  return { path, html };
}

// --------------------------------------------------------------------- yazdır

const pages = [];
for (const lang of LANGS) {
  pages.push(homePage(lang));
  for (const p of PRODUCTS) pages.push(productPage(lang, p));
}
pages.push(notFoundPage());

for (const { path, html } of pages) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, html);
  console.log('yazıldı:', path);
}
writeFileSync('assets/favicon.svg', LOGO.replace('aria-hidden="true"', 'xmlns="http://www.w3.org/2000/svg"').replaceAll('var(--paper)', '#f5f5f1').replaceAll('currentColor', '#12141a').replaceAll('var(--accent)', '#ff5b2e'));
writeFileSync('.nojekyll', '');
