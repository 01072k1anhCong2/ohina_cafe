import React, { useState, useEffect } from "react";

/* ═══════════════════════════════════════════
   DATA
═══════════════════════════════════════════ */
const MATCHA_POWDER = [
  {
    id:"p1",
    name:"宇治抹茶パウダー タイプA",
    nameEn:"Kyoto Uji Matcha Powder Type A",
    grade:"儀式用最高級グレード",
    gradeEn:"Ceremonial Grade",
    price:9800, originalPrice:1200, weight:"100g",
    origin:"京都府宇治市", harvest:"一番摘み（春）", processing:"伝統石臼挽き",
    color:"#1b4332", lightColor:"#d8f3dc", accentColor:"#2d6a4f",
    badge:"最高級", badgeBg:"#e63946", emoji:"🏆", highlight:true,
    features:[
      {icon:"🌿",title:"一番摘み",desc:"春の新芽のみを手摘みした最上質の茶葉を使用"},
      {icon:"⚙️",title:"石臼挽き",desc:"時間をかけて石臼で挽いた超微細粉末"},
      {icon:"🎨",title:"鮮やかな緑",desc:"一番摘みならではのエメラルドグリーン"},
      {icon:"✨",title:"umami豊富",desc:"甘み・旨み・苦みの完璧なバランス"},
    ],
    longDesc:"京都府宇治市の老舗茶園から直接仕入れた、最高級の一番摘み抹茶です。春の柔らかな新芽だけを丁寧に手摘みし、伝統的な石臼でゆっくりと時間をかけて挽き上げました。鮮やかなエメラルドグリーンと、深い旨み（うまみ）、さわやかな香り、そしてほのかな甘みが特徴です。茶道の点前はもちろん、プレミアムラテやお菓子作りにも最適な、妥協のない逸品です。",
    usage:"お点前・プレミアムラテ・高級和菓子・贈り物",
  },
  {
    id:"p2",
    name:"宇治抹茶パウダー タイプB",
    nameEn:"Kyoto Uji Matcha Powder Type B",
    grade:"料理用プレミアムグレード",
    gradeEn:"Premium Culinary Grade",
    price:8500, originalPrice:null, weight:"100g",
    origin:"京都府宇治市", harvest:"二番摘み", processing:"伝統石臼挽き",
    color:"#40916c", lightColor:"#b7e4c7", accentColor:"#2d6a4f",
    badge:"人気", badgeBg:"#40916c", emoji:"🌿", highlight:false,
    features:[
      {icon:"🍳",title:"料理・製菓向け",desc:"ラテ・スイーツ・パン・アイスなど幅広く活用"},
      {icon:"💪",title:"濃厚な風味",desc:"二番摘み特有の力強い抹茶の香りと風味"},
      {icon:"💰",title:"コスパ優秀",desc:"日常使いに最適なリーズナブルな価格設定"},
      {icon:"🎨",title:"深い緑色",desc:"焼き菓子・料理に鮮やかな緑色を与える"},
    ],
    longDesc:"同じく京都府宇治市の契約農園から仕入れた二番摘みの抹茶パウダーです。タイプAと比べて風味がより力強く、抹茶独特のほろ苦さが際立ちます。ラテ・アイスクリーム・ケーキ・クッキーなど、様々な料理やお菓子作りに最適。石臼挽きならではの細かい粒子が食材によく溶け込み、均一な仕上がりをお約束します。毎日の抹茶ライフをもっと身近に楽しんでいただけます。",
    usage:"抹茶ラテ・製菓・料理・アイスクリーム・日常使い",
  },
];

const DRINKS = [
  {id:"d1",name:"抹茶",sub:"Matcha",price:650,note:"※イートインのみのご提供",
    desc:"茶筅（ちゃせん）で丁寧に泡立てた本格的な一服。宇治産タイプAの抹茶を一杯ごとに心を込めて点てます。イートインのお客様限定のご提供です。",
    emoji:"🍵",bg:"#d8f3dc",accent:"#2d6a4f",tag:"イートインのみ",milk:false},
  {id:"d2",name:"濃厚抹茶ラテ",sub:"Rich Matcha Latte",price:750,note:"",
    desc:"香り高い宇治産タイプAの抹茶にミルクを合わせた、当店一番人気のメニュー。クリーミーで濃厚な味わいをお楽しみください。アイスのみミルク変更可能です。",
    emoji:"🥛",bg:"#b7e4c7",accent:"#1b4332",tag:"人気 No.1",milk:true},
  {id:"d3",name:"ほうじ茶",sub:"Hōjicha",price:650,note:"",
    desc:"炭火でじっくり焙煎した香ばしいほうじ茶を使用。心落ち着く深みのある香りと、やさしい甘みが特徴の一杯です。ほっとする温かさをお届けします。",
    emoji:"🍂",bg:"#f4e4c8",accent:"#7b4a1e",tag:"",milk:false},
  {id:"d4",name:"ほうじ茶ラテ",sub:"Hōjicha Latte",price:750,note:"",
    desc:"炭火焙煎の香ばしいほうじ茶を、やさしいミルクと合わせた一杯。深みのある香ばしさと心落ち着く味わい。アイスのみミルク変更可能です。",
    emoji:"☕",bg:"#e8d5b7",accent:"#6b4226",tag:"",milk:true},
];

const SWEETS = [
  {id:"s1",name:"ラズベリーとローズ香るハート型モナカ",sub:"Raspberry & Rose Heart Monaka",price:880,
    desc:"ふわりと広がる甘い香りと、とろーりなめらかな口どけ。やさしい甘さにほんのりとした酸味が重なって、まるで春の花びらがひらりと舞うような心ときめく味わいです。見た目も可愛らしく、思わず笑顔になる春限定スイーツ。",
    emoji:"🍓",bg:"#fce4ec",accent:"#c2185b",tag:"♡ 季節限定"},
  {id:"s2",name:"ドバイロール",sub:"Dubai Roll",price:880,
    desc:"ドバイチョコからインスパイアされた贅沢な新感覚スイーツ。サクっと軽やかな食感に、濃厚でなめらかな特製チーズクリームが広がります。華やかな香りと甘すぎない上品な味わいをひと口でご堪能ください。",
    emoji:"🥐",bg:"#fff3e0",accent:"#e65100",tag:"新スイーツ"},
  {id:"s3",name:"スイーツ＋ラテセット",sub:"Sweets + Latte Set",price:1600,
    desc:"お好みのスイーツと濃厚抹茶ラテをセットでお得にお楽しみいただけます。カラフルラテ・オーツミルクへの変更は各＋¥100にて承ります。",
    emoji:"🎁",bg:"#e8f5e9",accent:"#2d6a4f",tag:"お得セット",note:"カラフルラテ・オーツミルク +¥100"},
];

const DESSERTS = [
  {id:"ds1",name:"お雛様パフェ",sub:"Ohinasama Parfait",price:1500,
    desc:"ハート型ピンクのモナカを飾った華やかなパフェ。ラズベリー・薔薇風味の餡・ライチが重なり、サクサクのパフライス・バニラアイス・生クリームが彩る、春の味わいが詰まった一皿です。見た目も可愛く、記念日にも最適。",
    emoji:"🍨",bg:"#fce4ec",accent:"#ad1457",tag:"🌸 看板メニュー"},
  {id:"ds2",name:"お雛様クレープ 2個セット",sub:"Ohinasama Crepe Set",price:1500,priceAlt:"1個 ¥850",
    desc:"お雛様をイメージしたクレープ2種セット。お内裏様は抹茶クレープのお着物、おひなさまはピンクの米肌のお着物。フランボワーズジャム・バームクーヘン・生クリームのエレガントな味わいをお楽しみください。",
    emoji:"🌸",bg:"#fdf2f8",accent:"#9c27b0",tag:"🎎 お雛様セット"},
];

