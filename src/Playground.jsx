import React, { useEffect, useRef, useState } from 'react';
import './playground.css';

const projects = [
  { title: 'ECHO', tag: 'IDENTITY / ART DIRECTION', image: 1, copy: 'Дуу хоолойтой брэнд. Хэлбэр, өнгө, мэдрэмжийг нэг визуал системд холбосон концепт.' },
  { title: 'FRAME', tag: 'CAMPAIGN / CULTURE', image: 2, copy: 'Хүмүүсийг зогсоож харах дүрслэл. Хүчтэй portrait, нэг тод санаа, олон формат.' },
  { title: 'OBJECT', tag: 'FORM / EXPERIENCE', image: 3, copy: 'Энгийн санааг онцгой туршлага болгох нь. Биет хэлбэр ба дижитал орон зайн уулзвар.' },
  { title: 'MOTION', tag: 'DIGITAL / MOVEMENT', image: 6, copy: 'Хөдөлгөөнд орсон шинэ өнцөг. Дэлгэц бүрд амилдаг брэндийн туршлага.' },
];
const disciplines = ['STRATEGY', 'IDENTITY', 'DIGITAL', 'CAMPAIGN'];
const img = n => `/images/blue-${n}.webp`;

function Sticker({ className = '', children, onClick, label }) {
  return <button type="button" className={`pg-sticker ${className}`} onClick={onClick} aria-label={label}>{children}</button>;
}

