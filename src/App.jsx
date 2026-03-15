import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { 
  Users, Upload, Download, BarChart3, Briefcase, Award, Search, 
  ChevronDown, ChevronRight, X, Plus, Minus, FileText, Lightbulb,
  TrendingUp, AlertTriangle, CheckCircle, Star, Filter, Eye,
  UserPlus, Settings, Home, Layers, Target, Zap, BookOpen,
  PieChart, Activity, ArrowUpRight, ArrowDownRight, Clock,
  Cpu, Database, Brain, Code, Microscope, Stethoscope,
  Building2, Pill, FlaskConical, BarChart2, Grid3X3,
  Edit3, Trash2, Save, XCircle, ChevronLeft, Menu,
  Globe, Shield, Heart, Rocket, Package, GitBranch
} from "lucide-react";

// ─── Improzo Color Palette ───
const COLORS = {
  primary: "#0F4C81",      // Deep Improzo Blue
  primaryLight: "#1A6BB5",
  primaryDark: "#0A3560",
  accent: "#00B4D8",       // Bright Cyan accent
  accentSoft: "#90E0EF",
  success: "#2CB67D",
  warning: "#F59E0B",
  danger: "#EF4444",
  surface: "#F8FAFC",
  surfaceAlt: "#EEF2F7",
  card: "#FFFFFF",
  text: "#1E293B",
  textMuted: "#64748B",
  textLight: "#94A3B8",
  border: "#E2E8F0",
  borderLight: "#F1F5F9",
};

// ─── Skill vs Competency Definitions ───
const SKILL_CATEGORIES = {
  technical: { label: "Technical Skills", icon: Code, color: "#0F4C81", description: "Specific, measurable abilities in tools, technologies, and methodologies" },
  analytical: { label: "Analytical Skills", icon: Brain, color: "#7C3AED", description: "Data analysis, statistical modeling, and quantitative reasoning" },
  domain: { label: "Domain Knowledge", icon: Pill, color: "#059669", description: "Industry-specific expertise in pharma, biotech, and healthcare" },
  platform: { label: "Platform & Tools", icon: Database, color: "#D97706", description: "Proficiency with specific platforms, tools, and systems" },
};

const COMPETENCY_CATEGORIES = {
  leadership: { label: "Leadership", icon: Shield, color: "#DC2626", description: "Behavioral competencies: influencing, decision-making, team development" },
  communication: { label: "Communication", icon: Globe, color: "#2563EB", description: "Written, verbal, storytelling, stakeholder management" },
  strategic: { label: "Strategic Thinking", icon: Target, color: "#7C3AED", description: "Business acumen, vision-setting, long-term planning" },
  execution: { label: "Execution", icon: Rocket, color: "#059669", description: "Project delivery, agile practices, quality management" },
};

// ─── Pharma Commercial Tech Skills Master ───
const SKILLS_MASTER = [
  // Technical
  { id: "sk1", name: "Python", category: "technical", level: "advanced" },
  { id: "sk2", name: "R Programming", category: "technical", level: "advanced" },
  { id: "sk3", name: "SQL / Data Querying", category: "technical", level: "advanced" },
  { id: "sk4", name: "Spark / PySpark", category: "technical", level: "advanced" },
  { id: "sk5", name: "React / Frontend Dev", category: "technical", level: "advanced" },
  { id: "sk6", name: "Node.js / Backend Dev", category: "technical", level: "advanced" },
  { id: "sk7", name: "CI/CD & DevOps", category: "technical", level: "advanced" },
  { id: "sk8", name: "Cloud Architecture (AWS/Azure/GCP)", category: "technical", level: "advanced" },
  { id: "sk9", name: "API Design & Integration", category: "technical", level: "intermediate" },
  { id: "sk10", name: "Microservices Architecture", category: "technical", level: "advanced" },
  // Analytical
  { id: "sk11", name: "Machine Learning / AI", category: "analytical", level: "advanced" },
  { id: "sk12", name: "NLP / GenAI / LLMs", category: "analytical", level: "advanced" },
  { id: "sk13", name: "Statistical Modeling", category: "analytical", level: "advanced" },
  { id: "sk14", name: "Data Visualization (Tableau/Power BI)", category: "analytical", level: "intermediate" },
  { id: "sk15", name: "Predictive Analytics", category: "analytical", level: "advanced" },
  { id: "sk16", name: "Marketing Mix Modeling", category: "analytical", level: "advanced" },
  { id: "sk17", name: "Patient Analytics", category: "analytical", level: "advanced" },
  { id: "sk18", name: "Segmentation & Targeting", category: "analytical", level: "intermediate" },
  // Domain
  { id: "sk19", name: "Pharma Commercial Operations", category: "domain", level: "advanced" },
  { id: "sk20", name: "Field Force Effectiveness / SFE", category: "domain", level: "advanced" },
  { id: "sk21", name: "Incentive Compensation (IC)", category: "domain", level: "intermediate" },
  { id: "sk22", name: "Master Data Management (MDM)", category: "domain", level: "advanced" },
  { id: "sk23", name: "Regulatory & Compliance (GDPR/HIPAA)", category: "domain", level: "intermediate" },
  { id: "sk24", name: "Omnichannel Marketing", category: "domain", level: "intermediate" },
  { id: "sk25", name: "Market Access & HEOR", category: "domain", level: "advanced" },
  { id: "sk26", name: "KOL Management", category: "domain", level: "intermediate" },
  // Platform & Tools
  { id: "sk27", name: "Veeva CRM / Vault", category: "platform", level: "advanced" },
  { id: "sk28", name: "Salesforce Health Cloud", category: "platform", level: "advanced" },
  { id: "sk29", name: "Databricks / Lakehouse", category: "platform", level: "advanced" },
  { id: "sk30", name: "Snowflake", category: "platform", level: "advanced" },
  { id: "sk31", name: "IQVIA Platforms (Xponent/DDD)", category: "platform", level: "advanced" },
  { id: "sk32", name: "Airflow / Orchestration", category: "platform", level: "intermediate" },
  { id: "sk33", name: "Terraform / IaC", category: "platform", level: "intermediate" },
  { id: "sk34", name: "Docker / Kubernetes", category: "platform", level: "advanced" },
];

const COMPETENCIES_MASTER = [
  { id: "cp1", name: "Stakeholder Management", category: "leadership" },
  { id: "cp2", name: "Team Building & Mentoring", category: "leadership" },
  { id: "cp3", name: "Cross-functional Collaboration", category: "leadership" },
  { id: "cp4", name: "Executive Communication", category: "communication" },
  { id: "cp5", name: "Technical Documentation", category: "communication" },
  { id: "cp6", name: "Presentation & Storytelling", category: "communication" },
  { id: "cp7", name: "Business Case Development", category: "strategic" },
  { id: "cp8", name: "Vendor & Partner Management", category: "strategic" },
  { id: "cp9", name: "Roadmap Planning", category: "strategic" },
  { id: "cp10", name: "Agile / Scrum Delivery", category: "execution" },
  { id: "cp11", name: "Quality Assurance Mindset", category: "execution" },
  { id: "cp12", name: "Problem Solving & Root Cause Analysis", category: "execution" },
];

// ─── Roles at Improzo ───
const ROLES = [
  { id: "r1", name: "Solution Architect", workstream: "Commercial Technology", level: "Senior" },
  { id: "r2", name: "Data Engineer", workstream: "Commercial Technology", level: "Mid" },
  { id: "r3", name: "Full Stack Developer", workstream: "Commercial Technology", level: "Mid" },
  { id: "r4", name: "Advanced Analytics Lead", workstream: "Commercial Analytics", level: "Senior" },
  { id: "r5", name: "Data Scientist", workstream: "Commercial Analytics", level: "Mid" },
  { id: "r6", name: "ML Engineer", workstream: "Commercial Analytics", level: "Mid" },
  { id: "r7", name: "Veeva Platform Specialist", workstream: "Commercial Technology", level: "Mid" },
  { id: "r8", name: "CRM Consultant", workstream: "Commercial Technology", level: "Junior" },
  { id: "r9", name: "BI Developer", workstream: "Commercial Analytics", level: "Junior" },
  { id: "r10", name: "QA Engineer", workstream: "Commercial Technology", level: "Junior" },
  { id: "r11", name: "DevOps Engineer", workstream: "Commercial Technology", level: "Mid" },
  { id: "r12", name: "Product Manager", workstream: "Commercial Technology", level: "Senior" },
];

const WORKSTREAMS = [
  { id: "ws1", name: "Commercial Technology", active: true },
  { id: "ws2", name: "Commercial Analytics", active: true },
  { id: "ws3", name: "Supply Chain (Future)", active: false },
  { id: "ws4", name: "R&D / Clinical (Future)", active: false },
];

// ─── Synthetic People Data ───
const firstNames = ["Arjun","Priya","Ravi","Sneha","Karthik","Ananya","Vikram","Divya","Suresh","Meera","Aditya","Neha","Rohan","Kavitha","Sanjay","Pooja","Deepak","Anjali","Manish","Shreya","Rahul","Lakshmi","Amit","Swati","Nikhil","Pallavi","Gaurav","Ritika","Varun","Nandini"];
const lastNames = ["Sharma","Patel","Reddy","Iyer","Gupta","Nair","Joshi","Kumar","Verma","Rao","Singh","Menon","Agarwal","Pillai","Das","Hegde","Chatterjee","Bhat","Deshmukh","Srinivasan"];

function generatePeople(count) {
  const people = [];
  const expLevels = [
    { range: [1,3], title: "Junior", count: Math.floor(count*0.25) },
    { range: [4,8], title: "Mid", count: Math.floor(count*0.40) },
    { range: [9,15], title: "Senior", count: Math.floor(count*0.25) },
    { range: [16,25], title: "Principal", count: Math.floor(count*0.10) },
  ];
  
  let id = 1;
  for (const level of expLevels) {
    for (let i = 0; i < level.count; i++) {
      const fn = firstNames[Math.floor(Math.random()*firstNames.length)];
      const ln = lastNames[Math.floor(Math.random()*lastNames.length)];
      const yoe = level.range[0] + Math.floor(Math.random()*(level.range[1]-level.range[0]+1));
      const role = ROLES[Math.floor(Math.random()*ROLES.length)];
      
      // Assign skills (max 3 primary)
      const shuffledSkills = [...SKILLS_MASTER].sort(()=>Math.random()-0.5);
      const primarySkills = shuffledSkills.slice(0,3).map(s=>({...s, tier: "primary", proficiency: 3+Math.floor(Math.random()*3)}));
      const secondarySkills = shuffledSkills.slice(3,3+2+Math.floor(Math.random()*3)).map(s=>({...s, tier: "secondary", proficiency: 2+Math.floor(Math.random()*3)}));
      const tertiarySkills = shuffledSkills.slice(8,8+1+Math.floor(Math.random()*3)).map(s=>({...s, tier: "tertiary", proficiency: 1+Math.floor(Math.random()*2)}));
      
      const shuffledComps = [...COMPETENCIES_MASTER].sort(()=>Math.random()-0.5);
      const competencies = shuffledComps.slice(0,3+Math.floor(Math.random()*4)).map(c=>({...c, rating: 2+Math.floor(Math.random()*4)}));
      
      const certs = [];
      const certPool = ["AWS Solutions Architect","Azure Data Engineer","Databricks Lakehouse","Google Cloud ML","Veeva Certified Admin","PMP","CSM","AIGP","Tableau Desktop Specialist","Snowflake SnowPro","Terraform Associate","Kubernetes CKA"];
      const numCerts = Math.floor(Math.random()*4);
      const shuffledCerts = certPool.sort(()=>Math.random()-0.5);
      for(let c=0;c<numCerts;c++) {
        certs.push({ name: shuffledCerts[c], year: 2020+Math.floor(Math.random()*6), issuer: ["AWS","Microsoft","Databricks","Google","Veeva","PMI","Scrum Alliance","IAPP","Tableau","Snowflake","HashiCorp","CNCF"][c%12] });
      }
      
      people.push({
        id: `EMP${String(id).padStart(3,'0')}`,
        firstName: fn,
        lastName: ln,
        email: `${fn.toLowerCase()}.${ln.toLowerCase()}@improzo.com`,
        role: role,
        yearsOfExperience: yoe,
        level: level.title,
        joinDate: `${2023+Math.floor(Math.random()*3)}-${String(1+Math.floor(Math.random()*12)).padStart(2,'0')}-${String(1+Math.floor(Math.random()*28)).padStart(2,'0')}`,
        primarySkills,
        secondarySkills,
        tertiarySkills,
        competencies,
        certifications: certs,
        resumeUploaded: Math.random() > 0.2,
        lastUpdated: `2025-${String(1+Math.floor(Math.random()*12)).padStart(2,'0')}-${String(1+Math.floor(Math.random()*28)).padStart(2,'0')}`,
        avatarColor: [`#0F4C81`,`#7C3AED`,`#059669`,`#D97706`,`#DC2626`,`#2563EB`][Math.floor(Math.random()*6)],
      });
      id++;
    }
  }
  return people;
}

