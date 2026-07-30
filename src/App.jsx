import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, RadialLinearScale, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Bar, Line, Doughnut, Radar } from 'react-chartjs-2';
import Navbar from './components/Navbar';
import { useApp } from './context/AppContext';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, RadialLinearScale, Title, Tooltip, Legend, Filler);

/* ══════════════════════════════════════════════════════════════
   SafeRide — Full React App
   Ported from the standalone index.html so the Vite/React
   frontend is fully functional (not just a blank page).
══════════════════════════════════════════════════════════════ */

/* ─── Student mock data (mirrors backend mockData.js) ─── */
const INITIAL_STUDENTS = [
  { id: 1, n: 'Aisha Rahman',    ini: 'AR', gr: 'Grade 5', stop: 'Johar Town Stop 1', st: 'present', time: '7:32 AM' },
  { id: 2, n: 'Bilal Hussain',   ini: 'BH', gr: 'Grade 6', stop: 'Garden Town Gate',  st: 'present', time: '7:38 AM' },
  { id: 3, n: 'Fatima Noor',     ini: 'FN', gr: 'Grade 4', stop: 'Gulberg Main Blvd', st: 'present', time: '7:45 AM' },
  { id: 4, n: 'Hassan Ali',      ini: 'HA', gr: 'Grade 7', stop: 'Model Town Chowk',  st: 'absent',  time: '—' },
  { id: 5, n: 'Zainab Malik',    ini: 'ZM', gr: 'Grade 3', stop: 'Johar Town Stop 2', st: 'present', time: '7:35 AM' },
  { id: 6, n: 'Omar Sheikh',     ini: 'OS', gr: 'Grade 8', stop: 'DHA Phase 1 Gate',  st: 'pending', time: '—' },
  { id: 7, n: 'Sara Iqbal',      ini: 'SI', gr: 'Grade 5', stop: 'Cavalry Ground',    st: 'present', time: '7:50 AM' },
  { id: 8, n: 'Ahmed Raza',      ini: 'AR', gr: 'Grade 6', stop: 'Garden Town Gate',  st: 'absent',  time: '—' },
  { id: 9, n: 'Mariam Khan',     ini: 'MK', gr: 'Grade 4', stop: 'Johar Town Stop 1', st: 'present', time: '7:33 AM' },
  { id: 10, n: 'Umar Farooq',    ini: 'UF', gr: 'Grade 7', stop: 'Model Town Chowk',  st: 'pending', time: '—' },
  { id: 11, n: 'Laiba Tahir',    ini: 'LT', gr: 'Grade 3', stop: 'Gulberg Main Blvd', st: 'present', time: '7:46 AM' },
  { id: 12, n: 'Kamran Baig',    ini: 'KB', gr: 'Grade 5', stop: 'Cavalry Ground',    st: 'absent',  time: '—' },
  { id: 13, n: 'Ayesha Siddiqui', ini: 'AS', gr: 'Grade 6', stop: 'Johar Town Stop 3', st: 'present', time: '7:40 AM' },
  { id: 14, n: 'Danish Mehmood', ini: 'DM', gr: 'Grade 4', stop: 'Johar Town Stop 2', st: 'pending', time: '—' },
  { id: 15, n: 'Hira Baig',      ini: 'HB', gr: 'Grade 5', stop: 'DHA Phase 1 Gate',  st: 'present', time: '7:52 AM' },
];