export default function Playground() {
  const scroller = useRef(null);
  const menuRef = useRef(null);
  const detailRef = useRef(null);
  const drag = useRef(null);
  const [progress, setProgress] = useState(0);
  const [slide, setSlide] = useState(0);
  const [service, setService] = useState(0);
  const [detail, setDetail] = useState(null);
  const [menu, setMenu] = useState(false);
  const [intro, setIntro] = useState(!window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const timer = setTimeout(() => setIntro(false), 1100);
    const el = scroller.current;
    const wheel = e => {
      if (e.ctrlKey || e.target.closest('dialog')) return;
      e.preventDefault();
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      el.scrollLeft += delta * (e.deltaMode === 1 ? 20 : e.deltaMode === 2 ? el.clientWidth : 1);
    };
    el.addEventListener('wheel', wheel, { passive: false });
    return () => { clearTimeout(timer); document.body.style.overflow = oldOverflow; el.removeEventListener('wheel', wheel); };
  }, []);

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = setInterval(() => setSlide(s => (s + 1) % projects.length), 4000);
    return () => clearInterval(timer);
  }, [paused]);

  useEffect(() => {
    if (menu) menuRef.current.showModal(); else menuRef.current.close();
  }, [menu]);
  useEffect(() => {
    if (detail) detailRef.current.showModal(); else detailRef.current.close();
  }, [detail]);

  function go(id) {
    const target = document.getElementById(id);
    if (target) scroller.current.scrollTo({ left: target.offsetLeft - 28, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    setMenu(false);
  }
  function nudge(direction) { scroller.current.scrollBy({ left: direction * scroller.current.clientWidth * .7, behavior: 'smooth' }); }
  function pointerDown(e) {
    if (e.pointerType !== 'mouse' || e.button !== 0 || e.target.closest('button,a,input')) return;
    drag.current = { x: e.clientX, left: scroller.current.scrollLeft, moved: false };
    scroller.current.setPointerCapture(e.pointerId);
    scroller.current.classList.add('dragging');
  }
  function pointerMove(e) {
    if (!drag.current) return;
    const delta = e.clientX - drag.current.x;
    if (Math.abs(delta) > 5) drag.current.moved = true;
    scroller.current.scrollLeft = drag.current.left - delta;
  }
  function pointerUp() { drag.current = null; scroller.current.classList.remove('dragging'); }

  return <div className="playground">
    {intro && <div className="pg-intro" aria-hidden="true"><span>BLUE®</span><small>A DIFFERENT WAY TO MAKE WAVES →</small></div>}
    <header className="pg-header"><button className="pg-menu-button" onClick={() => setMenu(true)} aria-label="Open playground menu"><span /><span /><span /></button><a className="pg-logo" href="#top" aria-label="Return to BLUE Studio">BLUE<sup>®</sup></a><p>THE NEXT BIG IDEA<br />COULD BE YOURS.</p><button className="pg-oval" onClick={() => go('pg-end')}>LET'S TALK! ✳</button></header>
    <main className="pg-scroll" ref={scroller} tabIndex={0} aria-label="BLUE horizontal playground. Scroll, drag, or use arrow keys to explore." onScroll={() => { const el = scroller.current; setProgress(el.scrollLeft / (el.scrollWidth - el.clientWidth || 1)); }} onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerUp} onPointerCancel={pointerUp} onLostPointerCapture={pointerUp} onKeyDown={e => { if (e.target !== e.currentTarget) return; if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); nudge(e.key === 'ArrowRight' ? 1 : -1); } if(e.key === 'Home') {e.preventDefault();go('pg-start');} if(e.key === 'End') {e.preventDefault();go('pg-end');} }}>
      <div className="pg-canvas">
        <section className="pg-object" id="pg-start" aria-label="BLUE creative studio"><div className="pg-orb"><div className="pg-orb-glint" /><span>BLUE</span><small>IDEAS WITH<br />A PULSE.</small><i>✳</i></div><Sticker className="pg-club" onClick={() => go('pg-end')} label="Start a project"><strong>BLUE<br /><em>Creative Club</em></strong><small>YOUR NEXT BIG THING<br />STARTS RIGHT HERE</small><b>LET'S MAKE IT ↗</b></Sticker><span className="pg-object-label">Independent creative agency ↗<br />ULAANBAATAR / EVERYWHERE</span></section>
        <section className="pg-collection" id="pg-collection" aria-label="Creative collection"><span className="pg-kicker">B26 <span>↗</span></span><button className="pg-big-link" onClick={() => setDetail(projects[slide])}>COLLECTION</button><div className="pg-discipline-links">{disciplines.map((name,i) => <React.Fragment key={name}><button onClick={() => {setService(i);go('pg-system');}}>{name}</button>{i < 3 && ' / '}</React.Fragment>)}</div><span className="pg-small-caption">HERE'S OUR CREATIVE MENU</span><Sticker className="pg-small-sticker" onClick={() => go('pg-system')} label="Explore BLUE services">BIG IDEAS<br /><small>NO SMALL THINKING</small>↗</Sticker></section>
        <section className="pg-world" id="pg-world" aria-label="BLUE world"><span className="pg-kicker">◎ FOR THE CURIOUS PEOPLE</span><h1>BLUE WORLD</h1><Sticker className="pg-world-sticker" onClick={() => setDetail(projects[2])} label="Explore Object concept"><span>◎</span><strong>BLUE [UNVRS]</strong><small>INDEPENDENT IDEAS<br />UNLIMITED POSSIBILITIES</small></Sticker><div className="pg-world-tag"><small>WE GIVE IDEAS A VOICE<br />@BLUE / CREATIVE STUDIO</small><button onClick={() => go('pg-system')}>BLUE<span>✦</span></button><span>✧ &nbsp; ☺</span></div><div className="pg-photo-strip"><button className="pg-photo pg-portrait" onClick={() => setDetail(projects[1])}><img src={img(2)} alt="BLUE FRAME portrait concept" draggable="false"/><span>FRAME / CULTURE ↗</span></button><button className="pg-photo pg-changing" onClick={() => setDetail(projects[slide])}><img key={slide} src={img(projects[slide].image)} alt={`${projects[slide].title} creative concept`} draggable="false"/><span>{projects[slide].title} / CONCEPT ↗</span><i>BLUE BLUE BLUE BLUE</i></button><button className="pg-photo" onClick={() => setDetail(projects[3])}><img src={img(6)} alt="BLUE digital motion concept" draggable="false"/><span>DIGITAL / NEW DIMENSIONS ↗</span></button></div><div className="pg-gallery-controls"><span>CONCEPT WORK / {String(slide+1).padStart(2,'0')}</span><div>{projects.map((p,i) => <button key={p.title} className={slide===i?'active':''} aria-label={`Show ${p.title}`} aria-pressed={slide===i} onClick={() => setSlide(i)} />)}<button className="pg-pause" onClick={() => setPaused(!paused)} aria-label={paused?'Play gallery':'Pause gallery'}>{paused?'▶':'Ⅱ'}</button></div></div></section>
        <section className="pg-system" id="pg-system" aria-label="Creative services"><h2>FAST,<br /><i>GOOD</i><br />& LOUD.</h2><Sticker className="pg-system-sticker" onClick={() => go('pg-end')} label="Discuss a creative project">MAKE<br />WAVES ✳</Sticker><div className="pg-service-tabs" role="tablist" aria-label="Creative disciplines">{disciplines.map((name,i)=><button role="tab" tabIndex={service===i?0:-1} id={`pg-tab-${i}`} aria-selected={service===i} aria-controls="pg-service-panel" className={service===i?'active':''} key={name} onClick={() => setService(i)} onKeyDown={e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();const next=(i+(e.key==='ArrowRight'?1:3))%4;setService(next);document.getElementById(`pg-tab-${next}`).focus();}}}>{name}</button>)}</div><div className="pg-service-panel" id="pg-service-panel" role="tabpanel" aria-labelledby={`pg-tab-${service}`}><strong>0{service+1} / {disciplines[service]}</strong><p>{['Брэндийн чиглэл. Судалгаа, байршуулалт, хүчтэй санаа.','Брэндийн дүр. Визуал систем, арт директор, дизайн.','Дэлгэцэнд амилуулах. Веб, интерактив туршлага, motion.','Хүмүүст хүргэх. Кампанит санаа, контент, олон суваг.'][service]}</p></div></section>
        <section className="pg-end" id="pg-end" aria-label="Work with BLUE"><div className="pg-end-photo"><img src={img(9)} alt="BLUE future creative concept" draggable="false"/><span>THE FUTURE IS BLUE.</span></div><h2>YOUR IDEA.<br />OUR ENERGY.</h2><a href="#contact" className="pg-end-cta">START SOMETHING ↗</a><a href="#top" className="pg-return">← BACK TO BLUE STUDIO</a><small>ONE STUDIO. MANY WAYS TO MAKE WAVES.</small></section>
      </div>
    </main>
    <footer className="pg-footer"><nav aria-label="Playground sections"><button onClick={()=>go('pg-collection')}>COLLECTION</button><button onClick={()=>go('pg-world')}>BLUE WORLD</button><button onClick={()=>go('pg-system')}>SERVICES</button><a href="#top">STUDIO ↗</a><button onClick={()=>go('pg-end')}>LET'S TALK</button></nav><div className="pg-scroll-controls"><span>DRAG / SCROLL →</span><button onClick={()=>nudge(-1)} aria-label="Scroll left">←</button><button onClick={()=>nudge(1)} aria-label="Scroll right">→</button></div><div className="pg-progress"><span style={{width:`${Math.max(2,progress*100)}%`}} /></div></footer>
    <dialog className="pg-menu" aria-label="Playground navigation" ref={menuRef} onCancel={()=>setMenu(false)} onClick={e=>{if(e.target===e.currentTarget)setMenu(false)}}><div className="pg-dialog-top"><span>BLUE® / CHOOSE YOUR WORLD</span><button onClick={()=>setMenu(false)} aria-label="Close menu">×</button></div><a href="#top">BLUE STUDIO ↗<small>THE ORIGINAL EXPERIENCE</small></a><button onClick={()=>{go('pg-start')}}>PLAYGROUND →<small>THE HORIZONTAL EXPERIENCE</small></button><button onClick={()=>go('pg-collection')}>COLLECTION</button><button onClick={()=>go('pg-system')}>SERVICES</button><button onClick={()=>go('pg-end')}>LET'S TALK ↗</button></dialog>
    <dialog className="pg-detail" aria-label="Creative project detail" ref={detailRef} onCancel={()=>setDetail(null)} onClick={e=>{if(e.target===e.currentTarget)setDetail(null)}}>{detail&&<><div className="pg-dialog-top"><span>{detail.tag} / CONCEPT WORK</span><button onClick={()=>setDetail(null)} aria-label="Close project">×</button></div><img src={img(detail.image)} alt={`${detail.title} concept in detail`}/><h2>{detail.title}</h2><p>{detail.copy}</p><a href="#contact">LET'S MAKE YOURS ↗</a></>}</dialog>
  </div>;
}