// ─── Innovation Projects ───
function generateProjects() {
  return [
    { id: "PRJ001", title: "AI-Powered HCP Engagement Scoring", description: "Build an ML model to predict HCP engagement likelihood using multi-channel interaction data. Integrate with Veeva CRM for real-time scoring.", requiredSkills: ["sk11","sk12","sk27","sk19"], requiredCompetencies: ["cp7","cp12"], status: "active", hoursPerWeek: 5, spots: 3, filled: 1, postedBy: "Tirth Ray", postedDate: "2026-03-10", tags: ["AI/ML","CRM","Innovation"] },
    { id: "PRJ002", title: "GenAI Field Force Copilot", description: "Develop an LLM-based assistant for field reps that summarizes HCP profiles, suggests talking points, and auto-generates call notes.", requiredSkills: ["sk12","sk6","sk9","sk20"], requiredCompetencies: ["cp5","cp10"], status: "active", hoursPerWeek: 8, spots: 4, filled: 2, postedBy: "Tirth Ray", postedDate: "2026-03-12", tags: ["GenAI","SFE","Agentic"] },
    { id: "PRJ003", title: "Real-World Evidence Dashboard", description: "Create an interactive dashboard combining IQVIA claims data with internal commercial metrics to surface RWE insights for brand teams.", requiredSkills: ["sk14","sk3","sk31","sk25"], requiredCompetencies: ["cp6","cp9"], status: "active", hoursPerWeek: 4, spots: 2, filled: 0, postedBy: "Analytics Lead", postedDate: "2026-03-08", tags: ["RWE","BI","Dashboard"] },
    { id: "PRJ004", title: "Automated IC Calculation Engine", description: "Rebuild the incentive compensation pipeline using Databricks and dbt, replacing legacy SAS-based calculations with a modern, auditable framework.", requiredSkills: ["sk29","sk3","sk21","sk7"], requiredCompetencies: ["cp11","cp12"], status: "planned", hoursPerWeek: 6, spots: 3, filled: 0, postedBy: "Data Engineering Lead", postedDate: "2026-03-14", tags: ["Data Engineering","IC","Modernization"] },
    { id: "PRJ005", title: "Omnichannel Attribution Model", description: "Build a multi-touch attribution model to measure the impact of email, rep visits, webinars, and digital ads on prescribing behavior.", requiredSkills: ["sk16","sk13","sk15","sk24"], requiredCompetencies: ["cp7","cp6"], status: "active", hoursPerWeek: 5, spots: 2, filled: 1, postedBy: "Analytics Lead", postedDate: "2026-03-05", tags: ["Analytics","Marketing","Attribution"] },
    { id: "PRJ006", title: "MDM Data Quality Sentinel", description: "An agentic data observability platform that continuously monitors master data quality across HCP, HCO, and product hierarchies.", requiredSkills: ["sk22","sk1","sk32","sk8"], requiredCompetencies: ["cp11","cp3"], status: "planned", hoursPerWeek: 7, spots: 3, filled: 0, postedBy: "Tirth Ray", postedDate: "2026-03-13", tags: ["MDM","Data Quality","Agentic AI"] },
  ];
}

const PEOPLE = generatePeople(48);
const PROJECTS = generateProjects();

// ─── Proficiency Scale ───
const PROFICIENCY = {
  1: { label: "Awareness", color: "#94A3B8" },
  2: { label: "Beginner", color: "#60A5FA" },
  3: { label: "Intermediate", color: "#34D399" },
  4: { label: "Advanced", color: "#FBBF24" },
  5: { label: "Expert", color: "#F97316" },
};

// ─── Utility Components ───
function Badge({ children, variant = "default", size = "sm" }) {
  const styles = {
    default: { bg: COLORS.surfaceAlt, color: COLORS.text, border: COLORS.border },
    primary: { bg: "#E0F2FE", color: COLORS.primary, border: "#BAE6FD" },
    success: { bg: "#D1FAE5", color: "#065F46", border: "#A7F3D0" },
    warning: { bg: "#FEF3C7", color: "#92400E", border: "#FDE68A" },
    danger: { bg: "#FEE2E2", color: "#991B1B", border: "#FECACA" },
    accent: { bg: "#E0F7FA", color: "#006064", border: "#B2EBF2" },
  };
  const s = styles[variant];
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      padding: size === "xs" ? "1px 6px" : "2px 10px",
      fontSize: size === "xs" ? 10 : 11,
      fontWeight: 600, borderRadius: 99,
      background: s.bg, color: s.color, border: `1px solid ${s.border}`,
      letterSpacing: 0.3, textTransform: "uppercase", whiteSpace: "nowrap",
    }}>{children}</span>
  );
}

function ProficiencyDots({ value, max = 5 }) {
  return (
    <div style={{ display: "flex", gap: 3 }}>
      {Array.from({ length: max }, (_, i) => (
        <div key={i} style={{
          width: 8, height: 8, borderRadius: "50%",
          background: i < value ? PROFICIENCY[value]?.color || COLORS.accent : COLORS.border,
          transition: "all 0.2s",
        }} />
      ))}
    </div>
  );
}

