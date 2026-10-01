import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  MessageCircle,
  ChevronDown,
  Quote
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// Exponential Ease-Out CountUp hook that re-triggers on each viewport entry
function useCountUp(target, duration = 1800) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let animFrame = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const startTime = performance.now();

          const animate = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Silky smooth ease-out expo curve: 1 - Math.pow(2, -10 * progress)
            const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            const current = Math.floor(easeOut * target);
            setCount(current);

            if (progress < 1) {
              animFrame = requestAnimationFrame(animate);
            } else {
              setCount(target);
            }
          };

          animFrame = requestAnimationFrame(animate);
        } else {
          // Reset count when scrolled out of view so it replays upon scrolling back
          if (animFrame) cancelAnimationFrame(animFrame);
          setCount(0);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => {
      if (animFrame) cancelAnimationFrame(animFrame);
      observer.disconnect();
    };
  }, [target, duration]);

  return [count, ref];
}

// Reusable viewport observer hook for bidirectional scroll reveal
function useInView(options = { threshold: 0.2, rootMargin: "-30px 0px" }) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      // Dynamically toggle inView so text animations replay whenever scrolling back into view
      setIsInView(entry.isIntersecting);
    }, options);

    observer.observe(el);
    return () => observer.disconnect();
  }, [options]);

  return [ref, isInView];
}

