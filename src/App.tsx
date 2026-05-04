import { useState, useMemo, useEffect, useRef } from "react";

const LANGS = {
  es:{ tag:"ES", flag:"🇪🇸", smartEnergy:"Energía Inteligente", title1:"CALCULA TU", title2:"AHORRO ENERGÉTICO", sub:"Diseña tu sistema solar y ve cuánto ahorras al mes.", step1:"Paso 1", step1t:"Tu factura actual", billLabel:"Factura mensual promedio", rateLabel:"Tarifa de energía (por kWh)", rateHint:"Colombia ≈ 620 COP · México ≈ 1.1 MXN · España ≈ 0.25 EUR", step2:"Paso 2", step2t:"Tus electrodomésticos", step2sub:"Selecciona cada equipo y personaliza su uso diario.", addBtn:"Agregar", removeBtn:"Quitar", hoursLabel:"Horas/día", qtyLabel:"Cant.", step3:"Paso 3", step3t:"Tu ubicación solar", pshLabel:"Horas de sol pico al día (HSP)", pshHint:"Colombia ≈ 4–5 · Costa/Llanos ≈ 5.5–6 · España ≈ 4.5–6", step4:"Paso 4", step4t:"Elige tu plan solar", planNote:"Recomendado según tu consumo. Puedes ajustar.", calcBtn:"⚡ VER MI AHORRO", err:"Ingresa tu factura mensual", savingsMonth:"Ahorro mensual estimado", savingsYear:"Ahorro anual", savings25:"Ahorro 25 años", coverageLbl:"Cobertura solar", genLbl:"Generación/mes", consumLbl:"Consumo/mes", paybackLbl:"Retorno inversión", costLbl:"Costo sistema", billBefore:"Factura actual", billAfter:"Factura con solar", envTitle:"🌱 Impacto ambiental", withoutSolar:"Sin paneles", withSolar:"Con EnerSolaris", trees:"Equivale a plantar", treesEnd:"árboles/año 🌳", reset:"← Recalcular", perMonth:"/ mes", consumDetail:"Resumen de consumo", planPanels:"paneles 500W", planGen:"Generación estimada", perDay:"/ día" },
  en:{ tag:"EN", flag:"🇺🇸", smartEnergy:"Smart Energy", title1:"CALCULATE YOUR", title2:"ENERGY SAVINGS", sub:"Design your solar system and see your monthly savings.", step1:"Step 1", step1t:"Your current bill", billLabel:"Average monthly bill", rateLabel:"Utility rate (per kWh)", rateHint:"US avg ≈ $0.13 · Hawaii ≈ $0.33 · NW ≈ $0.10", step2:"Step 2", step2t:"Your appliances", step2sub:"Select each device and customize daily usage.", addBtn:"Add", removeBtn:"Remove", hoursLabel:"Hours/day", qtyLabel:"Qty", step3:"Step 3", step3t:"Your solar location", pshLabel:"Peak sun hours per day (PSH)", pshHint:"SW US ≈ 6–7 · Midwest ≈ 4.5 · NE ≈ 3.5–4", step4:"Step 4", step4t:"Choose your solar plan", planNote:"Calculated from real consumption. Adjust manually.", calcBtn:"⚡ SEE MY SAVINGS", err:"Please enter your monthly bill", savingsMonth:"Estimated monthly savings", savingsYear:"Annual savings", savings25:"25-year savings", coverageLbl:"Solar coverage", genLbl:"Monthly generation", consumLbl:"Monthly usage", paybackLbl:"Payback period", costLbl:"System cost", billBefore:"Current bill", billAfter:"Bill with solar", envTitle:"🌱 Environmental impact", withoutSolar:"Without solar", withSolar:"With EnerSolaris", trees:"Equivalent to planting", treesEnd:"trees/year 🌳", reset:"← Recalculate", perMonth:"/ month", consumDetail:"Consumption summary", planPanels:"500W panels", planGen:"Estimated generation", perDay:"/ day" },
  pt:{ tag:"PT", flag:"🇧🇷", smartEnergy:"Energia Inteligente", title1:"CALCULE SUA", title2:"ECONOMIA DE ENERGIA", sub:"Projete seu sistema solar e veja quanto economiza por mês.", step1:"Passo 1", step1t:"Sua conta atual", billLabel:"Conta mensal média", rateLabel:"Tarifa de energia (por kWh)", rateHint:"Brasil ≈ R$0.70 · SP ≈ R$0.65 · RJ ≈ R$0.80", step2:"Passo 2", step2t:"Seus eletrodomésticos", step2sub:"Selecione cada equipamento e ajuste o uso diário.", addBtn:"Adicionar", removeBtn:"Remover", hoursLabel:"Horas/dia", qtyLabel:"Qtd", step3:"Passo 3", step3t:"Sua localização solar", pshLabel:"Horas de sol pico por dia", pshHint:"Nordeste ≈ 5.5–6.5 · Sudeste ≈ 4.5–5 · Sul ≈ 4–4.5", step4:"Passo 4", step4t:"Escolha seu plano solar", planNote:"Calculado pelo consumo real. Ajuste manualmente.", calcBtn:"⚡ VER MINHA ECONOMIA", err:"Insira sua conta mensal", savingsMonth:"Economia mensal estimada", savingsYear:"Economia anual", savings25:"Economia 25 anos", coverageLbl:"Cobertura solar", genLbl:"Geração/mês", consumLbl:"Consumo/mês", paybackLbl:"Retorno investimento", costLbl:"Custo sistema", billBefore:"Conta atual", billAfter:"Conta com solar", envTitle:"🌱 Impacto ambiental", withoutSolar:"Sem painéis", withSolar:"Com EnerSolaris", trees:"Equivale a plantar", treesEnd:"árvores/ano 🌳", reset:"← Recalcular", perMonth:"/ mês", consumDetail:"Resumo de consumo", planPanels:"painéis 500W", planGen:"Geração estimada", perDay:"/ dia" },
  fr:{ tag:"FR", flag:"🇫🇷", smartEnergy:"Énergie Intelligente", title1:"CALCULEZ VOS", title2:"ÉCONOMIES D'ÉNERGIE", sub:"Concevez votre système solaire et voyez vos économies mensuelles.", step1:"Étape 1", step1t:"Votre facture actuelle", billLabel:"Facture mensuelle moyenne", rateLabel:"Tarif électricité (par kWh)", rateHint:"France ≈ 0.25 EUR · Belgique ≈ 0.28 EUR · CH ≈ 0.21 CHF", step2:"Étape 2", step2t:"Vos appareils électriques", step2sub:"Sélectionnez chaque appareil et ajustez l'usage quotidien.", addBtn:"Ajouter", removeBtn:"Retirer", hoursLabel:"Heures/jour", qtyLabel:"Qté", step3:"Étape 3", step3t:"Votre ensoleillement", pshLabel:"Heures d'ensoleillement par jour", pshHint:"Sud France ≈ 5–6 · Paris ≈ 3.5–4 · Corse ≈ 5.5", step4:"Étape 4", step4t:"Choisissez votre plan solaire", planNote:"Calculé selon votre consommation réelle. Ajustez si besoin.", calcBtn:"⚡ VOIR MES ÉCONOMIES", err:"Entrez votre facture mensuelle", savingsMonth:"Économies mensuelles estimées", savingsYear:"Économies annuelles", savings25:"Économies sur 25 ans", coverageLbl:"Couverture solaire", genLbl:"Production/mois", consumLbl:"Consommation/mois", paybackLbl:"Retour investissement", costLbl:"Coût système", billBefore:"Facture actuelle", billAfter:"Facture avec solaire", envTitle:"🌱 Impact environnemental", withoutSolar:"Sans panneaux", withSolar:"Avec EnerSolaris", trees:"Équivalent à planter", treesEnd:"arbres/an 🌳", reset:"← Recalculer", perMonth:"/ mois", consumDetail:"Résumé consommation", planPanels:"panneaux 500W", planGen:"Production estimée", perDay:"/ jour" },
};

