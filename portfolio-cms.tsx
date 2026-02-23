import { useState, useEffect, useRef } from "react";

const DEFAULT_DATA = {
  hero: {
    eyebrow: "CX Technology & Product Executive · Dubai, UAE",
    headline1: "Products",
    headline2: "built",
    headline3: "at scale.",
    subtext: "14+ years leading enterprise technology across Asia, the Caribbean, and the Middle East — designing, building, and scaling platforms that serve tens of millions.",
    metrics: [
      { val: "20M+", key: "Monthly Active Users" },
      { val: "4", key: "Products Shipped" },
      { val: "14+", key: "Years Experience" },
      { val: "$1.2M", key: "EBITDA Delivered" },
    ],
    footerLeft: "Dubai · 10Y Resident · Open to Opportunities",
    footerRight: "saadsohail@example.com",
  },
  profile: {
    name: "Syed Saad Sohail",
    title: "CX Technology & Product Executive",
    phone: "+971-58-584-9626",
    email: "saadsohail@example.com",
    linkedin: "linkedin.com/in/ssaadsohail",
    location: "Dubai, UAE",
  },
  timeline: [
    { year: "2009 – 2013", title: "Early Career", desc: "UI/UX development, GIS software engineering, SaaS product design, and MBA at Purdue University (USA/Germany)." },
    { year: "2013 – 2016", title: "Telenor Pakistan", desc: "Product Manager for EasyPaisa — Pakistan's first financial digital payments platform. Analytics-led iterations and telco integrations." },
    { year: "2016 – 2022", title: "Jazz Pakistan", desc: "Head of Digital Products — led JazzWorld (20M+ MAUs), JazzCash modernisation, and built Tamasha TV from scratch." },
    { year: "2022 – 2025", title: "Digicel Group", desc: "Group Head of Engineering & Data for MonCash — AI-powered KYC, wallet migration, and $1.2M EBITDA improvement." },
  ],
  products: [
    {
      id: "p1",
      index: "01",
      category: "Super App · Fintech",
      company: "Digicel Group · Haiti & Jamaica · 2022–2025",
      name: "MonCash",
      desc: "MonCash is a leading mobile financial super app serving Haiti and Jamaica — combining mobile wallet, P2P transfers, bill payments, merchant QR, and international remittance to provide financial access for millions, including underbanked communities.",
      contribLabel: "Executive Contributions",
      contributions: [
        "Owned end-to-end engineering and data strategy — 3M MAUs and $40M+ annual turnover",
        "Led migration of 2M+ USSD customers to a new mobile wallet with minimal downtime",
        "Pioneered AI-assisted KYC/AML onboarding — reduced time from days to under 5 minutes",
        "Built ML models for churn prediction and segmentation, reducing churn by 7%",
        "Delivered ~$1.2M EBITDA improvement via vendor optimisation and contract restructuring",
        "Secured fintech licensing; embedded OWASP MAS, PCI-DSS & GDPR/JDPR governance",
      ],
      impact: [
        { val: "3M", key: "MAUs" },
        { val: "$40M+", key: "Turnover" },
        { val: "−7%", key: "Churn" },
        { val: "$1.2M", key: "EBITDA" },
      ],
      stack: ["Android / iOS","Java Spring Boot","Python","PostgreSQL","AWS Redshift","AWS Glue","Docker","Kubernetes","Microservices","REST APIs","Grafana","PCI-DSS","KYC / AML"],
      appName: "MonCash",
      appDev: "Digicel Caribbean · Finance",
      appRating: "4.5 · 1M+ Downloads",
      playUrl: "https://play.google.com/store/apps/details?id=com.useboom.htwallet",
      appleUrl: "https://apps.apple.com/us/app/moncash/id1498332907",
    },
    {
      id: "p2",
      index: "02",
      category: "Super App · Pakistan",
      company: "Jazz Pakistan · Islamabad · 2016–2022",
      name: "JazzWorld / SIMOSA",
      desc: "Pakistan's largest telecom super app spanning payments, gamification, loyalty, live radio, e-commerce, and an AI assistant (SIA). Now at 50M+ downloads and 910K reviews, it continues to grow on the foundations built during my tenure.",
      contribLabel: "Executive Contributions",
      contributions: [
        "Led software engineering and real-time product analytics for the full platform lifecycle",
        "Designed scalable microservices private cloud, achieving 2× faster rollout speed",
        "Drove 10× faster testing cycles via automated and crowd-testing frameworks with CI/CD",
        "Cut Customer Operations FTE costs by 14% through RPA-based workflow automation",
        "Established rapid experimentation and growth hacking to optimise funnels and adoption",
      ],
      impact: [
        { val: "20M+", key: "MAUs Built" },
        { val: "50M+", key: "Downloads" },
        { val: "2×", key: "Rollout Speed" },
        { val: "−14%", key: "FTE Cost" },
      ],
      stack: ["Android / iOS","React","Node.js","Java Spring Boot","Python","Private Cloud","Microservices","Jenkins CI/CD","Docker","Mixpanel","RPA","PostgreSQL"],
      appName: "SIMOSA – Jazz World",
      appDev: "Jazz Digital Pakistan · Lifestyle",
      appRating: "4.4 · 50M+ Downloads",
      playUrl: "https://play.google.com/store/apps/details?id=com.jazz.jazzworld",
      appleUrl: "https://apps.apple.com/us/app/simosa-jazz-world/id1441912305",
    },
    {
      id: "p3",
      index: "03",
      category: "Payments · Mobile Money",
      company: "Jazz Pakistan · Islamabad · 2016–2022",
      name: "JazzCash",
      desc: "Pakistan's premier digital payments and mobile money platform — enabling transfers, bill payments, merchant QR, micro-insurance, and credit access for millions. Required a full architectural transformation to serve explosive growth safely and compliantly.",
      contribLabel: "Executive Contributions",
      contributions: [
        "Conducted full technology due diligence of the legacy platform; proposed the modernisation roadmap",
        "Architected scalable microservices stack: Huawei mobile money, Temenos T24 core banking, WSO2",
        "Enabled Open API capabilities through WSO2 gateway for third-party partner integrations",
        "Improved instrumentation, monitoring, and operational decision-making across financial workflows",
        "Embedded PCI-DSS and KYC/AML controls to strengthen compliance and regulator readiness",
      ],
      impact: [
        { val: "Tier-1", key: "Platform" },
        { val: "Open API", key: "3PP Ecosystem" },
        { val: "PCI-DSS", key: "Led" },
        { val: "WSO2", key: "API Gateway" },
      ],
      stack: ["Huawei Mobile Money","Temenos T24","WSO2 API Manager","Microservices","REST / Open API","Java Spring Boot","MariaDB","NGINX Plus","PCI-DSS","KYC / AML"],
      appName: "JazzCash",
      appDev: "Jazz Pakistan · Mobile Money",
      appRating: "Pakistan's #1 Mobile Wallet",
      playUrl: "",
      appleUrl: "",
      webUrl: "https://www.jazzcash.com.pk",
    },
    {
      id: "p4",
      index: "04",
      category: "OTT Streaming · Media",
      company: "Jazz Pakistan · Islamabad · 2016–2022",
      name: "Tamasha TV",
      desc: "Pakistan's home-grown OTT video streaming platform — live cricket, drama series, movies, sports, and entertainment channels. Purpose-built for low-bandwidth conditions with resilient content delivery. Now at 50M+ downloads.",
      contribLabel: "Executive Contributions",
      contributions: [
        "Architected and delivered the full OTT streaming platform from inception including telemetry",
        "Engineered resilient adaptive caching for low-bandwidth conditions across Pakistan's varied network",
        "Built real-time telemetry to track streaming quality, buffering events, and engagement",
        "Integrated Tamasha into the JazzWorld super app ecosystem to drive cross-product growth",
        "Designed performance analytics foundation enabling data-driven content and UX decisions",
      ],
      impact: [
        { val: "4M+", key: "MAUs Built" },
        { val: "50M+", key: "Downloads" },
        { val: "0 → 1", key: "Greenfield" },
        { val: "HLS", key: "Adaptive CDN" },
      ],
      stack: ["Android / iOS","Kotlin","Swift","HLS / Adaptive","CDN / Edge Cache","Node.js","MongoDB","Firebase Analytics","Mixpanel / Swrve","Docker","Jenkins CI/CD"],
      appName: "Tamasha: Live TV, Cricket & Drama",
      appDev: "Beyond-Digital · Entertainment",
      appRating: "3.9 · 50M+ Downloads",
      playUrl: "https://play.google.com/store/apps/details?id=com.spbtv.mobilinktv",
      appleUrl: "https://apps.apple.com/iq/app/tamasha-live-tv-movie-drama/id976208250",
    },
  ],
};