/* ═══════════════════════════════════════════════════
   HERO SECTION
═══════════════════════════════════════════════════ */
function HeroSection() {
  const canvasRef = useRef(null);

  /* animated counters */
  const [ctr1, setCtr1] = useState(0);
  const [ctr2, setCtr2] = useState(0);
  const [ctr3, setCtr3] = useState(0);
  const [ctr4, setCtr4] = useState(0);

  useEffect(() => {
    const animate = (setter, target) => {
      let cur = 0;
      const step = target / 80;
      const t = setInterval(() => {
        cur = Math.min(cur + step, target);
        setter(Math.floor(cur));
        if (cur >= target) clearInterval(t);
      }, 18);
      return t;
    };
    const t1 = animate(setCtr1, 1200);
    const t2 = animate(setCtr2, 8400);
    const t3 = animate(setCtr3, 14);
    const t4 = animate(setCtr4, 240);
    return () => { clearInterval(t1); clearInterval(t2); clearInterval(t3); clearInterval(t4); };
  }, []);

  /* particle canvas */
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    let W, H, particles = [], rafId;
    function resize() { W = c.width = window.innerWidth; H = c.height = window.innerHeight; }
    resize(); window.addEventListener('resize', resize);
    for (let i = 0; i < 55; i++) particles.push({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 2 + 0.5, dx: (Math.random() - 0.5) * 0.3, dy: -(Math.random() * 0.4 + 0.15), op: Math.random() * 0.6 + 0.2 });
    function draw() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,200,83,${p.op})`; ctx.fill();
        p.x += p.dx; p.y += p.dy;
        if (p.y < -5) { p.y = H + 5; p.x = Math.random() * W; }
        if (p.x < -5 || p.x > W + 5) { p.x = Math.random() * W; p.y = H + 5; }
      });
      rafId = requestAnimationFrame(draw);
    }
    draw();
    return () => { cancelAnimationFrame(rafId); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <section className="hero" id="home" aria-label="Hero">
      <div className="hero-bg" aria-hidden="true" />
      <div className="hero-grid" aria-hidden="true" />
      <canvas className="hero-particles" ref={canvasRef} aria-hidden="true" />
      <div className="hero-content">
        <div className="hero-eyebrow">
          <span className="badge b-green">🇵🇰 Made for Pakistan</span>
          <span className="badge b-teal">✅ 1,200+ Verified Drivers</span>
        </div>
        <h1>Pakistan ka <span className="hl">Sabse Mehfooz</span><br />School Van App</h1>
        <span className="hero-urdu">بچوں کا محفوظ سفر — ہمارا وعدہ ہے</span>
        <p className="hero-sub">Real-time GPS tracking · Verified drivers · Parental controls · Live attendance<br />Built exclusively for Pakistani schools &amp; families.</p>
        <div className="hero-cta">
          <a href="#driver" className="btn-hero-p">🚐 Register as Driver</a>
          <a href="#parental" className="btn-hero-o">📍 Track My Child</a>
        </div>
        <div className="hero-stats">
          <div><div className="hs-num">{ctr1.toLocaleString()}+</div><div className="hs-label">Registered Drivers</div></div>
          <div><div className="hs-num">{ctr2.toLocaleString()}+</div><div className="hs-label">Students Transported Daily</div></div>
          <div><div className="hs-num">{ctr3}</div><div className="hs-label">Cities Covered</div></div>
          <div><div className="hs-num">{ctr4}+</div><div className="hs-label">SOS Alerts Handled</div></div>
        </div>
      </div>
      <div className="glass hero-float">
        <div className="hf-icon">📍</div>
        <div>
          <div className="hf-label"><span className="live-dot" />Live Tracking</div>
          <div className="hf-val">Van arriving in 4 min</div>
        </div>
      </div>
      <div className="glass hero-float hero-float2">
        <div className="hf-icon">✅</div>
        <div>
          <div className="hf-label">Attendance</div>
          <div className="hf-val">18 / 20 picked up</div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   ROLE SWITCHER
═══════════════════════════════════════════════════ */
function RoleSwitcher() {
  const { role, setRole } = useApp();
  const { showToast } = useApp();
  const msgs = {
    parent: 'Parent view: Live tracking, parental controls, and attendance notifications.',
    driver: 'Driver view: Route management, attendance marking, and earnings dashboard.',
    school_admin: 'School Admin view: Fleet overview, analytics, and bulk reporting.',
  };
  const handleRole = (r) => { setRole(r); showToast('i', '👤', msgs[r]); };
  return (
    <div className="role-section">
      <div className="role-wrap">
        <div className="role-label">Viewing dashboard as:</div>
        <div className="role-tabs">
          <button className={`role-btn ${role === 'parent' ? 'active' : ''}`} onClick={() => handleRole('parent')}>👨‍👩‍👧 Parent</button>
          <button className={`role-btn ${role === 'driver' ? 'active' : ''}`} onClick={() => handleRole('driver')}>🚐 Driver</button>
          <button className={`role-btn ${role === 'school_admin' ? 'active' : ''}`} onClick={() => handleRole('school_admin')}>🏫 School Admin</button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   FEATURES SECTION
═══════════════════════════════════════════════════ */
const FEATURES = [
  { icon: '📍', title: 'Real-Time GPS Tracking', desc: 'Watch the school van move live on an interactive map. Automatic ETA updates, route deviation alerts, and stop-by-stop confirmations.' },
  { icon: '🚐', title: 'Driver Registration & Verification', desc: 'Multi-step CNIC, license, and vehicle document submission. Police clearance integration. Full background check before first ride.' },
  { icon: '👨‍👩‍👧', title: 'Parental Control Panel', desc: 'Track vans, set custom geofence safe zones, manage child profiles, restrict routes, and get push notifications for every milestone.' },
  { icon: '📋', title: 'Live Attendance — حاضری', desc: 'Driver taps to mark pickup and drop-off. Parents and schools get instant WhatsApp + in-app notifications. Daily PDF reports available.' },
  { icon: '🆘', title: 'SOS Emergency Alert', desc: 'One tap sends GPS location, van photo, and alert to parents, school admin, and local police. Connected to Rescue 1122 & Edhi.' },
  { icon: '💳', title: 'JazzCash / Easypaisa Pay', desc: 'Monthly van fees paid digitally. No cash. Automatic WhatsApp receipts. Split payments, advance booking, and instalment support.' },
  { icon: '📊', title: 'Analytics Dashboard', desc: 'School admins see daily attendance trends, route efficiency, driver ratings, and revenue reports — all in visual, shareable dashboards.' },
  { icon: '🌐', title: 'Urdu Interface', desc: 'Full Urdu language support for drivers and parents who prefer communicating in their native language. RTL layout included.' },
  { icon: '🛡️', title: 'Insurance & Safety Guarantee', desc: 'Every trip covered by basic passenger insurance. Vetted drivers only. School confirmation required before van allocation.' },
];

function FeaturesSection() {
  return (
    <section className="feat-section" id="features">
      <div className="sec-tag"><span className="badge b-teal">Platform Features</span></div>
      <h2 className="sec-title">Everything Your Family Needs</h2>
      <div className="divider" />
      <p className="sec-sub">One platform for parents, drivers, and schools — designed around Pakistani school routes, languages, and payment systems.</p>
      <div className="feat-grid">
        {FEATURES.map((f, i) => (
          <div className="feat-card glass" key={i}>
            <div className="feat-icon">{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   STATS BAR
═══════════════════════════════════════════════════ */
function StatsBar() {
  const stats = [
    { target: 1200, label: 'Verified Drivers', suffix: '+' },
    { target: 8400, label: 'Students Daily', suffix: '+' },
    { target: 14, label: 'Cities Covered', suffix: '' },
    { target: 99, label: '% On-Time Rate', suffix: '%' },
    { target: 320, label: 'Schools Partnered', suffix: '+' },
  ];
  return (
    <div className="stats-bar">
      <div className="stats-wrap">
        {stats.map((s, i) => (
          <React.Fragment key={i}>
            {i > 0 && <div className="stat-divider" aria-hidden="true" />}
            <div className="stat-item">
              <AnimatedStat target={s.target} suffix={s.suffix} />
              <div className="stat-label">{s.label}</div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function AnimatedStat({ target, suffix }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !started.current) {
        started.current = true;
        let cur = 0;
        const step = target / 80;
        const t = setInterval(() => {
          cur = Math.min(cur + step, target);
          setVal(Math.floor(cur));
          if (cur >= target) clearInterval(t);
        }, 18);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return <span className="stat-num" ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

/* ═══════════════════════════════════════════════════
   DRIVER REGISTRATION
═══════════════════════════════════════════════════ */
function DriverSection() {
  const { showToast } = useApp();
  const [step, setStep] = useState(1);
  const [success, setSuccess] = useState(false);
  const [refId, setRefId] = useState('');

  // Form fields
  const [dn, setDn] = useState('');
  const [dc, setDc] = useState('');
  const [dp, setDp] = useState('');
  const [dct, setDct] = useState('');
  const [da, setDa] = useState('');
  const [dvt, setDvt] = useState('');
  const [dvp, setDvp] = useState('');
  const [dvm, setDvm] = useState('');
  const [dvc, setDvc] = useState('');
  const [dlic, setDlic] = useState('');
  const [dsc, setDsc] = useState('');
  const [drt, setDrt] = useState('');
  const [dex, setDex] = useState('');

  const stepLabels = ['Step 1 of 3 — Personal Info', 'Step 2 of 3 — Vehicle Info', 'Step 3 of 3 — Route Info'];

  const nextStep = (from) => {
    if (from === 1 && (!dn || !dc || !dp || !dct || !da)) { showToast('e', '⚠️', 'Please fill all required fields.'); return; }
    if (from === 2 && (!dvt || !dvp || !dvm || !dvc || !dlic)) { showToast('e', '⚠️', 'Please fill all required fields.'); return; }
    setStep(from + 1);
  };
  const prevStep = (from) => setStep(from - 1);

  const handleCnic = (v) => {
    let c = v.replace(/\D/g, '');
    if (c.length > 5 && c.length <= 12) c = c.slice(0, 5) + '-' + c.slice(5);
    else if (c.length > 12) c = c.slice(0, 5) + '-' + c.slice(5, 12) + '-' + c.slice(12, 13);
    setDc(c);
  };

  const submit = () => {
    if (!dsc) { showToast('e', '⚠️', 'Please fill all required fields.'); return; }
    const rid = 'SR-' + Math.random().toString(36).substr(2, 8).toUpperCase();
    setRefId(rid);
    setSuccess(true);
    showToast('s', '✅', 'Driver registration submitted successfully!');
  };

  const cities = ['Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan', 'Peshawar', 'Quetta', 'Hyderabad', 'Sialkot', 'Gujranwala', 'Abbottabad'];

  return (
    <section className="drv-section" id="driver">
      <div className="sec-tag"><span className="badge b-orange">For Drivers</span></div>
      <h2 className="sec-title">Register as a SafeRide Driver</h2>
      <div className="divider" />
      <p className="sec-sub">Join Pakistan's most trusted school transport network. Earn consistently every month and keep children safe.</p>
      <div className="drv-layout">
        <div className="drv-info">
          <h3>Kyun SafeRide ke saath Drive karein?</h3>
          <p>We connect verified, professional van drivers with schools across Pakistan. Get stable monthly income, free training, insurance coverage, and the pride of keeping children safe every single day.</p>
          <div className="drv-perks">
            {[
              { ic: '💰', t: 'PKR 35,000–70,000 / Month', d: 'Guaranteed income based on your route and student count. Paid on time, every month.' },
              { ic: '🛡️', t: 'Passenger Insurance Included', d: 'SafeRide provides basic vehicle and passenger insurance on every trip — at no cost to you.' },
              { ic: '📱', t: 'Free Driver App (Android)', d: 'Manage your route, mark attendance, and receive monthly payments — all from one free app.' },
              { ic: '🕌', t: 'Flexible Islamic Schedule', d: 'Work 7 AM–3 PM on school days only. Fridays, weekends, and all public holidays off automatically.' },
              { ic: '📚', t: 'Free Driver Training', d: 'SafeRide provides child safety, first aid, and defensive driving training — completely free of charge.' },
            ].map((p, i) => (
              <div className="perk glass" key={i}>
                <div className="perk-ic">{p.ic}</div>
                <div><strong>{p.t}</strong><span>{p.d}</span></div>
              </div>
            ))}
          </div>
        </div>

        <div className="drv-form glass" id="drvFormWrap">
          {!success ? (
            <>
              <div className="form-hdr">
                <div className="form-title2">Driver Registration</div>
                <div className="step-info">{stepLabels[step - 1]}</div>
              </div>
              <div className="steps-bar">
                {[1, 2, 3].map(i => (
                  <div key={i} className={`sdot ${i < step ? 'done' : ''} ${i === step ? 'active' : ''}`} />
                ))}
              </div>

              {step === 1 && (
                <div className="form-step active">
                  <div className="fg"><label>Full Name (as per CNIC) *</label><input value={dn} onChange={e => setDn(e.target.value)} placeholder="e.g. Muhammad Usman Khan" /></div>
                  <div className="fr">
                    <div className="fg"><label>CNIC Number *</label><input value={dc} onChange={e => handleCnic(e.target.value)} placeholder="XXXXX-XXXXXXX-X" maxLength={15} /></div>
                    <div className="fg"><label>Mobile Number *</label><input value={dp} onChange={e => setDp(e.target.value)} type="tel" placeholder="03XX-XXXXXXX" /></div>
                  </div>
                  <div className="fg"><label>City *</label>
                    <select value={dct} onChange={e => setDct(e.target.value)}>
                      <option value="">-- Select City --</option>
                      {cities.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="fg"><label>Home Address *</label><input value={da} onChange={e => setDa(e.target.value)} placeholder="Street, Area, City" /></div>
                  <div className="fn"><button className="btn-next" onClick={() => nextStep(1)}>Next: Vehicle Info →</button></div>
                </div>
              )}

              {step === 2 && (
                <div className="form-step active">
                  <div className="fr">
                    <div className="fg"><label>Vehicle Type *</label>
                      <select value={dvt} onChange={e => setDvt(e.target.value)}>
                        <option value="">-- Select --</option>
                        <option>Suzuki Bolan (7-seat)</option>
                        <option>Toyota HiAce Mini Van (12-seat)</option>
                        <option>Toyota HiAce Hi-Roof (14-seat)</option>
                        <option>Coaster / Saloon (30-seat)</option>
                      </select>
                    </div>
                    <div className="fg"><label>Plate Number *</label><input value={dvp} onChange={e => setDvp(e.target.value)} placeholder="e.g. LHR-ABC-123" /></div>
                  </div>
                  <div className="fr">
                    <div className="fg"><label>Vehicle Model & Year *</label><input value={dvm} onChange={e => setDvm(e.target.value)} placeholder="e.g. Toyota HiAce 2020" /></div>
                    <div className="fg"><label>Seating Capacity *</label><input value={dvc} onChange={e => setDvc(e.target.value)} type="number" placeholder="e.g. 12" min="1" max="50" /></div>
                  </div>
                  <div className="fg"><label>Driving License No. *</label><input value={dlic} onChange={e => setDlic(e.target.value)} placeholder="License number" /></div>
                  <div className="fn">
                    <button className="btn-bk" onClick={() => prevStep(2)}>← Back</button>
                    <button className="btn-next" onClick={() => nextStep(2)}>Next: Route Info →</button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="form-step active">
                  <div className="fg"><label>Preferred School / Area *</label><input value={dsc} onChange={e => setDsc(e.target.value)} placeholder="e.g. Beaconhouse DHA Branch, Lahore" /></div>
                  <div className="fg"><label>Route Description</label><textarea value={drt} onChange={e => setDrt(e.target.value)} placeholder="e.g. Johar Town → Garden Town → Model Town → school" /></div>
                  <div className="fr">
                    <div className="fg"><label>Years of Experience</label>
                      <select value={dex} onChange={e => setDex(e.target.value)}>
                        <option value="">-- Select --</option>
                        <option>Less than 1 year</option><option>1–2 years</option>
                        <option>3–5 years</option><option>6–10 years</option><option>10+ years</option>
                      </select>
                    </div>
                    <div className="fg"><label>JazzCash / Bank Account</label><input placeholder="Account for payments" /></div>
                  </div>
                  <div className="fn"><button className="btn-bk" onClick={() => prevStep(3)}>← Back</button></div>
                  <button className="btn-sub" onClick={submit}>Submit Registration ✓</button>
                </div>
              )}
            </>
          ) : (
            <div className="success-wrap" style={{ display: 'block', padding: '20px 10px', textAlign: 'center' }}>
              <div style={{ fontSize: '3.5rem', marginBottom: 14, animation: 'popIn .5s ease' }}>✅</div>
              <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--g1)', marginBottom: 10 }}>Registration Submitted!</h4>
              <p style={{ color: 'var(--tm)', fontSize: '.9rem', lineHeight: 1.75 }}>
                Our team will review your application within <strong>2–3 working days</strong>.<br />We'll call you at the number you provided.
              </p>
              <p style={{ marginTop: 14, color: 'var(--g1)', fontWeight: 700, fontSize: '1rem' }}>JazakAllah Khair 🙏</p>
              <p style={{ marginTop: 8, color: 'var(--tm)', fontSize: '.82rem' }}>Reference ID: <strong style={{ color: 'var(--g1)' }}>{refId}</strong></p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   PARENTAL CONTROL
═══════════════════════════════════════════════════ */
function ParentalSection() {
  const { showToast } = useApp();
  const [tab, setTab] = useState('live');

  return (
    <section className="par-section" id="parental">
      <div className="sec-tag"><span className="badge b-green">For Parents</span></div>
      <h2 className="sec-title">Parental Control Centre</h2>
      <div className="divider" />
      <p className="sec-sub">Track your child's van live, set safe zones, view full alert history, and get notified for every pickup and drop.</p>
      <div className="par-layout">
        <div className="par-tabs">
          {[
            { id: 'live', icon: '📍', label: 'Live Tracking' },
            { id: 'geo', icon: '🔒', label: 'Geofence Zones' },
            { id: 'alerts', icon: '🔔', label: 'Alert History' },
            { id: 'child', icon: '👧', label: 'Child Profile' },
          ].map(t => (
            <button key={t.id} className={`ptab ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {tab === 'live' && <LiveTrackingPanel showToast={showToast} />}
        {tab === 'geo' && <GeofencePanel showToast={showToast} />}
        {tab === 'alerts' && <AlertsPanel />}
        {tab === 'child' && <ChildProfilePanel />}
      </div>
    </section>
  );
}

