import { useState } from "react";
import Icon from "@/components/ui/icon";

const IMG_SHOES = "https://cdn.poehali.dev/projects/731183b5-5a08-40e8-8d25-c7d4e24f3b79/files/fd8f2cf9-4381-4242-b624-e63fc49031d1.jpg";
const IMG_BAGS  = "https://cdn.poehali.dev/projects/731183b5-5a08-40e8-8d25-c7d4e24f3b79/files/59f9baed-cbf7-42eb-8174-fedf27ad5201.jpg";
const IMG_HERO  = "https://cdn.poehali.dev/projects/731183b5-5a08-40e8-8d25-c7d4e24f3b79/files/3761f60e-fba5-4e19-85f7-43f4d536d957.jpg";

const CATALOG = [
  { id:1, name:"Туфли «Venezia»",  cat:"shoes", price:"8 900 ₽",  img:IMG_SHOES, tag:"Новинка" },
  { id:2, name:"Сумка «Noir»",     cat:"bags",  price:"12 500 ₽", img:IMG_BAGS,  tag:"Хит"    },
  { id:3, name:"Туфли «Milano»",   cat:"shoes", price:"7 200 ₽",  img:IMG_SHOES, tag:""       },
  { id:4, name:"Клатч «Amour»",    cat:"bags",  price:"6 800 ₽",  img:IMG_BAGS,  tag:"Хит"    },
  { id:5, name:"Туфли «Luna»",     cat:"shoes", price:"9 400 ₽",  img:IMG_SHOES, tag:""       },
  { id:6, name:"Сумка «Prestige»", cat:"bags",  price:"15 900 ₽", img:IMG_BAGS,  tag:"Новинка"},
];

const GALLERY = [
  { img:IMG_HERO,  span:true,  label:"Образ дня"        },
  { img:IMG_SHOES, span:false, label:"Туфли — хиты сезона" },
  { img:IMG_BAGS,  span:false, label:"Сумки — новинки"  },
  { img:IMG_SHOES, span:false, label:"Классика"         },
  { img:IMG_BAGS,  span:false, label:"Вечерний клатч"   },
  { img:IMG_HERO,  span:false, label:"Лук недели"       },
];

type Page = "home"|"catalog"|"gallery"|"delivery"|"contacts";

