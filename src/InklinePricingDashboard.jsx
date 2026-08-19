import { useState, useMemo, useEffect, useRef } from "react";

// ═══════════════════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════════════════
const QTY_TIERS  = [12,25,50,75,100,144,200,300,500,750,1000,2500,5000,10000];
const COLOR_COLS = [1,2,3,4,5,6,7,8,9,10,11,12];
const LOGO_B64 = "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";
const LOGO_MIME = "image/png";

const C = {
  bg:"#080808",surface:"#111111",surface2:"#181818",surface3:"#222222",
  border:"#2a2a2a",borderHi:"#3d3d3d",
  red:"#E01E37",redDim:"#6e0e1c",redGlow:"rgba(224,30,55,0.14)",
  gold:"#C9963A",goldDim:"rgba(201,150,58,0.10)",
  text:"#F0F0F0",dim:"#888",muted:"#484848",
  inBg:"#0e0e1e",outBg:"#0a1a0a",outText:"#5fcf5f",
  success:"#22c55e",danger:"#ef4444",
};

// ═══════════════════════════════════════════════════════════════════════
// DEFAULT STATE
// ═══════════════════════════════════════════════════════════════════════
const DEFAULT_PROD = {
  timePerHPT:2, inkCostPerColor:0.07, lightingCost:0, screenCost:15,
  laborCostPerHr:138, wageCostPerHr:27,
  reclaimMin:9, screenRoomMin:9, designMin:12, pantoneMin:9,
  pressOperatorPPH:250, pressAssistPPH:250, catchersPPH:250, shippingHrs:0.25,
};

const BLANK_IMPRINTS = [
  {colors:1,pieces:12},{colors:3,pieces:24},{colors:2,pieces:30},{colors:8,pieces:40},
  {colors:4,pieces:50},{colors:6,pieces:60},{colors:1,pieces:70},{colors:3,pieces:1000},
];

const DEFAULT_ORDER = {
  customer:"", project:"",
  totalImprints:1, imprints:BLANK_IMPRINTS,
  postProdHrs:0, specialtyInkType:"tshirts",
  date: new Date().toISOString().split("T")[0],
};

const DEFAULT_SERVICES = {
  foldBagTag:1.7, sizeTagging:1.7, pantoneColor:15.75,
  colorChange:10.5, vectorFee:25, filePrep:10, allOtherWork:60,
};

const DEFAULT_LABOR_RATES = {
  retail:138, retailPromo:125, business:95,
  businessPromo:90, contractSize:75, contractSizeNew:60, rush:400,
};

const DEFAULT_LOSS = {
  byoNonTshirt: { loss:0.1,  premFee:0,    label:"BYO - Non-T-Shirt" },
  byoTshirt:    { loss:0.1,  premFee:0,    label:"BYO - T-Shirt" },
  nonApparel:   { loss:0.3,  premFee:0.31, label:"Non-Apparel" },
  specialtyApp: { loss:0.5,  premFee:1.22, label:"Specialty Apparel" },
  sweatshirts:  { loss:0.5,  premFee:1.22, label:"Sweatshirts" },
  tshirts:      { loss:0.1,  premFee:0,    label:"T-Shirts" },
};

// ═══════════════════════════════════════════════════════════════════════
// COMPUTATION ENGINE  — verified against spreadsheet
// ═══════════════════════════════════════════════════════════════════════
function computeAll(order, prod, lossAllowances) {
  const { laborCostPerHr, wageCostPerHr, inkCostPerColor, lightingCost, screenCost,
    reclaimMin, screenRoomMin, designMin, pantoneMin,
    pressOperatorPPH, pressAssistPPH, catchersPPH, shippingHrs, timePerHPT } = prod;

  const totalCostPerHr    = laborCostPerHr + wageCostPerHr;             // 165
  const setupTimePerColor = (reclaimMin+screenRoomMin+designMin+pantoneMin)/60; // 0.65
  const pressTimePerItem  = 1/pressOperatorPPH+1/pressAssistPPH+1/catchersPPH; // 0.012
  const additionalTime    = shippingHrs;                                  // 0.25

  // Core per-imprint charge formula (matches spreadsheet D5 formula exactly)
  function imprintCharge(pieces, colors, rate=totalCostPerHr) {
    if (!pieces || pieces<=0) return 0;
    return (pieces*pressTimePerItem + colors*setupTimePerColor + additionalTime)*rate
         + inkCostPerColor*pieces*colors + lightingCost*pieces + screenCost*colors;
  }

  // Items-per-color table  (S5:T16 formula)
  const divisor   = timePerHPT/60 - pressTimePerItem;
  const itemsTable = COLOR_COLS.map(c => ({
    colors:c,
    items: divisor>0 ? Math.ceil((setupTimePerColor*c+additionalTime)/divisor) : "∞",
  }));

  // Full pricing matrix (B5:O18)
  const matrix = QTY_TIERS.map(qty => ({
    qty, prices: COLOR_COLS.map(c => imprintCharge(qty,c)/qty),
  }));

  // Additional-color-cost-per-unit table (2-col minus 1-col price)
  const additionalColorCost = QTY_TIERS.map((qty,i) => ({
    qty, cost: matrix[i].prices[1]-matrix[i].prices[0],
  }));

  // Active imprints
  const imps       = order.imprints.slice(0, order.totalImprints);
  const imp1       = imps[0] || {colors:1,pieces:0};
  const mainPieces = Math.max(imp1.pieces||1, 1);

  const impCharges      = imps.map(imp => imprintCharge(imp.pieces,imp.colors,totalCostPerHr));
  const impWageCosts    = imps.map(imp => imprintCharge(imp.pieces,imp.colors,wageCostPerHr));
  const impCostPerPiece = imps.map((imp,i) => imp.pieces>0 ? impCharges[i]/imp.pieces : 0);

  // Post-production — single order-level value (change #1)
  const postProdCharge = (order.postProdHrs||0) * totalCostPerHr;

  // Handling fee derived from selected garment loss type (change #2)
  const selLoss          = lossAllowances[order.specialtyInkType] || {loss:0,premFee:0};
  const handlingFeePerPc = selLoss.loss + selLoss.premFee;
  const lossAllowance    = handlingFeePerPc * mainPieces;

  // Order totals (L28:O37)
  const printingCharge      = impCharges.reduce((s,c)=>s+c,0);
  const finalPrintingCharge = lossAllowance + printingCharge + postProdCharge;

  // Production cost breakdown for Imprint 1
  const c1=imp1.colors, p1=imp1.pieces;
  const depts = [
    {name:"Reclaim",       type:"setup", key:"reclaimMin",      timePerUnit:reclaimMin/60,       totalHrs:c1*reclaimMin/60},
    {name:"Screen Room",   type:"setup", key:"screenRoomMin",   timePerUnit:screenRoomMin/60,    totalHrs:c1*screenRoomMin/60},
    {name:"Design",        type:"setup", key:"designMin",       timePerUnit:designMin/60,        totalHrs:c1*designMin/60},
    {name:"Pantone Mix",   type:"setup", key:"pantoneMin",      timePerUnit:pantoneMin/60,       totalHrs:c1*pantoneMin/60},
    {name:"Press Operator",type:"press", key:"pressOperatorPPH",timePerUnit:1/pressOperatorPPH,  totalHrs:p1/pressOperatorPPH},
    {name:"Press Assist",  type:"press", key:"pressAssistPPH",  timePerUnit:1/pressAssistPPH,    totalHrs:p1/pressAssistPPH},
    {name:"Catchers",      type:"press", key:"catchersPPH",     timePerUnit:1/catchersPPH,       totalHrs:p1/catchersPPH},
    {name:"Shipping/Other",type:"fixed", key:"shippingHrs",     timePerUnit:shippingHrs,         totalHrs:shippingHrs},
  ].map(d=>({...d, totalCost:wageCostPerHr*d.totalHrs}));

  const totalDeptHrs   = depts.reduce((s,d)=>s+d.totalHrs, 0);
  const deptWageCost   = wageCostPerHr * totalDeptHrs;
  const inkTotal1      = p1*c1*inkCostPerColor + p1*lightingCost;
  const screenTotal1   = c1*screenCost;
  const cogs           = deptWageCost + inkTotal1 + screenTotal1;
  const printingProfit1 = totalDeptHrs * laborCostPerHr;

  const jobProfit = finalPrintingCharge - cogs
    - impWageCosts.slice(1).reduce((s,c)=>s+c, 0);

  const totalColorsPieces = imps.reduce((s,imp)=>s+imp.colors*imp.pieces, 0);
  const totalPieces       = imps.reduce((s,imp)=>s+imp.pieces, 0);
  const totalColors       = imps.reduce((s,imp)=>s+imp.colors, 0);
  const jobProfitExWage   = finalPrintingCharge
    - totalColorsPieces*inkCostPerColor
    - totalPieces*lightingCost
    - totalColors*screenCost;

  const perUnit = v => mainPieces>0 ? v/mainPieces : 0;

  return {
    totalCostPerHr, setupTimePerColor, pressTimePerItem, additionalTime,
    itemsTable, matrix, additionalColorCost,
    impCharges, impWageCosts, impCostPerPiece,
    depts, totalDeptHrs, deptWageCost, inkTotal1, screenTotal1,
    cogs, printingProfit1,
    handlingFeePerPc, lossAllowance, printingCharge, postProdCharge,
    finalPrintingCharge, jobProfit, jobProfitExWage,
    mainPieces, perUnit,
    totalMinHrs:totalDeptHrs, wageTotal:deptWageCost,
    inkTotalCost:inkTotal1, screenTotalCost:screenTotal1,
    pricePerUnit:perUnit(finalPrintingCharge),
    imp1Colors:c1, imp1Pieces:p1,
  };
}

