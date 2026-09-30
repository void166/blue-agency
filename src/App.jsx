import React, { useEffect, useRef, useState } from 'react';

const image = (number) => `/images/blue-${number}.webp`;

const work = [
  { number: '01', title: 'ECHO', type: 'IDENTITY / ART DIRECTION', image: 1, description: 'Дуу хоолойтой брэндийн шинэ дүр.' },
  { number: '02', title: 'FRAME', type: 'CAMPAIGN / CONTENT', image: 2, description: 'Хүмүүсийг зогсоож харах дүрслэл.' },
  { number: '03', title: 'OBJECT', type: 'DIGITAL / EXPERIENCE', image: 4, description: 'Энгийн санааг онцгой туршлага болгох нь.' },
  { number: '04', title: 'MOTION', type: 'CREATIVE / CULTURE', image: 5, description: 'Хөдөлгөөнд орсон шинэ өнцөг.' },
];

const services = [
  { no: '01', name: 'STRATEGY', label: 'Чиглэлээ олъё', image: 7, points: ['Брэнд байршуулалт', 'Судалгаа ба санаа', 'Үгийн өнгө аяс'] },
  { no: '02', name: 'IDENTITY', label: 'Дүр төрхөө бүтээе', image: 3, points: ['Визуал систем', 'Арт директор', 'Контент дизайн'] },
  { no: '03', name: 'DIGITAL', label: 'Дэлгэцэнд амилуулъя', image: 6, points: ['Веб туршлага', 'Интерактив дизайн', 'Motion'] },
  { no: '04', name: 'CAMPAIGN', label: 'Хүмүүст хүргэе', image: 8, points: ['Креатив концепт', 'Кампанит ажил', 'Олон суваг'] },
];

const questions = [
  { q: 'BLUE ямар төсөл дээр ажилладаг вэ?', a: 'Брэнд стратеги, визуал дүр төрх, веб туршлага, дижитал кампанит ажлын санаа ба гүйцэтгэл дээр ажиллана.' },
  { q: 'Төслөө эхлүүлэхэд юу бэлдэх вэ?', a: 'Юу хийхийг хүсэж байгаагаа, хугацаа болон төсвийн хүрээгээ товч бичихэд эхний уулзалт хийхэд хангалттай.' },
  { q: 'Зөвхөн нэг үйлчилгээ авч болох уу?', a: 'Болно. Бид нэг тодорхой даалгавраас эхлээд брэндийн бүтэн систем хүртэл хамтарч ажиллаж болно.' },
  { q: 'Веб сайтын дизайн, хөгжүүлэлт хоёуланг нь хийх үү?', a: 'Тийм. Концепт, интерфэйс, хөдөлгөөн, responsive хөгжүүлэлтийг нэг урсгалаар төлөвлөж болно.' },
  { q: 'BLUE-тэй яаж холбогдох вэ?', a: 'Доорх холбоо барих хэсгээс агентлагийн бодит имэйл хаягийг оруулан имэйл нээнэ. Энэ демод холбоо барих хаягийг тохируулаагүй.' },
];

function RepeatingRail({ vertical = false }) {
  const unit = <React.Fragment>✳ BLUE® ✳ MAKE WAVES ✳ BLUE® ✳ <span className="rail-eye">◉</span> ✳ </React.Fragment>;
  return <span className={vertical ? 'rail-content vertical' : 'rail-content'}>{Array.from({ length: 14 }, (_, index) => <span className="rail-unit" key={index}>{unit}</span>)}</span>;
}

function Frame() {
  return <div className="frame-overlay" aria-hidden="true">
    <div className="frame-edge frame-top"><RepeatingRail /></div>
    <div className="frame-edge frame-right"><RepeatingRail vertical /></div>
    <div className="frame-edge frame-bottom"><RepeatingRail /></div>
    <div className="frame-edge frame-left"><RepeatingRail vertical /></div>
  </div>;
}