function LiveTrackingPanel({ showToast }) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    if (mapInstance.current || !mapRef.current) return;
    // Dynamically load Leaflet
    if (typeof window.L === 'undefined') return;
    const L = window.L;
    const map = L.map(mapRef.current, { zoomControl: true }).setView([31.5204, 74.3587], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' }).addTo(map);
    const stops = [
      [31.4697, 74.2728, '🏠 Stop 1 · Johar Town'],
      [31.4900, 74.3000, '🏘️ Stop 2 · Garden Town'],
      [31.5100, 74.3300, '🏢 Stop 3 · Gulberg Blvd'],
      [31.5204, 74.3587, '📍 Stop 4 · Model Town'],
      [31.5350, 74.3700, '🏫 City Grammar School'],
    ];
    L.polyline(stops.map(s => [s[0], s[1]]), { color: '#00c853', weight: 4, opacity: 0.7, dashArray: '10,7' }).addTo(map);
    const si = L.divIcon({ html: '<div style="width:11px;height:11px;background:#00c853;border-radius:50%;border:2px solid #fff;box-shadow:0 0 8px rgba(0,200,83,.9)"></div>', className: '', iconSize: [11, 11], iconAnchor: [5.5, 5.5] });
    stops.forEach((s, i) => {
      const ic = i === stops.length - 1 ? L.divIcon({ html: '<div style="font-size:1.3rem">🏫</div>', className: '', iconSize: [26, 26], iconAnchor: [13, 13] }) : si;
      L.marker([s[0], s[1]], { icon: ic }).addTo(map).bindPopup(`<b>${s[2]}</b>`);
    });
    const vi = L.divIcon({ html: '<div style="font-size:1.7rem;filter:drop-shadow(0 2px 8px rgba(0,0,0,.6))">🚐</div>', className: '', iconSize: [34, 34], iconAnchor: [17, 17] });
    const vm = L.marker([31.4697 + (31.5350 - 31.4697) * 0.62, 74.2728 + (74.3700 - 74.2728) * 0.62], { icon: vi }).addTo(map).bindPopup('<b>Van #PK-47</b><br>Usman Javed<br><span style="color:#00c853">●</span> En route');
    let prog = 0.62;
    const interval = setInterval(() => {
      prog = Math.min(prog + 0.004, 1);
      const lat = 31.4697 + (31.5350 - 31.4697) * prog;
      const lng = 74.2728 + (74.3700 - 74.2728) * prog;
      vm.setLatLng([lat, lng]);
    }, 1800);
    mapInstance.current = map;
    return () => { clearInterval(interval); map.remove(); mapInstance.current = null; };
  }, []);

  return (
    <div className="track-grid">
      <div className="track-sidebar">
        <div className="van-card glass">
          <div className="vc-top">
            <div className="vc-av">🚐</div>
            <div>
              <div className="vc-name">Van #PK-47 · Route B</div>
              <div className="vc-sub"><span className="live-dot" />Live · Usman Javed</div>
            </div>
          </div>
          <div className="info-row"><span>📍 Location</span><span>Canal Rd, Gulberg III</span></div>
          <div className="info-row"><span>🚗 Speed</span><span>34 km/h</span></div>
          <div className="info-row"><span>👧 Status</span><span style={{ color: 'var(--g1)' }}>✅ On Board</span></div>
          <div className="prog-bg"><div className="prog-fill" style={{ width: '62%' }} /></div>
          <div className="eta-txt">Arriving in ~6 min · 3.2 km remaining</div>
        </div>
        <div className="van-card glass">
          <div className="info-row" style={{ fontSize: '.82rem', color: 'var(--tm)', marginBottom: 8 }}>👧 Your Child</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div className="av-chip">AR</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '.92rem' }}>Aisha Rahman</div>
              <div style={{ fontSize: '.75rem', color: 'var(--g1)' }}>✅ Picked up · 7:32 AM</div>
            </div>
          </div>
        </div>
        <div className="van-card glass">
          <div style={{ fontSize: '.82rem', color: 'var(--tm)', marginBottom: 10 }}>🚐 Driver Info</div>
          <div className="info-row"><span>Name</span><span>Usman Javed</span></div>
          <div className="info-row"><span>Rating</span><span>⭐ 4.9 / 5</span></div>
          <div className="info-row"><span>Trips</span><span>1,243 completed</span></div>
          <div className="info-row"><span>Phone</span><span><a href="tel:+923001234567" style={{ color: 'var(--g1)' }}>0300-1234567</a></span></div>
        </div>
        <button className="sos-btn" onClick={() => showToast('e', '🆘', 'SOS Alert sent to all emergency contacts!')}>🆘 Emergency SOS</button>
      </div>
      <div ref={mapRef} style={{ height: 440, borderRadius: 'var(--r2)', border: '1px solid var(--border)' }} />
    </div>
  );
}

