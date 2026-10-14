import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { Link, Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import { ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, Clock3, MapPin, Menu, Phone, X } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import heroLab from '@assets/WhatsApp_Image_2026-10-14_at_4.07.43_PM_1791984016031.jpeg';
import labSecond from '@assets/WhatsApp_Image_2026-10-14_at_4.08.22_PM_1791984016033.jpeg';
import eventPhotoOne from '@assets/WhatsApp_Image_2026-10-14_at_4.08.24_PM_(1)_1791984016033.jpeg';
import eventPhotoTwo from '@assets/WhatsApp_Image_2026-10-14_at_4.08.24_PM_1791984016034.jpeg';
import exteriorOne from '@assets/WhatsApp_Image_2026-10-14_at_4.09.45_PM_1791984016034.jpeg';
import exteriorTwo from '@assets/WhatsApp_Image_2026-10-14_at_4.10.05_PM_1791984016034.jpeg';
import exteriorThree from '@assets/WhatsApp_Image_2026-10-14_at_4.30.06_PM_1791984016035.jpeg';

const PHONE = '+91 9852556719';
const WHATSAPP = '919852556719';
const EMAIL = 'mdzahid6@gmail.com';
const ADDRESS = 'Zahid Market, Gausnagar, Runnisaidpur, Sitamarhi, Bihar 843117, India';
const MAPS = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`;
const navItems = [['Home', '/'], ['About', '/about'], ['Courses', '/courses'], ['Gallery', '/gallery'], ['Admissions', '/admissions'], ['Contact', '/contact']] as const;
const courses = [
  { code: 'ADCA', title: 'Advanced Diploma in Computer Applications', duration: '12 months', total: '₹6,200', desc: 'A longer-format route for learners seeking a broad foundation in computer applications and office productivity.', topics: ['Computer fundamentals', 'Office productivity tools', 'Internet and file management'] },
  { code: 'DCA', title: 'Diploma in Computer Applications', duration: '6 months', total: '₹3,200', desc: 'A focused diploma course for building familiarity with everyday computer use and common applications.', topics: ['Computer and operating-system basics', 'Files and folders', 'Common office applications'] },
  { code: 'TALLY', title: 'Tally Accounting Course', duration: '6 months', total: '₹3,200', desc: 'Learn the foundations of working with computerised accounting software through guided, practical sessions.', topics: ['Accounting fundamentals', 'Ledger and invoice workflows', 'Basic accounting reports'] },
  { code: 'TYPING', title: 'Computer Typing Course', duration: '1–3 months', total: '₹700–₹1,700', desc: 'Practice keyboard familiarity, accuracy and typing rhythm at a duration that suits your learning goals.', topics: ['Keyboard familiarity', 'Accuracy practice', 'Typing rhythm and speed-building'] },
  { code: 'BASIC COMPUTER', title: 'Basic Computer Training', duration: '3–6 months', total: '₹1,700–₹3,200', desc: 'A welcoming starting point for learners who want to become more comfortable using a computer.', topics: ['Computer components and basics', 'Files, folders and typing', 'Common applications and internet use'] },
];
const gallery = [
  { src: heroLab, category: 'Lab', label: 'Computer lab with student workstations', width: 1024, height: 768 },
  { src: labSecond, category: 'Lab', label: 'A second view of the computer training lab', width: 1024, height: 768 },
  { src: eventPhotoOne, category: 'Classroom', label: 'Learners gathered for a classroom session', width: 1024, height: 768 },
  { src: eventPhotoTwo, category: 'Classroom', label: 'Classroom gathering during a learning session', width: 1024, height: 768 },
  { src: exteriorOne, category: 'Exterior', label: 'Approach to Zahid Market and the institute entrance', width: 576, height: 1024 },
  { src: exteriorTwo, category: 'Exterior', label: 'Street-side view of Zahid Market, Gausnagar', width: 1024, height: 576 },
  { src: exteriorThree, category: 'Exterior', label: 'Wider exterior view of the building and market frontage', width: 1024, height: 576 },
];
const pageMeta: Record<string, { title: string; description: string }> = {
  '/': { title: 'Zahid Computer Education | Practical Computer Courses', description: 'Explore affordable, practical computer training in Gausnagar, Runnisaidpur, Sitamarhi. Five courses, clear fees and local admission enquiries.' },
  '/about': { title: 'About Zahid Computer Education | Gausnagar', description: 'Meet Zahid Computer Education in Gausnagar, Runnisaidpur: a neighborhood institute focused on practical, affordable computer learning.' },
  '/courses': { title: 'Computer Courses & Fees | Zahid Computer Education', description: 'Compare ADCA, DCA, Tally, Typing and Basic Computer course durations and transparent fee breakdowns at Zahid Computer Education.' },
  '/gallery': { title: 'Institute Gallery | Zahid Computer Education', description: 'See authentic photographs of the Zahid Computer Education computer lab, classroom gatherings and Gausnagar location.' },
  '/admissions': { title: 'Admissions | Zahid Computer Education, Sitamarhi', description: 'Ask about computer course admission at Zahid Computer Education. Share your details to prepare a WhatsApp enquiry for review.' },
  '/contact': { title: 'Contact & Directions | Zahid Computer Education', description: 'Contact Zahid Computer Education by phone, email or WhatsApp, or get directions to Zahid Market, Gausnagar, Runnisaidpur.' },
  '/404': { title: 'Page not found | Zahid Computer Education', description: 'The page you are looking for could not be found. Return to Zahid Computer Education.' },
};

function Seo({ path }: { path: string }) {
  const meta = pageMeta[path] ?? pageMeta['/404'];
  useEffect(() => {
    document.title = meta.title;
    const setMeta = (selector: string, attr: string, value: string) => {
      let tag = document.head.querySelector(selector) as HTMLMetaElement | null;
      if (!tag) { tag = document.createElement('meta'); document.head.appendChild(tag); }
      tag.setAttribute(attr, value);
    };
    setMeta('meta[name="description"]', 'content', meta.description);
    setMeta('meta[property="og:title"]', 'content', meta.title);
    setMeta('meta[property="og:description"]', 'content', meta.description);
    setMeta('meta[property="og:type"]', 'content', 'website');
    setMeta('meta[property="og:url"]', 'content', window.location.href);
    setMeta('meta[name="twitter:title"]', 'content', meta.title);
    setMeta('meta[name="twitter:description"]', 'content', meta.description);
    let canonical = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical); }
    canonical.href = `${window.location.origin}${path}`;
  }, [path, meta.description, meta.title]);
  return null;
}

function Header() {
  const [path] = useLocation();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [path]);
  return <>
    <div className="info-bar"><div className="container-site info-bar-inner">
      <span><strong>Location:</strong> Gausnagar, Runnisaidpur, Sitamarhi</span>
      <a href="tel:+919852556719"><strong>Phone:</strong> {PHONE}</a>
      <a href={`mailto:${EMAIL}`}><strong>Email:</strong> {EMAIL}</a>
    </div></div>
    <header className="site-header">
      <div className="container-site nav-inner">
      <Link href="/" className="brand" aria-label="Zahid Computer Education home">
        <span className="brand-mark" aria-hidden="true">Z</span>
        <span className="brand-copy"><span className="brand-title">Zahid Computer Education</span><span className="brand-sub"><img className="drishti-logo" src="/images/drishti-logo.webp" width="24" height="24" alt="Drishti Computer Education logo" />Affiliated with Drishti Computer Education</span></span>
      </Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        {navItems.map(([label, href]) => <Link key={href} href={href} aria-current={path === href ? 'page' : undefined}>{label}</Link>)}
        <Link href="/admissions" className="btn btn-gold">Enquire now <ArrowUpRight size={16} /></Link>
      </nav>
      <button className="mobile-toggle" type="button" aria-label={open ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={open} onClick={() => setOpen(!open)} data-testid="button-mobile-menu">{open ? <X /> : <Menu />}</button>
      </div>
      {open && <nav className="mobile-nav" aria-label="Mobile navigation">
        {navItems.map(([label, href]) => <Link key={href} href={href} aria-current={path === href ? 'page' : undefined}>{label}</Link>)}
        <Link href="/admissions">Ask about admissions</Link>
      </nav>}
    </header>
  </>;
}

function Footer() {
  return <footer className="site-footer">
    <div className="container-site">
      <div className="footer-grid">
        <div><Link href="/" className="brand"><span className="brand-mark">Z</span><span><span className="brand-title" style={{ color: '#fffaf0' }}>Zahid Computer Education</span><span className="brand-sub" style={{ color: '#d0b76c' }}>Affiliated with Drishti Computer Education</span></span></Link><p>Practical computer learning, close to home in Gausnagar, Runnisaidpur.</p></div>
        <div><h3>Explore</h3><div className="footer-links">{navItems.slice(1).map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</div></div>
        <div><h3>Visit or get in touch</h3><p>{ADDRESS}</p><div className="footer-links"><a href="tel:+919852556719">Call {PHONE}</a><a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer"><FaWhatsapp className="whatsapp-inline-icon" aria-hidden="true" /> WhatsApp</a><a href={`mailto:${EMAIL}`}>{EMAIL}</a><a href={MAPS} target="_blank" rel="noreferrer">Directions on Google Maps</a></div></div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Zahid Computer Education</span><span>Director: Md. Zahid</span></div>
    </div>
  </footer>;
}

function WhatsAppFloat() {
  const href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent('Hello, I would like to enquire about courses at Zahid Computer Education.')}`;
  return <a className="whatsapp-float" href={href} target="_blank" rel="noopener noreferrer" aria-label="Open WhatsApp to enquire"><FaWhatsapp className="whatsapp-float-icon" aria-hidden="true" /><span>WhatsApp</span></a>;
}

