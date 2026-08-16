import { useEffect, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Blocks,
  BookOpen,
  Check,
  ChevronDown,
  CircleDollarSign,
  CircleGauge,
  Clock3,
  Code2,
  FileCheck2,
  Fingerprint,
  KeyRound,
  Landmark,
  LockKeyhole,
  Mail,
  MapPin,
  Menu,
  Network,
  Orbit,
  Phone,
  ReceiptText,
  Route,
  ScanLine,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  SquareArrowOutUpRight,
  UserRoundCheck,
  WalletCards,
  X,
  Zap,
} from "lucide-react";
import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { Link, Navigate, Route as AppRoute, Routes, useLocation } from "react-router-dom";
import { Chamber } from "./Chamber.jsx";
import { CinematicHome } from "./CinematicHome.jsx";

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    slug: "wallet",
    name: "Wallet",
    kicker: "Payment identity",
    icon: WalletCards,
    summary: "Purpose-built payment identities for software agents.",
    title: "A wallet for software that buys.",
    body: "Issue an agent a controlled payment identity, fund it just in time, and know which machine initiated every purchase.",
    visual: "/assets/product-mandate-custodian.png",
    accent: "mint",
    metrics: ["Per-agent identity", "Just-in-time funding", "Scoped credentials"],
  },
  {
    slug: "policy",
    name: "Policy",
    kicker: "Executable authority",
    icon: ShieldCheck,
    summary: "Translate business rules into machine-readable authority.",
    title: "Rules agents can execute. Limits humans can trust.",
    body: "Define merchants, amounts, time windows, budgets, and approval paths once. Mandvia evaluates every purchase against the mandate.",
    visual: "/assets/product-authorization-aperture.png",
    accent: "coral",
    metrics: ["Merchant controls", "Approval routing", "Real-time decisions"],
  },
  {
    slug: "ledger",
    name: "Ledger",
    kicker: "Verifiable evidence",
    icon: ReceiptText,
    summary: "Receipts, decisions, and settlement in one evidence trail.",
    title: "Every autonomous purchase, fully accountable.",
    body: "Bind intent, authorization, receipt, and settlement into a single record your finance and compliance teams can inspect.",
    visual: "/assets/product-mandate-custodian.png",
    accent: "amber",
    metrics: ["Receipt matching", "Decision evidence", "Settlement records"],
  },
];

const steps = [
  ["01", "Intent", "An agent proposes a purchase with merchant, amount, purpose, and context.", Sparkles],
  ["02", "Mandate", "Mandvia finds the exact authority assigned to that agent and task.", Fingerprint],
  ["03", "Decision", "Policy evaluates scope, budget, timing, risk, and approval requirements.", ScanLine],
  ["04", "Evidence", "The receipt and settlement become part of the same verifiable record.", FileCheck2],
];

const siteMetadata = {
  title: "Mandvia — Accountable agent payments",
  description: "Mandvia is the control and evidence layer for autonomous software spend.",
  canonical: "https://www.mandvia.com/",
};

const announcementMetadata = {
  title: "Mandvia joins the TipHub portfolio",
  description: "On 29 July 2026, TipHub announced a $525K portfolio allocation to Mandvia, supporting its work across fintech and agent payments.",
  canonical: "https://www.mandvia.com/news/tiphub-allocation",
  type: "article",
  publishedTime: "2026-07-29",
};

function PageMetadata() {
  const location = useLocation();

  useEffect(() => {
    const metadata = location.pathname === "/news/tiphub-allocation" ? announcementMetadata : siteMetadata;
    document.title = metadata.title;

    const setMeta = (selector, attribute, value) => {
      let element = document.head.querySelector(selector);
      if (!element) {
        element = document.createElement("meta");
        const [name, propertyValue] = attribute;
        element.setAttribute(name, propertyValue);
        document.head.appendChild(element);
      }
      element.setAttribute("content", value);
    };

    setMeta('meta[name="description"]', ["name", "description"], metadata.description);
    setMeta('meta[property="og:title"]', ["property", "og:title"], metadata.title);
    setMeta('meta[property="og:description"]', ["property", "og:description"], metadata.description);
    setMeta('meta[property="og:url"]', ["property", "og:url"], metadata.canonical);
    setMeta('meta[property="og:type"]', ["property", "og:type"], metadata.type || "website");

    const publishedTime = document.head.querySelector('meta[property="article:published_time"]');
    if (metadata.publishedTime) {
      setMeta('meta[property="article:published_time"]', ["property", "article:published_time"], metadata.publishedTime);
    } else if (publishedTime) {
      publishedTime.remove();
    }

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", metadata.canonical);
  }, [location.pathname]);

  return null;
}