export default function Index() {
  const [page,   setPage]   = useState<Page>("home");
  const [filter, setFilter] = useState<"all"|"shoes"|"bags">("all");
  const [burger, setBurger] = useState(false);

  const nav: {key:Page; label:string}[] = [
    {key:"home",     label:"Главная"},
    {key:"catalog",  label:"Каталог"},
    {key:"gallery",  label:"Галерея"},
    {key:"delivery", label:"Доставка"},
    {key:"contacts", label:"Контакты"},
  ];

  const go = (p:Page) => { setPage(p); setBurger(false); window.scrollTo({top:0}); };

  const items = filter === "all" ? CATALOG : CATALOG.filter(i => i.cat === filter);

  return (
    <div style={{fontFamily:"'Montserrat',sans-serif"}} className="min-h-screen bg-[#0b0b0b] text-[#ede0c4] scroll-smooth">

      {/* ── ШАПКА ── */}
      <header className="fixed inset-x-0 top-0 z-50 bg-[#0b0b0b]/95 backdrop-blur border-b border-[#222]">
        <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between">

          <button onClick={()=>go("home")}
            style={{fontFamily:"'Cormorant Garamond',serif"}}
            className="text-2xl font-bold tracking-[0.18em] bg-gradient-to-r from-[#f0cc6e] via-[#c9913a] to-[#f0cc6e] bg-clip-text text-transparent">
            Шаг&amp;Сум
          </button>

          <nav className="hidden md:flex gap-7">
            {nav.map(n=>(
              <button key={n.key} onClick={()=>go(n.key)}
                className={`text-[11px] tracking-[0.22em] uppercase transition-colors duration-200 ${page===n.key ? "text-[#c9913a]" : "text-[#7a6a50] hover:text-[#c9913a]"}`}>
                {n.label}
              </button>
            ))}
          </nav>

          <button className="md:hidden text-[#c9913a]" onClick={()=>setBurger(b=>!b)}>
            <Icon name={burger?"X":"Menu"} size={22}/>
          </button>
        </div>

        {burger && (
          <div className="md:hidden border-t border-[#1e1e1e] bg-[#0f0f0f] px-5 py-5 flex flex-col gap-4">
            {nav.map(n=>(
              <button key={n.key} onClick={()=>go(n.key)}
                className={`text-left text-[11px] tracking-[0.22em] uppercase py-1 ${page===n.key?"text-[#c9913a]":"text-[#7a6a50]"}`}>
                {n.label}
              </button>
            ))}
          </div>
        )}
      </header>

      <div className="pt-16">

      {/* ═══════════════ ГЛАВНАЯ ═══════════════ */}
      {page==="home" && <>

        {/* HERO */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <img src={IMG_HERO} alt="hero"
            className="absolute inset-0 w-full h-full object-cover scale-105 animate-[slowZoom_12s_ease-in-out_infinite_alternate]"/>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0b0b0b]/60 via-[#0b0b0b]/30 to-[#0b0b0b]"/>

          <div className="relative z-10 text-center px-6 flex flex-col items-center">
            <p className="text-[11px] tracking-[0.5em] uppercase text-[#c9913a] mb-5"
               style={{animation:"fadeUp .8s .1s both"}}>
              Стильные туфли и сумки в одном месте
            </p>

            <h1 style={{fontFamily:"'Cormorant Garamond',serif", animation:"fadeUp .8s .25s both"}}
                className="text-[clamp(4.5rem,14vw,11rem)] font-light leading-none tracking-[0.12em]
                           bg-gradient-to-br from-[#f5d782] via-[#c9913a] to-[#f5d782] bg-clip-text text-transparent">
              Шаг&amp;Сум
            </h1>

            <div className="flex items-center gap-4 mt-3" style={{animation:"fadeUp .8s .38s both"}}>
              <div className="h-px w-14 bg-[#c9913a]/50"/>
              <p style={{fontFamily:"'Cormorant Garamond',serif"}}
                 className="text-[clamp(1rem,2.2vw,1.35rem)] italic text-[#c9b06e]">
                Подчеркни образ одной парой
              </p>
              <div className="h-px w-14 bg-[#c9913a]/50"/>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-12" style={{animation:"fadeUp .8s .5s both"}}>
              <button onClick={()=>go("catalog")}
                className="bg-gradient-to-r from-[#c9913a] to-[#e8c76a] text-[#0b0b0b]
                           text-[11px] tracking-[0.3em] uppercase font-semibold px-10 py-4
                           hover:opacity-90 transition-opacity relative overflow-hidden group">
                <span className="relative z-10">Смотреть каталог</span>
                <span className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-[-15deg]"/>
              </button>
              <button onClick={()=>go("gallery")}
                className="border border-[#c9913a] text-[#c9913a] text-[11px] tracking-[0.3em] uppercase
                           px-10 py-4 hover:bg-[#c9913a]/10 transition-all">
                Галерея
              </button>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
            <div className="h-10 w-px bg-gradient-to-b from-[#c9913a] to-transparent"/>
          </div>
        </section>

        {/* КАТЕГОРИИ */}
        <section className="max-w-7xl mx-auto px-5 py-24">
          <div className="text-center mb-14">
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#c9913a] mb-3">Наши категории</p>
            <h2 style={{fontFamily:"'Cormorant Garamond',serif"}} className="text-5xl font-light">
              Выбери своё
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {[
              {label:"Туфли", sub:"Элегантность в каждом шаге",   img:IMG_SHOES, f:"shoes" as const},
              {label:"Сумки", sub:"Стиль, который говорит за тебя", img:IMG_BAGS,  f:"bags"  as const},
            ].map(c=>(
              <button key={c.f} onClick={()=>{setFilter(c.f);go("catalog");}}
                className="group relative overflow-hidden aspect-[16/10]">
                <img src={c.img} alt={c.label}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"/>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b]/90 via-[#0b0b0b]/20 to-transparent"/>
                <div className="absolute bottom-0 left-0 p-8 text-left">
                  <h3 style={{fontFamily:"'Cormorant Garamond',serif"}}
                      className="text-4xl font-light bg-gradient-to-r from-[#f5d782] to-[#c9913a] bg-clip-text text-transparent mb-1">
                    {c.label}
                  </h3>
                  <p className="text-[10px] tracking-[0.22em] uppercase text-[#a08c6e]">{c.sub}</p>
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Icon name="ArrowUpRight" size={20} className="text-[#c9913a]"/>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* ПРЕИМУЩЕСТВА */}
        <section className="border-y border-[#1a1a1a] bg-[#080808] py-20 px-5">
          <div className="max-w-7xl mx-auto grid sm:grid-cols-3 gap-10 text-center">
            {[
              {icon:"Star",      title:"Только оригиналы",   desc:"Вся продукция сертифицирована"},
              {icon:"Truck",     title:"Быстрая доставка",   desc:"По всей России от 2 дней"},
              {icon:"RotateCcw", title:"Обмен и возврат",    desc:"В течение 14 дней"},
            ].map(a=>(
              <div key={a.icon} className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border border-[#c9913a]/40 flex items-center justify-center">
                  <Icon name={a.icon as "Star"} size={18} className="text-[#c9913a]"/>
                </div>
                <h4 style={{fontFamily:"'Cormorant Garamond',serif"}} className="text-xl text-[#c9913a]">{a.title}</h4>
                <p className="text-[11px] text-[#5a4e3c] tracking-wide">{a.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </>}

      {/* ═══════════════ КАТАЛОГ ═══════════════ */}
      {page==="catalog" && (
        <section className="max-w-7xl mx-auto px-5 py-20">
          <div className="text-center mb-12">
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#c9913a] mb-3">Наши товары</p>
            <h2 style={{fontFamily:"'Cormorant Garamond',serif"}} className="text-5xl font-light">Каталог</h2>
          </div>

          {/* Фильтры */}
          <div className="flex justify-center gap-3 mb-12 flex-wrap">
            {([["all","Все"],["shoes","Туфли"],["bags","Сумки"]] as const).map(([k,l])=>(
              <button key={k} onClick={()=>setFilter(k)}
                className={`text-[11px] tracking-[0.22em] uppercase px-6 py-2.5 border transition-all duration-200 ${
                  filter===k
                    ? "bg-gradient-to-r from-[#c9913a] to-[#e8c76a] text-[#0b0b0b] border-transparent font-semibold"
                    : "border-[#2a2a2a] text-[#7a6a50] hover:border-[#c9913a] hover:text-[#c9913a]"}`}>
                {l}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {items.map(item=>(
              <div key={item.id} className="group bg-[#0f0f0f] border border-[#1e1e1e] overflow-hidden hover:border-[#c9913a]/40 transition-colors duration-300">
                <div className="relative overflow-hidden aspect-[3/4]">
                  <img src={item.img} alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"/>
                  {item.tag && (
                    <span className="absolute top-3 left-3 bg-gradient-to-r from-[#c9913a] to-[#e8c76a] text-[#0b0b0b]
                                     text-[10px] tracking-[0.18em] uppercase px-3 py-1 font-semibold">
                      {item.tag}
                    </span>
                  )}
                  <div className="absolute inset-0 bg-[#0b0b0b]/0 group-hover:bg-[#0b0b0b]/40 transition-all flex items-center justify-center">
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity
                                       bg-gradient-to-r from-[#c9913a] to-[#e8c76a] text-[#0b0b0b]
                                       text-[10px] tracking-[0.22em] uppercase px-7 py-3 font-semibold">
                      В корзину
                    </button>
                  </div>
                </div>
                <div className="p-5 flex items-end justify-between">
                  <div>
                    <h3 style={{fontFamily:"'Cormorant Garamond',serif"}} className="text-xl mb-0.5">{item.name}</h3>
                    <p className="text-[10px] tracking-[0.18em] uppercase text-[#5a4e3c]">
                      {item.cat==="shoes"?"Туфли":"Сумка"}
                    </p>
                  </div>
                  <span style={{fontFamily:"'Cormorant Garamond',serif"}} className="text-lg text-[#c9913a] font-semibold">
                    {item.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ═══════════════ ГАЛЕРЕЯ ═══════════════ */}
      {page==="gallery" && (
        <section className="max-w-7xl mx-auto px-5 py-20">
          <div className="text-center mb-12">
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#c9913a] mb-3">Вдохновение</p>
            <h2 style={{fontFamily:"'Cormorant Garamond',serif"}} className="text-5xl font-light">Галерея</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {GALLERY.map((g,i)=>(
              <div key={i} className={`group relative overflow-hidden ${g.span?"md:col-span-2":""}`}>
                <div className={`overflow-hidden ${g.span?"aspect-[16/9]":"aspect-square"}`}>
                  <img src={g.img} alt={g.label}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b]/80 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
                  <div className="absolute bottom-0 left-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <p style={{fontFamily:"'Cormorant Garamond',serif"}} className="text-lg text-[#c9913a]">{g.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ═══════════════ ДОСТАВКА ═══════════════ */}
      {page==="delivery" && (
        <section className="max-w-3xl mx-auto px-5 py-24">
          <div className="text-center mb-14">
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#c9913a] mb-3">Логистика</p>
            <h2 style={{fontFamily:"'Cormorant Garamond',serif"}} className="text-5xl font-light">Доставка</h2>
          </div>

          <div className="space-y-4">
            {[
              {icon:"Truck",      title:"Курьерская доставка", desc:"Доставляем по всей России. Срок — от 2 до 7 рабочих дней. Стоимость от 350 ₽."},
              {icon:"Package",    title:"Самовывоз",           desc:"Забрать заказ можно из нашего шоурума. Адрес уточняется при оформлении. Бесплатно."},
              {icon:"Globe",      title:"СДЭК / Почта России", desc:"Отправляем через СДЭК и Почту России. Сроки и стоимость рассчитываются индивидуально."},
              {icon:"RefreshCw",  title:"Возврат и обмен",     desc:"Принимаем возврат в течение 14 дней с момента получения. Товар должен сохранить товарный вид."},
            ].map(d=>(
              <div key={d.title}
                className="bg-[#0f0f0f] border border-[#1e1e1e] hover:border-[#c9913a]/40 transition-colors p-6 flex gap-5 items-start group">
                <div className="w-10 h-10 border border-[#c9913a]/30 group-hover:border-[#c9913a] transition-colors flex items-center justify-center flex-shrink-0">
                  <Icon name={d.icon as "Truck"} size={17} className="text-[#c9913a]"/>
                </div>
                <div>
                  <h3 style={{fontFamily:"'Cormorant Garamond',serif"}} className="text-xl text-[#c9913a] mb-1.5">{d.title}</h3>
                  <p className="text-[11px] text-[#5a4e3c] leading-relaxed tracking-wide">{d.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ═══════════════ КОНТАКТЫ ═══════════════ */}
      {page==="contacts" && (
        <section className="max-w-3xl mx-auto px-5 py-24">
          <div className="text-center mb-14">
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#c9913a] mb-3">Связь</p>
            <h2 style={{fontFamily:"'Cormorant Garamond',serif"}} className="text-5xl font-light">Контакты</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            {[
              {icon:"Phone",   label:"Телефон",       value:"+7 (000) 000-00-00"},
              {icon:"Mail",    label:"Email",          value:"info@shagsum.ru"},
              {icon:"MapPin",  label:"Адрес",          value:"Москва, ул. Примерная, 1"},
              {icon:"Clock",   label:"Режим работы",   value:"Пн–Сб: 10:00 – 20:00"},
            ].map(c=>(
              <div key={c.label}
                className="bg-[#0f0f0f] border border-[#1e1e1e] hover:border-[#c9913a]/40 transition-colors p-5 flex gap-4 items-center group">
                <div className="w-10 h-10 border border-[#c9913a]/30 group-hover:border-[#c9913a] transition-colors flex items-center justify-center flex-shrink-0">
                  <Icon name={c.icon as "Phone"} size={17} className="text-[#c9913a]"/>
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-[#5a4e3c] mb-0.5">{c.label}</p>
                  <p style={{fontFamily:"'Cormorant Garamond',serif"}} className="text-lg">{c.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#0f0f0f] border border-[#1e1e1e] p-8">
            <h3 style={{fontFamily:"'Cormorant Garamond',serif"}} className="text-2xl text-[#c9913a] mb-6">Написать нам</h3>
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                {[["Имя","text","Ваше имя"],["Телефон","tel","+7 (___) ___-__-__"]].map(([l,t,p])=>(
                  <div key={l}>
                    <label className="text-[10px] tracking-[0.2em] uppercase text-[#5a4e3c] block mb-2">{l}</label>
                    <input type={t} placeholder={p}
                      className="w-full bg-[#080808] border border-[#1e1e1e] text-[#ede0c4] px-4 py-3 text-sm
                                 focus:outline-none focus:border-[#c9913a] transition-colors placeholder:text-[#3a3020]"/>
                  </div>
                ))}
              </div>
              <div>
                <label className="text-[10px] tracking-[0.2em] uppercase text-[#5a4e3c] block mb-2">Сообщение</label>
                <textarea rows={4} placeholder="Ваш вопрос или пожелание..."
                  className="w-full bg-[#080808] border border-[#1e1e1e] text-[#ede0c4] px-4 py-3 text-sm
                             focus:outline-none focus:border-[#c9913a] transition-colors resize-none placeholder:text-[#3a3020]"/>
              </div>
              <button
                className="bg-gradient-to-r from-[#c9913a] to-[#e8c76a] text-[#0b0b0b]
                           text-[11px] tracking-[0.3em] uppercase font-semibold px-10 py-4
                           hover:opacity-90 transition-opacity">
                Отправить
              </button>
            </div>
          </div>
        </section>
      )}

      </div>

      {/* ── ФУТЕР ── */}
      <footer className="border-t border-[#1a1a1a] bg-[#060606] py-10 px-5 mt-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5">
          <button onClick={()=>go("home")}
            style={{fontFamily:"'Cormorant Garamond',serif"}}
            className="text-2xl font-bold tracking-[0.18em] bg-gradient-to-r from-[#f5d782] via-[#c9913a] to-[#f5d782] bg-clip-text text-transparent">
            Шаг&amp;Сум
          </button>
          <nav className="flex flex-wrap justify-center gap-6">
            {nav.map(n=>(
              <button key={n.key} onClick={()=>go(n.key)}
                className="text-[10px] tracking-[0.22em] uppercase text-[#4a3e2e] hover:text-[#c9913a] transition-colors">
                {n.label}
              </button>
            ))}
          </nav>
          <p className="text-[10px] text-[#2a2418] tracking-wide">© 2026 Шаг&amp;Сум</p>
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Montserrat:wght@300;400;500;600&display=swap');
        @keyframes fadeUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slowZoom { from{transform:scale(1.05)} to{transform:scale(1.12)} }
      `}</style>
    </div>
  );
}