const PAYMENTS=[
  {icon:"📱",name:"au PAY"},{icon:"📲",name:"dBarai"},{icon:"💚",name:"PayPay"},
  {icon:"🔴",name:"Rakuten Pay"},{icon:"📡",name:"NFC モバイル決済"},
  {icon:"💳",name:"デビットカード"},{icon:"💳",name:"クレジットカード"},
  {icon:"🚃",name:"交通系ICカード"},{icon:"💴",name:"V-Money"},
];

/* ═══════════════════════════════════════════
   SHARED STYLE
═══════════════════════════════════════════ */
const qBtnSt={width:28,height:28,borderRadius:"50%",border:"1.5px solid #b7e4c7",background:"#fff",cursor:"pointer",fontSize:14,fontWeight:700,color:"#1b4332",display:"flex",alignItems:"center",justifyContent:"center",lineHeight:1,flexShrink:0};

/* ═══════════════════════════════════════════
   CART PANEL
═══════════════════════════════════════════ */
function CartPanel({cart,onClose,onRemove,onQty}){
  const total=cart.reduce((s,i)=>s+i.price*i.qty,0);
  return(
    <>
      <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.55)",zIndex:400,backdropFilter:"blur(8px)",animation:"fadeIn .25s ease"}}/>
      <aside style={{position:"fixed",right:0,top:0,bottom:0,width:"min(420px,100vw)",background:"#fff",zIndex:401,display:"flex",flexDirection:"column",boxShadow:"-20px 0 60px rgba(0,0,0,0.2)",animation:"slideRight .35s cubic-bezier(.22,.68,0,1.2)"}}>
        <div style={{background:"linear-gradient(135deg,#1b4332,#2d6a4f)",padding:"24px 24px 18px",color:"#fff",flexShrink:0}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div>
              <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:9,letterSpacing:3,opacity:.7,textTransform:"uppercase"}}>Shopping Bag</p>
              <h3 style={{fontFamily:"'Noto Serif JP',serif",fontSize:19,fontWeight:700,marginTop:3}}>ご注文内容 <span style={{fontSize:12,opacity:.7}}>（{cart.reduce((s,i)=>s+i.qty,0)}点）</span></h3>
            </div>
            <button onClick={onClose} style={{background:"rgba(255,255,255,0.18)",border:"none",color:"#fff",width:36,height:36,borderRadius:"50%",cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
          </div>
        </div>
        <div style={{flex:1,overflowY:"auto",padding:"10px 22px"}}>
          {cart.length===0?(
            <div style={{textAlign:"center",padding:"52px 0"}}>
              <div style={{fontSize:50,marginBottom:12}}>🍵</div>
              <p style={{fontFamily:"'Noto Serif JP',serif",fontSize:14,color:"#74c69d"}}>カートは空です</p>
              <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,color:"#bbb",marginTop:6}}>お好みのメニューをお選びください</p>
            </div>
          ):cart.map(item=>(
            <div key={item.id+(item.milkOption||"")} style={{display:"flex",gap:11,alignItems:"center",padding:"12px 0",borderBottom:"1px solid #f0f7f0"}}>
              <div style={{width:48,height:48,borderRadius:10,background:item.lightColor||item.bg||"#d8f3dc",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{item.emoji}</div>
              <div style={{flex:1,minWidth:0}}>
                <p style={{fontFamily:"'Noto Serif JP',serif",fontSize:12,fontWeight:700,color:"#1b4332",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{item.name}</p>
                {item.milkOption&&<p style={{fontSize:10,color:"#74c69d",fontFamily:"'DM Sans',sans-serif",marginTop:1}}>{item.milkOption}</p>}
                <p style={{fontSize:12,fontWeight:700,color:item.accentColor||item.accent||"#2d6a4f",marginTop:2}}>¥{item.price.toLocaleString()}</p>
              </div>
              <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:5}}>
                <div style={{display:"flex",alignItems:"center",gap:5}}>
                  <button onClick={()=>onQty(item.id,item.milkOption||null,item.qty-1)} style={qBtnSt}>−</button>
                  <span style={{fontSize:13,fontWeight:700,color:"#1b4332",minWidth:16,textAlign:"center"}}>{item.qty}</span>
                  <button onClick={()=>onQty(item.id,item.milkOption||null,item.qty+1)} style={qBtnSt}>+</button>
                </div>
                <button onClick={()=>onRemove(item.id,item.milkOption||null)} style={{background:"none",border:"none",color:"#e57373",fontSize:9,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>削除</button>
              </div>
            </div>
          ))}
        </div>
        {cart.length>0&&(
          <div style={{padding:"14px 22px 26px",borderTop:"1px solid #e8f5e9",flexShrink:0}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
              <span style={{fontFamily:"'DM Sans',sans-serif",color:"#888",fontSize:12}}>小計</span>
              <span style={{fontFamily:"'DM Sans',sans-serif",color:"#1b4332",fontSize:12}}>¥{total.toLocaleString()}</span>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
              <span style={{fontFamily:"'DM Sans',sans-serif",color:"#888",fontSize:12}}>消費税（10%）</span>
              <span style={{fontFamily:"'DM Sans',sans-serif",color:"#1b4332",fontSize:12}}>¥{Math.round(total*0.1).toLocaleString()}</span>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",paddingTop:10,borderTop:"2px solid #e8f5e9",marginBottom:16}}>
              <span style={{fontFamily:"'Noto Serif JP',serif",fontSize:14,fontWeight:700,color:"#1b4332"}}>合計（税込）</span>
              <span style={{fontFamily:"'Noto Serif JP',serif",fontSize:19,fontWeight:700,color:"#2d6a4f"}}>¥{Math.round(total*1.1).toLocaleString()}</span>
            </div>
            <button style={{width:"100%",padding:"13px",background:"linear-gradient(135deg,#1b4332,#2d6a4f)",color:"#fff",border:"none",borderRadius:12,fontFamily:"'Noto Serif JP',serif",fontSize:13,fontWeight:700,cursor:"pointer",letterSpacing:1}}>ご注文を確定する →</button>
            <p style={{textAlign:"center",marginTop:7,fontSize:9,color:"#bbb",fontFamily:"'DM Sans',sans-serif"}}>※ レジにてお支払いください</p>
          </div>
        )}
      </aside>
    </>
  );
}

/* ═══════════════════════════════════════════
   POWDER CARD
═══════════════════════════════════════════ */
function PowderCard({item,onAdd}){
  const [qty,setQty]=useState(1);
  const [added,setAdded]=useState(false);
  const [open,setOpen]=useState(false);
  const handleAdd=()=>{
    onAdd({...item,milkOption:null,bg:item.lightColor,accentColor:item.color});
    setAdded(true);setTimeout(()=>setAdded(false),1500);
  };
  return(
    <div style={{background:"#fff",borderRadius:24,overflow:"hidden",boxShadow:item.highlight?"0 8px 40px rgba(27,67,50,0.2)":"0 4px 22px rgba(27,67,50,0.09)",transition:"transform .35s,box-shadow .35s",border:`2px solid ${item.highlight?item.color:"transparent"}`,position:"relative"}}
      onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-8px)";e.currentTarget.style.boxShadow="0 24px 64px rgba(27,67,50,0.2)";}}
      onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow=item.highlight?"0 8px 40px rgba(27,67,50,0.2)":"0 4px 22px rgba(27,67,50,0.09)";}}
    >
      <div style={{position:"absolute",top:16,right:16,zIndex:2,background:item.badgeBg,color:"#fff",fontSize:9,fontFamily:"'DM Sans',sans-serif",fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",padding:"4px 11px",borderRadius:20}}>{item.badge}</div>
      {item.highlight&&<div style={{position:"absolute",top:16,left:16,zIndex:2,background:"rgba(255,255,255,0.9)",color:item.color,fontSize:10,fontFamily:"'Noto Serif JP',serif",fontWeight:700,padding:"4px 11px",borderRadius:20,border:"1px solid "+item.color}}>★ ベストセラー</div>}

      {/* visual */}
      <div style={{height:190,background:`linear-gradient(135deg,${item.lightColor},${item.color}18)`,display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",right:-10,bottom:-20,fontSize:120,color:item.color,opacity:.07,fontFamily:"'Noto Serif JP',serif",fontWeight:900,userSelect:"none",lineHeight:1}}>茶</div>
        <div style={{position:"absolute",top:10,left:14,fontFamily:"'Noto Serif JP',serif",fontSize:10,color:item.color,opacity:.6,letterSpacing:2}}>{item.origin}</div>
        <span style={{fontSize:84,filter:`drop-shadow(0 14px 28px ${item.color}55)`,animation:"floatEmoji 5s ease-in-out infinite",zIndex:1}}>{item.emoji}</span>
        <div style={{position:"absolute",bottom:0,left:0,right:0,height:44,background:"linear-gradient(to top,#fff,transparent)"}}/>
      </div>

      {/* body */}
      <div style={{padding:"20px 22px 22px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8,marginBottom:8}}>
          <div style={{flex:1,minWidth:0}}>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:9,color:item.color,fontWeight:700,letterSpacing:2,textTransform:"uppercase",marginBottom:4}}>{item.grade}</p>
            <h3 style={{fontFamily:"'Noto Serif JP',serif",fontSize:15,fontWeight:900,color:"#1b4332",lineHeight:1.35}}>{item.name}</h3>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:9,color:"#95d5b2",marginTop:3}}>{item.nameEn}</p>
          </div>
          <div style={{textAlign:"right",flexShrink:0}}>
            {item.originalPrice&&<p style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,color:"#ccc",textDecoration:"line-through",marginBottom:1}}>¥{item.originalPrice.toLocaleString()}</p>}
            <p style={{fontFamily:"'Noto Serif JP',serif",fontSize:22,fontWeight:900,color:item.color,lineHeight:1}}>¥{item.price.toLocaleString()}</p>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:9,color:"#aaa",marginTop:2}}>{item.weight} · 税抜</p>
          </div>
        </div>

        {/* info pills */}
        <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:14}}>
          {[[item.origin,"📍"],[item.harvest,"🌱"],[item.processing,"⚙️"]].map(([txt,ic])=>(
            <span key={txt} style={{display:"inline-flex",alignItems:"center",gap:4,background:item.lightColor,color:item.color,fontSize:9,fontFamily:"'Noto Serif JP',serif",fontWeight:600,padding:"3px 9px",borderRadius:20}}>{ic} {txt}</span>
          ))}
        </div>

        {/* desc expand */}
        <div style={{marginBottom:14}}>
          <p style={{fontFamily:"'Noto Serif JP',serif",fontSize:12,lineHeight:1.95,color:"#4a6c55",display:"-webkit-box",WebkitLineClamp:open?999:4,WebkitBoxOrient:"vertical",overflow:"hidden"}}>{item.longDesc}</p>
          <button onClick={()=>setOpen(o=>!o)} style={{background:"none",border:"none",color:item.color,fontFamily:"'DM Sans',sans-serif",fontSize:10,fontWeight:600,cursor:"pointer",marginTop:3,padding:0}}>
            {open?"▲ 閉じる":"▼ 続きを読む"}
          </button>
        </div>

        {/* features 2x2 */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7,marginBottom:14}}>
          {item.features.map(f=>(
            <div key={f.title} style={{background:item.lightColor+"70",borderRadius:10,padding:"9px 11px"}}>
              <p style={{fontSize:14,marginBottom:3}}>{f.icon}</p>
              <p style={{fontFamily:"'Noto Serif JP',serif",fontSize:10,fontWeight:700,color:item.color,marginBottom:2}}>{f.title}</p>
              <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:9,color:"#556052",lineHeight:1.55}}>{f.desc}</p>
            </div>
          ))}
        </div>

        {/* usage */}
        <div style={{background:`linear-gradient(135deg,${item.lightColor}88,${item.lightColor}44)`,borderRadius:10,padding:"9px 13px",marginBottom:16,border:"1px solid "+item.lightColor}}>
          <p style={{fontFamily:"'Noto Serif JP',serif",fontSize:10,color:item.color,fontWeight:700}}>🍵 おすすめの使い方</p>
          <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,color:"#556052",marginTop:3,lineHeight:1.6}}>{item.usage}</p>
        </div>

        {/* qty + add */}
        <div style={{display:"flex",gap:9,alignItems:"center"}}>
          <div style={{display:"flex",alignItems:"center",gap:8,background:"#f8fdf9",borderRadius:10,padding:"7px 12px",flexShrink:0}}>
            <button onClick={()=>setQty(q=>Math.max(1,q-1))} style={{...qBtnSt,border:"1.5px solid "+item.lightColor}}>−</button>
            <span style={{fontSize:14,fontWeight:700,color:"#1b4332",minWidth:20,textAlign:"center"}}>{qty}</span>
            <button onClick={()=>setQty(q=>q+1)} style={{...qBtnSt,border:"1.5px solid "+item.lightColor}}>+</button>
          </div>
          <button onClick={handleAdd} style={{flex:1,padding:"11px 8px",background:added?"#52b788":`linear-gradient(135deg,${item.color},#1b4332)`,color:"#fff",border:"none",borderRadius:10,fontFamily:"'Noto Serif JP',serif",fontSize:11,fontWeight:700,cursor:"pointer",transition:"all .3s",display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>
            {added?"✓ 追加しました！":"🛒 カートに追加"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   DRINK CARD
═══════════════════════════════════════════ */
function DrinkCard({item,onAdd}){
  const [milk,setMilk]=useState("MILK 牛乳");
  const [added,setAdded]=useState(false);
  const extra=milk.includes("+¥100")?100:0;
  const fp=item.price+extra;
  const handleAdd=()=>{
    onAdd({...item,price:fp,milkOption:item.milk?milk:null,bg:item.bg,accentColor:item.accent,lightColor:item.bg});
    setAdded(true);setTimeout(()=>setAdded(false),1500);
  };
  return(
    <div style={{background:"#fff",borderRadius:20,overflow:"hidden",boxShadow:"0 2px 16px rgba(27,67,50,0.08)",transition:"transform .3s,box-shadow .3s"}}
      onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-6px)";e.currentTarget.style.boxShadow="0 16px 48px rgba(27,67,50,0.14)";}}
      onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="0 2px 16px rgba(27,67,50,0.08)";}}
    >
      <div style={{height:128,background:`linear-gradient(135deg,${item.bg},${item.bg}cc)`,display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden"}}>
        {item.tag&&<span style={{position:"absolute",top:10,left:12,background:item.accent,color:"#fff",fontSize:9,fontFamily:"'DM Sans',sans-serif",fontWeight:700,letterSpacing:1,padding:"3px 9px",borderRadius:20}}>{item.tag}</span>}
        <span style={{fontSize:58,filter:`drop-shadow(0 6px 14px ${item.accent}50)`,animation:"floatEmoji 4s ease-in-out infinite"}}>{item.emoji}</span>
        <div style={{position:"absolute",bottom:0,left:0,right:0,height:34,background:"linear-gradient(to top,#fff,transparent)"}}/>
      </div>
      <div style={{padding:"14px 16px 16px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:7}}>
          <div>
            <h4 style={{fontFamily:"'Noto Serif JP',serif",fontSize:14,fontWeight:700,color:"#1b4332",lineHeight:1.3}}>{item.name}</h4>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:9,color:"#74c69d",marginTop:2}}>{item.sub}</p>
          </div>
          <div style={{textAlign:"right",flexShrink:0,marginLeft:7}}>
            <p style={{fontFamily:"'Noto Serif JP',serif",fontSize:20,fontWeight:900,color:item.accent}}>¥{fp}</p>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:8,color:"#aaa"}}>税抜</p>
          </div>
        </div>
        <p style={{fontFamily:"'Noto Serif JP',serif",fontSize:11,lineHeight:1.9,color:"#4a6c55",marginBottom:item.milk?10:14}}>{item.desc}</p>
        {item.note&&<p style={{fontFamily:"'Noto Serif JP',serif",fontSize:9,color:item.accent,marginBottom:9,background:item.bg,padding:"3px 9px",borderRadius:8,display:"inline-block"}}>{item.note}</p>}
        {item.milk&&(
          <div style={{marginBottom:12}}>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:8,fontWeight:600,letterSpacing:1.5,color:"#888",textTransform:"uppercase",marginBottom:6}}>ミルクを選ぶ ※アイスのみ</p>
            <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
              {["MILK 牛乳","SOY 豆乳（+¥100）","OATS オーツ（+¥100）"].map(o=>(
                <button key={o} onClick={()=>setMilk(o)} style={{padding:"3px 8px",borderRadius:20,border:`1.5px solid ${milk===o?item.accent:"#e0e0e0"}`,background:milk===o?item.bg:"#fff",color:milk===o?item.accent:"#888",fontFamily:"'DM Sans',sans-serif",fontSize:9,fontWeight:milk===o?700:400,cursor:"pointer",transition:"all .2s"}}>{o}</button>
              ))}
            </div>
          </div>
        )}
        <button onClick={handleAdd} style={{width:"100%",padding:"10px",background:added?"#52b788":`linear-gradient(135deg,${item.accent},#1b4332)`,color:"#fff",border:"none",borderRadius:10,fontFamily:"'Noto Serif JP',serif",fontSize:11,fontWeight:700,cursor:"pointer",transition:"all .3s",display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>
          {added?"✓ 追加しました！":"🛒 カートに追加"}
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   SWEET CARD
═══════════════════════════════════════════ */
function SweetCard({item,onAdd}){
  const [added,setAdded]=useState(false);
  const handleAdd=()=>{
    onAdd({...item,milkOption:null,bg:item.bg,accentColor:item.accent,lightColor:item.bg});
    setAdded(true);setTimeout(()=>setAdded(false),1500);
  };
  return(
    <div style={{background:"#fff",borderRadius:20,overflow:"hidden",boxShadow:"0 2px 16px rgba(0,0,0,0.07)",transition:"transform .3s,box-shadow .3s",display:"flex",flexDirection:"column"}}
      onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-6px)";e.currentTarget.style.boxShadow="0 16px 48px rgba(0,0,0,0.11)";}}
      onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="0 2px 16px rgba(0,0,0,0.07)";}}
    >
      <div style={{height:136,background:`linear-gradient(135deg,${item.bg},${item.bg}bb)`,display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden"}}>
        {item.tag&&<span style={{position:"absolute",top:10,left:12,background:item.accent,color:"#fff",fontSize:9,fontFamily:"'DM Sans',sans-serif",fontWeight:700,letterSpacing:1,padding:"3px 9px",borderRadius:20}}>{item.tag}</span>}
        <span style={{fontSize:64,filter:"drop-shadow(0 8px 18px rgba(0,0,0,0.14))",animation:"floatEmoji 5s ease-in-out infinite"}}>{item.emoji}</span>
        <div style={{position:"absolute",bottom:0,left:0,right:0,height:34,background:"linear-gradient(to top,#fff,transparent)"}}/>
      </div>
      <div style={{padding:"14px 16px 16px",flex:1,display:"flex",flexDirection:"column"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:7}}>
          <div style={{flex:1,marginRight:7}}>
            <h4 style={{fontFamily:"'Noto Serif JP',serif",fontSize:13,fontWeight:700,color:"#1b4332",lineHeight:1.4}}>{item.name}</h4>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:9,color:"#74c69d",marginTop:2}}>{item.sub}</p>
          </div>
          <div style={{textAlign:"right",flexShrink:0}}>
            <p style={{fontFamily:"'Noto Serif JP',serif",fontSize:18,fontWeight:900,color:item.accent}}>¥{item.price.toLocaleString()}</p>
            {item.priceAlt&&<p style={{fontSize:9,color:"#aaa",fontFamily:"'DM Sans',sans-serif",marginTop:1}}>{item.priceAlt}</p>}
          </div>
        </div>
        <p style={{fontFamily:"'Noto Serif JP',serif",fontSize:11,lineHeight:1.9,color:"#4a6c55",flex:1,marginBottom:12}}>{item.desc}</p>
        {item.note&&<p style={{fontFamily:"'Noto Serif JP',serif",fontSize:9,color:item.accent,marginBottom:10,background:item.bg,padding:"4px 10px",borderRadius:8}}>{item.note}</p>}
        <button onClick={handleAdd} style={{width:"100%",padding:"10px",background:added?"#52b788":`linear-gradient(135deg,${item.accent},${item.accent}bb)`,color:"#fff",border:"none",borderRadius:10,fontFamily:"'Noto Serif JP',serif",fontSize:11,fontWeight:700,cursor:"pointer",transition:"all .3s",display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>
          {added?"✓ 追加しました！":"🛒 カートに追加"}
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   SECTION HEADER
═══════════════════════════════════════════ */
function SecHead({en,ja,sub}){
  return(
    <div style={{textAlign:"center",marginBottom:48}}>
      <div style={{display:"inline-flex",alignItems:"center",gap:12,marginBottom:12}}>
        <div style={{height:1,width:30,background:"#b7e4c7"}}/>
        <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:9,fontWeight:600,letterSpacing:3,color:"#52b788",textTransform:"uppercase"}}>{en}</span>
        <div style={{height:1,width:30,background:"#b7e4c7"}}/>
      </div>
      <h2 style={{fontFamily:"'Noto Serif JP',serif",fontSize:"clamp(22px,4vw,40px)",fontWeight:900,color:"#1b4332",letterSpacing:"-.5px",lineHeight:1.2}}>{ja}</h2>
      {sub&&<p style={{fontFamily:"'Noto Serif JP',serif",fontSize:13,color:"#74c69d",marginTop:10,lineHeight:1.9,maxWidth:520,margin:"10px auto 0"}}>{sub}</p>}
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN APP
═══════════════════════════════════════════ */
export default function App(){
  const [cart,setCart]=useState([]);
  const [cartOpen,setCartOpen]=useState(false);
  const [scrolled,setScrolled]=useState(false);
  const [menuOpen,setMenuOpen]=useState(false);
  const [tab,setTab]=useState("drinks");

  useEffect(()=>{
    const s=()=>setScrolled(window.scrollY>60);
    window.addEventListener("scroll",s);
    return()=>window.removeEventListener("scroll",s);
  },[]);

  useEffect(()=>{
    const r=()=>{if(window.innerWidth>=901)setMenuOpen(false);};
    window.addEventListener("resize",r);
    return()=>window.removeEventListener("resize",r);
  },[]);

  // lock body scroll when mobile menu open
  useEffect(()=>{
    document.body.style.overflow=menuOpen?"hidden":"";
    return()=>{document.body.style.overflow="";};
  },[menuOpen]);

  const addToCart=(item)=>{
    setCart(prev=>{
      const mk=item.milkOption||null;
      const ex=prev.find(i=>i.id===item.id&&(i.milkOption||null)===mk);
      if(ex) return prev.map(i=>i.id===item.id&&(i.milkOption||null)===mk?{...i,qty:i.qty+1}:i);
      return [...prev,{...item,qty:1}];
    });
  };
  const removeFromCart=(id,milk)=>setCart(prev=>prev.filter(i=>!(i.id===id&&(i.milkOption||null)===(milk||null))));
  const changeQty=(id,milk,qty)=>{
    if(qty<1){removeFromCart(id,milk);return;}
    setCart(prev=>prev.map(i=>i.id===id&&(i.milkOption||null)===(milk||null)?{...i,qty}:i));
  };
  const totalItems=cart.reduce((s,i)=>s+i.qty,0);

  const goTo=(id)=>{
    setMenuOpen(false);
    setTimeout(()=>document.getElementById(id)?.scrollIntoView({behavior:"smooth"}),menuOpen?300:0);
  };

  const NAV=[["home","ホーム"],["powder","抹茶パウダー"],["menu","メニュー"],["about","お店について"],["access","アクセス"]];
  const TABS=[["drinks","🥛 ドリンク"],["sweets","🍓 スイーツ"],["desserts","🎎 デザート"]];

  return(
    <div style={{fontFamily:"'Noto Serif JP',serif",background:"#f9faf6",color:"#1b4332",overflowX:"hidden",minWidth:300}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;600;700;900&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        ::-webkit-scrollbar{width:4px;}
        ::-webkit-scrollbar-thumb{background:#52b788;border-radius:8px;}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes slideRight{from{opacity:0;transform:translateX(100%)}to{opacity:1;transform:translateX(0)}}
        @keyframes floatEmoji{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-10px) rotate(3deg)}}
        @keyframes floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
        @keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.13)}}
        .nlnk{font-family:'DM Sans',sans-serif;font-size:11px;font-weight:600;letter-spacing:1.8px;text-transform:uppercase;color:#1b4332;position:relative;padding-bottom:3px;transition:color .2s;cursor:pointer;white-space:nowrap;}
        .nlnk::after{content:'';position:absolute;bottom:0;left:0;width:0;height:1.5px;background:#40916c;transition:width .3s;}
        .nlnk:hover::after{width:100%;}
        .nlnk:hover{color:#40916c;}
        .hbadge{display:inline-flex;align-items:center;gap:6px;background:linear-gradient(135deg,#1b5e20,#2e7d32);color:#fff;padding:5px 15px;border-radius:30px;font-family:'DM Sans',sans-serif;font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;}
        @media(max-width:900px){
          .dnav{display:none!important;}
          .hero-grid{grid-template-columns:1fr!important;}
          .hvisual{display:none!important;}
          .pw-grid{grid-template-columns:1fr!important;}
          .mn-grid{grid-template-columns:1fr 1fr!important;}
          .ig{grid-template-columns:1fr!important;}
          .pg{grid-template-columns:repeat(3,1fr)!important;}
          .fg{grid-template-columns:1fr!important;}
        }
        @media(max-width:520px){
          .mn-grid{grid-template-columns:1fr!important;}
          .pg{grid-template-columns:repeat(2,1fr)!important;}
        }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:300,height:scrolled?58:74,background:scrolled?"rgba(249,250,246,0.97)":"transparent",backdropFilter:scrolled?"blur(16px)":"none",borderBottom:scrolled?"1px solid rgba(52,183,120,0.14)":"none",padding:"0 clamp(14px,4vw,54px)",display:"flex",alignItems:"center",justifyContent:"space-between",transition:"all .35s",gap:10}}>

        {/* logo */}
        <div style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer",flexShrink:0}} onClick={()=>goTo("home")}>
          <div style={{width:34,height:34,borderRadius:"50%",background:"linear-gradient(135deg,#1b4332,#52b788)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,boxShadow:"0 3px 10px rgba(27,67,50,0.3)",flexShrink:0}}>🍵</div>
          <div>
            <div style={{fontFamily:"'Noto Serif JP',serif",fontSize:"clamp(10px,2vw,15px)",fontWeight:900,color:"#1b4332",lineHeight:1.15,whiteSpace:"nowrap"}}>お雛カフェ抹茶原宿</div>
            <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:7,color:"#74c69d",letterSpacing:1.5,textTransform:"uppercase",whiteSpace:"nowrap"}}>Harajuku · Matcha Halal</div>
          </div>
        </div>

        {/* desktop links */}
        <div className="dnav" style={{display:"flex",gap:26,flex:1,justifyContent:"center"}}>
          {NAV.map(([id,l])=><span key={id} className="nlnk" onClick={()=>goTo(id)}>{l}</span>)}
        </div>

        {/* cart + hamburger */}
        <div style={{display:"flex",alignItems:"center",gap:7,flexShrink:0}}>
          <button onClick={()=>setCartOpen(true)} style={{display:"flex",alignItems:"center",gap:6,background:totalItems>0?"linear-gradient(135deg,#1b4332,#2d6a4f)":"transparent",border:"1.5px solid #1b4332",color:totalItems>0?"#fff":"#1b4332",padding:"7px 13px",borderRadius:30,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:11,fontWeight:600,transition:"all .3s",position:"relative",whiteSpace:"nowrap"}}>
            <span>🛒</span>
            <span className="ctxt">カート</span>
            <style>{`.ctxt{display:none}@media(min-width:380px){.ctxt{display:inline}}`}</style>
            {totalItems>0&&<span style={{background:"#e63946",color:"#fff",width:17,height:17,borderRadius:"50%",fontSize:9,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",animation:"pulse 2s infinite"}}>{totalItems}</span>}
          </button>

          {/* hamburger — controlled entirely by JS, no CSS display hack */}
          <button
            onClick={()=>setMenuOpen(m=>!m)}
            style={{
              background:menuOpen?"#1b4332":"transparent",
              border:"1.5px solid #1b4332",
              color:menuOpen?"#fff":"#1b4332",
              width:34,height:34,borderRadius:8,
              cursor:"pointer",
              display:"flex",alignItems:"center",justifyContent:"center",
              flexShrink:0,transition:"all .25s",
              // hide on desktop via inline style + JS
            }}
            className="hbtn"
          >
            <style>{`@media(min-width:901px){.hbtn{display:none!important;}}`}</style>
            {menuOpen
              ? <span style={{fontSize:15,lineHeight:1,fontWeight:700}}>✕</span>
              : <div style={{display:"flex",flexDirection:"column",gap:3.5,alignItems:"center",justifyContent:"center"}}>
                  {[0,1,2].map(i=><div key={i} style={{width:14,height:1.5,background:"currentColor",borderRadius:2}}/>)}
                </div>
            }
          </button>
        </div>
      </nav>

      {/* ── MOBILE DRAWER ── (only renders when open, z-index below nav) */}
      {menuOpen&&(
        <div style={{position:"fixed",inset:0,zIndex:299,background:"rgba(249,250,246,0.99)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:26,animation:"fadeIn .2s ease"}}>
          {NAV.map(([id,l])=>(
            <span key={id} onClick={()=>goTo(id)}
              style={{fontFamily:"'Noto Serif JP',serif",fontSize:22,fontWeight:700,color:"#1b4332",cursor:"pointer",letterSpacing:2,transition:"color .2s"}}
              onMouseEnter={e=>e.currentTarget.style.color="#40916c"}
              onMouseLeave={e=>e.currentTarget.style.color="#1b4332"}
            >{l}</span>
          ))}
          <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:9,color:"#95d5b2",letterSpacing:3,marginTop:10,textTransform:"uppercase"}}>Harajuku · Matcha Halal</span>
        </div>
      )}

      {/* ── TICKER ── */}
      <div style={{position:"fixed",top:scrolled?58:74,left:0,right:0,zIndex:298,background:"#1b4332",color:"#d8f3dc",height:24,overflow:"hidden",display:"flex",alignItems:"center",transition:"top .35s"}}>
        <div style={{display:"flex",animation:"ticker 32s linear infinite",whiteSpace:"nowrap",fontFamily:"'DM Sans',sans-serif",fontSize:8,letterSpacing:2,textTransform:"uppercase",fontWeight:600}}>
          {Array(8).fill("🍵 ハラール認証 · HALAL CERTIFIED ✦ 宇治抹茶パウダー販売中 ✦ 原宿 Harajuku · Tokyo ✦ お雛カフェ抹茶原宿 ✦ 100% Organic Matcha ✦ ").map((t,i)=><span key={i} style={{paddingRight:36}}>{t}</span>)}
        </div>
      </div>

      {/* ══════════════ HERO ══════════════ */}
      <section id="home" style={{minHeight:"100vh",paddingTop:114,display:"flex",alignItems:"center",position:"relative",overflow:"hidden",background:"linear-gradient(160deg,#f0faf2 0%,#e8f5e0 45%,#fdf9f0 100%)"}}>
        <div style={{position:"absolute",top:-70,right:-55,width:"min(460px,70vw)",height:"min(460px,70vw)",borderRadius:"50%",background:"radial-gradient(circle,#b7e4c748,transparent 70%)",pointerEvents:"none"}}/>
        <div style={{position:"absolute",bottom:30,left:-50,width:260,height:260,borderRadius:"50%",background:"radial-gradient(circle,#fce4ec30,transparent 70%)",pointerEvents:"none"}}/>
        <div style={{position:"absolute",top:"12%",right:"2%",fontSize:"min(150px,20vw)",color:"#1b4332",opacity:.04,fontFamily:"'Noto Serif JP',serif",fontWeight:900,userSelect:"none",lineHeight:1,pointerEvents:"none"}}>抹茶</div>

        <div className="hero-grid" style={{maxWidth:1200,margin:"0 auto",padding:"0 clamp(18px,5vw,56px)",width:"100%",display:"grid",gridTemplateColumns:"1fr 1fr",gap:56,alignItems:"center"}}>
          <div style={{animation:"fadeUp .8s ease both"}}>
            <div style={{marginBottom:16}}><span className="hbadge">🕌 HALAL CERTIFIED</span></div>
            <h1 style={{fontSize:"clamp(34px,5.5vw,66px)",fontWeight:900,color:"#1b4332",lineHeight:1.07,letterSpacing:"-1.5px",marginBottom:7}}>
              お雛カフェ<br/>
              <span style={{color:"#40916c",fontStyle:"italic",fontSize:"clamp(24px,4vw,50px)"}}>抹茶原宿</span>
            </h1>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontWeight:300,fontSize:"clamp(11px,1.8vw,15px)",color:"#52b788",letterSpacing:2,marginBottom:20}}>Harajuku Ohina Café Matcha · Halal</p>
            <p style={{fontFamily:"'Noto Serif JP',serif",fontSize:"clamp(11px,1.4vw,14px)",lineHeight:2,color:"#4a7c59",maxWidth:480,marginBottom:34}}>
              原宿の中心に佇む、ハラール認証の本格抹茶カフェ。京都府宇治市産の最高級抹茶パウダーを直販。茶筅で丁寧に点てた本物の抹茶と、心ときめく季節のスイーツをお楽しみください。
            </p>
            <div style={{display:"flex",gap:11,flexWrap:"wrap",marginBottom:36}}>
              <button onClick={()=>goTo("powder")} style={{padding:"12px 26px",background:"linear-gradient(135deg,#1b4332,#2d6a4f)",color:"#fff",border:"none",borderRadius:40,fontFamily:"'Noto Serif JP',serif",fontSize:12,fontWeight:700,cursor:"pointer",boxShadow:"0 8px 24px rgba(27,67,50,0.28)",letterSpacing:1,transition:"transform .2s,box-shadow .2s"}}
                onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 14px 34px rgba(27,67,50,0.38)";}}
                onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="0 8px 24px rgba(27,67,50,0.28)";}}
              >抹茶パウダーを購入する</button>
              <button onClick={()=>goTo("menu")} style={{padding:"11px 22px",background:"transparent",color:"#1b4332",border:"1.5px solid #1b4332",borderRadius:40,fontFamily:"'Noto Serif JP',serif",fontSize:12,fontWeight:700,cursor:"pointer",transition:"all .3s"}}
                onMouseEnter={e=>{e.currentTarget.style.background="#1b4332";e.currentTarget.style.color="#fff";}}
                onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color="#1b4332";}}
              >メニューを見る</button>
            </div>
            <div style={{display:"flex",gap:32,flexWrap:"wrap"}}>
              {[["🍵","本格抹茶","宇治産"],["🕌","ハラール","認証済"],["📍","原宿","東京"]].map(([ic,t,s])=>(
                <div key={t} style={{textAlign:"center"}}>
                  <div style={{fontSize:22,marginBottom:4}}>{ic}</div>
                  <div style={{fontFamily:"'Noto Serif JP',serif",fontSize:12,fontWeight:700,color:"#1b4332"}}>{t}</div>
                  <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:8,color:"#74c69d",letterSpacing:1.5,textTransform:"uppercase"}}>{s}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hvisual" style={{display:"flex",justifyContent:"center",alignItems:"center",position:"relative",height:440}}>
            <div style={{position:"absolute",width:300,height:300,borderRadius:"50%",background:"radial-gradient(circle,#d8f3dc,#b7e4c720)",boxShadow:"0 0 64px #b7e4c756"}}/>
            <div style={{position:"absolute",top:16,left:6,fontSize:56,animation:"floatY 7s ease-in-out infinite",filter:"drop-shadow(0 8px 20px #2d6a4f40)"}}>🫖</div>
            <div style={{position:"absolute",bottom:32,right:14,fontSize:44,animation:"floatY 5s ease-in-out infinite 1s"}}>🌸</div>
            <div style={{position:"absolute",top:84,right:6,fontSize:36,animation:"floatY 6s ease-in-out infinite .5s"}}>🍃</div>
            <div style={{position:"absolute",bottom:88,left:0,fontSize:30,animation:"floatY 4s ease-in-out infinite 2s"}}>🌿</div>
            <div style={{zIndex:2}}><div style={{fontSize:112,filter:"drop-shadow(0 20px 40px #1b433248)",animation:"floatY 5.5s ease-in-out infinite"}}>🍵</div></div>
            <div style={{position:"absolute",width:360,height:360,borderRadius:"50%",border:"1px dashed #52b78838",animation:"spin 44s linear infinite"}}/>
          </div>
        </div>
        <div style={{position:"absolute",bottom:22,left:"50%",transform:"translateX(-50%)",display:"flex",flexDirection:"column",alignItems:"center",gap:4,opacity:.35}}>
          <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:7,letterSpacing:3,textTransform:"uppercase",color:"#40916c"}}>Scroll</span>
          <div style={{width:1,height:28,background:"linear-gradient(to bottom,#40916c,transparent)",animation:"floatY 1.5s ease-in-out infinite"}}/>
        </div>
      </section>

      {/* ══════════════ POWDER ══════════════ */}
      <section id="powder" style={{padding:"clamp(56px,8vw,96px) clamp(18px,5vw,56px)",background:"linear-gradient(160deg,#f7faf7,#e8f5e0,#f7faf7)"}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <SecHead en="Kyoto Uji Matcha Powder" ja="京都宇治 抹茶パウダー" sub="京都府宇治市の名門茶園から直接仕入れた、本物の抹茶パウダーをご家庭でお楽しみください"/>

          {/* uji banner */}
          <div style={{background:"linear-gradient(135deg,#1b4332,#2d6a4f)",borderRadius:20,padding:"clamp(22px,4vw,38px) clamp(22px,4vw,44px)",marginBottom:44,color:"#fff",position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",right:-10,top:-25,fontSize:110,opacity:.05,fontFamily:"'Noto Serif JP',serif",fontWeight:900,userSelect:"none"}}>宇治</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(190px,1fr))",gap:18,position:"relative"}}>
              {[
                ["産地について","京都府宇治市は千年以上の歴史を誇る日本最高の抹茶産地。豊かな自然と職人の技が生み出す抹茶は、世界中で最高品質として知られています。"],
                ["タイプAとBの違い","タイプAは春の一番摘み（いちばんつみ）の最高級グレード。タイプBは二番摘みで力強い風味が特徴。用途に合わせてお選びください。"],
                ["石臼挽きの特徴","どちらも伝統的な石臼でゆっくりと挽いた超微粉末。熱を加えずに挽くため、栄養素と香りが最大限に保たれます。"],
              ].map(([title,text])=>(
                <div key={title}>
                  <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:8,letterSpacing:2.5,color:"#74c69d",textTransform:"uppercase",marginBottom:7}}>{title}</p>
                  <p style={{fontFamily:"'Noto Serif JP',serif",fontSize:12,lineHeight:1.95,color:"#d8f3dc"}}>{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="pw-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:32}}>
            {MATCHA_POWDER.map(p=><PowderCard key={p.id} item={p} onAdd={addToCart}/>)}
          </div>

          {/* compare table */}
          <div style={{marginTop:44,background:"#fff",borderRadius:20,overflow:"hidden",boxShadow:"0 4px 22px rgba(27,67,50,0.08)"}}>
            <div style={{background:"linear-gradient(135deg,#1b4332,#2d6a4f)",padding:"16px 24px",display:"flex",alignItems:"center",gap:8}}>
              <span style={{fontSize:16}}>📊</span>
              <h3 style={{fontFamily:"'Noto Serif JP',serif",fontSize:14,fontWeight:700,color:"#fff"}}>タイプA・タイプB 比較表</h3>
            </div>
            <div style={{overflowX:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse",fontFamily:"'Noto Serif JP',serif",minWidth:420}}>
                <thead>
                  <tr style={{background:"#f0faf2"}}>
                    {["項目","タイプA（最高級）","タイプB（プレミアム）"].map((h,i)=>(
                      <th key={h} style={{padding:"11px 18px",fontSize:11,fontWeight:700,color:i===1?"#1b4332":i===2?"#40916c":"#888",textAlign:"left",borderBottom:"2px solid #d8f3dc",whiteSpace:"nowrap"}}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["グレード","儀式用 Ceremonial","料理用 Culinary"],
                    ["摘み取り","一番摘み（春の新芽）","二番摘み"],
                    ["産地","京都府宇治市","京都府宇治市"],
                    ["挽き方","伝統石臼挽き","伝統石臼挽き"],
                    ["色","鮮やかエメラルドグリーン","深い緑"],
                    ["風味","甘み・旨み・繊細な香り","力強い抹茶の風味"],
                    ["用途","お点前・プレミアムラテ","ラテ・製菓・料理全般"],
                    ["価格（30g）","¥3,200（税抜）","¥1,800（税抜）"],
                  ].map(([l,a,b],ri)=>(
                    <tr key={l} style={{background:ri%2===0?"#fff":"#f8fdf8"}}>
                      <td style={{padding:"10px 18px",fontSize:11,color:"#888",fontWeight:600,borderBottom:"1px solid #f0f0f0",whiteSpace:"nowrap"}}>{l}</td>
                      <td style={{padding:"10px 18px",fontSize:11,color:"#1b4332",fontWeight:ri===7?700:400,borderBottom:"1px solid #f0f0f0"}}>{a}</td>
                      <td style={{padding:"10px 18px",fontSize:11,color:"#40916c",fontWeight:ri===7?700:400,borderBottom:"1px solid #f0f0f0"}}>{b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ MENU ══════════════ */}
      <section id="menu" style={{padding:"clamp(56px,8vw,96px) clamp(18px,5vw,56px)",background:"#fff"}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <SecHead en="Our Menu" ja="メニュー" sub="茶筅で丁寧に点てた抹茶と、こだわりのスイーツをお楽しみください"/>
          <div style={{display:"flex",gap:7,justifyContent:"center",marginBottom:40,flexWrap:"wrap"}}>
            {TABS.map(([k,l])=>(
              <button key={k} onClick={()=>setTab(k)} style={{padding:"9px 18px",borderRadius:30,border:`1.5px solid ${tab===k?"#1b4332":"#b7e4c7"}`,background:tab===k?"#1b4332":"#fff",color:tab===k?"#fff":"#1b4332",fontFamily:"'Noto Serif JP',serif",fontSize:12,fontWeight:700,cursor:"pointer",transition:"all .25s",whiteSpace:"nowrap"}}>{l}</button>
            ))}
          </div>
          {tab==="drinks"&&(
            <div>
              <div className="mn-grid" style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(230px,1fr))",gap:20}}>
                {DRINKS.map(d=><DrinkCard key={d.id} item={d} onAdd={addToCart}/>)}
              </div>
              <div style={{marginTop:24,background:"linear-gradient(135deg,#f0faf2,#e8f5e0)",borderRadius:14,padding:"18px 22px",border:"1px solid #d8f3dc"}}>
                <p style={{fontFamily:"'Noto Serif JP',serif",fontWeight:700,color:"#1b4332",marginBottom:9,fontSize:12}}>🥛 ミルクの選択 ※アイスのみ対応</p>
                <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
                  {[["MILK 牛乳","通常価格","#74c69d"],["SOY 豆乳","+¥100","#e65100"],["OATS オーツ","+¥100","#e65100"]].map(([n,p,c])=>(
                    <div key={n} style={{background:"#fff",borderRadius:10,padding:"8px 14px",border:"1px solid #d8f3dc"}}>
                      <p style={{fontFamily:"'Noto Serif JP',serif",fontSize:11,fontWeight:700,color:"#1b4332"}}>{n}</p>
                      <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,color:c,fontWeight:600,marginTop:2}}>{p}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {tab==="sweets"&&<div className="mn-grid" style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(250px,1fr))",gap:20}}>{SWEETS.map(s=><SweetCard key={s.id} item={s} onAdd={addToCart}/>)}</div>}
          {tab==="desserts"&&<div className="mn-grid" style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(250px,1fr))",gap:20}}>{DESSERTS.map(d=><SweetCard key={d.id} item={d} onAdd={addToCart}/>)}</div>}
        </div>
      </section>

      {/* ══════════════ ABOUT ══════════════ */}
      <section id="about" style={{padding:"clamp(56px,8vw,96px) clamp(18px,5vw,56px)",background:"linear-gradient(160deg,#f7faf7,#e8f5e0)"}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <SecHead en="About Us" ja="お店について" sub=""/>
          <div className="ig" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:48,alignItems:"start"}}>
            <div>
              <div style={{marginBottom:16}}><span className="hbadge" style={{fontSize:10}}>🕌 ハラール認証カフェ</span></div>
              <p style={{fontFamily:"'Noto Serif JP',serif",fontSize:13,lineHeight:2,color:"#4a7c59",marginBottom:16}}>お雛カフェ抹茶原宿は、東京・原宿の神宮前に佇む、ハラール認証を取得した本格抹茶カフェです。</p>
              <p style={{fontFamily:"'Noto Serif JP',serif",fontSize:13,lineHeight:2,color:"#4a7c59",marginBottom:26}}>茶筅で丁寧に点てた本格抹茶から、京都宇治の抹茶パウダー販売、季節のスイーツまで。すべてのお客様が安心してお楽しみいただけるよう、ハラール基準に準拠した食材のみを使用しております。</p>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                {[["🌱","オーガニック","国産有機茶葉使用"],["🕌","ハラール","認証取得済み"],["🍵","宇治抹茶","京都宇治市産直輸入"],["🌸","原宿","神宮前の隠れ家カフェ"]].map(([ic,t,d])=>(
                  <div key={t} style={{background:"#fff",borderRadius:14,padding:"16px 14px",boxShadow:"0 2px 10px rgba(27,67,50,0.06)",transition:"transform .3s"}}
                    onMouseEnter={e=>e.currentTarget.style.transform="translateY(-4px)"}
                    onMouseLeave={e=>e.currentTarget.style.transform="none"}
                  >
                    <div style={{fontSize:24,marginBottom:7}}>{ic}</div>
                    <div style={{fontFamily:"'Noto Serif JP',serif",fontSize:12,fontWeight:700,color:"#1b4332",marginBottom:4}}>{t}</div>
                    <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,color:"#74c69d",lineHeight:1.5}}>{d}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{background:"linear-gradient(135deg,#1b4332,#2d6a4f)",borderRadius:22,padding:"clamp(26px,4vw,44px)",color:"#fff",position:"relative",overflow:"hidden"}}>
              <div style={{position:"absolute",top:-18,right:-18,fontSize:100,opacity:.05,fontFamily:"'Noto Serif JP',serif",fontWeight:900}}>茶</div>
              <h3 style={{fontFamily:"'Noto Serif JP',serif",fontSize:18,fontWeight:900,marginBottom:20}}>店舗情報</h3>
              {[
                ["📍","住所","〒150-0001 東京都渋谷区神宮前1丁目7-3 175番館 203号"],
                ["📞","電話","03-3755-5573"],
                ["🕐","営業時間","詳しくはSNSをご確認ください"],
                ["🚉","最寄り駅","原宿駅・明治神宮前駅"],
              ].map(([ic,l,v])=>(
                <div key={l} style={{display:"flex",gap:11,marginBottom:16,alignItems:"flex-start"}}>
                  <span style={{fontSize:17,flexShrink:0,marginTop:2}}>{ic}</span>
                  <div>
                    <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:8,color:"#95d5b2",letterSpacing:1.5,textTransform:"uppercase",marginBottom:3}}>{l}</p>
                    <p style={{fontFamily:"'Noto Serif JP',serif",fontSize:12,color:"#fff",lineHeight:1.7}}>{v}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PAYMENT ── */}
      <section style={{padding:"clamp(44px,6vw,72px) clamp(18px,5vw,56px)",background:"#fff"}}>
        <div style={{maxWidth:860,margin:"0 auto"}}>
          <SecHead en="Payment" ja="お支払い方法" sub="各種キャッシュレス決済に対応しております"/>
          <div className="pg" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10}}>
            {PAYMENTS.map(({icon,name})=>(
              <div key={name} style={{background:"#f8faf8",borderRadius:12,padding:"14px 8px",textAlign:"center",border:"1px solid #e8f5e9",transition:"transform .25s,box-shadow .25s"}}
                onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow="0 8px 20px rgba(27,67,50,0.09)";}}
                onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";}}
              >
                <div style={{fontSize:24,marginBottom:6}}>{icon}</div>
                <p style={{fontFamily:"'Noto Serif JP',serif",fontSize:9,fontWeight:700,color:"#1b4332",lineHeight:1.4}}>{name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ACCESS ── */}
      <section id="access" style={{padding:"clamp(56px,8vw,96px) clamp(18px,5vw,56px)",background:"linear-gradient(160deg,#1b4332,#0d2218)",color:"#fff",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:-45,right:-45,width:250,height:250,borderRadius:"50%",background:"rgba(82,183,136,0.07)",pointerEvents:"none"}}/>
        <div style={{maxWidth:960,margin:"0 auto",position:"relative"}}>
          <SecHead en="Access" ja="アクセス" sub=""/>
          <div className="ig" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:40,alignItems:"start"}}>
            <div>
              {[
                ["📍","住所","〒150-0001\n東京都渋谷区神宮前1丁目7-3\n175番館 203号"],
                ["📞","お電話","03-3755-5573"],
                ["🚉","アクセス","JR原宿駅 徒歩5分\n東京メトロ 明治神宮前駅 徒歩3分"],
              ].map(([ic,l,v])=>(
                <div key={l} style={{display:"flex",gap:12,marginBottom:18,background:"rgba(255,255,255,0.05)",borderRadius:14,padding:"16px 18px",border:"1px solid rgba(82,183,136,0.17)"}}>
                  <span style={{fontSize:20,flexShrink:0}}>{ic}</span>
                  <div>
                    <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:8,color:"#74c69d",letterSpacing:2,textTransform:"uppercase",marginBottom:6}}>{l}</p>
                    <p style={{fontFamily:"'Noto Serif JP',serif",fontSize:12,color:"#fff",lineHeight:1.85,whiteSpace:"pre-line"}}>{v}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{background:"rgba(255,255,255,0.05)",borderRadius:18,border:"1px solid rgba(82,183,136,0.18)",aspectRatio:"4/3",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:12}}>
              <span style={{fontSize:46}}>🗺️</span>
              <p style={{fontFamily:"'Noto Serif JP',serif",fontSize:13,color:"#95d5b2",textAlign:"center"}}>原宿 神宮前</p>
              <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,color:"#52b788",letterSpacing:1,textAlign:"center"}}>Jingumae 1-7-3, Shibuya<br/>Tokyo 150-0001</p>
              <a href="https://maps.google.com/?q=東京都渋谷区神宮前1丁目7-3+175番館" target="_blank" rel="noopener noreferrer" style={{padding:"9px 20px",background:"linear-gradient(135deg,#52b788,#2d6a4f)",color:"#fff",borderRadius:30,textDecoration:"none",fontFamily:"'DM Sans',sans-serif",fontSize:11,fontWeight:600,letterSpacing:1}}>Google Mapで見る →</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{background:"#061409",padding:"clamp(28px,5vw,48px) clamp(18px,5vw,52px) 20px"}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <div className="fg" style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr",gap:32,marginBottom:32}}>
            <div>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
                <span style={{fontSize:18}}>🍵</span>
                <div>
                  <p style={{fontFamily:"'Noto Serif JP',serif",fontSize:14,fontWeight:900,color:"#fff"}}>お雛カフェ抹茶原宿</p>
                  <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:7,color:"#52b788",letterSpacing:2,textTransform:"uppercase",marginTop:2}}>Harajuku Ohina Café Matcha Halal</p>
                </div>
              </div>
              <p style={{fontFamily:"'Noto Serif JP',serif",fontSize:11,color:"#52b788",lineHeight:1.9}}>原宿の中心に佇む本格ハラール抹茶カフェ。<br/>京都宇治の最高級抹茶パウダーを直接販売中。</p>
            </div>
            <div>
              <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:8,fontWeight:600,letterSpacing:2,color:"#52b788",textTransform:"uppercase",marginBottom:12}}>Menu</p>
              {[["powder","抹茶パウダー"],["menu","ドリンク・スイーツ"],["about","お店について"],["access","アクセス"]].map(([id,l])=>(
                <p key={id} onClick={()=>goTo(id)} style={{fontFamily:"'Noto Serif JP',serif",fontSize:11,color:"#95d5b2",marginBottom:8,cursor:"pointer"}}>{l}</p>
              ))}
            </div>
            <div>
              <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:8,fontWeight:600,letterSpacing:2,color:"#52b788",textTransform:"uppercase",marginBottom:12}}>Info</p>
              {[["📍","神宮前1-7-3"],["📞","03-3755-5573"],["🕌","ハラール認証取得"]].map(([ic,t])=>(
                <p key={t} style={{fontFamily:"'Noto Serif JP',serif",fontSize:10,color:"#74c69d",marginBottom:8}}>{ic} {t}</p>
              ))}
            </div>
          </div>
          <div style={{borderTop:"1px solid rgba(82,183,136,0.11)",paddingTop:16,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:7}}>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:8,color:"#2d6a4f",letterSpacing:1}}>© 2025 お雛カフェ抹茶原宿. All rights reserved.</p>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:8,color:"#2d6a4f",letterSpacing:1}}>🕌 HALAL CERTIFIED · 原宿 Harajuku Tokyo</p>
          </div>
        </div>
      </footer>

      {cartOpen&&<CartPanel cart={cart} onClose={()=>setCartOpen(false)} onRemove={removeFromCart} onQty={changeQty}/>}
    </div>
  );
}