function GeofencePanel({ showToast }) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const circles = useRef([]);
  const [zoneCount, setZoneCount] = useState(0);

  useEffect(() => {
    return () => { if (mapInstance.current) { mapInstance.current.remove(); mapInstance.current = null; } };
  }, []);

  const initMap = () => {
    if (mapInstance.current) return;
    if (typeof window.L === 'undefined') return;
    const L = window.L;
    const map = L.map(mapRef.current).setView([31.5204, 74.3587], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '© OpenStreetMap' }).addTo(map);
    mapInstance.current = map;
  };

  const addZone = (type) => {
    initMap();
    const cfg = {
      school: { pos: [31.535, 74.370], r: 400, color: '#00c853', label: '🏫 School Safe Zone (400m)' },
      home: { pos: [31.4697, 74.2728], r: 300, color: '#42a5f5', label: '🏠 Home Safe Zone (300m)' },
    };
    const c = cfg[type];
    const cir = L.circle(c.pos, { radius: c.r, color: c.color, fillColor: c.color, fillOpacity: 0.12, weight: 2, dashArray: '10,6' }).addTo(mapInstance.current).bindPopup(`<b>${c.label}</b>`).openPopup();
    circles.current.push(cir);
    mapInstance.current.setView(c.pos, 15);
    setZoneCount(v => v + 1);
    showToast('s', type === 'school' ? '🏫' : '🏠', `${type === 'school' ? 'School' : 'Home'} geofence zone set!`);
  };

  const clearZones = () => {
    circles.current.forEach(c => c.remove());
    circles.current = [];
    setZoneCount(0);
    showToast('i', '🗑️', 'All geofence zones cleared.');
  };

  return (
    <div>
      <p style={{ color: 'var(--tm)', marginBottom: 16, fontSize: '.9rem' }}>Set safe zones on the map. You'll receive an alert when the van enters or exits any zone.</p>
      <div ref={mapRef} id="gMap" style={{ height: 420, borderRadius: 'var(--r2)', border: '1px solid var(--border)', marginBottom: 18 }} />
      <div className="gf-ctrl">
        <button className="btn-gf school" onClick={() => addZone('school')}>🏫 Set School Zone</button>
        <button className="btn-gf home" onClick={() => addZone('home')}>🏠 Set Home Zone</button>
        <button className="btn-gf del" onClick={clearZones}>✕ Clear All</button>
      </div>
      <div className="gf-count">Active zones: <span style={{ color: 'var(--g1)', fontWeight: 700 }}>{zoneCount} zone{zoneCount !== 1 ? 's' : ''} set</span></div>
    </div>
  );
}