function CourseCards({ compact = false }: { compact?: boolean }) {
  return <div className="course-grid">{courses.map((course) => <article className="course-card card" key={course.code}>
    <span className="course-code">{course.code}</span><h3>{course.title}</h3><p>{course.desc}</p>
    <div className="course-meta"><span><Clock3 size={14} style={{ verticalAlign: 'middle', marginRight: 5 }} />{course.duration}</span></div>
    <div className="fee-lines course-card-fees"><span>Monthly fee: <strong>₹500</strong></span><span>Registration (once): <strong>₹200</strong></span><span>Total: <strong>{course.total}</strong></span></div>
    {compact && <div className="course-card-actions"><Link className="text-link" href={`/courses#${course.code.toLowerCase().replaceAll(' ', '-')}`}>Course details <ArrowRight size={15} /></Link><Link className="course-enquiry" href={`/admissions?course=${encodeURIComponent(course.code)}`}>Enquire <ArrowRight size={15} /></Link></div>}
  </article>)}</div>;
}

function Home() {
  return <>
    <Seo path="/" />
    <main>
      <section className="hero">
        <div className="container-site hero-grid">
          <div className="hero-copy"><span className="eyebrow" style={{ color: '#dfbd68' }}>A neighborhood institute in Gausnagar</span>
            <h1>Build Your Digital Future with <em>Zahid Computer Education</em></h1>
            <p>Practical Computer Training at Affordable Fees in Runnisaidpur, Sitamarhi.</p>
            <p className="hero-fee">₹500 per month · One-Time Registration Fee: ₹200</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 29 }}>
              <a href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent('Hello Zahid Computer Education, I would like to enquire about courses.')}`} className="btn btn-gold" target="_blank" rel="noopener noreferrer"><FaWhatsapp className="whatsapp-inline-icon" aria-hidden="true" /> Enquire on WhatsApp</a>
              <Link href="/courses" className="btn" style={{ color: '#fffaf0', borderColor: '#738095' }}>Explore courses <ArrowDownRight size={17} /></Link>
            </div>
            <p style={{ fontSize: '.82rem', marginTop: 19 }}>Affiliated with Drishti Computer Education</p>
          </div>
          <div className="hero-photo-wrap"><img className="photo hero-photo" src={heroLab} width="1024" height="768" alt="Zahid Computer Education lab with desktop computers arranged for hands-on practice" fetchPriority="high" /><div className="hero-stamp">Learn by doing.<br />At your own pace.</div></div>
        </div>
      </section>
      <section className="container-site" aria-label="Institute highlights">
        <div className="stats">
          {[['₹500', 'per month'], ['5', 'official courses'], ['1–12', 'month durations'], ['Practical', 'learning approach']].map(([value, label]) => <div className="stat" key={label}><strong>{value}</strong><span>{label}</span></div>)}
        </div>
      </section>
      <section className="section-pad container-site">
        <div className="section-heading"><div><span className="eyebrow">Choose a starting point</span><h2>Five courses. One clear fee structure.</h2></div><p>Find the course duration that works for you, then ask us directly about admission and class details.</p></div>
        <CourseCards compact />
        <div style={{ textAlign: 'center', marginTop: 32 }}><Link className="btn btn-outline" href="/courses">See course fee breakdown <ArrowRight size={16} /></Link></div>
      </section>
      <section className="section-pad" style={{ background: '#efecdf' }}>
        <div className="container-site split">
          <div><img className="photo" src={exteriorTwo} width="1024" height="576" alt="Zahid Computer Education location at Zahid Market in Gausnagar" loading="lazy" /></div>
          <div className="split-copy"><span className="eyebrow">Learning, locally</span><h2>A practical place to begin with computers.</h2><p>Zahid Computer Education is a neighborhood computer-training institute in Gausnagar, Runnisaidpur. Learners can explore a choice of five courses, with a straightforward monthly fee and one-time registration charge.</p><ul className="check-list"><li>Practical computer learning</li><li>Five courses with clear durations</li><li>₹500 monthly fee; ₹200 one-time registration</li><li>Affiliated with Drishti Computer Education</li></ul><Link className="btn btn-navy" href="/about">Get to know the institute <ArrowRight size={16} /></Link></div>
        </div>
      </section>
      <section className="section-pad dark-band">
        <div className="container-site"><div className="section-heading"><div><span className="eyebrow" style={{ color: '#dfbd68' }}>Why learn here</span><h2>Clear information. A welcoming first step.</h2></div><p>Useful details for learners and families deciding where to begin.</p></div>
          <div className="values-grid"><article className="value"><span className="number">01 / FEES</span><h3>Easy to understand</h3><p>Monthly fees are ₹500, with a one-time ₹200 registration fee. First month totals ₹700.</p></article><article className="value"><span className="number">02 / PLACE</span><h3>Rooted in Gausnagar</h3><p>Visit Zahid Market in Gausnagar, Runnisaidpur, Sitamarhi to ask about courses in person.</p></article><article className="value"><span className="number">03 / PRACTICE</span><h3>Learn through doing</h3><p>Practical learning is at the heart of the institute's approach. Ask about the course that fits you.</p></article></div>
        </div>
      </section>
      <section className="section-pad container-site">
        <div className="section-heading"><div><span className="eyebrow">A look around</span><h2>Real rooms. Real place.</h2></div><Link className="btn btn-outline" href="/gallery">View photo gallery <ArrowRight size={16} /></Link></div>
        <div className="photo-preview">
          {[gallery[0], gallery[2], gallery[4]].map((photo) => <Link key={photo.label} href="/gallery" aria-label={`View gallery: ${photo.label}`}><img src={photo.src} className="photo" width={photo.width} height={photo.height} alt={photo.label} loading="lazy" /></Link>)}
        </div>
      </section>
      <section className="director"><div className="container-site director-quote"><span className="eyebrow">A note from the director</span><blockquote>“At Zahid Computer Education, our aim is to make practical computer learning approachable and affordable for our local community.”</blockquote><span className="pending">Awaiting director approval</span><p style={{ marginBottom: 0, color: '#576071', fontWeight: 700 }}>Md. Zahid · Director</p></div></section>
      <section className="cta-band"><div className="container-site cta-row"><div className="cta-copy"><h2>Ready to Start Your Computer Learning Journey?</h2><p>Choose your course and enquire about admission today.</p></div><div className="cta-actions"><a href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent('Hello Zahid Computer Education, I would like to enquire about admission.')}`} className="btn btn-gold" target="_blank" rel="noopener noreferrer"><FaWhatsapp className="whatsapp-inline-icon" aria-hidden="true" /> Enquire on WhatsApp</a><a href="tel:+919852556719" className="btn btn-light-outline">Call Now <Phone size={17} /></a></div></div></section>
    </main>
  </>;
}

