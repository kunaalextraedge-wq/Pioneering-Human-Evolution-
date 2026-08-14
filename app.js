const { useState, useEffect, useRef } = React;

// ── CONTACT DETAILS — replace before going live ─────────────────────────────
const BRAND_NAME = "PIONEERING HUMAN EVOLUTION";
const BRAND_SHORT = "PHE";
const TAGLINE = "Build the body. Reprogram the mind. Become your next version.";
const COACH_NAME = "Kunaal";
const WHATSAPP_NUMBER = "919011101654";
const EMAIL = "kunaalextraedge@gmail.com";
const INSTAGRAM_HANDLE = "@kunaal_thechamp"; // TODO: update if PHE uses a different handle

// Single light-touch line — this is not a crisis/emergency service, shown
// once near hypnotherapy consent, no branching or hard stop.
const NOT_CRISIS_NOTE = "This is not a crisis or emergency service. If you're in crisis, Tele MANAS (14416, 24/7, Govt. of India) can help right now.";

// ── Payment — UPI/GPay deep link, requested only after a booking is
// confirmed by Kunaal (never collected during the booking request itself).
// No fixed price list — {COACH_NAME} quotes pricing directly when confirming
// a booking, and the client enters that exact amount here. No payment
// gateway, no webhook, no automatic confirmation. Edit freely.
const UPI_ID = "Kunal.wachanekar-2@okicici"; // edit this line any time you need to change the payment ID
const PAYEE_NAME = "Kunaal — Pioneering Human Evolution";

// ── Palette & tokens — dark biotech-lab base, bright neon accents ───────────
const C = {
  bg:        "#050608",
  surface:   "#0c0f12",
  card:      "#12161a",
  border:    "#212730",
  accent:    "#22e5ff",   // electric cyan — primary
  accent2:   "#7ef5ff",
  accentDim: "rgba(34,229,255,0.14)",
  magenta:   "#ff3ec8",   // vivid magenta — transformation / energy
  magentaDim:"rgba(255,62,200,0.14)",
  violet:    "#b98bff",   // violet — mind / hypnotherapy
  violetDim: "rgba(185,139,255,0.14)",
  amber:     "#ffb23e",   // amber — strength / training
  amberDim:  "rgba(255,178,62,0.14)",
  gold:      "#ffd23e",   // gold — contest / trophy
  goldDim:   "rgba(255,210,62,0.14)",
  lime:      "#39ff88",   // lime — guidance / success
  limeDim:   "rgba(57,255,136,0.14)",
  teal:      "#1de9b6",   // teal — diet / nutrition
  tealDim:   "rgba(29,233,182,0.14)",
  white:     "#f5f8fa",
  dim:       "#8d95a0",
  faint:     "#2a3038",
};

// Bright, distinct color per service — used for icons, card top-bars, CTAs
const SERVICE_COLOR = {
  "personal-training": C.amber,
  "online-coaching": C.accent,
  "contest-prep": C.gold,
  "transformation": C.magenta,
  "diet-consultation": C.teal,
  "hypnotherapy": C.violet,
  "consultation": C.lime,
};
const SERVICE_EMOJI = {
  "personal-training": "💪",
  "online-coaching": "💻",
  "contest-prep": "🏆",
  "transformation": "✨",
  "diet-consultation": "🥗",
  "hypnotherapy": "🧠",
  "consultation": "🧭",
};

// ── Service data ─────────────────────────────────────────────────────────────
const SERVICES = [
  { id: "personal-training", name: "Personal Training", tagline: "Direct one-to-one coaching",
    bullets: ["Exercise programming", "Technique correction", "Strength development", "Nutrition guidance", "Progress tracking"],
    cta: "Book Personal Training" },
  { id: "online-coaching", name: "Online Personal Training", tagline: "For clients training remotely",
    bullets: ["Personalized program", "Weekly check-ins", "Progress tracking", "Exercise demos", "Direct communication"],
    cta: "Start Online Coaching" },
  { id: "contest-prep", name: "Contest Prep", tagline: "Competition-focused physique coaching",
    bullets: ["Training & nutrition", "Cardio programming", "Posing practice", "Peak-week planning", "Weekly monitoring"],
    cta: "Apply for Contest Prep", note: "Outcomes on stage are never guaranteed." },
  { id: "transformation", name: "Physique Transformation", tagline: "Fat loss, muscle gain, recomposition",
    bullets: ["Fat loss", "Muscle gain", "Recomposition", "Strength", "Lifestyle change"],
    cta: "Start Transformation" },
  { id: "diet-consultation", name: "Diet & Nutrition Consultation", tagline: "Personalized eating strategy, one to one",
    bullets: ["Meal planning", "Macro guidance", "Works around your food preferences", "Ongoing adjustments", "Supplement guidance"],
    cta: "Book Diet Consultation" },
  { id: "hypnotherapy", name: "Hypnotherapy", tagline: "Mindset & behaviour change support",
    bullets: ["Stress management", "Confidence & performance mindset", "Habit change", "Sleep-related relaxation", "Emotional wellbeing"],
    cta: "Book Hypnotherapy Session",
    note: "Complementary support — does not replace medical or psychiatric care." },
  { id: "consultation", name: "Performance Consultation", tagline: "Not sure which service fits?",
    bullets: ["Talk through your goals", "Get matched to the right path", "No pressure, no obligation"],
    cta: "Find My Path" },
];

const GOAL_OPTIONS = [
  { label: "Lose fat", service: "transformation" },
  { label: "Build muscle", service: "transformation" },
  { label: "Recompose (lose fat + build muscle)", service: "transformation" },
  { label: "Get stage ready", service: "contest-prep" },
  { label: "Improve athletic performance", service: "personal-training" },
  { label: "Start online coaching", service: "online-coaching" },
  { label: "Train with a coach in person", service: "personal-training" },
  { label: "Fix my diet / nutrition", service: "diet-consultation" },
  { label: "Improve mindset / behaviour", service: "hypnotherapy" },
  { label: "Hypnotherapy specifically", service: "hypnotherapy" },
  { label: "I'm not sure yet", service: "consultation" },
];

// ── Icons (line SVG, no stock imagery) ───────────────────────────────────────
function Icon({ type, size = 22, color }) {
  const col = color || C.accent;
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: col, strokeWidth: 1.4, strokeLinecap: "round", strokeLinejoin: "round" };
  const paths = {
    barbell: <path d="M4 12h16M4 9v6M2 8v8M20 9v6M22 8v8M7 7v10M17 7v10" />,
    laptop: <path d="M4 5h16v10H4zM2 19h20M9 8h6" />,
    trophy: <path d="M8 4h8v4a4 4 0 0 1-8 0V4ZM6 5H4a2 2 0 0 0 2 4M18 5h2a2 2 0 0 1-2 4M10 15v3H8v2h8v-2h-2v-3" />,
    spark: <path d="M12 3v6M12 15v6M4.2 4.2l4.2 4.2M15.6 15.6l4.2 4.2M3 12h6M15 12h6M4.2 19.8l4.2-4.2M15.6 8.4l4.2-4.2" />,
    apple: (
      <>
        <path d="M12 8.5c-4 0-6.2 2.8-6.2 6.3S9 20.5 12 20.5s6.2-2.3 6.2-5.7S16 8.5 12 8.5Z" />
        <path d="M12 8.5V6" />
        <path d="M12 6c.4-1.4 1.8-1.9 3-1.4" />
      </>
    ),
    brain: <path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-1 5.8 3 3 0 0 0 3 4.2h1V4Zm6 0a3 3 0 0 1 3 3 3 3 0 0 1 1 5.8 3 3 0 0 1-3 4.2h-1V4Z" />,
    compass: <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm3.5-12.5-2 5-5 2 2-5 5-2Z" />,
  };
  return <svg {...common}>{paths[type]}</svg>;
}

const SERVICE_ICONS = {
  "personal-training": "barbell",
  "online-coaching": "laptop",
  "contest-prep": "trophy",
  "transformation": "spark",
  "diet-consultation": "apple",
  "hypnotherapy": "brain",
  "consultation": "compass",
};