export default function About({ onNavigate }) {
  const { t } = useLanguage();
  const [activeCapability, setActiveCapability] = useState(null);
  const [activeIndustry, setActiveIndustry] = useState(null);
  const [activeValue, setActiveValue] = useState(null);
  const [activeMission, setActiveMission] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  // Track global scroll progress for top progress indicator and scroll depth
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          const currentProgress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
          setScrollProgress(Math.min(Math.max(currentProgress, 0), 100));
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Section inView triggers for staggered text reveal (calibrated so sections start clean & empty)
  const [whoRef, whoInView] = useInView({ threshold: 0.25, rootMargin: "-60px 0px" });
  const [visionRef, visionInView] = useInView({ threshold: 0.2, rootMargin: "-40px 0px" });
  const [journeyRef, journeyInView] = useInView({ threshold: 0.2, rootMargin: "-40px 0px" });
  const [statementRef, statementInView] = useInView({ threshold: 0.2, rootMargin: "-40px 0px" });
  const [whatRef, whatInView] = useInView({ threshold: 0.2, rootMargin: "-40px 0px" });
  const [industriesRef, industriesInView] = useInView({ threshold: 0.2, rootMargin: "-40px 0px" });
  const [valuesRef, valuesInView] = useInView({ threshold: 0.2, rootMargin: "-40px 0px" });
  const [ctaRef, ctaInView] = useInView({ threshold: 0.2, rootMargin: "-40px 0px" });

  // Strictly require user to have scrolled down before activating Section 02
  const isWhoActive = whoInView && scrollY > 70;

  // Animated Count-Up for Statistics
  const [stat1, stat1Ref] = useCountUp(15, 1400);
  const [stat2, stat2Ref] = useCountUp(100, 1800);
  const [stat3, stat3Ref] = useCountUp(28, 1600);

  const handleContactClick = () => {
    if (onNavigate) {
      onNavigate('contact');
    } else {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleProductsClick = () => {
    if (onNavigate) {
      onNavigate('products');
    } else {
      window.location.hash = 'products';
    }
  };

  const journeyMilestones = [
    {
      num: '01',
      stage: t('about_journey_1_stage') || 'Awal Berdiri',
      title: t('about_journey_1_title') || 'Menjawab Tantangan Kerak & Korosi Mesin Pabrik',
      desc: t('about_journey_1_desc') || 'Didirikan untuk mengatasi permasalahan riil pada boiler dan cooling tower industri melalui formulasi kimia spesifik.',
    },
    {
      num: '02',
      stage: t('about_journey_2_stage') || 'Riset & Formulasi',
      title: t('about_journey_2_title') || 'Pengembangan 28+ Formulasi Kimia Khusus',
      desc: t('about_journey_2_desc') || 'Memperluas lini produk mencakup chemical cleaning, degreaser, pelindung karat, isolasi elektrik, hingga specialty chemicals.',
    },
    {
      num: '03',
      stage: t('about_journey_3_stage') || 'Layanan Teknis Terpadu',
      title: t('about_journey_3_title') || 'Uji Laboratorium & Dosis Presisi di Lapangan',
      desc: t('about_journey_3_desc') || 'Mengintegrasikan analisis kualitas air baku (TDS, pH, Hardness) dan pendampingan berkala langsung oleh tim teknis di pabrik.',
    },
    {
      num: '04',
      stage: t('about_journey_4_stage') || 'Mitra Nasional',
      title: t('about_journey_4_title') || 'Dipercaya 100+ Fasilitas Industri Nasional',
      desc: t('about_journey_4_desc') || 'Menjadi mitra strategis jangka panjang bagi berbagai sektor manufaktur skala nasional dengan jaminan suplai berkelanjutan.',
    },
  ];

  const capabilityList = [
    {
      num: '01',
      title: t('cat_water') || 'Cooling & Boiler Treatment',
      desc: 'Inhibitor kerak, anti-korosi, biosida, dan oksigen scavenger untuk boiler uap serta sirkulasi pendingin cooling tower/chiller.',
    },
    {
      num: '02',
      title: t('cat_cleaning') || 'Cleaning & Degreasing',
      desc: 'Formulasi heavy-duty degreaser, pembersih kerak karbon, dan pelarut oli industri tanpa merusak integritas komponen mesin.',
    },
    {
      num: '03',
      title: t('cat_rust') || 'Rust Treatment & Protection',
      desc: 'Cairan konversi karat, rust remover berdaya tembus tinggi, dan pelapis pelindung anti-karat jangka panjang untuk logam.',
    },
    {
      num: '04',
      title: t('cat_electrical') || 'Electrical & Insulation',
      desc: 'Solven pembersih elektrik non-konduktif dengan dielektrik tinggi untuk dynamo, motor listrik, dan panel instrumen kontrol.',
    },
    {
      num: '05',
      title: t('cat_specialty') || 'Specialty Chemicals',
      desc: 'Bahan kimia khusus berpresisi tinggi mencakup mould release agent, chemical descaling sirkulasi, dan aditif proses.',
    },
  ];

  const industrySectors = [
    {
      num: '01',
      name: t('about_ind_1_name') || 'Industri Manufaktur & Perakitan',
      desc: t('about_ind_1_desc') || 'Pembersihan mesin, perlindungan cetakan moulding, dan degreasing komponen logam presisi.',
    },
    {
      num: '02',
      name: t('about_ind_2_name') || 'Makanan & Minuman (F&B)',
      desc: t('about_ind_2_desc') || 'Pengolahan air boiler dan cooling tower dengan standar keamanan tinggi dan pemantauan berkala.',
    },
    {
      num: '03',
      name: t('about_ind_3_name') || 'Tekstil & Garmen',
      desc: t('about_ind_3_desc') || 'Perawatan ketel uap bertekanan tinggi dan pencegahan kerak pada saluran pipa transmisi uap.',
    },
    {
      num: '04',
      name: t('about_ind_4_name') || 'Pulp & Paper',
      desc: t('about_ind_4_desc') || 'Pengendalian kerak kalsium, lumpur biologis, dan perlindungan korosi pada sistem sirkulasi air besar.',
    },
    {
      num: '05',
      name: t('about_ind_5_name') || 'Fabrikasi Logam & Baja',
      desc: t('about_ind_5_desc') || 'Penghilang karat berat, pasivasi permukaan logam, dan pelapisan antikarat jangka panjang.',
    },
    {
      num: '06',
      name: t('about_ind_6_name') || 'Pembangkit Energi & Utilitas',
      desc: t('about_ind_6_desc') || 'Efisiensi pertukaran panas chiller, kondensor, dan pendingin generator listrik pabrik.',
    },
  ];

  const coreValues = [
    {
      num: '01',
      title: t('about_why_1_title') || 'Kualitas Teruji',
      desc: t('about_why_1_desc') || 'Seluruh produk diproduksi sesuai standar mutu dan melalui uji efektivitas ketat sebelum sampai ke tangan Anda.',
    },
    {
      num: '02',
      title: t('about_why_2_title') || 'Respon Cepat',
      desc: t('about_why_2_desc') || 'Tim teknis kami siap merespon pertanyaan dan kendala lapangan dengan sigap — karena downtime mesin adalah biaya yang tidak bisa ditunda.',
    },
    {
      num: '03',
      title: t('about_why_3_title') || 'Integritas Tinggi',
      desc: t('about_why_3_desc') || 'Transparansi penuh atas spesifikasi bahan aktif, dosis yang disarankan, serta keamanan MSDS. Tidak ada yang ditutup-tutupi.',
    },
    {
      num: '04',
      title: t('about_why_4_title') || 'Fokus Solusi',
      desc: t('about_why_4_desc') || 'Keberhasilan kami diukur dari keberhasilan operasional mesin dan efisiensi biaya pabrik Anda — bukan dari volume penjualan semata.',
    },
  ];

  return (
    <main className="w-full pt-20 bg-white min-h-screen text-[#071A2B] antialiased selection:bg-teal-500 selection:text-white relative">
      

      {/* ============================================================
          01 — HERO SECTION: PROPORTIONED HEIGHT (BCA DIGITAL STYLE)
          ============================================================ */}
      <header className="relative min-h-[480px] sm:min-h-[540px] lg:min-h-[580px] py-12 sm:py-16 lg:py-20 bg-[#071A2B] text-white overflow-hidden flex flex-col justify-between border-b border-[#0D243A]">
        {/* Completely Static Background Pattern & Ambient Lighting */}
        <div className="absolute inset-0 bg-[radial-gradient(#2DD4BF_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.05] pointer-events-none" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />


        {/* Ambient Halo Lighting directly behind Left Title & Right Logo */}
        <div className="absolute top-10 left-6 sm:left-12 w-80 sm:w-[420px] h-80 bg-cyan-400/15 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute top-10 right-6 sm:right-12 w-80 sm:w-[420px] h-80 bg-teal-400/20 rounded-full blur-3xl pointer-events-none animate-pulse" />

        <div className="relative z-10 w-full px-6 sm:px-10 lg:px-16 xl:px-24 my-auto">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 lg:gap-16">
            
            {/* Left Column: Large H1 Hero Title + Short Clean Tagline */}
            <div className="space-y-4 max-w-xl lg:max-w-2xl">
              <div className="bca-mask">
                <h1 className="bca-reveal text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-serif leading-[1.25] pb-2 text-white tracking-tight transform !translate-y-0 !opacity-100">
                  Tentang<br />
                  <span className="whitespace-nowrap">CV. Citra Putra Mandiri</span>
                </h1>
              </div>

              <div className="bca-mask">
                <p className="bca-reveal text-sm sm:text-base md:text-lg text-slate-300 font-light max-w-lg leading-relaxed transform !translate-y-0 !opacity-100" style={{ transitionDelay: '120ms' }}>
                  {t('about_page_lead')}
                </p>
              </div>
            </div>

            {/* Right Column: Official Brand Logo Lockup Anchored to Far Right Screen Corner (100% Responsive) */}
            <div className="flex justify-start lg:justify-end items-center w-full lg:w-auto overflow-hidden">
              <div className="animate-logo-float flex items-center gap-2.5 sm:gap-3.5 lg:gap-4 select-none transform transition-all duration-[1200ms] delay-300 ease-[cubic-bezier(0.16,1,0.3,1)] max-w-full">
                {/* High-Res Crisp Emblem Icon */}
                <img
                  src="/assets/logo-mark.png"
                  alt="CV. Citra Putra Mandiri Emblem"
                  className="w-11 h-11 sm:w-16 sm:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.5)] shrink-0"
                />
                
                {/* 100% Sharp Subpixel HD Typography (Responsive Scaled) */}
                <div className="space-y-0.5 sm:space-y-1 text-left min-w-0 flex-1">
                  <h3 className="text-sm sm:text-lg lg:text-xl xl:text-2xl font-black font-serif tracking-wider text-white leading-none whitespace-nowrap drop-shadow-sm">
                    CV. CITRA PUTRA MANDIRI
                  </h3>
                  <p className="text-[7.5px] sm:text-[9px] lg:text-[10.5px] xl:text-[11px] font-bold uppercase tracking-[0.08em] sm:tracking-[0.14em] text-teal-300 leading-tight whitespace-nowrap">
                    INDUSTRIAL WATER TREATMENT &amp; CHEMICAL SOLUTIONS
                  </p>
                  <div className="h-[1.5px] sm:h-[2px] w-full bg-gradient-to-r from-teal-400 via-teal-300 to-amber-400 rounded-full my-0.5 sm:my-1 shadow-sm" />
                  <p className="text-[6.5px] sm:text-[8px] lg:text-[9.5px] xl:text-[10px] font-medium text-slate-300 tracking-wider whitespace-nowrap">
                    Boiler &bull; Cooling Tower &bull; Chiller &bull; General Supply
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </header>


      {/* ============================================================
          02 — WHO WE ARE (Starts Clean & Empty -> Unmasks on Scroll Down)
          ============================================================ */}
      <section
        id="who-we-are"
        ref={whoRef}
        className={`pt-24 sm:pt-32 lg:pt-36 pb-24 lg:pb-36 max-w-7xl mx-auto px-6 lg:px-12 bg-white scroll-mt-24 ${
          isWhoActive ? 'bca-active' : ''
        }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left 40%: Asymmetric Headline with BCA Mask Reveal */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bca-mask">
              <span className="bca-reveal text-xs font-semibold uppercase tracking-[0.25em] text-teal-700 block">
                {t('about_who_tag') || 'TENTANG KAMI'}
              </span>
            </div>
            
            <div className="bca-mask">
              <h2 className="bca-reveal text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-[#071A2B] leading-[1.18]" style={{ transitionDelay: '80ms' }}>
                {t('about_who_headline') || 'Partner Teknis untuk Menjaga Performa & Keberlanjutan Sistem Industri Anda.'}
              </h2>
            </div>
            
            <div className={`h-0.5 bg-teal-600 transition-all duration-1000 delay-300 ease-out ${
              isWhoActive ? 'w-16' : 'w-0'
            }`} />
          </div>

          {/* Right 60%: Narrative & Large Animated Numbers */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bca-mask">
              <p className="bca-reveal first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:text-[#071A2B] first-letter:mr-3 first-letter:float-left first-letter:leading-none text-slate-700 font-light leading-relaxed text-base sm:text-lg" style={{ transitionDelay: '120ms' }}>
                {t('about_history_p1')}
              </p>
            </div>
            <div className="bca-mask">
              <p className="bca-reveal text-slate-700 font-light leading-relaxed text-base sm:text-lg" style={{ transitionDelay: '200ms' }}>
                {t('about_history_p2')}
              </p>
            </div>
            <div className="bca-mask">
              <p className="bca-reveal text-slate-700 font-light leading-relaxed text-base sm:text-lg" style={{ transitionDelay: '280ms' }}>
                {t('about_history_p3')}
              </p>
            </div>

            {/* Typography Numbers with Vertical Dividers (Unmasks gracefully upon scroll) */}
            <div className={`pt-10 border-t border-slate-200 transition-all duration-1000 delay-300 ease-out ${
              isWhoActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}>
              <div className="grid grid-cols-3 gap-4 sm:gap-8 items-start">
                
                {/* Metric 1 */}
                <div ref={stat1Ref} className="space-y-1 sm:space-y-2">
                  <span className="font-serif font-bold text-4xl sm:text-5xl lg:text-6xl text-[#071A2B] block leading-none">
                    {stat1}+
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-wider block">
                    {t('about_stat_1_label')}
                  </span>
                </div>

                {/* Divider & Metric 2 */}
                <div ref={stat2Ref} className="border-l border-slate-200 pl-4 sm:pl-8 space-y-1 sm:space-y-2">
                  <span className="font-serif font-bold text-4xl sm:text-5xl lg:text-6xl text-[#071A2B] block leading-none">
                    {stat2}+
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-wider block">
                    {t('about_stat_2_label')}
                  </span>
                </div>

                {/* Divider & Metric 3 */}
                <div ref={stat3Ref} className="border-l border-slate-200 pl-4 sm:pl-8 space-y-1 sm:space-y-2">
                  <span className="font-serif font-bold text-4xl sm:text-5xl lg:text-6xl text-[#071A2B] block leading-none">
                    {stat3}+
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-wider block">
                    {t('about_stat_3_label')}
                  </span>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>


      {/* ============================================================
          03 — VISION & MISSION: SIGNATURE CORPORATE MANIFESTO (DEEP NAVY)
          ============================================================ */}
      <section
        ref={visionRef}
        className={`py-24 lg:py-32 bg-[#071A2B] text-white relative overflow-hidden border-y border-[#0D243A] ${
          visionInView ? 'bca-active' : ''
        }`}
      >
        {/* Completely Static Background Pattern & Ambient Lighting */}
        <div className="absolute inset-0 bg-[radial-gradient(#2DD4BF_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.04] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 space-y-16">
          
          {/* Section Header with Mask Reveal */}
          <div className="max-w-3xl space-y-3">
            <div className="bca-mask">
              <span className="bca-reveal text-xs font-semibold uppercase tracking-[0.25em] text-teal-400 block">
                {t('about_principles_badge') || 'ARAH PERUSAHAAN • VISI & MISI'}
              </span>
            </div>
            
            <div className="bca-mask">
              <h2 className="bca-reveal text-3xl sm:text-4xl font-bold font-serif text-white leading-tight" style={{ transitionDelay: '80ms' }}>
                {t('about_vision_mission_title') || 'Menentukan Arah. Menjaga Standar. Membangun Kepercayaan.'}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left 7 cols: Primary Focal Point — Visi Perusahaan (Brand Manifesto) */}
            <div className="lg:col-span-7 space-y-6 relative">
              {/* Large Watermark Quote Glyph */}
              <span
                className={`text-8xl sm:text-9xl font-serif text-teal-400/15 select-none pointer-events-none absolute -top-12 -left-4 leading-none transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  visionInView ? 'scale-100 opacity-100' : 'scale-85 opacity-0'
                }`}
              >
                “
              </span>

              <div className="relative z-10 space-y-5">
                <div className="bca-mask">
                  <span className="bca-reveal text-xs font-bold uppercase tracking-[0.25em] text-teal-400 block" style={{ transitionDelay: '100ms' }}>
                    {t('about_vision_heading') || 'VISI PERUSAHAAN'}
                  </span>
                </div>
                
                <div className="bca-mask">
                  <blockquote className="bca-reveal text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white leading-[1.25] tracking-tight" style={{ transitionDelay: '160ms' }}>
                    "Menjadi penyedia <span className="text-teal-400">solusi kimia industri dan water treatment</span> pilihan utama di Indonesia — dikenal atas <span className="text-teal-400">integritas, inovasi produk, dan layanan teknis</span> tanpa kompromi, sekaligus mendorong <span className="text-teal-400">efisiensi energi dan kelestarian mesin</span> industri demi mendukung pertumbuhan ekonomi nasional."
                  </blockquote>
                </div>
              </div>
            </div>

            {/* Right 5 cols: Secondary Editorial — Misi Kami (Interactive Numbered List with Stagger) */}
            <div className="lg:col-span-5 space-y-6 pt-2 lg:pt-0 lg:border-l lg:border-white/10 lg:pl-10">
              <div className="bca-mask">
                <span className="bca-reveal text-xs font-bold uppercase tracking-[0.25em] text-teal-400 block" style={{ transitionDelay: '120ms' }}>
                  {t('about_mission_heading') || 'MISI KAMI'}
                </span>
              </div>

              <div className="space-y-6 divide-y divide-white/15">
                
                {/* Mission 01 */}
                <div
                  onMouseEnter={() => setActiveMission(0)}
                  onMouseLeave={() => setActiveMission(null)}
                  className={`pt-2 space-y-2 transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] cursor-default group ${
                    activeMission !== null && activeMission !== 0 ? 'opacity-45' : 'opacity-100'
                  }`}
                >
                  <div className="bca-mask">
                    <span className="bca-reveal font-serif font-bold text-3xl sm:text-4xl text-teal-400 group-hover:text-teal-300 transition-colors block leading-none" style={{ transitionDelay: '180ms' }}>
                      01
                    </span>
                  </div>
                  <div className="bca-mask">
                    <p className="bca-reveal text-sm sm:text-base text-slate-300 group-hover:text-white transition-all duration-300 font-light leading-relaxed group-hover:translate-x-1.5" style={{ transitionDelay: '220ms' }}>
                      {t('about_mission_item1')}
                    </p>
                  </div>
                </div>

                {/* Mission 02 */}
                <div
                  onMouseEnter={() => setActiveMission(1)}
                  onMouseLeave={() => setActiveMission(null)}
                  className={`pt-6 space-y-2 transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] cursor-default group ${
                    activeMission !== null && activeMission !== 1 ? 'opacity-45' : 'opacity-100'
                  }`}
                >
                  <div className="bca-mask">
                    <span className="bca-reveal font-serif font-bold text-3xl sm:text-4xl text-teal-400 group-hover:text-teal-300 transition-colors block leading-none" style={{ transitionDelay: '260ms' }}>
                      02
                    </span>
                  </div>
                  <div className="bca-mask">
                    <p className="bca-reveal text-sm sm:text-base text-slate-300 group-hover:text-white transition-all duration-300 font-light leading-relaxed group-hover:translate-x-1.5" style={{ transitionDelay: '300ms' }}>
                      {t('about_mission_item2')}
                    </p>
                  </div>
                </div>

                {/* Mission 03 */}
                <div
                  onMouseEnter={() => setActiveMission(2)}
                  onMouseLeave={() => setActiveMission(null)}
                  className={`pt-6 space-y-2 transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] cursor-default group ${
                    activeMission !== null && activeMission !== 2 ? 'opacity-45' : 'opacity-100'
                  }`}
                >
                  <div className="bca-mask">
                    <span className="bca-reveal font-serif font-bold text-3xl sm:text-4xl text-teal-400 group-hover:text-teal-300 transition-colors block leading-none" style={{ transitionDelay: '340ms' }}>
                      03
                    </span>
                  </div>
                  <div className="bca-mask">
                    <p className="bca-reveal text-sm sm:text-base text-slate-300 group-hover:text-white transition-all duration-300 font-light leading-relaxed group-hover:translate-x-1.5" style={{ transitionDelay: '380ms' }}>
                      {t('about_mission_item3')}
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ============================================================
          04 — OUR JOURNEY (Static White Section Background + BCA Text Reveal)
          ============================================================ */}
      <section
        ref={journeyRef}
        className={`py-24 lg:py-32 bg-white border-y border-slate-200 ${
          journeyInView ? 'bca-active' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          <div className="max-w-3xl mb-16 space-y-3">
            <div className="bca-mask">
              <span className="bca-reveal text-xs font-semibold uppercase tracking-[0.25em] text-teal-700 block">
                {t('about_journey_badge') || 'PERJALANAN KAMI'}
              </span>
            </div>
            
            <div className="bca-mask">
              <h2 className="bca-reveal text-3xl sm:text-4xl font-bold font-serif text-[#071A2B] leading-tight" style={{ transitionDelay: '80ms' }}>
                {t('about_journey_title') || 'Tonggak Perkembangan & Dedikasi Industri'}
              </h2>
            </div>
          </div>

          {/* Minimalist Connected Timeline with Progressive Track */}
          <div className="relative">
            {/* Desktop horizontal connecting line with progress animation */}
            <div className="hidden lg:block absolute top-6 left-0 right-0 h-[2px] bg-slate-100 overflow-hidden" aria-hidden="true">
              <div
                className={`h-full bg-gradient-to-r from-teal-700 via-teal-500 to-teal-400 transition-all duration-1000 ease-out ${
                  journeyInView ? 'w-full' : 'w-0'
                }`}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 relative z-10">
              {journeyMilestones.map((item, idx) => (
                <div
                  key={idx}
                  className="space-y-4 pt-1 sm:pt-0"
                >
                  {/* Milestone Node */}
                  <div className="flex items-center gap-3">
                    <div className="bca-mask">
                      <span className="bca-reveal font-serif font-bold text-3xl sm:text-4xl text-teal-700 block leading-none bg-white pr-3 transition-transform duration-300 hover:scale-105" style={{ transitionDelay: `${120 + idx * 80}ms` }}>
                        {item.num}
                      </span>
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400 lg:hidden">
                      {item.stage}
                    </span>
                  </div>

                  <div className="space-y-2 pt-1 border-t lg:border-t-0 border-slate-200">
                    <div className="bca-mask">
                      <span className="bca-reveal hidden lg:block text-xs font-bold uppercase tracking-widest text-teal-700" style={{ transitionDelay: `${160 + idx * 80}ms` }}>
                        {item.stage}
                      </span>
                    </div>
                    <div className="bca-mask">
                      <h3 className="bca-reveal text-base sm:text-lg font-bold font-serif text-[#071A2B] leading-snug" style={{ transitionDelay: `${200 + idx * 80}ms` }}>
                        {item.title}
                      </h3>
                    </div>
                    <div className="bca-mask">
                      <p className="bca-reveal text-xs sm:text-sm text-slate-700 font-light leading-relaxed" style={{ transitionDelay: `${240 + idx * 80}ms` }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>


      {/* ============================================================
          05 — BIG BRAND STATEMENT (Static Deep Navy Section + BCA Text Reveal)
          ============================================================ */}
      <section
        ref={statementRef}
        className={`py-24 lg:py-32 bg-[#071A2B] text-white relative overflow-hidden border-y border-[#0D243A] ${
          statementInView ? 'bca-active' : ''
        }`}
      >
        {/* Subtle geometric industrial accent line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-teal-400 to-transparent" />

        <div className="max-w-5xl mx-auto px-6 sm:px-8 text-center space-y-8 relative z-10">
          <div className="bca-mask">
            <span className="bca-reveal text-xs font-semibold uppercase tracking-[0.3em] text-teal-400 block">
              {t('about_statement_badge') || 'FILOSOFI LAYANAN KAMI'}
            </span>
          </div>

          <div className="bca-mask">
            <blockquote className="bca-reveal text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-[1.2] text-white tracking-tight" style={{ transitionDelay: '100ms' }}>
              "Kami tidak hanya memasok <span className="text-teal-400">produk kimia</span>. Kami membantu menjaga <span className="text-teal-400">performa sistem industri</span> Anda."
            </blockquote>
          </div>

          <div className="bca-mask">
            <p className="bca-reveal text-sm sm:text-base md:text-lg text-slate-300 font-light max-w-3xl mx-auto leading-relaxed" style={{ transitionDelay: '180ms' }}>
              {t('about_statement_sub') || 'Komitmen kami adalah keandalan jangka panjang mesin pabrik Anda, efisiensi energi operasional, dan perlindungan total terhadap investasi sistem utilitas.'}
            </p>
          </div>
        </div>
      </section>


      {/* ============================================================
          06 — WHAT WE DO (Static White Section Background + Interactive Text Rows)
          ============================================================ */}
      <section
        ref={whatRef}
        className={`py-24 lg:py-32 max-w-5xl mx-auto px-6 lg:px-12 bg-white ${
          whatInView ? 'bca-active' : ''
        }`}
      >
        <div className="space-y-8">
          <div className="space-y-3">
            <div className="bca-mask">
              <span className="bca-reveal text-xs font-semibold uppercase tracking-[0.25em] text-teal-700 block">
                {t('about_what_badge') || 'SOLUSI & KAPABILITAS'}
              </span>
            </div>
            <div className="bca-mask">
              <h2 className="bca-reveal text-3xl sm:text-4xl font-bold font-serif text-[#071A2B] leading-tight" style={{ transitionDelay: '80ms' }}>
                {t('about_what_title') || 'Solusi Komprehensif untuk Sistem Industri yang Lebih Efisien & Terlindungi'}
              </h2>
            </div>
          </div>

          {/* Editorial Rows with Hover / Tap Interactivity */}
          <div className="divide-y divide-slate-200 border-y border-slate-200">
            {capabilityList.map((cap, idx) => {
              const isHovered = activeCapability === idx;
              const hasHover = activeCapability !== null;
              return (
                <div
                  key={idx}
                  onMouseEnter={() => setActiveCapability(idx)}
                  onMouseLeave={() => setActiveCapability(null)}
                  onClick={() => setActiveCapability(activeCapability === idx ? null : idx)}
                  className={`py-5 sm:py-6 flex items-start gap-5 sm:gap-7 transition-all duration-300 cursor-pointer ${
                    hasHover && !isHovered ? 'opacity-45' : 'opacity-100'
                  } ${isHovered ? 'pl-2 sm:pl-3' : ''}`}
                >
                  <div className="bca-mask shrink-0">
                    <span
                      className={`bca-reveal font-serif font-bold text-2xl sm:text-3xl transition-colors ${
                        isHovered ? 'text-teal-600' : 'text-slate-400'
                      }`}
                      style={{ transitionDelay: `${100 + idx * 50}ms` }}
                    >
                      {cap.num}
                    </span>
                  </div>

                  <div className="space-y-1.5 w-full">
                    <div className="flex items-center justify-between">
                      <div className="bca-mask">
                        <h3
                          className={`bca-reveal text-base sm:text-xl font-bold font-serif transition-all duration-300 ${
                            isHovered ? 'text-teal-800 translate-x-1' : 'text-[#071A2B]'
                          }`}
                          style={{ transitionDelay: `${120 + idx * 50}ms` }}
                        >
                          {cap.title}
                        </h3>
                      </div>
                      <ArrowRight
                        className={`w-4 h-4 text-teal-600 transition-all duration-300 ${
                          isHovered ? 'translate-x-1.5 opacity-100' : 'opacity-0'
                        }`}
                      />
                    </div>
                    <div className="bca-mask">
                      <p className="bca-reveal text-xs sm:text-sm text-slate-700 font-light leading-relaxed" style={{ transitionDelay: `${150 + idx * 50}ms` }}>
                        {cap.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2">
            <button
              onClick={handleProductsClick}
              className="inline-flex items-center gap-2.5 text-sm font-bold text-teal-700 hover:text-[#071A2B] transition-colors group cursor-pointer"
            >
              <span>{t('about_what_cta') || 'Jelajahi Katalog Produk Lengkap'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </button>
          </div>
        </div>
      </section>


      {/* ============================================================
          07 — INDUSTRIES WE SERVE (Static Deep Navy Background + BCA Grid Reveal)
          ============================================================ */}
      <section
        ref={industriesRef}
        className={`py-24 lg:py-32 bg-[#071A2B] text-white relative overflow-hidden ${
          industriesInView ? 'bca-active' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          <div className="max-w-3xl mb-16 space-y-3">
            <div className="bca-mask">
              <span className="bca-reveal text-xs font-semibold uppercase tracking-[0.25em] text-teal-400 block">
                {t('about_ind_badge') || 'CAKUPAN SEKTOR'}
              </span>
            </div>
            <div className="bca-mask">
              <h2 className="bca-reveal text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-white leading-tight" style={{ transitionDelay: '80ms' }}>
                {t('about_ind_title') || 'Dipercaya di Berbagai Sektor Industri Strategis'}
              </h2>
            </div>
            <div className="bca-mask">
              <p className="bca-reveal text-sm sm:text-base text-slate-300 font-light leading-relaxed" style={{ transitionDelay: '140ms' }}>
                {t('about_ind_desc') || 'Formulasi kimia dan metodologi teknis kami telah terbukti di berbagai lingkungan pabrik.'}
              </p>
            </div>
          </div>

          {/* Large Typography Editorial Grid: No Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12 border-t border-[#0D243A] pt-12">
            {industrySectors.map((ind, idx) => {
              const isHovered = activeIndustry === idx;
              const hasHover = activeIndustry !== null;
              return (
                <div
                  key={idx}
                  onMouseEnter={() => setActiveIndustry(idx)}
                  onMouseLeave={() => setActiveIndustry(null)}
                  className={`space-y-2.5 pb-6 border-b border-white/15 transition-all duration-300 cursor-default ${
                    hasHover && !isHovered ? 'opacity-45' : 'opacity-100'
                  }`}
                >
                  <div className="bca-mask">
                    <span className="bca-reveal font-serif font-bold text-3xl text-teal-400 block leading-none transition-transform duration-300 hover:scale-105" style={{ transitionDelay: `${120 + idx * 60}ms` }}>
                      {ind.num}
                    </span>
                  </div>
                  <div className="bca-mask">
                    <h3 className="bca-reveal text-lg sm:text-xl font-serif font-bold text-white leading-snug" style={{ transitionDelay: `${160 + idx * 60}ms` }}>
                      {ind.name}
                    </h3>
                  </div>
                  <div className="bca-mask">
                    <p className="bca-reveal text-xs sm:text-sm text-slate-300 font-light leading-relaxed" style={{ transitionDelay: `${200 + idx * 60}ms` }}>
                      {ind.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* ============================================================
          08 — OUR VALUES (Static White Background + BCA Editorial List Reveal)
          ============================================================ */}
      <section
        ref={valuesRef}
        className={`py-24 lg:py-32 bg-white border-y border-slate-200 ${
          valuesInView ? 'bca-active' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-12">
          
          <div className="max-w-2xl space-y-2">
            <div className="bca-mask">
              <span className="bca-reveal text-xs font-semibold uppercase tracking-[0.25em] text-teal-700 block">
                {t('about_why_badge') || 'NILAI-NILAI UTAMA'}
              </span>
            </div>
            <div className="bca-mask">
              <h2 className="bca-reveal text-2xl sm:text-3xl md:text-4xl font-bold font-serif text-[#071A2B]" style={{ transitionDelay: '80ms' }}>
                {t('about_why_title') || 'Prinsip Kerja & Integritas Kami'}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((val, idx) => {
              const isHovered = activeValue === idx;
              const hasHover = activeValue !== null;
              return (
                <div
                  key={idx}
                  onMouseEnter={() => setActiveValue(idx)}
                  onMouseLeave={() => setActiveValue(null)}
                  onClick={() => setActiveValue(activeValue === idx ? null : idx)}
                  className={`space-y-3 pt-4 border-t-2 transition-all duration-300 cursor-pointer ${
                    hasHover && !isHovered ? 'opacity-45' : 'opacity-100'
                  } ${isHovered ? 'border-teal-700' : 'border-slate-200'}`}
                >
                  <div className="bca-mask">
                    <span
                      className={`bca-reveal font-serif font-bold text-2xl transition-all duration-300 block ${
                        isHovered ? 'text-teal-700 scale-105' : 'text-slate-500'
                      }`}
                      style={{ transitionDelay: `${120 + idx * 70}ms` }}
                    >
                      {val.num}
                    </span>
                  </div>
                  <div className="bca-mask">
                    <h3 className={`bca-reveal font-serif font-bold text-base sm:text-lg transition-colors ${
                      isHovered ? 'text-teal-800' : 'text-[#071A2B]'
                    }`} style={{ transitionDelay: `${160 + idx * 70}ms` }}>
                      {val.title}
                    </h3>
                  </div>
                  <div className="bca-mask">
                    <p className="bca-reveal text-xs sm:text-sm text-slate-700 font-light leading-relaxed" style={{ transitionDelay: `${200 + idx * 70}ms` }}>
                      {val.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* ============================================================
          09 — STRATEGIC FINAL CTA (Static Deep Navy Section + BCA Text Reveal)
          ============================================================ */}
      <section
        ref={ctaRef}
        className={`py-24 lg:py-32 bg-[#071A2B] text-white relative overflow-hidden border-t border-[#0D243A] ${
          ctaInView ? 'bca-active' : ''
        }`}
      >
        {/* Subtle geometric industrial accent line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-teal-400 to-transparent" />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 space-y-6">
          <div className="bca-mask">
            <span className="bca-reveal text-xs font-semibold uppercase tracking-[0.25em] text-teal-400 block">
              {t('about_page_badge')}
            </span>
          </div>

          <div className="bca-mask">
            <h2 className="bca-reveal text-3xl sm:text-4xl lg:text-5xl font-bold font-serif leading-[1.2] text-white max-w-3xl mx-auto" style={{ transitionDelay: '80ms' }}>
              {t('about_cta_headline') || 'Menjaga Performa Sistem. Melindungi Investasi Industri Anda.'}
            </h2>
          </div>

          <div className="bca-mask">
            <p className="bca-reveal text-sm sm:text-base md:text-lg text-slate-300 font-light max-w-xl mx-auto leading-relaxed" style={{ transitionDelay: '140ms' }}>
              {t('about_cta_desc')}
            </p>
          </div>

          <div className="pt-6 flex flex-wrap justify-center gap-4">
            <button
              onClick={handleContactClick}
              className="inline-flex items-center gap-3 bg-amber-500 hover:bg-amber-400 text-navy-950 font-bold px-8 sm:px-9 py-4 rounded-xl shadow-md transition-all duration-300 transform hover:-translate-y-1 text-sm sm:text-base cursor-pointer group"
            >
              <span>{t('about_cta_btn')}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </button>
            <a
              href="https://wa.me/628129483381?text=Halo%20CV.%20Citra%20Putra%20Mandiri,%20saya%20ingin%20konsultasi%20awal%20dan%20uji%20laboratorium%20air%20baku"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-7 sm:px-8 py-4 rounded-xl transition-all duration-300 cursor-pointer shadow-md text-sm sm:text-base transform hover:-translate-y-1 group"
            >
              <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>{t('about_cta_wa')}</span>
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