// ═══════════════════════════════════════════════════════════════════════
// UTILITIES
// ═══════════════════════════════════════════════════════════════════════
const fmt$   = v => v==null ? "—" : `$${Number(v).toFixed(2)}`;
const fmtHrs = v => v==null ? "—" : Number(v).toFixed(3);
const today  = () => new Date().toISOString().split("T")[0];
let _id = Date.now();
const uid = () => (++_id).toString();

function buildCSV(orders, lossAllowances) {
  if (!orders.length) return "";
  const headers = [
    "Date","Customer","Project","Total Imprints",
    ...Array.from({length:8},(_,i)=>[`Imp${i+1} Colors`,`Imp${i+1} Pieces`,`Imp${i+1} $/pc`]).flat(),
    "Post-Prod Hrs","Garment Type","Handling Fee/pc","Labor $/Hr","Wage $/Hr",
  ];
  const rows = orders.map(o => [
    o.date,`"${o.customer}"`,`"${o.project}"`,o.totalImprints,
    ...Array.from({length:8},(_,i)=>[
      o.imprints[i]?.colors??0,
      o.imprints[i]?.pieces??0,
      o.impCostPerPiece?.[i]!=null ? Number(o.impCostPerPiece[i]).toFixed(4) : "",
    ]).flat(),
    o.postProdHrs??0,
    `"${lossAllowances[o.specialtyInkType]?.label??o.specialtyInkType??""}"`,
    o.handlingFeePerPc??"",
    o.laborCostPerHr??"", o.wageCostPerHr??"",
  ]);
  return [headers,...rows].map(r=>r.join(",")).join("\n");
}

// Parse a single CSV line respecting quoted fields
function parseCSVLine(line) {
  const result = [];
  let cur = "", inQ = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') { inQ = !inQ; }
    else if (ch === ',' && !inQ) { result.push(cur.trim()); cur = ""; }
    else { cur += ch; }
  }
  result.push(cur.trim());
  return result;
}

function importCSVText(csvText, lossAllowances) {
  const lines = csvText.trim().split(/\r?\n/);
  if (lines.length < 2) return { orders:[], errors:["CSV has no data rows."] };
  const headers = parseCSVLine(lines[0]).map(h=>h.toLowerCase().trim());
  const errors = [];
  const orders = [];

  // Build a label→key lookup for garment types
  const labelToKey = Object.fromEntries(
    Object.entries(lossAllowances).map(([k,v])=>[v.label.toLowerCase(), k])
  );

  for (let li = 1; li < lines.length; li++) {
    if (!lines[li].trim()) continue;
    const cols = parseCSVLine(lines[li]);
    const get = (name) => {
      const idx = headers.indexOf(name.toLowerCase());
      return idx >= 0 ? (cols[idx]??'').replace(/^"|"$/g,'').trim() : '';
    };

    const imprints = Array.from({length:8}, (_,i) => ({
      colors: parseInt(get(`Imp${i+1} Colors`))||0,
      pieces: parseInt(get(`Imp${i+1} Pieces`))||0,
    }));
    const impCostPerPiece = Array.from({length:8}, (_,i) => {
      const v = parseFloat(get(`Imp${i+1} $/pc`));
      return isNaN(v) ? null : v;
    });

    const garmentLabel = get("Garment Type").toLowerCase();
    const specialtyInkType = labelToKey[garmentLabel] ?? "tshirts";

    const totalImprints = parseInt(get("Total Imprints"))||1;

    orders.push({
      id: uid(),
      date:        get("Date") || today(),
      customer:    get("Customer"),
      project:     get("Project"),
      totalImprints,
      imprints,
      impCostPerPiece,
      postProdHrs:     parseFloat(get("Post-Prod Hrs"))||0,
      specialtyInkType,
      handlingFeePerPc: parseFloat(get("Handling Fee/pc"))||0,
      laborCostPerHr:   parseFloat(get("Labor $/Hr"))||0,
      wageCostPerHr:    parseFloat(get("Wage $/Hr"))||0,
    });
  }
  return { orders, errors };
}


const cardSt = (extra={}) => ({
  background:C.surface, border:`1px solid ${C.border}`, borderRadius:10,
  padding:"16px 18px", marginBottom:14, ...extra,
});
const inputSt = {
  background:C.inBg, border:`1px solid ${C.border}`, borderRadius:6,
  color:C.text, padding:"6px 10px", fontSize:13, width:"100%",
  outline:"none", fontFamily:"inherit", transition:"border-color 0.2s",
  MozAppearance:"textfield", WebkitAppearance:"none",
};
const outputSt = {
  background:C.outBg, border:`1px solid #1a341a`, borderRadius:6,
  color:C.outText, padding:"6px 10px", fontSize:13, width:"100%",
  fontFamily:"inherit", cursor:"default",
};
const labelSt = {
  fontSize:10.5, color:C.dim, textTransform:"uppercase",
  letterSpacing:"0.05em", marginBottom:4,
  display:"flex", alignItems:"center", gap:5,
};
const secTitleSt = {
  fontSize:11, fontWeight:700, color:C.red, textTransform:"uppercase",
  letterSpacing:"0.1em", marginBottom:10,
  display:"flex", alignItems:"center", gap:8,
};