// ── Constellation-style graphics — original point-cloud art inspired by a
// glowing "digital human" look, built from generated coordinates below.
// No stock or medical imagery used anywhere in this file.
const BODY_DOTS = [[141.5,25.2],[157.2,21.5],[151.7,35.6],[128.8,42.4],[127.8,38.8],[146.4,57.7],[131.9,28.7],[156.1,63.5],[153.7,37.0],[167.2,31.9],[120.1,87.3],[172.7,107.0],[156.3,91.7],[142.5,146.7],[122.9,135.7],[126.0,77.2],[145.9,151.6],[156.1,107.7],[136.8,124.4],[160.4,165.3],[155.5,99.3],[173.6,133.0],[138.4,157.5],[132.9,187.6],[167.3,120.2],[149.1,88.2],[101.9,73.2],[95.3,116.5],[86.6,124.7],[100.3,103.0],[95.3,110.6],[85.5,121.2],[87.2,140.0],[95.2,126.0],[102.7,88.8],[90.5,134.4],[97.9,104.4],[89.0,106.9],[89.5,134.8],[92.1,112.6],[85.8,148.1],[101.3,97.3],[77.5,188.9],[76.7,180.6],[72.2,209.5],[77.0,190.4],[75.3,203.4],[73.0,204.4],[82.6,156.5],[195.8,82.3],[201.5,101.2],[199.8,89.0],[198.2,74.2],[197.2,89.9],[207.2,108.0],[211.8,150.4],[198.2,84.1],[200.5,94.4],[198.8,76.3],[197.0,86.8],[212.9,114.1],[209.1,130.6],[198.3,83.9],[210.2,135.3],[219.1,135.4],[227.0,198.5],[216.0,164.7],[218.2,152.3],[216.5,160.8],[227.3,176.9],[225.5,214.2],[219.0,166.3],[72.2,238.4],[76.1,227.5],[72.8,235.8],[222.5,232.2],[237.4,235.3],[234.5,227.4],[163.3,194.5],[164.4,198.3],[144.2,214.3],[171.8,200.0],[132.6,208.1],[134.1,193.2],[166.8,212.6],[164.9,193.7],[158.8,214.5],[152.3,198.8],[150.1,228.0],[124.2,280.7],[143.1,252.6],[138.3,239.0],[135.5,237.2],[143.8,265.5],[130.7,252.6],[123.5,314.8],[130.1,265.5],[137.9,215.8],[160.6,211.5],[162.8,257.3],[156.3,247.1],[171.3,300.9],[160.5,248.3],[156.0,264.0],[160.7,313.1],[156.1,266.5],[158.2,260.3],[164.4,304.2],[126.1,420.6],[126.9,415.3],[130.7,332.6],[135.4,346.9],[128.3,399.2],[127.1,392.1],[128.4,409.7],[170.6,419.5],[174.6,419.8],[167.9,363.7],[166.8,345.2],[164.8,320.8],[165.7,326.2],[178.3,375.3],[108.1,432.2],[113.1,430.1],[117.7,442.6],[189.6,432.1],[182.1,439.2],[185.6,434.8]];
const BODY_EDGES = [[141.5,25.2,131.9,28.7],[141.5,25.2,151.7,35.6],[157.2,21.5,167.2,31.9],[157.2,21.5,151.7,35.6],[151.7,35.6,153.7,37.0],[128.8,42.4,127.8,38.8],[128.8,42.4,131.9,28.7],[127.8,38.8,131.9,28.7],[146.4,57.7,156.1,63.5],[146.4,57.7,153.7,37.0],[153.7,37.0,167.2,31.9],[120.1,87.3,126.0,77.2],[120.1,87.3,102.7,88.8],[172.7,107.0,167.3,120.2],[172.7,107.0,156.1,107.7],[156.3,91.7,155.5,99.3],[156.3,91.7,149.1,88.2],[142.5,146.7,145.9,151.6],[142.5,146.7,138.4,157.5],[122.9,135.7,136.8,124.4],[142.5,146.7,122.9,135.7],[145.9,151.6,138.4,157.5],[156.1,107.7,155.5,99.3],[156.3,91.7,156.1,107.7],[142.5,146.7,136.8,124.4],[145.9,151.6,160.4,165.3],[160.4,165.3,138.4,157.5],[173.6,133.0,167.3,120.2],[132.9,187.6,134.1,193.2],[132.9,187.6,132.6,208.1],[155.5,99.3,149.1,88.2],[101.9,73.2,102.7,88.8],[120.1,87.3,101.9,73.2],[95.3,116.5,92.1,112.6],[95.3,116.5,95.3,110.6],[86.6,124.7,85.5,121.2],[86.6,124.7,95.2,126.0],[100.3,103.0,97.9,104.4],[100.3,103.0,101.3,97.3],[95.3,110.6,92.1,112.6],[85.5,121.2,95.2,126.0],[87.2,140.0,89.5,134.8],[87.2,140.0,90.5,134.4],[95.3,116.5,95.2,126.0],[102.7,88.8,101.3,97.3],[100.3,103.0,102.7,88.8],[90.5,134.4,89.5,134.8],[95.3,110.6,97.9,104.4],[89.0,106.9,92.1,112.6],[95.3,110.6,89.0,106.9],[87.2,140.0,85.8,148.1],[85.8,148.1,82.6,156.5],[97.9,104.4,101.3,97.3],[77.5,188.9,77.0,190.4],[77.5,188.9,76.7,180.6],[76.7,180.6,77.0,190.4],[72.2,209.5,73.0,204.4],[72.2,209.5,75.3,203.4],[75.3,203.4,73.0,204.4],[87.2,140.0,82.6,156.5],[195.8,82.3,198.3,83.9],[195.8,82.3,198.2,84.1],[201.5,101.2,200.5,94.4],[201.5,101.2,207.2,108.0],[199.8,89.0,197.2,89.9],[199.8,89.0,197.0,86.8],[198.2,74.2,198.8,76.3],[195.8,82.3,198.2,74.2],[197.2,89.9,197.0,86.8],[207.2,108.0,212.9,114.1],[211.8,150.4,218.2,152.3],[211.8,150.4,216.5,160.8],[198.2,84.1,198.3,83.9],[198.2,84.1,197.0,86.8],[199.8,89.0,200.5,94.4],[197.2,89.9,200.5,94.4],[195.8,82.3,198.8,76.3],[212.9,114.1,209.1,130.6],[209.1,130.6,210.2,135.3],[209.1,130.6,219.1,135.4],[210.2,135.3,219.1,135.4],[227.0,198.5,225.5,214.2],[227.0,198.5,227.3,176.9],[216.0,164.7,219.0,166.3],[216.0,164.7,216.5,160.8],[218.2,152.3,216.5,160.8],[216.5,160.8,219.0,166.3],[227.3,176.9,219.0,166.3],[216.0,164.7,227.3,176.9],[225.5,214.2,234.5,227.4],[72.2,238.4,72.8,235.8],[72.2,238.4,76.1,227.5],[76.1,227.5,72.8,235.8],[222.5,232.2,234.5,227.4],[222.5,232.2,237.4,235.3],[237.4,235.3,234.5,227.4],[163.3,194.5,164.9,193.7],[163.3,194.5,164.4,198.3],[164.4,198.3,164.9,193.7],[144.2,214.3,137.9,215.8],[144.2,214.3,132.6,208.1],[164.4,198.3,171.8,200.0],[171.8,200.0,164.9,193.7],[132.6,208.1,137.9,215.8],[132.6,208.1,134.1,193.2],[166.8,212.6,160.6,211.5],[166.8,212.6,158.8,214.5],[158.8,214.5,160.6,211.5],[163.3,194.5,152.3,198.8],[164.4,198.3,152.3,198.8],[144.2,214.3,150.1,228.0],[158.8,214.5,150.1,228.0],[124.2,280.7,130.1,265.5],[143.1,252.6,130.7,252.6],[143.1,252.6,143.8,265.5],[138.3,239.0,135.5,237.2],[143.1,252.6,138.3,239.0],[135.5,237.2,130.7,252.6],[143.8,265.5,156.0,264.0],[143.8,265.5,156.1,266.5],[130.7,252.6,130.1,265.5],[123.5,314.8,130.7,332.6],[143.8,265.5,130.1,265.5],[162.8,257.3,158.2,260.3],[162.8,257.3,160.5,248.3],[156.3,247.1,160.5,248.3],[162.8,257.3,156.3,247.1],[171.3,300.9,164.4,304.2],[171.3,300.9,160.7,313.1],[156.0,264.0,156.1,266.5],[156.0,264.0,158.2,260.3],[160.7,313.1,164.8,320.8],[160.7,313.1,164.4,304.2],[156.1,266.5,158.2,260.3],[126.1,420.6,126.9,415.3],[126.1,420.6,128.4,409.7],[126.9,415.3,128.4,409.7],[130.7,332.6,135.4,346.9],[128.3,399.2,127.1,392.1],[128.3,399.2,128.4,409.7],[127.1,392.1,128.4,409.7],[170.6,419.5,174.6,419.8],[170.6,419.5,185.6,434.8],[174.6,419.8,185.6,434.8],[167.9,363.7,178.3,375.3],[167.9,363.7,166.8,345.2],[166.8,345.2,165.7,326.2],[164.8,320.8,165.7,326.2],[160.7,313.1,165.7,326.2],[108.1,432.2,113.1,430.1],[108.1,432.2,117.7,442.6],[113.1,430.1,117.7,442.6],[189.6,432.1,185.6,434.8],[189.6,432.1,182.1,439.2],[182.1,439.2,185.6,434.8]];
const BRAIN_DOTS = [[289.8,110.0],[289.1,120.2],[283.3,129.7],[278.2,138.9],[275.1,148.5],[270.8,157.9],[262.3,165.7],[250.8,171.4],[239.7,176.6],[230.4,182.8],[221.1,189.0],[209.1,192.1],[194.9,190.5],[181.5,187.1],[170.7,187.3],[161.2,194.3],[150.0,205.4],[136.2,214.3],[121.5,216.4],[108.1,212.5],[96.2,206.4],[85.0,200.3],[74.8,193.6],[67.3,184.8],[63.3,174.4],[59.9,164.9],[53.1,158.1],[42.5,152.7],[32.8,146.1],[29.3,137.2],[32.5,127.4],[36.2,118.3],[33.8,110.0],[24.5,102.2],[14.5,92.9],[10.6,83.3],[15.0,74.6],[24.1,67.5],[34.4,61.1],[45.3,55.7],[58.7,52.2],[74.2,51.6],[88.9,52.2],[99.6,50.3],[106.7,43.9],[114.0,35.0],[124.3,28.3],[137.1,26.9],[150.0,29.4],[162.2,31.5],[175.0,30.6],[189.3,28.1],[204.0,27.5],[216.8,30.9],[227.0,37.1],[236.0,43.8],[244.3,50.3],[250.2,58.0],[250.9,67.3],[247.4,77.1],[245.6,84.9],[251.6,90.5],[265.8,95.4],[281.2,101.8],[187.7,178.8],[137.3,91.2],[157.7,72.1],[97.7,84.7],[222.7,81.8],[150.2,60.6],[215.3,131.3],[63.5,116.9],[239.2,108.8],[148.8,185.1],[120.3,122.9],[106.3,184.6],[207.9,147.4],[123.6,92.8],[82.0,57.8],[253.7,154.0],[89.3,72.8],[92.4,114.0],[54.6,111.4],[282.2,130.6],[97.0,94.5]];
const BRAIN_EDGES = [[289.8,110.0,289.1,120.2],[289.8,110.0,281.2,101.8],[289.1,120.2,283.3,129.7],[283.3,129.7,282.2,130.6],[283.3,129.7,278.2,138.9],[278.2,138.9,282.2,130.6],[278.2,138.9,275.1,148.5],[275.1,148.5,270.8,157.9],[270.8,157.9,262.3,165.7],[262.3,165.7,250.8,171.4],[250.8,171.4,239.7,176.6],[239.7,176.6,230.4,182.8],[230.4,182.8,221.1,189.0],[221.1,189.0,209.1,192.1],[209.1,192.1,194.9,190.5],[194.9,190.5,187.7,178.8],[194.9,190.5,181.5,187.1],[181.5,187.1,187.7,178.8],[181.5,187.1,170.7,187.3],[170.7,187.3,161.2,194.3],[161.2,194.3,148.8,185.1],[161.2,194.3,150.0,205.4],[150.0,205.4,136.2,214.3],[136.2,214.3,121.5,216.4],[121.5,216.4,108.1,212.5],[108.1,212.5,96.2,206.4],[96.2,206.4,85.0,200.3],[85.0,200.3,74.8,193.6],[74.8,193.6,67.3,184.8],[67.3,184.8,63.3,174.4],[63.3,174.4,59.9,164.9],[59.9,164.9,53.1,158.1],[53.1,158.1,42.5,152.7],[42.5,152.7,32.8,146.1],[32.8,146.1,29.3,137.2],[29.3,137.2,32.5,127.4],[32.5,127.4,36.2,118.3],[36.2,118.3,33.8,110.0],[33.8,110.0,24.5,102.2],[24.5,102.2,14.5,92.9],[14.5,92.9,10.6,83.3],[10.6,83.3,15.0,74.6],[15.0,74.6,24.1,67.5],[24.1,67.5,34.4,61.1],[34.4,61.1,45.3,55.7],[45.3,55.7,58.7,52.2],[58.7,52.2,74.2,51.6],[74.2,51.6,82.0,57.8],[74.2,51.6,88.9,52.2],[88.9,52.2,82.0,57.8],[88.9,52.2,99.6,50.3],[99.6,50.3,106.7,43.9],[106.7,43.9,114.0,35.0],[114.0,35.0,124.3,28.3],[124.3,28.3,137.1,26.9],[137.1,26.9,150.0,29.4],[150.0,29.4,162.2,31.5],[162.2,31.5,175.0,30.6],[175.0,30.6,189.3,28.1],[189.3,28.1,204.0,27.5],[204.0,27.5,216.8,30.9],[216.8,30.9,227.0,37.1],[227.0,37.1,236.0,43.8],[236.0,43.8,244.3,50.3],[244.3,50.3,250.2,58.0],[250.2,58.0,250.9,67.3],[250.9,67.3,247.4,77.1],[247.4,77.1,245.6,84.9],[245.6,84.9,251.6,90.5],[247.4,77.1,251.6,90.5],[251.6,90.5,265.8,95.4],[265.8,95.4,281.2,101.8],[137.3,91.2,123.6,92.8],[157.7,72.1,150.2,60.6],[97.7,84.7,97.0,94.5],[97.7,84.7,89.3,72.8],[215.3,131.3,207.9,147.4],[63.5,116.9,54.6,111.4],[150.0,205.4,148.8,185.1],[262.3,165.7,253.7,154.0],[270.8,157.9,253.7,154.0],[82.0,57.8,89.3,72.8],[92.4,114.0,97.0,94.5],[36.2,118.3,54.6,111.4]];
const BRAIN_OUTLINE = [[289.8,110.0],[289.1,120.2],[283.3,129.7],[278.2,138.9],[275.1,148.5],[270.8,157.9],[262.3,165.7],[250.8,171.4],[239.7,176.6],[230.4,182.8],[221.1,189.0],[209.1,192.1],[194.9,190.5],[181.5,187.1],[170.7,187.3],[161.2,194.3],[150.0,205.4],[136.2,214.3],[121.5,216.4],[108.1,212.5],[96.2,206.4],[85.0,200.3],[74.8,193.6],[67.3,184.8],[63.3,174.4],[59.9,164.9],[53.1,158.1],[42.5,152.7],[32.8,146.1],[29.3,137.2],[32.5,127.4],[36.2,118.3],[33.8,110.0],[24.5,102.2],[14.5,92.9],[10.6,83.3],[15.0,74.6],[24.1,67.5],[34.4,61.1],[45.3,55.7],[58.7,52.2],[74.2,51.6],[88.9,52.2],[99.6,50.3],[106.7,43.9],[114.0,35.0],[124.3,28.3],[137.1,26.9],[150.0,29.4],[162.2,31.5],[175.0,30.6],[189.3,28.1],[204.0,27.5],[216.8,30.9],[227.0,37.1],[236.0,43.8],[244.3,50.3],[250.2,58.0],[250.9,67.3],[247.4,77.1],[245.6,84.9],[251.6,90.5],[265.8,95.4],[281.2,101.8]];
function BodyConstellation() {
  const helixRungs = Array.from({ length: 6 }, (_, i) => i);
  return (
    <svg viewBox="0 0 300 460" width="100%" height="100%" style={{ maxWidth: 280, margin: "0 auto", display: "block" }}>
      <defs>
        <linearGradient id="bodyLineGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={C.accent} stopOpacity="0.8" />
          <stop offset="100%" stopColor={C.magenta} stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="helixGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={C.violet} />
          <stop offset="100%" stopColor={C.accent} />
        </linearGradient>
        <radialGradient id="bodyGlow" cx="50%" cy="35%" r="60%">
          <stop offset="0%" stopColor={C.accent} stopOpacity="0.16" />
          <stop offset="100%" stopColor={C.accent} stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="150" cy="180" r="200" fill="url(#bodyGlow)" />

      {/* connecting mesh */}
      <g>
        {BODY_EDGES.map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="url(#bodyLineGrad)" strokeWidth="0.6" opacity="0.4" />
        ))}
      </g>
      {/* particle nodes */}
      <g>
        {BODY_DOTS.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i % 5 === 0 ? 2.6 : 1.6} fill={i % 5 === 0 ? C.magenta : C.accent} opacity="0.9" />
        ))}
      </g>

      {/* DNA helix flourish, right side */}
      <g transform="translate(248,40)" opacity="0.85">
        {helixRungs.map((i) => {
          const y = i * 32;
          const xa = 10 + 13 * Math.sin(i);
          const xb = 10 - 13 * Math.sin(i);
          return (
            <g key={i}>
              <circle cx={xa} cy={y} r="2.6" fill={C.violet} />
              <circle cx={xb} cy={y} r="2.6" fill={C.accent} />
              <line x1={xa} y1={y} x2={xb} y2={y} stroke="url(#helixGrad)" strokeWidth="0.8" opacity="0.6" />
            </g>
          );
        })}
        <path
          d={`M ${10 + 13 * Math.sin(0)} 0 ${helixRungs.map((i) => `L ${10 + 13 * Math.sin(i)} ${i * 32}`).join(" ")}`}
          fill="none" stroke={C.violet} strokeWidth="1" opacity="0.7"
        />
        <path
          d={`M ${10 - 13 * Math.sin(0)} 0 ${helixRungs.map((i) => `L ${10 - 13 * Math.sin(i)} ${i * 32}`).join(" ")}`}
          fill="none" stroke={C.accent} strokeWidth="1" opacity="0.7"
        />
      </g>

      {/* pulse line, base */}
      <path d="M14 452 L58 452 L72 428 L86 458 L100 434 L112 452 L286 452"
        fill="none" stroke={C.lime} strokeWidth="1.6" opacity="0.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BrainConstellation({ size = 260 }) {
  return (
    <svg viewBox="0 0 300 220" width="100%" height="100%" style={{ maxWidth: size, margin: "0 auto", display: "block" }}>
      <defs>
        <linearGradient id="brainLineGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={C.violet} stopOpacity="0.8" />
          <stop offset="100%" stopColor={C.magenta} stopOpacity="0.55" />
        </linearGradient>
        <radialGradient id="brainGlow" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor={C.magenta} stopOpacity="0.22" />
          <stop offset="100%" stopColor={C.magenta} stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="150" cy="110" rx="150" ry="105" fill="url(#brainGlow)" />

      <path
        d={`M ${BRAIN_OUTLINE.map(([x, y]) => `${x} ${y}`).join(" L ")} Z`}
        fill="none" stroke={C.violet} strokeWidth="1" opacity="0.5"
      />
      <g>
        {BRAIN_EDGES.map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="url(#brainLineGrad)" strokeWidth="0.6" opacity="0.45" />
        ))}
      </g>
      <g>
        {BRAIN_DOTS.map(([x, y], i) => {
          const c = i % 4 === 0 ? C.violet : i % 4 === 1 ? C.magenta : C.accent;
          return <circle key={i} cx={x} cy={y} r={i % 6 === 0 ? 2.4 : 1.4} fill={c} opacity="0.9" />;
        })}
      </g>
    </svg>
  );
}