function AlertsPanel() {
  const alerts = [
    { ic: '✅', title: 'Aisha picked up', desc: 'Van #PK-47 stopped at Johar Town — confirmed on board', time: 'Today 7:32 AM' },
    { ic: '🏫', title: 'Entered School Zone', desc: 'City Grammar School — Aisha delivered safely', time: 'Today 8:04 AM' },
    { ic: '🔔', title: 'Van departing school in 10 min', desc: 'Pick-up: 2:00 PM · Van #PK-47 · Usman Javed', time: 'Yesterday 1:50 PM' },
    { ic: '🏠', title: 'Aisha dropped home safely', desc: 'Van stopped at Johar Town. Trip: 26 minutes.', time: 'Yesterday 2:28 PM' },
    { ic: '⚠️', title: 'Route delay — heavy traffic', desc: 'Van #PK-47 delayed ~10 min · Canal Road congestion', time: 'Mon 7:58 AM' },
    { ic: '💳', title: 'Monthly fee paid — PKR 3,500', desc: 'July 2026 payment confirmed via JazzCash', time: 'Jul 1 · 9:10 AM' },
  ];
  return (
    <div className="alerts">
      {alerts.map((a, i) => (
        <div className="al-item glass" key={i}>
          <div className="al-ic">{a.ic}</div>
          <div className="al-txt"><strong>{a.title}</strong><span>{a.desc}</span></div>
          <div className="al-time">{a.time}</div>
        </div>
      ))}
    </div>
  );
}

function ChildProfilePanel() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 20 }}>
      <div className="glass" style={{ borderRadius: 'var(--r2)', padding: 28 }}>
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'linear-gradient(135deg,var(--g1),var(--teal))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', margin: '0 auto 12px' }}>👧</div>
          <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>Aisha Rahman</div>
          <div style={{ color: 'var(--tm)', fontSize: '.82rem', marginTop: 4 }}>Grade 5 · City Grammar School</div>
        </div>
        <div className="info-row"><span>📍 Pickup</span><span>Johar Town Stop 1</span></div>
        <div className="info-row"><span>🏠 Drop</span><span>Johar Town Home</span></div>
        <div className="info-row"><span>🚐 Van</span><span>#PK-47</span></div>
        <div className="info-row"><span>⏰ Pickup Time</span><span>7:30 AM</span></div>
        <div className="info-row"><span>📅 Enrolled Since</span><span>Jan 2026</span></div>
      </div>
      <div className="glass" style={{ borderRadius: 'var(--r2)', padding: 28 }}>
        <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 18 }}>📊 Attendance This Month</div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 18 }}>
          <div className="ms-item glass" style={{ borderRadius: 12, flex: 1, textAlign: 'center', padding: 14 }}><div className="ms-num" style={{ color: 'var(--g1)' }}>18</div><div className="ms-lbl">Present</div></div>
          <div className="ms-item glass" style={{ borderRadius: 12, flex: 1, textAlign: 'center', padding: 14 }}><div className="ms-num" style={{ color: '#ff8a80' }}>2</div><div className="ms-lbl">Absent</div></div>
          <div className="ms-item glass" style={{ borderRadius: 12, flex: 1, textAlign: 'center', padding: 14 }}><div className="ms-num" style={{ color: '#ffd54f' }}>90</div><div className="ms-lbl">% Rate</div></div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   ATTENDANCE SECTION