function PageHero({ kicker, title, desc }: { kicker: string; title: string; desc: string }) {
  return <section className="page-hero"><div className="container-site"><span className="eyebrow" style={{ color: '#dfbd68' }}>{kicker}</span><h1>{title}</h1><p>{desc}</p></div></section>;
}

function About() {
  return <><Seo path="/about" /><main><PageHero kicker="A little closer to home" title="About Zahid Computer Education" desc="A neighborhood computer-training institute at Zahid Market, Gausnagar, Runnisaidpur, Sitamarhi." />
    <section className="section-pad container-site">
      <div className="split">
        <div className="prose-copy content-narrow"><span className="eyebrow">The institute</span><h2 className="serif" style={{ fontSize: '2.5rem', color: '#182a45', margin: '12px 0 18px' }}>Practical learning, made approachable.</h2><p>Zahid Computer Education welcomes learners looking to build confidence with computers through practical training. The institute is directed by Md. Zahid and is located at Zahid Market in Gausnagar, Runnisaidpur, Sitamarhi.</p><p>The institute offers five courses: ADCA, DCA, Tally Accounting, Computer Typing and Basic Computer Training. Durations range from one to twelve months, depending on the course.</p><p>Our approach is centered on practical learning and clear, affordable fees. Course-specific details and any provisional syllabus should be confirmed directly with the institute.</p><div className="about-facts"><div className="fact"><small>Director</small><strong>Md. Zahid</strong></div><div className="fact"><small>Affiliation</small><strong>Affiliated with Drishti Computer Education</strong></div><div className="fact"><small>Monthly fee</small><strong>₹500 per month</strong></div><div className="fact"><small>Registration</small><strong>₹200 one-time</strong></div></div><Link className="btn btn-navy" href="/courses">Explore all courses <ArrowRight size={16} /></Link></div>
        <div><img className="photo" src={exteriorOne} width="576" height="1024" alt="Exterior approach to Zahid Market where Zahid Computer Education is located" loading="lazy" /><p style={{ color: '#74716a', fontSize: '.8rem' }}>At Zahid Market, Gausnagar · <a href={MAPS} target="_blank" rel="noreferrer">Get directions</a></p></div>
      </div>
    </section>
    <section className="section-pad" style={{ background: '#efecdf' }}><div className="container-site split"><img className="photo" src={exteriorThree} width="1024" height="576" alt="Building and street frontage around Zahid Market in Gausnagar" loading="lazy" /><div className="split-copy"><span className="eyebrow">Learning with clarity</span><h2>A simple, practical approach</h2><p>We want learners to have clear information before they begin: a course to explore, a duration to discuss, and a fee structure they can understand.</p><p>Course descriptions on this site are general introductions. Any detailed syllabus topics are provisional and should be confirmed with the institute.</p></div></div></section>
    <section className="director"><div className="container-site director-quote"><span className="eyebrow">From the director</span><blockquote>“We want learners in our community to have a welcoming place to start building practical computer skills.”</blockquote><span className="pending">Awaiting director approval</span><p style={{ color: '#576071', fontWeight: 700 }}>Md. Zahid · Director</p></div></section>
    <section className="cta-band"><div className="container-site cta-row"><h2>Come by Zahid Market or send a course enquiry.</h2><Link className="btn btn-navy" href="/contact">Contact the institute <ArrowRight size={16} /></Link></div></section>
  </main></>;
}