// ── Shared UI atoms ──────────────────────────────────────────────────────────
function AccentBar({ color }) {
  const c1 = color || C.accent;
  const c2 = color ? C.white : C.magenta;
  return (
    <div style={{
      position: "absolute", top: 0, left: 0, right: 0, height: 3,
      background: `linear-gradient(90deg, ${c1} 0%, ${c2} 50%, ${c1} 100%)`,
    }} />
  );
}

function Grain() {
  return (
    <div style={{
      position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, opacity: 0.03,
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      backgroundSize: "256px",
    }} />
  );
}

function AccentButton({ children, onClick, disabled, style }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      padding: "16px 0", width: "100%",
      background: disabled ? C.faint : `linear-gradient(90deg, ${C.accent}, ${C.magenta})`,
      border: "none", cursor: disabled ? "not-allowed" : "pointer",
      fontFamily: "sans-serif", fontSize: 12, fontWeight: 700,
      color: disabled ? C.dim : "#04141a", letterSpacing: "0.2em", textTransform: "uppercase",
      ...style,
    }}>{children}</button>
  );
}

function GhostButton({ children, onClick, disabled, style }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      padding: "14px 0", width: "100%",
      background: "transparent", border: `1px solid ${disabled ? C.border : C.accent}`,
      cursor: disabled ? "not-allowed" : "pointer",
      fontFamily: "sans-serif", fontSize: 12,
      color: disabled ? C.dim : C.accent, letterSpacing: "0.15em", textTransform: "uppercase",
      ...style,
    }}>{children}</button>
  );
}