const CURRENCIES = {
  COP:{ symbol:"$", label:"COP", co2:0.126, systems:[18e6,28e6,40e6,55e6,75e6], defaultRate:620, rateMin:300, rateMax:1000, rateStep:10, dec:0 },
  USD:{ symbol:"$", label:"USD", co2:0.386, systems:[7500,12000,17000,24000,32000], defaultRate:0.13, rateMin:0.08, rateMax:0.35, rateStep:0.01, dec:2 },
  EUR:{ symbol:"€", label:"EUR", co2:0.233, systems:[6500,10500,15000,21000,28000], defaultRate:0.25, rateMin:0.10, rateMax:0.50, rateStep:0.01, dec:2 },
  MXN:{ symbol:"$", label:"MXN", co2:0.432, systems:[130e3,200e3,285e3,400e3,540e3], defaultRate:1.1, rateMin:0.5, rateMax:3.5, rateStep:0.1, dec:2 },
  BRL:{ symbol:"R$", label:"BRL", co2:0.074, systems:[35e3,55e3,78e3,110e3,148e3], defaultRate:0.70, rateMin:0.30, rateMax:1.20, rateStep:0.01, dec:2 },
  GBP:{ symbol:"£", label:"GBP", co2:0.193, systems:[5800,9200,13000,18500,25000], defaultRate:0.28, rateMin:0.10, rateMax:0.50, rateStep:0.01, dec:2 },
};

const PLANS = [2,3,5,7,10];

