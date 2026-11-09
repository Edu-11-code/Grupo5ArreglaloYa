import { useState } from "react";

type IconName =
  | "arrow"
  | "bolt"
  | "brick"
  | "calendar"
  | "check"
  | "chevron"
  | "clock"
  | "close"
  | "drop"
  | "location"
  | "menu"
  | "search"
  | "shield"
  | "star"
  | "tools"
  | "user"
  | "washer";

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: (
      <>
        <path d="M5 12h14M13 6l6 6-6 6" />
      </>
    ),
    bolt: <path d="M13 2 4.5 13H11l-1 9 8.5-12H12l1-8Z" />,
    brick: (
      <>
        <path d="M3 6h18v12H3zM3 12h18M8 6v6M16 6v6M12 12v6" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 10h18" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    chevron: <path d="m9 18 6-6-6-6" />,
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    close: (
      <>
        <path d="m6 6 12 12M18 6 6 18" />
      </>
    ),
    drop: <path d="M12 2S5 9.2 5 14a7 7 0 0 0 14 0c0-4.8-7-12-7-12Z" />,
    location: (
      <>
        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    menu: (
      <>
        <path d="M4 7h16M4 12h16M4 17h16" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    shield: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    star: (
      <path d="m12 2.5 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5-5.8-3.1-5.8 3.1 1.1-6.5-4.7-4.6 6.5-.9L12 2.5Z" />
    ),
    tools: (
      <>
        <path d="m14.7 6.3 3-3a4 4 0 0 1-5 5L5 16l-1 4 4-1 7.7-7.7a4 4 0 0 1 5-5l-3 3" />
        <path d="m8.5 8.5-5-5M3 3l1 4 3-3" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </>
    ),
    washer: (
      <>
        <rect x="4" y="2" width="16" height="20" rx="2" />
        <circle cx="12" cy="14" r="5" />
        <path d="M7 6h2M17 6h.01" />
      </>
    ),
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

const categories = [
  { name: "Plomería", icon: "drop" as IconName, color: "bg-[#eaf5ff] text-[#2881c2]" },
  { name: "Electricidad", icon: "bolt" as IconName, color: "bg-[#fff6db] text-[#dc9a00]" },
  { name: "Albañilería", icon: "brick" as IconName, color: "bg-[#fff0e8] text-[#da6d35]" },
  { name: "Electrodomésticos", icon: "washer" as IconName, color: "bg-[#eeeaff] text-[#7558c9]" },
];

const professionals = [
  {
    initials: "CM",
    name: "Carlos Mendoza",
    role: "Plomero especialista",
    rating: "4.9",
    jobs: 128,
    zone: "Zona Norte",
    color: "bg-[#d9ece9] text-[#25766c]",
  },
  {
    initials: "LR",
    name: "Lucía Rojas",
    role: "Electricista certificada",
    rating: "4.8",
    jobs: 96,
    zone: "Zona Central",
    color: "bg-[#ffe9cc] text-[#9b641f]",
  },
  {
    initials: "JM",
    name: "Javier Méndez",
    role: "Técnico de electrodomésticos",
    rating: "4.9",
    jobs: 154,
    zone: "Zona Sur",
    color: "bg-[#e6e0f6] text-[#684e9b]",
  },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [requestOpen, setRequestOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [query, setQuery] = useState("");
  const [zone, setZone] = useState("Cochabamba");
  const [toast, setToast] = useState("");

  const openRequest = (category = "") => {
    setSelectedCategory(category);
    setRequestOpen(true);
  };

  const submitRequest = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setRequestOpen(false);
    setToast("¡Solicitud creada! Te mostraremos profesionales disponibles.");
    window.setTimeout(() => setToast(""), 4000);
  };

  const runSearch = () => {
    document.querySelector("#profesionales")?.scrollIntoView({ behavior: "smooth" });
    setToast(query ? `Buscando “${query}” en ${zone}` : `Mostrando servicios en ${zone}`);
    window.setTimeout(() => setToast(""), 3500);
  };

  return (
    <div className="min-h-screen bg-[#fbfcf9] text-[#17332f]">
      <header className="sticky top-0 z-40 border-b border-[#17332f]/8 bg-[#fbfcf9]/95 backdrop-blur">
        <div className="mx-auto flex h-[76px] max-w-[1180px] items-center justify-between px-5 lg:px-8">
          <button
            className="flex items-center gap-2.5"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Ir al inicio"
          >
            <span className="grid size-9 rotate-[-6deg] place-items-center rounded-xl bg-[#ef6547] text-white shadow-[0_5px_12px_rgba(239,101,71,.25)]">
              <Icon name="tools" size={21} />
            </span>
            <span className="text-[21px] font-extrabold tracking-[-.04em]">
              Arréglalo <span className="text-[#ef6547]">Ya</span>
            </span>
          </button>

          <nav className="hidden items-center gap-8 text-sm font-semibold md:flex">
            <a href="#servicios" className="transition hover:text-[#ef6547]">
              Servicios
            </a>
            <a href="#como-funciona" className="transition hover:text-[#ef6547]">
              Cómo funciona
            </a>
            <a href="#profesionales" className="transition hover:text-[#ef6547]">
              Profesionales
            </a>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <button className="px-4 py-2 text-sm font-bold transition hover:text-[#ef6547]">
              Ingresar
            </button>
            <button
              onClick={() => openRequest()}
              className="rounded-full bg-[#17332f] px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#214b44]"
            >
              Publicar solicitud
            </button>
          </div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="grid size-10 place-items-center rounded-full border border-[#17332f]/10 md:hidden"
            aria-label="Abrir menú"
          >
            <Icon name={menuOpen ? "close" : "menu"} />
          </button>
        </div>
        {menuOpen && (
          <div className="border-t border-[#17332f]/8 bg-[#fbfcf9] p-5 md:hidden">
            <div className="flex flex-col gap-4 font-semibold">
              <a href="#servicios" onClick={() => setMenuOpen(false)}>
                Servicios
              </a>
              <a href="#como-funciona" onClick={() => setMenuOpen(false)}>
                Cómo funciona
              </a>
              <a href="#profesionales" onClick={() => setMenuOpen(false)}>
                Profesionales
              </a>
              <button
                onClick={() => openRequest()}
                className="rounded-full bg-[#17332f] px-5 py-3 text-white"
              >
                Publicar solicitud
              </button>
            </div>
          </div>
        )}
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute -left-40 top-20 size-[400px] rounded-full bg-[#f5d15e]/15 blur-3xl" />
          <div className="mx-auto grid max-w-[1180px] items-center gap-12 px-5 py-14 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:py-20">
            <div className="relative z-10">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#2f8b79]/20 bg-[#e7f4ef] px-3.5 py-2 text-xs font-extrabold uppercase tracking-[.12em] text-[#287567]">
                <Icon name="location" size={15} /> Disponible en Cochabamba
              </div>
              <h1 className="max-w-[650px] text-[46px] font-extrabold leading-[1.03] tracking-[-.055em] sm:text-[62px] lg:text-[68px]">
                Tu hogar en buenas{" "}
                <span className="relative whitespace-nowrap text-[#ef6547]">
                  manos
                  <span className="absolute -bottom-1 left-1 h-2 w-[95%] rounded-[50%] border-t-2 border-[#ef6547]/50" />
                </span>
              </h1>
              <p className="mt-6 max-w-[570px] text-lg leading-8 text-[#526a65]">
                Encuentra profesionales verificados para reparar y cuidar tu hogar. Compara
                opciones, recibe cotizaciones y contrata con tranquilidad.
              </p>

              <div className="mt-9 flex max-w-[620px] flex-col gap-2 rounded-[22px] border border-[#17332f]/10 bg-white p-2 shadow-[0_18px_50px_rgba(24,51,47,.10)] sm:flex-row">
                <label className="flex flex-1 items-center gap-3 rounded-2xl px-4 py-3">
                  <span className="text-[#ef6547]">
                    <Icon name="search" />
                  </span>
                  <span className="sr-only">¿Qué necesitas reparar?</span>
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && runSearch()}
                    className="min-w-0 flex-1 bg-transparent text-sm font-semibold outline-none placeholder:text-[#71817e]"
                    placeholder="¿Qué necesitas reparar?"
                  />
                </label>
                <div className="hidden w-px bg-[#17332f]/10 sm:block" />
                <label className="flex items-center gap-2 rounded-2xl px-3 py-3 text-sm font-semibold">
                  <Icon name="location" size={18} />
                  <select
                    value={zone}
                    onChange={(e) => setZone(e.target.value)}
                    className="bg-transparent outline-none"
                  >
                    <option>Cochabamba</option>
                    <option>Zona Norte</option>
                    <option>Zona Central</option>
                    <option>Zona Sur</option>
                  </select>
                </label>
                <button
                  onClick={runSearch}
                  className="rounded-2xl bg-[#ef6547] px-6 py-3.5 text-sm font-extrabold text-white shadow-[0_7px_16px_rgba(239,101,71,.25)] transition hover:bg-[#df583c]"
                >
                  Buscar
                </button>
              </div>
              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-[#61746f]">
                <span className="flex items-center gap-1.5">
                  <span className="text-[#2f8b79]">
                    <Icon name="check" size={16} />
                  </span>{" "}
                  Profesionales verificados
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-[#2f8b79]">
                    <Icon name="check" size={16} />
                  </span>{" "}
                  Cotizaciones claras
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-[#2f8b79]">
                    <Icon name="check" size={16} />
                  </span>{" "}
                  Pagos seguros
                </span>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[500px]">
              <div className="absolute -right-10 -top-8 size-28 rounded-full border-[20px] border-[#f5d15e]/50" />
              <div className="relative overflow-hidden rounded-[42px_42px_42px_130px] bg-[#dfece8] p-3 shadow-[0_35px_70px_rgba(24,51,47,.16)]">
                <img
                  className="h-[460px] w-full rounded-[34px_34px_34px_120px] object-cover object-center"
                  src="https://images.unsplash.com/photo-1676210133055-eab6ef033ce3?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=900"
                  alt="Profesional realizando una reparación de plomería en un hogar"
                />
              </div>
              <div className="absolute -bottom-5 left-2 flex items-center gap-3 rounded-2xl bg-white p-3.5 pr-5 shadow-[0_15px_35px_rgba(24,51,47,.18)] sm:-left-8">
                <span className="grid size-11 place-items-center rounded-full bg-[#e7f4ef] text-[#2f8b79]">
                  <Icon name="shield" size={23} />
                </span>
                <div>
                  <p className="text-sm font-extrabold">Profesional verificado</p>
                  <p className="mt-0.5 text-xs text-[#71817e]">Identidad y experiencia</p>
                </div>
              </div>
              <div className="absolute right-0 top-7 flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-extrabold shadow-[0_12px_30px_rgba(24,51,47,.15)] sm:-right-7">
                <span className="text-[#f5b82e]">
                  <Icon name="star" size={17} />
                </span>{" "}
                4.9 <span className="font-medium text-[#71817e]">(120+)</span>
              </div>
            </div>
          </div>
        </section>

        <section id="servicios" className="mx-auto max-w-[1180px] px-5 py-20 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="mb-3 text-xs font-extrabold uppercase tracking-[.16em] text-[#ef6547]">
                Todo lo que tu hogar necesita
              </p>
              <h2 className="text-3xl font-extrabold tracking-[-.04em] sm:text-4xl">
                Servicios más solicitados
              </h2>
            </div>
            <button
              onClick={() => openRequest()}
              className="flex items-center gap-2 text-sm font-extrabold text-[#2f8b79]"
            >
              Ver todos los servicios <Icon name="arrow" size={18} />
            </button>
          </div>
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => openRequest(category.name)}
                className="group rounded-[24px] border border-[#17332f]/8 bg-white p-5 text-left transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(24,51,47,.1)]"
              >
                <span className={`grid size-14 place-items-center rounded-2xl ${category.color}`}>
                  <Icon name={category.icon} size={26} />
                </span>
                <h3 className="mt-5 text-lg font-extrabold">{category.name}</h3>
                <p className="mt-1 text-sm text-[#71817e]">Profesionales cerca de ti</p>
                <span className="mt-5 flex items-center gap-1 text-xs font-extrabold text-[#2f8b79] opacity-0 transition group-hover:opacity-100">
                  Solicitar ahora <Icon name="chevron" size={14} />
                </span>
              </button>
            ))}
          </div>
        </section>

        <section id="como-funciona" className="bg-[#17332f] text-white">
          <div className="mx-auto max-w-[1180px] px-5 py-20 lg:px-8">
            <div className="text-center">
              <p className="mb-3 text-xs font-extrabold uppercase tracking-[.16em] text-[#f5d15e]">
                Simple, claro y seguro
              </p>
              <h2 className="text-3xl font-extrabold tracking-[-.04em] sm:text-4xl">
                Resuelve en tres pasos
              </h2>
            </div>
            <div className="relative mt-14 grid gap-9 md:grid-cols-3">
              <div className="absolute left-[18%] right-[18%] top-7 hidden border-t border-dashed border-white/20 md:block" />
              {[
                {
                  icon: "tools" as IconName,
                  n: "01",
                  title: "Cuéntanos qué necesitas",
                  body: "Publica tu solicitud con los detalles del trabajo y tu zona.",
                },
                {
                  icon: "user" as IconName,
                  n: "02",
                  title: "Compara profesionales",
                  body: "Revisa perfiles, calificaciones y cotizaciones verificadas.",
                },
                {
                  icon: "calendar" as IconName,
                  n: "03",
                  title: "Reserva con confianza",
                  body: "Elige la mejor opción, agenda y sigue todo desde la plataforma.",
                },
              ].map((step) => (
                <div key={step.n} className="relative z-10 text-center">
                  <span className="relative mx-auto grid size-16 place-items-center rounded-2xl bg-[#244a43] text-[#f5d15e]">
                    <Icon name={step.icon} size={26} />
                    <b className="absolute -right-2 -top-2 grid size-6 place-items-center rounded-full bg-[#ef6547] text-[10px] text-white">
                      {step.n}
                    </b>
                  </span>
                  <h3 className="mt-6 text-lg font-extrabold">{step.title}</h3>
                  <p className="mx-auto mt-3 max-w-[280px] text-sm leading-6 text-white/60">
                    {step.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="profesionales" className="mx-auto max-w-[1180px] px-5 py-20 lg:px-8">
          <div className="text-center">
            <p className="mb-3 text-xs font-extrabold uppercase tracking-[.16em] text-[#ef6547]">
              Recomendados para ti
            </p>
            <h2 className="text-3xl font-extrabold tracking-[-.04em] sm:text-4xl">
              Profesionales destacados
            </h2>
            <p className="mt-3 text-[#71817e]">
              Experiencia comprobada y excelentes calificaciones.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {professionals.map((person) => (
              <article
                key={person.name}
                className="rounded-[26px] border border-[#17332f]/8 bg-white p-5 transition hover:shadow-[0_18px_45px_rgba(24,51,47,.09)]"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`grid size-16 shrink-0 place-items-center rounded-2xl text-lg font-extrabold ${person.color}`}
                  >
                    {person.initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <h3 className="truncate font-extrabold">{person.name}</h3>
                      <span className="text-[#2f8b79]">
                        <Icon name="check" size={16} />
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-[#71817e]">{person.role}</p>
                    <div className="mt-2 flex items-center gap-1 text-xs">
                      <span className="text-[#f5b82e]">
                        <Icon name="star" size={14} />
                      </span>
                      <b>{person.rating}</b>
                      <span className="text-[#8a9895]">· {person.jobs} trabajos</span>
                    </div>
                  </div>
                </div>
                <div className="mt-5 flex items-center justify-between border-t border-[#17332f]/8 pt-4">
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-[#61746f]">
                    <Icon name="location" size={15} />
                    {person.zone}
                  </span>
                  <button
                    onClick={() => openRequest(person.role)}
                    className="text-xs font-extrabold text-[#2f8b79]"
                  >
                    Ver perfil
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-[1180px] px-5 pb-20 lg:px-8">
          <div className="relative overflow-hidden rounded-[34px] bg-[#f3c951] px-6 py-12 text-center sm:px-12">
            <div className="absolute -left-12 -top-12 size-36 rounded-full border-[28px] border-white/20" />
            <div className="absolute -bottom-16 -right-10 size-44 rounded-full bg-[#ef6547]/20" />
            <div className="relative z-10 mx-auto max-w-[630px]">
              <h2 className="text-3xl font-extrabold tracking-[-.04em] sm:text-4xl">
                ¿Tienes algo que arreglar?
              </h2>
              <p className="mt-3 text-[#455d57]">
                Publica tu solicitud gratis y recibe ofertas de profesionales disponibles en tu
                zona.
              </p>
              <button
                onClick={() => openRequest()}
                className="mt-7 rounded-full bg-[#17332f] px-7 py-3.5 text-sm font-extrabold text-white transition hover:-translate-y-0.5"
              >
                Publicar una solicitud
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#17332f]/8 bg-white">
        <div className="mx-auto flex max-w-[1180px] flex-col items-center justify-between gap-4 px-5 py-8 text-center sm:flex-row lg:px-8">
          <div className="flex items-center gap-2 font-extrabold">
            <span className="text-[#ef6547]">
              <Icon name="tools" />
            </span>{" "}
            Arréglalo Ya
          </div>
          <p className="text-xs text-[#71817e]">
            Conectando hogares con profesionales de confianza en Cochabamba.
          </p>
          <div className="flex gap-5 text-xs font-semibold text-[#526a65]">
            <button>Ayuda</button>
            <button>Privacidad</button>
          </div>
        </div>
      </footer>

      {requestOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-[#10231f]/55 p-0 backdrop-blur-sm sm:items-center sm:p-5"
          onMouseDown={(e) => e.target === e.currentTarget && setRequestOpen(false)}
        >
          <div className="w-full max-w-[540px] rounded-t-[30px] bg-white p-6 shadow-2xl sm:rounded-[30px] sm:p-8">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[.14em] text-[#ef6547]">
                  Nueva solicitud
                </p>
                <h2 className="mt-2 text-2xl font-extrabold tracking-[-.03em]">
                  ¿Qué necesitas arreglar?
                </h2>
              </div>
              <button
                onClick={() => setRequestOpen(false)}
                className="grid size-9 place-items-center rounded-full bg-[#f1f3ef]"
                aria-label="Cerrar"
              >
                <Icon name="close" size={18} />
              </button>
            </div>
            <form onSubmit={submitRequest} className="mt-7 space-y-5">
              <label className="block">
                <span className="mb-2 block text-sm font-bold">Tipo de servicio</span>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  required
                  className="w-full rounded-2xl border border-[#17332f]/12 bg-[#f8faf7] px-4 py-3.5 text-sm outline-none focus:border-[#2f8b79]"
                >
                  <option value="">Selecciona una categoría</option>
                  {categories.map((c) => (
                    <option key={c.name}>{c.name}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-bold">Describe el problema</span>
                <textarea
                  required
                  rows={3}
                  placeholder="Ej. Tengo una fuga debajo del lavaplatos..."
                  className="w-full resize-none rounded-2xl border border-[#17332f]/12 bg-[#f8faf7] px-4 py-3.5 text-sm outline-none placeholder:text-[#97a29f] focus:border-[#2f8b79]"
                />
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label>
                  <span className="mb-2 block text-sm font-bold">Zona</span>
                  <select className="w-full rounded-2xl border border-[#17332f]/12 bg-[#f8faf7] px-3 py-3.5 text-sm outline-none">
                    <option>Zona Norte</option>
                    <option>Zona Central</option>
                    <option>Zona Sur</option>
                  </select>
                </label>
                <label>
                  <span className="mb-2 block text-sm font-bold">Prioridad</span>
                  <select className="w-full rounded-2xl border border-[#17332f]/12 bg-[#f8faf7] px-3 py-3.5 text-sm outline-none">
                    <option>Normal</option>
                    <option>Urgente (+10%)</option>
                  </select>
                </label>
              </div>
              <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#ef6547] px-5 py-4 text-sm font-extrabold text-white transition hover:bg-[#df583c]">
                Continuar y recibir ofertas <Icon name="arrow" size={18} />
              </button>
              <p className="text-center text-[11px] text-[#82908d]">
                Publicar es gratis. Podrás comparar cotizaciones antes de reservar.
              </p>
            </form>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-5 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-[#17332f] px-5 py-3 text-sm font-bold text-white shadow-xl">
          <span className="text-[#7ed6bd]">
            <Icon name="check" size={18} />
          </span>
          {toast}
        </div>
      )}
    </div>
  );
}

export default App;
