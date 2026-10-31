import type { CSSProperties } from "react";
import NextLeapEffects from "../components/NextLeapEffects";

// Change this to the real contact email before going live.
const CONTACT_EMAIL = "hello@nextleap.example";

function Arrow({ width = 1.6 }: { width?: number }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={width}>
      <path d="M2 8h12M9 3l5 5-5 5" />
    </svg>
  );
}

function Chevron() {
  return (
    <svg className="chev" width="20" height="20" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 3l5 5-5 5" />
    </svg>
  );
}

function Logo({ withCaps = false }: { withCaps?: boolean }) {
  const cap = withCaps ? { strokeLinecap: "square" as const } : {};
  return (
    <svg viewBox="0 0 34 34" aria-hidden="true">
      <rect width="34" height="34" fill="var(--red)" />
      <path d="M8 25 C 11 12, 19 8, 26 9" stroke="#fff" strokeWidth="2.6" fill="none" {...cap} />
      <path
        d="M20 6.5 L26.5 9 L23.5 15"
        stroke="#fff"
        strokeWidth="2.6"
        fill="none"
        {...cap}
        {...(withCaps ? { strokeLinejoin: "miter" as const } : {})}
      />
    </svg>
  );
}

const bar = (w: string) => ({ "--w": w }) as CSSProperties;

