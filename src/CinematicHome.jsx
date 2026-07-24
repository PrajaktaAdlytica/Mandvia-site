import { useCallback, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Ban,
  CircleDollarSign,
  CircleGauge,
  FileCheck2,
  Fingerprint,
  KeyRound,
  Landmark,
  Layers3,
  LockKeyhole,
  Mail,
  MapPin,
  ReceiptText,
  Route,
  ShieldCheck,
  Sparkles,
  UserRoundCheck,
  WalletCards,
} from "lucide-react";
import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import "./cinematic.css";

const videos = {
  hero: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a.mp4",
  transaction: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260402_054547_9875cfc5-155a-4229-8ec8-b7ba7125cbf8.mp4",
  control: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4",
  wallet: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4",
  ledger: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260324_151826_c7218672-6e92-402c-9e45-f1e0f454bdc4.mp4",
};

const reveal = {
  initial: { opacity: 0, y: 44 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
};

function SeamlessHeroVideo() {
  const videoRef = useRef(null);
  const fadeFrame = useRef(0);

  const fadeTo = useCallback((target, duration = 500) => {
    const video = videoRef.current;
    if (!video) return;
    window.cancelAnimationFrame(fadeFrame.current);
    const startOpacity = Number(video.style.opacity || 0);
    const startedAt = performance.now();

    const animate = (now) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      video.style.opacity = String(startOpacity + (target - startOpacity) * progress);
      if (progress < 1) fadeFrame.current = window.requestAnimationFrame(animate);
    };
    fadeFrame.current = window.requestAnimationFrame(animate);
  }, []);

  const handleCanPlay = () => {
    videoRef.current?.play().catch(() => {});
    fadeTo(1);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video && video.duration - video.currentTime <= 0.55) fadeTo(0);
  };

  const handleEnded = () => {
    const video = videoRef.current;
    if (!video) return;
    video.style.opacity = "0";
    window.setTimeout(() => {
      video.currentTime = 0;
      video.play().catch(() => {});
      fadeTo(1);
    }, 100);
  };

  return (
    <video
      ref={videoRef}
      className="cinematic-hero-video"
      src={videos.hero}
      muted
      autoPlay
      playsInline
      preload="auto"
      onCanPlay={handleCanPlay}
      onTimeUpdate={handleTimeUpdate}
      onEnded={handleEnded}
    />
  );
}

function SectionLabel({ children }) {
  return <div className="cinematic-label">{children}</div>;
}

function AboutSection() {
  return (
    <section className="cinematic-about">
      <motion.div className="cinematic-container" {...reveal}>
        <SectionLabel>Autonomous software, accountable money</SectionLabel>
        <h2>
          Software can act with speed.
          <br />
          <em>Mandvia gives it authority.</em>
        </h2>
        <div className="about-detail">
          <span>01 / The mandate</span>
          <p>
            Every purchase begins with intent. Mandvia binds that intent to a payment
            identity, executable policy, human oversight, and a complete evidence trail.
          </p>
        </div>
      </motion.div>
    </section>
  );
}

const problemSignals = [
  {
    index: "01",
    label: "Identity gap",
    title: "A shared card cannot explain which agent acted.",
    body: "Credentials move faster than ownership. Finance receives a charge, but not the software identity or the task behind it.",
    icon: Fingerprint,
    status: "Unattributed",
    rows: [["Buyer", "Unknown agent"], ["Purpose", "Missing"], ["Owner", "Shared account"]],
  },
  {
    index: "02",
    label: "Policy gap",
    title: "Approval rules live outside the transaction.",
    body: "Budgets, merchant scopes, and human approval paths sit in documents an autonomous buyer cannot execute.",
    icon: AlertTriangle,
    status: "Outside policy",
    rows: [["Amount", "€1,480"], ["Limit", "€500"], ["Decision", "After payment"]],
  },
  {
    index: "03",
    label: "Evidence gap",
    title: "Receipts arrive after context has disappeared.",
    body: "The payment, invoice, policy decision, and agent intent become separate reconciliation work for finance.",
    icon: ReceiptText,
    status: "Proof missing",
    rows: [["Payment", "Complete"], ["Receipt", "Not found"], ["Settlement", "Unmatched"]],
  },
  {
    index: "04",
    label: "Control gap",
    title: "The only remaining control is to stop the agent.",
    body: "Teams choose between unrestricted purchasing and manual review because access is not scoped to the task.",
    icon: Ban,
    status: "Agent paused",
    rows: [["Automation", "Blocked"], ["Queue", "17 requests"], ["SLA", "4h 12m"]],
  },
];

function ProblemSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const trackX = useTransform(scrollYProgress, [0, 1], ["4%", "-66%"]);

  return (
    <section className="problem-story" id="problem" ref={ref}>
      <div className="problem-sticky">
        <div className="cinematic-container problem-heading">
          <SectionLabel>The problem / money moves without context</SectionLabel>
          <h2>Agents are ready to buy. <em>Finance is not ready to trust them.</em></h2>
        </div>
        <div className="problem-window">
          <motion.div className="problem-track" style={{ x: trackX }}>
            {problemSignals.map(({ index, label, title, body, icon: Icon, status, rows }) => (
              <motion.article
                className="liquid-glass problem-card"
                whileHover={{ y: -10, rotate: -0.35 }}
                transition={{ duration: 0.28 }}
                key={label}
              >
                <div className="problem-card-head">
                  <span>{index} / {label}</span>
                  <Icon size={19} />
                </div>
                <h3>{title}</h3>
                <p>{body}</p>
                <div className="problem-record">
                  {rows.map(([key, value]) => (
                    <div key={key}><span>{key}</span><strong>{value}</strong></div>
                  ))}
                </div>
                <div className="problem-status"><i /> {status}</div>
              </motion.article>
            ))}
          </motion.div>
        </div>
        <div className="cinematic-container problem-progress">
          <motion.span style={{ scaleX: scrollYProgress }} />
          <small>Scroll to inspect the control gaps</small>
        </div>
      </div>
    </section>
  );
}

const solutionSteps = [
  {
    name: "Wallet",
    eyebrow: "01 / Give every agent a payment identity",
    title: "Know exactly who is buying.",
    body: "Issue scoped credentials and controlled funding to each autonomous buyer.",
    icon: KeyRound,
    metric: "€2,500",
    metricLabel: "Available mandate",
    rows: [["Agent", "procurement-eu-04"], ["Scope", "Cloud infrastructure"], ["Expires", "18:00 CET"]],
  },
  {
    name: "Policy",
    eyebrow: "02 / Make authority executable",
    title: "Put the rules in the payment path.",
    body: "Evaluate merchant, amount, purpose, geography, and approval requirements before money moves.",
    icon: ShieldCheck,
    metric: "14 ms",
    metricLabel: "Policy decision",
    rows: [["Merchant", "Approved"], ["Amount", "Within €250"], ["Decision", "Allow"]],
  },
  {
    name: "Ledger",
    eyebrow: "03 / Keep proof attached",
    title: "Close the loop automatically.",
    body: "Connect intent, authorization, payment, receipt, and settlement in one evidence record.",
    icon: FileCheck2,
    metric: "100%",
    metricLabel: "Evidence attached",
    rows: [["Receipt", "Captured"], ["Settlement", "Matched"], ["Record", "EVD-2026-7714"]],
  },
];