function useScrollSystem() {
  const location = useLocation();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const lenis = new Lenis({ smoothWheel: true, lerp: 0.085 });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const context = gsap.context(() => {
      gsap.utils.toArray("[data-reveal]").forEach((element) => {
        gsap.fromTo(
          element,
          { y: 54, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: element, start: "top 88%", once: true },
          },
        );
      });

      gsap.utils.toArray("[data-wipe]").forEach((element) => {
        gsap.fromTo(
          element,
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            ease: "none",
            scrollTrigger: { trigger: element, start: "top 86%", end: "top 35%", scrub: 0.8 },
          },
        );
      });

      gsap.utils.toArray("[data-parallax]").forEach((element) => {
        gsap.fromTo(
          element,
          { yPercent: -6 },
          {
            yPercent: 7,
            ease: "none",
            scrollTrigger: { trigger: element, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
    });
    const timer = window.setTimeout(() => ScrollTrigger.refresh(), 180);
    return () => {
      window.clearTimeout(timer);
      context.revert();
    };
  }, [location.pathname]);
}

function Logo({ inverse = false }) {
  return (
    <Link className={`logo-lockup ${inverse ? "is-inverse" : ""}`} to="/" aria-label="Mandvia home">
      <img
        className="logo-wordmark"
        src={inverse ? "/brand/mandvia-reversed.svg" : "/brand/mandvia-primary.svg"}
        alt="Mandvia"
      />
    </Link>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const location = useLocation();
  const cinematic = true;
  useEffect(() => {
    setOpen(false);
    setProductOpen(false);
  }, [location.pathname]);
  const active = (path) => location.pathname === path ? "is-active" : "";

  return (
    <header className={`site-header ${cinematic ? "site-header-cinematic" : ""}`}>
      <Logo inverse={cinematic} />
      <button className="menu-toggle" onClick={() => setOpen((value) => !value)} aria-label="Toggle menu">
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>
      <nav className={open ? "is-open" : ""} aria-label="Main navigation">
        <div className="nav-dropdown">
          <button onClick={() => setProductOpen((value) => !value)} aria-expanded={productOpen}>
            Product <ChevronDown size={14} />
          </button>
          <AnimatePresence>
            {productOpen && (
              <motion.div
                className="dropdown-panel"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
              >
                <div className="dropdown-label">Accountable agent payment stack</div>
                {products.map((product) => (
                  <Link to={`/product/${product.slug}`} key={product.slug}>
                    <span className={`dropdown-icon accent-${product.accent}`}><product.icon size={18} /></span>
                    <span>
                      <strong>{product.name}</strong>
                      <small>{product.summary}</small>
                    </span>
                    <ArrowUpRight size={15} />
                  </Link>
                ))}
                <div className="dropdown-base">
                  <a href="/#problem">Why Mandvia</a>
                  <a href="/#solution">How it works</a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <a href="/#solution">How it works</a>
        <Link className={active("/security")} to="/security">Security</Link>
        <Link className={active("/pricing")} to="/pricing">Pricing</Link>
        <Link className={active("/company")} to="/company">Company</Link>
        <Link className={active("/news/tiphub-allocation")} to="/news/tiphub-allocation">Announcement</Link>
        <Link className={active("/signin")} to="/signin">Sign in</Link>
        <Link className="button button-small" to="/demo">
          Request demo <ArrowUpRight size={15} />
        </Link>
      </nav>
      <span className="nav-route-line" />
    </header>
  );
}

function Eyebrow({ icon: Icon = Sparkles, children }) {
  return (
    <div className="eyebrow">
      <Icon size={14} />
      <span>{children}</span>
    </div>
  );
}

function Home() {
  const [policy, setPolicy] = useState({ amount: 180, merchant: true, receipt: true });
  const approved = policy.amount <= 250 && policy.merchant && policy.receipt;
  const [activeProduct, setActiveProduct] = useState(0);

  useEffect(() => {
    const context = gsap.context(() => {
      gsap.to(".intent-beam", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom bottom", scrub: true },
      });
      gsap.to(".hero-copy", {
        y: -80,
        opacity: 0.25,
        ease: "none",
        scrollTrigger: { trigger: ".hero", start: "38% top", end: "bottom top", scrub: true },
      });
      gsap.utils.toArray(".story-step").forEach((step, index) => {
        ScrollTrigger.create({
          trigger: step,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveProduct(index),
          onEnterBack: () => setActiveProduct(index),
        });
      });
      gsap.to(".evidence-track", {
        xPercent: -42,
        ease: "none",
        scrollTrigger: { trigger: ".evidence-horizontal", start: "top top", end: "+=1800", scrub: true, pin: true },
      });
    });
    return () => context.revert();
  }, []);

  return (
    <>
      <main>
        <section className="hero" id="top">
          <div className="hero-sticky">
            <div className="hero-image" data-parallax />
            <Chamber />
            <div className="hero-vignette" />
            <div className="hero-grid" />
            <div className="hero-copy">
              <Eyebrow icon={Orbit}>Payment infrastructure for autonomous software</Eyebrow>
              <h1>
                Give agents authority to spend.
                <em> Keep every transaction accountable.</em>
              </h1>
              <p>
                Mandvia is the control and evidence layer between machine intent and money movement.
              </p>
              <div className="hero-actions">
                <Link className="button" to="/demo">
                  Request a demo <ArrowUpRight size={17} />
                </Link>
                <Link className="text-link" to="/product/policy">
                  Explore the system <ArrowDownRight size={17} />
                </Link>
              </div>
            </div>
            <div className="hero-status">
              <span className="live-dot" />
              <span>Mandate chamber</span>
              <strong>Evaluating intent</strong>
            </div>
            <div className="scroll-cue">
              <span>Follow the transaction</span>
              <ArrowDownRight size={18} />
            </div>
            <div className="intent-beam" />
          </div>
        </section>

        <section className="problem-section section-dark">
          <div className="section-index">01 / THE GAP</div>
          <div className="problem-grid">
            <div data-reveal>
              <Eyebrow icon={Zap}>Before Mandvia</Eyebrow>
              <h2>Software can decide what to buy. Payment systems still cannot understand why.</h2>
            </div>
            <div className="broken-chain" data-reveal>
              {["Agent intent", "Card credential", "Receipt inbox", "Finance review"].map((item, index) => (
                <div className="chain-node" key={item}>
                  <span>0{index + 1}</span>
                  <strong>{item}</strong>
                  <small>{index === 0 ? "Rich context" : index === 3 ? "Weeks later" : "Context lost"}</small>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mandate-story">
          <div className="sticky-product-visual">
            <div className="section-index">02 / THE MANDATE</div>
            <div className="product-orbit">
              <span className="orbit-ring" />
              <div className="orbit-core">
                {products.map((product, index) => (
                  <div className={`orbit-card ${activeProduct === index ? "is-active" : ""}`} key={product.name}>
                    <product.icon size={28} />
                    <strong>{product.name}</strong>
                    <small>{product.kicker}</small>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="product-story-copy">
            {products.map((product, index) => (
              <article className="story-step" key={product.name}>
                <span className="story-number">0{index + 1}</span>
                <Eyebrow icon={product.icon}>{product.kicker}</Eyebrow>
                <h2>{product.title}</h2>
                <p>{product.body}</p>
                <Link className="text-link" to={`/product/${product.slug}`}>
                  Explore {product.name} <ArrowRight size={17} />
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="policy-lab section-light">
          <div className="section-heading" data-reveal>
            <div>
              <div className="section-index">03 / EXECUTABLE POLICY</div>
              <Eyebrow icon={SlidersHorizontal}>Try a decision</Eyebrow>
            </div>
            <h2>Authority becomes useful when software can evaluate it in real time.</h2>
          </div>
          <div className="policy-console" data-reveal>
            <div className="console-controls">
              <label>
                Purchase amount
                <span className="amount-value">€{policy.amount}</span>
                <input
                  type="range"
                  min="20"
                  max="500"
                  value={policy.amount}
                  onChange={(event) => setPolicy({ ...policy, amount: Number(event.target.value) })}
                />
              </label>
              <button className={policy.merchant ? "toggle is-on" : "toggle"} onClick={() => setPolicy({ ...policy, merchant: !policy.merchant })}>
                <span />
                Approved merchant
              </button>
              <button className={policy.receipt ? "toggle is-on" : "toggle"} onClick={() => setPolicy({ ...policy, receipt: !policy.receipt })}>
                <span />
                Receipt required
              </button>
            </div>
            <div className={`decision-panel ${approved ? "is-approved" : "is-review"}`}>
              <div className="decision-ring">
                {approved ? <BadgeCheck size={36} /> : <UserRoundCheck size={36} />}
              </div>
              <span>Decision</span>
              <h3>{approved ? "Authorized" : "Human review"}</h3>
              <p>{approved ? "All conditions match mandate MND-2841." : "The proposed purchase exceeds its current authority."}</p>
              <code>{approved ? "policy.allow = true" : "policy.route = approver"}</code>
            </div>
            <div className="rule-stack">
              {[
                ["Budget", policy.amount <= 250, `€${policy.amount} / €250`],
                ["Merchant", policy.merchant, policy.merchant ? "Allowed" : "Unlisted"],
                ["Evidence", policy.receipt, policy.receipt ? "Required" : "Missing"],
              ].map(([label, pass, value]) => (
                <div className="rule-row" key={label}>
                  <span className={pass ? "rule-icon pass" : "rule-icon"}>
                    {pass ? <Check size={15} /> : <X size={15} />}
                  </span>
                  <strong>{label}</strong>
                  <small>{value}</small>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="human-section section-coral">
          <div className="human-copy" data-reveal>
            <div className="section-index">04 / HUMAN CONTROL</div>
            <Eyebrow icon={UserRoundCheck}>Escalation is a feature</Eyebrow>
            <h2>Automation moves quickly. Accountability stays human.</h2>
            <p>Route exceptions to the right person with the decision context already assembled.</p>
          </div>
          <div className="approval-card" data-wipe>
            <div className="approval-header">
              <div className="avatar">AK</div>
              <div>
                <strong>Approval requested</strong>
                <small>Agent: procurement-eu-04</small>
              </div>
              <Clock3 size={18} />
            </div>
            <div className="approval-amount">
              <span>Supplier software</span>
              <strong>€1,840.00</strong>
            </div>
            <div className="approval-context">
              <span>Purpose</span>
              <p>Annual data verification license for the Warsaw operations team.</p>
            </div>
            <div className="approval-actions">
              <button className="button-secondary">Decline</button>
              <button className="button">Approve <Check size={16} /></button>
            </div>
          </div>
        </section>

        <section className="transaction-journey section-dark">
          <div className="section-heading" data-reveal>
            <div>
              <div className="section-index">05 / ONE RECORD</div>
              <Eyebrow icon={Route}>Intent to settlement</Eyebrow>
            </div>
            <h2>A transaction should tell its own story.</h2>
          </div>
          <div className="journey-track">
            <div className="journey-line" data-wipe />
            {steps.map(([number, title, body, Icon]) => (
              <article className="journey-step" data-reveal key={title}>
                <div className="journey-icon"><Icon size={22} /></div>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="evidence-horizontal">
          <div className="evidence-intro">
            <div className="section-index">06 / EVIDENCE LEDGER</div>
            <Eyebrow icon={BookOpen}>Designed for inspection</Eyebrow>
            <h2>Not just a payment. A complete, queryable record.</h2>
          </div>
          <div className="evidence-track">
            {[
              ["Agent intent", "procurement-eu-04", "09:42:13", Fingerprint],
              ["Policy decision", "MND-2841 · allow", "09:42:15", ShieldCheck],
              ["Payment", "Vendor **** 6831", "09:42:18", CircleDollarSign],
              ["Receipt", "invoice-2026-0184.pdf", "09:44:02", ReceiptText],
              ["Settlement", "SEPA · complete", "T+1", Landmark],
            ].map(([label, value, time, Icon], index) => (
              <article className="evidence-card" key={label}>
                <span className="card-index">0{index + 1}</span>
                <Icon size={28} />
                <div>
                  <small>{label}</small>
                  <h3>{value}</h3>
                </div>
                <time>{time}</time>
                <div className="evidence-hash">EVD_{Math.random().toString(36).slice(2, 10).toUpperCase()}</div>
              </article>
            ))}
          </div>
        </section>

        <section className="reconcile-section section-light">
          <div className="reconcile-copy" data-reveal>
            <div className="section-index">07 / RECONCILIATION</div>
            <Eyebrow icon={Network}>Everything resolves</Eyebrow>
            <h2>Finance receives the answer, not another investigation.</h2>
            <p>Mandvia connects buyer identity, decision evidence, receipt, accounting context, and settlement status.</p>
          </div>
          <div className="reconcile-table" data-reveal>
            <div className="table-head"><span>Transaction</span><span>Evidence</span><span>Book</span><span>Status</span></div>
            {[
              ["Notion Labs", "4 / 4", "Software", "Matched"],
              ["AWS Europe", "4 / 4", "Infrastructure", "Matched"],
              ["DataBeacon", "3 / 4", "Operations", "Review"],
              ["OpenAI Ireland", "4 / 4", "AI services", "Matched"],
            ].map((row) => (
              <div className="table-row" key={row[0]}>
                {row.map((cell, index) => <span className={index === 3 ? `status ${cell.toLowerCase()}` : ""} key={cell}>{cell}</span>)}
              </div>
            ))}
          </div>
        </section>

        <section className="infrastructure-section">
          <div className="infra-visual">
            <div className="infra-rings">
              <span><Code2 size={23} /></span>
              <span><LockKeyhole size={23} /></span>
              <span><CircleGauge size={23} /></span>
            </div>
          </div>
          <div className="infra-copy" data-reveal>
            <div className="section-index">08 / BUILT TO EMBED</div>
            <Eyebrow icon={Blocks}>Infrastructure, not another dashboard</Eyebrow>
            <h2>Ship agent payments inside the product your customers already use.</h2>
            <p>Composable APIs for authorization, wallets, evidence, and settlement workflows, designed for EU operating realities.</p>
            <div className="code-sample">
              <span>POST /v1/authorizations</span>
              <code>{`{
  "agent": "procurement-eu-04",
  "mandate": "MND-2841",
  "amount": { "value": 180, "currency": "EUR" }
}`}</code>
            </div>
          </div>
        </section>

        <section className="audience-section section-dark">
          <div className="section-heading" data-reveal>
            <div>
              <div className="section-index">09 / MADE FOR BUILDERS</div>
              <Eyebrow icon={Orbit}>A shared control layer</Eyebrow>
            </div>
            <h2>For teams putting autonomous software into the real economy.</h2>
          </div>
          <div className="audience-grid">
            {[
              ["AI agent platforms", "Give every agent controlled buying power.", Orbit],
              ["Fintechs", "Add programmable authority to payment products.", Landmark],
              ["Marketplaces", "Coordinate machine buyers and suppliers.", Network],
              ["Procurement", "Automate routine spend without losing control.", BadgeCheck],
              ["SaaS companies", "Embed accountable agent purchasing.", Blocks],
            ].map(([title, body, Icon]) => (
              <article data-reveal key={title}>
                <Icon size={24} />
                <h3>{title}</h3>
                <p>{body}</p>
                <ArrowUpRight size={18} />
              </article>
            ))}
          </div>
        </section>

        <section className="final-cta">
          <div className="cta-line" data-wipe />
          <div data-reveal>
            <Eyebrow icon={KeyRound}>Start with one workflow</Eyebrow>
            <h2>Give your agents a mandate, not a blank cheque.</h2>
            <p>Explore a controlled demo around one agent, one budget, and one measurable workflow.</p>
            <Link className="button" to="/demo">Request a demo <ArrowUpRight size={17} /></Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function ProductInstrument({ product }) {
  if (product.slug === "wallet") {
    return (
      <div className="product-instrument wallet-instrument">
        <div className="instrument-head"><span>Agent wallets / live</span><strong>€18,420 available</strong></div>
        {[
          ["procurement-eu-04", "Cloud infrastructure", "€2,500", "Active"],
          ["research-agent-12", "Data providers", "€1,200", "Active"],
          ["ops-agent-07", "SaaS renewals", "€800", "Review"],
        ].map(([agent, scope, amount, status]) => (
          <div className="wallet-row" key={agent}>
            <Fingerprint size={17} />
            <div><strong>{agent}</strong><small>{scope}</small></div>
            <span>{amount}</span>
            <i className={status === "Review" ? "is-review" : ""}>{status}</i>
          </div>
        ))}
        <div className="wallet-allocation"><span>Allocated today</span><strong>€4,500 / €9,000</strong><i /></div>
      </div>
    );
  }

  if (product.slug === "policy") {
    return (
      <div className="product-instrument policy-instrument">
        <div className="instrument-head"><span>Policy decision / MND-2841</span><strong>Allow</strong></div>
        {[
          ["Agent identity", "procurement-eu-04", true],
          ["Merchant scope", "Cloud infrastructure", true],
          ["Amount limit", "€180 ≤ €250", true],
          ["Receipt required", "Capture after payment", true],
          ["Geography", "European Union", true],
        ].map(([signal, rule, pass], index) => (
          <motion.div
            className="policy-rule-row"
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.08 }}
            key={signal}
          >
            <span>0{index + 1}</span><div><strong>{signal}</strong><small>{rule}</small></div>{pass && <BadgeCheck size={17} />}
          </motion.div>
        ))}
        <div className="policy-decision"><ShieldCheck size={18} /><span>Decision in 14 ms</span><strong>Authority verified</strong></div>
      </div>
    );
  }

  return (
    <div className="product-instrument ledger-instrument">
      <div className="instrument-head"><span>Evidence ledger / today</span><strong>100% matched</strong></div>
      <div className="ledger-columns"><span>Time</span><span>Event</span><span>Proof</span></div>
      {[
        ["09:41:02", "Intent received", "agent.json"],
        ["09:41:03", "Policy allowed", "MND-2841"],
        ["09:41:05", "Payment complete", "€180.00"],
        ["09:41:08", "Receipt captured", "invoice-0184.pdf"],
        ["09:42:16", "Settlement matched", "SEPA complete"],
      ].map(([time, event, proof]) => (
        <div className="ledger-instrument-row" key={event}>
          <time>{time}</time><strong>{event}</strong><span>{proof}<BadgeCheck size={14} /></span>
        </div>
      ))}
    </div>
  );
}

function ProductPage({ product }) {
  const Icon = product.icon;
  return (
    <>
      <main className={`product-page accent-${product.accent}`}>
        <section className="product-hero">
          <div className="product-hero-image" style={{ backgroundImage: `url(${product.visual})` }} data-parallax />
          <div className="product-hero-overlay" />
          <div className="product-hero-copy">
            <Eyebrow icon={Icon}>Mandvia {product.name}</Eyebrow>
            <h1>{product.title}</h1>
            <p>{product.body}</p>
            <Link className="button" to="/demo">Build with {product.name} <ArrowUpRight size={17} /></Link>
          </div>
          <motion.div
            className="product-hero-instrument"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
          >
            <ProductInstrument product={product} />
          </motion.div>
          <div className="product-metric-strip">
            {product.metrics.map((metric) => <span key={metric}><Check size={14} /> {metric}</span>)}
          </div>
        </section>
        <section className="product-system section-light">
          <div className="section-heading" data-reveal>
            <div><div className="section-index">01 / SYSTEM</div><Eyebrow icon={Icon}>{product.kicker}</Eyebrow></div>
            <h2>{product.summary}</h2>
          </div>
          <div className="feature-panels">
            {product.metrics.map((metric, index) => (
              <article data-reveal key={metric}>
                <span>0{index + 1}</span>
                <Icon size={24} />
                <h3>{metric}</h3>
                <p>Configure it through the API, inspect every state, and preserve the context finance teams need.</p>
              </article>
            ))}
          </div>
        </section>
        <section className="product-flow section-dark">
          <div data-reveal>
            <div className="section-index">02 / IN MOTION</div>
            <Eyebrow icon={Route}>One continuous evidence trail</Eyebrow>
            <h2>From machine request to accountable outcome.</h2>
          </div>
          <div className="flow-list">
            {steps.map(([number, title, body, StepIcon]) => (
              <div data-reveal key={title}><span>{number}</span><StepIcon size={20} /><strong>{title}</strong><p>{body}</p></div>
            ))}
          </div>
        </section>
        <section className="product-cta">
          <h2>Put {product.name.toLowerCase()} into your first agent workflow.</h2>
          <Link className="button" to="/demo">Request technical workshop <ArrowUpRight size={17} /></Link>
        </section>
      </main>
      <Footer />
    </>
  );
}

function SignIn() {
  const [sent, setSent] = useState(false);
  return (
    <main className="auth-page">
      <div className="auth-visual" style={{ backgroundImage: "url(/assets/product-authorization-aperture.png)" }}>
        <Logo inverse />
        <div>
          <Eyebrow icon={LockKeyhole}>Mandvia Console</Eyebrow>
          <h1>Authority is visible here.</h1>
          <p>Inspect agent identities, policy decisions, evidence, and settlement from one operational surface.</p>
        </div>
        <span>EU infrastructure · Private beta</span>
      </div>
      <div className="auth-form-wrap">
        <Link className="back-link" to="/"><ArrowRight size={16} /> Back to Mandvia</Link>
        <form className="auth-form" onSubmit={(event) => { event.preventDefault(); setSent(true); }}>
          <Eyebrow icon={Fingerprint}>Secure access</Eyebrow>
          <h2>Sign in to your workspace</h2>
          <p>We’ll email you a one-time link. No password required.</p>
          <label>Work email<input type="email" required placeholder="you@company.com" /></label>
          <button className="button" type="submit">{sent ? "Check your inbox" : "Send sign-in link"} <ArrowUpRight size={16} /></button>
          {sent && <div className="form-success"><Check size={16} /> A secure link is on its way.</div>}
          <small>By continuing, you agree to Mandvia’s Terms and Privacy Policy.</small>
        </form>
      </div>
    </main>
  );
}

function Demo() {
  const [complete, setComplete] = useState(false);
  const [step, setStep] = useState(1);
  const [workflow, setWorkflow] = useState("Agent procurement");
  return (
    <main className="demo-page">
      <section className="demo-intro">
        <Logo inverse />
        <div>
          <div className="step-count">0{step} / 02</div>
          <Eyebrow icon={Sparkles}>Request a demo</Eyebrow>
          <h1>Start with one agent and one accountable workflow.</h1>
          <p>Tell us what your software needs to buy. We’ll map the authority, evidence, and integration path with your team.</p>
        </div>
        <div className="demo-proof">
          <ShieldCheck size={20} />
          <span>Built for EU operating and data requirements</span>
        </div>
      </section>
      <section className="demo-form-section">
        {complete ? (
          <div className="demo-complete">
            <div className="decision-ring"><BadgeCheck size={38} /></div>
            <Eyebrow icon={Check}>Request received</Eyebrow>
            <h2>Your demo brief is ready.</h2>
            <p>Our team will review the workflow and reply with a focused technical agenda.</p>
            <Link className="button" to="/">Return home <ArrowRight size={16} /></Link>
          </div>
        ) : (
          <form onSubmit={(event) => { event.preventDefault(); step === 1 ? setStep(2) : setComplete(true); }}>
            {step === 1 ? (
              <>
                <h2>What should the agent be allowed to buy?</h2>
                <p>Choose the closest workflow. We’ll tailor the next conversation around it.</p>
                <div className="workflow-options">
                  {["Agent procurement", "Marketplace purchasing", "Embedded fintech", "SaaS operations"].map((option) => (
                    <button type="button" className={workflow === option ? "is-selected" : ""} onClick={() => setWorkflow(option)} key={option}>
                      <span>{option}</span>{workflow === option && <Check size={17} />}
                    </button>
                  ))}
                </div>
                <label>Typical transaction value<select defaultValue="€100 – €1,000"><option>Under €100</option><option>€100 – €1,000</option><option>€1,000 – €10,000</option><option>Above €10,000</option></select></label>
              </>
            ) : (
              <>
                <h2>Who should we build the workshop around?</h2>
                <p>We’ll use your {workflow.toLowerCase()} workflow as the starting point.</p>
                <div className="two-fields">
                  <label>First name<input required placeholder="Aleksandra" /></label>
                  <label>Last name<input required placeholder="Kowalska" /></label>
                </div>
                <label>Work email<input required type="email" placeholder="you@company.com" /></label>
                <label>Company<input required placeholder="Company name" /></label>
              </>
            )}
            <div className="form-navigation">
              {step === 2 && <button className="button-secondary" type="button" onClick={() => setStep(1)}>Back</button>}
              <button className="button" type="submit">{step === 1 ? "Continue" : "Request demo"} <ArrowRight size={16} /></button>
            </div>
          </form>
        )}
      </section>
    </main>
  );
}

const editorialPages = {
  pricing: {
    eyebrow: "Commercial model",
    title: "Start with a workflow. Scale with accountable volume.",
    body: "Mandvia pricing is shaped around agent identities, policy decisions, and evidence volume. Early partners begin with a scoped technical demo.",
    cards: [["Demo", "One workflow", "Architecture walkthrough, sandbox preview, policy model, and success criteria."], ["Platform", "Production", "Wallet, Policy, and Ledger APIs with operational support."], ["Enterprise", "Custom", "Complex entities, approval structures, settlement paths, and data requirements."]],
  },
  security: {
    eyebrow: "Security",
    title: "Authority is only useful when its boundaries are dependable.",
    body: "Mandvia is being designed around least privilege, traceable decisions, scoped credentials, data minimisation, and EU operating requirements.",
    cards: [["Identity", "Scoped by design", "Separate payment identities and credentials for every agent and workflow."], ["Policy", "Explicit authority", "Machine-readable boundaries with review paths for every exception."], ["Evidence", "Inspectable history", "Append-only decision context across authorization, receipt, and settlement."]],
  },
  company: {
    eyebrow: "Company",
    title: "We are building the accountability layer for an autonomous economy.",
    body: "Mandvia is a Poland and EU-based product company working where AI agents, payments, and operational control meet.",
    cards: [["Based in", "Poland / EU", "Built close to the regulatory and operating realities of European fintech."], ["Belief", "Autonomy needs authority", "Agents should act quickly, but never without accountable boundaries."], ["Stage", "Private beta", "Working with design partners on high-value autonomous purchasing workflows."]],
  },
};

function EditorialVisual({ type }) {
  if (type === "security") {
    return (
      <div className="editorial-visual security-visual">
        <div className="security-core"><ShieldCheck size={26} /><strong>Mandvia authority</strong><span>Least privilege</span></div>
        {[
          ["Agent identity", Fingerprint, "Scoped"],
          ["Policy engine", ScanLine, "Verified"],
          ["Evidence ledger", ReceiptText, "Append-only"],
          ["Settlement", Landmark, "Matched"],
        ].map(([label, Icon, status], index) => (
          <motion.div
            className={`security-node node-${index + 1}`}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.12 }}
            key={label}
          >
            <Icon size={18} /><strong>{label}</strong><span>{status}</span>
          </motion.div>
        ))}
      </div>
    );
  }

  if (type === "pricing") {
    return (
      <div className="editorial-visual pricing-visual">
        <div className="pricing-model-head"><span>Illustrative operating model</span><strong>Scale</strong></div>
        {[
          ["Agent identities", "25", "Base"],
          ["Policy decisions", "18,400 / mo", "Usage"],
          ["Evidence records", "6,800 / mo", "Usage"],
          ["Integration", "Platform API", "Scope"],
        ].map(([label, value, unit]) => (
          <div key={label}><span>{label}</span><strong>{value}</strong><small>{unit}</small></div>
        ))}
        <div className="pricing-model-total"><span>Commercial model</span><strong>Usage-based</strong></div>
      </div>
    );
  }

  return (
    <div className="editorial-visual company-visual">
      <div className="company-origin"><span>PL</span><strong>Poland / European Union</strong><small>Operating context</small></div>
      {[
        ["01", "Intent", "Understand why software is buying."],
        ["02", "Authority", "Define what it may do."],
        ["03", "Evidence", "Keep every outcome inspectable."],
      ].map(([number, title, body]) => (
        <div className="company-principle" key={title}><span>{number}</span><strong>{title}</strong><p>{body}</p></div>
      ))}
    </div>
  );
}

function EditorialPage({ type }) {
  const page = editorialPages[type];
  return (
    <>
      <main className="editorial-page">
        <section className="editorial-hero">
          <div className="editorial-hero-copy">
            <Eyebrow icon={type === "security" ? ShieldCheck : type === "company" ? Orbit : CircleDollarSign}>{page.eyebrow}</Eyebrow>
            <h1>{page.title}</h1>
            <p>{page.body}</p>
            <Link className="button" to="/demo">Request a demo <ArrowUpRight size={16} /></Link>
          </div>
          <motion.div
            className="editorial-hero-visual"
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <EditorialVisual type={type} />
          </motion.div>
        </section>
        <section className="editorial-cards">
          {page.cards.map(([kicker, title, body], index) => (
            <article data-reveal key={title}><span>0{index + 1} / {kicker}</span><h2>{title}</h2><p>{body}</p></article>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}

const announcementFacts = [
  ["Company", "Mandvia"],
  ["Sector", "Fintech and agent payments"],
  ["TipHub-announced allocation", "$525K"],
  ["Announcement date", "29 July 2026"],
  ["Stage", "Early stage"],
  ["Scope", "Global"],
  ["Portfolio", "TipHub"],
];

function TipHubAnnouncementPage() {
  return (
    <>
      <main className="announcement-page">
        <article>
          <header className="announcement-hero">
            <div className="announcement-hero-inner">
              <div className="announcement-hero-copy" data-reveal>
                <span className="announcement-eyebrow">Portfolio announcement · 29 July 2026</span>
                <h1>TipHub announces a <em>$525K allocation</em> to Mandvia.</h1>
                <p>
                  Mandvia is joining the TipHub portfolio following a $525K TipHub-announced
                  allocation. The partnership supports the company’s work across fintech and
                  agent payments.
                </p>
                <div className="announcement-actions">
                  <a
                    className="button announcement-primary"
                    href="https://tiphub-prototype-review.vercel.app/companies/mandvia"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Visit the official TipHub announcement for Mandvia"
                  >
                    Visit TipHub announcement <ArrowUpRight size={16} />
                  </a>
                  <a className="announcement-text-link" href="https://www.mandvia.com">
                    Company website <ArrowRight size={15} />
                  </a>
                </div>
              </div>
              <div className="announcement-signal" aria-label="$525K TipHub-announced portfolio allocation" data-reveal>
                <div className="announcement-signal-head"><span>Portfolio signal</span><strong>TipHub</strong></div>
                <div className="announcement-signal-value"><small>Announced allocation</small><strong>$525K</strong></div>
                <div className="announcement-signal-rail"><span /><i /><span /></div>
                <dl>
                  <div><dt>Category</dt><dd>Agent payments</dd></div>
                  <div><dt>Scope</dt><dd>Global</dd></div>
                  <div><dt>Status</dt><dd>Portfolio</dd></div>
                </dl>
              </div>
            </div>
          </header>

          <section className="announcement-story">
            <div className="announcement-story-grid">
              <div className="announcement-body" data-reveal>
                <span className="announcement-index">01 / Company note</span>
                <h2>Focused infrastructure for accountable autonomy.</h2>
                <p>
                  We are building Mandvia to address an important operating problem within
                  fintech and agent payments. TipHub’s early-stage, global perspective aligns
                  with our ambition to turn a focused insight into durable infrastructure.
                </p>
                <p>
                  The relationship extends beyond capital to company-building support across
                  product, market development, talent, and future growth.
                </p>
              </div>

              <aside className="announcement-facts" aria-label="Allocation facts" data-reveal>
                <span className="announcement-index">02 / Facts</span>
                <dl>
                  {announcementFacts.map(([label, value]) => (
                    <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
                  ))}
                </dl>
              </aside>
            </div>
          </section>

          <section className="announcement-disclosure" data-reveal>
            <span>Disclosure</span>
            <p>
              The allocation displayed is information supplied and announced by TipHub. It
              does not independently represent the company’s total financing and may be
              updated if an official company disclosure differs.
            </p>
            <Link to="/company">About Mandvia <ArrowRight size={15} /></Link>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}

function Footer() {
  return (
    <footer className="site-footer" id="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <Logo inverse />
          <p>Accountable payment infrastructure for autonomous software.</p>
          <address><MapPin size={16} /><span>4887 Mountain Close<br />Érd, Pest 2030, Hungary</span></address>
          <a className="footer-email" href="mailto:hello@mandvia.com"><Mail size={15} /> hello@mandvia.com</a>
          <a className="footer-email" href="tel:+36385793884"><Phone size={15} /> 06 38 579 3884</a>
        </div>
        <div><strong>Product</strong>{products.map((product) => <Link key={product.slug} to={`/product/${product.slug}`}>{product.name}</Link>)}</div>
        <div><strong>Company</strong><Link to="/company">About</Link><Link to="/news/tiphub-allocation">Updates</Link><Link to="/security">Security</Link><Link to="/pricing">Pricing</Link><Link to="/demo">Contact</Link></div>
        <div><strong>Access & legal</strong><Link to="/signin">Sign in</Link><Link to="/demo">Request demo</Link><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link></div>
      </div>
      <div className="footer-trust-row">
        <div className="footer-socials" aria-label="Mandvia social media">
          <span className="is-unavailable" aria-label="Mandvia LinkedIn profile coming soon" title="LinkedIn profile coming soon"><FaLinkedinIn size={17} /></span>
          <span className="is-unavailable" aria-label="Mandvia X profile coming soon" title="X profile coming soon"><FaXTwitter size={17} /></span>
          <span className="is-unavailable" aria-label="Mandvia GitHub profile coming soon" title="GitHub profile coming soon"><FaGithub size={18} /></span>
        </div>
        <div className="footer-status"><i /><span>Service status</span><strong>Operational</strong></div>
        <div className="footer-jurisdiction"><ShieldCheck size={16} /><span>Designed for EU operating requirements</span></div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Mandvia. All rights reserved.</span>
        <div><Link to="/privacy">Privacy policy</Link><Link to="/terms">Terms of use</Link></div>
      </div>
    </footer>
  );
}

const legalPages = {
  privacy: {
    eyebrow: "Privacy",
    title: "Privacy at Mandvia.",
    intro: "This notice explains how Mandvia handles information submitted through this website and during product conversations.",
    sections: [
      ["Information we collect", "We may receive contact details, company information, product requirements, and technical correspondence when you request a demo or contact our team."],
      ["How we use information", "We use this information to respond to enquiries, provide product access, improve Mandvia, maintain security, and meet applicable legal obligations."],
      ["Data location and sharing", "Mandvia is being developed for European operating requirements. Service providers are selected for a legitimate operational purpose and are expected to protect information under appropriate agreements."],
      ["Your choices", "You may request access, correction, deletion, or restriction of personal information by contacting hello@mandvia.com."],
    ],
  },
  terms: {
    eyebrow: "Terms",
    title: "Website terms of use.",
    intro: "These terms govern access to the Mandvia website and any pre-release product material made available through it.",
    sections: [
      ["Website information", "Website content is provided for general product information and may change as Mandvia develops. It is not financial, legal, accounting, or investment advice."],
      ["Product access", "Demo, private beta, and technical workshop access may be subject to separate commercial, security, and data-processing terms."],
      ["Intellectual property", "Mandvia branding, product concepts, interface designs, and website content remain the property of Mandvia or their respective licensors."],
      ["Contact", "Questions about these terms can be sent to hello@mandvia.com."],
    ],
  },
};

function LegalPage({ type }) {
  const page = legalPages[type];
  return (
    <>
      <main className="legal-page">
        <section className="legal-hero">
          <Eyebrow icon={type === "privacy" ? ShieldCheck : BookOpen}>{page.eyebrow}</Eyebrow>
          <h1>{page.title}</h1>
          <p>{page.intro}</p>
          <span>Last updated · 24 July 2026</span>
        </section>
        <section className="legal-content">
          {page.sections.map(([title, body], index) => (
            <article key={title}><span>0{index + 1}</span><div><h2>{title}</h2><p>{body}</p></div></article>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}

function Site() {
  useScrollSystem();
  const location = useLocation();
  const standalone = ["/signin", "/demo"].includes(location.pathname);
  return (
    <>
      <PageMetadata />
      {!standalone && <Header />}
      <Routes>
        <AppRoute path="/" element={<CinematicHome />} />
        {products.map((product) => <AppRoute key={product.slug} path={`/product/${product.slug}`} element={<ProductPage product={product} />} />)}
        <AppRoute path="/signin" element={<SignIn />} />
        <AppRoute path="/demo" element={<Demo />} />
        <AppRoute path="/pricing" element={<EditorialPage type="pricing" />} />
        <AppRoute path="/security" element={<EditorialPage type="security" />} />
        <AppRoute path="/company" element={<EditorialPage type="company" />} />
        <AppRoute path="/news/tiphub-allocation" element={<TipHubAnnouncementPage />} />
        <AppRoute path="/privacy" element={<LegalPage type="privacy" />} />
        <AppRoute path="/terms" element={<LegalPage type="terms" />} />
        <AppRoute path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export function App() {
  return <MotionConfig reducedMotion="user"><Site /></MotionConfig>;
}