export default function Home() {
  return (
    <>
      <header className="hdr" id="hdr">
        <div className="wrap">
          <a className="brand" href="#top" aria-label="NextLeap home">
            <Logo withCaps />
            <span>NextLeap</span>
          </a>
          <ul className="menu">
            <li><a href="#approach">Approach</a></li>
            <li><a href="#courses">Courses</a></li>
            <li><a href="#outcomes">Outcomes</a></li>
            <li><a href="#colleges">For colleges</a></li>
          </ul>
          <a className="btn" href="#contact">
            Partner with us <Arrow />
          </a>
        </div>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="hero" aria-label="Introduction">
          <canvas id="terrain" aria-hidden="true" />
          <div className="wrap">
            <p className="kicker">Crafting the next generation of</p>
            <h1 className="wide">
              <span id="scramble">AI-ready leaders</span>
              <span className="cur" aria-hidden="true" />
            </h1>
            <ul className="courses-line" aria-label="Courses">
              <li><a href="#c1">AI Product &amp; Agents</a></li>
              <li><a href="#c2">Agile Product Management</a></li>
              <li><a href="#c3">Service Marketing in the Age of AI</a></li>
              <li><a href="#c4">AI in Marketing</a></li>
            </ul>
          </div>
          <span className="scroll-cue" aria-hidden="true">Scroll</span>
        </section>

        {/* APPROACH */}
        <section id="approach">
          <div className="wrap split">
            <div className="copy rv">
              <p className="label red">The NextLeap approach</p>
              <h2 className="h2">Where others teach AI as a subject, we teach it as a craft.</h2>
              <p className="lead">
                NextLeap brings practical AI courses into college classrooms. Students don&apos;t just hear about
                agents, sprints and campaigns. They build them, test them and present them.
              </p>
              <div className="pills" role="group" aria-label="Our three pillars">
                <button className="pill" type="button" aria-pressed="true" data-i="0">Learning by doing</button>
                <button className="pill" type="button" aria-pressed="false" data-i="1">Practical approach</button>
                <button className="pill" type="button" aria-pressed="false" data-i="2">New age</button>
              </div>
              <div className="pillar-text" id="pillarText" aria-live="polite">
                <h3>Every class ends with something built.</h3>
                <p>A short concept, a long build, a quick demo. Theory arrives exactly when the project needs it, so it sticks.</p>
              </div>
            </div>
            <div className="orb-wrap rv" aria-hidden="true">
              <canvas id="orb" />
              <span className="orb-tag t1">Learn</span>
              <span className="orb-tag t2">Build</span>
              <span className="orb-tag t3">Ship</span>
            </div>
          </div>
        </section>

        {/* COURSES */}
        <section id="courses" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="course-head rv">
              <div style={{ display: "grid", gap: 18 }}>
                <p className="label red">Courses</p>
                <h2 className="h2">Four courses for the AI decade.</h2>
              </div>
              <p>Two tracks, product and marketing. Run one as an elective or all four as a specialisation.</p>
            </div>

            <div className="tiles">
              {/* C1 */}
              <button className="tile" id="c1" type="button" aria-haspopup="dialog" data-course="0">
                <span className="no">01</span><span className="trk">Product</span>
                <span className="art" aria-hidden="true">
                  <svg viewBox="0 0 200 160" fill="none">
                    <g stroke="#3a3f4b" strokeWidth="1">
                      <path className="dash" d="M100 80 L40 40 M100 80 L160 36 M100 80 L46 128 M100 80 L156 124 M40 40 L160 36 M46 128 L156 124" />
                    </g>
                    <g fill="#8C909A">
                      <circle cx="40" cy="40" r="5" /><circle cx="160" cy="36" r="5" />
                      <circle cx="46" cy="128" r="5" /><circle cx="156" cy="124" r="5" />
                    </g>
                    <circle cx="100" cy="80" r="16" fill="none" stroke="#F3F3F1" strokeWidth="1.2" />
                    <circle className="pulse" cx="100" cy="80" r="7" fill="#FF4A2E" />
                  </svg>
                </span>
                <h3>AI Product &amp; Agents</h3>
                <span className="more"><span>
                  <p>Take a fuzzy problem to a working AI agent: scoped, built, tested and priced.</p>
                  <ul><li>LLMs explained for product people</li><li>Agent workflows, tools and evals</li><li>Ship: a working agent + PRD</li></ul>
                </span></span>
                <span className="go">View course <i><Arrow /></i></span>
              </button>

              {/* C2 */}
              <button className="tile" id="c2" type="button" aria-haspopup="dialog" data-course="1">
                <span className="no">02</span><span className="trk">Product</span>
                <span className="art" aria-hidden="true">
                  <svg viewBox="0 0 200 160" fill="none">
                    <g className="spin"><circle cx="100" cy="80" r="56" stroke="#3a3f4b" strokeWidth="1" strokeDasharray="70 18" /></g>
                    <circle cx="100" cy="80" r="38" stroke="#8C909A" strokeWidth="1" />
                    <g fill="#8C909A"><rect x="76" y="70" width="10" height="20" /><rect x="90" y="62" width="10" height="28" /></g>
                    <rect className="grow" x="104" y="52" width="10" height="38" fill="#FF4A2E" />
                    <path d="M150 34 l8 -2 -2 8" stroke="#F3F3F1" strokeWidth="1.2" />
                  </svg>
                </span>
                <h3>Agile Product Management</h3>
                <span className="more"><span>
                  <p>Run a product team the way startups do, with AI copilots taking the busywork.</p>
                  <ul><li>Scrum, Kanban, stories and backlogs</li><li>Sprint reviews, retros and metrics</li><li>Ship: an MVP over three sprints</li></ul>
                </span></span>
                <span className="go">View course <i><Arrow /></i></span>
              </button>

              {/* C3 */}
              <button className="tile" id="c3" type="button" aria-haspopup="dialog" data-course="2">
                <span className="no">03</span><span className="trk">Marketing</span>
                <span className="art" aria-hidden="true">
                  <svg viewBox="0 0 200 160" fill="none">
                    <path className="dash" d="M18 120 C 50 120, 50 40, 90 40 S 130 120, 182 50" stroke="#8C909A" strokeWidth="1.2" />
                    <g fill="#07080A" stroke="#F3F3F1" strokeWidth="1.2">
                      <circle cx="18" cy="120" r="6" /><circle cx="66" cy="66" r="6" />
                      <circle cx="140" cy="98" r="6" /><circle cx="182" cy="50" r="6" />
                    </g>
                    <circle className="pulse" cx="90" cy="40" r="7" fill="#FF4A2E" />
                    <circle cx="116" cy="74" r="6" fill="#FF4A2E" />
                    <path d="M18 140 H182" stroke="#3a3f4b" />
                  </svg>
                </span>
                <h3>Service Marketing in the Age of AI</h3>
                <span className="more"><span>
                  <p>Redesign real services around AI, and know where a human still has to step in.</p>
                  <ul><li>7Ps, journeys and service blueprints</li><li>Chatbots, personalisation, recovery</li><li>Ship: a blueprint for a local business</li></ul>
                </span></span>
                <span className="go">View course <i><Arrow /></i></span>
              </button>

              {/* C4 */}
              <button className="tile" id="c4" type="button" aria-haspopup="dialog" data-course="3">
                <span className="no">04</span><span className="trk">Marketing</span>
                <span className="art" aria-hidden="true">
                  <svg viewBox="0 0 200 160" fill="none">
                    <path d="M24 136 H180" stroke="#3a3f4b" />
                    <g fill="#3a3f4b">
                      <rect x="34" y="104" width="18" height="32" /><rect x="62" y="92" width="18" height="44" />
                      <rect x="90" y="98" width="18" height="38" /><rect x="118" y="74" width="18" height="62" />
                    </g>
                    <rect className="grow" x="146" y="36" width="18" height="100" fill="#FF4A2E" />
                    <path className="dash" d="M43 100 L71 86 L99 92 L127 66 L155 28" stroke="#F3F3F1" strokeWidth="1.2" />
                  </svg>
                </span>
                <h3>AI in Marketing</h3>
                <span className="more"><span>
                  <p>Plan, create and run a campaign with AI in the loop, then read the numbers.</p>
                  <ul><li>AI research and segmentation</li><li>Creative at scale, in Indian languages</li><li>Ship: a live campaign + teardown</li></ul>
                </span></span>
                <span className="go">View course <i><Arrow /></i></span>
              </button>
            </div>
          </div>
        </section>

        {/* RINGS PLATE */}
        <section className="plate" aria-label="How every module runs">
          <canvas id="rings" aria-hidden="true" />
          <div className="card rv">
            <p className="label red">How every module runs</p>
            <h2 className="h2">The leap from learning to doing.</h2>
            <p>The same loop real product and marketing teams run, repeated until it becomes a habit.</p>
            <ol className="steps">
              <li><span className="n">01</span><b>Brief</b><span>A real problem, a budget, a deadline</span></li>
              <li><span className="n">02</span><b>Build</b><span>Prototype with AI tools, in class</span></li>
              <li><span className="n">03</span><b>Break</b><span>Peers and faculty stress-test it</span></li>
              <li><span className="n">04</span><b>Ship</b><span>It goes live, for real users</span></li>
              <li><span className="n">05</span><b>Demo</b><span>Three minutes on stage</span></li>
            </ol>
          </div>
        </section>

        {/* OUTCOMES */}
        <section id="outcomes" className="after-plate" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="rv" style={{ display: "grid", gap: 18, maxWidth: 820 }}>
              <p className="label red">Student outcomes</p>
              <h2 className="h2">They leave with proof of work, not just a grade.</h2>
            </div>

            <div className="stats" id="stats">
              <div className="stat"><b className="wide" data-to="4">4</b><span>Courses, one specialisation</span></div>
              <div className="stat"><b className="wide" data-to="2">2</b><span>Tracks: product and marketing</span></div>
              <div className="stat"><b className="wide" data-to="10" data-sup="+">10<sup>+</sup></b><span>AI tools used hands-on</span></div>
              <div className="stat"><b className="wide" data-to="1">1</b><span>Demo day to show it all</span></div>
            </div>

            <div className="cards">
              <article className="ocard rv">
                <div className="vis">
                  <div className="chat">
                    <div className="u">When does the scholarship form close?</div>
                    <div className="a">31 Jan, 5 PM. <b>Reminder set.</b> Want the document checklist too?</div>
                  </div>
                </div>
                <div className="body">
                  <h3>A working AI agent</h3>
                  <p>An agent with tools, evals and a real job to do. Built and tested by the student.</p>
                  <Chevron />
                </div>
              </article>
              <article className="ocard rv">
                <div className="vis">
                  <div className="ab" id="ab">
                    <div><span>Variant A</span><i style={bar("38%")} /><span>1.1%</span></div>
                    <div><span>Variant B</span><i style={bar("52%")} /><span>1.6%</span></div>
                    <div className="win"><span>Variant C</span><i style={bar("88%")} /><span>2.7%</span></div>
                  </div>
                </div>
                <div className="body">
                  <h3>A live campaign</h3>
                  <p>Real budget, real audience and a creative test with a clear winner to explain.</p>
                  <Chevron />
                </div>
              </article>
              <article className="ocard rv">
                <div className="vis">
                  <div className="pf">
                    <div className="bar">portfolio / your-name / ai-product</div>
                    <div className="grid"><span /><span /><span /><span /><span /><span /></div>
                  </div>
                </div>
                <div className="body">
                  <h3>A portfolio and a stage</h3>
                  <p>One link with every project, presented on demo day to faculty, peers and guests.</p>
                  <Chevron />
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* COLLEGES */}
        <section id="colleges" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="rv" style={{ display: "grid", gap: 18, maxWidth: 820 }}>
              <p className="label red">For colleges</p>
              <h2 className="h2">Plug NextLeap into your programme.</h2>
            </div>
            <div className="formats">
              <a className="fmt" href="#contact">
                <h3 className="wide">Elective</h3><span className="dur">Full semester</span>
                <p>Any course as a credit-bearing elective, or all four as a specialisation. Ends with a campus demo day.</p>
                <Arrow width={1.4} />
              </a>
              <a className="fmt" href="#contact">
                <h3 className="wide">Immersion</h3><span className="dur">2–4 weeks</span>
                <p>An intensive between terms. One course, one team project, shipped by the last day.</p>
                <Arrow width={1.4} />
              </a>
              <a className="fmt" href="#contact">
                <h3 className="wide">Workshop</h3><span className="dur">1–2 days</span>
                <p>A hands-on taster. Students build their first agent or campaign before they leave the room.</p>
                <Arrow width={1.4} />
              </a>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="cta" id="contact">
          <svg className="big-arrow" viewBox="0 0 34 34" aria-hidden="true">
            <path d="M4 30 C 9 12, 19 6, 29 7" stroke="#fff" strokeWidth="2" fill="none" />
            <path d="M22 3.5 L29.5 7 L26 14" stroke="#fff" strokeWidth="2" fill="none" />
          </svg>
          <div className="wrap">
            <p className="label" style={{ color: "var(--on-red)", opacity: 0.8 }}>Partner with NextLeap</p>
            <h2 className="wide">Ready to<br />leap?</h2>
            <p>Tell us about your college and students. We&apos;ll send a course plan mapped to your semester.</p>
            <div className="cta-row">
              <span className="mail">
                <span id="mail">{CONTACT_EMAIL}</span>
                <button type="button" id="copy">Copy email</button>
              </span>
            </div>
          </div>
        </section>
      </main>

      {/* COURSE DRAWER (filled in by NextLeapEffects) */}
      <div className="drawer" id="drawer" aria-hidden="true">
        <button className="scrim" type="button" tabIndex={-1} aria-label="Close course details" data-close="" />
        <div className="panel" role="dialog" aria-modal="true" aria-labelledby="dTitle">
          <div className="p-head">
            <div className="p-bar">
              <span className="label" id="dLabel">Course 01 · Product</span>
              <div className="p-ctrl">
                <button type="button" id="dPrev" aria-label="Previous course">
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M14 8H2M7 3L2 8l5 5" /></svg>
                </button>
                <button type="button" id="dNext" aria-label="Next course"><Arrow /></button>
                <button type="button" id="dClose" aria-label="Close course details" data-close="">
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 3l10 10M13 3L3 13" /></svg>
                </button>
              </div>
            </div>
            <div className="p-title">
              <h2 id="dTitle">AI Product &amp; Agents</h2>
              <div className="p-art" id="dArt" aria-hidden="true" />
            </div>
            <p className="p-pitch" id="dPitch" />
          </div>
          <div className="p-body">
            <div><h4>Modules</h4><ol className="mods" id="dMods" /></div>
            <div><h4>What you&apos;ll ship</h4><ul className="ship" id="dShip" /></div>
            <div><h4>Tools you&apos;ll use</h4><div className="chips" id="dTools" /></div>
            <div className="meta" id="dMeta" />
            <div className="p-cta">
              <a className="btn" href="#contact" data-close="">
                Bring this course to campus <Arrow />
              </a>
              <button className="btn line" type="button" id="dNext2">Next course</button>
            </div>
          </div>
        </div>
      </div>

      <footer>
        <div className="wrap">
          <div className="foot">
            <div>
              <a className="brand" href="#top"><Logo /><span>NextLeap</span></a>
              <p className="tag">AI courses for Indian colleges. Learning by doing, practical, new age.</p>
            </div>
            <div>
              <h4>Courses</h4>
              <ul>
                <li><a href="#c1">AI Product &amp; Agents</a></li>
                <li><a href="#c2">Agile Product Management</a></li>
                <li><a href="#c3">Service Marketing in the Age of AI</a></li>
                <li><a href="#c4">AI in Marketing</a></li>
              </ul>
            </div>
            <div>
              <h4>NextLeap</h4>
              <ul>
                <li><a href="#approach">Approach</a></li>
                <li><a href="#outcomes">Outcomes</a></li>
                <li><a href="#colleges">For colleges</a></li>
              </ul>
            </div>
            <div>
              <h4>Contact</h4>
              <ul><li><a href="#contact">Partner with us</a></li></ul>
            </div>
          </div>
          <div className="legal"><span>© 2026 NextLeap</span><span>Made for the AI-ready classroom</span></div>
        </div>
      </footer>
 
      <NextLeapEffects />
    </>
  );
}