function MediaTile({ number, className = '', label = '' }) {
  return <div className={`media-tile ${className}`}><img src={image(number)} alt={label || `BLUE creative visual ${number}`} loading="lazy" />{label && <span>{label}</span>}</div>;
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadCount, setLoadCount] = useState(0);
  const emailRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setLoading(false);
      setLoadCount(100);
      return;
    }
    const started = performance.now();
    const progressTimer = window.setInterval(() => {
      setLoadCount(Math.min(100, Math.floor((performance.now() - started) / 15)));
    }, 30);
    const doneTimer = window.setTimeout(() => { setLoadCount(100); setLoading(false); }, 1700);
    return () => { window.clearInterval(progressTimer); window.clearTimeout(doneTimer); };
  }, []);

  useEffect(() => {
    const frame = document.querySelector('.frame-overlay');
    const topUnit = document.querySelector('.frame-top .rail-unit');
    const sideUnit = document.querySelector('.frame-left .rail-unit');
    let raf = 0;
    const moveRails = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const topSize = topUnit?.getBoundingClientRect().width || 260;
        const sideSize = sideUnit?.getBoundingClientRect().height || 260;
        frame?.style.setProperty('--rail-x', `${-((window.scrollY * .55) % topSize)}px`);
        frame?.style.setProperty('--rail-y', `${-((window.scrollY * .55) % sideSize)}px`);
        raf = 0;
      });
    };
    moveRails();
    window.addEventListener('scroll', moveRails, { passive: true });
    window.addEventListener('resize', moveRails);
    return () => { window.removeEventListener('scroll', moveRails); window.removeEventListener('resize', moveRails); cancelAnimationFrame(raf); };
  }, []);

  useEffect(() => {
    document.body.style.overflow = loading ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [loading]);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    }), { threshold: .08 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  function openEmail() {
    const input = emailRef.current;
    if (!input?.reportValidity()) return;
    window.location.href = `mailto:${encodeURIComponent(input.value.trim())}?subject=${encodeURIComponent('BLUE агентлагтай төсөл ярилцах')}`;
  }

  return <>
    <div className={loading ? 'preloader' : 'preloader done'} aria-hidden={!loading}>
      <div className="loader-top"><span>BLUE® / CREATIVE STUDIO</span><span>INITIALIZING IDEAS ✳</span></div>
      <div className="loader-word" aria-label="BLUE">BLUE<span>✳</span></div>
      <div className="loader-bottom"><span>LOADING THE NEXT WAVE</span><span>{String(loadCount).padStart(3, '0')}%</span></div>
      <div className="loader-progress"><span style={{ width: `${loadCount}%` }} /></div>
    </div>
    <Frame />
    <div className={loading ? 'site' : 'site is-ready'} id="top">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="BLUE нүүр">BLUE<sup>®</sup></a>
        <span className="header-id">INDEPENDENT CREATIVE AGENCY / ULAANBAATAR</span>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Цэс хаах' : 'Цэс нээх'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? 'CLOSE ×' : 'MENU +'}</button>
        <nav className={menuOpen ? 'site-nav open' : 'site-nav'} aria-label="Үндсэн цэс" onClick={event => { if (event.target.closest('a')) setMenuOpen(false); }}>
          <a href="#about">ABOUT</a><a href="#work">WORK</a><a href="#services">SERVICES</a><a href="#contact">CONTACT ↗</a>
        </nav>
      </header>

      <main>
        <section className="hero" aria-labelledby="heroTitle">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-caption"><span>CREATIVE FUTURES ARE MADE HERE</span><span>BLUE / CREATIVE STUDIO</span></div>
          <h1 id="heroTitle" className="hero-words"><span>MAKE</span><span>BLUE</span><span>MATTER</span></h1>
          <div className="hero-disc" aria-hidden="true"><div className="disc-rotor"><div className="disc-face front"><span>BLUE<br />STUDIO</span><small>IDEAS IN MOTION ✳</small></div><div className="disc-face back"><span>MAKE<br />WAVES</span><small>THINK BIG ✳ CREATE MORE</small></div></div></div>
          <div className="hero-stamp" aria-hidden="true">B<br />®</div>
          <div className="hero-bottom"><span>ЗОРИГТОЙ САНАА / ТОД ДҮР ТӨРХ / НӨЛӨӨТЭЙ ТУРШЛАГА</span><a href="#about">SCROLL TO EXPLORE ↓</a></div>
        </section>

        <section className="pitch" id="about" aria-labelledby="pitchTitle">
          <div className="section-index">01 / THE PITCH <span>BLUE MAKES WAVES</span></div>
          <div className="pitch-grid">
            <div className="pitch-statement"><h2 id="pitchTitle" className="reveal">YOU HAVE<br />AN IDEA.<br />NOW MAKE<br /><em>IT MATTER.</em></h2><p>Бид стратеги, дизайн, технологиор санааг хүмүүст хүрэх бодит туршлага болгодог. BLUE бол анзаарагдаж, дурсагдаж, яригдах брэнд бүтээх креатив хамтрагч.</p><a className="black-button" href="#contact">LET'S TALK ↗</a></div>
            <div className="pitch-data">
              <div className="data-top"><div className="data-cell sketch"><span>FROM IDEA</span><div className="scribble" aria-hidden="true">↗</div><span>TO IMPACT</span></div><div className="data-cell metric"><strong>04</strong><span>CREATIVE<br />DISCIPLINES</span></div></div>
              <div className="data-bottom"><div className="data-cell metric"><strong>01</strong><span>ONE CONNECTED<br />CREATIVE TEAM</span></div><div className="data-cell globe"><span>WORLDWIDE THINKING<br />ULAANBAATAR ENERGY</span><div aria-hidden="true">◎</div></div></div>
              <div className="data-photo"><img src={image(2)} alt="BLUE campaign portrait" loading="lazy" /><span>CREATIVE WITHOUT THE QUIET PART</span></div>
            </div>
          </div>
        </section>

        <section className="shout" aria-labelledby="shoutTitle"><span className="section-index">02 / OUR POINT OF VIEW <span>NO SMALL IDEAS</span></span><h2 id="shoutTitle" className="reveal">IN CASE<br />YOU DON'T<br />KNOW <i>BLUE</i><br />YET.</h2><div className="shout-sub">WE CREATE THINGS YOU CAN FEEL. <span>↓</span></div></section>

        <section className="mosaic" id="work" aria-label="BLUE creative work concepts"><div className="mosaic-grid">
          <MediaTile number={1} className="mosaic-a" label="FORM / 001" /><MediaTile number={3} className="mosaic-b" label="OBJECT / 002" /><MediaTile number={2} className="mosaic-c" label="PORTRAIT / 003" />
          <MediaTile number={4} className="mosaic-d" label="BLUE / 004" /><div className="mosaic-type"><span>BLUE / CREATIVE / STUDIO</span><strong>MAKE<br />WAVES<span>✳</span></strong><small>IDEAS BUILT TO BE FELT.</small></div><MediaTile number={6} className="mosaic-e" label="MOTION / 005" />
          <MediaTile number={5} className="mosaic-f" label="IMAGE / 006" /><MediaTile number={8} className="mosaic-g" label="CULTURE / 007" /><MediaTile number={9} className="mosaic-h" label="FUTURE / 008" /><MediaTile number={7} className="mosaic-i" label="SPACE / 009" />
        </div></section>

        <section className="already" aria-labelledby="alreadyTitle"><div className="section-index">03 / SELECTED THINKING <span>CONCEPT WORK / 2026</span></div><h2 id="alreadyTitle" className="reveal">IF YOU<br />ALREADY<br />KNOW US.</h2><p>Тэгвэл бидний хийж чадах зүйлийг хар. Доорх нь BLUE-ийн арга барилыг үзүүлэх концепт ажлууд.</p></section>

        <section className="work-list" aria-label="Portfolio concepts">{work.map(item => <article className="work-card" key={item.number}>
          <div className="work-card-top"><span>{item.number} / BLUE STUDIO</span><span>{item.type}</span></div>
          <div className="work-card-content"><div><h3>{item.title}</h3><p>{item.description}</p></div><div className="work-thumb"><img src={image(item.image)} alt={`${item.title} concept visual`} loading="lazy" /></div></div>
          <div className="work-card-foot"><span>CONCEPT CASE / 2026</span><span aria-hidden="true">↗</span></div>
        </article>)}</section>

        <section className="services" id="services" aria-labelledby="servicesTitle"><div className="section-index">04 / WHAT WE DO <span>THE BLUE SYSTEM</span></div><div className="services-title"><h2 id="servicesTitle">CREATIVE<br /><span>SERVICES</span></h2><div className="services-orbit" aria-hidden="true">✳</div><p>Нэг санаа. Олон хэлбэр. Нэг зорилго: нөлөө.</p></div><div className="service-line" aria-hidden="true"><span /><span /><span /><span /></div><div className="service-grid">{services.map(service => <article className="service-card" key={service.no}><div className="service-card-top"><span>{service.no} / BLUE®</span><span>↗</span></div><img src={image(service.image)} alt="" loading="lazy" /><h3>{service.name}</h3><span className="service-label">{service.label}</span><ul>{service.points.map(point => <li key={point}>{point}</li>)}</ul></article>)}</div></section>

        <section className="faq" aria-labelledby="faqTitle"><div className="section-index">05 / NO BULLSHIT, JUST ANSWERS <span>FAQ ↓</span></div><h2 id="faqTitle">ANY<br />QUESTIONS?</h2><div className="faq-list">{questions.map((item, index) => <div className={activeQuestion === index ? 'faq-item active' : 'faq-item'} key={item.q}><button type="button" aria-expanded={activeQuestion === index} onClick={() => setActiveQuestion(activeQuestion === index ? null : index)}><span>{String(index).padStart(2, '0')} / {item.q}</span><span aria-hidden="true">{activeQuestion === index ? '×' : '↘'}</span></button>{activeQuestion === index && <p>{item.a}</p>}</div>)}</div></section>

        <section className="contact" id="contact" aria-labelledby="contactTitle"><div className="section-index">06 / YOUR MOVE <span>LET'S MAKE WAVES</span></div><h2 id="contactTitle">READY TO<br />MAKE SOME<br /><span>NOISE?</span></h2><div className="contact-cards"><div><small>IF YOU HAVE AN IDEA</small><button type="button" onClick={() => { setContactOpen(!contactOpen); setTimeout(() => emailRef.current?.focus(), 0); }}>TALK TO BLUE ↗</button></div><div className="contact-logo">BLUE<span>®</span><small>INDEPENDENT CREATIVE AGENCY</small></div><div><small>IF YOU HAVE A QUESTION</small><a href="#faqTitle">FIND ANSWERS ↗</a></div></div>{contactOpen && <div className="contact-form"><label htmlFor="agencyEmail">BLUE агентлагийн бодит имэйл хаяг</label><div><input ref={emailRef} id="agencyEmail" type="email" required placeholder="name@example.com" autoComplete="email" /><button type="button" onClick={openEmail}>EMAIL ↗</button></div><p>Демо загварт имэйл тохируулаагүй. BLUE-ийн хаягийг оруулбал имэйл апп нээгдэнэ.</p></div>}</section>
      </main>
      <footer><span>BLUE® / ULAANBAATAR</span><span>GOOD IDEAS DON'T WHISPER.</span><a href="#top">BACK TO TOP ↑</a><span>© {new Date().getFullYear()} BLUE</span></footer>
    </div>
  </>;
}
