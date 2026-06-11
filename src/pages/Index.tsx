import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

/* ─── IMAGES ─── */
const I = {
  hero:    "https://cdn.poehali.dev/projects/731183b5-5a08-40e8-8d25-c7d4e24f3b79/files/8b248bce-7406-4406-ad2b-9c4c2303aa20.jpg",
  evening: "https://cdn.poehali.dev/projects/731183b5-5a08-40e8-8d25-c7d4e24f3b79/files/66dcc688-16db-451a-b7a0-4a495290fabf.jpg",
  office:  "https://cdn.poehali.dev/projects/731183b5-5a08-40e8-8d25-c7d4e24f3b79/files/dde32135-0c51-43dc-bf3b-63d292df46a1.jpg",
  look:    "https://cdn.poehali.dev/projects/731183b5-5a08-40e8-8d25-c7d4e24f3b79/files/e0294090-fd57-4c67-b80b-aa8f508f0778.jpg",
  shoes:   "https://cdn.poehali.dev/projects/731183b5-5a08-40e8-8d25-c7d4e24f3b79/files/fd8f2cf9-4381-4242-b624-e63fc49031d1.jpg",
  bags:    "https://cdn.poehali.dev/projects/731183b5-5a08-40e8-8d25-c7d4e24f3b79/files/59f9baed-cbf7-42eb-8174-fedf27ad5201.jpg",
  heroOld: "https://cdn.poehali.dev/projects/731183b5-5a08-40e8-8d25-c7d4e24f3b79/files/3761f60e-fba5-4e19-85f7-43f4d536d957.jpg",
  lowHeels:"https://cdn.poehali.dev/projects/731183b5-5a08-40e8-8d25-c7d4e24f3b79/files/7e7422d3-8372-4211-87f1-0b6903867249.jpg",
  bagsBlack:"https://cdn.poehali.dev/projects/731183b5-5a08-40e8-8d25-c7d4e24f3b79/files/eb96f7a3-3a92-495c-8501-db7e318ea547.jpg",
  bagsBrown:"https://cdn.poehali.dev/projects/731183b5-5a08-40e8-8d25-c7d4e24f3b79/files/c1a0ceea-7d63-460f-b089-3fbb26358e72.jpg",
};

/* ─── DATA ─── */
const PRODUCTS = [
  { id:1, name:"Venezia Noir",    cat:"shoes", heel:"high",   color:"black",  price:8900,  oldPrice:null,  img:I.shoes,  tag:"Новинка 2026", mat:"Натуральная кожа", pair:2 },
  { id:2, name:"Opera Bag",       cat:"bags",  heel:null,     color:"black",  price:12500, oldPrice:null,  img:I.bags,   tag:"Хит",          mat:"Телячья кожа",     pair:1 },
  { id:3, name:"Milano Beige",    cat:"shoes", heel:"mid",    color:"beige",  price:7200,  oldPrice:8900,  img:I.office, tag:"",             mat:"Замша",            pair:4 },
  { id:4, name:"Tote Luxe",       cat:"bags",  heel:null,     color:"beige",  price:9800,  oldPrice:11500, img:I.office, tag:"Офис",         mat:"Зернистая кожа",   pair:3 },
  { id:5, name:"Luna Evening",    cat:"shoes", heel:"high",   color:"gold",   price:9400,  oldPrice:null,  img:I.evening,tag:"Новинка 2026", mat:"Атлас + кожа",     pair:6 },
  { id:6, name:"Clutch Amour",    cat:"bags",  heel:null,     color:"gold",   price:6800,  oldPrice:7900,  img:I.evening,tag:"Вечер",        mat:"Атласная ткань",   pair:5 },
  { id:7,  name:"Day Step",        cat:"shoes", heel:"low",    color:"black",  price:6500,  oldPrice:null,  img:I.shoes,      tag:"",             mat:"Кожа флотар",      pair:8 },
  { id:8,  name:"Mini Crossbody", cat:"bags",  heel:null,     color:"black",  price:5900,  oldPrice:6800,  img:I.bags,       tag:"",             mat:"Гладкая кожа",     pair:7 },
  { id:9,  name:"Noir Tote 2026", cat:"bags",  heel:null,     color:"black",  price:13900, oldPrice:null,  img:I.bagsBlack,  tag:"Новинка 2026", mat:"Телячья кожа",     pair:1 },
  { id:10, name:"Shadow Hobo",    cat:"bags",  heel:null,     color:"black",  price:11200, oldPrice:13500, img:I.bagsBlack,  tag:"Тренд 2025",   mat:"Мягкая кожа",      pair:7 },
  { id:11, name:"Cognac Bucket",  cat:"bags",  heel:null,     color:"brown",  price:10800, oldPrice:null,  img:I.bagsBrown,  tag:"Новинка 2026", mat:"Зернистая кожа",   pair:3 },
  { id:12, name:"Brown Crossbody",cat:"bags",  heel:null,     color:"brown",  price:8400,  oldPrice:9900,  img:I.bagsBrown,  tag:"Тренд 2025",   mat:"Кожа флотар",      pair:3 },
];

const LOOKS = [
  { id:1, title:"Вечерний образ",  tag:"Вечер",  img:I.look,    discount:12, items:[1,2],  total:21400 },
  { id:2, title:"Офисный лук",     tag:"Офис",   img:I.office,  discount:10, items:[3,4],  total:17000 },
  { id:3, title:"Дневной выход",   tag:"День",   img:I.heroOld, discount:8,  items:[7,8],  total:12400 },
];

const REVIEWS = [
  { name:"Анна К.",  stars:5, text:"Заказала набор «Вечерний образ» — пришло быстро, качество выше всяких похвал. Сочетание туфель и клатча просто идеальное!", img:I.look,    date:"02.06.2026" },
  { name:"Мария Л.", stars:5, text:"Примерка дома — это просто спасение. Подошли с первого раза, возврат не понадобился. Рекомендую всем!",                img:I.shoes,   date:"28.05.2026" },
  { name:"Ольга Т.", stars:4, text:"Офисный набор — мой выбор на каждый день. Материалы дышат, каблук удобный. Единственное — доставка на день дольше срока.", img:I.office, date:"20.05.2026" },
];