function Courses() {
  return <><Seo path="/courses" /><main><PageHero kicker="Course guide" title="Five practical courses" desc="Compare the available courses, durations and fee totals. Course totals use ₹500 per month plus a one-time ₹200 registration fee." />
    <section className="section-pad container-site">
      <div className="about-facts" style={{ maxWidth: 850, marginTop: 0 }}><div className="fact"><small>Monthly fee</small><strong>₹500 per month</strong></div><div className="fact"><small>One-time registration</small><strong>₹200</strong></div><div className="fact"><small>First month</small><strong>₹700 total</strong></div><div className="fact"><small>After first month</small><strong>₹500 per month</strong></div></div>
      <p className="form-note" style={{ margin: '12px 0 28px' }}>Course totals are based on the listed duration and the stated fee structure; they exclude any unconfirmed extra charges. For courses with a duration range, the total range reflects the minimum and maximum duration.</p>
      <div className="course-list">{courses.map((course) => <article className="course-detail card" id={course.code.toLowerCase().replaceAll(' ', '-')} key={course.code}><span className="course-code">{course.code}</span><h2>{course.title}</h2><p style={{ color: '#626970', lineHeight: 1.7 }}>{course.desc}</p><div className="fee-lines"><span>Duration: <strong>{course.duration}</strong></span><span>Tuition: <strong>₹500/month</strong></span><span>Registration: <strong>₹200 once</strong></span><span>Total based on duration: <strong>{course.total}</strong></span></div><div className="proposed-topics"><strong>Proposed learning topics · pending institute approval</strong><ul>{course.topics.map((topic) => <li key={topic}>{topic}</li>)}</ul></div><Link href={`/admissions?course=${encodeURIComponent(course.code)}`} className="btn btn-outline" style={{ marginTop: 22 }}>Ask about {course.code} <ArrowRight size={16} /></Link></article>)}</div>
      <div className="card" style={{ padding: 24, marginTop: 26 }}><strong style={{ color: '#182a45' }}>About syllabus details</strong><p style={{ color: '#626970', lineHeight: 1.7, marginBottom: 0 }}>Any syllabus topics discussed before institute confirmation should be treated as proposed and provisional pending institute approval. Ask the institute for current course details.</p></div>
    </section>
  </main></>;
}