const APPLIANCE_CATS = [
  { id:"fridge", icon:"❄️", name:{es:"Nevera",en:"Refrigerator",pt:"Geladeira",fr:"Réfrigérateur"}, desc:{es:"Funciona 24h continuas. A mayor eficiencia energética, menor consumo.",en:"Runs 24h. More efficient models use less power.",pt:"Funciona 24h. Modelos eficientes consomem menos.",fr:"Fonctionne 24h. Les modèles efficaces consomment moins."}, subItems:[
    { label:{es:"Estándar 200–350L",en:"Standard 200–350L",pt:"Padrão 200–350L",fr:"Standard 200–350L"}, kw:0.18, defaultH:24 },
    { label:{es:"Grande / Side-by-side",en:"Large / Side-by-side",pt:"Grande / Side-by-side",fr:"Grand / Américain"}, kw:0.30, defaultH:24 },
  ]},
  { id:"ac", icon:"🌀", name:{es:"Aire Acondicionado",en:"Air Conditioner",pt:"Ar-condicionado",fr:"Climatiseur"}, desc:{es:"El mayor consumidor del hogar. Impacta directamente la factura mensual.",en:"Biggest home energy consumer. Directly impacts your bill.",pt:"Maior consumidor residencial.",fr:"Plus grand consommateur d'énergie du foyer."}, subItems:[
    { label:{es:"Mini Split 9000–12000 BTU",en:"Mini Split 9000–12000 BTU",pt:"Mini Split 9000–12000 BTU",fr:"Mini Split 9000–12000 BTU"}, kw:0.9, defaultH:8 },
    { label:{es:"Split 18000–24000 BTU",en:"Split 18000–24000 BTU",pt:"Split 18000–24000 BTU",fr:"Split 18000–24000 BTU"}, kw:1.8, defaultH:8 },
  ]},
  { id:"light", icon:"💡", name:{es:"Iluminación",en:"Lighting",pt:"Iluminação",fr:"Éclairage"}, desc:{es:"LED consume hasta 80% menos que bombillos tradicionales.",en:"LED uses up to 80% less than traditional bulbs.",pt:"LED consome até 80% menos.",fr:"LED consomme jusqu'à 80% de moins."}, subItems:[
    { label:{es:"LED — 10 puntos",en:"LED — 10 fixtures",pt:"LED — 10 pontos",fr:"LED — 10 points"}, kw:0.06, defaultH:6 },
    { label:{es:"Mixta LED + halógena",en:"Mixed LED + halogen",pt:"Mista LED + halógena",fr:"Mixte LED + halogène"}, kw:0.14, defaultH:6 },
  ]},
  { id:"tv", icon:"📺", name:{es:"TV y Entretenimiento",en:"TV & Entertainment",pt:"TV e Entretenimento",fr:"TV & Divertissement"}, desc:{es:"Incluye TV, decodificador, consola de videojuegos y router WiFi.",en:"Includes TV, decoder, gaming console and WiFi router.",pt:"Inclui TV, decodificador, console e roteador.",fr:"Comprend TV, décodeur, console et routeur."}, subItems:[
    { label:{es:"TV 40–55\" + router",en:"TV 40–55\" + router",pt:"TV 40–55\" + roteador",fr:"TV 40–55\" + routeur"}, kw:0.12, defaultH:6 },
    { label:{es:"TV 65\"+ home theater + consola",en:"TV 65\"+ home theater + console",pt:"TV 65\"+ home theater + console",fr:"TV 65\"+ home cinéma + console"}, kw:0.35, defaultH:5 },
  ]},
  { id:"washer", icon:"🫧", name:{es:"Lavadora / Secadora",en:"Washer / Dryer",pt:"Lavadora / Secadora",fr:"Lave-linge / Sèche-linge"}, desc:{es:"La secadora eléctrica consume 3× más que la lavadora sola.",en:"Electric dryer uses 3× more energy than washer alone.",pt:"Secadora consome 3× mais que a lavadora.",fr:"Sèche-linge électrique consomme 3× plus."}, subItems:[
    { label:{es:"Solo lavadora (carga frontal)",en:"Washer only (front load)",pt:"Só lavadora (frontal)",fr:"Lave-linge seul"}, kw:0.5, defaultH:1 },
    { label:{es:"Lavadora + secadora eléctrica",en:"Washer + electric dryer",pt:"Lavadora + secadora",fr:"Lave-linge + sèche-linge"}, kw:2.2, defaultH:1.5 },
  ]},
  { id:"shower", icon:"🚿", name:{es:"Ducha Eléctrica",en:"Electric Shower",pt:"Chuveiro Elétrico",fr:"Douche Électrique"}, desc:{es:"Alta potencia en corto tiempo. Muy común en Colombia y Brasil.",en:"High power, short time. Very common in Colombia & Brazil.",pt:"Alta potência, curto tempo. Muito comum no Brasil.",fr:"Haute puissance, courte durée."}, subItems:[
    { label:{es:"Estándar 4.5–5.5 kW",en:"Standard 4.5–5.5 kW",pt:"Padrão 4.5–5.5 kW",fr:"Standard 4.5–5.5 kW"}, kw:5.0, defaultH:0.25 },
    { label:{es:"Presurizada multitemp. 7+ kW",en:"Multi-temp pressurized 7+ kW",pt:"Multitemp pressurizada 7+ kW",fr:"Multi-températures 7+ kW"}, kw:7.5, defaultH:0.25 },
  ]},
  { id:"kitchen", icon:"🍳", name:{es:"Cocina / Microondas",en:"Stove / Microwave",pt:"Fogão / Microondas",fr:"Cuisinière / Micro-ondes"}, desc:{es:"La inducción y vitrocerámica son más eficientes que las espirales.",en:"Induction and ceramic are more efficient than coil burners.",pt:"Indução é mais eficiente que bocas de resistência.",fr:"L'induction est plus efficace que les plaques classiques."}, subItems:[
    { label:{es:"Microondas + pocillos eléctricos",en:"Microwave + electric burners",pt:"Microondas + bocas elétricas",fr:"Micro-ondes + plaques"}, kw:1.2, defaultH:1 },
    { label:{es:"Cocina inducción 4 puestos",en:"4-burner induction cooktop",pt:"Fogão indução 4 bocas",fr:"Plaque induction 4 feux"}, kw:3.5, defaultH:1.5 },
  ]},
  { id:"ev", icon:"🔋", name:{es:"Vehículo Eléctrico",en:"Electric Vehicle",pt:"Veículo Elétrico",fr:"Véhicule Électrique"}, desc:{es:"La carga nocturna puede aumentar tu factura hasta un 40%.",en:"Overnight charging can increase your bill by up to 40%.",pt:"Carga noturna pode aumentar a conta em até 40%.",fr:"La charge nocturne peut augmenter la facture de 40%."}, subItems:[
    { label:{es:"Moto eléctrica / scooter",en:"Electric motorcycle / scooter",pt:"Moto elétrica / scooter",fr:"Moto / scooter électrique"}, kw:0.8, defaultH:2 },
    { label:{es:"Auto eléctrico (cargador 7 kW)",en:"Electric car (7 kW charger)",pt:"Carro elétrico (carregador 7 kW)",fr:"Voiture électrique (chargeur 7 kW)"}, kw:7.0, defaultH:4 },
  ]},
  { id:"office", icon:"💻", name:{es:"Oficina / Computadores",en:"Office / Computers",pt:"Escritório / Computadores",fr:"Bureau / Ordinateurs"}, desc:{es:"Home office típico: PC, monitor, cargadores y periféricos conectados.",en:"Typical home office: PC, monitor, chargers and peripherals.",pt:"Home office: PC, monitor, carregadores e periféricos.",fr:"Bureau à domicile: PC, écran, chargeurs et périphériques."}, subItems:[
    { label:{es:"Laptop + monitor + periféricos",en:"Laptop + monitor + peripherals",pt:"Notebook + monitor + periféricos",fr:"Laptop + écran + périphériques"}, kw:0.20, defaultH:8 },
    { label:{es:"PC escritorio + 2 monitores",en:"Desktop PC + 2 monitors",pt:"PC desktop + 2 monitores",fr:"PC bureau + 2 écrans"}, kw:0.45, defaultH:8 },
  ]},
  { id:"pump", icon:"💧", name:{es:"Bomba de Agua / Piscina",en:"Water Pump / Pool",pt:"Bomba d'Água / Piscina",fr:"Pompe à Eau / Piscine"}, desc:{es:"Las bombas hidroneumáticas y de piscina consumen según sus ciclos.",en:"Hydropneumatic and pool pumps consume in cycles.",pt:"Bombas consomem por ciclos de funcionamento.",fr:"Les pompes consomment selon leurs cycles de fonctionnement."}, subItems:[
    { label:{es:"Bomba hidroneumática doméstica",en:"Domestic hydropneumatic pump",pt:"Bomba hidropneumática doméstica",fr:"Pompe hydropneumatique domestique"}, kw:0.75, defaultH:2 },
    { label:{es:"Bomba piscina / presión alta",en:"Pool pump / high pressure",pt:"Bomba piscina / alta pressão",fr:"Pompe piscine / haute pression"}, kw:1.5, defaultH:4 },
  ]},
];