const BLOG = [
  { title:"Как сочетать сумку с туфлями",   sub:"5 правил стилиста",        img:I.bags,   tag:"Стиль"   },
  { title:"Тренды весна-лето 2026",          sub:"Что носить этим сезоном",  img:I.hero,   tag:"Тренды"  },
  { title:"Уход за кожаными изделиями",      sub:"Советы от мастеров",       img:I.shoes,  tag:"Уход"    },
];

type Page   = "home"|"catalog"|"product"|"constructor"|"looks"|"blog";
type Filter = { cat:"all"|"shoes"|"bags"; color:"all"|"black"|"beige"|"gold"|"brown"; heel:"all"|"high"|"mid"|"low" };
type CartItem = { id:number; qty:number };

/* ─────────────────────────────────────────────── */
export default function Index() {
  const [page,       setPage]      = useState<Page>("home");
  const [filter,     setFilter]    = useState<Filter>({cat:"all",color:"all",heel:"all"});
  const [product,    setProduct]   = useState<number>(1);
  const [cart,       setCart]      = useState<CartItem[]>([]);
  const [cartOpen,   setCartOpen]  = useState(false);
  const [burger,     setBurger]    = useState(false);
  const [imgAngle,   setImgAngle]  = useState(0);
  const [tryOn,      setTryOn]     = useState(false);
  const [sub,        setSub]       = useState("");
  const [subDone,    setSubDone]   = useState(false);
  const [constrShoe, setConstrShoe]= useState(1);
  const [constrBag,  setConstrBag] = useState(2);
  const [lookModal,  setLookModal] = useState<number|null>(null);
  const [notify,     setNotify]    = useState("");
  const heroRef = useRef<HTMLDivElement>(null);

  const go = (p:Page, id?:number) => {
    setPage(p);
    if(id!==undefined) setProduct(id);
    setBurger(false);
    window.scrollTo({top:0,behavior:"smooth"});
  };

  const addCart = (id:number) => {
    setCart(c => {
      const ex = c.find(i=>i.id===id);
      return ex ? c.map(i=>i.id===id?{...i,qty:i.qty+1}:i) : [...c,{id,qty:1}];
    });
    const p = PRODUCTS.find(x=>x.id===id);
    showNotify(`«${p?.name}» добавлен в корзину`);
  };

  const showNotify = (msg:string) => { setNotify(msg); setTimeout(()=>setNotify(""),2500); };

  const cartTotal = cart.reduce((s,ci)=>{
    const p=PRODUCTS.find(x=>x.id===ci.id); return s+(p?.price??0)*ci.qty;
  },0);
  const cartCount = cart.reduce((s,ci)=>s+ci.qty,0);

  /* Rotate 360 */
  useEffect(()=>{
    if(page!=="product") return;
    const t = setInterval(()=>setImgAngle(a=>(a+1)%360),20);
    return ()=>clearInterval(t);
  },[page]);

  const items = PRODUCTS.filter(p=>{
    if(filter.cat!=="all"   && p.cat!==filter.cat)   return false;
    if(filter.color!=="all" && p.color!==filter.color) return false;
    if(filter.heel!=="all"  && p.heel!==filter.heel)   return false;
    return true;
  });

  const cur = PRODUCTS.find(p=>p.id===product)!;
  const pairProduct = cur ? PRODUCTS.find(p=>p.id===cur.pair) : null;

  const nav = [
    {key:"home"       as Page, label:"Главная"},
    {key:"catalog"    as Page, label:"Каталог"},
    {key:"constructor"as Page, label:"Конструктор"},
    {key:"looks"      as Page, label:"Look Real"},
    {key:"blog"       as Page, label:"Блог"},
  ];

  /* ── COLOR MAP ── */
  const colorDot: Record<string,string> = { black:"#1a1a1a", beige:"#d4b896", gold:"#c9913a", brown:"#7a4a2a" };

  const G = "bg-gradient-to-r from-[#c9913a] to-[#e8c76a]";
  const GT = "bg-gradient-to-r from-[#f5d782] via-[#c9913a] to-[#f5d782] bg-clip-text text-transparent";

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-[#ede0c4]" style={{fontFamily:"'Montserrat',sans-serif"}}>

      {/* ══ TOAST ══ */}
      {notify && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] bg-[#1a1200] border border-[#c9913a] text-[#f5d782] px-6 py-3 text-sm tracking-wide shadow-2xl"
          style={{animation:"fadeUp .3s both"}}>
          {notify}
        </div>
      )}

      {/* ══ HEADER ══ */}
      <header className="fixed inset-x-0 top-0 z-50 bg-[#0b0b0b]/96 backdrop-blur border-b border-[#1e1e1e]">
        <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between gap-4">
          <button onClick={()=>go("home")} style={{fontFamily:"'Cormorant Garamond',serif"}}
            className={`text-2xl font-bold tracking-[0.15em] ${GT}`}>
            Шаг&amp;Сум
          </button>

          <nav className="hidden lg:flex gap-6">
            {nav.map(n=>(
              <button key={n.key} onClick={()=>go(n.key)}
                className={`text-[11px] tracking-[0.2em] uppercase transition-colors ${page===n.key?"text-[#c9913a]":"text-[#7a6a50] hover:text-[#c9913a]"}`}>
                {n.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button onClick={()=>setCartOpen(true)} className="relative text-[#c9913a] hover:opacity-80 transition-opacity">
              <Icon name="ShoppingBag" size={22}/>
              {cartCount>0 && (
                <span className={`absolute -top-1.5 -right-1.5 ${G} text-[#0b0b0b] text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center`}>
                  {cartCount}
                </span>
              )}
            </button>
            <button className="lg:hidden text-[#c9913a]" onClick={()=>setBurger(b=>!b)}>
              <Icon name={burger?"X":"Menu"} size={22}/>
            </button>
          </div>
        </div>

        {burger && (
          <div className="lg:hidden border-t border-[#1e1e1e] bg-[#0d0d0d] px-5 py-5 flex flex-col gap-4">
            {nav.map(n=>(
              <button key={n.key} onClick={()=>go(n.key)}
                className={`text-left text-[11px] tracking-[0.22em] uppercase py-1 ${page===n.key?"text-[#c9913a]":"text-[#7a6a50]"}`}>
                {n.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* ══ CART DRAWER ══ */}
      {cartOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-black/60" onClick={()=>setCartOpen(false)}/>
          <div className="relative w-full max-w-sm bg-[#0f0f0f] border-l border-[#1e1e1e] h-full flex flex-col" style={{animation:"slideLeft .3s both"}}>
            <div className="flex items-center justify-between p-5 border-b border-[#1e1e1e]">
              <h2 style={{fontFamily:"'Cormorant Garamond',serif"}} className="text-2xl text-[#c9913a]">Корзина</h2>
              <button onClick={()=>setCartOpen(false)} className="text-[#5a4e3c] hover:text-[#c9913a]"><Icon name="X" size={20}/></button>
            </div>
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cart.length===0 && <p className="text-[#5a4e3c] text-sm text-center mt-10">Корзина пуста</p>}
              {cart.map(ci=>{
                const p=PRODUCTS.find(x=>x.id===ci.id)!;
                return (
                  <div key={ci.id} className="flex gap-3 items-center bg-[#0b0b0b] border border-[#1e1e1e] p-3">
                    <img src={p.img} className="w-14 h-14 object-cover flex-shrink-0"/>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm truncate">{p.name}</p>
                      <p className="text-[#c9913a] text-sm">{(p.price*ci.qty).toLocaleString("ru")} ₽</p>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <button onClick={()=>setCart(c=>c.map(i=>i.id===ci.id?{...i,qty:Math.max(1,i.qty-1)}:i))}
                        className="w-6 h-6 border border-[#2a2a2a] text-[#c9913a] flex items-center justify-center hover:border-[#c9913a]">−</button>
                      <span>{ci.qty}</span>
                      <button onClick={()=>setCart(c=>c.map(i=>i.id===ci.id?{...i,qty:i.qty+1}:i))}
                        className="w-6 h-6 border border-[#2a2a2a] text-[#c9913a] flex items-center justify-center hover:border-[#c9913a]">+</button>
                    </div>
                    <button onClick={()=>setCart(c=>c.filter(i=>i.id!==ci.id))} className="text-[#3a3020] hover:text-red-400">
                      <Icon name="Trash2" size={15}/>
                    </button>
                  </div>
                );
              })}
            </div>
            {cart.length>0 && (
              <div className="p-5 border-t border-[#1e1e1e] space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-[#7a6a50]">Итого</span>
                  <span style={{fontFamily:"'Cormorant Garamond',serif"}} className="text-xl text-[#c9913a]">
                    {cartTotal.toLocaleString("ru")} ₽
                  </span>
                </div>
                <button className={`${G} w-full text-[#0b0b0b] text-[11px] tracking-[0.25em] uppercase font-semibold py-4 hover:opacity-90 transition-opacity`}
                  onClick={()=>showNotify("Переход к оплате — скоро!")}>
                  Оформить заказ
                </button>
                <p className="text-[10px] text-[#3a3020] text-center tracking-wide">Бесплатная примерка дома · Возврат 14 дней</p>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="pt-16">

      {/* ══════════════════ HOME ══════════════════ */}
      {page==="home" && <>

        {/* HERO */}
        <section ref={heroRef} className="relative h-screen min-h-[600px] flex items-end justify-center overflow-hidden">
          <img src={I.hero} alt="hero"
            className="absolute inset-0 w-full h-full object-cover object-top"
            style={{animation:"slowZoom 14s ease-in-out infinite alternate"}}/>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0b0b0b]/30 via-transparent to-[#0b0b0b]"/>

          <div className="relative z-10 w-full max-w-7xl mx-auto px-5 pb-20 flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            <div>
              <p className="text-[11px] tracking-[0.45em] uppercase text-[#c9913a] mb-4" style={{animation:"fadeUp .7s .1s both"}}>
                Коллекция 2025–2026
              </p>
              <h1 style={{fontFamily:"'Cormorant Garamond',serif", animation:"fadeUp .7s .2s both"}}
                className={`text-[clamp(3.5rem,10vw,8rem)] font-light leading-none tracking-[0.1em] ${GT}`}>
                Шаг&amp;Сум
              </h1>
              <div className="flex items-center gap-3 mt-3" style={{animation:"fadeUp .7s .35s both"}}>
                <div className="h-px w-10 bg-[#c9913a]/50"/>
                <p style={{fontFamily:"'Cormorant Garamond',serif"}} className="text-[clamp(.95rem,2vw,1.3rem)] italic text-[#c9b06e]">
                  Подчеркни образ одной парой
                </p>
              </div>
              <div className="flex flex-wrap gap-3 mt-8" style={{animation:"fadeUp .7s .45s both"}}>
                <button onClick={()=>go("catalog")} className={`${G} text-[#0b0b0b] text-[11px] tracking-[0.28em] uppercase font-semibold px-8 py-3.5 hover:opacity-90 transition-opacity`}>
                  Смотреть каталог
                </button>
                <button onClick={()=>go("looks")} className="border border-[#c9913a] text-[#c9913a] text-[11px] tracking-[0.28em] uppercase px-8 py-3.5 hover:bg-[#c9913a]/10 transition-all">
                  Look Real наборы
                </button>
              </div>
            </div>

            {/* Быстрый подбор по образу */}
            <div className="bg-[#0b0b0b]/80 border border-[#2a2a2a] p-5 w-full lg:w-72 flex-shrink-0" style={{animation:"fadeUp .7s .55s both"}}>
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#c9913a] mb-4">Подбор по образу</p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  {label:"День",   icon:"Sun",    sub:"Комфорт"},
                  {label:"Вечер",  icon:"Moon",   sub:"Гламур"},
                  {label:"Офис",   icon:"Briefcase",sub:"Стиль"},
                ].map(o=>(
                  <button key={o.label}
                    onClick={()=>{ setFilter({cat:"all",color:"all",heel:o.label==="День"?"low":o.label==="Офис"?"mid":"high"}); go("catalog"); }}
                    className="flex flex-col items-center gap-1.5 bg-[#111] border border-[#1e1e1e] hover:border-[#c9913a] hover:bg-[#1a1200] transition-all py-3 px-2 group">
                    <Icon name={o.icon as "Sun"} size={16} className="text-[#c9913a]"/>
                    <span className="text-[11px] font-medium">{o.label}</span>
                    <span className="text-[9px] text-[#5a4e3c] tracking-wide">{o.sub}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* НОВИНКИ */}
        <section className="max-w-7xl mx-auto px-5 py-20">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[10px] tracking-[0.4em] uppercase text-[#c9913a] mb-2">2025–2026</p>
              <h2 style={{fontFamily:"'Cormorant Garamond',serif"}} className="text-4xl font-light">Новые модели</h2>
            </div>
            <button onClick={()=>go("catalog")} className="hidden sm:flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-[#7a6a50] hover:text-[#c9913a] transition-colors">
              Все товары <Icon name="ArrowRight" size={14}/>
            </button>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {PRODUCTS.filter(p=>p.tag.includes("2026")).map(p=>(
              <ProductCard key={p.id} p={p} onView={()=>go("product",p.id)} onCart={()=>addCart(p.id)} GT={GT} G={G}/>
            ))}
          </div>
        </section>

        {/* LOOK REAL превью */}
        <section className="bg-[#080808] border-y border-[#1a1a1a] py-20 px-5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-[10px] tracking-[0.4em] uppercase text-[#c9913a] mb-2">Наборы с дисконтом</p>
              <h2 style={{fontFamily:"'Cormorant Garamond',serif"}} className="text-4xl font-light">Look Real</h2>
              <p className="text-[11px] text-[#5a4e3c] mt-2 tracking-wide">Туфли + сумка — готовый образ со скидкой до 12%</p>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {LOOKS.map(l=>(
                <div key={l.id} className="group bg-[#0f0f0f] border border-[#1e1e1e] overflow-hidden hover:border-[#c9913a]/40 transition-colors cursor-pointer"
                  onClick={()=>setLookModal(l.id)}>
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <img src={l.img} alt={l.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"/>
                    <span className={`absolute top-3 left-3 ${G} text-[#0b0b0b] text-[10px] font-bold px-3 py-1 tracking-wide`}>
                      −{l.discount}%
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 style={{fontFamily:"'Cormorant Garamond',serif"}} className="text-xl mb-1">{l.title}</h3>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-[#5a4e3c] mb-3">{l.tag}</p>
                    <div className="flex items-center justify-between">
                      <span style={{fontFamily:"'Cormorant Garamond',serif"}} className="text-lg text-[#c9913a]">
                        {Math.round(l.total*(1-l.discount/100)).toLocaleString("ru")} ₽
                      </span>
                      <span className="line-through text-[#3a3020] text-sm">{l.total.toLocaleString("ru")} ₽</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <button onClick={()=>go("looks")} className={`${G} text-[#0b0b0b] text-[11px] tracking-[0.28em] uppercase font-semibold px-10 py-4 hover:opacity-90`}>
                Все наборы
              </button>
            </div>
          </div>
        </section>

        {/* КАК НОСИТЬ */}
        <section className="max-w-7xl mx-auto px-5 py-20">
          <div className="text-center mb-12">
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#c9913a] mb-2">Контент от блогеров</p>
            <h2 style={{fontFamily:"'Cormorant Garamond',serif"}} className="text-4xl font-light">Как носить</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {BLOG.map((b,i)=>(
              <div key={i} className="group relative overflow-hidden cursor-pointer" onClick={()=>go("blog")}>
                <div className="aspect-[4/5] overflow-hidden">
                  <img src={b.img} alt={b.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b]/90 via-[#0b0b0b]/10 to-transparent"/>
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#0b0b0b]/70 border border-[#2a2a2a] text-[#c9913a] text-[10px] tracking-[0.2em] uppercase px-3 py-1">
                      {b.tag}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 style={{fontFamily:"'Cormorant Garamond',serif"}} className="text-xl mb-1">{b.title}</h3>
                    <p className="text-[11px] text-[#7a6a50]">{b.sub}</p>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-[#c9913a]/20 border border-[#c9913a]/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Icon name="Play" size={20} className="text-[#c9913a] ml-1"/>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ПРЕИМУЩЕСТВА */}
        <section className="border-y border-[#1a1a1a] bg-[#080808] py-16 px-5">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              {icon:"Home",       title:"Примерка дома",   desc:"Бесплатно на 3 дня"},
              {icon:"Ruler",      title:"Подгонка размера", desc:"Точный подбор по стопе"},
              {icon:"Truck",      title:"Доставка от 2 дней",desc:"По всей России"},
              {icon:"RotateCcw",  title:"Возврат 14 дней",  desc:"Без вопросов"},
            ].map(a=>(
              <div key={a.icon} className="flex flex-col items-center gap-3">
                <div className="w-11 h-11 border border-[#c9913a]/40 flex items-center justify-center">
                  <Icon name={a.icon as "Home"} size={17} className="text-[#c9913a]"/>
                </div>
                <h4 style={{fontFamily:"'Cormorant Garamond',serif"}} className="text-lg text-[#c9913a]">{a.title}</h4>
                <p className="text-[10px] text-[#4a3e2e] tracking-wide">{a.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ОТЗЫВЫ */}
        <section className="max-w-7xl mx-auto px-5 py-20">
          <div className="text-center mb-12">
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#c9913a] mb-2">Покупатели</p>
            <h2 style={{fontFamily:"'Cormorant Garamond',serif"}} className="text-4xl font-light">Отзывы с фото</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {REVIEWS.map((r,i)=>(
              <div key={i} className="bg-[#0f0f0f] border border-[#1e1e1e] p-6 hover:border-[#c9913a]/30 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <img src={r.img} className="w-12 h-12 object-cover rounded-full border border-[#2a2a2a]"/>
                  <div>
                    <p className="text-sm font-medium">{r.name}</p>
                    <div className="flex gap-0.5 mt-0.5">
                      {Array.from({length:r.stars}).map((_,j)=>(
                        <Icon key={j} name="Star" size={11} className="text-[#c9913a]"/>
                      ))}
                    </div>
                  </div>
                  <span className="ml-auto text-[10px] text-[#3a3020]">{r.date}</span>
                </div>
                <p className="text-[12px] text-[#7a6a50] leading-relaxed">{r.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ПОДПИСКА */}
        <section className="border-t border-[#1a1a1a] bg-[#080808] py-16 px-5">
          <div className="max-w-lg mx-auto text-center">
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#c9913a] mb-3">Капсульные коллекции</p>
            <h2 style={{fontFamily:"'Cormorant Garamond',serif"}} className="text-3xl font-light mb-2">
              Подписка на сезонные капсулы
            </h2>
            <p className="text-[11px] text-[#5a4e3c] mb-7 tracking-wide">Первой узнавай о новых наборах и получай эксклюзивные скидки</p>
            {subDone ? (
              <p style={{fontFamily:"'Cormorant Garamond',serif"}} className="text-xl text-[#c9913a]">Подписка оформлена ✦</p>
            ) : (
              <div className="flex gap-0">
                <input value={sub} onChange={e=>setSub(e.target.value)} placeholder="Ваш email"
                  className="flex-1 bg-[#0b0b0b] border border-[#2a2a2a] border-r-0 text-[#ede0c4] px-4 py-3 text-sm focus:outline-none focus:border-[#c9913a] transition-colors placeholder:text-[#3a3020]"/>
                <button onClick={()=>{if(sub)setSubDone(true);}}
                  className={`${G} text-[#0b0b0b] text-[11px] tracking-[0.2em] uppercase font-semibold px-7 py-3 hover:opacity-90 flex-shrink-0`}>
                  Подписаться
                </button>
              </div>
            )}
          </div>
        </section>
      </>}

      {/* ══════════════════ КАТАЛОГ ══════════════════ */}
      {page==="catalog" && (
        <section className="max-w-7xl mx-auto px-5 py-20">
          <div className="text-center mb-10">
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#c9913a] mb-2">Все модели 2025–2026</p>
            <h2 style={{fontFamily:"'Cormorant Garamond',serif"}} className="text-5xl font-light">Каталог</h2>
          </div>

          {/* Фильтры */}
          <div className="flex flex-wrap gap-6 mb-10 p-5 bg-[#0f0f0f] border border-[#1e1e1e]">
            {/* Категория */}
            <div>
              <p className="text-[9px] tracking-[0.3em] uppercase text-[#5a4e3c] mb-2">Категория</p>
              <div className="flex gap-2">
                {(["all","shoes","bags"] as const).map(v=>(
                  <button key={v} onClick={()=>setFilter(f=>({...f,cat:v}))}
                    className={`text-[10px] tracking-[0.18em] uppercase px-4 py-2 border transition-all ${filter.cat===v?"bg-gradient-to-r from-[#c9913a] to-[#e8c76a] text-[#0b0b0b] border-transparent font-semibold":"border-[#2a2a2a] text-[#7a6a50] hover:border-[#c9913a]"}`}>
                    {v==="all"?"Все":v==="shoes"?"Туфли":"Сумки"}
                  </button>
                ))}
              </div>
            </div>
            {/* Цвет */}
            <div>
              <p className="text-[9px] tracking-[0.3em] uppercase text-[#5a4e3c] mb-2">Цвет</p>
              <div className="flex gap-2 items-center">
                <button onClick={()=>setFilter(f=>({...f,color:"all"}))}
                  className={`text-[10px] tracking-[0.18em] uppercase px-4 py-2 border transition-all ${filter.color==="all"?"bg-gradient-to-r from-[#c9913a] to-[#e8c76a] text-[#0b0b0b] border-transparent font-semibold":"border-[#2a2a2a] text-[#7a6a50] hover:border-[#c9913a]"}`}>
                  Все
                </button>
                {(["black","beige","gold","brown"] as const).map(c=>(
                  <button key={c} onClick={()=>setFilter(f=>({...f,color:c}))}
                    className={`w-7 h-7 rounded-full border-2 transition-all ${filter.color===c?"border-[#c9913a] scale-110":"border-[#2a2a2a] hover:border-[#c9913a]"}`}
                    style={{backgroundColor:colorDot[c]}} title={c}/>
                ))}
              </div>
            </div>
            {/* Каблук */}
            <div>
              <p className="text-[9px] tracking-[0.3em] uppercase text-[#5a4e3c] mb-2">Каблук</p>
              <div className="flex gap-2">
                {(["all","low","mid","high"] as const).map(v=>(
                  <button key={v} onClick={()=>setFilter(f=>({...f,heel:v}))}
                    className={`text-[10px] tracking-[0.18em] uppercase px-4 py-2 border transition-all ${filter.heel===v?"bg-gradient-to-r from-[#c9913a] to-[#e8c76a] text-[#0b0b0b] border-transparent font-semibold":"border-[#2a2a2a] text-[#7a6a50] hover:border-[#c9913a]"}`}>
                    {v==="all"?"Все":v==="low"?"Низкий":v==="mid"?"Средний":"Высокий"}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {items.length===0 && <p className="col-span-4 text-center text-[#5a4e3c] py-10">Ничего не найдено</p>}
            {items.map(p=>(
              <ProductCard key={p.id} p={p} onView={()=>go("product",p.id)} onCart={()=>addCart(p.id)} GT={GT} G={G}/>
            ))}
          </div>
        </section>
      )}

      {/* ══════════════════ СТРАНИЦА ТОВАРА ══════════════════ */}
      {page==="product" && cur && (
        <section className="max-w-6xl mx-auto px-5 py-16">
          <button onClick={()=>go("catalog")} className="flex items-center gap-2 text-[#5a4e3c] hover:text-[#c9913a] transition-colors text-[11px] tracking-[0.2em] uppercase mb-10">
            <Icon name="ArrowLeft" size={14}/> Каталог
          </button>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Фото 360 */}
            <div>
              <div className="relative aspect-square bg-[#0f0f0f] border border-[#1e1e1e] overflow-hidden flex items-center justify-center">
                <img src={cur.img} alt={cur.name}
                  className="w-4/5 h-4/5 object-contain transition-all duration-75"
                  style={{transform:`perspective(600px) rotateY(${imgAngle*0.08}deg)`}}/>
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                  <span className="bg-[#0b0b0b]/80 border border-[#2a2a2a] text-[#c9913a] text-[10px] tracking-[0.2em] uppercase px-3 py-1">
                    360° просмотр
                  </span>
                </div>
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  {[0,90,180,270].map(a=>(
                    <button key={a} onClick={()=>setImgAngle(a)}
                      className={`w-2 h-2 rounded-full transition-all ${Math.abs(imgAngle%360-a)<45?"bg-[#c9913a]":"bg-[#2a2a2a]"}`}/>
                  ))}
                </div>
              </div>

              {/* Виртуальная примерка */}
              <button onClick={()=>setTryOn(true)}
                className="mt-4 w-full border border-[#c9913a] text-[#c9913a] text-[11px] tracking-[0.25em] uppercase py-3 flex items-center justify-center gap-2 hover:bg-[#c9913a]/10 transition-all">
                <Icon name="Camera" size={15}/> Виртуальная примерка по фото
              </button>
            </div>

            {/* Инфо */}
            <div>
              {cur.tag && (
                <span className={`inline-block ${G} text-[#0b0b0b] text-[10px] tracking-[0.2em] uppercase px-3 py-1 font-semibold mb-4`}>
                  {cur.tag}
                </span>
              )}
              <h1 style={{fontFamily:"'Cormorant Garamond',serif"}} className="text-4xl font-light mb-2">{cur.name}</h1>
              <div className="flex items-baseline gap-3 mb-6">
                <span style={{fontFamily:"'Cormorant Garamond',serif"}} className="text-3xl text-[#c9913a]">
                  {cur.price.toLocaleString("ru")} ₽
                </span>
                {cur.oldPrice && (
                  <span className="line-through text-[#3a3020] text-lg">{cur.oldPrice.toLocaleString("ru")} ₽</span>
                )}
              </div>

              {/* Детали материалов */}
              <div className="bg-[#0f0f0f] border border-[#1e1e1e] p-5 mb-5 space-y-3">
                <p className="text-[10px] tracking-[0.3em] uppercase text-[#c9913a] mb-3">Детали материалов</p>
                {[
                  {label:"Материал", value:cur.mat},
                  {label:"Сезон",    value:"Осень / Зима 2026"},
                  {label:"Цвет",     value:{black:"Чёрный",beige:"Бежевый",gold:"Золотой"}[cur.color]},
                  ...(cur.cat==="shoes"?[{label:"Каблук",value:{high:"Высокий (9+ см)",mid:"Средний (5–8 см)",low:"Низкий (до 4 см)"}[cur.heel!]}]:[]),
                ].map(d=>(
                  <div key={d.label} className="flex justify-between text-sm border-b border-[#1a1a1a] pb-2 last:border-0 last:pb-0">
                    <span className="text-[#5a4e3c]">{d.label}</span>
                    <span>{d.value}</span>
                  </div>
                ))}
              </div>

              {/* Советы стилиста */}
              <div className="bg-[#0d0b00] border border-[#c9913a]/20 p-4 mb-5">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="Sparkles" size={14} className="text-[#c9913a]"/>
                  <p className="text-[10px] tracking-[0.25em] uppercase text-[#c9913a]">Совет стилиста</p>
                </div>
                <p className="text-[12px] text-[#7a6a50] leading-relaxed">
                  {cur.cat==="shoes"
                    ? "Сочетайте с однотонным платьем или брюками классического кроя. Идеальная пара — сумка из одной коллекции."
                    : "Эта сумка универсальна: подойдёт к деловому образу и вечернему луку. Для дневного выхода выбирайте обувь на каблуке до 7 см."}
                </p>
              </div>

              {/* Подбор пары */}
              {pairProduct && (
                <div className="bg-[#0f0f0f] border border-[#1e1e1e] p-4 mb-5 flex items-center gap-4">
                  <img src={pairProduct.img} className="w-16 h-16 object-cover border border-[#2a2a2a]"/>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] tracking-[0.2em] uppercase text-[#c9913a] mb-0.5">Подходящая пара</p>
                    <p className="text-sm truncate">{pairProduct.name}</p>
                    <p style={{fontFamily:"'Cormorant Garamond',serif"}} className="text-[#c9913a]">{pairProduct.price.toLocaleString("ru")} ₽</p>
                  </div>
                  <button onClick={()=>addCart(pairProduct.id)}
                    className="border border-[#c9913a] text-[#c9913a] text-[10px] tracking-[0.15em] uppercase px-4 py-2 hover:bg-[#c9913a]/10 transition-all flex-shrink-0">
                    + В корзину
                  </button>
                </div>
              )}

              <div className="flex flex-col gap-3">
                <button onClick={()=>addCart(cur.id)}
                  className={`${G} text-[#0b0b0b] text-[11px] tracking-[0.28em] uppercase font-semibold py-4 hover:opacity-90 transition-opacity`}>
                  Добавить в корзину
                </button>
                <p className="text-[10px] text-[#3a3020] text-center tracking-wide">Бесплатная примерка дома · Возврат 14 дней · Быстрая подгонка по размеру</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════ КОНСТРУКТОР ══════════════════ */}
      {page==="constructor" && (
        <section className="max-w-5xl mx-auto px-5 py-20">
          <div className="text-center mb-14">
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#c9913a] mb-2">Создай свой образ</p>
            <h2 style={{fontFamily:"'Cormorant Garamond',serif"}} className="text-5xl font-light">Конструктор сочетаний</h2>
            <p className="text-[11px] text-[#5a4e3c] mt-2 tracking-wide">Выбери туфли и сумку — посмотри как они смотрятся вместе</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 items-start">
            {/* Туфли */}
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#c9913a] mb-4">Туфли</p>
              <div className="space-y-2">
                {PRODUCTS.filter(p=>p.cat==="shoes").map(p=>(
                  <button key={p.id} onClick={()=>setConstrShoe(p.id)}
                    className={`w-full flex items-center gap-3 p-3 border transition-all text-left ${constrShoe===p.id?"border-[#c9913a] bg-[#0d0b00]":"border-[#1e1e1e] bg-[#0f0f0f] hover:border-[#c9913a]/40"}`}>
                    <img src={p.img} className="w-12 h-12 object-cover flex-shrink-0"/>
                    <div>
                      <p className="text-sm">{p.name}</p>
                      <p style={{fontFamily:"'Cormorant Garamond',serif"}} className="text-[#c9913a] text-sm">{p.price.toLocaleString("ru")} ₽</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Preview */}
            <div className="lg:sticky lg:top-24">
              <div className="bg-[#0f0f0f] border border-[#1e1e1e] p-6 text-center">
                <p className="text-[10px] tracking-[0.3em] uppercase text-[#c9913a] mb-5">Ваш образ</p>
                <div className="grid grid-cols-2 gap-3 mb-5">
                  {[constrShoe,constrBag].map(id=>{
                    const p=PRODUCTS.find(x=>x.id===id)!;
                    return (
                      <div key={id} className="aspect-square overflow-hidden border border-[#2a2a2a]">
                        <img src={p.img} className="w-full h-full object-cover"/>
                      </div>
                    );
                  })}
                </div>
                {(() => {
                  const s=PRODUCTS.find(x=>x.id===constrShoe)!;
                  const b=PRODUCTS.find(x=>x.id===constrBag)!;
                  return (
                    <>
                      <p className="text-[11px] text-[#5a4e3c] mb-1">{s.name} + {b.name}</p>
                      <p style={{fontFamily:"'Cormorant Garamond',serif"}} className="text-2xl text-[#c9913a] mb-4">
                        {(s.price+b.price).toLocaleString("ru")} ₽
                      </p>
                      <button onClick={()=>{addCart(constrShoe);addCart(constrBag);}}
                        className={`${G} w-full text-[#0b0b0b] text-[11px] tracking-[0.22em] uppercase font-semibold py-3 hover:opacity-90`}>
                        Добавить оба в корзину
                      </button>
                    </>
                  );
                })()}
              </div>
            </div>

            {/* Сумки */}
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#c9913a] mb-4">Сумки</p>
              <div className="space-y-2">
                {PRODUCTS.filter(p=>p.cat==="bags").map(p=>(
                  <button key={p.id} onClick={()=>setConstrBag(p.id)}
                    className={`w-full flex items-center gap-3 p-3 border transition-all text-left ${constrBag===p.id?"border-[#c9913a] bg-[#0d0b00]":"border-[#1e1e1e] bg-[#0f0f0f] hover:border-[#c9913a]/40"}`}>
                    <img src={p.img} className="w-12 h-12 object-cover flex-shrink-0"/>
                    <div>
                      <p className="text-sm">{p.name}</p>
                      <p style={{fontFamily:"'Cormorant Garamond',serif"}} className="text-[#c9913a] text-sm">{p.price.toLocaleString("ru")} ₽</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════ LOOK REAL ══════════════════ */}
      {page==="looks" && (
        <section className="max-w-5xl mx-auto px-5 py-20">
          <div className="text-center mb-14">
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#c9913a] mb-2">Готовые образы</p>
            <h2 style={{fontFamily:"'Cormorant Garamond',serif"}} className="text-5xl font-light">Look Real</h2>
            <p className="text-[11px] text-[#5a4e3c] mt-2 tracking-wide">Туфли + сумка одним набором — со скидкой до 12%</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {LOOKS.map(l=>{
              const prods = l.items.map(id=>PRODUCTS.find(p=>p.id===id)!);
              const sale  = Math.round(l.total*(1-l.discount/100));
              return (
                <div key={l.id} className="bg-[#0f0f0f] border border-[#1e1e1e] overflow-hidden hover:border-[#c9913a]/40 transition-colors">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={l.img} alt={l.title} className="w-full h-full object-cover"/>
                    <span className={`absolute top-3 left-3 ${G} text-[#0b0b0b] text-[11px] font-bold px-3 py-1`}>−{l.discount}%</span>
                  </div>
                  <div className="p-5">
                    <h3 style={{fontFamily:"'Cormorant Garamond',serif"}} className="text-xl mb-1">{l.title}</h3>
                    <div className="flex gap-2 mb-4 mt-2">
                      {prods.map(p=>(
                        <div key={p.id} className="flex-1 bg-[#0b0b0b] border border-[#1e1e1e] p-2 text-center">
                          <img src={p.img} className="w-full aspect-square object-cover mb-1"/>
                          <p className="text-[10px] text-[#5a4e3c] truncate">{p.name}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-baseline justify-between mb-4">
                      <span style={{fontFamily:"'Cormorant Garamond',serif"}} className="text-2xl text-[#c9913a]">{sale.toLocaleString("ru")} ₽</span>
                      <span className="line-through text-[#3a3020] text-sm">{l.total.toLocaleString("ru")} ₽</span>
                    </div>
                    <button onClick={()=>{l.items.forEach(id=>addCart(id));}}
                      className={`${G} w-full text-[#0b0b0b] text-[11px] tracking-[0.22em] uppercase font-semibold py-3 hover:opacity-90`}>
                      Добавить набор
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ══════════════════ БЛОГ ══════════════════ */}
      {page==="blog" && (
        <section className="max-w-5xl mx-auto px-5 py-20">
          <div className="text-center mb-14">
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#c9913a] mb-2">Образы и советы</p>
            <h2 style={{fontFamily:"'Cormorant Garamond',serif"}} className="text-5xl font-light">Как носить</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {BLOG.map((b,i)=>(
              <div key={i} className="bg-[#0f0f0f] border border-[#1e1e1e] overflow-hidden group hover:border-[#c9913a]/40 transition-colors">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={b.img} alt={b.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"/>
                  <div className="absolute inset-0 bg-[#0b0b0b]/30 group-hover:bg-[#0b0b0b]/10 transition-all flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-[#c9913a]/20 border border-[#c9913a] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Icon name="Play" size={18} className="text-[#c9913a] ml-0.5"/>
                    </div>
                  </div>
                  <span className="absolute top-3 left-3 bg-[#0b0b0b]/70 border border-[#2a2a2a] text-[#c9913a] text-[10px] tracking-[0.2em] uppercase px-3 py-1">
                    {b.tag}
                  </span>
                </div>
                <div className="p-5">
                  <h3 style={{fontFamily:"'Cormorant Garamond',serif"}} className="text-xl mb-1">{b.title}</h3>
                  <p className="text-[11px] text-[#5a4e3c]">{b.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      </div>

      {/* ══ FOOTER ══ */}
      <footer className="border-t border-[#1a1a1a] bg-[#060606] py-12 px-5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
          <div>
            <button onClick={()=>go("home")} style={{fontFamily:"'Cormorant Garamond',serif"}}
              className={`text-2xl font-bold tracking-[0.15em] ${GT} block mb-3`}>
              Шаг&amp;Сум
            </button>
            <p className="text-[11px] text-[#4a3e2e] leading-relaxed">Стильные туфли и сумки в одном месте. Коллекции 2025–2026.</p>
          </div>
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#c9913a] mb-4">Разделы</p>
            <div className="grid grid-cols-2 gap-2">
              {nav.map(n=>(
                <button key={n.key} onClick={()=>go(n.key)}
                  className="text-left text-[11px] tracking-[0.15em] text-[#4a3e2e] hover:text-[#c9913a] transition-colors uppercase">
                  {n.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#c9913a] mb-4">Сервис</p>
            {["Примерка дома","Подгонка размера","Доставка","Возврат 14 дней"].map(s=>(
              <p key={s} className="text-[11px] text-[#4a3e2e] mb-2">{s}</p>
            ))}
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-[#111] text-center">
          <p className="text-[10px] text-[#2a2418] tracking-wide">© 2026 Шаг&amp;Сум — Все права защищены</p>
        </div>
      </footer>

      {/* ══ MODAL LOOK ══ */}
      {lookModal!==null && (() => {
        const l=LOOKS.find(x=>x.id===lookModal)!;
        return (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/70" onClick={()=>setLookModal(null)}/>
            <div className="relative bg-[#0f0f0f] border border-[#c9913a]/30 p-8 max-w-sm w-full" style={{animation:"scaleIn .2s both"}}>
              <button onClick={()=>setLookModal(null)} className="absolute top-4 right-4 text-[#5a4e3c] hover:text-[#c9913a]">
                <Icon name="X" size={18}/>
              </button>
              <h3 style={{fontFamily:"'Cormorant Garamond',serif"}} className="text-2xl text-[#c9913a] mb-4">{l.title}</h3>
              <img src={l.img} className="w-full aspect-video object-cover mb-4 border border-[#1e1e1e]"/>
              <p className="text-[11px] text-[#5a4e3c] mb-4">Набор включает {l.items.length} предмета. Скидка {l.discount}% при покупке комплектом.</p>
              <button onClick={()=>{l.items.forEach(id=>addCart(id));setLookModal(null);}}
                className={`${G} w-full text-[#0b0b0b] text-[11px] tracking-[0.22em] uppercase font-semibold py-3 hover:opacity-90`}>
                Добавить набор в корзину
              </button>
            </div>
          </div>
        );
      })()}

      {/* ══ VIRTUAL TRY-ON ══ */}
      {tryOn && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70" onClick={()=>setTryOn(false)}/>
          <div className="relative bg-[#0f0f0f] border border-[#c9913a]/30 p-8 max-w-md w-full text-center" style={{animation:"scaleIn .2s both"}}>
            <button onClick={()=>setTryOn(false)} className="absolute top-4 right-4 text-[#5a4e3c] hover:text-[#c9913a]">
              <Icon name="X" size={18}/>
            </button>
            <div className="w-16 h-16 border border-[#c9913a]/40 flex items-center justify-center mx-auto mb-4">
              <Icon name="Camera" size={28} className="text-[#c9913a]"/>
            </div>
            <h3 style={{fontFamily:"'Cormorant Garamond',serif"}} className="text-2xl text-[#c9913a] mb-2">Виртуальная примерка</h3>
            <p className="text-[11px] text-[#5a4e3c] mb-6 leading-relaxed">Загрузите фото своих ног или силуэта — и мы покажем, как будет выглядеть эта модель на вас.</p>
            <label className="block border-2 border-dashed border-[#2a2a2a] hover:border-[#c9913a] transition-colors py-8 cursor-pointer mb-4">
              <Icon name="Upload" size={24} className="text-[#5a4e3c] mx-auto mb-2"/>
              <p className="text-[11px] text-[#5a4e3c]">Нажмите чтобы загрузить фото</p>
              <input type="file" className="hidden" accept="image/*" onChange={()=>showNotify("Функция в разработке — скоро!")}/>
            </label>
            <p className="text-[10px] text-[#2a2418]">Ваши фото не сохраняются и используются только для примерки</p>
          </div>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Montserrat:wght@300;400;500;600&display=swap');
        @keyframes fadeUp    { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slowZoom  { from{transform:scale(1.04)} to{transform:scale(1.10)} }
        @keyframes slideLeft { from{transform:translateX(100%)} to{transform:translateX(0)} }
        @keyframes scaleIn   { from{opacity:0;transform:scale(.95)} to{opacity:1;transform:scale(1)} }
      `}</style>
    </div>
  );
}

/* ── Карточка товара ── */
function ProductCard({p, onView, onCart, GT, G}:{
  p:typeof PRODUCTS[0]; onView:()=>void; onCart:()=>void; GT:string; G:string;
}) {
  return (
    <div className="group bg-[#0f0f0f] border border-[#1e1e1e] overflow-hidden hover:border-[#c9913a]/40 transition-colors">
      <div className="relative overflow-hidden aspect-[3/4] cursor-pointer" onClick={onView}>
        <img src={p.img} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"/>
        {p.tag && (
          <span className={`absolute top-3 left-3 ${G} text-[#0b0b0b] text-[10px] tracking-[0.15em] uppercase px-2.5 py-1 font-semibold`}>
            {p.tag}
          </span>
        )}
        <div className="absolute inset-0 bg-[#0b0b0b]/0 group-hover:bg-[#0b0b0b]/35 transition-all flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#c9913a] text-[10px] tracking-[0.2em] uppercase border border-[#c9913a] px-4 py-2">
            Смотреть
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 style={{fontFamily:"'Cormorant Garamond',serif"}} className="text-lg leading-tight mb-0.5">{p.name}</h3>
        <p className="text-[9px] tracking-[0.18em] uppercase text-[#5a4e3c] mb-3">{p.cat==="shoes"?"Туфли":"Сумка"}</p>
        <div className="flex items-center justify-between">
          <div>
            <span className={`text-base ${GT} font-semibold`} style={{fontFamily:"'Cormorant Garamond',serif"}}>
              {p.price.toLocaleString("ru")} ₽
            </span>
            {p.oldPrice && <span className="ml-2 text-[10px] line-through text-[#3a3020]">{p.oldPrice.toLocaleString("ru")} ₽</span>}
          </div>
          <button onClick={onCart}
            className="w-8 h-8 border border-[#2a2a2a] hover:border-[#c9913a] hover:bg-[#c9913a]/10 flex items-center justify-center transition-all text-[#c9913a]">
            <Icon name="Plus" size={14}/>
          </button>
        </div>
      </div>
    </div>
  );
}