function Gallery() {
  const filters = ['All', 'Lab', 'Classroom', 'Exterior'];
  const [filter, setFilter] = useState('All');
  const [active, setActive] = useState<number | null>(null);
  const shown = useMemo(() => gallery.map((image, index) => ({ ...image, index })).filter((image) => filter === 'All' || image.category === filter), [filter]);
  const current = active === null ? null : gallery[active];
  useEffect(() => {
    if (active === null) return;
    const handle = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActive(null);
      if (event.key === 'ArrowRight') setActive((n) => n === null ? 0 : (n + 1) % gallery.length);
      if (event.key === 'ArrowLeft') setActive((n) => n === null ? 0 : (n - 1 + gallery.length) % gallery.length);
    };
    window.addEventListener('keydown', handle);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', handle); document.body.style.overflow = ''; };
  }, [active]);
  return <><Seo path="/gallery" /><main><PageHero kicker="Inside Zahid Computer Education" title="A look around" desc="Authentic photographs of the computer lab, classroom gatherings and the institute's neighborhood location." />
    <section className="section-pad container-site"><div className="filter-row" role="group" aria-label="Filter gallery photos">{filters.map((item) => <button key={item} className="filter-btn" aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>)}</div>
      <div className="gallery-grid">{shown.map((item) => <button key={item.label} className="gallery-item" onClick={() => setActive(item.index)} aria-label={`Open photo: ${item.label}`}><img className="photo" src={item.src} width={item.width} height={item.height} alt={item.label} loading="lazy" /><span className="gallery-caption">{item.category} · {item.label}</span></button>)}</div>
    </section>
  </main>
  {current && <div className="lightbox" role="dialog" aria-modal="true" aria-label={`Photo: ${current.label}`} onClick={(event) => { if (event.target === event.currentTarget) setActive(null); }}>
    <div className="lightbox-controls"><button aria-label="Previous photo" onClick={() => setActive((active! - 1 + gallery.length) % gallery.length)}><ArrowLeft /></button><button aria-label="Next photo" onClick={() => setActive((active! + 1) % gallery.length)}><ArrowRight /></button><button aria-label="Close photo" onClick={() => setActive(null)}><X /></button></div>
    <figure><img src={current.src} alt={current.label} width={current.width} height={current.height} /><figcaption>{current.category} · {current.label} <span style={{ opacity: .7 }}>({active! + 1} of {gallery.length})</span></figcaption></figure>
  </div>}</>;
}