const APPL_NAMES = { es: APPLIANCE_CATS.map(c=>c.name.es), en: APPLIANCE_CATS.map(c=>c.name.en), pt: APPLIANCE_CATS.map(c=>c.name.pt), fr: APPLIANCE_CATS.map(c=>c.name.fr) };

function fmtCur(n, cur) {
  const c = CURRENCIES[cur];
  const locale = ["COP","MXN"].includes(cur) ? "es-CO" : ["BRL"].includes(cur) ? "pt-BR" : "en-US";
  return c.symbol + new Intl.NumberFormat(locale, { maximumFractionDigits:0 }).format(Math.round(n));
}
function fmtN(n) { return new Intl.NumberFormat("en").format(Math.round(n)); }

function Logo({ size=48 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="sg"><stop offset="0%" stopColor="#FFD740"/><stop offset="100%" stopColor="#F5A623"/></radialGradient>
        <linearGradient id="pg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#5BC8F5"/><stop offset="100%" stopColor="#1E6FA8"/></linearGradient>
        <linearGradient id="lg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#8BC34A"/><stop offset="100%" stopColor="#33691E"/></linearGradient>
        <clipPath id="cc"><circle cx="100" cy="108" r="80"/></clipPath>
      </defs>
      <g clipPath="url(#cc)">
        {[0,1,2,3].map(row=>[-3,-2,-1,0,1,2,3].map(col=>{ const cx=100+col*22+(row%2)*11,cy=128+row*16,r=180-Math.abs(col)*15-row*8; if(r<40) return null; return <rect key={`${row}-${col}`} x={cx-9} y={cy-6} width={18} height={12} rx={2} fill="url(#pg)" opacity={0.8} stroke="#4FC3F7" strokeWidth={0.5}/>; }))}
      </g>
      <path d="M-18,-68 Q-55,-85 -62,-55 Q-45,-40 -18,-52 Z" transform="translate(100,108)" fill="url(#lg)" stroke="#2E7D32" strokeWidth="0.8"/>
      <path d="M18,-68 Q55,-85 62,-55 Q45,-40 18,-52 Z" transform="translate(100,108)" fill="url(#lg)" stroke="#2E7D32" strokeWidth="0.8"/>
      <path d="M100,40 Q100,75 100,75" stroke="#33691E" strokeWidth="3" fill="none"/>
      <circle cx="100" cy="82" r="26" fill="url(#sg)"/>
      <text x="100" y="90" textAnchor="middle" fill="white" fontWeight="900" fontSize="22" fontFamily="Arial,sans-serif">E</text>
      <circle cx="100" cy="108" r="80" fill="none" stroke="rgba(91,200,245,0.25)" strokeWidth="1.5"/>
    </svg>
  );
}