// ═══════════════════════════════════════════════════════════════════════
// ATOMS
// ═══════════════════════════════════════════════════════════════════════
function Num({value,onChange,step=1,min=0,style={}}) {
  return (
    <input type="number" value={value} step={step} min={min}
      onChange={e=>onChange(parseFloat(e.target.value)||0)}
      style={{...inputSt,...style}} />
  );
}
function Txt({value,onChange,placeholder,style={}}) {
  return (
    <input type="text" value={value} placeholder={placeholder}
      onChange={e=>onChange(e.target.value)}
      style={{...inputSt,...style}} />
  );
}
function Out({value,style={}}) {
  return <div style={{...outputSt,...style}}>{value}</div>;
}
function Badge({children,color=C.gold}) {
  return (
    <span style={{
      background:color+"22",border:`1px solid ${color}44`,color,
      borderRadius:4,padding:"1px 6px",fontSize:9.5,fontWeight:700,
      letterSpacing:"0.06em",textTransform:"uppercase",
    }}>{children}</span>
  );
}
function SecTitle({icon,children}) {
  return (
    <div style={secTitleSt}>
      {icon&&<span>{icon}</span>}
      <span>{children}</span>
      <div style={{flex:1,height:1,background:`linear-gradient(to right,${C.redDim},transparent)`,marginLeft:4}}/>
    </div>
  );
}
function Btn({onClick,variant="default",children,style={}}) {
  const v={
    default:{bg:C.surface2,cl:C.text,   br:`1px solid ${C.border}`},
    primary:{bg:C.red,     cl:"#fff",    br:`1px solid ${C.red}`},
    danger: {bg:"transparent",cl:C.danger,br:`1px solid ${C.danger}`},
    ghost:  {bg:"transparent",cl:C.dim,  br:`1px solid ${C.border}`},
  }[variant]||{};
  return (
    <button onClick={onClick} style={{
      background:v.bg,color:v.cl,border:v.br,
      borderRadius:6,padding:"7px 15px",fontSize:12,fontWeight:600,
      cursor:"pointer",fontFamily:"inherit",letterSpacing:"0.03em",
      display:"inline-flex",alignItems:"center",gap:6,whiteSpace:"nowrap",
      transition:"all 0.15s",...style,
    }}>{children}</button>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// CUSTOMER SEARCH
// ═══════════════════════════════════════════════════════════════════════
function CustomerSearch({value,onChange,customers,onAdd}) {
  const [q,setQ]       = useState(value);
  const [open,setOpen] = useState(false);
  const ref            = useRef(null);

  useEffect(()=>{setQ(value);},[value]);

  const filtered = customers.filter(c=>c.toLowerCase().includes(q.toLowerCase()));

  useEffect(()=>{
    const h=e=>{if(ref.current&&!ref.current.contains(e.target))setOpen(false);};
    document.addEventListener("mousedown",h);
    return ()=>document.removeEventListener("mousedown",h);
  },[]);

  function pick(c){onChange(c);setQ(c);setOpen(false);}
  function add(){
    const t=q.trim();
    if(t&&!customers.includes(t)){onAdd(t);onChange(t);}
    setOpen(false);
  }

  return (
    <div ref={ref} style={{position:"relative"}}>
      <input type="text" value={q}
        onChange={e=>{setQ(e.target.value);setOpen(true);onChange(e.target.value);}}
        onFocus={()=>setOpen(true)}
        style={inputSt}
        placeholder="Search or type new customer…"
      />
      {open&&(
        <div style={{
          position:"absolute",top:"calc(100% + 4px)",left:0,right:0,zIndex:200,
          background:C.surface2,border:`1px solid ${C.border}`,borderRadius:8,
          maxHeight:200,overflowY:"auto",boxShadow:"0 8px 32px rgba(0,0,0,0.7)",
        }}>
          {filtered.map(c=>(
            <div key={c} onMouseDown={()=>pick(c)} style={{
              padding:"8px 12px",cursor:"pointer",fontSize:13,color:C.text,
              borderBottom:`1px solid ${C.border}11`,
            }}
              onMouseEnter={e=>e.currentTarget.style.background=C.surface3}
              onMouseLeave={e=>e.currentTarget.style.background="transparent"}
            >{c}</div>
          ))}
          {q.trim()&&!customers.includes(q.trim())&&(
            <div onMouseDown={add} style={{
              padding:"8px 12px",cursor:"pointer",fontSize:13,color:C.gold,
              borderTop:`1px solid ${C.border}`,display:"flex",alignItems:"center",gap:6,
            }}>✦ Add "{q.trim()}"</div>
          )}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// TAB 1 — NEW ORDER
// ═══════════════════════════════════════════════════════════════════════
function NewOrderTab({order,setOrder,derived,prod,setProd,
  services,setServices,laborRates,setLaborRates,
  lossAllowances,setLossAllowances,customers,onAddCustomer,onSaveOrder,onResetOrder}) {

  const [showTotals,setShowTotals] = useState(true);
  const [addingLoss,setAddingLoss] = useState(false);
  const [newLossLabel,setNewLabel] = useState("");

  function setImp(idx,field,val) {
    const imps=[...order.imprints];
    imps[idx]={...imps[idx],[field]:val};
    setOrder(o=>({...o,imprints:imps}));
  }

  const activeImps = order.imprints.slice(0,order.totalImprints);
  const imp1       = activeImps[0]||{colors:1,pieces:0};

  // Matrix highlight indices
  const hlRowIdx = useMemo(()=>{
    let idx=0;
    for(let i=0;i<QTY_TIERS.length;i++) if(QTY_TIERS[i]<=imp1.pieces) idx=i;
    return idx;
  },[imp1.pieces]);
  const hlColIdx = useMemo(()=>Math.max(0,Math.min(11,(imp1.colors||1)-1)),[imp1.colors]);

  function addLossRow() {
    const label=newLossLabel.trim();
    if(!label) return;
    const key="custom_"+uid();
    setLossAllowances(la=>({...la,[key]:{loss:0,premFee:0,label}}));
    setNewLabel(""); setAddingLoss(false);
  }

  const thImp = (i) => ({
    textAlign:"center",padding:"6px 8px",
    color:i===0?C.gold:C.dim, fontWeight:i===0?700:500, fontSize:10,
    textTransform:"uppercase",letterSpacing:"0.05em",
    background:i===0?C.gold+"18":"transparent", minWidth:90,
  });

  return (
    <div style={{padding:"0 18px 28px"}}>

      {/* ── ORDER HEADER ── */}
      <div style={cardSt({background:"linear-gradient(135deg,#0d0205 0%,#130208 100%)"})}>
        <SecTitle icon="📋">Order Details</SecTitle>

        {/* Customer / Project / Imprints / Date */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 150px 150px",gap:14,marginBottom:14}}>
          <div>
            <div style={labelSt}>Customer</div>
            <CustomerSearch value={order.customer}
              onChange={v=>setOrder(o=>({...o,customer:v}))}
              customers={customers} onAdd={onAddCustomer} />
          </div>
          <div>
            <div style={labelSt}>Project / Job Name</div>
            <Txt value={order.project} onChange={v=>setOrder(o=>({...o,project:v}))} />
          </div>
          <div>
            <div style={labelSt}>Total Imprints</div>
            <Num value={order.totalImprints} min={1}
              onChange={v=>setOrder(o=>({...o,totalImprints:Math.max(1,Math.min(8,Math.round(v)))}))} />
          </div>
          <div>
            <div style={labelSt}>Date</div>
            <input type="date" value={order.date}
              onChange={e=>setOrder(o=>({...o,date:e.target.value}))}
              style={inputSt} />
          </div>
        </div>

        {/* Imprints table — Colors & Pieces only */}
        <div style={{overflowX:"auto",marginBottom:14}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
            <thead>
              <tr>
                <th style={{textAlign:"left",color:C.dim,padding:"5px 8px",fontSize:10,textTransform:"uppercase",letterSpacing:"0.05em",fontWeight:600,minWidth:130}}>Field</th>
                {activeImps.map((_,i)=><th key={i} style={thImp(i)}>{i===0?"★ Imprint 1":`Imprint ${i+1}`}</th>)}
              </tr>
            </thead>
            <tbody>
              {[
                {label:"Colors",   field:"colors", isInput:true},
                {label:"Pieces",   field:"pieces", isInput:true},
                {label:"Charge ($)",isOut:true,  get:(_,i)=>fmt$(derived.impCharges[i])},
                {label:"$/Piece",   isOut:true,  get:(_,i)=>fmt$(derived.impCostPerPiece[i])},
              ].map(row=>(
                <tr key={row.label} style={{borderBottom:`1px solid ${C.border}22`}}>
                  <td style={{padding:"5px 8px",color:C.dim,fontSize:11,display:"flex",alignItems:"center",gap:5}}>
                    {row.label}{row.isOut&&<Badge color={C.outText}>calc</Badge>}
                  </td>
                  {activeImps.map((imp,i)=>(
                    <td key={i} style={{padding:"4px 4px",background:i===0?C.gold+"08":"transparent"}}>
                      {row.isInput
                        ?<Num value={imp[row.field]} onChange={v=>setImp(i,row.field,v)} style={{textAlign:"center"}}/>
                        :<Out value={row.get(imp,i)} style={{textAlign:"center"}}/>
                      }
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Row: Post-Prod Hrs | Specialty Ink | Handling Fee/pc (change #1, #2, #3) */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14,marginBottom:14}}>
          <div>
            <div style={labelSt}>Post-Production Hrs <Badge>input</Badge></div>
            <Num value={order.postProdHrs} step={0.5}
              onChange={v=>setOrder(o=>({...o,postProdHrs:v}))} />
          </div>
          <div>
            <div style={labelSt}>Specialty Ink / Garment Type <Badge>input</Badge></div>
            <select value={order.specialtyInkType}
              onChange={e=>setOrder(o=>({...o,specialtyInkType:e.target.value}))}
              style={{...inputSt,cursor:"pointer"}}>
              {Object.entries(lossAllowances).map(([k,v])=>(
                <option key={k} value={k}>{v.label}</option>
              ))}
            </select>
          </div>
          <div>
            <div style={labelSt}>Handling Fee / pc <Badge color={C.outText}>calc</Badge></div>
            <Out value={fmt$(derived.handlingFeePerPc)} />
          </div>
        </div>

        {/* Row: Labor/Hr | Wage/Hr | Total Cost/Hr | Save + Reset Buttons */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr auto auto",gap:14,alignItems:"end"}}>
          <div>
            <div style={labelSt}>Labor Cost / Hr <Badge>input</Badge></div>
            <Num value={prod.laborCostPerHr} onChange={v=>setProd(p=>({...p,laborCostPerHr:v}))} />
          </div>
          <div>
            <div style={labelSt}>Wage Cost / Hr <Badge>input</Badge></div>
            <Num value={prod.wageCostPerHr} onChange={v=>setProd(p=>({...p,wageCostPerHr:v}))} />
          </div>
          <div>
            <div style={labelSt}>Total Cost / Hr <Badge color={C.outText}>calc</Badge></div>
            <Out value={fmt$(derived.totalCostPerHr)} />
          </div>
          <Btn variant="primary" onClick={onSaveOrder} style={{height:34}}>💾 Save Order</Btn>
          <Btn variant="ghost" onClick={onResetOrder} style={{height:34}}>↺ Reset Order</Btn>
        </div>
      </div>

      {/* ── ORDER TOTALS (COLLAPSIBLE) ── */}
      <div style={cardSt()}>
        <div onClick={()=>setShowTotals(v=>!v)}
          style={{...secTitleSt,cursor:"pointer",userSelect:"none",marginBottom:showTotals?10:0}}>
          <span>📊</span><span>Order Totals</span>
          <div style={{flex:1,height:1,background:`linear-gradient(to right,${C.redDim},transparent)`,marginLeft:4}}/>
          <span style={{fontSize:14,color:C.muted,marginLeft:4}}>{showTotals?"▲":"▼"}</span>
        </div>
        {showTotals&&(
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
            {[
              ["Loss Allowance",         derived.lossAllowance],
              ["Printing Charge",        derived.printingCharge],
              ["Post-Production Charge", derived.postProdCharge],
              ["Final Printing Charge",  derived.finalPrintingCharge],
              ["Job Profit",             derived.jobProfit],
              ["Job Profit Ex-Wage",     derived.jobProfitExWage],
            ].map(([label,total])=>(
              <div key={label} style={{
                display:"grid",gridTemplateColumns:"1fr 100px 95px",
                alignItems:"center",gap:8,padding:"7px 10px",
                background:C.surface2,borderRadius:6,
                border:`1px solid ${C.border}`,fontSize:12,
              }}>
                <div style={{color:C.dim}}>{label}</div>
                <div style={{color:C.text,fontWeight:600,textAlign:"right"}}>{fmt$(total)}</div>
                <div style={{color:C.outText,fontSize:11,textAlign:"right"}}>{fmt$(derived.perUnit(total))}/pc</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── PRICING MATRIX (change #5: now below totals) + right column ── */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 610px",gap:14,alignItems:"start",marginBottom:14}}>

        {/* Pricing Matrix */}
        <div style={cardSt({padding:"16px 14px",marginBottom:0})}>
          <SecTitle icon="📈">Automatic Pricing Matrix — Price Per Unit ($)</SecTitle>
          <div style={{fontSize:11,color:C.dim,marginBottom:8}}>
            Rows: Qty Tiers&nbsp;&nbsp;•&nbsp;&nbsp;Cols: # Colors&nbsp;&nbsp;•&nbsp;&nbsp;
            <span style={{color:C.gold}}>Gold = nearest match to Imprint 1</span>
          </div>
          <div style={{overflowX:"auto"}}>
            <table style={{borderCollapse:"collapse",fontSize:11}}>
              <thead>
                <tr>
                  <th style={{padding:"5px 10px",textAlign:"center",color:C.dim,fontWeight:600,fontSize:10,borderBottom:`1px solid ${C.border}`,background:C.surface2,minWidth:52}}>QTY</th>
                  {COLOR_COLS.map(c=>(
                    <th key={c} style={{
                      padding:"5px 7px",textAlign:"center",fontWeight:600,fontSize:10,
                      borderBottom:`1px solid ${C.border}`,
                      background:c===imp1.colors?C.gold+"28":C.surface2,
                      color:c===imp1.colors?C.gold:C.dim,
                      minWidth:56,
                    }}>{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {derived.matrix.map((row,ri)=>{
                  const hlRow=ri===hlRowIdx;
                  return (
                    <tr key={row.qty}>
                      <td style={{
                        padding:"4px 10px",fontWeight:700,textAlign:"center",
                        background:hlRow?C.gold+"1e":ri%2===0?C.surface2:C.surface,
                        color:hlRow?C.gold:C.text,
                        borderRight:`1px solid ${C.border}`,fontSize:12,
                      }}>{row.qty.toLocaleString()}</td>
                      {row.prices.map((price,ci)=>{
                        const exact=hlRow&&ci===hlColIdx;
                        return (
                          <td key={ci} style={{
                            padding:"4px 7px",textAlign:"center",
                            background:exact?C.red+"3e":hlRow?C.gold+"0c":ci===hlColIdx?C.gold+"07":ri%2===0?C.surface2:C.surface,
                            color:exact?"#fff":C.text,
                            fontWeight:exact?800:400,
                            border:exact?`1.5px solid ${C.red}`:"none",
                          }}>{price.toFixed(2)}</td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right column: Additional Color Cost + Items per HPT side-by-side */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,alignItems:"start"}}>
          {/* Additional Color Cost per Unit */}
          <div style={cardSt({marginBottom:0})}>
            <SecTitle icon="➕">Add'l Color Cost / Unit</SecTitle>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
              <thead>
                <tr>
                  <th style={{color:C.dim,textAlign:"center",padding:"4px 6px",fontSize:10,textTransform:"uppercase",fontWeight:600}}>Qty</th>
                  <th style={{color:C.outText,textAlign:"center",padding:"4px 6px",fontSize:10,textTransform:"uppercase",fontWeight:600}}>
                    +1 Color <Badge color={C.outText}>calc</Badge>
                  </th>
                </tr>
              </thead>
              <tbody>
                {derived.additionalColorCost.map((row,i)=>(
                  <tr key={row.qty} style={{
                    borderBottom:`1px solid ${C.border}22`,
                    background:i===hlRowIdx?C.gold+"10":i%2===0?C.surface2:C.surface,
                  }}>
                    <td style={{padding:"4px 6px",textAlign:"center",color:i===hlRowIdx?C.gold:C.dim,fontWeight:i===hlRowIdx?700:400}}>
                      {row.qty.toLocaleString()}
                    </td>
                    <td style={{padding:"4px 6px",textAlign:"center",color:C.outText}}>{fmt$(row.cost)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Items per HPT by Colors */}
          <div style={cardSt({marginBottom:0})}>
            <SecTitle icon="⏱️">Items per HPT by Colors</SecTitle>
            <div style={{fontSize:11,color:C.dim,marginBottom:8,display:"flex",gap:6,alignItems:"center",flexWrap:"wrap"}}>
              <span>Time/HPT:</span>
              <Out value={`${prod.timePerHPT} min`} style={{width:60,textAlign:"center"}}/>
              <span style={{color:C.muted,fontSize:10}}>(Inputs tab)</span>
            </div>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
              <thead>
                <tr>
                  <th style={{color:C.dim,textAlign:"center",padding:"4px 8px",fontSize:10,textTransform:"uppercase",fontWeight:600}}>Colors</th>
                  <th style={{color:C.outText,textAlign:"center",padding:"4px 8px",fontSize:10,textTransform:"uppercase",fontWeight:600}}>
                    Max Items <Badge color={C.outText}>calc</Badge>
                  </th>
                </tr>
              </thead>
              <tbody>
                {derived.itemsTable.map(row=>(
                  <tr key={row.colors} style={{
                    borderBottom:`1px solid ${C.border}22`,
                    background:row.colors===imp1.colors?C.redGlow:"transparent",
                  }}>
                    <td style={{padding:"4px 8px",textAlign:"center",color:row.colors===imp1.colors?C.gold:C.text,fontWeight:row.colors===imp1.colors?700:400}}>
                      {row.colors}
                    </td>
                    <td style={{padding:"4px 8px",textAlign:"center",color:C.outText}}>{row.items}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── BOTTOM ROW: Additional Services | Labor Rates | Loss Allowances ── */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1.3fr",gap:14}}>

        {/* Additional Services FYI Only (change #6: split, no color cost column) */}
        <div style={cardSt({marginBottom:0})}>
          <SecTitle icon="🔧">Additional Services (FYI Only)</SecTitle>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
            <thead>
              <tr>
                <th style={{color:C.dim,textAlign:"left",padding:"4px 6px",fontSize:10,textTransform:"uppercase",fontWeight:600}}>Service</th>
                <th style={{color:C.dim,textAlign:"right",padding:"4px 6px",fontSize:10,textTransform:"uppercase",fontWeight:600}}>
                  Cost <Badge>input</Badge>
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                {label:"Fold Bag & Tag",    key:"foldBagTag"},
                {label:"Size Tagging",       key:"sizeTagging"},
                {label:"Pantone Color",      key:"pantoneColor"},
                {label:"Color Change Fee",   key:"colorChange"},
                {label:"Vector Fee Artwork", key:"vectorFee"},
                {label:"File Prep",          key:"filePrep"},
              ].map(row=>(
                <tr key={row.key} style={{borderBottom:`1px solid ${C.border}22`}}>
                  <td style={{padding:"5px 6px",color:C.text}}>{row.label}</td>
                  <td style={{padding:"3px 4px"}}>
                    <Num value={services[row.key]} step={0.01}
                      onChange={v=>setServices(sv=>({...sv,[row.key]:v}))}
                      style={{textAlign:"right"}}/>
                  </td>
                </tr>
              ))}
              <tr style={{borderBottom:`1px solid ${C.border}22`}}>
                <td style={{padding:"5px 6px",color:C.text}}>All Other Work ($/hr)</td>
                <td style={{padding:"3px 4px"}}>
                  <Num value={services.allOtherWork} step={5}
                    onChange={v=>setServices(sv=>({...sv,allOtherWork:v}))}
                    style={{textAlign:"right"}}/>
                </td>
              </tr>
              <tr>
                <td style={{padding:"5px 6px",color:C.text}}>Screen Set-up</td>
                <td style={{padding:"3px 4px"}}><Out value="INCLUDED" style={{textAlign:"center"}}/></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Labor Rates */}
        <div style={cardSt({marginBottom:0})}>
          <SecTitle icon="💼">Labor Rates</SecTitle>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            {[
              {label:"Retail",            key:"retail"},
              {label:"Retail Promo/New",  key:"retailPromo"},
              {label:"Business",          key:"business"},
              {label:"Business Promo/New",key:"businessPromo"},
              {label:"Contract Size",     key:"contractSize"},
              {label:"Contract Size/New", key:"contractSizeNew"},
              {label:"RUSH Rate",         key:"rush"},
            ].map(r=>(
              <div key={r.key}>
                <div style={labelSt}>{r.label} <Badge>input</Badge></div>
                <Num value={laborRates[r.key]}
                  onChange={v=>setLaborRates(lr=>({...lr,[r.key]:v}))}/>
              </div>
            ))}
          </div>
        </div>

        {/* Garment Loss Allowances (change #2: add row button, Loss/pc label) */}
        <div style={cardSt({marginBottom:0})}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
            <div style={{...secTitleSt,marginBottom:0}}>
              <span>⚖️</span><span>Garment Loss Allowances</span>
            </div>
            <Btn variant="ghost" onClick={()=>setAddingLoss(v=>!v)}
              style={{padding:"4px 10px",fontSize:11}}>
              {addingLoss?"✕ Cancel":"+ Add Row"}
            </Btn>
          </div>
          {addingLoss&&(
            <div style={{display:"flex",gap:8,marginBottom:10}}>
              <Txt value={newLossLabel} onChange={setNewLabel} placeholder="New type label…"/>
              <Btn variant="primary" onClick={addLossRow} style={{padding:"6px 12px",fontSize:11}}>Add</Btn>
            </div>
          )}
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:11.5}}>
            <thead>
              <tr>
                <th style={{color:C.dim,textAlign:"left",padding:"4px 5px",fontSize:10,textTransform:"uppercase",fontWeight:600}}>Type</th>
                <th style={{color:C.dim,textAlign:"center",padding:"4px 5px",fontSize:10,textTransform:"uppercase",fontWeight:600}}>
                  Loss/pc <Badge>input</Badge>
                </th>
                <th style={{color:C.dim,textAlign:"center",padding:"4px 5px",fontSize:10,textTransform:"uppercase",fontWeight:600}}>
                  Prem. Fee <Badge>input</Badge>
                </th>
                <th style={{color:C.outText,textAlign:"center",padding:"4px 5px",fontSize:10,textTransform:"uppercase",fontWeight:600}}>
                  Total/pc <Badge color={C.outText}>calc</Badge>
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(lossAllowances).map(([key,row])=>{
                const sel=order.specialtyInkType===key;
                return (
                  <tr key={key} style={{
                    borderBottom:`1px solid ${C.border}22`,
                    background:sel?C.redGlow:"transparent",
                  }}>
                    <td style={{padding:"4px 5px",color:sel?C.gold:C.text,fontWeight:sel?700:400,fontSize:11}}>
                      {sel&&<span style={{marginRight:4,fontSize:9}}>●</span>}
                      {row.label}
                    </td>
                    <td style={{padding:"3px 3px"}}>
                      <Num value={row.loss} step={0.01}
                        onChange={v=>setLossAllowances(la=>({...la,[key]:{...la[key],loss:v}}))}
                        style={{textAlign:"center"}}/>
                    </td>
                    <td style={{padding:"3px 3px"}}>
                      <Num value={row.premFee} step={0.01}
                        onChange={v=>setLossAllowances(la=>({...la,[key]:{...la[key],premFee:v}}))}
                        style={{textAlign:"center"}}/>
                    </td>
                    <td style={{padding:"3px 3px"}}>
                      <Out value={fmt$(row.loss+row.premFee)} style={{textAlign:"center"}}/>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div style={{marginTop:8,fontSize:10,color:C.muted}}>● = selected garment type for this order</div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// TAB 2 — PRIOR ORDERS  (change #8: cost/piece per imprint)
// ═══════════════════════════════════════════════════════════════════════
function PriorOrdersTab({savedOrders,setSavedOrders,onLoadOrder,lossAllowances,onSaveCurrentOrder,prepareLoadOrder,onImportOrders}) {
  const [filterCust,setFilterCust] = useState("");
  const [sortField,setSortField]   = useState("date");
  const [sortDir,setSortDir]       = useState("desc");
  const [confirmLoad,setConfirmLoad] = useState(null);
  const [importMsg,setImportMsg]   = useState(null);
  const [csvModal,setCsvModal]     = useState(null); // holds CSV string when open
  const [copied,setCopied]         = useState(false);
  const csvTextareaRef             = useRef(null);
  const fileInputRef = useRef(null);

  function copyCSV() {
    try {
      const ta = document.createElement('textarea');
      ta.value = csvModal;
      ta.style.cssText = 'position:fixed;top:-9999px;left:-9999px;opacity:0;';
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      ta.setSelectionRange(0, 99999);
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch(_) {}
  }

  function handleImport(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const { orders, errors } = importCSVText(ev.target.result, lossAllowances);
      if (errors.length) { setImportMsg({text:`Import error: ${errors[0]}`, ok:false}); }
      else if (!orders.length) { setImportMsg({text:"No valid rows found in CSV.", ok:false}); }
      else {
        onImportOrders(orders);
        setImportMsg({text:`Imported ${orders.length} order${orders.length!==1?"s":""}.`, ok:true});
      }
      setTimeout(()=>setImportMsg(null), 4000);
    };
    reader.readAsText(file);
    e.target.value = ""; // reset so same file can be re-imported
  }

  const uniqueCusts = [...new Set(savedOrders.map(o=>o.customer))].sort();

  const filtered = useMemo(()=>{
    let r=[...savedOrders];
    if(filterCust) r=r.filter(o=>o.customer===filterCust);
    r.sort((a,b)=>{
      let av=a[sortField],bv=b[sortField];
      if(typeof av==="string") av=av.toLowerCase();
      if(typeof bv==="string") bv=bv.toLowerCase();
      return (av<bv?-1:av>bv?1:0)*(sortDir==="asc"?1:-1);
    });
    return r;
  },[savedOrders,filterCust,sortField,sortDir]);

  function toggleSort(f){
    if(sortField===f) setSortDir(d=>d==="asc"?"desc":"asc");
    else{setSortField(f);setSortDir("asc");}
  }

  const TH=({label,f,center})=>(
    <th onClick={()=>f&&toggleSort(f)} style={{
      padding:"8px 8px",textAlign:center?"center":"left",cursor:f?"pointer":"default",
      background:C.surface2,color:sortField===f?C.gold:C.dim,
      fontWeight:600,textTransform:"uppercase",letterSpacing:"0.04em",fontSize:9.5,
      borderBottom:`1px solid ${C.border}`,whiteSpace:"nowrap",
    }}>
      {label}{f&&sortField===f&&(sortDir==="asc"?" ▲":" ▼")}
    </th>
  );

  return (
    <div style={{padding:"0 18px 24px"}}>
      <div style={cardSt()}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16,flexWrap:"wrap",gap:10}}>
          <SecTitle icon="🗂️">Order History</SecTitle>
          <div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap"}}>
            <select value={filterCust} onChange={e=>setFilterCust(e.target.value)}
              style={{...inputSt,width:200}}>
              <option value="">All Customers</option>
              {uniqueCusts.map(c=><option key={c} value={c}>{c}</option>)}
            </select>
            <Btn onClick={()=>{
              const csv=buildCSV(filtered,lossAllowances);
              if(csv) setCsvModal(csv);
            }}>📤 Export CSV</Btn>
            <Btn variant="ghost" onClick={()=>fileInputRef.current?.click()}>📥 Import CSV</Btn>
            <input
              ref={fileInputRef} type="file" accept=".csv,text/csv"
              onChange={handleImport}
              style={{display:"none"}}
            />
            {importMsg && (
              <span style={{fontSize:11,color:importMsg.ok?C.success:C.danger,fontWeight:600}}>
                {importMsg.ok?"✅":"⚠️"} {importMsg.text}
              </span>
            )}
            <div style={{color:C.muted,fontSize:12}}>{filtered.length} order{filtered.length!==1?"s":""}</div>
          </div>
        </div>

        {filtered.length===0?(
          <div style={{textAlign:"center",padding:"60px 20px",color:C.muted}}>
            <div style={{fontSize:36,marginBottom:12}}>📭</div>
            <div>No orders saved yet.</div>
          </div>
        ):(
          <div style={{overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}>
              <thead>
                <tr>
                  <TH label="Date"     f="date"/>
                  <TH label="Customer" f="customer"/>
                  <TH label="Project"  f="project"/>
                  {Array.from({length:8},(_,i)=>(
                    <th key={i} style={{
                      padding:"8px 6px",textAlign:"center",background:C.surface2,
                      color:C.dim,fontWeight:600,textTransform:"uppercase",fontSize:9.5,
                      borderBottom:`1px solid ${C.border}`,whiteSpace:"nowrap",minWidth:100,
                    }}>Imp {i+1}</th>
                  ))}
                  <TH label="Post-Prod" center/>
                  <TH label="Garment Type" center/>
                  <TH label="Labor/Hr" f="laborCostPerHr" center/>
                  <TH label="Actions" center/>
                </tr>
              </thead>
              <tbody>
                {filtered.map((order,ri)=>(
                  <tr key={order.id} style={{borderBottom:`1px solid ${C.border}22`,background:ri%2===0?C.surface2:C.surface}}>
                    <td style={{padding:"7px 8px",color:C.dim,whiteSpace:"nowrap"}}>{order.date}</td>
                    <td style={{padding:"7px 8px",color:C.text,fontWeight:600,whiteSpace:"nowrap"}}>{order.customer}</td>
                    <td style={{padding:"7px 8px",color:C.text,whiteSpace:"nowrap"}}>{order.project}</td>
                    {Array.from({length:8},(_,i)=>{
                      const imp=order.imprints?.[i];
                      const cpp=order.impCostPerPiece?.[i];
                      const active=i<order.totalImprints;
                      return (
                        <td key={i} style={{padding:"5px 6px",textAlign:"center"}}>
                          {imp&&active?(
                            <div style={{lineHeight:1.5}}>
                              <div style={{color:C.text,fontSize:11,fontWeight:500}}>{imp.colors}c / {imp.pieces}pc</div>
                              {cpp!=null&&<div style={{color:C.outText,fontSize:10}}>{fmt$(cpp)}/pc</div>}
                            </div>
                          ):<span style={{color:C.muted}}>—</span>}
                        </td>
                      );
                    })}
                    <td style={{padding:"7px 8px",textAlign:"center",color:C.dim}}>{order.postProdHrs??0}h</td>
                    <td style={{padding:"7px 8px",textAlign:"center",color:C.dim,fontSize:10,whiteSpace:"nowrap"}}>
                      {order.specialtyInkType
                        ?(lossAllowances[order.specialtyInkType]?.label??order.specialtyInkType)
                        :"—"}
                    </td>
                    <td style={{padding:"7px 8px",textAlign:"center",color:C.gold}}>
                      {order.laborCostPerHr?`$${order.laborCostPerHr}`:"—"}
                    </td>
                    <td style={{padding:"5px 6px",whiteSpace:"nowrap"}}>
                      <div style={{display:"flex",gap:5}}>
                        <Btn style={{padding:"4px 9px",fontSize:10}} onClick={()=>setConfirmLoad(prepareLoadOrder(order))}>✏️ Open</Btn>
                        <Btn variant="danger" style={{padding:"4px 9px",fontSize:10}}
                          onClick={()=>setSavedOrders(os=>os.filter(o=>o.id!==order.id))}>🗑</Btn>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── CONFIRM LOAD MODAL ── */}
      {confirmLoad && (
        <div style={{
          position:"fixed",inset:0,zIndex:500,
          background:"rgba(0,0,0,0.75)",backdropFilter:"blur(4px)",
          display:"flex",alignItems:"center",justifyContent:"center",
        }}>
          <div style={{
            background:C.surface,border:`1px solid ${C.border}`,
            borderRadius:14,padding:"28px 32px",maxWidth:400,width:"90%",
            boxShadow:"0 20px 60px rgba(0,0,0,0.7)",
          }}>
            <div style={{fontSize:18,fontWeight:700,color:C.text,marginBottom:8}}>
              Open Prior Order
            </div>
            <div style={{fontSize:13,color:C.dim,marginBottom:6,lineHeight:1.6}}>
              You have a current order open for
              <span style={{color:C.gold,fontWeight:600}}> {confirmLoad._currentCustomer||"this customer"}</span>.
            </div>
            <div style={{fontSize:13,color:C.text,marginBottom:24,lineHeight:1.6}}>
              Would you like to <strong>save it</strong> before loading{" "}
              <span style={{color:C.gold,fontWeight:600}}>{confirmLoad.customer} — {confirmLoad.project}</span>?
            </div>
            <div style={{display:"flex",gap:10,justifyContent:"flex-end",flexWrap:"wrap"}}>
              <Btn variant="ghost" onClick={()=>setConfirmLoad(null)} style={{fontSize:12}}>
                ✕ Cancel
              </Btn>
              <Btn variant="default" onClick={()=>{
                onLoadOrder(confirmLoad);
                setConfirmLoad(null);
              }} style={{fontSize:12}}>
                Discard &amp; Open
              </Btn>
              <Btn variant="primary" onClick={()=>{
                onSaveCurrentOrder();
                onLoadOrder(confirmLoad);
                setConfirmLoad(null);
              }} style={{fontSize:12}}>
                💾 Save &amp; Open
              </Btn>
            </div>
          </div>
        </div>
      )}

      {/* ── CSV EXPORT MODAL ── */}
      {csvModal && (
        <div style={{
          position:"fixed",inset:0,zIndex:500,
          background:"rgba(0,0,0,0.82)",backdropFilter:"blur(4px)",
          display:"flex",alignItems:"center",justifyContent:"center",
        }}>
          <div style={{
            background:C.surface,border:`1px solid ${C.border}`,
            borderRadius:14,padding:"24px 28px",
            width:"min(720px,95vw)",maxHeight:"80vh",
            display:"flex",flexDirection:"column",
            boxShadow:"0 20px 60px rgba(0,0,0,0.8)",
          }}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
              <div style={{fontSize:16,fontWeight:700,color:C.text}}>📤 Export CSV</div>
              <Btn variant="ghost" onClick={()=>{setCsvModal(null);setCopied(false);}} style={{padding:"4px 10px",fontSize:12}}>✕ Close</Btn>
            </div>
            <div style={{fontSize:12,color:C.dim,marginBottom:10,lineHeight:1.6}}>
              Click <strong style={{color:C.gold}}>Copy to Clipboard</strong>, then paste into a text editor and save as <strong style={{color:C.text}}>.csv</strong>.
            </div>
            <div style={{display:"flex",gap:8,marginBottom:12}}>
              <Btn variant="primary" style={{fontSize:12,minWidth:160}} onClick={copyCSV}>
                {copied ? "✅ Copied!" : "📋 Copy to Clipboard"}
              </Btn>
            </div>
            <textarea
              ref={csvTextareaRef}
              readOnly
              value={csvModal}
              onClick={()=>{ csvTextareaRef.current?.select(); }}
              style={{
                flex:1,minHeight:260,
                background:C.surface2,border:`1px solid ${C.border}`,borderRadius:8,
                color:C.outText,fontFamily:"'Courier New',monospace",fontSize:10.5,
                padding:"12px",resize:"vertical",outline:"none",
                lineHeight:1.5,overflowY:"auto",
              }}
            />
            <div style={{fontSize:10.5,color:C.muted,marginTop:8}}>
              {csvModal.split("\n").length - 1} order row{csvModal.split("\n").length-1!==1?"s":""}
              {" "}· Click the text area to select all, then Ctrl+C / ⌘C to copy manually
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// TAB 3 — INPUTS
// ═══════════════════════════════════════════════════════════════════════
function InputsTab({prod,setProd,derived}) {
  function setP(k,v){setProd(p=>({...p,[k]:v}));}

  return (
    <div style={{padding:"0 18px 24px"}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:14}}>
        {[
          {label:"Time per HPT (min)",    key:"timePerHPT",      step:1},
          {label:"Ink Cost / Color ($)",  key:"inkCostPerColor", step:0.001},
          {label:"Lighting/Electric ($)", key:"lightingCost",    step:0.01},
          {label:"Screen Cost ($)",       key:"screenCost",      step:0.5},
        ].map(f=>(
          <div key={f.key} style={cardSt()}>
            <div style={labelSt}>{f.label} <Badge>input</Badge></div>
            <Num value={prod[f.key]} step={f.step} onChange={v=>setP(f.key,v)}/>
          </div>
        ))}
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
        <div style={cardSt()}>
          <SecTitle icon="💵">Base Labor Rates</SecTitle>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            {[
              {label:"Labor Cost/Hr ($)",key:"laborCostPerHr"},
              {label:"Wage Cost/Hr ($)", key:"wageCostPerHr"},
            ].map(f=>(
              <div key={f.key}>
                <div style={labelSt}>{f.label} <Badge>input</Badge></div>
                <Num value={prod[f.key]} onChange={v=>setP(f.key,v)}/>
              </div>
            ))}
            <div>
              <div style={labelSt}>Total Cost/Hr <Badge color={C.outText}>calc</Badge></div>
              <Out value={fmt$(derived.totalCostPerHr)}/>
            </div>
          </div>
        </div>

        <div style={cardSt()}>
          <SecTitle icon="🧮">Cost Calc Estimate (Imprint 1)</SecTitle>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
            {[
              {label:"Colors",          val:derived.imp1Colors},
              {label:"Pieces",          val:derived.imp1Pieces},
              {label:"Ink Total ($)",   val:fmt$(derived.inkTotalCost)},
              {label:"Screen Total ($)",val:fmt$(derived.screenTotalCost)},
              {label:"COGS ($)",        val:fmt$(derived.cogs)},
              {label:"Print Profit ($)",val:fmt$(derived.printingProfit1)},
              {label:"Wage Cost ($)",   val:fmt$(derived.wageTotal)},
              {label:"Price/Unit ($)",  val:fmt$(derived.pricePerUnit)},
            ].map(r=>(
              <div key={r.label}>
                <div style={labelSt}>{r.label} <Badge color={C.outText}>calc</Badge></div>
                <Out value={r.val}/>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={cardSt()}>
        <SecTitle icon="🏭">Production Department Costs (Imprint 1)</SecTitle>
        <div style={{fontSize:11,color:C.dim,marginBottom:10}}>
          Setup: <Badge color={C.gold}>min/color</Badge>&nbsp;&nbsp;
          Press: <Badge color={C.red}>pieces/hr</Badge>&nbsp;&nbsp;
          Shipping: <Badge>fixed hrs</Badge>
        </div>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
            <thead>
              <tr>
                {["Department","Type","Input","","Time/Unit (hrs)","Min Time (hrs)","Total Cost ($)"].map((h,i)=>(
                  <th key={i} style={{
                    padding:"7px 9px",textAlign:i>1?"center":"left",color:C.dim,
                    fontWeight:600,textTransform:"uppercase",fontSize:10,letterSpacing:"0.04em",
                    borderBottom:`1px solid ${C.border}`,background:C.surface2,
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {derived.depts.map((dept,di)=>{
                const isFixed=dept.type==="fixed";
                const inputLabel=dept.type==="setup"?"min/color":dept.type==="press"?"pc/hr":"hrs";
                return (
                  <tr key={dept.name} style={{borderBottom:`1px solid ${C.border}22`,background:di%2===0?C.surface2:C.surface}}>
                    <td style={{padding:"7px 9px",color:C.text,fontWeight:500}}>{dept.name}</td>
                    <td style={{padding:"6px 9px"}}>
                      <Badge color={dept.type==="setup"?C.gold:dept.type==="press"?C.red:C.dim}>{dept.type}</Badge>
                    </td>
                    <td style={{padding:"5px 5px",textAlign:"center"}}>
                      <Num value={prod[dept.key]} step={isFixed?0.05:1}
                        onChange={v=>setP(dept.key,v)} style={{width:68,textAlign:"center"}}/>
                    </td>
                    <td style={{padding:"5px 5px",color:C.muted,fontSize:10,textAlign:"center"}}>{inputLabel}</td>
                    <td style={{padding:"7px 9px",textAlign:"center"}}><Out value={fmtHrs(dept.timePerUnit)} style={{textAlign:"center"}}/></td>
                    <td style={{padding:"7px 9px",textAlign:"center"}}><Out value={fmtHrs(dept.totalHrs)} style={{textAlign:"center"}}/></td>
                    <td style={{padding:"7px 9px",textAlign:"center"}}><Out value={fmt$(dept.totalCost)} style={{textAlign:"center"}}/></td>
                  </tr>
                );
              })}
              <tr style={{borderTop:`2px solid ${C.border}`,background:C.surface2}}>
                <td colSpan={4} style={{padding:"8px 9px",color:C.text,fontWeight:700}}>TOTAL</td>
                <td/>
                <td style={{padding:"8px 9px",textAlign:"center"}}>
                  <Out value={fmtHrs(derived.totalDeptHrs)} style={{textAlign:"center",fontWeight:700}}/>
                </td>
                <td style={{padding:"8px 9px",textAlign:"center"}}>
                  <Out value={fmt$(derived.deptWageCost)} style={{textAlign:"center",fontWeight:700}}/>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginTop:14}}>
          {[
            {label:"Setup Time/Color (hrs)", val:fmtHrs(derived.setupTimePerColor)},
            {label:"Press Time/Item (hrs)",  val:fmtHrs(derived.pressTimePerItem)},
            {label:"Additional Time (hrs)",  val:fmtHrs(derived.additionalTime)},
          ].map(r=>(
            <div key={r.label}>
              <div style={labelSt}>{r.label} <Badge color={C.outText}>calc</Badge></div>
              <Out value={r.val}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// LOGIN GATE
// ═══════════════════════════════════════════════════════════════════════
const SITE_PASSWORD = "Inkline";
const AUTH_KEY = "inkline-authed";

function LoginGate({onSuccess}) {
  const [pw,setPw]       = useState("");
  const [error,setError] = useState(false);

  function submit(e){
    e.preventDefault();
    if(pw===SITE_PASSWORD){
      try{ window.sessionStorage.setItem(AUTH_KEY,"1"); }catch(_){}
      onSuccess();
    }else{
      setError(true);
    }
  }

  return (
    <div style={{
      background:C.bg,minHeight:"100vh",color:C.text,
      fontFamily:"'Outfit','DM Sans',sans-serif",
      display:"flex",alignItems:"center",justifyContent:"center",padding:20,
    }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');`}</style>
      <form onSubmit={submit} style={{
        background:C.surface,border:`1px solid ${C.border}`,borderRadius:14,
        padding:"32px 30px",width:"100%",maxWidth:340,
        boxShadow:"0 20px 60px rgba(0,0,0,0.6)",
      }}>
        <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:20,letterSpacing:"0.1em",marginBottom:4}}>
          INKLINE PRICING
        </div>
        <div style={{fontSize:11,color:C.dim,marginBottom:20}}>Enter password to continue</div>
        <input
          type="password" autoFocus value={pw}
          onChange={e=>{setPw(e.target.value);setError(false);}}
          placeholder="Password"
          style={{...inputSt,marginBottom:error?8:16, borderColor:error?C.danger:C.border}}
        />
        {error&&<div style={{color:C.danger,fontSize:12,marginBottom:16}}>Incorrect password.</div>}
        <Btn variant="primary" style={{width:"100%",justifyContent:"center"}}>Enter</Btn>
      </form>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// ROOT APP
// ═══════════════════════════════════════════════════════════════════════
export default function InklineDashboard() {
  const [authed,setAuthed] = useState(()=>{
    try{ return window.sessionStorage.getItem(AUTH_KEY)==="1"; }catch(_){ return false; }
  });
  const [tab,setTab]                 = useState("newOrder");
  const [prod,setProd]               = useState(DEFAULT_PROD);
  const [order,setOrder]             = useState({...DEFAULT_ORDER,date:today()});
  const [services,setServices]       = useState(DEFAULT_SERVICES);
  const [laborRates,setLaborRates]   = useState(DEFAULT_LABOR_RATES);
  const [lossAll,setLossAll]         = useState(DEFAULT_LOSS);
  const [savedOrders,setSavedOrders] = useState([]);
  const [extraCustomers,setExtraCust]= useState([]); // new names typed but not yet in an order
  const [hydrated,setHydrated]       = useState(false);
  const [toast,setToast]             = useState(null);
  const [overwriteTarget,setOverwrite] = useState(null); // {existing, incoming}

  // Persist (browser localStorage)
  useEffect(()=>{
    try{
      const raw = window.localStorage.getItem("inkline-v4");
      if(raw){
        const d=JSON.parse(raw);
        if(d.prod)          setProd(d.prod);
        if(d.services)      setServices(d.services);
        if(d.laborRates)    setLaborRates(d.laborRates);
        if(d.lossAll)       setLossAll(d.lossAll);
        if(d.savedOrders)   setSavedOrders(d.savedOrders);
        if(d.extraCustomers)setExtraCust(d.extraCustomers);
      }
    }catch(_){}
    setHydrated(true);
  },[]);

  useEffect(()=>{
    if(!hydrated) return;
    try{
      window.localStorage.setItem("inkline-v4",
        JSON.stringify({prod,services,laborRates,lossAll,savedOrders,extraCustomers})
      );
    }catch(_){}
  },[prod,services,laborRates,lossAll,savedOrders,extraCustomers,hydrated]);

  // Derive full customer list from saved orders + any extra typed names
  const customers = useMemo(()=>{
    const fromOrders = savedOrders.map(o=>o.customer).filter(Boolean);
    return [...new Set([...fromOrders,...extraCustomers])].sort();
  },[savedOrders,extraCustomers]);

  const derived = useMemo(()=>computeAll(order,prod,lossAll),[order,prod,lossAll]);

  function showToast(msg,type="success"){
    setToast({msg,type});
    setTimeout(()=>setToast(null),3200);
  }

  function buildSavedOrder(){
    return {
      ...order, id:uid(), date:order.date||today(),
      laborCostPerHr:prod.laborCostPerHr, wageCostPerHr:prod.wageCostPerHr,
      handlingFeePerPc:derived.handlingFeePerPc,
      impCostPerPiece:[...derived.impCostPerPiece],
    };
  }

  function saveOrder(){
    if(!order.customer.trim()){showToast("Please enter a customer name.","error");return;}
    if(!order.project.trim()){showToast("Please enter a project name.","error");return;}
    const incoming = buildSavedOrder();
    const existing = savedOrders.find(
      o => o.customer.trim().toLowerCase()===order.customer.trim().toLowerCase()
        && o.project.trim().toLowerCase()===order.project.trim().toLowerCase()
    );
    if(existing){
      setOverwrite({existing, incoming});
      return;
    }
    commitSave(incoming);
  }

  function commitSave(saved){
    setSavedOrders(os=>[saved,...os.filter(o=>o.id!==saved._replaceId)]);
    // Remove from extraCustomers once their name is in a real order
    setExtraCust(ec=>ec.filter(c=>c!==saved.customer));
    showToast(`Order saved for ${saved.customer}!`);
  }

  function doOverwrite(){
    const {existing, incoming} = overwriteTarget;
    const replaced = {...incoming, id:existing.id};
    setSavedOrders(os=>os.map(o=>o.id===existing.id?replaced:o));
    setExtraCust(ec=>ec.filter(c=>c!==replaced.customer));
    showToast(`Order overwritten for ${replaced.customer}!`);
    setOverwrite(null);
  }

  function resetOrder(){
    setOrder({
      ...DEFAULT_ORDER,
      date:today(),
    });
    setProd(p=>({...p, laborCostPerHr:laborRates.retail}));
    showToast("Order reset.");
  }

  function loadOrder(saved){
    setOrder(saved);
    if(saved.laborCostPerHr) setProd(p=>({...p,laborCostPerHr:saved.laborCostPerHr}));
    if(saved.wageCostPerHr)  setProd(p=>({...p,wageCostPerHr:saved.wageCostPerHr}));
    setTab("newOrder");
    showToast(`Loaded order for ${saved.customer}`);
  }

  // Change 4: attach current customer to the order being confirmed, so modal can show it
  function prepareLoadOrder(saved){
    return {...saved, _currentCustomer:order.customer};
  }

  const tabs=[
    {id:"newOrder",    label:"New Order",    icon:"✦"},
    {id:"priorOrders", label:"Prior Orders", icon:"🗂"},
    {id:"inputs",      label:"Inputs",       icon:"⚙️"},
  ];

  if(!authed) return <LoginGate onSuccess={()=>setAuthed(true)} />;

  return (
    <div style={{background:C.bg,minHeight:"100vh",fontFamily:"'Outfit','DM Sans',sans-serif",color:C.text}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Bebas+Neue&display=swap');
        *{box-sizing:border-box;}
        /* Change #4: remove all number input spinners */
        input[type=number]::-webkit-outer-spin-button,
        input[type=number]::-webkit-inner-spin-button{-webkit-appearance:none;margin:0;}
        input[type=number]{-moz-appearance:textfield;}
        input:focus,select:focus{border-color:${C.red}!important;box-shadow:0 0 0 2px ${C.red}22;}
        select{background:${C.inBg};color:${C.text};}
        ::-webkit-scrollbar{width:5px;height:5px;}
        ::-webkit-scrollbar-track{background:${C.bg};}
        ::-webkit-scrollbar-thumb{background:${C.border};border-radius:3px;}
        ::-webkit-scrollbar-thumb:hover{background:${C.borderHi};}
      `}</style>

      {/* ── HEADER (change #9: logo prominent) ── */}
      <div style={{
        background:"linear-gradient(135deg,#0b0103 0%,#160307 60%,#0b0103 100%)",
        borderBottom:`1px solid ${C.redDim}`,
        position:"sticky",top:0,zIndex:50,
        boxShadow:"0 2px 20px rgba(0,0,0,0.6)",
      }}>
        <div style={{maxWidth:1700,margin:"0 auto",padding:"0 22px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>

          {/* Logo + wordmark */}
          <div style={{display:"flex",alignItems:"center",gap:18,padding:"11px 0"}}>
            {/* Logo image */}
            <div style={{
              display:"flex",alignItems:"center",padding:"4px 0",
            }}>
              <img
                src={`data:${LOGO_MIME};base64,${LOGO_B64}`}
                alt="Inkline Printing"
                style={{height:40,objectFit:"contain",display:"block"}}
              />
            </div>
            {/* Title block */}
            <div>
              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:18,letterSpacing:"0.14em",color:C.text,lineHeight:1.1}}>
                PRICING DASHBOARD
              </div>
              <div style={{fontSize:9.5,color:C.dim,letterSpacing:"0.1em",textTransform:"uppercase",marginTop:1}}>
                Screen Printing · Worthington, OH
              </div>
            </div>
          </div>

          {/* Tab nav */}
          <div style={{display:"flex",gap:2}}>
            {tabs.map(t=>(
              <button key={t.id} onClick={()=>setTab(t.id)} style={{
                background:tab===t.id?C.red:"transparent",
                color:tab===t.id?"#fff":C.dim,
                border:"none",borderRadius:"6px 6px 0 0",
                padding:"13px 22px",fontSize:11.5,fontWeight:600,
                cursor:"pointer",fontFamily:"inherit",
                textTransform:"uppercase",letterSpacing:"0.08em",
                display:"flex",alignItems:"center",gap:7,
                transition:"all 0.18s",
                borderBottom:tab===t.id?`2px solid ${C.red}`:"2px solid transparent",
              }}>
                <span>{t.icon}</span>{t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div style={{maxWidth:1700,margin:"0 auto",paddingTop:18}}>
        {tab==="newOrder"&&
          <NewOrderTab order={order} setOrder={setOrder} derived={derived}
            prod={prod} setProd={setProd}
            services={services} setServices={setServices}
            laborRates={laborRates} setLaborRates={setLaborRates}
            lossAllowances={lossAll} setLossAllowances={setLossAll}
            customers={customers} onAddCustomer={c=>setExtraCust(ec=>[...new Set([...ec,c])])}
            onSaveOrder={saveOrder}
            onResetOrder={resetOrder}/>}

        {tab==="priorOrders"&&
          <PriorOrdersTab savedOrders={savedOrders} setSavedOrders={setSavedOrders}
            onLoadOrder={loadOrder}
            onSaveCurrentOrder={saveOrder}
            prepareLoadOrder={prepareLoadOrder}
            onImportOrders={importedOrders=>{
              setSavedOrders(os=>{
                // merge: skip duplicates by customer+project+date
                const existing = new Set(os.map(o=>`${o.customer}|${o.project}|${o.date}`));
                const fresh = importedOrders.filter(o=>!existing.has(`${o.customer}|${o.project}|${o.date}`));
                return [...fresh,...os];
              });
            }}
            lossAllowances={lossAll}/>}

        {tab==="inputs"&&
          <InputsTab prod={prod} setProd={setProd} derived={derived}/>}
      </div>

      {/* ── TOAST ── */}
      {toast&&(
        <div style={{
          position:"fixed",bottom:24,right:24,zIndex:999,
          background:toast.type==="error"?"#200808":"#081a08",
          border:`1px solid ${toast.type==="error"?C.danger:C.success}`,
          borderRadius:10,padding:"12px 20px",color:C.text,
          boxShadow:"0 8px 24px rgba(0,0,0,0.6)",
          display:"flex",alignItems:"center",gap:10,fontSize:13,
        }}>
          <span>{toast.type==="error"?"⚠️":"✅"}</span>{toast.msg}
        </div>
      )}

      {/* ── OVERWRITE CONFIRM MODAL ── */}
      {overwriteTarget&&(
        <div style={{
          position:"fixed",inset:0,zIndex:600,
          background:"rgba(0,0,0,0.78)",backdropFilter:"blur(4px)",
          display:"flex",alignItems:"center",justifyContent:"center",
        }}>
          <div style={{
            background:C.surface,border:`1px solid ${C.border}`,
            borderRadius:14,padding:"28px 32px",maxWidth:420,width:"90%",
            boxShadow:"0 20px 60px rgba(0,0,0,0.7)",
          }}>
            <div style={{fontSize:18,fontWeight:700,color:C.text,marginBottom:10}}>
              ⚠️ Duplicate Order Found
            </div>
            <div style={{fontSize:13,color:C.dim,marginBottom:6,lineHeight:1.7}}>
              An order already exists for:
            </div>
            <div style={{
              background:C.surface2,borderRadius:8,padding:"10px 14px",
              marginBottom:16,border:`1px solid ${C.border}`,
            }}>
              <div style={{color:C.gold,fontWeight:700,fontSize:13}}>
                {overwriteTarget.existing.customer}
              </div>
              <div style={{color:C.text,fontSize:12,marginTop:2}}>
                {overwriteTarget.existing.project}
              </div>
              <div style={{color:C.muted,fontSize:11,marginTop:2}}>
                Saved on {overwriteTarget.existing.date}
              </div>
            </div>
            <div style={{fontSize:13,color:C.text,marginBottom:22,lineHeight:1.6}}>
              Would you like to <strong style={{color:C.red}}>overwrite</strong> the existing order,
              or <strong>change the job name</strong> before saving?
            </div>
            <div style={{display:"flex",gap:10,justifyContent:"flex-end",flexWrap:"wrap"}}>
              <Btn variant="ghost" onClick={()=>setOverwrite(null)} style={{fontSize:12}}>
                ✏️ Change Job Name
              </Btn>
              <Btn variant="primary" onClick={doOverwrite} style={{fontSize:12}}>
                🔁 Overwrite
              </Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