function AdmissionForm() {
  const requestedCourse = new URLSearchParams(window.location.search).get('course') || '';
  const courseMatch = courses.find((item) => item.code.toLowerCase() === requestedCourse.toLowerCase());
  const [course, setCourse] = useState(courseMatch?.code ?? '');
  const [status, setStatus] = useState('');
  const [errors, setErrors] = useState('');
  const isRangeCourse = course === 'TYPING' || course === 'BASIC COMPUTER';
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const mobile = String(data.get('mobile') || '').trim();
    const selected = String(data.get('course') || '');
    const duration = String(data.get('duration') || '');
    if (!/^[6-9]\d{9}$/.test(mobile.replace(/\D/g, '').slice(-10))) { setErrors('Enter a valid 10-digit Indian mobile number.'); return; }
    if ((selected === 'TYPING' || selected === 'BASIC COMPUTER') && !duration) { setErrors('Please choose a preferred duration.'); return; }
    const message = String(data.get('message') || '').trim();
    const courseRecord = courses.find((item) => item.code === selected);
    const text = [
      'Admission enquiry — Zahid Computer Education',
      `Name: ${name}`, `Mobile: ${mobile}`, `Course: ${courseRecord?.title ?? selected}`,
      ...(duration ? [`Preferred duration: ${duration}`] : []),
      ...(message ? [`Message: ${message}`] : []),
      'Fee: ₹500 per month + ₹200 one-time registration (first month ₹700).',
    ].join('\n');
    setErrors('');
    setStatus('WhatsApp is opening with your enquiry. Please review the message there and choose whether to send it. It has not been sent yet.');
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };
  return <form className="form-card card" onSubmit={submit} noValidate>
    <h2>Prepare a WhatsApp enquiry</h2><p className="form-note">Fill in the details and WhatsApp will open so you can review and send your message. This form does not submit to the institute.</p>
    <div className="field"><label htmlFor="name">Your name <span aria-hidden="true">*</span></label><input id="name" name="name" required maxLength={80} autoComplete="name" placeholder="Name" data-testid="input-name" /></div>
    <div className="field"><label htmlFor="mobile">Mobile number <span aria-hidden="true">*</span></label><input id="mobile" name="mobile" required type="tel" inputMode="tel" autoComplete="tel" pattern="[0-9+() -]{10,18}" placeholder="10-digit mobile number" data-testid="input-mobile" /></div>
    <div className="field"><label htmlFor="course">Course <span aria-hidden="true">*</span></label><select id="course" name="course" required value={course} onChange={(event) => setCourse(event.target.value)} data-testid="select-course"><option value="">Select a course</option>{courses.map((item) => <option key={item.code} value={item.code}>{item.code} — {item.title}</option>)}</select></div>
    {isRangeCourse && <div className="field"><label htmlFor="duration">Preferred duration <span aria-hidden="true">*</span></label><select id="duration" name="duration" required defaultValue=""><option value="">Choose a duration</option>{(course === 'TYPING' ? ['1 month', '2 months', '3 months'] : ['3 months', '4 months', '5 months', '6 months']).map((d) => <option key={d}>{d}</option>)}</select></div>}
    <div className="field"><label htmlFor="message">Message <span style={{ fontWeight: 400 }}>(optional)</span></label><textarea id="message" name="message" maxLength={700} placeholder="Anything you'd like to ask?" /></div>
    {errors && <p role="alert" style={{ color: '#a43c35' }}>{errors}</p>}
    {status && <p className="form-status" role="status">{status}</p>}
    <button className="btn btn-navy" type="submit" style={{ marginTop: 21, width: '100%' }}><FaWhatsapp className="whatsapp-inline-icon" aria-hidden="true" /> Continue to WhatsApp</button>
    <p className="form-note" style={{ margin: '14px 0 0' }}>If WhatsApp does not open, <a className="whatsapp-text-link" href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer"><FaWhatsapp className="whatsapp-inline-icon" aria-hidden="true" /> open a WhatsApp chat directly</a>.</p>
  </form>;
}