═══════════════════════════════════════════════════ */
function AttendanceSection() {
  const { showToast } = useApp();
  const [students, setStudents] = useState(INITIAL_STUDENTS);
  const [search, setSearch] = useState('');

  const markStudent = (id, status) => {
    setStudents(prev => prev.map(s => {
      if (s.id !== id) return s;
      const time = new Date().toLocaleTimeString('en-PK', { hour: '2-digit', minute: '2-digit' });
      showToast(status === 'present' ? 's' : 'e', status === 'present' ? '✅' : '❌', `${s.n} marked ${status === 'present' ? 'Present' : 'Absent'}`);
      return { ...s, st: status, time: status === 'present' ? time : '—' };
    }));
  };

  const filtered = students.filter(s =>
    s.n.toLowerCase().includes(search.toLowerCase()) ||
    s.stop.toLowerCase().includes(search.toLowerCase())
  );

  const prs = filtered.filter(x => x.st === 'present').length;
  const ab = filtered.filter(x => x.st === 'absent').length;
  const pen = filtered.filter(x => x.st === 'pending').length;
  const rate = filtered.length > 0 ? Math.round(prs / filtered.length * 100) : 0;
  const today = new Date().toLocaleDateString('en-PK', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <section className="att-section" id="attendance">
      <div className="sec-tag"><span className="badge b-teal">Live Attendance — حاضری</span></div>
      <h2 className="sec-title">Haazri System</h2>
      <div className="divider" />
      <p className="sec-sub">Drivers mark attendance at every stop. Parents and school admins see real-time updates. Daily PDF reports auto-generated.</p>
      <div className="att-layout">
        <div className="att-stats">
          <div className="as-card glass"><div className="as-num" style={{ color: 'var(--g1)' }}>{prs}</div><div className="as-lbl">Present Today</div></div>
          <div className="as-card glass"><div className="as-num" style={{ color: '#ff8a80' }}>{ab}</div><div className="as-lbl">Absent</div></div>
          <div className="as-card glass"><div className="as-num" style={{ color: '#ffd54f' }}>{pen}</div><div className="as-lbl">Pending</div></div>
          <div className="as-card glass"><div className="as-num">{filtered.length}</div><div className="as-lbl">Total Students</div></div>
          <div className="as-card glass"><div className="as-num" style={{ color: 'var(--teal)' }}>{rate}%</div><div className="as-lbl">Attendance Rate</div></div>
        </div>
        <div className="att-topbar">
          <div>
            <div className="att-meta"><span className="live-dot" />Live · Van #PK-47 · Morning Shift</div>
            <div style={{ fontWeight: 700, fontSize: '1rem', marginTop: 4 }}>{today}</div>
          </div>
          <input className="search-box" type="text" placeholder="🔍 Search student or stop..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="tbl-wrap">
          <table>
            <thead><tr><th>Student</th><th>Grade</th><th>Pickup Stop</th><th>Status</th><th>Time</th><th>Action</th></tr></thead>
            <tbody>
              {filtered.map(s => (
                <tr key={s.id}>
                  <td><div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><div className="av-chip">{s.ini}</div><span style={{ fontWeight: 600 }}>{s.n}</span></div></td>
                  <td style={{ color: 'var(--tm)' }}>{s.gr}</td>
                  <td style={{ color: 'var(--tm)', fontSize: '.82rem' }}>{s.stop}</td>
                  <td><span className={`spill ${s.st === 'present' ? 'sp-p' : s.st === 'absent' ? 'sp-a' : 'sp-pen'}`}>{s.st === 'present' ? 'Present' : s.st === 'absent' ? 'Absent' : 'Pending'}</span></td>
                  <td style={{ color: 'var(--tm)', fontSize: '.82rem' }}>{s.time}</td>
                  <td style={{ display: 'flex', gap: 8 }}>
                    {s.st === 'pending' ? (<>
                      <button className="mark-p" onClick={() => markStudent(s.id, 'present')}>✅ Present</button>
                      <button className="mark-a" onClick={() => markStudent(s.id, 'absent')}>❌ Absent</button>
                    </>) : <span style={{ fontSize: '.78rem', color: 'var(--tm)' }}>Marked</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   HOW IT WORKS
═══════════════════════════════════════════════════ */
function HowSection() {
  const steps = [
    { n: 1, t: 'Register Your Child', d: 'Create a parent account, add child details, school, and confirm pickup / drop addresses in your city.' },
    { n: 2, t: 'Match with Verified Van', d: "We match your child with a background-checked, CNIC-verified driver on an approved route near you." },
    { n: 3, t: 'Track Every Trip', d: 'Watch the van live on the map, receive attendance confirmations, and review daily reports.' },
    { n: 4, t: 'Pay Digitally', d: 'Monthly fees via JazzCash or Easypaisa. Auto receipts to your WhatsApp. No cash. No hassle.' },
  ];
  return (
    <section className="how-section" id="how">
      <div className="sec-tag"><span className="badge b-green">Simple Process</span></div>
      <h2 className="sec-title">How SafeRide Works</h2>
      <div className="divider" />
      <p className="sec-sub">Getting started takes less than 5 minutes for both parents and drivers.</p>
      <div className="how-grid">
        {steps.map(s => (
          <div className="how-card glass" key={s.n}>
            <div className="how-num">{s.n}</div>
            <h4>{s.t}</h4>
            <p>{s.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   ANALYTICS DASHBOARD
   ═══════════════════════════════════════════════════ */
function AnalyticsSection() {
  const chartOpts = (extra) => ({
    responsive: true,
    plugins: { legend: { labels: { color: '#7a95b5', font: { family: 'Outfit', size: 11 } } } },
    scales: {
      x: { ticks: { color: '#7a95b5', font: { family: 'Outfit' } }, grid: { color: 'rgba(255,255,255,.05)' } },
      y: { ticks: { color: '#7a95b5', font: { family: 'Outfit' } }, grid: { color: 'rgba(255,255,255,.06)' } },
    },
    ...extra,
  });

  return (
    <section className="ana-section" id="analytics">
      <div className="sec-tag"><span className="badge b-purple">Analytics Dashboard</span></div>
      <h2 className="sec-title">Real-Time Analytics</h2>
      <div className="divider" />
      <p className="sec-sub">Comprehensive reporting for school administrators, fleet managers, and investors.</p>
      <div className="ana-grid">
        <div className="chart-card glass">
          <h4>Weekly Attendance <span>Last 7 Days</span></h4>
          <Bar data={{
            labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
            datasets: [
              { label: 'Present', data: [18,17,19,15,18,0,0], backgroundColor: 'rgba(0,200,83,.7)', borderRadius: 6 },
              { label: 'Absent', data: [2,3,1,5,2,0,0], backgroundColor: 'rgba(229,57,53,.5)', borderRadius: 6 },
            ],
          }} options={chartOpts()} />
        </div>
        <div className="chart-card glass">
          <h4>Revenue — PKR <span>Last 6 Months</span></h4>
          <Line data={{
            labels: ['Feb','Mar','Apr','May','Jun','Jul'],
            datasets: [{
              label: 'Revenue (PKR 000s)', data: [420,580,750,920,1100,1380],
              borderColor: '#00c853', backgroundColor: 'rgba(0,200,83,.1)',
              fill: true, tension: 0.4, pointBackgroundColor: '#00c853', pointRadius: 5,
            }],
          }} options={chartOpts()} />
        </div>
        <div className="chart-card glass">
          <h4>Student Distribution <span>By City</span></h4>
          <Doughnut data={{
            labels: ['Lahore','Karachi','Islamabad','Rawalpindi','Faisalabad','Others'],
            datasets: [{
              data: [35,28,15,10,7,5],
              backgroundColor: ['#00c853','#00bfa5','#42a5f5','#7c4dff','#ffcc02','#ff6e6e'],
              borderWidth: 0, hoverOffset: 6,
            }],
          }} options={{
            responsive: true,
            plugins: { legend: { position: 'right', labels: { color: '#7a95b5', font: { family: 'Outfit', size: 11 } } } },
          }} />
        </div>
        <div className="chart-card glass">
          <h4>Driver Performance <span>Rating vs Trips</span></h4>
          <div className="mini-stats">
            <div className="ms-item glass"><div className="ms-num" style={{ color: 'var(--g1)' }}>4.8</div><div className="ms-lbl">Avg Rating</div></div>
            <div className="ms-item glass"><div className="ms-num" style={{ color: 'var(--teal)' }}>98%</div><div className="ms-lbl">On-Time</div></div>
            <div className="ms-item glass"><div className="ms-num" style={{ color: '#ffd54f' }}>3</div><div className="ms-lbl">Incidents</div></div>
          </div>
          <Radar data={{
            labels: ['On-Time','Safety','Rating','Attendance','Customer Score'],
            datasets: [{
              label: 'SafeRide Avg', data: [98,95,96,97,94],
              borderColor: '#00c853', backgroundColor: 'rgba(0,200,83,.15)', pointBackgroundColor: '#00c853',
            }],
          }} options={{
            responsive: true,
            scales: { r: { ticks: { color: '#7a95b5', font: { family: 'Outfit', size: 10 } }, grid: { color: 'rgba(255,255,255,.07)' }, pointLabels: { color: '#7a95b5', font: { family: 'Outfit', size: 11 } } } },
            plugins: { legend: { labels: { color: '#7a95b5', font: { family: 'Outfit' } } } },
          }} />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   TESTOMIALS
   ═══════════════════════════════════════════════════ */
function TestimonialsSection() {
  const tests = [
    { txt: '"Pehle bahut tension rehti thi ke beti school pahunchi ya nahi. Ab SafeRide se live track karta hoon — bilkul chain ho gaya hai. Best app for Pakistani parents."', name: 'Tariq Mehmood', role: 'Parent · Lahore, DHA Phase 5', av: '👨' },
    { txt: '"The attendance notification is brilliant. I know the exact second my son boards the van. No more calls to the driver. Highly recommend to all Karachi parents!"', name: 'Sana Riaz', role: 'Parent · Karachi, Clifton Block 4', av: '👩' },
    { txt: '"SafeRide ka registration process bahut professional hai. CNIC verification aur background check se parents ko poora trust milta hai. This is what Pakistan needed."', name: 'Adnan Sheikh', role: 'School Coordinator · Islamabad, F-7', av: '🧑' },
    { txt: '"As a driver, SafeRide gave me stable income, insurance, and a professional image. The app is easy, and parents trust me because I\'m verified. Bohat acha platform hai."', name: 'Rizwan Ahmed', role: 'SafeRide Driver · Rawalpindi', av: '🚐' },
  ];
  return (
    <section className="test-section" id="testimonials">
      <div className="sec-tag"><span className="badge b-teal">Parent Stories</span></div>
      <h2 className="sec-title">What Pakistani Parents Say</h2>
      <div className="divider" />
      <p className="sec-sub">Trusted by thousands of families across Karachi, Lahore, Islamabad, and beyond.</p>
      <div className="test-grid">
        {tests.map((t, i) => (
          <div className="test-card glass" key={i}>
            <div className="stars">★★★★★</div>
            <p className="test-txt">{t.txt}</p>
            <div className="test-author"><div className="t-av">{t.av}</div><div><div className="t-name">{t.name}</div><div className="t-role">{t.role}</div></div></div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   DOWNLOAD CTA
═══════════════════════════════════════════════════ */
function DownloadSection() {
  return (
    <section className="dl-section" id="download">
      <div className="sec-tag"><span className="badge b-green">Free Download</span></div>
      <h2>Abhi Download Karein<br /><span style={{ color: 'var(--g1)' }}>ابھی ڈاؤن لوڈ کریں</span></h2>
      <p>Available on Android &amp; iOS. Free for parents. Start keeping your child safe today.</p>
      <div className="store-wrap">
        <a href="#" className="store-btn"><div className="st-ic">▶️</div><div><div className="st-sub">Get it on</div><div className="st-name">Google Play</div></div></a>
        <a href="#" className="store-btn"><div className="st-ic">🍎</div><div><div className="st-sub">Download on</div><div className="st-name">App Store</div></div></a>
      </div>
      <div className="qr-badge">
        <div className="qr-box">SCAN<br />QR</div>
        <div style={{ textAlign: 'left' }}><div style={{ fontWeight: 700, color: 'var(--tp)', marginBottom: 4 }}>Scan to Download</div><div>Point camera at QR code to install the app</div></div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer id="contact">
      <div className="ft-grid">
        <div className="ft-about">
          <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '1.28rem', fontWeight: 800, color: '#fff' }}>
            <div className="logo-icon" style={{ width: 38, height: 38, borderRadius: 11, background: 'linear-gradient(135deg,var(--g1),var(--teal))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.15rem' }}>🚐</div>
            <div>Safe<span style={{ color: 'var(--g1)' }}>Ride</span></div>
          </div>
          <p>Pakistan's most trusted school van transport platform. Keeping children safe across 14 cities since 2024.</p>
          <div className="ft-urdu">بچوں کا محفوظ سفر — ہمارا وعدہ</div>
          <div style={{ marginTop: 14, display: 'flex', gap: 10 }}>
            <span className="badge b-green" style={{ fontSize: '.68rem' }}>🏆 Best EdTech App 2025</span>
            <span className="badge b-teal" style={{ fontSize: '.68rem' }}>🔒 ISO 27001</span>
          </div>
        </div>
        <div className="ft-col">
          <h5>Company</h5>
          <ul><li><a href="#">About SafeRide</a></li><li><a href="#">Our Team</a></li><li><a href="#">Press &amp; Media</a></li><li><a href="#">Careers</a></li><li><a href="#">Investor Relations</a></li></ul>
        </div>
        <div className="ft-col">
          <h5>Services</h5>
          <ul><li><a href="#driver">Driver Registration</a></li><li><a href="#parental">Parental Control</a></li><li><a href="#attendance">Attendance System</a></li><li><a href="#analytics">Analytics</a></li><li><a href="#">School Admin Panel</a></li></ul>
        </div>
        <div className="ft-col">
          <h5>Contact</h5>
          <ul><li><a href="tel:+920300SAFERIDE">0300-SAFERIDE</a></li><li><a href="mailto:support@saferide.pk">support@saferide.pk</a></li><li><a href="#">WhatsApp Support</a></li><li><a href="#">Head Office: DHA Lahore</a></li><li><a href="#">KHI Office: Clifton Karachi</a></li></ul>
        </div>
      </div>
      <div className="ft-btm">
        <div className="ft-logo">🚐 Safe<span>Ride</span> Pakistan</div>
        <div>© 2026 SafeRide Pvt. Ltd. All rights reserved.</div>
        <div>
          <a href="#" style={{ color: 'var(--tm)', marginRight: 14 }}>Privacy Policy</a>
          <a href="#" style={{ color: 'var(--tm)', marginRight: 14 }}>Terms of Service</a>
          <a href="#" style={{ color: 'var(--tm)' }}>PDPA Compliance</a>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════
   LOGIN MODAL
═══════════════════════════════════════════════════ */
function LoginModal() {
  const { loginOpen, setLoginOpen, doLogin, showToast } = useApp();
  const [mode, setMode] = useState('login');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  if (!loginOpen) return null;

  const handleLogin = () => {
    if (!phone || !password) { showToast('e', '⚠️', 'Please enter your mobile number and password.'); return; }
    doLogin({ name: phone, phone }, 'demo-token');
    setLoginOpen(false);
    showToast('s', '✅', `Welcome back! Logged in as ${phone}`);
  };

  const handleSignup = () => {
    if (!name || !phone || !password) { showToast('e', '⚠️', 'Please fill all fields.'); return; }
    if (password.length < 8) { showToast('e', '⚠️', 'Password must be at least 8 characters.'); return; }
    doLogin({ name, phone }, 'demo-token');
    setLoginOpen(false);
    showToast('s', '🎉', `Account created! Welcome, ${name}!`);
  };

  return (
    <div className="moverlay open" role="dialog" aria-modal="true" onClick={e => { if (e.target === e.currentTarget) setLoginOpen(false); }}>
      <div className="mbox">
        <button className="mcls" onClick={() => setLoginOpen(false)} aria-label="Close">✕</button>
        <div className="m-ic">🚐</div>
        <div className="m-title">Welcome to SafeRide</div>
        <div className="m-sub">Sign in or create your account to get started.</div>
        <div className="m-tabs">
          <button className={`mtab ${mode === 'login' ? 'active' : ''}`} onClick={() => setMode('login')}>Log In</button>
          <button className={`mtab ${mode === 'signup' ? 'active' : ''}`} onClick={() => setMode('signup')}>Sign Up</button>
        </div>
        {mode === 'login' ? (
          <div>
            <div className="fg"><label>Mobile Number</label><input type="tel" placeholder="03XX-XXXXXXX" value={phone} onChange={e => setPhone(e.target.value)} /></div>
            <div className="fg"><label>Password</label><input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} /></div>
            <div style={{ textAlign: 'right', marginBottom: 16 }}><a href="#" style={{ color: 'var(--g1)', fontSize: '.82rem' }}>Forgot password?</a></div>
            <button className="btn-sub" onClick={handleLogin}>Log In →</button>
          </div>
        ) : (
          <div>
            <div className="fg"><label>Full Name</label><input type="text" placeholder="Your full name" value={name} onChange={e => setName(e.target.value)} /></div>
            <div className="fg"><label>Mobile Number</label><input type="tel" placeholder="03XX-XXXXXXX" value={phone} onChange={e => setPhone(e.target.value)} /></div>
            <div className="fg"><label>Set Password</label><input type="password" placeholder="Min 8 characters" value={password} onChange={e => setPassword(e.target.value)} /></div>
            <button className="btn-sub" onClick={handleSignup}>Create Account →</button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   SOS MODAL
═══════════════════════════════════════════════════ */
function SosModal() {
  const { sosOpen, setSosOpen, showToast } = useApp();
  if (!sosOpen) return null;
  const contacts = [
    { ic: '👮', name: 'Pakistan Police', num: '15' },
    { ic: '🏥', name: 'Rescue 1122', num: '1122' },
    { ic: '🩺', name: 'Edhi Foundation', num: '115' },
    { ic: '🏫', name: 'School Admin', num: '0321-SCHOOL' },
    { ic: '📱', name: 'SafeRide Support', num: '0300-SAFERIDE' },
  ];
  return (
    <div className="moverlay open" role="dialog" aria-modal="true" onClick={e => { if (e.target === e.currentTarget) setSosOpen(false); }}>
      <div className="mbox">
        <button className="mcls" onClick={() => setSosOpen(false)} aria-label="Close">✕</button>
        <div className="m-ic">🆘</div>
        <div className="m-title" style={{ color: '#ff8a80' }}>Emergency SOS Activated</div>
        <div className="m-sub">Alert sent to all contacts. Call directly if needed:</div>
        <div className="sos-contacts">
          {contacts.map((c, i) => (
            <div className="sc glass" key={i}>
              <div className="sc-ic">{c.ic}</div>
              <div><div className="sc-name">{c.name}</div><div className="sc-num">{c.num}</div></div>
              <button className="sc-btn" onClick={() => showToast('s', '📞', `Calling ${c.name}`)}>📞 Call</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   TOAST CONTAINER (renders toasts from context)
═══════════════════════════════════════════════════ */
function ToastContainer() {
  const { toasts, removeToast } = useApp();
  return (
    <div id="tc" aria-live="polite" style={{ position: 'fixed', bottom: 24, right: 22, zIndex: 3000, display: 'flex', flexDirection: 'column', gap: 9 }}>
      {toasts.map(t => (
        <div key={t.id} className={`toast ${t.type}`} onClick={() => removeToast(t.id)}>
          <span className="t-ic">{t.icon}</span>
          <span className="t-msg">{t.msg}</span>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   APP ROOT
═══════════════════════════════════════════════════ */
export default function App() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <RoleSwitcher />
      <FeaturesSection />
      <StatsBar />
      <DriverSection />
      <ParentalSection />
      <AttendanceSection />
      <AnalyticsSection />
      <HowSection />
      <TestimonialsSection />
      <DownloadSection />
      <Footer />
      <LoginModal />
      <SosModal />
      <ToastContainer />
    </>
  );
}