// ── helpers ──
const deepClone = o => JSON.parse(JSON.stringify(o));
const TABS = ["Hero", "Profile", "Timeline", "Products"];

// ── tiny UI atoms ──
const Label = ({ children }) => (
  <div style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#b8955a", marginBottom: 6, fontFamily: "monospace", fontWeight: 500 }}>
    {children}
  </div>
);

const Field = ({ label, value, onChange, multiline, placeholder }) => (
  <div style={{ marginBottom: 16 }}>
    <Label>{label}</Label>
    {multiline ? (
      <textarea
        value={value}
        placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
        rows={3}
        style={inputStyle(true)}
      />
    ) : (
      <input
        value={value}
        placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
        style={inputStyle(false)}
      />
    )}
  </div>
);

const inputStyle = multi => ({
  width: "100%", background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.1)",
  color: "#fafafa", padding: "9px 12px", fontSize: 13, fontFamily: "inherit",
  resize: multi ? "vertical" : "none", outline: "none", borderRadius: 2,
  boxSizing: "border-box", lineHeight: 1.6,
});

const SectionTitle = ({ children }) => (
  <div style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "#b8955a", fontFamily: "monospace", borderBottom: "1px solid rgba(184,149,90,0.2)", paddingBottom: 8, marginBottom: 20, marginTop: 28 }}>
    {children}
  </div>
);