function WhatsAppFab({ onClick }) {
  return (
    <button onClick={onClick} style={{
      position: "fixed", bottom: 24, right: 24, zIndex: 100,
      background: C.accent, border: "none", borderRadius: "50%",
      width: 54, height: 54, cursor: "pointer",
      display: "flex", alignItems: "center", justifyContent: "center",
      boxShadow: "0 12px 30px rgba(0,0,0,0.6)",
    }} aria-label="Chat on WhatsApp">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="#04141a">
        <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm0 18.2a8.1 8.1 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.5.1-.6.8-.7.9-.3.2-.5.1a6.6 6.6 0 0 1-2-1.2 7.4 7.4 0 0 1-1.4-1.7c-.1-.2 0-.4.1-.5l.4-.4.2-.4v-.4c-.1-.1-.5-1.3-.7-1.8s-.4-.4-.5-.4h-.4a.9.9 0 0 0-.6.3 2.7 2.7 0 0 0-.8 2 4.7 4.7 0 0 0 1 2.5 10.7 10.7 0 0 0 4.1 3.7c.6.2 1 .4 1.4.5a3.3 3.3 0 0 0 1.5.1 2.5 2.5 0 0 0 1.6-1.1 2 2 0 0 0 .1-1.1c-.1-.1-.2-.2-.5-.3Z" />
      </svg>
    </button>
  );
}

function PheAiFab({ onClick }) {
  return (
    <button onClick={onClick} style={{
      position: "fixed", bottom: 24, left: 24, zIndex: 100,
      background: C.surface, border: `1px solid ${C.accent}`, borderRadius: 30,
      padding: "12px 18px", cursor: "pointer",
      display: "flex", alignItems: "center", gap: 8,
      boxShadow: "0 12px 30px rgba(0,0,0,0.6)",
    }}>
      <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.accent, boxShadow: `0 0 8px ${C.accent}` }} />
      <span style={{ fontFamily: "sans-serif", fontSize: 12, color: C.white, letterSpacing: "0.05em", fontWeight: 600 }}>
        PHE AI — let's find your path
      </span>
    </button>
  );
}