// Dropdown accesible con cierre al click fuera
function Dropdown({ label, items, onSelect, active }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  useEffect(() => {
    const h = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  return (
    <div ref={ref} style={{ position:"relative" }}>
      <button
        onClick={() => setOpen(p => !p)}
        style={{ background: open ? "rgba(245,166,35,0.18)" : "#1A1F2B", border:`1px solid ${open?"#F5A623":"rgba(255,255,255,0.14)"}`, color:"#E8EAF0", borderRadius:8, padding:"8px 12px", cursor:"pointer", fontFamily:"inherit", fontWeight:700, fontSize:13, display:"flex", alignItems:"center", gap:5, whiteSpace:"nowrap", minWidth:0 }}
      >
        {label} <span style={{ fontSize:10, opacity:0.7 }}>▾</span>
      </button>
      {open && (
        <div style={{ position:"absolute", top:"calc(100% + 5px)", right:0, background:"#1A1F2B", border:"1px solid rgba(255,255,255,0.14)", borderRadius:10, overflow:"hidden", zIndex:999, minWidth:140, boxShadow:"0 8px 24px rgba(0,0,0,0.5)" }}>
          {items.map((item, i) => (
            <div key={i}
              onClick={() => { onSelect(item.value); setOpen(false); }}
              style={{ padding:"10px 14px", cursor:"pointer", fontSize:13, fontWeight: item.active ? 700 : 400, background: item.active ? "rgba(245,166,35,0.12)" : "transparent", color: item.active ? "#F5A623" : "#E8EAF0", display:"flex", alignItems:"center", gap:8 }}
            >
              {item.icon && <span style={{ fontSize:14 }}>{item.icon}</span>}
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState("es");
  const [cur, setCur]   = useState("COP");
  const [bill, setBill] = useState("");
  const [rate, setRate] = useState(620);
  const [hsp, setHsp]   = useState(4.5);
  const [planIdx, setPlanIdx] = useState(1);
  const [results, setResults] = useState(null);
  const [error, setError]     = useState("");
  const [selected, setSelected] = useState([]);

  const L = LANGS[lang];
  const C = CURRENCIES[cur];

  const consumoFactura = useMemo(() => { const f=parseFloat(bill); return (!f||!rate)?0:f/rate; }, [bill,rate]);
  const consumoAppliance = useMemo(() => selected.reduce((a,s) => { const cat=APPLIANCE_CATS.find(c=>c.id===s.catId); const sub=cat?.subItems[s.subIdx]; return sub ? a+sub.kw*s.hours*s.qty*30 : a; }, 0), [selected]);
  const consumoTotal = useMemo(() => Math.max(consumoFactura, consumoAppliance, 1), [consumoFactura, consumoAppliance]);
  const genMes       = useMemo(() => PLANS[planIdx]*hsp*30*0.8, [planIdx,hsp]);
  const planRec      = useMemo(() => { const k=(consumoTotal/30)/(hsp*0.8); const i=PLANS.findIndex(p=>p>=k); return i<0?PLANS.length-1:i; }, [consumoTotal,hsp]);

  const switchCur  = c  => { setCur(c); setRate(CURRENCIES[c].defaultRate); setBill(""); setResults(null); };
  const switchLang = l  => setLang(l);

  const addA = (catId, si) => setSelected(p => { if(p.find(x=>x.catId===catId&&x.subIdx===si)) return p; const cat=APPLIANCE_CATS.find(c=>c.id===catId); const sub=cat.subItems[si]; return [...p,{catId,subIdx:si,hours:sub.defaultH,qty:1}]; });
  const remA = (catId, si) => setSelected(p => p.filter(x=>!(x.catId===catId&&x.subIdx===si)));
  const updH = (catId, si, v) => setSelected(p => p.map(x=>x.catId===catId&&x.subIdx===si?{...x,hours:Math.max(0.1,parseFloat(v)||0.1)}:x));
  const updQ = (catId, si, v) => setSelected(p => p.map(x=>x.catId===catId&&x.subIdx===si?{...x,qty:Math.max(1,parseInt(v)||1)}:x));

  const calcular = () => {
    const f=parseFloat(bill);
    if(!f||f<=0){ setError(L.err); return; }
    setError("");
    const cobertura   = Math.min((genMes/consumoTotal)*100, 95);
    const ahorroMes   = f*(cobertura/100);
    const billAfter   = f-ahorroMes;
    const ahorroAnual = ahorroMes*12;
    const ahorro25    = ahorroAnual*25;
    const precioBase  = C.systems[planIdx];
    const payback     = precioBase/ahorroAnual;
    const co2Antes    = consumoTotal*12*C.co2;
    const co2Despues  = co2Antes*(1-cobertura/100);
    const arboles     = Math.round((co2Antes-co2Despues)/21);
    const paneles     = Math.ceil(PLANS[planIdx]/0.5);
    setResults({ cobertura, ahorroMes, billAfter, ahorroAnual, ahorro25, payback, consumoTotal, genMes, co2Antes, co2Despues, arboles, precioBase, paneles, kwp:PLANS[planIdx], billOrig:f });
  };

  const G = { // design tokens
    bg:"#0B0E13", surface:"#1A1F2B", deep:"#141820", border:"rgba(255,255,255,0.08)",
    gold:"#F5A623", green:"#22C55E", red:"#EF4444", blue:"#5BC8F5",
    text:"#E8EAF0", muted:"#9CA3AF", dim:"#6B7280",
  };

  const card = { background:G.surface, border:`1px solid rgba(245,166,35,0.13)`, borderRadius:14, padding:"18px 14px", marginBottom:10 };
  const mCard = { background:G.surface, border:`1px solid rgba(245,166,35,0.12)`, borderRadius:12, padding:"12px 8px", textAlign:"center" };

  const rateStr = C.dec===0 ? `${C.symbol}${Math.round(rate)}` : `${C.symbol}${rate.toFixed(C.dec)}`;

  return (
    <div style={{ background:G.bg, minHeight:"100vh", fontFamily:"'DM Sans',system-ui,sans-serif", color:G.text, padding:"16px 12px 64px", boxSizing:"border-box" }}>
    <div style={{ maxWidth:700, margin:"0 auto" }}>

      {/* ── TOP BAR ── */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16, gap:8, flexWrap:"nowrap" }}>
        {/* Logo */}
        <div style={{ display:"flex", alignItems:"center", gap:9, minWidth:0, flexShrink:1 }}>
          <Logo size={44}/>
          <div style={{ minWidth:0 }}>
            <div style={{ fontWeight:900, fontSize:15, color:"#FFF", letterSpacing:2, lineHeight:1, whiteSpace:"nowrap" }}>ENERSOLARIS</div>
            <div style={{ fontSize:8, fontWeight:600, letterSpacing:2, color:G.blue, textTransform:"uppercase" }}>{L.smartEnergy}</div>
          </div>
        </div>
        {/* Controls — nunca se envuelven */}
        <div style={{ display:"flex", gap:6, flexShrink:0 }}>
          <Dropdown
            label={`💱 ${cur}`}
            items={Object.keys(CURRENCIES).map(c=>({ value:c, label:`${CURRENCIES[c].symbol} ${CURRENCIES[c].label}`, active:c===cur }))}
            onSelect={switchCur}
          />
          <Dropdown
            label={`${LANGS[lang].flag} ${LANGS[lang].tag}`}
            items={Object.keys(LANGS).map(l=>({ value:l, label:`${LANGS[l].flag} ${LANGS[l].tag}`, active:l===lang }))}
            onSelect={switchLang}
          />
        </div>
      </div>

      {/* ── TÍTULO ── */}
      <h1 style={{ fontSize:"clamp(24px,6vw,46px)", fontWeight:900, lineHeight:1.05, marginBottom:6, margin:"0 0 6px" }}>
        {L.title1}<br/><span style={{ color:G.gold }}>{L.title2}</span>
      </h1>
      <p style={{ color:G.dim, fontSize:13, marginBottom:24, margin:"0 0 24px" }}>{L.sub}</p>

      {!results ? (<>

        {/* PASO 1 */}
        <div style={card}>
          <div style={{ fontSize:9, fontWeight:700, letterSpacing:2, textTransform:"uppercase", color:G.gold, marginBottom:3 }}>{L.step1}</div>
          <div style={{ fontWeight:800, fontSize:15, marginBottom:14 }}>{L.step1t}</div>
          <label style={{ fontSize:11, color:G.muted, display:"block", marginBottom:5 }}>{L.billLabel}</label>
          <div style={{ display:"flex", alignItems:"center", background:G.deep, border:`1px solid ${G.border}`, borderRadius:10, overflow:"hidden" }}>
            <span style={{ padding:"0 10px", fontSize:12, fontWeight:700, color:G.gold, background:"rgba(245,166,35,0.1)", borderRight:`1px solid ${G.border}`, alignSelf:"stretch", display:"flex", alignItems:"center", whiteSpace:"nowrap" }}>{C.label}</span>
            <input style={{ flex:1, background:"transparent", border:"none", outline:"none", color:G.text, fontFamily:"inherit", fontSize:18, fontWeight:600, padding:"11px 10px", minWidth:0 }} type="number" placeholder="..." value={bill} onChange={e=>setBill(e.target.value)}/>
            <span style={{ padding:"0 10px", fontSize:11, color:G.dim, borderLeft:`1px solid ${G.border}`, whiteSpace:"nowrap" }}>{L.perMonth}</span>
          </div>
          {consumoFactura>0 && (
            <div style={{ background:"rgba(245,166,35,0.07)", border:"1px solid rgba(245,166,35,0.18)", borderRadius:8, padding:"8px 11px", marginTop:8, fontSize:12 }}>
              <span style={{ color:G.muted }}>≈ </span>
              <span style={{ fontWeight:700, color:G.gold }}>{fmtN(consumoFactura)} kWh/mes</span>
              <span style={{ color:G.dim }}> · {(consumoFactura/30).toFixed(1)} kWh/día</span>
            </div>
          )}
          <div style={{ marginTop:14 }}>
            <label style={{ fontSize:11, color:G.muted, display:"block", marginBottom:5 }}>{L.rateLabel}</label>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <input type="range" min={C.rateMin} max={C.rateMax} step={C.rateStep} value={rate} onChange={e=>setRate(+e.target.value)} style={{ flex:1, accentColor:G.gold, minWidth:0 }}/>
              <span style={{ minWidth:72, textAlign:"right", fontWeight:700, fontSize:13, color:G.gold, flexShrink:0 }}>{rateStr}/kWh</span>
            </div>
            <p style={{ fontSize:10, color:G.dim, marginTop:4 }}>📍 {L.rateHint}</p>
          </div>
        </div>

        {/* PASO 2 */}
        <div style={card}>
          <div style={{ fontSize:9, fontWeight:700, letterSpacing:2, textTransform:"uppercase", color:G.gold, marginBottom:3 }}>{L.step2}</div>
          <div style={{ fontWeight:800, fontSize:15, marginBottom:4 }}>{L.step2t}</div>
          <p style={{ fontSize:11, color:G.dim, marginBottom:10 }}>{L.step2sub}</p>

          {APPLIANCE_CATS.map(cat => {
            const selCount = cat.subItems.filter((_,si)=>selected.some(s=>s.catId===cat.id&&s.subIdx===si)).length;
            return (
              <div key={cat.id} style={{ background:G.deep, border:`1px solid ${G.border}`, borderRadius:11, marginBottom:7, overflow:"hidden" }}>
                <div style={{ display:"flex", alignItems:"center", gap:9, padding:"11px 13px" }}>
                  <span style={{ fontSize:20 }}>{cat.icon}</span>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontWeight:700, fontSize:13 }}>{cat.name[lang]}</div>
                    <div style={{ fontSize:10, color:G.dim, lineHeight:1.4, marginTop:1 }}>{cat.desc[lang]}</div>
                  </div>
                  {selCount>0 && <span style={{ fontSize:10, background:"rgba(34,197,94,0.12)", color:G.green, border:"1px solid rgba(34,197,94,0.3)", borderRadius:5, padding:"2px 7px", flexShrink:0 }}>✓ {selCount}</span>}
                </div>
                {cat.subItems.map((sub, si) => {
                  const sel = selected.find(s=>s.catId===cat.id&&s.subIdx===si);
                  return (
                    <div key={si} style={{ borderTop:`1px solid rgba(255,255,255,0.04)`, padding:"8px 13px" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>
                        <span style={{ flex:1, fontSize:12, color:"#C9CDD5", minWidth:100 }}>{sub.label[lang]}</span>
                        <span style={{ fontSize:10, color:G.dim, whiteSpace:"nowrap" }}>{sub.kw} kW</span>
                        <button
                          onClick={()=>sel?remA(cat.id,si):addA(cat.id,si)}
                          style={{ background:sel?"rgba(34,197,94,0.12)":"rgba(245,166,35,0.1)", border:`1px solid ${sel?"rgba(34,197,94,0.35)":"rgba(245,166,35,0.4)"}`, color:sel?G.green:G.gold, borderRadius:7, padding:"4px 10px", fontSize:11, fontWeight:700, cursor:"pointer", whiteSpace:"nowrap", flexShrink:0 }}
                        >{sel ? `✓ ${L.removeBtn}` : `+ ${L.addBtn}`}</button>
                      </div>
                      {sel && (
                        <div style={{ display:"flex", gap:12, marginTop:6, alignItems:"center", flexWrap:"wrap" }}>
                          <div style={{ display:"flex", alignItems:"center", gap:5 }}>
                            <span style={{ fontSize:10, color:G.muted }}>{L.hoursLabel}:</span>
                            <input style={{ background:G.bg, border:`1px solid ${G.border}`, color:G.text, borderRadius:6, padding:"3px 6px", width:50, fontSize:12, fontFamily:"inherit", textAlign:"center" }} type="number" min="0.1" max="24" step="0.25" value={sel.hours} onChange={e=>updH(cat.id,si,e.target.value)}/>
                          </div>
                          <div style={{ display:"flex", alignItems:"center", gap:5 }}>
                            <span style={{ fontSize:10, color:G.muted }}>{L.qtyLabel}:</span>
                            <input style={{ background:G.bg, border:`1px solid ${G.border}`, color:G.text, borderRadius:6, padding:"3px 6px", width:40, fontSize:12, fontFamily:"inherit", textAlign:"center" }} type="number" min="1" max="10" step="1" value={sel.qty} onChange={e=>updQ(cat.id,si,e.target.value)}/>
                          </div>
                          <span style={{ fontSize:11, color:G.gold, fontWeight:600 }}>≈ {fmtN(sub.kw*sel.hours*sel.qty*30)} kWh/mes</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}

          {selected.length>0 && (
            <div style={{ background:"rgba(245,166,35,0.07)", border:"1px solid rgba(245,166,35,0.2)", borderRadius:10, padding:"11px 13px", marginTop:4 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
                <span style={{ fontSize:11, color:G.muted }}>{L.consumDetail}</span>
                <span style={{ fontWeight:700, color:G.gold, fontSize:13 }}>{fmtN(consumoAppliance)} kWh/mes</span>
              </div>
              {selected.map(s => {
                const cat=APPLIANCE_CATS.find(c=>c.id===s.catId); const sub=cat?.subItems[s.subIdx]; if(!sub) return null;
                const kwh=sub.kw*s.hours*s.qty*30; const pct=consumoAppliance>0?Math.round(kwh/consumoAppliance*100):0;
                return (
                  <div key={`${s.catId}-${s.subIdx}`} style={{ marginBottom:6 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", fontSize:10, color:G.muted, marginBottom:2 }}>
                      <span>{cat.icon} {sub.label[lang]}</span>
                      <span style={{ color:G.text }}>{fmtN(kwh)} kWh · {pct}%</span>
                    </div>
                    <div style={{ height:5, background:"#1E2430", borderRadius:3, overflow:"hidden" }}>
                      <div style={{ height:"100%", width:`${pct}%`, background:G.gold, borderRadius:3 }}/>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* PASO 3 */}
        <div style={card}>
          <div style={{ fontSize:9, fontWeight:700, letterSpacing:2, textTransform:"uppercase", color:G.gold, marginBottom:3 }}>{L.step3}</div>
          <div style={{ fontWeight:800, fontSize:15, marginBottom:12 }}>{L.step3t}</div>
          <label style={{ fontSize:11, color:G.muted, display:"block", marginBottom:5 }}>{L.pshLabel}</label>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <input type="range" min="3" max="7" step="0.1" value={hsp} onChange={e=>setHsp(+e.target.value)} style={{ flex:1, accentColor:G.gold, minWidth:0 }}/>
            <span style={{ minWidth:50, textAlign:"right", fontWeight:700, fontSize:14, color:G.gold, flexShrink:0 }}>{hsp.toFixed(1)} h</span>
          </div>
          <p style={{ fontSize:10, color:G.dim, marginTop:4 }}>☀️ {L.pshHint}</p>
        </div>

        {/* PASO 4 — PLAN */}
        <div style={card}>
          <div style={{ fontSize:9, fontWeight:700, letterSpacing:2, textTransform:"uppercase", color:G.gold, marginBottom:3 }}>{L.step4}</div>
          <div style={{ fontWeight:800, fontSize:15, marginBottom:4 }}>{L.step4t}</div>
          <p style={{ fontSize:10, color:G.dim, marginBottom:10 }}>{L.planNote}</p>
          {/* Botones de plan — 2 columnas en mobile */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(100px,1fr))", gap:6 }}>
            {PLANS.map((kw,i) => {
              const gen=kw*hsp*30*0.8; const cov=Math.min(gen/Math.max(consumoTotal,1)*100,95); const isRec=i===planRec; const isAct=i===planIdx;
              return (
                <button key={i} onClick={()=>setPlanIdx(i)} style={{ background:isAct?G.gold:isRec?"rgba(245,166,35,0.08)":G.deep, border:`1px solid ${isAct?G.gold:isRec?"rgba(245,166,35,0.4)":G.border}`, color:isAct?"#0B0E13":isRec?G.gold:G.muted, borderRadius:10, padding:"10px 6px", cursor:"pointer", textAlign:"center", fontFamily:"inherit", transition:"all 0.15s" }}>
                  <div style={{ fontWeight:900, fontSize:18 }}>{kw}</div>
                  <div style={{ fontSize:9, marginTop:1 }}>kWp</div>
                  <div style={{ fontSize:9, marginTop:1, fontWeight:700, color:isAct?"#0B0E13":G.green }}>{Math.round(cov)}%</div>
                  {isRec && <div style={{ fontSize:8, fontWeight:700, background:isAct?"rgba(0,0,0,0.15)":"rgba(245,166,35,0.15)", color:isAct?"#0B0E13":G.gold, borderRadius:3, padding:"1px 4px", marginTop:3 }}>★ REC</div>}
                </button>
              );
            })}
          </div>
          <div style={{ background:"rgba(245,166,35,0.07)", border:"1px solid rgba(245,166,35,0.18)", borderRadius:8, padding:"9px 11px", marginTop:9, display:"flex", flexWrap:"wrap", gap:"6px 16px" }}>
            <span style={{ fontSize:11 }}><span style={{ color:G.muted }}>kWp: </span><span style={{ fontWeight:700, color:G.gold }}>{PLANS[planIdx]}</span></span>
            <span style={{ fontSize:11 }}><span style={{ color:G.muted }}>{L.planPanels}: </span><span style={{ fontWeight:700, color:G.text }}>{Math.ceil(PLANS[planIdx]/0.5)}</span></span>
            <span style={{ fontSize:11 }}><span style={{ color:G.muted }}>{L.planGen}: </span><span style={{ fontWeight:700, color:G.green }}>{fmtN(genMes)} kWh/mes</span></span>
            <span style={{ fontSize:11 }}><span style={{ color:G.muted }}>{L.perDay}: </span><span style={{ fontWeight:700, color:G.green }}>{(genMes/30).toFixed(1)} kWh</span></span>
          </div>
        </div>

        {error && <p style={{ color:G.red, fontSize:12, margin:"4px 0 8px" }}>⚠️ {error}</p>}
        <button onClick={calcular} style={{ width:"100%", padding:14, background:G.gold, color:"#0B0E13", fontWeight:800, fontSize:15, border:"none", borderRadius:12, cursor:"pointer", boxShadow:"0 4px 20px rgba(245,166,35,0.35)", letterSpacing:1 }}>{L.calcBtn}</button>

      </>) : (<>

        {/* RESULTADO */}
        <div style={{ background:"linear-gradient(135deg,rgba(245,166,35,0.13),rgba(245,166,35,0.04))", border:"1px solid rgba(245,166,35,0.35)", borderRadius:14, padding:"22px 14px", marginBottom:10, textAlign:"center" }}>
          <div style={{ fontSize:10, color:G.dim, marginBottom:3, letterSpacing:2, textTransform:"uppercase" }}>{L.savingsMonth}</div>
          <div style={{ fontSize:"clamp(34px,10vw,62px)", fontWeight:900, color:G.gold, lineHeight:1 }}>{fmtCur(results.ahorroMes,cur)}</div>
          <div style={{ fontSize:11, color:G.dim, marginTop:4 }}>{L.coverageLbl}: <span style={{ color:G.green, fontWeight:700 }}>{Math.round(results.cobertura)}%</span></div>
        </div>

        {/* Antes / Después */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:10 }}>
          <div style={{ ...mCard, border:"1px solid rgba(239,68,68,0.3)" }}>
            <div style={{ fontSize:10, color:G.muted, marginBottom:4 }}>{L.billBefore}</div>
            <div style={{ fontWeight:800, fontSize:18, color:G.red }}>{fmtCur(results.billOrig,cur)}</div>
            <div style={{ fontSize:10, color:G.dim }}>{L.perMonth}</div>
          </div>
          <div style={{ ...mCard, border:"1px solid rgba(34,197,94,0.3)" }}>
            <div style={{ fontSize:10, color:G.muted, marginBottom:4 }}>{L.billAfter}</div>
            <div style={{ fontWeight:800, fontSize:18, color:G.green }}>{fmtCur(results.billAfter,cur)}</div>
            <div style={{ fontSize:10, color:G.dim }}>{L.perMonth}</div>
          </div>
        </div>

        {/* Métricas 3 col */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8, marginBottom:10 }}>
          {[
            { val:fmtCur(results.ahorroAnual,cur), lbl:L.savingsYear, c:G.gold },
            { val:fmtCur(results.ahorro25,cur), lbl:L.savings25, c:G.green },
            { val:results.payback.toFixed(1)+" yr", lbl:L.paybackLbl, c:G.blue },
            { val:fmtN(results.consumoTotal)+" kWh", lbl:L.consumLbl, c:G.gold },
            { val:fmtN(results.genMes)+" kWh", lbl:L.genLbl, c:G.green },
            { val:fmtCur(results.precioBase,cur), lbl:L.costLbl, c:G.muted },
          ].map((m,i) => (
            <div key={i} style={mCard}>
              <div style={{ fontWeight:800, fontSize:14, color:m.c, marginBottom:2 }}>{m.val}</div>
              <div style={{ fontSize:10, color:G.dim, lineHeight:1.3 }}>{m.lbl}</div>
            </div>
          ))}
        </div>

        {/* Barras */}
        <div style={{ ...card, padding:"14px" }}>
          {[
            { lbl:L.consumLbl, val:fmtN(results.consumoTotal)+" kWh", pct:100, color:G.red },
            { lbl:L.genLbl, val:fmtN(results.genMes)+" kWh", pct:Math.min(results.genMes/results.consumoTotal*100,100), color:G.green },
          ].map((b,i)=>(
            <div key={i} style={{ marginBottom:10 }}>
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, color:G.dim, marginBottom:3 }}>
                <span>{b.lbl}</span><span style={{ color:G.text }}>{b.val}</span>
              </div>
              <div style={{ height:9, background:"#1E2430", borderRadius:5, overflow:"hidden" }}>
                <div style={{ height:"100%", width:`${b.pct}%`, background:b.color, borderRadius:5 }}/>
              </div>
            </div>
          ))}

          <div style={{ borderTop:`1px solid ${G.border}`, paddingTop:12, marginTop:4 }}>
            <div style={{ fontWeight:700, fontSize:13, marginBottom:10 }}>{L.envTitle}</div>
            {[
              { lbl:L.withoutSolar, val:`${fmtN(results.co2Antes)} kg CO₂`, pct:100, color:G.red },
              { lbl:L.withSolar, val:`${fmtN(results.co2Despues)} kg CO₂`, pct:Math.round(100-results.cobertura), color:G.green },
            ].map((b,i)=>(
              <div key={i} style={{ marginBottom:8 }}>
                <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, color:G.dim, marginBottom:3 }}>
                  <span>{b.lbl}</span><span style={{ color:G.text }}>{b.val}</span>
                </div>
                <div style={{ height:9, background:"#1E2430", borderRadius:5, overflow:"hidden" }}>
                  <div style={{ height:"100%", width:`${b.pct}%`, background:b.color, borderRadius:5 }}/>
                </div>
              </div>
            ))}
            <p style={{ fontSize:11, color:G.dim, marginTop:8 }}>{L.trees} <strong style={{ color:G.green }}>{fmtN(results.arboles)}</strong> {L.treesEnd}</p>
          </div>
        </div>

        {/* Sistema elegido */}
        <div style={{ ...card, display:"flex", gap:12, alignItems:"center", flexWrap:"wrap" }}>
          <div style={{ background:G.gold, color:"#0B0E13", fontWeight:900, fontSize:20, borderRadius:10, padding:"10px 14px", whiteSpace:"nowrap" }}>{results.kwp} kWp</div>
          <div>
            <div style={{ fontWeight:700, fontSize:14, marginBottom:3 }}>{results.paneles} {L.planPanels}</div>
            <div style={{ fontSize:12, color:G.dim }}>{L.genLbl}: <span style={{ color:G.green, fontWeight:600 }}>{fmtN(results.genMes)} kWh/mes</span> · {L.coverageLbl}: <span style={{ color:G.green, fontWeight:600 }}>{Math.round(results.cobertura)}%</span></div>
          </div>
        </div>

        <button onClick={()=>setResults(null)} style={{ width:"100%", background:"transparent", border:`1px solid ${G.border}`, color:G.dim, fontFamily:"inherit", fontSize:12, padding:"9px", borderRadius:8, cursor:"pointer", marginTop:4 }}>{L.reset}</button>
      </>)}

    </div>
    </div>
  );
}