const Btn = ({ onClick, children, variant = "default", small }) => {
  const base = { cursor: "pointer", border: "none", fontFamily: "inherit", fontWeight: 400, letterSpacing: "0.08em", transition: "all 0.18s", borderRadius: 2, display: "inline-flex", alignItems: "center", gap: 6 };
  const styles = {
    default: { ...base, background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.6)", padding: small ? "5px 10px" : "8px 14px", fontSize: small ? 11 : 12, border: "1px solid rgba(255,255,255,0.1)" },
    gold: { ...base, background: "#b8955a", color: "#080808", padding: small ? "5px 12px" : "10px 20px", fontSize: small ? 11 : 12, fontWeight: 500 },
    danger: { ...base, background: "rgba(180,60,40,0.15)", color: "#e07060", padding: small ? "5px 10px" : "8px 14px", fontSize: small ? 11 : 12, border: "1px solid rgba(180,60,40,0.3)" },
  };
  return <button onClick={onClick} style={styles[variant]}>{children}</button>;
};

// ── main CMS ──
export default function CMS() {
  const [data, setData] = useState(() => {
    try {
      const saved = window._cmsData;
      return saved ? deepClone(saved) : deepClone(DEFAULT_DATA);
    } catch { return deepClone(DEFAULT_DATA); }
  });
  const [activeTab, setActiveTab] = useState("Hero");
  const [activeProduct, setActiveProduct] = useState(0);
  const [saved, setSaved] = useState(false);
  const [exportMsg, setExportMsg] = useState("");
  const saveTimer = useRef(null);

  const update = (path, val) => {
    setData(prev => {
      const next = deepClone(prev);
      const parts = path.split(".");
      let cur = next;
      for (let i = 0; i < parts.length - 1; i++) cur = cur[parts[i]];
      cur[parts[parts.length - 1]] = val;
      return next;
    });
  };

  const handleSave = () => {
    window._cmsData = deepClone(data);
    setSaved(true);
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => setSaved(false), 2200);
  };

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "portfolio-content.json"; a.click();
    URL.revokeObjectURL(url);
    setExportMsg("Exported!");
    setTimeout(() => setExportMsg(""), 2000);
  };

  const handleImport = e => {
    const file = e.target.files[0]; if (!file) return;
    const r = new FileReader();
    r.onload = ev => { try { setData(JSON.parse(ev.target.result)); } catch { alert("Invalid JSON file."); } };
    r.readAsText(file);
    e.target.value = "";
  };

  const prod = data.products[activeProduct];
  const setProd = (key, val) => {
    setData(prev => {
      const next = deepClone(prev);
      next.products[activeProduct][key] = val;
      return next;
    });
  };

  // list helpers
  const listItem = (path, arr, renderItem) => (
    <div>
      {arr.map((item, i) => (
        <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "flex-start" }}>
          <div style={{ flex: 1 }}>{renderItem(item, i)}</div>
          <Btn small variant="danger" onClick={() => {
            setData(prev => { const n = deepClone(prev); const parts = path.split("."); let cur = n; for (let j = 0; j < parts.length - 1; j++) cur = cur[parts[j]]; cur[parts[parts.length - 1]].splice(i, 1); return n; });
          }}>✕</Btn>
        </div>
      ))}
    </div>
  );

  // ── sidebar ──
  const Sidebar = () => (
    <div style={{ width: 200, background: "#0a0a0a", borderRight: "1px solid rgba(255,255,255,0.07)", display: "flex", flexDirection: "column", flexShrink: 0 }}>
      <div style={{ padding: "24px 20px 16px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#b8955a", fontFamily: "monospace", marginBottom: 4 }}>Portfolio</div>
        <div style={{ fontSize: 15, color: "#fafafa", fontWeight: 300 }}>Content CMS</div>
      </div>
      <div style={{ flex: 1, padding: "12px 0" }}>
        {TABS.map(t => (
          <button key={t} onClick={() => setActiveTab(t)}
            style={{ display: "block", width: "100%", textAlign: "left", padding: "10px 20px", background: activeTab === t ? "rgba(184,149,90,0.1)" : "transparent", color: activeTab === t ? "#b8955a" : "rgba(255,255,255,0.45)", border: "none", borderLeft: `2px solid ${activeTab === t ? "#b8955a" : "transparent"}`, fontSize: 13, cursor: "pointer", fontFamily: "inherit", fontWeight: activeTab === t ? 500 : 300, letterSpacing: "0.04em", transition: "all 0.15s" }}>
            {t}
          </button>
        ))}
      </div>
      <div style={{ padding: "16px 20px", borderTop: "1px solid rgba(255,255,255,0.07)", display: "flex", flexDirection: "column", gap: 8 }}>
        <Btn variant="gold" onClick={handleSave}>
          {saved ? "✓ Saved" : "Save Changes"}
        </Btn>
        <div style={{ display: "flex", gap: 6 }}>
          <Btn small onClick={handleExport}>{exportMsg || "Export JSON"}</Btn>
          <label style={{ cursor: "pointer" }}>
            <Btn small onClick={() => {}}>Import</Btn>
            <input type="file" accept=".json" onChange={handleImport} style={{ display: "none" }} />
          </label>
        </div>
      </div>
    </div>
  );

  // ── panels ──
  const HeroPanel = () => (
    <div>
      <SectionTitle>Eyebrow & Headline</SectionTitle>
      <Field label="Eyebrow Tag" value={data.hero.eyebrow} onChange={v => update("hero.eyebrow", v)} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
        <Field label="Headline Line 1 (thin)" value={data.hero.headline1} onChange={v => update("hero.headline1", v)} />
        <Field label="Headline Line 2 (gold italic)" value={data.hero.headline2} onChange={v => update("hero.headline2", v)} />
        <Field label="Headline Line 3 (thin)" value={data.hero.headline3} onChange={v => update("hero.headline3", v)} />
      </div>
      <Field label="Subtext" value={data.hero.subtext} onChange={v => update("hero.subtext", v)} multiline />
      <SectionTitle>Metrics Bar</SectionTitle>
      {data.hero.metrics.map((m, i) => (
        <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: 10, marginBottom: 10, alignItems: "flex-end" }}>
          <Field label={`Metric ${i+1} Value`} value={m.val} onChange={v => { const n = deepClone(data); n.hero.metrics[i].val = v; setData(n); }} />
          <Field label="Label" value={m.key} onChange={v => { const n = deepClone(data); n.hero.metrics[i].key = v; setData(n); }} />
          <div style={{ marginBottom: 16 }}>
            <Btn small variant="danger" onClick={() => { const n = deepClone(data); n.hero.metrics.splice(i, 1); setData(n); }}>✕</Btn>
          </div>
        </div>
      ))}
      <Btn small onClick={() => { const n = deepClone(data); n.hero.metrics.push({ val: "New", key: "Metric" }); setData(n); }}>+ Add Metric</Btn>
      <SectionTitle>Footer Bar</SectionTitle>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Field label="Footer Left" value={data.hero.footerLeft} onChange={v => update("hero.footerLeft", v)} />
        <Field label="Footer Right (email)" value={data.hero.footerRight} onChange={v => update("hero.footerRight", v)} />
      </div>
    </div>
  );

  const ProfilePanel = () => (
    <div>
      <SectionTitle>Personal Details</SectionTitle>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Field label="Full Name" value={data.profile.name} onChange={v => update("profile.name", v)} />
        <Field label="Title / Role" value={data.profile.title} onChange={v => update("profile.title", v)} />
        <Field label="Phone" value={data.profile.phone} onChange={v => update("profile.phone", v)} />
        <Field label="Email" value={data.profile.email} onChange={v => update("profile.email", v)} />
        <Field label="LinkedIn URL" value={data.profile.linkedin} onChange={v => update("profile.linkedin", v)} />
        <Field label="Location" value={data.profile.location} onChange={v => update("profile.location", v)} />
      </div>
    </div>
  );

  const TimelinePanel = () => (
    <div>
      <SectionTitle>Career Timeline</SectionTitle>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
        <Btn small onClick={() => { const n = deepClone(data); n.timeline.push({ year: "20XX – 20XX", title: "New Role", desc: "Description…" }); setData(n); }}>+ Add Entry</Btn>
      </div>
      {data.timeline.map((t, i) => (
        <div key={i} style={{ background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.07)", padding: 16, marginBottom: 12, borderRadius: 2 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <span style={{ fontSize: 11, color: "#b8955a", fontFamily: "monospace", letterSpacing: "0.12em" }}>Entry {i + 1}</span>
            <Btn small variant="danger" onClick={() => { const n = deepClone(data); n.timeline.splice(i, 1); setData(n); }}>Remove</Btn>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Field label="Year Range" value={t.year} onChange={v => { const n = deepClone(data); n.timeline[i].year = v; setData(n); }} />
            <Field label="Title / Company" value={t.title} onChange={v => { const n = deepClone(data); n.timeline[i].title = v; setData(n); }} />
          </div>
          <Field label="Description" value={t.desc} onChange={v => { const n = deepClone(data); n.timeline[i].desc = v; setData(n); }} multiline />
        </div>
      ))}
    </div>
  );

  const ProductsPanel = () => (
    <div>
      {/* product tabs */}
      <div style={{ display: "flex", gap: 0, marginBottom: 24, borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        {data.products.map((p, i) => (
          <button key={p.id} onClick={() => setActiveProduct(i)}
            style={{ padding: "10px 18px", background: "transparent", border: "none", borderBottom: `2px solid ${activeProduct === i ? "#b8955a" : "transparent"}`, color: activeProduct === i ? "#b8955a" : "rgba(255,255,255,0.35)", fontSize: 12, cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.06em", transition: "all 0.15s", whiteSpace: "nowrap" }}>
            {p.index} {p.name}
          </button>
        ))}
        <button onClick={() => {
          setData(prev => {
            const n = deepClone(prev);
            const idx = n.products.length + 1;
            n.products.push({ id: `p${Date.now()}`, index: `0${idx}`, category: "Category", company: "Company · Year", name: "New Product", desc: "Description…", contribLabel: "Executive Contributions", contributions: ["Add a contribution"], impact: [{ val: "—", key: "Metric" }], stack: ["Tech"], appName: "App Name", appDev: "Developer", appRating: "Rating", playUrl: "", appleUrl: "", webUrl: "" });
            return n;
          });
          setActiveProduct(data.products.length);
        }} style={{ marginLeft: "auto", padding: "10px 14px", background: "transparent", border: "none", color: "rgba(255,255,255,0.25)", fontSize: 18, cursor: "pointer" }}>+</button>
      </div>

      {prod && (
        <div>
          {/* header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
            <SectionTitle style={{ margin: 0 }}>Card Identity</SectionTitle>
            {data.products.length > 1 && (
              <Btn small variant="danger" onClick={() => {
                setData(prev => { const n = deepClone(prev); n.products.splice(activeProduct, 1); return n; });
                setActiveProduct(Math.max(0, activeProduct - 1));
              }}>Delete Product</Btn>
            )}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "80px 1fr 1fr", gap: 12 }}>
            <Field label="Index" value={prod.index} onChange={v => setProd("index", v)} />
            <Field label="Category Tag" value={prod.category} onChange={v => setProd("category", v)} />
            <Field label="Company / Period" value={prod.company} onChange={v => setProd("company", v)} />
          </div>
          <Field label="Product Name" value={prod.name} onChange={v => setProd("name", v)} />
          <Field label="Description" value={prod.desc} onChange={v => setProd("desc", v)} multiline />

          <SectionTitle>Contributions</SectionTitle>
          <Field label="Section Label" value={prod.contribLabel} onChange={v => setProd("contribLabel", v)} />
          {prod.contributions.map((c, i) => (
            <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "flex-start" }}>
              <textarea value={c} onChange={e => { const n = deepClone(data); n.products[activeProduct].contributions[i] = e.target.value; setData(n); }} rows={2} style={{ ...inputStyle(true), flex: 1 }} />
              <Btn small variant="danger" onClick={() => { const n = deepClone(data); n.products[activeProduct].contributions.splice(i, 1); setData(n); }}>✕</Btn>
            </div>
          ))}
          <Btn small onClick={() => { const n = deepClone(data); n.products[activeProduct].contributions.push("New contribution…"); setData(n); }}>+ Add Contribution</Btn>

          <SectionTitle>Impact Metrics</SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
            {prod.impact.map((m, i) => (
              <div key={i} style={{ background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.07)", padding: 12, borderRadius: 2 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <Label>Cell {i+1}</Label>
                  <button onClick={() => { const n = deepClone(data); n.products[activeProduct].impact.splice(i, 1); setData(n); }} style={{ background: "none", border: "none", color: "#e07060", cursor: "pointer", fontSize: 12 }}>✕</button>
                </div>
                <input value={m.val} onChange={e => { const n = deepClone(data); n.products[activeProduct].impact[i].val = e.target.value; setData(n); }} placeholder="Value" style={{ ...inputStyle(false), marginBottom: 6 }} />
                <input value={m.key} onChange={e => { const n = deepClone(data); n.products[activeProduct].impact[i].key = e.target.value; setData(n); }} placeholder="Label" style={inputStyle(false)} />
              </div>
            ))}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", border: "1px dashed rgba(255,255,255,0.1)", borderRadius: 2, minHeight: 90 }}>
              <Btn small onClick={() => { const n = deepClone(data); n.products[activeProduct].impact.push({ val: "—", key: "Metric" }); setData(n); }}>+ Add</Btn>
            </div>
          </div>

          <SectionTitle>Technology Stack</SectionTitle>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
            {prod.stack.map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 4, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", padding: "4px 10px", borderRadius: 2 }}>
                <input value={s} onChange={e => { const n = deepClone(data); n.products[activeProduct].stack[i] = e.target.value; setData(n); }} style={{ background: "transparent", border: "none", color: "rgba(255,255,255,0.55)", fontSize: 11, fontFamily: "monospace", outline: "none", width: Math.max(s.length * 7, 60) + "px" }} />
                <button onClick={() => { const n = deepClone(data); n.products[activeProduct].stack.splice(i, 1); setData(n); }} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.2)", cursor: "pointer", fontSize: 12, padding: 0, lineHeight: 1 }}>✕</button>
              </div>
            ))}
            <button onClick={() => { const n = deepClone(data); n.products[activeProduct].stack.push("New Tech"); setData(n); }} style={{ background: "transparent", border: "1px dashed rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.25)", fontSize: 11, fontFamily: "monospace", padding: "4px 12px", cursor: "pointer", borderRadius: 2 }}>+ Add</button>
          </div>

          <SectionTitle>App Store Info</SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Field label="App Name" value={prod.appName} onChange={v => setProd("appName", v)} />
            <Field label="Developer / Category" value={prod.appDev} onChange={v => setProd("appDev", v)} />
            <Field label="Rating / Download Count" value={prod.appRating} onChange={v => setProd("appRating", v)} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            <Field label="Google Play URL" value={prod.playUrl || ""} onChange={v => setProd("playUrl", v)} placeholder="https://play.google.com/..." />
            <Field label="Apple App Store URL" value={prod.appleUrl || ""} onChange={v => setProd("appleUrl", v)} placeholder="https://apps.apple.com/..." />
            <Field label="Website URL (optional)" value={prod.webUrl || ""} onChange={v => setProd("webUrl", v)} placeholder="https://..." />
          </div>
        </div>
      )}
    </div>
  );

  const panels = { Hero: HeroPanel, Profile: ProfilePanel, Timeline: TimelinePanel, Products: ProductsPanel };
  const ActivePanel = panels[activeTab];

  return (
    <div style={{ display: "flex", height: "100vh", background: "#080808", color: "#fafafa", fontFamily: "'Inter', system-ui, sans-serif", fontSize: 13, fontWeight: 300, overflow: "hidden" }}>
      <Sidebar />
      <div style={{ flex: 1, overflow: "auto", padding: "32px 40px" }}>
        {/* top bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28, paddingBottom: 20, borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 300, letterSpacing: "-0.01em", marginBottom: 2 }}>{activeTab}</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: "0.08em" }}>
              { { Hero: "Edit your hero section, headline and metrics", Profile: "Your name, contact info and links", Timeline: "Your career milestones and history", Products: "Product cards — content, metrics and store links" }[activeTab] }
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            {saved && <span style={{ fontSize: 11, color: "#b8955a", fontFamily: "monospace", letterSpacing: "0.1em" }}>✓ Changes saved</span>}
            <Btn variant="gold" onClick={handleSave}>Save Changes</Btn>
          </div>
        </div>
        <ActivePanel />
      </div>
    </div>
  );
}