function Admissions() {
  return <><Seo path="/admissions" /><main><PageHero kicker="Your next step" title="Ask about admissions" desc="Tell us which course you are considering. We will prepare a WhatsApp message for you to review and send." />
    <section className="section-pad container-site admission-grid">
      <aside><span className="eyebrow">Before you enquire</span><h2 className="serif" style={{ fontSize: '2.3rem', color: '#182a45', margin: '12px 0 15px' }}>Straightforward fees, a personal conversation.</h2><p style={{ color: '#626970', lineHeight: 1.75 }}>Course admission enquiries go directly to the institute via WhatsApp. No information is submitted by this site. Please confirm current availability and course details with Md. Zahid.</p><div className="card" style={{ padding: 22, marginTop: 24 }}><strong style={{ color: '#182a45' }}>Fee structure</strong><p style={{ lineHeight: 1.8, color: '#626970', marginBottom: 0 }}>₹500 per month<br />₹200 one-time registration<br /><strong style={{ color: '#182a45' }}>First month: ₹700</strong><br />Subsequent months: ₹500</p></div><p style={{ marginTop: 24 }}><a href="tel:+919852556719" className="btn btn-outline"><Phone size={16} /> Call {PHONE}</a></p></aside>
      <AdmissionForm />
    </section>
  </main></>;
}