function SolutionSection() {
  const [activeStep, setActiveStep] = useState(0);
  const active = solutionSteps[activeStep];
  const ActiveIcon = active.icon;

  return (
    <section className="solution-story" id="solution">
      <div className="cinematic-container solution-heading">
        <SectionLabel>The solution / a mandate that travels with the payment</SectionLabel>
        <h2>One control plane. <em>Three accountable layers.</em></h2>
      </div>
      <div className="cinematic-container solution-layout">
        <div className="solution-steps">
          {solutionSteps.map((step, index) => (
            <motion.article
              className={activeStep === index ? "solution-step is-active" : "solution-step"}
              onViewportEnter={() => setActiveStep(index)}
              viewport={{ margin: "-42% 0px -42% 0px" }}
              whileHover={{ x: 8 }}
              key={step.name}
            >
              <span>{step.eyebrow}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </motion.article>
          ))}
        </div>
        <div className="solution-console-wrap">
          <motion.div
            className="liquid-glass solution-console"
            key={active.name}
            initial={{ opacity: 0.35, scale: 0.985, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <div className="solution-console-top">
              <div><ActiveIcon size={19} /><span>Mandvia {active.name}</span></div>
              <strong>Live</strong>
            </div>
            <div className="solution-metric">
              <small>{active.metricLabel}</small>
              <strong>{active.metric}</strong>
              <CircleGauge size={24} />
            </div>
            <div className="solution-console-table">
              {active.rows.map(([label, value], index) => (
                <motion.div
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.08 }}
                  key={label}
                >
                  <span>{label}</span><strong>{value}</strong><BadgeCheck size={15} />
                </motion.div>
              ))}
            </div>
            <div className="solution-stack">
              {solutionSteps.map((step, index) => (
                <span className={index <= activeStep ? "is-complete" : ""} key={step.name}>
                  {index < activeStep ? <BadgeCheck size={14} /> : <Layers3 size={14} />}
                  {step.name}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const instrumentPlates = [
  {
    index: "01",
    label: "Identity",
    title: "A bounded instrument for every software buyer.",
    body: "The mandate custodian binds an agent identity to purpose, budget, timing, and the payment credential it may use.",
    signal: "procurement-eu-04 / active",
    image: "/assets/mandate-custodian-detail.png",
    alt: "Mandvia mandate custodian with an intent signal entering its authorization core",
    icon: KeyRound,
    layout: "portrait",
  },
  {
    index: "02",
    label: "Decision",
    title: "Policy becomes a physical boundary in the payment path.",
    body: "Merchant, amount, context, and delegated authority converge before the aperture changes from pending to authorized.",
    signal: "MND-2841 / allow / 14 ms",
    image: "/assets/authorization-aperture-detail.png",
    alt: "Mandvia policy aperture showing the controls evaluated before authorization",
    icon: ShieldCheck,
    layout: "square",
  },
  {
    index: "03",
    label: "Evidence",
    title: "The authorized route carries its proof forward.",
    body: "The decision, transaction, receipt state, and ledger entry remain attached so finance can inspect the outcome without reconstruction.",
    signal: "EVD-2026-7714 / matched",
    image: "/assets/settlement-rail-detail.png",
    alt: "Mandvia authorization rail carrying an approved transaction and its evidence receipt",
    icon: ReceiptText,
    layout: "landscape",
  },
];

function MandateInstrumentSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const trackX = useTransform(scrollYProgress, [0, 1], ["0%", "-66.666%"]);

  return (
    <section className="instrument-story" ref={ref}>
      <div className="instrument-sticky">
        <div className="cinematic-container instrument-heading">
          <SectionLabel>The mandate instrument / visual system</SectionLabel>
          <h2>Intent enters. <em>Accountability comes out.</em></h2>
        </div>
        <div className="instrument-window">
          <motion.div className="instrument-track" style={{ x: trackX }}>
            {instrumentPlates.map(({ index, label, title, body, signal, image, alt, icon: Icon, layout }) => (
              <article className={`instrument-plate is-${layout}`} key={label}>
                <div className="instrument-plate-copy">
                  <div className="instrument-plate-index">{index} / {label}</div>
                  <Icon size={21} />
                  <h3>{title}</h3>
                  <p>{body}</p>
                  <span>{signal}</span>
                </div>
                <div className="instrument-plate-media">
                  <img src={image} alt={alt} />
                  <div className="instrument-crosshair" aria-hidden="true" />
                </div>
              </article>
            ))}
          </motion.div>
        </div>
        <div className="cinematic-container instrument-progress">
          <motion.span style={{ scaleX: scrollYProgress }} />
          <small>Scroll through identity, decision, and evidence</small>
        </div>
      </div>
    </section>
  );
}

function FeaturedTransaction() {
  const ref = useRef(null);
  const visible = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="cinematic-feature" ref={ref}>
      <motion.div
        className="cinematic-container feature-video-shell"
        initial={{ opacity: 0, y: 60 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <video src={videos.transaction} muted autoPlay loop playsInline preload="auto" />
        <div className="feature-shade" />
        <div className="feature-content">
          <div className="liquid-glass transaction-glass">
            <SectionLabel>One transaction / one record</SectionLabel>
            <h3>From machine intent to settled evidence.</h3>
            <p>
              Mandvia evaluates who is buying, what they can spend, why the purchase
              exists, and what proof must return.
            </p>
            <div className="transaction-lifecycle" aria-label="Transaction lifecycle">
              {[
                ["Intent", Sparkles],
                ["Identity", Fingerprint],
                ["Policy", ShieldCheck],
                ["Receipt", ReceiptText],
                ["Settled", FileCheck2],
              ].map(([label, Icon], index) => (
                <motion.div
                  className="transaction-stage"
                  initial={{ opacity: 0, x: -12 }}
                  animate={visible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.35 + index * 0.12 }}
                  key={label}
                >
                  <span><Icon size={14} /></span>
                  <small>{label}</small>
                </motion.div>
              ))}
            </div>
          </div>
          <Link className="liquid-button" to="/product/policy">
            Follow the decision <ArrowUpRight size={17} />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

const spendData = [
  { time: "08:00", requested: 24, settled: 18 },
  { time: "09:00", requested: 68, settled: 54 },
  { time: "10:00", requested: 112, settled: 91 },
  { time: "11:00", requested: 184, settled: 142 },
  { time: "12:00", requested: 238, settled: 180 },
  { time: "13:00", requested: 286, settled: 214 },
  { time: "14:00", requested: 218, settled: 218 },
];

function SpendBoundary() {
  return (
    <motion.div
      className="liquid-glass spend-boundary"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="spend-boundary-head">
        <div>
          <SectionLabel>Live mandate / procurement-eu-04</SectionLabel>
          <h3>The spending boundary stays visible.</h3>
        </div>
        <div className="boundary-summary">
          <span><i className="requested-dot" /> Requested <strong>€286</strong></span>
          <span><i className="settled-dot" /> Settled <strong>€218</strong></span>
          <span><i className="limit-dot" /> Limit <strong>€250</strong></span>
        </div>
      </div>
      <div className="spend-chart" aria-label="Requested and settled spend against a 250 euro policy limit">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={spendData} margin={{ top: 12, right: 12, left: -18, bottom: 0 }}>
            <defs>
              <linearGradient id="requestedArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#e85d45" stopOpacity={0.32} />
                <stop offset="100%" stopColor="#e85d45" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="settledArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#78d5d1" stopOpacity={0.28} />
                <stop offset="100%" stopColor="#78d5d1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(247,246,241,0.08)" vertical={false} />
            <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: "rgba(247,246,241,0.42)", fontSize: 10 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: "rgba(247,246,241,0.42)", fontSize: 10 }} domain={[0, 320]} />
            <Tooltip
              contentStyle={{
                border: "1px solid rgba(247,246,241,0.16)",
                borderRadius: 6,
                background: "rgba(5,7,6,0.94)",
                color: "#f7f6f1",
                fontSize: 12,
              }}
              cursor={{ stroke: "rgba(247,246,241,0.2)" }}
            />
            <ReferenceLine y={250} stroke="#f7f6f1" strokeDasharray="4 5" label={{ value: "Policy limit €250", fill: "#f7f6f1", fontSize: 10, position: "insideTopRight" }} />
            <Area type="monotone" dataKey="requested" stroke="#e85d45" strokeWidth={2} fill="url(#requestedArea)" animationDuration={1400} />
            <Area type="monotone" dataKey="settled" stroke="#78d5d1" strokeWidth={2} fill="url(#settledArea)" animationDuration={1700} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="boundary-decision">
        <BadgeCheck size={17} />
        <span>€218 settled automatically</span>
        <strong>€68 routed for approval</strong>
      </div>
    </motion.div>
  );
}

function PhilosophySection() {
  return (
    <section className="cinematic-philosophy">
      <div className="cinematic-container">
        <motion.h2 {...reveal}>
          Autonomy <em>×</em> control
        </motion.h2>
        <div className="philosophy-grid">
          <motion.div
            className="philosophy-video"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.85 }}
          >
            <video src={videos.control} muted autoPlay loop playsInline preload="auto" />
            <div className="video-index">02 / Human control</div>
          </motion.div>
          <motion.div
            className="philosophy-copy"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.85 }}
          >
            <div>
              <SectionLabel>Authority before access</SectionLabel>
              <h3>Give each agent exactly enough power to complete its task.</h3>
              <p>
                Merchant scopes, amount limits, time windows, and purpose constraints
                travel with the payment identity.
              </p>
            </div>
            <div>
              <SectionLabel>People stay in the loop</SectionLabel>
              <h3>Exceptions arrive with context, not confusion.</h3>
              <p>
                Route unusual spend to the right approver with the agent’s intent and
                policy evidence already assembled.
              </p>
            </div>
          </motion.div>
        </div>
        <SpendBoundary />
      </div>
    </section>
  );
}