function StatCard({ icon: Icon, label, value, subtext, trend, color = COLORS.primary }) {
  return (
    <div style={{
      background: COLORS.card, borderRadius: 12, padding: "18px 20px",
      border: `1px solid ${COLORS.border}`, position: "relative", overflow: "hidden",
      flex: "1 1 200px", minWidth: 180,
    }}>
      <div style={{ position: "absolute", top: -10, right: -10, opacity: 0.06 }}>
        <Icon size={80} color={color} />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: `${color}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon size={16} color={color} />
        </div>
        <span style={{ fontSize: 11, color: COLORS.textMuted, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</span>
      </div>
      <div style={{ fontSize: 28, fontWeight: 700, color: COLORS.text, lineHeight: 1.1 }}>{value}</div>
      {subtext && <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 4 }}>{subtext}</div>}
      {trend && (
        <div style={{ display: "flex", alignItems: "center", gap: 3, marginTop: 6, fontSize: 11, fontWeight: 600, color: trend > 0 ? COLORS.success : COLORS.danger }}>
          {trend > 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          {Math.abs(trend)}% vs last quarter
        </div>
      )}
    </div>
  );
}

// ─── Simple Bar Chart ───
function BarChartSimple({ data, height = 200, barColor = COLORS.primary }) {
  const max = Math.max(...data.map(d => d.value), 1);
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height, padding: "0 4px" }}>
      {data.map((d, i) => (
        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, height: "100%" }}>
          <span style={{ fontSize: 10, fontWeight: 600, color: COLORS.text }}>{d.value}</span>
          <div style={{ flex: 1, width: "100%", display: "flex", alignItems: "flex-end" }}>
            <div style={{
              width: "100%", borderRadius: "4px 4px 0 0",
              height: `${(d.value / max) * 100}%`,
              background: d.color || barColor,
              minHeight: 4, transition: "height 0.5s ease",
            }} />
          </div>
          <span style={{ fontSize: 9, color: COLORS.textMuted, textAlign: "center", lineHeight: 1.2, maxWidth: 60, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{d.label}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Donut Chart ───
function DonutChart({ data, size = 140, thickness = 24 }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  let cum = 0;
  const r = (size - thickness) / 2;
  const circumference = 2 * Math.PI * r;
  
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {data.map((d, i) => {
          const pct = d.value / total;
          const offset = cum * circumference;
          cum += pct;
          return (
            <circle key={i} cx={size/2} cy={size/2} r={r}
              fill="none" stroke={d.color} strokeWidth={thickness}
              strokeDasharray={`${pct * circumference} ${circumference}`}
              strokeDashoffset={-offset}
              transform={`rotate(-90 ${size/2} ${size/2})`}
              style={{ transition: "all 0.5s" }}
            />
          );
        })}
      </svg>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", textAlign: "center" }}>
        <div style={{ fontSize: 22, fontWeight: 700, color: COLORS.text }}>{total}</div>
        <div style={{ fontSize: 9, color: COLORS.textMuted, textTransform: "uppercase" }}>Total</div>
      </div>
    </div>
  );
}

// ─── Navigation ───
const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "people", label: "People", icon: Users },
  { id: "skills", label: "Skill Matrix", icon: Grid3X3 },
  { id: "projects", label: "Innovation Lab", icon: Lightbulb },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "admin", label: "Administration", icon: Settings },
];

// ════════════════════════════════════════
// MAIN APP
// ════════════════════════════════════════
export default function App() {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [showAddPerson, setShowAddPerson] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterLevel, setFilterLevel] = useState("all");
  const [people, setPeople] = useState(PEOPLE);
  const [projects, setProjects] = useState(PROJECTS);
  const [notification, setNotification] = useState(null);
  const [showBulkModal, setShowBulkModal] = useState(null); // "upload" | "download" | null
  const [showSkillDefinitions, setShowSkillDefinitions] = useState(false);

  const notify = (msg, type = "success") => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // ─── Computed Analytics ───
  const analytics = useMemo(() => {
    const allSkills = people.flatMap(p => [...p.primarySkills, ...p.secondarySkills, ...p.tertiarySkills]);
    const skillFreq = {};
    allSkills.forEach(s => { skillFreq[s.name] = (skillFreq[s.name]||0) + 1; });
    
    const skillProfAvg = {};
    allSkills.forEach(s => {
      if (!skillProfAvg[s.name]) skillProfAvg[s.name] = { sum: 0, count: 0 };
      skillProfAvg[s.name].sum += s.proficiency;
      skillProfAvg[s.name].count++;
    });
    
    const catDistribution = {};
    allSkills.forEach(s => { catDistribution[s.category] = (catDistribution[s.category]||0) + 1; });
    
    const levelDist = {};
    people.forEach(p => { levelDist[p.level] = (levelDist[p.level]||0) + 1; });
    
    const certCount = people.reduce((s,p) => s + p.certifications.length, 0);
    const resumeCount = people.filter(p => p.resumeUploaded).length;
    
    // Gap analysis: skills with low average proficiency but high demand
    const gaps = Object.entries(skillProfAvg)
      .map(([name, d]) => ({ name, avg: d.sum/d.count, count: d.count }))
      .filter(s => s.avg < 3 && s.count >= 3)
      .sort((a,b) => a.avg - b.avg)
      .slice(0, 8);
    
    // Top skills by frequency
    const topSkills = Object.entries(skillFreq)
      .sort((a,b) => b[1] - a[1])
      .slice(0, 10)
      .map(([name, count]) => ({ name, count }));
    
    // Rare skills (potential gaps)
    const rareSkills = Object.entries(skillFreq)
      .sort((a,b) => a[1] - b[1])
      .slice(0, 6)
      .map(([name, count]) => ({ name, count }));
    
    return { skillFreq, skillProfAvg, catDistribution, levelDist, certCount, resumeCount, gaps, topSkills, rareSkills };
  }, [people]);

  const filteredPeople = useMemo(() => {
    return people.filter(p => {
      const q = searchQuery.toLowerCase();
      const matchSearch = !q || 
        `${p.firstName} ${p.lastName}`.toLowerCase().includes(q) ||
        p.role.name.toLowerCase().includes(q) ||
        [...p.primarySkills,...p.secondarySkills,...p.tertiarySkills].some(s => s.name.toLowerCase().includes(q));
      const matchRole = filterRole === "all" || p.role.id === filterRole;
      const matchLevel = filterLevel === "all" || p.level === filterLevel;
      return matchSearch && matchRole && matchLevel;
    });
  }, [people, searchQuery, filterRole, filterLevel]);

  // ─── Bulk Operations ───
  const handleBulkDownload = (type) => {
    let csv = "";
    if (type === "people") {
      csv = "ID,Name,Email,Role,Workstream,Level,YoE,Primary Skills,Secondary Skills,Tertiary Skills,Certifications,Resume Uploaded\n";
      people.forEach(p => {
        csv += `${p.id},"${p.firstName} ${p.lastName}",${p.email},"${p.role.name}","${p.role.workstream}",${p.level},${p.yearsOfExperience},"${p.primarySkills.map(s=>s.name).join('; ')}","${p.secondarySkills.map(s=>s.name).join('; ')}","${p.tertiarySkills.map(s=>s.name).join('; ')}","${p.certifications.map(c=>c.name).join('; ')}",${p.resumeUploaded}\n`;
      });
    } else if (type === "skills") {
      csv = "ID,Skill Name,Category,Level\n";
      SKILLS_MASTER.forEach(s => { csv += `${s.id},"${s.name}",${s.category},${s.level}\n`; });
    } else if (type === "projects") {
      csv = "ID,Title,Status,Hours/Week,Spots,Filled,Required Skills,Tags\n";
      projects.forEach(p => {
        const skillNames = p.requiredSkills.map(sid => SKILLS_MASTER.find(s=>s.id===sid)?.name||sid).join('; ');
        csv += `${p.id},"${p.title}",${p.status},${p.hoursPerWeek},${p.spots},${p.filled},"${skillNames}","${p.tags.join('; ')}"\n`;
      });
    }
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `improzo_${type}_export.csv`; a.click();
    URL.revokeObjectURL(url);
    notify(`${type} data exported successfully`);
  };

  // ─── Project Matching ───
  const getProjectMatches = (project) => {
    return people.map(person => {
      const allSkills = [...person.primarySkills, ...person.secondarySkills, ...person.tertiarySkills];
      const skillIds = allSkills.map(s => s.id);
      const matched = project.requiredSkills.filter(rs => skillIds.includes(rs));
      const score = matched.length / project.requiredSkills.length;
      return { person, score, matchedSkills: matched.length, totalRequired: project.requiredSkills.length };
    }).filter(m => m.score > 0).sort((a,b) => b.score - a.score).slice(0, 8);
  };

  // ════════════════════════════════
  // RENDER SECTIONS
  // ════════════════════════════════

  const renderDashboard = () => (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: COLORS.text, margin: 0 }}>Welcome back, Tirth</h2>
        <p style={{ fontSize: 13, color: COLORS.textMuted, margin: "4px 0 0" }}>Improzo Skill Matrix Platform — Commercial Technology & Analytics</p>
      </div>
      
      {/* Stats Row */}
      <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 24 }}>
        <StatCard icon={Users} label="Team Members" value={people.length} subtext={`${analytics.resumeCount} resumes uploaded`} trend={12} color={COLORS.primary} />
        <StatCard icon={Award} label="Certifications" value={analytics.certCount} subtext="Across all team members" trend={8} color="#7C3AED" />
        <StatCard icon={Lightbulb} label="Innovation Projects" value={projects.length} subtext={`${projects.filter(p=>p.status==="active").length} active`} color={COLORS.accent} />
        <StatCard icon={AlertTriangle} label="Skill Gaps" value={analytics.gaps.length} subtext="Below proficiency threshold" color={COLORS.danger} />
      </div>

      {/* Two Column Layout */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
        {/* Skill Distribution */}
        <div style={{ background: COLORS.card, borderRadius: 12, padding: 20, border: `1px solid ${COLORS.border}` }}>
          <h3 style={{ fontSize: 13, fontWeight: 700, color: COLORS.text, margin: "0 0 16px", display: "flex", alignItems: "center", gap: 8 }}>
            <PieChart size={15} color={COLORS.primary} /> Skill Category Distribution
          </h3>
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <DonutChart data={[
              { value: analytics.catDistribution.technical || 0, color: "#0F4C81" },
              { value: analytics.catDistribution.analytical || 0, color: "#7C3AED" },
              { value: analytics.catDistribution.domain || 0, color: "#059669" },
              { value: analytics.catDistribution.platform || 0, color: "#D97706" },
            ]} />
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {Object.entries(SKILL_CATEGORIES).map(([key, cat]) => (
                <div key={key} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 3, background: cat.color }} />
                  <span style={{ fontSize: 11, color: COLORS.textMuted }}>{cat.label}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: COLORS.text, marginLeft: "auto" }}>{analytics.catDistribution[key] || 0}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Level Distribution */}
        <div style={{ background: COLORS.card, borderRadius: 12, padding: 20, border: `1px solid ${COLORS.border}` }}>
          <h3 style={{ fontSize: 13, fontWeight: 700, color: COLORS.text, margin: "0 0 16px", display: "flex", alignItems: "center", gap: 8 }}>
            <Activity size={15} color={COLORS.primary} /> Experience Level Distribution
          </h3>
          <BarChartSimple height={160} data={[
            { label: "Junior", value: analytics.levelDist["Junior"] || 0, color: "#60A5FA" },
            { label: "Mid", value: analytics.levelDist["Mid"] || 0, color: "#34D399" },
            { label: "Senior", value: analytics.levelDist["Senior"] || 0, color: "#FBBF24" },
            { label: "Principal", value: analytics.levelDist["Principal"] || 0, color: "#F97316" },
          ]} />
        </div>
      </div>

      {/* Top Skills + Gaps */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ background: COLORS.card, borderRadius: 12, padding: 20, border: `1px solid ${COLORS.border}` }}>
          <h3 style={{ fontSize: 13, fontWeight: 700, color: COLORS.text, margin: "0 0 14px", display: "flex", alignItems: "center", gap: 8 }}>
            <TrendingUp size={15} color={COLORS.success} /> Top 10 Skills by Coverage
          </h3>
          {analytics.topSkills.map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 0", borderBottom: i < 9 ? `1px solid ${COLORS.borderLight}` : "none" }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: COLORS.textLight, width: 18 }}>#{i+1}</span>
              <span style={{ fontSize: 12, color: COLORS.text, flex: 1 }}>{s.name}</span>
              <div style={{ width: 60, height: 6, borderRadius: 3, background: COLORS.surfaceAlt, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${(s.count/people.length)*100}%`, background: COLORS.success, borderRadius: 3 }} />
              </div>
              <span style={{ fontSize: 10, fontWeight: 600, color: COLORS.textMuted, width: 24, textAlign: "right" }}>{s.count}</span>
            </div>
          ))}
        </div>
        
        <div style={{ background: COLORS.card, borderRadius: 12, padding: 20, border: `1px solid ${COLORS.border}` }}>
          <h3 style={{ fontSize: 13, fontWeight: 700, color: COLORS.text, margin: "0 0 14px", display: "flex", alignItems: "center", gap: 8 }}>
            <AlertTriangle size={15} color={COLORS.danger} /> Skill Gaps (Low Proficiency)
          </h3>
          {analytics.gaps.length === 0 ? (
            <div style={{ padding: 20, textAlign: "center", color: COLORS.textMuted, fontSize: 12 }}>No critical gaps detected</div>
          ) : analytics.gaps.map((g, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", borderBottom: i < analytics.gaps.length-1 ? `1px solid ${COLORS.borderLight}` : "none" }}>
              <AlertTriangle size={12} color={COLORS.warning} />
              <span style={{ fontSize: 12, color: COLORS.text, flex: 1 }}>{g.name}</span>
              <span style={{ fontSize: 10, color: COLORS.danger, fontWeight: 600 }}>Avg: {g.avg.toFixed(1)}/5</span>
              <span style={{ fontSize: 10, color: COLORS.textMuted }}>{g.count} people</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ─── PEOPLE VIEW ───
  const renderPeople = () => (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: COLORS.text, margin: 0 }}>Team Directory</h2>
          <p style={{ fontSize: 12, color: COLORS.textMuted, margin: "2px 0 0" }}>{filteredPeople.length} of {people.length} members</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => setShowBulkModal("upload")} style={{ ...btnStyle, background: COLORS.surfaceAlt, color: COLORS.text }}>
            <Upload size={13} /> Bulk Upload
          </button>
          <button onClick={() => handleBulkDownload("people")} style={{ ...btnStyle, background: COLORS.surfaceAlt, color: COLORS.text }}>
            <Download size={13} /> Export CSV
          </button>
          <button onClick={() => setShowAddPerson(true)} style={{ ...btnStyle, background: COLORS.primary, color: "#fff" }}>
            <UserPlus size={13} /> Add Person
          </button>
        </div>
      </div>

      {/* Search & Filters */}
      <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
        <div style={{ flex: 1, position: "relative" }}>
          <Search size={14} style={{ position: "absolute", left: 10, top: 9, color: COLORS.textMuted }} />
          <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search by name, role, or skill..."
            style={{ width: "100%", padding: "8px 8px 8px 32px", borderRadius: 8, border: `1px solid ${COLORS.border}`, fontSize: 12, outline: "none", background: COLORS.card, boxSizing: "border-box" }} />
        </div>
        <select value={filterRole} onChange={e => setFilterRole(e.target.value)} style={{ ...selectStyle }}>
          <option value="all">All Roles</option>
          {ROLES.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
        </select>
        <select value={filterLevel} onChange={e => setFilterLevel(e.target.value)} style={{ ...selectStyle }}>
          <option value="all">All Levels</option>
          {["Junior","Mid","Senior","Principal"].map(l => <option key={l} value={l}>{l}</option>)}
        </select>
      </div>

      {/* People Table */}
      <div style={{ background: COLORS.card, borderRadius: 12, border: `1px solid ${COLORS.border}`, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
            <thead>
              <tr style={{ background: COLORS.surfaceAlt }}>
                {["Name","Role","Level","YoE","Primary Skills","Certs","Resume","Actions"].map(h => (
                  <th key={h} style={{ padding: "10px 12px", textAlign: "left", fontWeight: 700, color: COLORS.textMuted, fontSize: 10, textTransform: "uppercase", letterSpacing: 0.5, borderBottom: `1px solid ${COLORS.border}` }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredPeople.slice(0, 20).map(p => (
                <tr key={p.id} style={{ borderBottom: `1px solid ${COLORS.borderLight}`, cursor: "pointer" }} onClick={() => setSelectedPerson(p)}
                  onMouseEnter={e => e.currentTarget.style.background = COLORS.surfaceAlt}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <td style={{ padding: "10px 12px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 30, height: 30, borderRadius: "50%", background: p.avatarColor, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 11, fontWeight: 700 }}>
                        {p.firstName[0]}{p.lastName[0]}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, color: COLORS.text }}>{p.firstName} {p.lastName}</div>
                        <div style={{ fontSize: 10, color: COLORS.textMuted }}>{p.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "10px 12px", color: COLORS.text }}>{p.role.name}</td>
                  <td style={{ padding: "10px 12px" }}><Badge variant={p.level==="Senior"?"warning":p.level==="Principal"?"danger":p.level==="Mid"?"success":"primary"} size="xs">{p.level}</Badge></td>
                  <td style={{ padding: "10px 12px", color: COLORS.text, fontWeight: 600 }}>{p.yearsOfExperience}</td>
                  <td style={{ padding: "10px 12px" }}>
                    <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                      {p.primarySkills.map(s => <Badge key={s.id} variant="primary" size="xs">{s.name}</Badge>)}
                    </div>
                  </td>
                  <td style={{ padding: "10px 12px", fontWeight: 600, color: COLORS.text }}>{p.certifications.length}</td>
                  <td style={{ padding: "10px 12px" }}>
                    {p.resumeUploaded ? <CheckCircle size={14} color={COLORS.success} /> : <XCircle size={14} color={COLORS.textLight} />}
                  </td>
                  <td style={{ padding: "10px 12px" }}>
                    <button onClick={(e) => { e.stopPropagation(); setSelectedPerson(p); }} style={{ background: "none", border: "none", cursor: "pointer", color: COLORS.primary, padding: 4 }}>
                      <Eye size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredPeople.length > 20 && (
          <div style={{ padding: 12, textAlign: "center", fontSize: 11, color: COLORS.textMuted, borderTop: `1px solid ${COLORS.border}` }}>
            Showing 20 of {filteredPeople.length} results
          </div>
        )}
      </div>
    </div>
  );

  // ─── PERSON DETAIL MODAL ───
  const renderPersonModal = () => {
    if (!selectedPerson) return null;
    const p = selectedPerson;
    return (
      <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 1000, display: "flex", justifyContent: "center", alignItems: "flex-start", paddingTop: 40, overflowY: "auto" }}
        onClick={() => setSelectedPerson(null)}>
        <div style={{ background: COLORS.card, borderRadius: 16, width: 700, maxWidth: "95vw", maxHeight: "85vh", overflow: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}
          onClick={e => e.stopPropagation()}>
          {/* Header */}
          <div style={{ padding: "24px 28px 16px", borderBottom: `1px solid ${COLORS.border}`, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
              <div style={{ width: 48, height: 48, borderRadius: "50%", background: p.avatarColor, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 18, fontWeight: 700 }}>
                {p.firstName[0]}{p.lastName[0]}
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: COLORS.text }}>{p.firstName} {p.lastName}</h3>
                <div style={{ fontSize: 12, color: COLORS.textMuted }}>{p.role.name} · {p.role.workstream}</div>
                <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
                  <Badge variant={p.level==="Senior"?"warning":p.level==="Principal"?"danger":"success"}>{p.level}</Badge>
                  <Badge variant="accent">{p.yearsOfExperience} yrs exp</Badge>
                  {p.resumeUploaded && <Badge variant="success">Resume ✓</Badge>}
                </div>
              </div>
            </div>
            <button onClick={() => setSelectedPerson(null)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}><X size={18} color={COLORS.textMuted} /></button>
          </div>
          
          {/* Skills */}
          <div style={{ padding: "16px 28px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.text }}>Skills</div>
              <span style={{ fontSize: 10, color: COLORS.textMuted }}>(Max 3 Primary — Governance Enforced)</span>
            </div>
            
            {[
              { label: "Primary", skills: p.primarySkills, color: "#0F4C81", bg: "#E0F2FE" },
              { label: "Secondary", skills: p.secondarySkills, color: "#7C3AED", bg: "#EDE9FE" },
              { label: "Tertiary", skills: p.tertiarySkills, color: "#059669", bg: "#D1FAE5" },
            ].map(tier => (
              <div key={tier.label} style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: tier.color, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>{tier.label}</div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {tier.skills.map(s => (
                    <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 10px", borderRadius: 8, background: tier.bg, border: `1px solid ${tier.color}20` }}>
                      <span style={{ fontSize: 11, fontWeight: 600, color: tier.color }}>{s.name}</span>
                      <ProficiencyDots value={s.proficiency} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Competencies */}
          <div style={{ padding: "0 28px 16px" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.text, marginBottom: 8 }}>Competencies</div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {p.competencies.map(c => (
                <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 10px", borderRadius: 8, background: COLORS.surfaceAlt, border: `1px solid ${COLORS.border}` }}>
                  <span style={{ fontSize: 11, color: COLORS.text }}>{c.name}</span>
                  <ProficiencyDots value={c.rating} />
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          {p.certifications.length > 0 && (
            <div style={{ padding: "0 28px 20px" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.text, marginBottom: 8 }}>Certifications</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {p.certifications.map((c, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 8, background: "#FFF7ED", border: "1px solid #FED7AA" }}>
                    <Award size={12} color="#D97706" />
                    <span style={{ fontSize: 11, fontWeight: 600, color: "#92400E" }}>{c.name}</span>
                    <span style={{ fontSize: 9, color: "#B45309" }}>{c.year}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // ─── SKILL MATRIX VIEW ───
  const renderSkillMatrix = () => {
    const matrixPeople = filteredPeople.slice(0, 15);
    const displaySkills = SKILLS_MASTER.slice(0, 12);
    
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: COLORS.text, margin: 0 }}>Skill Matrix</h2>
            <p style={{ fontSize: 12, color: COLORS.textMuted, margin: "2px 0 0" }}>Heatmap view of skills across the team</p>
          </div>
          <button onClick={() => setShowSkillDefinitions(true)} style={{ ...btnStyle, background: COLORS.surfaceAlt, color: COLORS.text }}>
            <BookOpen size={13} /> Skills vs Competencies Guide
          </button>
        </div>

        {/* Definitions Modal */}
        {showSkillDefinitions && (
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 1000, display: "flex", justifyContent: "center", alignItems: "center" }}
            onClick={() => setShowSkillDefinitions(false)}>
            <div style={{ background: COLORS.card, borderRadius: 16, width: 600, maxWidth: "90vw", padding: 28, boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}
              onClick={e => e.stopPropagation()}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: COLORS.text }}>Skills vs Competencies</h3>
                <button onClick={() => setShowSkillDefinitions(false)} style={{ background: "none", border: "none", cursor: "pointer" }}><X size={18} /></button>
              </div>
              
              <div style={{ background: "#E0F2FE", borderRadius: 12, padding: 16, marginBottom: 16, border: "1px solid #BAE6FD" }}>
                <h4 style={{ margin: "0 0 8px", fontSize: 14, color: COLORS.primary, display: "flex", alignItems: "center", gap: 8 }}>
                  <Code size={16} /> Skills — "What you CAN DO"
                </h4>
                <p style={{ margin: 0, fontSize: 12, color: "#1E40AF", lineHeight: 1.6 }}>
                  Skills are specific, teachable, measurable abilities. They are acquired through training, practice, and experience. Examples: Python programming, SQL querying, Veeva CRM configuration. Skills are rated on a 1–5 proficiency scale from Awareness to Expert.
                </p>
              </div>
              
              <div style={{ background: "#FDF4FF", borderRadius: 12, padding: 16, marginBottom: 16, border: "1px solid #E9D5FF" }}>
                <h4 style={{ margin: "0 0 8px", fontSize: 14, color: "#7C3AED", display: "flex", alignItems: "center", gap: 8 }}>
                  <Brain size={16} /> Competencies — "HOW you DELIVER"
                </h4>
                <p style={{ margin: 0, fontSize: 12, color: "#6B21A8", lineHeight: 1.6 }}>
                  Competencies are behavioral attributes and traits that drive performance. They represent how you apply skills in context. Examples: Stakeholder management, strategic thinking, executive communication. Competencies develop over time through experience and feedback.
                </p>
              </div>
              
              <div style={{ background: COLORS.surfaceAlt, borderRadius: 12, padding: 16, border: `1px solid ${COLORS.border}` }}>
                <h4 style={{ margin: "0 0 8px", fontSize: 14, color: COLORS.text, display: "flex", alignItems: "center", gap: 8 }}>
                  <Shield size={16} /> Governance Rules
                </h4>
                <div style={{ fontSize: 12, color: COLORS.textMuted, lineHeight: 1.8 }}>
                  • Maximum 3 Primary Skills per person (enforced)<br/>
                  • Skills are tiered: Primary → Secondary → Tertiary<br/>
                  • Proficiency rated 1–5 (Awareness → Expert)<br/>
                  • Certifications are linked to skills and auto-validated<br/>
                  • Competencies are assessed independently from skills
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Matrix Heatmap */}
        <div style={{ background: COLORS.card, borderRadius: 12, border: `1px solid ${COLORS.border}`, overflow: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
            <thead>
              <tr>
                <th style={{ ...thStyle, position: "sticky", left: 0, background: COLORS.surfaceAlt, zIndex: 2, minWidth: 140 }}>Team Member</th>
                {displaySkills.map(s => (
                  <th key={s.id} style={{ ...thStyle, minWidth: 70, writingMode: "vertical-lr", transform: "rotate(180deg)", height: 100, textAlign: "left" }}>
                    {s.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {matrixPeople.map(person => {
                const allSkills = [...person.primarySkills, ...person.secondarySkills, ...person.tertiarySkills];
                const skillMap = {};
                allSkills.forEach(s => { skillMap[s.id] = s; });
                
                return (
                  <tr key={person.id} style={{ borderBottom: `1px solid ${COLORS.borderLight}` }}>
                    <td style={{ padding: "6px 10px", position: "sticky", left: 0, background: COLORS.card, zIndex: 1, borderRight: `1px solid ${COLORS.border}` }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <div style={{ width: 22, height: 22, borderRadius: "50%", background: person.avatarColor, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 8, fontWeight: 700 }}>
                          {person.firstName[0]}{person.lastName[0]}
                        </div>
                        <span style={{ fontSize: 11, fontWeight: 500 }}>{person.firstName} {person.lastName[0]}.</span>
                      </div>
                    </td>
                    {displaySkills.map(sk => {
                      const match = skillMap[sk.id];
                      const prof = match?.proficiency || 0;
                      const tierColors = { primary: "#0F4C81", secondary: "#7C3AED", tertiary: "#059669" };
                      const bg = prof === 0 ? COLORS.borderLight : `${tierColors[match?.tier] || COLORS.primary}${Math.min(20 + prof * 15, 99).toString(16)}`;
                      return (
                        <td key={sk.id} style={{ padding: 4, textAlign: "center", background: bg, borderRight: `1px solid ${COLORS.borderLight}` }}>
                          {prof > 0 && (
                            <div style={{ fontSize: 10, fontWeight: 700, color: prof >= 4 ? "#fff" : COLORS.text }}>
                              {prof}
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {/* Legend */}
        <div style={{ display: "flex", gap: 16, marginTop: 12, justifyContent: "center" }}>
          {Object.entries(PROFICIENCY).map(([k, v]) => (
            <div key={k} style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: v.color }} />
              <span style={{ fontSize: 10, color: COLORS.textMuted }}>{k} = {v.label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ─── INNOVATION PROJECTS ───
  const [selectedProject, setSelectedProject] = useState(null);
  
  const renderProjects = () => (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: COLORS.text, margin: 0, display: "flex", alignItems: "center", gap: 8 }}>
            <Lightbulb size={20} color={COLORS.accent} /> Innovation Lab
          </h2>
          <p style={{ fontSize: 12, color: COLORS.textMuted, margin: "2px 0 0" }}>Extra-hour AI experiments & innovation projects — skill-matched to team members</p>
        </div>
        <button onClick={() => handleBulkDownload("projects")} style={{ ...btnStyle, background: COLORS.surfaceAlt, color: COLORS.text }}>
          <Download size={13} /> Export Projects
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {projects.map(proj => {
          const matches = getProjectMatches(proj);
          const topMatch = matches[0];
          return (
            <div key={proj.id} style={{
              background: COLORS.card, borderRadius: 12, padding: 20, border: `1px solid ${COLORS.border}`,
              cursor: "pointer", transition: "all 0.2s",
            }} onClick={() => setSelectedProject(proj.id === selectedProject?.id ? null : proj)}
              onMouseEnter={e => e.currentTarget.style.borderColor = COLORS.accent}
              onMouseLeave={e => e.currentTarget.style.borderColor = COLORS.border}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                <Badge variant={proj.status === "active" ? "success" : "warning"}>{proj.status}</Badge>
                <span style={{ fontSize: 10, color: COLORS.textMuted }}>{proj.hoursPerWeek}h/week</span>
              </div>
              <h4 style={{ margin: "0 0 6px", fontSize: 14, fontWeight: 700, color: COLORS.text }}>{proj.title}</h4>
              <p style={{ margin: "0 0 10px", fontSize: 11, color: COLORS.textMuted, lineHeight: 1.5 }}>{proj.description}</p>
              <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 10 }}>
                {proj.tags.map(t => <Badge key={t} variant="accent" size="xs">{t}</Badge>)}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: 10, color: COLORS.textMuted }}>
                  <span style={{ fontWeight: 600, color: COLORS.text }}>{proj.filled}/{proj.spots}</span> spots filled
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  {matches.slice(0,3).map((m,i) => (
                    <div key={i} style={{ width: 20, height: 20, borderRadius: "50%", background: m.person.avatarColor, border: "2px solid #fff", marginLeft: i>0?-6:0, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 7, fontWeight: 700 }}>
                      {m.person.firstName[0]}{m.person.lastName[0]}
                    </div>
                  ))}
                  {matches.length > 3 && <span style={{ fontSize: 9, color: COLORS.textMuted }}>+{matches.length-3}</span>}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Project Detail */}
      {selectedProject && (
        <div style={{ marginTop: 16, background: COLORS.card, borderRadius: 12, padding: 20, border: `2px solid ${COLORS.accent}` }}>
          <h3 style={{ margin: "0 0 4px", fontSize: 16, fontWeight: 700, color: COLORS.text }}>{selectedProject.title} — Skill Matches</h3>
          <p style={{ margin: "0 0 12px", fontSize: 11, color: COLORS.textMuted }}>
            Required Skills: {selectedProject.requiredSkills.map(sid => SKILLS_MASTER.find(s=>s.id===sid)?.name).join(", ")}
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 10 }}>
            {getProjectMatches(selectedProject).map((m, i) => (
              <div key={i} style={{ padding: 12, borderRadius: 8, background: COLORS.surfaceAlt, border: `1px solid ${COLORS.border}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                  <div style={{ width: 24, height: 24, borderRadius: "50%", background: m.person.avatarColor, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 9, fontWeight: 700 }}>
                    {m.person.firstName[0]}{m.person.lastName[0]}
                  </div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: COLORS.text }}>{m.person.firstName} {m.person.lastName[0]}.</div>
                    <div style={{ fontSize: 9, color: COLORS.textMuted }}>{m.person.role.name}</div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ flex: 1, height: 6, borderRadius: 3, background: COLORS.border, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${m.score*100}%`, background: m.score >= 0.75 ? COLORS.success : m.score >= 0.5 ? COLORS.warning : COLORS.danger, borderRadius: 3 }} />
                  </div>
                  <span style={{ fontSize: 10, fontWeight: 700, color: m.score >= 0.75 ? COLORS.success : COLORS.warning }}>{Math.round(m.score*100)}%</span>
                </div>
                <div style={{ fontSize: 9, color: COLORS.textMuted, marginTop: 4 }}>{m.matchedSkills}/{m.totalRequired} skills matched</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  // ─── ANALYTICS VIEW (Comprehensive) ───
  const [analyticsTab, setAnalyticsTab] = useState("overview");

  const deepAnalytics = useMemo(() => {
    const N = people.length;
    
    // ── 1. Per-skill enriched data ──
    const allSkillInstances = people.flatMap(p => [...p.primarySkills, ...p.secondarySkills, ...p.tertiarySkills].map(s => ({ ...s, person: p })));
    const allCompInstances = people.flatMap(p => p.competencies.map(c => ({ ...c, person: p })));

    const skillStats = SKILLS_MASTER.map(sk => {
      const instances = allSkillInstances.filter(s => s.id === sk.id);
      const profs = instances.map(i => i.proficiency);
      const count = profs.length;
      const sum = profs.reduce((a, b) => a + b, 0);
      const mean = count ? sum / count : 0;
      const median = count ? (() => { const sorted = [...profs].sort((a,b)=>a-b); const mid = Math.floor(sorted.length/2); return sorted.length%2 ? sorted[mid] : (sorted[mid-1]+sorted[mid])/2; })() : 0;
      const variance = count > 1 ? profs.reduce((a, v) => a + (v - mean) ** 2, 0) / (count - 1) : 0;
      const stddev = Math.sqrt(variance);
      const primaryCount = instances.filter(i => i.tier === "primary").length;
      const secondaryCount = instances.filter(i => i.tier === "secondary").length;
      const tertiaryCount = instances.filter(i => i.tier === "tertiary").length;
      const coveragePct = (count / N * 100);
      // Distribution by proficiency level
      const profDist = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
      profs.forEach(p => { profDist[p] = (profDist[p] || 0) + 1; });
      return { ...sk, count, mean, median, stddev, variance, primaryCount, secondaryCount, tertiaryCount, coveragePct, profDist, profs };
    });

    // ── 2. Per-competency enriched data ──
    const compStats = COMPETENCIES_MASTER.map(cp => {
      const instances = allCompInstances.filter(c => c.id === cp.id);
      const ratings = instances.map(i => i.rating);
      const count = ratings.length;
      const sum = ratings.reduce((a, b) => a + b, 0);
      const mean = count ? sum / count : 0;
      const median = count ? (() => { const sorted = [...ratings].sort((a,b)=>a-b); const mid = Math.floor(sorted.length/2); return sorted.length%2 ? sorted[mid] : (sorted[mid-1]+sorted[mid])/2; })() : 0;
      const variance = count > 1 ? ratings.reduce((a, v) => a + (v - mean) ** 2, 0) / (count - 1) : 0;
      const stddev = Math.sqrt(variance);
      const coveragePct = (count / N * 100);
      const ratingDist = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
      ratings.forEach(r => { ratingDist[r] = (ratingDist[r] || 0) + 1; });
      return { ...cp, count, mean, median, stddev, variance, coveragePct, ratingDist, ratings };
    });

    // ── 3. Category-level aggregates ──
    const catAgg = {};
    Object.keys(SKILL_CATEGORIES).forEach(cat => {
      const catSkills = skillStats.filter(s => s.category === cat);
      const allProfs = catSkills.flatMap(s => s.profs);
      const totalPeople = new Set(allSkillInstances.filter(i => i.category === cat).map(i => i.person.id)).size;
      const mean = allProfs.length ? allProfs.reduce((a,b)=>a+b,0)/allProfs.length : 0;
      const totalInstances = allProfs.length;
      catAgg[cat] = { skills: catSkills, mean, totalPeople, totalInstances, skillCount: catSkills.length };
    });

    const compCatAgg = {};
    Object.keys(COMPETENCY_CATEGORIES).forEach(cat => {
      const catComps = compStats.filter(c => c.category === cat);
      const allRatings = catComps.flatMap(c => c.ratings);
      const mean = allRatings.length ? allRatings.reduce((a,b)=>a+b,0)/allRatings.length : 0;
      compCatAgg[cat] = { comps: catComps, mean, totalRatings: allRatings.length };
    });

    // ── 4. Tech vs Analytics workstream split ──
    const techPeople = people.filter(p => p.role.workstream === "Commercial Technology");
    const analyticsPeople = people.filter(p => p.role.workstream === "Commercial Analytics");
    
    const wsSkillProfile = (ws) => {
      const allSk = ws.flatMap(p => [...p.primarySkills, ...p.secondarySkills, ...p.tertiarySkills]);
      const catCounts = {};
      Object.keys(SKILL_CATEGORIES).forEach(c => { catCounts[c] = allSk.filter(s => s.category === c).length; });
      const avgProf = allSk.length ? allSk.reduce((a,s) => a + s.proficiency, 0) / allSk.length : 0;
      const avgYoe = ws.length ? ws.reduce((a,p) => a + p.yearsOfExperience, 0) / ws.length : 0;
      const avgCerts = ws.length ? ws.reduce((a,p) => a + p.certifications.length, 0) / ws.length : 0;
      const totalSkills = allSk.length;
      const uniqueSkillIds = new Set(allSk.map(s => s.id)).size;
      return { catCounts, avgProf, avgYoe, avgCerts, totalSkills, uniqueSkillIds, count: ws.length };
    };
    const techProfile = wsSkillProfile(techPeople);
    const analyticsProfile = wsSkillProfile(analyticsPeople);

    // ── 5. Overlap: people who have BOTH tech + analytical skills ──
    const overlapPeople = people.filter(p => {
      const allSk = [...p.primarySkills, ...p.secondarySkills, ...p.tertiarySkills];
      const cats = new Set(allSk.map(s => s.category));
      return cats.has("technical") && cats.has("analytical");
    });
    const techOnlyPeople = people.filter(p => {
      const cats = new Set([...p.primarySkills,...p.secondarySkills,...p.tertiarySkills].map(s=>s.category));
      return cats.has("technical") && !cats.has("analytical");
    });
    const analyticsOnlyPeople = people.filter(p => {
      const cats = new Set([...p.primarySkills,...p.secondarySkills,...p.tertiarySkills].map(s=>s.category));
      return !cats.has("technical") && cats.has("analytical");
    });

    // ── 6. Experience distribution ──
    const yoeValues = people.map(p => p.yearsOfExperience);
    const avgYoe = yoeValues.reduce((a,b)=>a+b,0) / N;
    const medianYoe = (() => { const s = [...yoeValues].sort((a,b)=>a-b); const m = Math.floor(s.length/2); return s.length%2 ? s[m] : (s[m-1]+s[m])/2; })();
    const yoeStdDev = Math.sqrt(yoeValues.reduce((a,v) => a + (v - avgYoe)**2, 0) / (N - 1));
    const yoeBuckets = { "1-3": 0, "4-6": 0, "7-10": 0, "11-15": 0, "16-20": 0, "21+": 0 };
    yoeValues.forEach(y => {
      if (y <= 3) yoeBuckets["1-3"]++;
      else if (y <= 6) yoeBuckets["4-6"]++;
      else if (y <= 10) yoeBuckets["7-10"]++;
      else if (y <= 15) yoeBuckets["11-15"]++;
      else if (y <= 20) yoeBuckets["16-20"]++;
      else yoeBuckets["21+"]++;
    });

    // ── 7. Grand means ──
    const allProfs = allSkillInstances.map(i => i.proficiency);
    const grandMeanSkill = allProfs.reduce((a,b)=>a+b,0)/allProfs.length;
    const allRatings = allCompInstances.map(i => i.rating);
    const grandMeanComp = allRatings.reduce((a,b)=>a+b,0)/allRatings.length;

    // ── 8. Proficiency distribution histogram (global) ──
    const globalProfDist = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    allProfs.forEach(p => { globalProfDist[p] = (globalProfDist[p] || 0) + 1; });

    // ── 9. Skill Depth per person ──
    const skillDepths = people.map(p => {
      const all = [...p.primarySkills, ...p.secondarySkills, ...p.tertiarySkills];
      return { person: p, totalSkills: all.length, avgProf: all.reduce((a,s)=>a+s.proficiency,0)/all.length, primary: p.primarySkills.length, secondary: p.secondarySkills.length, tertiary: p.tertiarySkills.length };
    });
    const avgSkillsPerPerson = skillDepths.reduce((a,d) => a + d.totalSkills, 0) / N;
    const avgCompPerPerson = people.reduce((a,p) => a + p.competencies.length, 0) / N;

    // ── 10. Maturity ──
    const maturity = { emerging: 0, developing: 0, established: 0, mature: 0 };
    skillStats.forEach(s => {
      if (s.count === 0) return;
      if (s.mean < 2) maturity.emerging++;
      else if (s.mean < 3) maturity.developing++;
      else if (s.mean < 4) maturity.established++;
      else maturity.mature++;
    });

    // ── 11. Gaps: skills with high demand (many roles need) but low proficiency or coverage ──
    const gaps = skillStats
      .filter(s => s.count >= 2 && (s.mean < 3.0 || s.coveragePct < 25))
      .sort((a,b) => a.mean - b.mean)
      .slice(0, 10);

    // ── 12. Certification stats ──
    const certFreq = {};
    people.forEach(p => p.certifications.forEach(c => { certFreq[c.name] = (certFreq[c.name] || 0) + 1; }));
    const topCerts = Object.entries(certFreq).sort((a,b)=>b[1]-a[1]).map(([name, count]) => ({ name, count }));
    const totalCerts = people.reduce((a,p)=>a+p.certifications.length, 0);
    const avgCertsPerPerson = totalCerts / N;
    const pctWithCerts = (people.filter(p => p.certifications.length > 0).length / N * 100);

    // ── 13. Resume coverage ──
    const resumePct = (people.filter(p => p.resumeUploaded).length / N * 100);

    // ── 14. Tier distribution ──
    const tierTotals = { primary: allSkillInstances.filter(i=>i.tier==="primary").length, secondary: allSkillInstances.filter(i=>i.tier==="secondary").length, tertiary: allSkillInstances.filter(i=>i.tier==="tertiary").length };

    // ── 15. Role distribution ──
    const roleDist = {};
    people.forEach(p => { roleDist[p.role.name] = (roleDist[p.role.name] || 0) + 1; });

    return { skillStats, compStats, catAgg, compCatAgg, techProfile, analyticsProfile, overlapPeople, techOnlyPeople, analyticsOnlyPeople, yoeValues, avgYoe, medianYoe, yoeStdDev, yoeBuckets, grandMeanSkill, grandMeanComp, globalProfDist, avgSkillsPerPerson, avgCompPerPerson, maturity, gaps, topCerts, totalCerts, avgCertsPerPerson, pctWithCerts, resumePct, tierTotals, roleDist, skillDepths, N, techPeople, analyticsPeople };
  }, [people]);

  // ── SVG Horizontal Bar ──
  const HBar = ({ data, maxVal, width = 280, height = 18, color = COLORS.primary, showLabel = true }) => {
    const pct = maxVal > 0 ? (data / maxVal) * 100 : 0;
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <div style={{ width, height, borderRadius: 4, background: COLORS.surfaceAlt, overflow: "hidden", flexShrink: 0 }}>
          <div style={{ width: `${pct}%`, height: "100%", borderRadius: 4, background: color, transition: "width 0.5s ease" }} />
        </div>
        {showLabel && <span style={{ fontSize: 11, fontWeight: 700, color: COLORS.text, minWidth: 28, textAlign: "right" }}>{typeof data === "number" && data % 1 !== 0 ? data.toFixed(1) : data}</span>}
      </div>
    );
  };

  // ── SVG Mini Histogram ──
  const MiniHistogram = ({ dist, maxBucketVal, colors, height = 50, width = 100 }) => {
    const keys = Object.keys(dist);
    const max = maxBucketVal || Math.max(...Object.values(dist), 1);
    const barW = width / keys.length - 2;
    return (
      <svg width={width} height={height + 14} viewBox={`0 0 ${width} ${height + 14}`}>
        {keys.map((k, i) => {
          const v = dist[k];
          const bh = max > 0 ? (v / max) * height : 0;
          const x = i * (barW + 2);
          return (
            <g key={k}>
              <rect x={x} y={height - bh} width={barW} height={Math.max(bh, 1)} rx={2} fill={colors ? colors[i % colors.length] : COLORS.primary} opacity={0.85} />
              <text x={x + barW / 2} y={height + 11} textAnchor="middle" fontSize={8} fill={COLORS.textMuted}>{k}</text>
            </g>
          );
        })}
      </svg>
    );
  };

  // ── Venn-like overlap viz ──
  const VennOverlap = ({ techOnly, both, analyticsOnly }) => {
    const total = techOnly + both + analyticsOnly;
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0, position: "relative", height: 110, width: 220, margin: "0 auto" }}>
        <div style={{ width: 100, height: 100, borderRadius: "50%", background: "#0F4C8130", border: "2px solid #0F4C81", display: "flex", alignItems: "center", justifyContent: "center", position: "absolute", left: 20 }}>
          <span style={{ fontSize: 18, fontWeight: 800, color: "#0F4C81", marginLeft: -16 }}>{techOnly}</span>
        </div>
        <div style={{ width: 100, height: 100, borderRadius: "50%", background: "#7C3AED25", border: "2px solid #7C3AED", display: "flex", alignItems: "center", justifyContent: "center", position: "absolute", right: 20 }}>
          <span style={{ fontSize: 18, fontWeight: 800, color: "#7C3AED", marginRight: -16 }}>{analyticsOnly}</span>
        </div>
        <div style={{ position: "absolute", zIndex: 2, background: "linear-gradient(135deg, #0F4C8140, #7C3AED40)", width: 44, height: 44, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #fff" }}>
          <span style={{ fontSize: 16, fontWeight: 800, color: COLORS.text }}>{both}</span>
        </div>
      </div>
    );
  };

  // ── Section Card wrapper ──
  const AnalyticsCard = ({ title, icon: Icon, iconColor, children, span = 1 }) => (
    <div style={{ background: COLORS.card, borderRadius: 12, padding: 20, border: `1px solid ${COLORS.border}`, gridColumn: `span ${span}` }}>
      <h3 style={{ fontSize: 13, fontWeight: 700, color: COLORS.text, margin: "0 0 14px", display: "flex", alignItems: "center", gap: 8 }}>
        {Icon && <div style={{ width: 26, height: 26, borderRadius: 6, background: `${iconColor || COLORS.primary}12`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon size={13} color={iconColor || COLORS.primary} />
        </div>}
        {title}
      </h3>
      {children}
    </div>
  );

  // ── Stat line ──
  const StatLine = ({ label, value, unit = "", color }) => (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "5px 0", borderBottom: `1px solid ${COLORS.borderLight}` }}>
      <span style={{ fontSize: 11, color: COLORS.textMuted }}>{label}</span>
      <span style={{ fontSize: 13, fontWeight: 700, color: color || COLORS.text }}>{value}{unit && <span style={{ fontSize: 10, fontWeight: 500, color: COLORS.textMuted, marginLeft: 2 }}>{unit}</span>}</span>
    </div>
  );

  const ANALYTICS_TABS = [
    { id: "overview", label: "Executive Summary", icon: Home },
    { id: "skills", label: "Skills Deep Dive", icon: Code },
    { id: "competencies", label: "Competencies", icon: Brain },
    { id: "overlap", label: "Tech vs Analytics", icon: GitBranch },
    { id: "gaps", label: "Gap Analysis", icon: AlertTriangle },
    { id: "people_depth", label: "People Depth", icon: Users },
  ];

  const renderAnalytics = () => {
    const d = deepAnalytics;

    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: COLORS.text, margin: "0 0 4px" }}>Skill & Competency Analytics</h2>
          <p style={{ fontSize: 12, color: COLORS.textMuted, margin: 0 }}>Deep statistical analysis across {d.N} team members · {SKILLS_MASTER.length} skills · {COMPETENCIES_MASTER.length} competencies</p>
        </div>

        {/* Tab navigation */}
        <div style={{ display: "flex", gap: 4, marginBottom: 20, background: COLORS.surfaceAlt, padding: 4, borderRadius: 10, border: `1px solid ${COLORS.border}` }}>
          {ANALYTICS_TABS.map(tab => (
            <button key={tab.id} onClick={() => setAnalyticsTab(tab.id)} style={{
              display: "flex", alignItems: "center", gap: 5, padding: "7px 14px", borderRadius: 7,
              border: "none", cursor: "pointer", fontSize: 11, fontWeight: analyticsTab === tab.id ? 700 : 500,
              background: analyticsTab === tab.id ? COLORS.card : "transparent",
              color: analyticsTab === tab.id ? COLORS.primary : COLORS.textMuted,
              boxShadow: analyticsTab === tab.id ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
              transition: "all 0.15s",
            }}>
              <tab.icon size={12} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* ══════════ TAB: EXECUTIVE SUMMARY ══════════ */}
        {analyticsTab === "overview" && (
          <div>
            {/* KPI Strip */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 10, marginBottom: 18 }}>
              {[
                { label: "Team Size", value: d.N, icon: Users, color: COLORS.primary },
                { label: "Avg Experience", value: `${d.avgYoe.toFixed(1)}y`, icon: Clock, color: "#059669" },
                { label: "Avg Skill Prof.", value: d.grandMeanSkill.toFixed(2), icon: Target, color: "#7C3AED" },
                { label: "Avg Competency", value: d.grandMeanComp.toFixed(2), icon: Brain, color: "#D97706" },
                { label: "Skills/Person", value: d.avgSkillsPerPerson.toFixed(1), icon: Layers, color: COLORS.accent },
                { label: "Cert Coverage", value: `${d.pctWithCerts.toFixed(0)}%`, icon: Award, color: "#DC2626" },
              ].map((kpi, i) => (
                <div key={i} style={{ background: COLORS.card, borderRadius: 10, padding: "14px 14px", border: `1px solid ${COLORS.border}`, textAlign: "center", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: -6, right: -6, opacity: 0.05 }}><kpi.icon size={52} color={kpi.color} /></div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: kpi.color, lineHeight: 1 }}>{kpi.value}</div>
                  <div style={{ fontSize: 9, color: COLORS.textMuted, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5, marginTop: 4 }}>{kpi.label}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 14 }}>
              {/* Grand Statistical Summary */}
              <AnalyticsCard title="Statistical Summary" icon={BarChart2} iconColor={COLORS.primary}>
                <StatLine label="Grand Mean — Skills" value={d.grandMeanSkill.toFixed(2)} unit="/ 5" />
                <StatLine label="Grand Mean — Competencies" value={d.grandMeanComp.toFixed(2)} unit="/ 5" />
                <StatLine label="Median Experience" value={d.medianYoe} unit="yrs" />
                <StatLine label="Std Dev — Experience" value={d.yoeStdDev.toFixed(1)} unit="yrs" />
                <StatLine label="Avg Skills per Person" value={d.avgSkillsPerPerson.toFixed(1)} />
                <StatLine label="Avg Competencies per Person" value={d.avgCompPerPerson.toFixed(1)} />
                <StatLine label="Avg Certs per Person" value={d.avgCertsPerPerson.toFixed(1)} />
                <StatLine label="Resume Upload Rate" value={`${d.resumePct.toFixed(0)}%`} color={d.resumePct > 80 ? COLORS.success : COLORS.warning} />
              </AnalyticsCard>

              {/* Experience Histogram */}
              <AnalyticsCard title="Experience Distribution" icon={Clock} iconColor="#059669">
                <div style={{ marginBottom: 8 }}>
                  {Object.entries(d.yoeBuckets).map(([bucket, count]) => (
                    <div key={bucket} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                      <span style={{ fontSize: 10, color: COLORS.textMuted, width: 38, textAlign: "right", fontWeight: 600 }}>{bucket}y</span>
                      <HBar data={count} maxVal={d.N} width={140} height={14} color="#059669" />
                      <span style={{ fontSize: 10, color: COLORS.textMuted }}>({(count/d.N*100).toFixed(0)}%)</span>
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: 10, color: COLORS.textMuted, borderTop: `1px solid ${COLORS.border}`, paddingTop: 8, marginTop: 4 }}>
                  Mean: <strong>{d.avgYoe.toFixed(1)}y</strong> · Median: <strong>{d.medianYoe}y</strong> · σ: <strong>{d.yoeStdDev.toFixed(1)}y</strong>
                </div>
              </AnalyticsCard>

              {/* Proficiency Distribution */}
              <AnalyticsCard title="Global Proficiency Distribution" icon={Activity} iconColor="#7C3AED">
                {Object.entries(d.globalProfDist).map(([level, count]) => {
                  const total = Object.values(d.globalProfDist).reduce((a,b)=>a+b,0);
                  const pct = (count/total*100).toFixed(1);
                  return (
                    <div key={level} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 4, width: 80 }}>
                        <div style={{ width: 8, height: 8, borderRadius: "50%", background: PROFICIENCY[level]?.color }} />
                        <span style={{ fontSize: 10, color: COLORS.textMuted }}>{PROFICIENCY[level]?.label}</span>
                      </div>
                      <HBar data={count} maxVal={Math.max(...Object.values(d.globalProfDist))} width={120} height={14} color={PROFICIENCY[level]?.color} />
                      <span style={{ fontSize: 10, color: COLORS.textMuted }}>{pct}%</span>
                    </div>
                  );
                })}
                <div style={{ fontSize: 10, color: COLORS.textMuted, borderTop: `1px solid ${COLORS.border}`, paddingTop: 8, marginTop: 4 }}>
                  Total skill instances: <strong>{Object.values(d.globalProfDist).reduce((a,b)=>a+b,0)}</strong>
                </div>
              </AnalyticsCard>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {/* Skill Maturity Breakdown */}
              <AnalyticsCard title="Skill Maturity Model" icon={TrendingUp} iconColor={COLORS.primary}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginBottom: 12 }}>
                  {[
                    { label: "Emerging", value: d.maturity.emerging, color: "#EF4444", desc: "Mean < 2.0", pct: (d.maturity.emerging / SKILLS_MASTER.length * 100).toFixed(0) },
                    { label: "Developing", value: d.maturity.developing, color: "#F59E0B", desc: "Mean 2.0–3.0", pct: (d.maturity.developing / SKILLS_MASTER.length * 100).toFixed(0) },
                    { label: "Established", value: d.maturity.established, color: "#10B981", desc: "Mean 3.0–4.0", pct: (d.maturity.established / SKILLS_MASTER.length * 100).toFixed(0) },
                    { label: "Mature", value: d.maturity.mature, color: "#0F4C81", desc: "Mean ≥ 4.0", pct: (d.maturity.mature / SKILLS_MASTER.length * 100).toFixed(0) },
                  ].map(m => (
                    <div key={m.label} style={{ textAlign: "center", padding: 10, borderRadius: 8, background: `${m.color}08`, border: `1px solid ${m.color}20` }}>
                      <div style={{ fontSize: 22, fontWeight: 800, color: m.color }}>{m.value}</div>
                      <div style={{ fontSize: 10, fontWeight: 700, color: m.color }}>{m.label}</div>
                      <div style={{ fontSize: 9, color: COLORS.textMuted }}>{m.desc} · {m.pct}%</div>
                    </div>
                  ))}
                </div>
                {/* stacked bar */}
                <div style={{ display: "flex", height: 16, borderRadius: 8, overflow: "hidden" }}>
                  {[
                    { v: d.maturity.emerging, c: "#EF4444" },
                    { v: d.maturity.developing, c: "#F59E0B" },
                    { v: d.maturity.established, c: "#10B981" },
                    { v: d.maturity.mature, c: "#0F4C81" },
                  ].map((seg, i) => (
                    <div key={i} style={{ flex: seg.v, background: seg.c, minWidth: seg.v > 0 ? 4 : 0 }} />
                  ))}
                </div>
              </AnalyticsCard>

              {/* Tier Distribution */}
              <AnalyticsCard title="Skill Tier Distribution" icon={Layers} iconColor={COLORS.accent}>
                <div style={{ display: "flex", gap: 14, marginBottom: 14 }}>
                  {[
                    { label: "Primary", count: d.tierTotals.primary, color: "#0F4C81", desc: "Max 3 per person" },
                    { label: "Secondary", count: d.tierTotals.secondary, color: "#7C3AED", desc: "Supporting skills" },
                    { label: "Tertiary", count: d.tierTotals.tertiary, color: "#059669", desc: "Awareness level" },
                  ].map(t => (
                    <div key={t.label} style={{ flex: 1, textAlign: "center", padding: 10, borderRadius: 8, background: `${t.color}08`, border: `1px solid ${t.color}20` }}>
                      <div style={{ fontSize: 22, fontWeight: 800, color: t.color }}>{t.count}</div>
                      <div style={{ fontSize: 10, fontWeight: 700, color: t.color }}>{t.label}</div>
                      <div style={{ fontSize: 9, color: COLORS.textMuted }}>{t.desc}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", height: 16, borderRadius: 8, overflow: "hidden" }}>
                  <div style={{ flex: d.tierTotals.primary, background: "#0F4C81" }} />
                  <div style={{ flex: d.tierTotals.secondary, background: "#7C3AED" }} />
                  <div style={{ flex: d.tierTotals.tertiary, background: "#059669" }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                  {["Primary","Secondary","Tertiary"].map((t,i) => (
                    <span key={t} style={{ fontSize: 9, color: COLORS.textMuted }}>
                      {t}: {(Object.values(d.tierTotals)[i] / (d.tierTotals.primary+d.tierTotals.secondary+d.tierTotals.tertiary) * 100).toFixed(0)}%
                    </span>
                  ))}
                </div>
              </AnalyticsCard>
            </div>
          </div>
        )}

        {/* ══════════ TAB: SKILLS DEEP DIVE ══════════ */}
        {analyticsTab === "skills" && (
          <div>
            {/* Category Comparison */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 16 }}>
              {Object.entries(SKILL_CATEGORIES).map(([key, cat]) => {
                const agg = d.catAgg[key];
                return (
                  <div key={key} style={{ background: COLORS.card, borderRadius: 10, padding: 16, border: `1px solid ${COLORS.border}`, borderTop: `3px solid ${cat.color}` }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
                      <cat.icon size={14} color={cat.color} />
                      <span style={{ fontSize: 12, fontWeight: 700, color: cat.color }}>{cat.label}</span>
                    </div>
                    <StatLine label="Skills in Category" value={agg.skillCount} />
                    <StatLine label="People with ≥1 skill" value={agg.totalPeople} />
                    <StatLine label="Avg Proficiency" value={agg.mean.toFixed(2)} unit="/ 5" color={agg.mean >= 3 ? COLORS.success : COLORS.warning} />
                    <StatLine label="Total Instances" value={agg.totalInstances} />
                  </div>
                );
              })}
            </div>

            {/* Per-Skill Detail Table */}
            <AnalyticsCard title="Individual Skill Statistics — All 34 Skills" icon={BarChart3} iconColor={COLORS.primary} span={1}>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
                  <thead>
                    <tr style={{ background: COLORS.surfaceAlt }}>
                      {["Skill", "Category", "Coverage", "Mean", "Median", "Std Dev", "Primary", "Secondary", "Tertiary", "Distribution"].map(h => (
                        <th key={h} style={{ padding: "8px 8px", textAlign: "left", fontWeight: 700, color: COLORS.textMuted, fontSize: 9, textTransform: "uppercase", letterSpacing: 0.4, borderBottom: `1px solid ${COLORS.border}`, whiteSpace: "nowrap" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {d.skillStats.sort((a,b) => b.count - a.count).map(sk => (
                      <tr key={sk.id} style={{ borderBottom: `1px solid ${COLORS.borderLight}` }}>
                        <td style={{ padding: "6px 8px", fontWeight: 600, color: COLORS.text, maxWidth: 160 }}>{sk.name}</td>
                        <td style={{ padding: "6px 8px" }}>
                          <Badge variant={sk.category === "technical" ? "primary" : sk.category === "analytical" ? "accent" : sk.category === "domain" ? "success" : "warning"} size="xs">
                            {sk.category}
                          </Badge>
                        </td>
                        <td style={{ padding: "6px 8px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                            <div style={{ width: 40, height: 5, borderRadius: 3, background: COLORS.surfaceAlt, overflow: "hidden" }}>
                              <div style={{ width: `${sk.coveragePct}%`, height: "100%", borderRadius: 3, background: sk.coveragePct > 30 ? COLORS.success : COLORS.warning }} />
                            </div>
                            <span style={{ fontSize: 9, fontWeight: 600 }}>{sk.coveragePct.toFixed(0)}%</span>
                          </div>
                        </td>
                        <td style={{ padding: "6px 8px", fontWeight: 700, color: sk.mean >= 3.5 ? COLORS.success : sk.mean >= 2.5 ? COLORS.text : COLORS.danger }}>{sk.mean.toFixed(2)}</td>
                        <td style={{ padding: "6px 8px", color: COLORS.text }}>{sk.median.toFixed(1)}</td>
                        <td style={{ padding: "6px 8px", color: COLORS.textMuted }}>{sk.stddev.toFixed(2)}</td>
                        <td style={{ padding: "6px 8px", fontWeight: 600, color: "#0F4C81" }}>{sk.primaryCount}</td>
                        <td style={{ padding: "6px 8px", fontWeight: 600, color: "#7C3AED" }}>{sk.secondaryCount}</td>
                        <td style={{ padding: "6px 8px", fontWeight: 600, color: "#059669" }}>{sk.tertiaryCount}</td>
                        <td style={{ padding: "6px 4px" }}>
                          <MiniHistogram dist={sk.profDist} height={24} width={70} colors={["#94A3B8","#60A5FA","#34D399","#FBBF24","#F97316"]} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </AnalyticsCard>
          </div>
        )}

        {/* ══════════ TAB: COMPETENCIES ══════════ */}
        {analyticsTab === "competencies" && (
          <div>
            {/* Category Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 16 }}>
              {Object.entries(COMPETENCY_CATEGORIES).map(([key, cat]) => {
                const agg = d.compCatAgg[key];
                return (
                  <div key={key} style={{ background: COLORS.card, borderRadius: 10, padding: 16, border: `1px solid ${COLORS.border}`, borderTop: `3px solid ${cat.color}` }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
                      <cat.icon size={14} color={cat.color} />
                      <span style={{ fontSize: 12, fontWeight: 700, color: cat.color }}>{cat.label}</span>
                    </div>
                    <StatLine label="Competencies" value={agg.comps.length} />
                    <StatLine label="Avg Rating" value={agg.mean.toFixed(2)} unit="/ 5" color={agg.mean >= 3.5 ? COLORS.success : COLORS.warning} />
                    <StatLine label="Total Assessments" value={agg.totalRatings} />
                  </div>
                );
              })}
            </div>

            {/* Competency Table */}
            <AnalyticsCard title="Competency Detail — All 12 Competencies" icon={Brain} iconColor="#7C3AED">
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
                  <thead>
                    <tr style={{ background: COLORS.surfaceAlt }}>
                      {["Competency", "Category", "Assessed By", "Mean", "Median", "Std Dev", "Distribution"].map(h => (
                        <th key={h} style={{ padding: "8px 8px", textAlign: "left", fontWeight: 700, color: COLORS.textMuted, fontSize: 9, textTransform: "uppercase", borderBottom: `1px solid ${COLORS.border}` }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {d.compStats.sort((a,b) => b.count - a.count).map(cp => (
                      <tr key={cp.id} style={{ borderBottom: `1px solid ${COLORS.borderLight}` }}>
                        <td style={{ padding: "6px 8px", fontWeight: 600, color: COLORS.text }}>{cp.name}</td>
                        <td style={{ padding: "6px 8px" }}><Badge variant={cp.category === "leadership" ? "danger" : cp.category === "communication" ? "primary" : cp.category === "strategic" ? "accent" : "success"} size="xs">{cp.category}</Badge></td>
                        <td style={{ padding: "6px 8px" }}>{cp.count} <span style={{ fontSize: 9, color: COLORS.textMuted }}>({cp.coveragePct.toFixed(0)}%)</span></td>
                        <td style={{ padding: "6px 8px", fontWeight: 700, color: cp.mean >= 3.5 ? COLORS.success : cp.mean >= 2.5 ? COLORS.text : COLORS.danger }}>{cp.mean.toFixed(2)}</td>
                        <td style={{ padding: "6px 8px" }}>{cp.median.toFixed(1)}</td>
                        <td style={{ padding: "6px 8px", color: COLORS.textMuted }}>{cp.stddev.toFixed(2)}</td>
                        <td style={{ padding: "6px 4px" }}>
                          <MiniHistogram dist={cp.ratingDist} height={24} width={70} colors={["#94A3B8","#60A5FA","#34D399","#FBBF24","#F97316"]} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </AnalyticsCard>
          </div>
        )}

        {/* ══════════ TAB: TECH vs ANALYTICS OVERLAP ══════════ */}
        {analyticsTab === "overlap" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 16 }}>
              {/* Workstream comparison */}
              {[
                { label: "Commercial Technology", profile: d.techProfile, color: "#0F4C81", icon: Code },
                { label: "Commercial Analytics", profile: d.analyticsProfile, color: "#7C3AED", icon: Brain },
              ].map(ws => (
                <div key={ws.label} style={{ background: COLORS.card, borderRadius: 12, padding: 20, border: `1px solid ${COLORS.border}`, borderTop: `3px solid ${ws.color}` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                    <ws.icon size={16} color={ws.color} />
                    <span style={{ fontSize: 14, fontWeight: 700, color: ws.color }}>{ws.label}</span>
                    <Badge variant="default" size="xs">{ws.profile.count} people</Badge>
                  </div>
                  <StatLine label="Avg Experience" value={ws.profile.avgYoe.toFixed(1)} unit="yrs" />
                  <StatLine label="Avg Proficiency" value={ws.profile.avgProf.toFixed(2)} unit="/ 5" />
                  <StatLine label="Avg Certs" value={ws.profile.avgCerts.toFixed(1)} />
                  <StatLine label="Total Skill Instances" value={ws.profile.totalSkills} />
                  <StatLine label="Unique Skills Covered" value={ws.profile.uniqueSkillIds} unit={`/ ${SKILLS_MASTER.length}`} />
                  <div style={{ marginTop: 10 }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: COLORS.textMuted, marginBottom: 6, textTransform: "uppercase" }}>Skill Category Breakdown</div>
                    {Object.entries(SKILL_CATEGORIES).map(([cat, meta]) => (
                      <div key={cat} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                        <span style={{ fontSize: 10, color: COLORS.textMuted, width: 70 }}>{meta.label.split(" ")[0]}</span>
                        <HBar data={ws.profile.catCounts[cat] || 0} maxVal={ws.profile.totalSkills} width={140} height={10} color={meta.color} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Venn Overlap */}
            <AnalyticsCard title="Skill Overlap — Technical × Analytical" icon={GitBranch} iconColor="#059669">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, alignItems: "center" }}>
                <div>
                  <VennOverlap techOnly={d.techOnlyPeople.length} both={d.overlapPeople.length} analyticsOnly={d.analyticsOnlyPeople.length} />
                  <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 10 }}>
                    <span style={{ fontSize: 10, color: "#0F4C81", fontWeight: 600 }}>● Tech Only</span>
                    <span style={{ fontSize: 10, color: COLORS.text, fontWeight: 600 }}>● Both</span>
                    <span style={{ fontSize: 10, color: "#7C3AED", fontWeight: 600 }}>● Analytics Only</span>
                  </div>
                </div>
                <div>
                  <StatLine label="Have BOTH Tech + Analytical" value={d.overlapPeople.length} unit={`(${(d.overlapPeople.length/d.N*100).toFixed(0)}%)`} color={COLORS.success} />
                  <StatLine label="Technical Only" value={d.techOnlyPeople.length} unit={`(${(d.techOnlyPeople.length/d.N*100).toFixed(0)}%)`} />
                  <StatLine label="Analytical Only" value={d.analyticsOnlyPeople.length} unit={`(${(d.analyticsOnlyPeople.length/d.N*100).toFixed(0)}%)`} />
                  <StatLine label="Neither (Domain/Platform only)" value={d.N - d.overlapPeople.length - d.techOnlyPeople.length - d.analyticsOnlyPeople.length} />
                  <div style={{ marginTop: 10, padding: 10, borderRadius: 8, background: d.overlapPeople.length/d.N > 0.5 ? "#D1FAE5" : "#FEF3C7", border: `1px solid ${d.overlapPeople.length/d.N > 0.5 ? "#A7F3D0" : "#FDE68A"}` }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: d.overlapPeople.length/d.N > 0.5 ? "#065F46" : "#92400E" }}>
                      {d.overlapPeople.length/d.N > 0.5 ? "✓ Strong cross-functional overlap" : "⚠ Low cross-functional overlap — consider upskilling programs"}
                    </div>
                  </div>
                </div>
              </div>
            </AnalyticsCard>
          </div>
        )}

        {/* ══════════ TAB: GAP ANALYSIS ══════════ */}
        {analyticsTab === "gaps" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 16 }}>
              {/* Critical gaps */}
              <AnalyticsCard title="Skills Below Proficiency Threshold (Mean < 3.0)" icon={AlertTriangle} iconColor={COLORS.danger}>
                {d.gaps.length === 0 ? (
                  <div style={{ padding: 20, textAlign: "center", color: COLORS.success, fontSize: 12, fontWeight: 600 }}>
                    <CheckCircle size={20} style={{ margin: "0 auto 8px", display: "block" }} />
                    No critical gaps — all assessed skills above threshold
                  </div>
                ) : (
                  d.gaps.map((g, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 0", borderBottom: `1px solid ${COLORS.borderLight}` }}>
                      <div style={{ width: 20, height: 20, borderRadius: 4, background: g.mean < 2 ? "#FEE2E2" : "#FEF3C7", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <AlertTriangle size={10} color={g.mean < 2 ? COLORS.danger : COLORS.warning} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 11, fontWeight: 600, color: COLORS.text }}>{g.name}</div>
                        <div style={{ fontSize: 9, color: COLORS.textMuted }}>{g.count} people · Coverage: {g.coveragePct.toFixed(0)}%</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: 13, fontWeight: 800, color: g.mean < 2 ? COLORS.danger : COLORS.warning }}>{g.mean.toFixed(2)}</div>
                        <div style={{ fontSize: 8, color: COLORS.textMuted }}>mean / 5</div>
                      </div>
                    </div>
                  ))
                )}
              </AnalyticsCard>

              {/* Low coverage skills */}
              <AnalyticsCard title="Low Coverage Skills (< 25% of Team)" icon={Eye} iconColor="#D97706">
                {d.skillStats.filter(s => s.coveragePct < 25 && s.count > 0).sort((a,b) => a.coveragePct - b.coveragePct).map((sk, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 0", borderBottom: `1px solid ${COLORS.borderLight}` }}>
                    <span style={{ fontSize: 11, fontWeight: 600, color: COLORS.text, flex: 1 }}>{sk.name}</span>
                    <HBar data={sk.count} maxVal={d.N} width={80} height={10} color="#D97706" />
                    <span style={{ fontSize: 10, fontWeight: 600, color: "#D97706" }}>{sk.coveragePct.toFixed(0)}%</span>
                  </div>
                ))}
              </AnalyticsCard>
            </div>

            {/* Certification gaps */}
            <AnalyticsCard title="Certification Landscape" icon={Award} iconColor="#DC2626">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.textMuted, marginBottom: 8, textTransform: "uppercase" }}>Top Certifications</div>
                  {d.topCerts.map((c, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 0", borderBottom: `1px solid ${COLORS.borderLight}` }}>
                      <span style={{ fontSize: 10, fontWeight: 700, color: COLORS.textLight, width: 18 }}>#{i+1}</span>
                      <span style={{ fontSize: 11, color: COLORS.text, flex: 1 }}>{c.name}</span>
                      <HBar data={c.count} maxVal={d.topCerts[0]?.count || 1} width={80} height={10} color="#DC2626" />
                    </div>
                  ))}
                </div>
                <div>
                  <StatLine label="Total Certifications" value={d.totalCerts} />
                  <StatLine label="Avg per Person" value={d.avgCertsPerPerson.toFixed(1)} />
                  <StatLine label="% with ≥ 1 Cert" value={`${d.pctWithCerts.toFixed(0)}%`} color={d.pctWithCerts > 60 ? COLORS.success : COLORS.warning} />
                  <StatLine label="Unique Cert Types" value={d.topCerts.length} />
                  <div style={{ marginTop: 10, padding: 10, borderRadius: 8, background: COLORS.surfaceAlt }}>
                    <div style={{ fontSize: 10, fontWeight: 600, color: COLORS.textMuted }}>
                      {d.pctWithCerts < 50 ? "⚠ Less than half the team is certified. Consider sponsoring certification programs." : "✓ Good certification coverage across the team."}
                    </div>
                  </div>
                </div>
              </div>
            </AnalyticsCard>
          </div>
        )}

        {/* ══════════ TAB: PEOPLE DEPTH ══════════ */}
        {analyticsTab === "people_depth" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 16 }}>
              {/* Role distribution */}
              <AnalyticsCard title="Role Distribution" icon={Briefcase} iconColor={COLORS.primary}>
                {Object.entries(d.roleDist).sort((a,b) => b[1] - a[1]).map(([role, count], i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 0", borderBottom: `1px solid ${COLORS.borderLight}` }}>
                    <span style={{ fontSize: 11, color: COLORS.text, flex: 1 }}>{role}</span>
                    <HBar data={count} maxVal={Math.max(...Object.values(d.roleDist))} width={100} height={12} color={COLORS.primary} />
                    <span style={{ fontSize: 10, color: COLORS.textMuted }}>({(count/d.N*100).toFixed(0)}%)</span>
                  </div>
                ))}
              </AnalyticsCard>

              {/* Skill depth per person */}
              <AnalyticsCard title="Individual Skill Breadth" icon={Layers} iconColor="#059669">
                <div style={{ fontSize: 10, color: COLORS.textMuted, marginBottom: 8 }}>Ranked by total skill count (Primary + Secondary + Tertiary)</div>
                <div style={{ maxHeight: 340, overflow: "auto" }}>
                  {d.skillDepths.sort((a,b) => b.totalSkills - a.totalSkills).map((sd, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 0", borderBottom: `1px solid ${COLORS.borderLight}` }}>
                      <span style={{ fontSize: 9, fontWeight: 700, color: COLORS.textLight, width: 18 }}>{i+1}</span>
                      <div style={{ width: 20, height: 20, borderRadius: "50%", background: sd.person.avatarColor, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 7, fontWeight: 700, flexShrink: 0 }}>
                        {sd.person.firstName[0]}{sd.person.lastName[0]}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 11, fontWeight: 600, color: COLORS.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{sd.person.firstName} {sd.person.lastName}</div>
                      </div>
                      <div style={{ display: "flex", gap: 3, flexShrink: 0 }}>
                        <span style={{ fontSize: 9, padding: "1px 4px", borderRadius: 3, background: "#E0F2FE", color: "#0F4C81", fontWeight: 700 }}>{sd.primary}P</span>
                        <span style={{ fontSize: 9, padding: "1px 4px", borderRadius: 3, background: "#EDE9FE", color: "#7C3AED", fontWeight: 700 }}>{sd.secondary}S</span>
                        <span style={{ fontSize: 9, padding: "1px 4px", borderRadius: 3, background: "#D1FAE5", color: "#059669", fontWeight: 700 }}>{sd.tertiary}T</span>
                      </div>
                      <span style={{ fontSize: 10, fontWeight: 700, color: COLORS.text, width: 20, textAlign: "right" }}>{sd.totalSkills}</span>
                      <span style={{ fontSize: 9, color: COLORS.textMuted, width: 32, textAlign: "right" }}>μ{sd.avgProf.toFixed(1)}</span>
                    </div>
                  ))}
                </div>
              </AnalyticsCard>
            </div>

            {/* Skills-per-person histogram */}
            <AnalyticsCard title="Skills per Person — Distribution Histogram" icon={BarChart2} iconColor={COLORS.accent}>
              {(() => {
                const buckets = {};
                d.skillDepths.forEach(sd => {
                  const b = sd.totalSkills;
                  buckets[b] = (buckets[b] || 0) + 1;
                });
                const sortedKeys = Object.keys(buckets).sort((a,b) => +a - +b);
                const maxB = Math.max(...Object.values(buckets), 1);
                return (
                  <div>
                    <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 100, padding: "0 4px" }}>
                      {sortedKeys.map(k => (
                        <div key={k} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                          <span style={{ fontSize: 9, fontWeight: 700, color: COLORS.text }}>{buckets[k]}</span>
                          <div style={{ width: "100%", background: COLORS.accent, borderRadius: "3px 3px 0 0", height: `${(buckets[k]/maxB)*80}px`, minHeight: 2 }} />
                          <span style={{ fontSize: 8, color: COLORS.textMuted }}>{k}</span>
                        </div>
                      ))}
                    </div>
                    <div style={{ textAlign: "center", marginTop: 6, fontSize: 10, color: COLORS.textMuted }}>
                      ← Number of skills per person → &nbsp;&nbsp;|&nbsp;&nbsp; Mean: <strong>{d.avgSkillsPerPerson.toFixed(1)}</strong> · Avg Proficiency: <strong>{d.grandMeanSkill.toFixed(2)}</strong>
                    </div>
                  </div>
                );
              })()}
            </AnalyticsCard>
          </div>
        )}
      </div>
    );
  };

  // ─── ADMIN VIEW ───
  const renderAdmin = () => (
    <div>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: COLORS.text, margin: "0 0 4px" }}>Administration</h2>
      <p style={{ fontSize: 12, color: COLORS.textMuted, margin: "0 0 20px" }}>Master data management, bulk operations, and platform configuration</p>

      {/* Bulk Ops */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 24 }}>
        {[
          { label: "Export People", desc: "Download all team member data as CSV", icon: Users, action: () => handleBulkDownload("people"), color: COLORS.primary },
          { label: "Export Skills Master", desc: "Download complete skills taxonomy", icon: Layers, action: () => handleBulkDownload("skills"), color: "#7C3AED" },
          { label: "Export Projects", desc: "Download innovation projects data", icon: Lightbulb, action: () => handleBulkDownload("projects"), color: COLORS.accent },
        ].map((op, i) => (
          <div key={i} onClick={op.action} style={{
            background: COLORS.card, borderRadius: 12, padding: 20, border: `1px solid ${COLORS.border}`,
            cursor: "pointer", transition: "all 0.2s",
          }}
            onMouseEnter={e => e.currentTarget.style.borderColor = op.color}
            onMouseLeave={e => e.currentTarget.style.borderColor = COLORS.border}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: `${op.color}15`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
              <Download size={16} color={op.color} />
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.text }}>{op.label}</div>
            <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 4 }}>{op.desc}</div>
          </div>
        ))}
      </div>

      {/* Upload Section */}
      <div style={{ background: COLORS.card, borderRadius: 12, padding: 20, border: `1px solid ${COLORS.border}`, marginBottom: 16 }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: COLORS.text, margin: "0 0 4px", display: "flex", alignItems: "center", gap: 8 }}>
          <Upload size={16} color={COLORS.primary} /> Bulk Upload
        </h3>
        <p style={{ fontSize: 11, color: COLORS.textMuted, margin: "0 0 14px" }}>Upload CSV files to import people, skills, certifications, or resumes in bulk</p>
        <div style={{
          border: `2px dashed ${COLORS.border}`, borderRadius: 12, padding: 32,
          textAlign: "center", background: COLORS.surfaceAlt, cursor: "pointer",
        }}>
          <Upload size={28} color={COLORS.textLight} style={{ margin: "0 auto 8px" }} />
          <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.text }}>Drop CSV / XLSX file here or click to browse</div>
          <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 4 }}>Supports: People, Skills, Certifications, Resumes (PDF batch)</div>
          <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 12 }}>
            <Badge variant="primary">people_template.csv</Badge>
            <Badge variant="primary">skills_template.csv</Badge>
            <Badge variant="primary">certs_template.csv</Badge>
          </div>
        </div>
      </div>

      {/* Workstreams */}
      <div style={{ background: COLORS.card, borderRadius: 12, padding: 20, border: `1px solid ${COLORS.border}`, marginBottom: 16 }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: COLORS.text, margin: "0 0 12px", display: "flex", alignItems: "center", gap: 8 }}>
          <Building2 size={16} color={COLORS.primary} /> Workstreams
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {WORKSTREAMS.map(ws => (
            <div key={ws.id} style={{
              padding: "12px 16px", borderRadius: 8,
              background: ws.active ? "#E0F2FE" : COLORS.surfaceAlt,
              border: `1px solid ${ws.active ? "#BAE6FD" : COLORS.border}`,
              opacity: ws.active ? 1 : 0.6,
            }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: ws.active ? COLORS.primary : COLORS.textMuted }}>{ws.name}</span>
                <Badge variant={ws.active ? "success" : "default"} size="xs">{ws.active ? "Active" : "Coming Soon"}</Badge>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Roles Master */}
      <div style={{ background: COLORS.card, borderRadius: 12, padding: 20, border: `1px solid ${COLORS.border}` }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: COLORS.text, margin: "0 0 12px", display: "flex", alignItems: "center", gap: 8 }}>
          <Briefcase size={16} color={COLORS.primary} /> Roles Master
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
          {ROLES.map(r => (
            <div key={r.id} style={{ padding: "8px 12px", borderRadius: 8, background: COLORS.surfaceAlt, border: `1px solid ${COLORS.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: COLORS.text }}>{r.name}</span>
              <Badge variant="primary" size="xs">{r.level}</Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ─── Add Person Form ───
  const renderAddPersonModal = () => {
    if (!showAddPerson) return null;
    return (
      <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 1000, display: "flex", justifyContent: "center", alignItems: "flex-start", paddingTop: 40 }}
        onClick={() => setShowAddPerson(false)}>
        <div style={{ background: COLORS.card, borderRadius: 16, width: 500, padding: 28, boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}
          onClick={e => e.stopPropagation()}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: COLORS.text }}>Add Team Member</h3>
            <button onClick={() => setShowAddPerson(false)} style={{ background: "none", border: "none", cursor: "pointer" }}><X size={18} /></button>
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
            <div>
              <label style={labelStyle}>First Name</label>
              <input style={inputStyle} placeholder="Arjun" />
            </div>
            <div>
              <label style={labelStyle}>Last Name</label>
              <input style={inputStyle} placeholder="Sharma" />
            </div>
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={labelStyle}>Email</label>
            <input style={inputStyle} placeholder="arjun.sharma@improzo.com" />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
            <div>
              <label style={labelStyle}>Role</label>
              <select style={inputStyle}>
                {ROLES.map(r => <option key={r.id}>{r.name}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Years of Experience</label>
              <input type="number" style={inputStyle} placeholder="5" />
            </div>
          </div>
          
          <div style={{ marginBottom: 12 }}>
            <label style={labelStyle}>Primary Skills (Max 3) <span style={{ color: COLORS.danger }}>*</span></label>
            <div style={{ fontSize: 10, color: COLORS.textMuted, marginBottom: 6 }}>Governance: Maximum 3 primary skills enforced</div>
            <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
              {SKILLS_MASTER.slice(0, 12).map(s => (
                <button key={s.id} style={{ padding: "3px 8px", borderRadius: 6, border: `1px solid ${COLORS.border}`, background: COLORS.surfaceAlt, fontSize: 10, cursor: "pointer", color: COLORS.text }}>
                  {s.name}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Upload Resume (PDF)</label>
            <div style={{ border: `2px dashed ${COLORS.border}`, borderRadius: 8, padding: 16, textAlign: "center", background: COLORS.surfaceAlt }}>
              <Upload size={18} color={COLORS.textLight} />
              <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 4 }}>Drop PDF or click to browse</div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
            <button onClick={() => setShowAddPerson(false)} style={{ ...btnStyle, background: COLORS.surfaceAlt, color: COLORS.text }}>Cancel</button>
            <button onClick={() => { setShowAddPerson(false); notify("Team member added successfully"); }} style={{ ...btnStyle, background: COLORS.primary, color: "#fff" }}>
              <Save size={13} /> Save Member
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════
  // MAIN LAYOUT
  // ═══════════════════════════════════
  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "'DM Sans', 'Segoe UI', system-ui, sans-serif", background: COLORS.surface, color: COLORS.text, overflow: "hidden" }}>
      {/* Sidebar */}
      <div style={{
        width: sidebarCollapsed ? 56 : 220, minWidth: sidebarCollapsed ? 56 : 220,
        background: COLORS.primaryDark, display: "flex", flexDirection: "column",
        transition: "all 0.25s ease", overflow: "hidden",
      }}>
        {/* Logo */}
        <div style={{ padding: sidebarCollapsed ? "16px 10px" : "16px 20px", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg, #00B4D8, #0F4C81)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Cpu size={16} color="#fff" />
          </div>
          {!sidebarCollapsed && (
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, color: "#fff", letterSpacing: -0.5 }}>IMPROZO</div>
              <div style={{ fontSize: 8, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: 1.5 }}>Skill Matrix</div>
            </div>
          )}
        </div>

        {/* Nav */}
        <div style={{ flex: 1, padding: "12px 8px" }}>
          {NAV_ITEMS.map(item => {
            const active = activeNav === item.id;
            return (
              <div key={item.id} onClick={() => setActiveNav(item.id)} style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: sidebarCollapsed ? "10px 12px" : "10px 14px",
                borderRadius: 8, cursor: "pointer", marginBottom: 2,
                background: active ? "rgba(0,180,216,0.15)" : "transparent",
                color: active ? "#00B4D8" : "rgba(255,255,255,0.55)",
                transition: "all 0.15s",
              }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.background = "transparent"; }}>
                <item.icon size={16} />
                {!sidebarCollapsed && <span style={{ fontSize: 12, fontWeight: active ? 700 : 500 }}>{item.label}</span>}
              </div>
            );
          })}
        </div>

        {/* Collapse */}
        <div style={{ padding: 8, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <div onClick={() => setSidebarCollapsed(!sidebarCollapsed)} style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            padding: "8px 0", borderRadius: 6, cursor: "pointer", color: "rgba(255,255,255,0.4)",
          }}>
            {sidebarCollapsed ? <ChevronRight size={14} /> : <><ChevronLeft size={14} /><span style={{ fontSize: 10 }}>Collapse</span></>}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Top Bar */}
        <div style={{ height: 52, background: COLORS.card, borderBottom: `1px solid ${COLORS.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: COLORS.text }}>
              {NAV_ITEMS.find(n => n.id === activeNav)?.label}
            </span>
            <Badge variant="primary" size="xs">Commercial Tech & Analytics</Badge>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: COLORS.primary, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 10, fontWeight: 700 }}>TR</div>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflow: "auto", padding: 24 }}>
          {activeNav === "dashboard" && renderDashboard()}
          {activeNav === "people" && renderPeople()}
          {activeNav === "skills" && renderSkillMatrix()}
          {activeNav === "projects" && renderProjects()}
          {activeNav === "analytics" && renderAnalytics()}
          {activeNav === "admin" && renderAdmin()}
        </div>
      </div>

      {/* Modals */}
      {renderPersonModal()}
      {renderAddPersonModal()}

      {/* Notification Toast */}
      {notification && (
        <div style={{
          position: "fixed", bottom: 20, right: 20, padding: "10px 20px", borderRadius: 10,
          background: notification.type === "success" ? COLORS.success : COLORS.danger,
          color: "#fff", fontSize: 12, fontWeight: 600, zIndex: 9999,
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)", display: "flex", alignItems: "center", gap: 8,
        }}>
          <CheckCircle size={14} /> {notification.msg}
        </div>
      )}
    </div>
  );
}

// ─── Shared Styles ───
const btnStyle = {
  display: "inline-flex", alignItems: "center", gap: 6,
  padding: "7px 14px", borderRadius: 8, border: "none",
  fontSize: 12, fontWeight: 600, cursor: "pointer",
  transition: "all 0.15s",
};

const selectStyle = {
  padding: "8px 12px", borderRadius: 8, border: `1px solid ${COLORS.border}`,
  fontSize: 12, background: COLORS.card, color: COLORS.text, cursor: "pointer", outline: "none",
};

const inputStyle = {
  width: "100%", padding: "8px 12px", borderRadius: 8, border: `1px solid ${COLORS.border}`,
  fontSize: 12, outline: "none", background: COLORS.card, boxSizing: "border-box",
};

const labelStyle = {
  display: "block", fontSize: 11, fontWeight: 600, color: COLORS.textMuted,
  marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.3,
};

const thStyle = {
  padding: "8px 10px", textAlign: "left", fontWeight: 700, color: COLORS.textMuted,
  fontSize: 9, textTransform: "uppercase", letterSpacing: 0.5,
  borderBottom: `1px solid ${COLORS.border}`, background: COLORS.surfaceAlt,
};