function Contact() {
  return <><Seo path="/contact" /><main><PageHero kicker="Find us in Gausnagar" title="Contact Zahid Computer Education" desc="Talk to the institute about the courses, fees or a visit to Zahid Market." />
    <section className="section-pad container-site admission-grid">
      <div className="contact-card card"><span className="eyebrow">Direct contact</span><h2 className="serif" style={{ fontSize: '2rem', color: '#182a45' }}>We’re easy to reach.</h2>
        <div className="contact-line"><span className="contact-icon"><Phone size={19} /></span><div><strong>Phone / WhatsApp</strong><a href="tel:+919852556719">{PHONE}</a><br /><a className="whatsapp-text-link" href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer"><FaWhatsapp className="whatsapp-inline-icon" aria-hidden="true" /> Open WhatsApp chat</a></div></div>
        <div className="contact-line"><span className="contact-icon">@</span><div><strong>Email</strong><a href={`mailto:${EMAIL}`}>{EMAIL}</a></div></div>
        <div className="contact-line"><span className="contact-icon"><MapPin size={19} /></span><div><strong>Address</strong><a href={MAPS} target="_blank" rel="noreferrer">{ADDRESS}</a></div></div>
        <div className="contact-line"><span className="contact-icon"><BookOpen size={19} /></span><div><strong>Director</strong><span>Md. Zahid</span></div></div>
        <Link href="/admissions" className="btn btn-gold" style={{ marginTop: 18 }}>Ask about admission <ArrowRight size={16} /></Link>
      </div>
      <div><div className="card" style={{ padding: 10 }}><a href={MAPS} target="_blank" rel="noreferrer" aria-label="Open Google Maps directions to Zahid Computer Education"><img className="photo" src={exteriorTwo} alt="Street approach to Zahid Market in Gausnagar, the institute's listed address" width="1024" height="576" loading="lazy" style={{ height: 310 }} /></a></div><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginTop: 17 }}><p style={{ color: '#59636d', margin: 0 }}>Tap the photo or use the button for directions.</p><a className="btn btn-navy" href={MAPS} target="_blank" rel="noreferrer">Google Maps directions <ArrowUpRight size={16} /></a></div><p className="form-note">Zahid Market, Gausnagar, Runnisaidpur, Sitamarhi, Bihar 843117, India</p></div>
    </section>
  </main></>;
}

function NotFound() {
  return <><Seo path="/404" /><main className="not-found"><div><span className="eyebrow">Page not found</span><h1>Not this way.</h1><p style={{ color: '#5d6670', maxWidth: 480, lineHeight: 1.7 }}>That address doesn’t lead to a page here. Head back home or browse the available courses.</p><div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}><Link href="/" className="btn btn-navy">Back home</Link><Link href="/courses" className="btn btn-outline">Browse courses</Link></div></div></main></>;
}

function Router() {
  const [path] = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [path]);
  return <><Header /><Switch><Route path="/" component={Home} /><Route path="/about" component={About} /><Route path="/courses" component={Courses} /><Route path="/gallery" component={Gallery} /><Route path="/admissions" component={Admissions} /><Route path="/contact" component={Contact} /><Route component={NotFound} /></Switch><Footer /><WhatsAppFloat /></>;
}

function App() {
  return <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter>;
}

export default App;