const products = [
  {
    name: "Wallet",
    tag: "Payment identity",
    body: "Controlled funding and scoped credentials for each software buyer.",
    icon: WalletCards,
    video: videos.wallet,
    href: "/product/wallet",
  },
  {
    name: "Policy",
    tag: "Executable authority",
    body: "Rules, limits, exceptions, and human approval paths agents can execute.",
    icon: ShieldCheck,
    video: videos.control,
    href: "/product/policy",
  },
  {
    name: "Ledger",
    tag: "Verifiable evidence",
    body: "Receipts, decisions, reconciliation, and settlement in one record.",
    icon: ReceiptText,
    video: videos.ledger,
    href: "/product/ledger",
  },
];

function ProductSection() {
  return (
    <section className="cinematic-products" id="products">
      <div className="cinematic-container">
        <motion.div className="cinematic-section-head" {...reveal}>
          <h2>Three products. <em>One mandate.</em></h2>
          <SectionLabel>Mandvia system</SectionLabel>
        </motion.div>
        <div className="product-film-grid">
          {products.map((product, index) => (
            <motion.article
              className="liquid-glass product-film"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: index * 0.12 }}
              key={product.name}
            >
              <Link to={product.href} aria-label={`Explore Mandvia ${product.name}`}>
                <div className="product-film-media">
                  <video src={product.video} muted autoPlay loop playsInline preload="metadata" />
                  <span className="product-number">0{index + 1}</span>
                </div>
                <div className="product-film-body">
                  <div>
                    <SectionLabel>{product.tag}</SectionLabel>
                    <product.icon size={22} />
                  </div>
                  <h3>Mandvia {product.name}</h3>
                  <p>{product.body}</p>
                  <span className="product-arrow"><ArrowUpRight size={18} /></span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

const evidence = [
  ["09:41:02", "Purchase requested", "procurement-eu-04", "Intent", Sparkles],
  ["09:41:03", "Policy approved", "MND-2841", "Allow", BadgeCheck],
  ["09:41:05", "Payment completed", "Mandvia Wallet", "€180.00", CircleDollarSign],
  ["09:41:08", "Receipt captured", "Vendor", "invoice-0184.pdf", ReceiptText],
  ["09:42:16", "Settlement matched", "Mandvia Ledger", "SEPA complete", Landmark],
];

function EvidenceSection() {
  return (
    <section className="cinematic-evidence">
      <div className="cinematic-container evidence-layout">
        <motion.div className="evidence-copy" {...reveal}>
          <SectionLabel>Designed for inspection</SectionLabel>
          <h2>A transaction that can explain itself.</h2>
          <p>
            Intent, authority, payment, receipt, and settlement remain connected in a
            single queryable trail.
          </p>
          <Link className="liquid-button" to="/product/ledger">
            Explore Ledger <ArrowRight size={17} />
          </Link>
        </motion.div>
        <motion.div className="liquid-glass evidence-console" {...reveal}>
          <div className="evidence-console-head">
            <span>Evidence record / live</span>
            <strong>EVD-2026-7714</strong>
          </div>
          <div className="evidence-table-head" aria-hidden="true">
            <span>Time</span><span>Event</span><span>Actor</span><span>Evidence</span>
          </div>
          <div className="evidence-table" role="table" aria-label="Transaction evidence timeline">
            {evidence.map(([time, event, actor, proof, Icon], index) => (
              <motion.div
                className="evidence-table-row"
                role="row"
                initial={{ opacity: 0, x: 18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                key={event}
              >
                <time>{time}</time>
                <div><Icon size={16} /><strong>{event}</strong></div>
                <span>{actor}</span>
                <span>{proof}<BadgeCheck size={15} /></span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const perspectives = [
  {
    role: "Head of Automation",
    company: "European marketplace",
    quote: "The agent should move at software speed, but the authority must still look like finance designed it.",
    signal: "Control without queues",
    score: 92,
  },
  {
    role: "Fintech Product Lead",
    company: "Embedded payments platform",
    quote: "We need one decision record that explains the identity, policy, payment, and receipt without stitching systems together.",
    signal: "One evidence trail",
    score: 88,
  },
  {
    role: "Procurement Director",
    company: "Multi-entity SaaS company",
    quote: "Autonomy becomes useful when exceptions arrive with enough context for a person to decide in seconds.",
    signal: "Faster exceptions",
    score: 84,
  },
];

function TestimonialsSection() {
  return (
    <section className="testimonials-story">
      <div className="cinematic-container testimonials-heading">
        <SectionLabel>Representative design-partner perspectives</SectionLabel>
        <h2>What operators expect <em>Mandvia to prove.</em></h2>
        <p>These representative perspectives frame the buying requirements. Customer-approved quotes will replace them after design-partner sessions.</p>
      </div>
      <div className="cinematic-container testimonial-stack">
        {perspectives.map((perspective, index) => (
          <motion.article
            className="liquid-glass testimonial-card"
            style={{ top: 118 + index * 22 }}
            initial={{ opacity: 0, y: 70, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            whileHover={{ x: index % 2 === 0 ? 8 : -8 }}
            transition={{ duration: 0.7 }}
            key={perspective.role}
          >
            <div className="testimonial-index">0{index + 1}</div>
            <blockquote>“{perspective.quote}”</blockquote>
            <div className="testimonial-meta">
              <div><strong>{perspective.role}</strong><span>{perspective.company}</span></div>
              <div className="testimonial-signal">
                <span>{perspective.signal}</span>
                <div><i style={{ width: `${perspective.score}%` }} /></div>
                <strong>{perspective.score}%</strong>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

const pricingPlans = [
  {
    name: "Demo",
    price: "Scoped",
    body: "Prove one accountable agent-purchasing workflow.",
    accent: "coral",
    features: [["Agents", "Up to 5"], ["Mandates", "1 workflow"], ["Evidence", "Full trail"], ["Support", "Demo design"]],
    cta: "Request demo",
  },
  {
    name: "Scale",
    price: "Usage-based",
    body: "Operate multiple teams, agents, and purchasing policies.",
    accent: "mint",
    featured: true,
    features: [["Agents", "Flexible"], ["Mandates", "Multi-team"], ["Evidence", "Export + API"], ["Support", "Priority"]],
    cta: "Talk to product",
  },
  {
    name: "Platform",
    price: "Custom",
    body: "Embed Mandvia into a fintech, marketplace, or agent platform.",
    accent: "frost",
    features: [["Agents", "Platform scale"], ["Mandates", "Programmable"], ["Evidence", "Embedded ledger"], ["Support", "Solution team"]],
    cta: "Discuss platform",
  },
];

function PricingSection() {
  return (
    <section className="pricing-story" id="pricing">
      <div className="cinematic-container">
        <motion.div className="pricing-heading" {...reveal}>
          <div>
            <SectionLabel>Pricing / start with the operating model</SectionLabel>
            <h2>Price the mandate, <em>not the seat.</em></h2>
          </div>
          <p>Final pricing follows agent volume, payment activity, policy complexity, and integration scope.</p>
        </motion.div>
        <div className="pricing-grid">
          {pricingPlans.map((plan, index) => (
            <motion.article
              className={`liquid-glass pricing-card ${plan.featured ? "is-featured" : ""}`}
              initial={{ opacity: 0, x: index === 0 ? -50 : index === 2 ? 50 : 0, y: index === 1 ? 45 : 0 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.75, delay: index * 0.1 }}
              key={plan.name}
            >
              <div className="pricing-card-top">
                <span className={`pricing-swatch ${plan.accent}`} />
                <strong>{plan.name}</strong>
                {plan.featured && <small>Recommended path</small>}
              </div>
              <h3>{plan.price}</h3>
              <p>{plan.body}</p>
              <div className="pricing-meter" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((bar) => <i className={bar <= index + 1 ? "is-on" : ""} key={bar} />)}
              </div>
              <div className="pricing-table">
                {plan.features.map(([label, value]) => (
                  <div key={label}><span>{label}</span><strong>{value}</strong></div>
                ))}
              </div>
              <Link to="/demo">{plan.cta}<ArrowUpRight size={16} /></Link>
            </motion.article>
          ))}
        </div>
        <div className="pricing-note">
          <LockKeyhole size={16} />
          <span>No public card-processing markup is presented here. Commercial terms are confirmed during solution design.</span>
        </div>
      </div>
    </section>
  );
}

function FinalSection() {
  return (
    <section className="cinematic-final">
      <motion.div className="cinematic-container" {...reveal}>
        <SectionLabel>Start with one accountable workflow</SectionLabel>
        <h2>Give agents a mandate, <em>not a blank cheque.</em></h2>
        <p>
          Define one software buyer, one budget, and one measurable purchasing flow.
        </p>
        <Link className="final-button" to="/demo">
          Request a demo <ArrowUpRight size={18} />
        </Link>
      </motion.div>
    </section>
  );
}

function CinematicFooter() {
  return (
    <footer className="cinematic-footer" id="footer">
      <div className="cinematic-container">
        <div className="cinematic-footer-main">
          <div className="cinematic-footer-brand">
            <img src="/brand/mandvia-reversed.svg" alt="Mandvia" />
            <p>Accountable payment infrastructure for autonomous software.</p>
            <address><MapPin size={16} /><span>Warsaw, Poland<br />European Union</span></address>
            <a href="mailto:hello@mandvia.com"><Mail size={15} /> hello@mandvia.com</a>
          </div>
          <div className="cinematic-footer-column">
            <strong>Product</strong>
            <Link to="/product/wallet">Wallet</Link>
            <Link to="/product/policy">Policy</Link>
            <Link to="/product/ledger">Ledger</Link>
            <Link to="/pricing">Pricing</Link>
          </div>
          <div className="cinematic-footer-column">
            <strong>Company</strong>
            <Link to="/company">About</Link>
            <Link to="/security">Security</Link>
            <Link to="/demo">Contact</Link>
            <Link to="/signin">Sign in</Link>
          </div>
          <div className="cinematic-footer-column">
            <strong>Legal</strong>
            <Link to="/privacy">Privacy policy</Link>
            <Link to="/terms">Terms of use</Link>
            <Link to="/demo">Request demo</Link>
          </div>
        </div>
        <div className="cinematic-footer-trust">
          <div className="cinematic-socials" aria-label="Mandvia social media">
            <span className="is-unavailable" aria-label="Mandvia LinkedIn profile coming soon" title="LinkedIn profile coming soon"><FaLinkedinIn size={17} /></span>
            <span className="is-unavailable" aria-label="Mandvia X profile coming soon" title="X profile coming soon"><FaXTwitter size={17} /></span>
            <span className="is-unavailable" aria-label="Mandvia GitHub profile coming soon" title="GitHub profile coming soon"><FaGithub size={18} /></span>
          </div>
          <div className="cinematic-status"><i /><span>Service status</span><strong>Operational</strong></div>
          <div className="cinematic-jurisdiction"><ShieldCheck size={16} /><span>Designed for EU operating requirements</span></div>
        </div>
        <div className="cinematic-footer-base">
          <span>© 2026 Mandvia. All rights reserved.</span>
          <span>Intent → authority → evidence → settlement</span>
        </div>
      </div>
    </footer>
  );
}

export function CinematicHome() {
  const [emailState, setEmailState] = useState("idle");

  const handleEmail = (event) => {
    event.preventDefault();
    setEmailState("sent");
  };

  return (
    <main className="cinematic-home">
      <section className="cinematic-hero">
        <SeamlessHeroVideo />
        <div className="cinematic-hero-wash" />
        <div className="cinematic-hero-content">
          <SectionLabel>Agent payment control infrastructure</SectionLabel>
          <h1>
            Agents can spend.
            <br />
            <em>Mandates decide.</em>
          </h1>
          <p>
            Payment identity, executable policy, receipts, and settlement for
            autonomous software buyers.
          </p>
          <div className="hero-conversion">
            <form className="liquid-glass hero-email" onSubmit={handleEmail}>
              <input type="email" required aria-label="Work email" placeholder="Enter your work email" />
              <button type="submit" aria-label="Submit email">
                {emailState === "sent" ? <BadgeCheck size={20} /> : <ArrowRight size={20} />}
              </button>
            </form>
            <Link className="liquid-button" to="/demo">
              Request a demo
            </Link>
          </div>
          <div className="hero-trust">
            <ShieldCheck size={16} />
            <span>Built for EU operating realities</span>
          </div>
        </div>
        <div className="cinematic-hero-status liquid-glass">
          <span className="status-pulse" />
          <div><small>Mandate status</small><strong>Authority active</strong></div>
          <Route size={18} />
        </div>
      </section>
      <AboutSection />
      <ProblemSection />
      <SolutionSection />
      <MandateInstrumentSection />
      <FeaturedTransaction />
      <PhilosophySection />
      <ProductSection />
      <EvidenceSection />
      <TestimonialsSection />
      <PricingSection />
      <FinalSection />
      <CinematicFooter />
    </main>
  );
}