// ── Nav bar ───────────────────────────────────────────────────────────────────
function NavBar({ onNav }) {
  return (
    <div style={{
      position: "sticky", top: 0, zIndex: 60,
      background: "rgba(5,6,7,0.9)", backdropFilter: "blur(10px)",
      borderBottom: `1px solid ${C.border}`,
    }}>
      <div style={{
        maxWidth: 1000, margin: "0 auto", padding: "16px 20px",
        display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12,
      }}>
        <div onClick={() => onNav("home")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.accent, boxShadow: `0 0 8px ${C.accent}` }} />
          <span style={{ fontFamily: "sans-serif", fontSize: 12.5, color: C.white, letterSpacing: "0.18em", fontWeight: 700 }}>
            {BRAND_SHORT}
          </span>
        </div>
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {[["home", "🏠 Home"], ["services", "🧬 Services"], ["quiz", "🧠 Assessment"], ["booking", "📅 Book"], ["payment", "💳 Pay"]].map(([id, label]) => (
            <button key={id} onClick={() => onNav(id)} style={{
              background: "transparent", border: "none", cursor: "pointer",
              padding: "8px 12px", fontFamily: "sans-serif", fontSize: 11, letterSpacing: "0.1em",
              textTransform: "uppercase", color: C.dim,
            }}>{label}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Home screen ───────────────────────────────────────────────────────────────
function HomeScreen({ onNav, onSelectService }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 100); return () => clearTimeout(t); }, []);

  const credibility = ["💪 Personal Coaching", "💻 Online Coaching", "🏆 Contest Prep", "🧠 Hypnotherapy", "✨ Transformation"];
  const scienceBadges = ["🧬 Physiology-Informed", "📊 Data-Tracked Progress", "🧠 Behaviour Science"];

  return (
    <div style={{ opacity: visible ? 1 : 0, transition: "opacity 0.8s ease" }}>
      {/* Hero */}
      <div style={{ maxWidth: 780, margin: "0 auto", padding: "56px 24px 40px", textAlign: "center", position: "relative" }}>
        <div style={{
          position: "absolute", top: -40, left: "50%", transform: "translateX(-50%)",
          width: 420, height: 420, borderRadius: "50%",
          background: `radial-gradient(circle, ${C.accentDim} 0%, ${C.magentaDim} 45%, transparent 75%)`,
          pointerEvents: "none",
        }} />
        <div style={{ position: "relative" }}>
          <div style={{ maxWidth: 260, margin: "0 auto 8px" }}>
            <BodyConstellation />
          </div>
          <div style={{ fontFamily: "sans-serif", fontSize: 11, color: C.accent, letterSpacing: "0.35em", textTransform: "uppercase", fontWeight: 700, marginBottom: 20 }}>
            ⚡ Human Performance, Reimagined
          </div>
          <div style={{ fontFamily: "Georgia, serif", fontSize: 40, color: C.white, lineHeight: 1.15, marginBottom: 18, letterSpacing: "0.01em" }}>
            {BRAND_NAME}
          </div>
          <p style={{ fontFamily: "sans-serif", fontSize: 16, color: C.dim, lineHeight: 1.7, margin: "0 auto 20px", maxWidth: 480 }}>
            {TAGLINE}
          </p>

          <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 30 }}>
            {scienceBadges.map((b) => (
              <span key={b} style={{
                fontFamily: "sans-serif", fontSize: 11, color: C.white,
                background: C.card, border: `1px solid ${C.violet}`, padding: "6px 13px", borderRadius: 20,
              }}>{b}</span>
            ))}
          </div>

          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginBottom: 28 }}>
            <div style={{ width: 220 }}><AccentButton onClick={() => onNav("quiz")}>🔥 Start Your Transformation</AccentButton></div>
            <div style={{ width: 220 }}><GhostButton onClick={() => onNav("booking")}>📅 Book a Consultation</GhostButton></div>
          </div>
          <button onClick={() => onNav("whatsapp")} style={{
            background: "none", border: "none", color: C.lime, cursor: "pointer",
            fontFamily: "sans-serif", fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase",
          }}>💬 WhatsApp Me →</button>

          <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginTop: 40 }}>
            {credibility.map((c) => (
              <span key={c} style={{
                fontFamily: "sans-serif", fontSize: 10.5, color: C.dim,
                border: `1px solid ${C.border}`, padding: "6px 12px", letterSpacing: "0.03em",
              }}>{c}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Services grid */}
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "56px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontFamily: "sans-serif", fontSize: 11, color: C.accent, letterSpacing: "0.25em", textTransform: "uppercase", fontWeight: 700, marginBottom: 10 }}>
            🧬 Services
          </div>
          <div style={{ fontFamily: "Georgia, serif", fontSize: 24, color: C.white }}>Seven ways in — one coach behind all of them</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 18 }}>
          {SERVICES.map((s) => {
            const col = SERVICE_COLOR[s.id];
            return (
              <div key={s.id} style={{
                background: C.surface, border: `1px solid ${C.border}`, position: "relative", overflow: "hidden",
              }}>
                <AccentBar color={col} />
                {s.id === "hypnotherapy" && (
                  <div style={{ padding: "12px 12px 0", opacity: 0.9 }}>
                    <BrainConstellation size={200} />
                  </div>
                )}
                <div style={{ padding: "26px 24px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 22 }}>{SERVICE_EMOJI[s.id]}</span>
                    <Icon type={SERVICE_ICONS[s.id]} size={24} color={col} />
                  </div>
                  <div style={{ fontFamily: "Georgia, serif", fontSize: 18, color: C.white, margin: "14px 0 4px" }}>{s.name}</div>
                  <div style={{ fontFamily: "sans-serif", fontSize: 12.5, color: col, marginBottom: 14, fontWeight: 600 }}>{s.tagline}</div>
                  <ul style={{ margin: "0 0 18px", padding: "0 0 0 18px", listStyle: "none" }}>
                    {s.bullets.map((b) => (
                      <li key={b} style={{ fontFamily: "sans-serif", fontSize: 12.5, color: C.dim, marginBottom: 6, position: "relative" }}>
                        <span style={{ position: "absolute", left: -18, color: col }}>✓</span>{b}
                      </li>
                    ))}
                  </ul>
                  {s.note && (
                    <p style={{ fontFamily: "sans-serif", fontSize: 11, color: C.dim, fontStyle: "italic", lineHeight: 1.5, marginBottom: 16 }}>
                      {s.note}
                    </p>
                  )}
                  <AccentButton onClick={() => onSelectService(s.id)} style={{ padding: "12px 0", fontSize: 10.5, background: col, color: "#04141a" }}>
                    {s.cta}
                  </AccentButton>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* About */}
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "56px 24px", textAlign: "center" }}>
        <div style={{ fontFamily: "sans-serif", fontSize: 11, color: C.accent, letterSpacing: "0.25em", textTransform: "uppercase", fontWeight: 700, marginBottom: 14 }}>
          👤 About {COACH_NAME}
        </div>
        <p style={{ fontFamily: "sans-serif", fontSize: 14.5, color: C.dim, lineHeight: 1.8 }}>
          {COACH_NAME} works at the intersection of personal training, physique
          transformation, contest preparation, and hypnotherapy — training the
          body and addressing the mindset behind it, under one roof. Every
          client works directly with {COACH_NAME}, one to one.
        </p>
      </div>

      {/* Testimonials placeholder */}
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 24px 56px" }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ fontFamily: "sans-serif", fontSize: 11, color: C.accent, letterSpacing: "0.25em", textTransform: "uppercase", fontWeight: 700 }}>
            📈 Results
          </div>
        </div>
        <div style={{
          background: C.surface, border: `1px dashed ${C.border}`, padding: "32px 24px", textAlign: "center",
        }}>
          <p style={{ fontFamily: "sans-serif", fontSize: 13, color: C.dim, lineHeight: 1.7, margin: 0 }}>
            Verified client testimonials go here — add real names, goals, and
            results once available. Placeholder left empty intentionally;
            nothing here is fabricated.
          </p>
        </div>
      </div>

      {/* Final CTA */}
      <div style={{ borderTop: `1px solid ${C.border}`, padding: "64px 24px", textAlign: "center" }}>
        <div style={{ fontFamily: "Georgia, serif", fontSize: 24, color: C.white, marginBottom: 24 }}>
          🚀 Ready to build your next version?
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", maxWidth: 480, margin: "0 auto" }}>
          <div style={{ width: 220 }}><AccentButton onClick={() => onNav("quiz")}>🔥 Start My Transformation</AccentButton></div>
          <div style={{ width: 220 }}><GhostButton onClick={() => onNav("whatsapp")}>💬 WhatsApp {COACH_NAME}</GhostButton></div>
        </div>
      </div>
    </div>
  );
}

// ── Smart lead quiz ───────────────────────────────────────────────────────────
function QuizScreen({ step, goal, profile, onGoal, onProfileChange, onNext, onBack, canAdvance }) {
  const profileFields = [
    { key: "age", label: "Age", type: "text" },
    { key: "sex", label: "Sex", type: "select", options: ["Male", "Female", "Prefer not to say"] },
    { key: "height", label: "Height (cm)", type: "text" },
    { key: "weight", label: "Weight (kg)", type: "text" },
    { key: "experience", label: "Training Experience", type: "select", options: ["Beginner", "Intermediate", "Advanced"] },
    { key: "activity", label: "Current Activity Level", type: "select", options: ["Sedentary", "Lightly Active", "Active", "Very Active"] },
    { key: "timeline", label: "Timeline for Results", type: "select", options: ["1–3 months", "3–6 months", "6–12 months", "Flexible"] },
    { key: "location", label: "City", type: "text" },
    { key: "budget", label: "Monthly Budget Range", type: "select", options: ["Under ₹10,000", "₹10,000–25,000", "₹25,000–50,000", "₹50,000+"] },
  ];

  return (
    <div style={{ maxWidth: 560, margin: "0 auto", padding: "40px 24px 80px" }}>
      <div style={{
        background: C.surface, border: `1px solid ${C.border}`, position: "relative", overflow: "hidden",
        boxShadow: "0 24px 64px rgba(0,0,0,0.6)",
      }}>
        <AccentBar />
        <div style={{ padding: "36px 32px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.accent }} />
            <span style={{ fontFamily: "sans-serif", fontSize: 11, color: C.accent, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700 }}>
              ⚡ PHE AI
            </span>
          </div>

          {step === 0 && (
            <>
              <div style={{ fontFamily: "Georgia, serif", fontSize: 21, color: C.white, lineHeight: 1.4, marginBottom: 24 }}>
                🎯 What are you trying to change?
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                {GOAL_OPTIONS.map((g) => (
                  <button key={g.label} onClick={() => onGoal(g)} style={{
                    textAlign: "left", padding: "13px 16px",
                    background: goal?.label === g.label ? C.accentDim : "transparent",
                    border: `1px solid ${goal?.label === g.label ? C.accent : C.border}`,
                    color: goal?.label === g.label ? C.white : C.dim,
                    fontFamily: "sans-serif", fontSize: 13.5, cursor: "pointer",
                  }}>{g.label}</button>
                ))}
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <div style={{ fontFamily: "Georgia, serif", fontSize: 21, color: C.white, lineHeight: 1.4, marginBottom: 6 }}>
                🧬 Tell me a bit more about you.
              </div>
              <p style={{ fontFamily: "sans-serif", fontSize: 12.5, color: C.dim, marginBottom: 22 }}>
                This helps shape the right recommendation — nothing here is shared until you choose to send it.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {profileFields.map((f) => (
                  <div key={f.key}>
                    <label style={{ display: "block", fontFamily: "sans-serif", fontSize: 10.5, color: C.dim, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 7 }}>
                      {f.label}
                    </label>
                    {f.type === "select" ? (
                      <select value={profile[f.key] || ""} onChange={(e) => onProfileChange(f.key, e.target.value)} style={{
                        width: "100%", boxSizing: "border-box", background: C.card, border: `1px solid ${C.border}`,
                        color: C.white, fontFamily: "sans-serif", fontSize: 14, padding: "12px 14px", outline: "none",
                      }}>
                        <option value="">Select…</option>
                        {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
                      </select>
                    ) : (
                      <input value={profile[f.key] || ""} onChange={(e) => onProfileChange(f.key, e.target.value)} style={{
                        width: "100%", boxSizing: "border-box", background: C.card, border: `1px solid ${C.border}`,
                        color: C.white, fontFamily: "sans-serif", fontSize: 14, padding: "12px 14px", outline: "none",
                      }} />
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

          <div style={{ marginTop: 28, display: "flex", gap: 10 }}>
            {step > 0 && <div style={{ width: 90 }}><GhostButton onClick={onBack}>Back</GhostButton></div>}
            <div style={{ flex: 1 }}>
              <AccentButton disabled={!canAdvance} onClick={onNext}>
                {step === 1 ? "🧬 See My Recommendation →" : "Continue →"}
              </AccentButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RecommendationScreen({ goal, service, onBook, onWhatsapp }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 100); return () => clearTimeout(t); }, []);

  return (
    <div style={{
      maxWidth: 560, margin: "0 auto", padding: "40px 24px 80px",
      opacity: visible ? 1 : 0, transition: "opacity 0.6s ease",
    }}>
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, position: "relative", overflow: "hidden", boxShadow: "0 24px 64px rgba(0,0,0,0.6)" }}>
        <AccentBar color={SERVICE_COLOR[service.id]} />
        <div style={{ padding: "40px 32px", textAlign: "center" }}>
          <div style={{ fontFamily: "sans-serif", fontSize: 11, color: SERVICE_COLOR[service.id], letterSpacing: "0.25em", textTransform: "uppercase", fontWeight: 700, marginBottom: 16 }}>
            🧬 Your Recommended Path
          </div>
          <div style={{ fontSize: 40, marginBottom: 6 }}>{SERVICE_EMOJI[service.id]}</div>
          <Icon type={SERVICE_ICONS[service.id]} size={30} color={SERVICE_COLOR[service.id]} />
          <div style={{ fontFamily: "Georgia, serif", fontSize: 24, color: C.white, margin: "16px 0 10px" }}>{service.name}</div>
          <p style={{ fontFamily: "sans-serif", fontSize: 14, color: C.dim, lineHeight: 1.7, marginBottom: 28 }}>
            Based on your answer — <em style={{ color: C.white }}>"{goal.label}"</em> —
            {" "}{service.name} looks like your strongest starting point. A consultation
            will confirm the details and build out the actual plan.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <AccentButton onClick={onBook} style={{ background: SERVICE_COLOR[service.id] }}>📅 Book Consultation →</AccentButton>
            <GhostButton onClick={onWhatsapp}>💬 Chat on WhatsApp</GhostButton>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Booking / intake form ────────────────────────────────────────────────────
function BookingScreen({ service, fields, onChange, onSend, onBack }) {
  const common = [
    { key: "name", label: "Full Name", type: "text" },
    { key: "email", label: "Email", type: "email" },
    { key: "phone", label: "Phone (with country code)", type: "tel" },
    { key: "city", label: "City", type: "text" },
  ];

  const perService = {
    "personal-training": [
      { key: "goal", label: "Primary Goal", type: "text" },
      { key: "experience", label: "Training Experience", type: "select", options: ["Beginner", "Intermediate", "Advanced"] },
    ],
    "online-coaching": [
      { key: "goal", label: "Primary Goal", type: "text" },
      { key: "experience", label: "Training Experience", type: "select", options: ["Beginner", "Intermediate", "Advanced"] },
    ],
    "transformation": [
      { key: "goal", label: "Primary Goal", type: "select", options: ["Fat loss", "Muscle gain", "Recomposition", "Strength", "Lifestyle change"] },
      { key: "timeline", label: "Timeline", type: "text" },
    ],
    "contest-prep": [
      { key: "category", label: "Competition Category", type: "text" },
      { key: "compDate", label: "Competition Date (if known)", type: "text" },
      { key: "prevComps", label: "Previous Competitions", type: "text" },
      { key: "stageExp", label: "Posing / Stage Experience", type: "text" },
    ],
    "diet-consultation": [
      { key: "goal", label: "Primary Goal", type: "select", options: ["Fat loss", "Muscle gain", "Maintenance", "Athletic performance", "General health"] },
      { key: "currentDiet", label: "Current Eating Pattern", type: "text" },
      { key: "restrictions", label: "Allergies / Dietary Restrictions (if any)", type: "text" },
    ],
    "hypnotherapy": [
      { key: "reason", label: "Reason for Session", type: "select",
        options: ["Stress management", "Confidence / performance mindset", "Habit change", "Sleep-related relaxation", "General wellbeing"] },
      { key: "sessionType", label: "Preferred Session Type", type: "select", options: ["Consultation", "Individual Session", "Package", "Follow-up"] },
      { key: "prevExperience", label: "Previous Therapy / Hypnotherapy Experience", type: "text" },
    ],
    "consultation": [
      { key: "notes", label: "What's on your mind?", type: "text" },
    ],
  };

  const allFields = [...common, ...(perService[service.id] || [])];
  const required = ["name", "email", "phone"];
  const valid = required.every((k) => fields[k] && fields[k].trim() !== "") && /\S+@\S+\.\S+/.test(fields.email || "");
  const isHypnoConsent = service.id === "hypnotherapy";
  const consentOk = !isHypnoConsent || fields.consent === true;

  return (
    <div style={{ maxWidth: 560, margin: "0 auto", padding: "40px 24px 80px" }}>
      <button onClick={onBack} style={{ background: "none", border: "none", color: C.dim, cursor: "pointer", fontFamily: "sans-serif", fontSize: 12, marginBottom: 20, padding: 0 }}>← Back</button>

      <div style={{ background: C.surface, border: `1px solid ${C.border}`, position: "relative", overflow: "hidden", boxShadow: "0 24px 64px rgba(0,0,0,0.6)" }}>
        <AccentBar color={SERVICE_COLOR[service.id]} />
        {service.id === "hypnotherapy" && (
          <div style={{ padding: "20px 20px 0" }}>
            <BrainConstellation size={220} />
          </div>
        )}
        <div style={{ padding: "36px 32px" }}>
          <div style={{ fontSize: 26, marginBottom: 8 }}>{SERVICE_EMOJI[service.id]}</div>
          <div style={{ fontFamily: "Georgia, serif", fontSize: 21, color: C.white, marginBottom: 6 }}>{service.cta}</div>
          <p style={{ fontFamily: "sans-serif", fontSize: 12.5, color: C.dim, marginBottom: 8 }}>{service.name} — {service.tagline}</p>
          {service.note && (
            <div style={{ background: C.card, borderLeft: `3px solid ${SERVICE_COLOR[service.id]}`, padding: "12px 16px", margin: "16px 0" }}>
              <p style={{ fontFamily: "sans-serif", fontSize: 12, color: C.dim, lineHeight: 1.6, margin: 0, fontStyle: "italic" }}>{service.note}</p>
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 20 }}>
            {allFields.map((f) => (
              <div key={f.key}>
                <label style={{ display: "block", fontFamily: "sans-serif", fontSize: 10.5, color: C.dim, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 7 }}>
                  {f.label}
                </label>
                {f.type === "select" ? (
                  <select value={fields[f.key] || ""} onChange={(e) => onChange(f.key, e.target.value)} style={{
                    width: "100%", boxSizing: "border-box", background: C.card, border: `1px solid ${C.border}`,
                    color: C.white, fontFamily: "sans-serif", fontSize: 14, padding: "12px 14px", outline: "none",
                  }}>
                    <option value="">Select…</option>
                    {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                ) : (
                  <input type={f.type} value={fields[f.key] || ""} onChange={(e) => onChange(f.key, e.target.value)} style={{
                    width: "100%", boxSizing: "border-box", background: C.card, border: `1px solid ${C.border}`,
                    color: C.white, fontFamily: "sans-serif", fontSize: 14, padding: "12px 14px", outline: "none",
                  }} />
                )}
              </div>
            ))}

            <div>
              <label style={{ display: "block", fontFamily: "sans-serif", fontSize: 10.5, color: C.dim, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 7 }}>
                📅 Preferred Date
              </label>
              <input type="date" value={fields.preferredDate || ""} onChange={(e) => onChange("preferredDate", e.target.value)} style={{
                width: "100%", boxSizing: "border-box", background: C.card, border: `1px solid ${C.border}`,
                color: C.white, fontFamily: "sans-serif", fontSize: 14, padding: "12px 14px", outline: "none",
              }} />
            </div>
            <div>
              <label style={{ display: "block", fontFamily: "sans-serif", fontSize: 10.5, color: C.dim, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 7 }}>
                🕐 Preferred Time
              </label>
              <input type="time" value={fields.preferredTime || ""} onChange={(e) => onChange("preferredTime", e.target.value)} style={{
                width: "100%", boxSizing: "border-box", background: C.card, border: `1px solid ${C.border}`,
                color: C.white, fontFamily: "sans-serif", fontSize: 14, padding: "12px 14px", outline: "none",
              }} />
            </div>
          </div>

          {isHypnoConsent && (
            <>
              <p style={{ fontFamily: "sans-serif", fontSize: 11, color: C.dim, lineHeight: 1.6, marginTop: 20, marginBottom: 0 }}>
                ℹ️ {NOT_CRISIS_NOTE}
              </p>
              <label style={{ display: "flex", gap: 10, alignItems: "flex-start", marginTop: 14, cursor: "pointer" }}>
                <input type="checkbox" checked={fields.consent === true} onChange={(e) => onChange("consent", e.target.checked)} style={{ marginTop: 3 }} />
                <span style={{ fontFamily: "sans-serif", fontSize: 12, color: C.dim, lineHeight: 1.6 }}>
                  I understand hypnotherapy is complementary support, does not
                  replace medical or psychiatric care, and does not diagnose or
                  cure any condition.
                </span>
              </label>
            </>
          )}

          <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 10 }}>
            <AccentButton disabled={!valid || !consentOk} onClick={() => onSend("whatsapp")} style={{ background: (!valid || !consentOk) ? undefined : `linear-gradient(90deg, ${SERVICE_COLOR[service.id]}, ${C.accent})` }}>
              💬 Send via WhatsApp →
            </AccentButton>
            <GhostButton disabled={!valid || !consentOk} onClick={() => onSend("email")}>📧 Send via Email Instead</GhostButton>
          </div>

          <p style={{ fontFamily: "sans-serif", fontSize: 11, color: C.dim, lineHeight: 1.6, marginTop: 18, textAlign: "center" }}>
            This sends a request — no payment is collected here.
            {COACH_NAME} confirms your session first, then sends a payment link.
          </p>
        </div>
      </div>
    </div>
  );
}

function PaymentScreen({ preselectedService, preselectedAmount, onBack }) {
  const [serviceId, setServiceId] = useState(preselectedService || SERVICES[0].id);
  const [amount, setAmount] = useState(preselectedAmount || "");
  const [copied, setCopied] = useState(false);
  const service = SERVICES.find((s) => s.id === serviceId);
  const validAmount = Number(amount) > 0;

  const upiUrl = `upi://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent(PAYEE_NAME)}${validAmount ? `&am=${Number(amount)}` : ""}&cu=INR&tn=${encodeURIComponent(service.name + " — " + BRAND_SHORT)}`;

  const handleCopy = () => {
    navigator.clipboard?.writeText(UPI_ID);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", padding: "40px 24px 80px" }}>
      <button onClick={onBack} style={{ background: "none", border: "none", color: C.dim, cursor: "pointer", fontFamily: "sans-serif", fontSize: 12, marginBottom: 20, padding: 0 }}>← Back</button>

      <div style={{ background: C.surface, border: `1px solid ${C.border}`, position: "relative", overflow: "hidden", boxShadow: "0 24px 64px rgba(0,0,0,0.6)" }}>
        <AccentBar color={C.lime} />
        <div style={{ padding: "36px 32px" }}>
          <div style={{ fontSize: 26, marginBottom: 8 }}>💳</div>
          <div style={{ fontFamily: "Georgia, serif", fontSize: 21, color: C.white, marginBottom: 6 }}>Complete Payment</div>
          <p style={{ fontFamily: "sans-serif", fontSize: 12.5, color: C.dim, marginBottom: 24 }}>
            ✅ Enter the amount {COACH_NAME} confirmed with you when your session was booked.
          </p>

          <label style={{ display: "block", fontFamily: "sans-serif", fontSize: 10.5, color: C.dim, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>
            Service
          </label>
          <select value={serviceId} onChange={(e) => setServiceId(e.target.value)} style={{
            width: "100%", boxSizing: "border-box", background: C.card, border: `1px solid ${C.border}`,
            color: C.white, fontFamily: "sans-serif", fontSize: 14, padding: "12px 14px", outline: "none", marginBottom: 20,
          }}>
            {SERVICES.map((s) => <option key={s.id} value={s.id}>{SERVICE_EMOJI[s.id]} {s.name}</option>)}
          </select>

          <label style={{ display: "block", fontFamily: "sans-serif", fontSize: 10.5, color: C.dim, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>
            Amount (₹) — as confirmed with {COACH_NAME}
          </label>
          <input
            type="number" inputMode="numeric" placeholder="e.g. 2500" value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{
              width: "100%", boxSizing: "border-box", background: C.card, border: `1px solid ${C.lime}`,
              color: C.white, fontFamily: "Georgia, serif", fontSize: 24, padding: "16px 18px", outline: "none", marginBottom: 24, textAlign: "center",
            }}
          />

          <AccentButton disabled={!validAmount} onClick={() => window.location.href = upiUrl} style={{ background: validAmount ? `linear-gradient(90deg, ${C.lime}, ${C.accent})` : undefined }}>
            💸 Pay via GPay / UPI →
          </AccentButton>

          <div style={{ marginTop: 20, paddingTop: 20, borderTop: `1px solid ${C.border}` }}>
            <p style={{ fontFamily: "sans-serif", fontSize: 11.5, color: C.dim, lineHeight: 1.7, marginBottom: 12 }}>
              📱 Button not opening a payment app? This mainly happens on iPhone.
              Pay manually to this UPI ID instead:
            </p>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <div style={{ flex: 1, background: C.card, border: `1px solid ${C.border}`, padding: "10px 14px", fontFamily: "sans-serif", fontSize: 13, color: C.white }}>
                {UPI_ID}
              </div>
              <button onClick={handleCopy} style={{
                background: "transparent", border: `1px solid ${C.lime}`, color: C.lime,
                fontFamily: "sans-serif", fontSize: 11, letterSpacing: "0.05em", padding: "10px 14px", cursor: "pointer",
              }}>{copied ? "✓ Copied" : "Copy"}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ConfirmationScreen({ onHome }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 100); return () => clearTimeout(t); }, []);
  return (
    <div style={{
      minHeight: "50vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      padding: "60px 24px", opacity: visible ? 1 : 0, transition: "opacity 0.6s ease", textAlign: "center",
    }}>
      <div style={{
        width: 72, height: 72, borderRadius: "50%", background: C.limeDim, border: `1px solid ${C.lime}`,
        display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24,
      }}>
        <span style={{ fontSize: 32 }}>🎉</span>
      </div>
      <div style={{ fontFamily: "Georgia, serif", fontSize: 21, color: C.white, marginBottom: 10 }}>
        Your request is ready to send.
      </div>
      <p style={{ fontFamily: "sans-serif", fontSize: 13.5, color: C.dim, lineHeight: 1.7, marginBottom: 32, maxWidth: 420 }}>
        A message opened on your device — send it to reach {COACH_NAME} directly.
        Nothing is stored automatically; only what you choose to send goes through.
      </p>
      <div style={{ width: 220 }}><GhostButton onClick={onHome}>🏠 Back to Home</GhostButton></div>
    </div>
  );
}

// ── Message building ─────────────────────────────────────────────────────────
function buildSummary(service, fields) {
  const lines = [`${service.cta} — ${BRAND_SHORT}`, ""];
  lines.push(`Name: ${fields.name || "-"}`);
  lines.push(`Email: ${fields.email || "-"}`);
  lines.push(`Phone: ${fields.phone || "-"}`);
  if (fields.city) lines.push(`City: ${fields.city}`);
  Object.keys(fields).forEach((k) => {
    if (["name", "email", "phone", "city", "consent"].includes(k)) return;
    if (fields[k]) lines.push(`${labelize(k)}: ${fields[k]}`);
  });
  return lines.join("\n");
}
function labelize(key) {
  return key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());
}

// ── Root ──────────────────────────────────────────────────────────────────────
function App() {
  const [screen, setScreen] = useState("home"); // home | services | quiz | recommendation | booking | payment | confirmation
  const [quizStep, setQuizStep] = useState(0);
  const [goal, setGoal] = useState(null);
  const [profile, setProfile] = useState({});
  const [selectedService, setSelectedService] = useState(null);
  const [fields, setFields] = useState({});
  const [payPreset, setPayPreset] = useState({ service: null, amount: null });
  const containerRef = useRef(null);
  const scrollTop = () => containerRef.current?.scrollTo({ top: 0, behavior: "smooth" });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const payParam = params.get("pay");
    if (payParam) {
      const svcParam = params.get("service");
      const amtParam = params.get("amount");
      setPayPreset({
        service: SERVICES.find((s) => s.id === svcParam) ? svcParam : null,
        amount: amtParam || null,
      });
      setScreen("payment");
    }
  }, []);

  const handleNav = (target) => {
    if (target === "whatsapp") {
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi ${COACH_NAME}, I'd like to know more about ${BRAND_NAME}.`)}`, "_blank");
      return;
    }
    if (target === "quiz") { setQuizStep(0); setGoal(null); setProfile({}); }
    setScreen(target);
    scrollTop();
  };

  const handleSelectService = (id) => {
    const svc = SERVICES.find((s) => s.id === id);
    setSelectedService(svc);
    setFields({});
    setScreen("booking");
    scrollTop();
  };

  const handleGoal = (g) => setGoal(g);
  const handleProfileChange = (key, value) => setProfile((p) => ({ ...p, [key]: value }));

  const canAdvanceQuiz = () => {
    if (quizStep === 0) return !!goal;
    if (quizStep === 1) return profile.name || true; // profile fields optional beyond goal
    return true;
  };

  const handleQuizNext = () => {
    if (quizStep === 0) { setQuizStep(1); scrollTop(); return; }
    const svc = SERVICES.find((s) => s.id === goal.service);
    setSelectedService(svc);
    setScreen("recommendation");
    scrollTop();
  };

  const handleSend = (channel) => {
    const summary = buildSummary(selectedService, fields);
    if (channel === "whatsapp") {
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(summary)}`, "_blank");
    } else {
      const subject = encodeURIComponent(`${selectedService.cta} — ${fields.name || ""}`);
      window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${encodeURIComponent(summary)}`;
    }
    setScreen("confirmation");
    scrollTop();
  };

  return (
    <div ref={containerRef} style={{ minHeight: "100vh", background: C.bg, fontFamily: "Georgia, serif", position: "relative", overflowY: "auto" }}>
      <Grain />
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 70, height: 3,
        background: `linear-gradient(90deg, ${C.accent} 0%, ${C.magenta} 33%, ${C.violet} 66%, ${C.lime} 100%)`,
      }} />

      <div style={{ position: "relative", zIndex: 1 }}>
        <NavBar onNav={handleNav} />

        {screen === "home" && <HomeScreen onNav={handleNav} onSelectService={handleSelectService} />}

        {screen === "quiz" && (
          <QuizScreen
            step={quizStep}
            goal={goal}
            profile={profile}
            onGoal={handleGoal}
            onProfileChange={handleProfileChange}
            onNext={handleQuizNext}
            onBack={() => setQuizStep(0)}
            canAdvance={canAdvanceQuiz()}
          />
        )}

        {screen === "recommendation" && selectedService && (
          <RecommendationScreen
            goal={goal}
            service={selectedService}
            onBook={() => { setFields({}); setScreen("booking"); scrollTop(); }}
            onWhatsapp={() => handleNav("whatsapp")}
          />
        )}

        {screen === "booking" && selectedService && (
          <BookingScreen
            service={selectedService}
            fields={fields}
            onChange={(k, v) => setFields((f) => ({ ...f, [k]: v }))}
            onSend={handleSend}
            onBack={() => setScreen("home")}
          />
        )}

        {screen === "payment" && (
          <PaymentScreen
            preselectedService={payPreset.service}
            preselectedAmount={payPreset.amount}
            onBack={() => setScreen("home")}
          />
        )}

        {screen === "confirmation" && <ConfirmationScreen onHome={() => handleNav("home")} />}

        <div style={{ borderTop: `1px solid ${C.border}`, padding: "28px 24px", textAlign: "center" }}>
          <div style={{ fontFamily: "sans-serif", fontSize: 10.5, color: C.dim, letterSpacing: "0.1em" }}>
            {BRAND_NAME} · {INSTAGRAM_HANDLE}
          </div>
        </div>
      </div>

      {screen === "home" && <PheAiFab onClick={() => handleNav("quiz")} />}
      {screen !== "booking" && screen !== "confirmation" && screen !== "payment" && (
        <WhatsAppFab onClick={() => handleNav("whatsapp")} />
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
