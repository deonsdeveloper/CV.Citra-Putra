import json

bilingual_products = [
  {
    "id": "clenol-mr-220",
    "code": "CLENOL MR 220",
    "name": "Mould Release Agent",
    "category": "specialty",
    "categoryName": "Specialty Chemicals",
    "featured": True,
    "description": {
      "id": "Bahan kimia pelumas khusus (mould release agent) pembentuk lapisan film tipis pelindung agar bahan cetakan (plastik, karet, resin, atau fiberglass) tidak menempel secara permanen pada permukaan cetakan (mould). Mencegah produk lengket atau rusak serta menjaga keawetan cetakan.",
      "en": "Specialized mould release lubricant formulating a micro-thin protective barrier preventing plastic, rubber, resin, or fiberglass from adhering to mold tooling. Prevents part sticking, surface tearing, and prolongs mold tool longevity."
    },
    "packaging": "Pail 20L · Drum 200L · Spray Can 400ml",
    "applications": {
      "id": "Mould Injeksi Plastik, Cetakan Karet/Rubber, Cetakan Resin & Fiberglass, Matras Die Casting",
      "en": "Plastic Injection Moulds, Rubber Tooling, Resin & Fiberglass Molding, Die Casting Matrices"
    },
    "dosage": {
      "id": "Disemprotkan atau dioleskan secara tipis dan merata pada permukaan mould bersih menggunakan spray gun, kain lap, atau kuas sebelum proses cetak. Aplikasi ulang setiap beberapa siklus cetak sesuai kebutuhan.",
      "en": "Apply a thin, uniform coating onto clean mold surfaces using a spray gun, wiping cloth, or brush before molding. Reapply across production cycles as required."
    },
    "physicalProperties": {
      "id": "Cairan/emulsi jernih hingga sedikit keruh | Komposisi: Silicone/wax emulsion | Tahan panas hingga ±200°C tanpa residu berlebih | Kelarutan: Larut dalam air (water-based) atau pelarut (solvent-based)",
      "en": "Clear to slightly hazy emulsion | Composition: Silicone/wax emulsion | Thermal resistance up to ±200°C without excess residue | Solubility: Water-based or solvent-based options"
    },
    "image": "/assets/products/clenol-mr-220.png",
    "msdsAvailable": True,
    "tdsAvailable": True
  },
  {
    "id": "clenol-ct-031",
    "code": "CLENOL CT-031",
    "name": "Corrosion Inhibitor for Closed Cooling System",
    "category": "water-treatment",
    "categoryName": "Cooling & Boiler Treatment",
    "featured": True,
    "description": {
      "id": "Memberikan perawatan untuk pencegahan karat pada sistem pendingin tertutup maupun terbuka. Kandungan nitrit borat memberikan lapisan perlindungan terhadap karat, dilengkapi anti korosi untuk logam kuning dan penyangga pH (pH buffer 8-10,5). Aman untuk lingkungan dan manusia karena tidak mengandung logam berat.",
      "en": "Advanced corrosion inhibitor for closed and open cooling systems. Nitrite-borate formulation establishes a passivating protective film against rust, supplemented with yellow-metal inhibitors and a pH buffer (pH 8.0 - 10.5). Heavy-metal free and environmentally safe."
    },
    "packaging": "Pail 20L · Drum 200L",
    "applications": {
      "id": "Closed Cooling System, Open Cooling System, Chiller Loop, Machine Cooling System, Mould Cooling",
      "en": "Closed Cooling Systems, Open Cooling Loops, Chiller Circulation, Machinery Cooling, Tooling Water Jackets"
    },
    "dosage": {
      "id": "Disesuaikan dengan volume air sirkulasi dan target kontrol konsentrasi nitrit & pH dalam sistem.",
      "en": "Adjusted according to circulation volume and target control parameters for system nitrite concentration and pH balance."
    },
    "physicalProperties": {
      "id": "Penampakan: Jernih | Bau: Pahit | Densitas: 0,8 Kg/cm³ | pH: 8,0 - 10,5 | Bahan Aktif: Nitrit Borat & Dispersan Kuat",
      "en": "Appearance: Clear Liquid | Odor: Characteristic | Density: 0.8 Kg/cm³ | pH: 8.0 - 10.5 | Active Agents: Nitrite-Borate & Strong Dispersants"
    },
    "image": "/assets/products/clenol-ct-031.png",
    "msdsAvailable": True,
    "tdsAvailable": True
  },
  {
    "id": "clenol-ct-032",
    "code": "CLENOL CT-032",
    "name": "Slimicide & Biocide for Anaerobic Bacteria",
    "category": "water-treatment",
    "categoryName": "Cooling & Boiler Treatment",
    "featured": True,
    "description": {
      "id": "Slimicide dan bactericide berkekuatan tinggi dengan aksi cepat untuk membasmi lumut, slime, foulant, dan bakteri anaerob beserta sekresi biologisnya. Berfungsi ganda sebagai biocide dan surfaktan sehingga pemakaian lebih aman dan efisien.",
      "en": "High-potency, fast-acting slimicide and bactericide formulated to eradicate algae, biological slime, foulants, and anaerobic bacterial colonies. Dual-acting biocide-surfactant mechanism provides enhanced penetration and safe efficiency."
    },
    "packaging": "Drum Plastik 120 Kg · Pail 20L",
    "applications": {
      "id": "Machine Cooling System, Mould Cooling, Pendingin Genset, Hot Boiler System, Radiator Mobil & Alat Berat, Jet Ejector, Pabrik Kertas (White Water), Pabrik Gula (Mill Sanitation)",
      "en": "Machinery Cooling Loops, Mold Cooling, Generator Cooling, Hot Boiler Systems, Heavy Equipment Radiators, Jet Ejectors, Paper Mills (White Water), Sugar Mills (Sanitation)"
    },
    "dosage": {
      "id": "Dosis 5 - 100 ppm secara slug dose berdasarkan waktu paruh (half-life). Gunakan APD (masker & sarung tangan). Jika terpercik, bilas air bersih sebanyak-banyaknya.",
      "en": "Slug dose of 5 - 100 ppm based on system half-life. Utilize PPE (mask & gloves). In case of contact, flush immediately with copious clean water."
    },
    "physicalProperties": {
      "id": "Penampakan: Cairan Kekuningan | Berat Jenis: 1,02 - 1,20 | Kelarutan: Sempurna dalam air | Fungsi: Biocide Surfactant",
      "en": "Appearance: Light Yellowish Liquid | Specific Gravity: 1.02 - 1.20 | Solubility: Completely miscible in water | Function: Biocide Surfactant"
    },
    "image": "/assets/products/clenol-ct-032.png",
    "msdsAvailable": True,
    "tdsAvailable": True
  },
  {
    "id": "clenol-bt-330",
    "code": "CLENOL BT 330",
    "name": "Boiler Treatment (Scale & Alkalinity Control)",
    "category": "water-treatment",
    "categoryName": "Cooling & Boiler Treatment",
    "featured": True,
    "description": {
      "id": "Paket multifungsi perawatan boiler tekanan rendah sampai menengah. Sangat efektif mencegah pembentukan kerak hardness maupun silika, mengontrol keasaman serta melindungi dari pengaruh alkalin tinggi. Mengandung Dispersing Agent pemecah endapan dan Deforming Agent pengontrol mutu uap.",
      "en": "Multifunctional treatment package for low-to-medium pressure steam boilers. Highly effective in inhibiting hardness scale and silica deposition, balancing acidity, and conditioning sludge. Formulated with polymer dispersants and antifoam agents for steam purity."
    },
    "packaging": "Drum Plastik 120 Kg · Pail 20L",
    "applications": {
      "id": "Boiler Tekanan Rendah & Menengah, Sistem Uap Pabrik, Steam Boiler Pembangkit, Jalur Air Masuk Boiler",
      "en": "Low & Medium Pressure Boilers, Plant Steam Systems, Power Generation Boilers, Boiler Feedwater Lines"
    },
    "dosage": {
      "id": "6 ppm x ppm Ca Hardness (sebagai CaCO3). Residu Fosfat: 8,5 ppm produk menghasilkan 1 ppm PO4 (rekomendasi residu fosfat: 10 s/d 50 ppm PO4 dalam air boiler). Encerkan 10% - 50% dengan softwater/kondensat menggunakan dosing pump.",
      "en": "6 ppm x ppm Ca Hardness (as CaCO3). Phosphate Residual: 8.5 ppm product yields 1 ppm PO4 (recommended target: 10 to 50 ppm PO4 in boiler water). Dilute 10% - 50% with softened/condensate water via dosing pump."
    },
    "physicalProperties": {
      "id": "Warna: Cairan Jernih | Berat Jenis: 1,1 - 1,15 | Kelarutan: Larut sempurna dalam air",
      "en": "Color: Clear Liquid | Specific Gravity: 1.1 - 1.15 | Solubility: Completely water soluble"
    },
    "image": "/assets/products/clenol-bt-330.png",
    "msdsAvailable": True,
    "tdsAvailable": True
  },
  {
    "id": "clenol-bt-331",
    "code": "CLENOL BT 331",
    "name": "Boiler Treatment (Oxygen Scavenger & Corrosion Inhibitor)",
    "category": "water-treatment",
    "categoryName": "Cooling & Boiler Treatment",
    "featured": True,
    "description": {
      "id": "Paket multifungsi pengontrol korosi akibat oksigen terlarut pada boiler dan pipa saluran. Menggunakan katalis bi-amine aktif dengan reaksi pengikatan cepat (N2H4 + O2 + 2H2O), efektif untuk boiler bertekanan tinggi (hingga 60 Kg/cm²) maupun bertekanan rendah (suhu air buang > 80°C).",
      "en": "Multifunctional dissolved oxygen scavenger and corrosion inhibitor for boiler vessels and steam condensate piping. Employs active catalyzed bi-amine chemistry with rapid scavenging kinetics (N2H4 + O2 + 2H2O), engineered for high-pressure (up to 60 Kg/cm²) and low-pressure systems."
    },
    "packaging": "Drum Plastik 120 Kg · Pail 20L",
    "applications": {
      "id": "Boiler Tekanan Tinggi (s/d 60 Kg/cm²), Boiler Tekanan Rendah (Suhu > 80°C), Tangki Deaerator, Saluran Pemipaan Uap",
      "en": "High-Pressure Boilers (up to 60 Kg/cm²), Low-Pressure Boilers (Temp > 80°C), Deaerator Storage, Steam Distribution Piping"
    },
    "dosage": {
      "id": "Dosis tergantung kadar oksigen terlarut. Target kontrol residu N2H4 antara 0,1 - 0,5 ppm. Dituangkan/diinjeksikan ke dalam tangki deaerator atau pipa air umpan berpompa.",
      "en": "Dosage dependent on dissolved oxygen content. Target residual N2H4 between 0.1 - 0.5 ppm. Dosed into deaerator tank or feedwater suction header."
    },
    "physicalProperties": {
      "id": "Penampakan: Cairan Jernih | Komposisi: Bi-Amine dengan Katalis | Reaksi Kimia: N2H4 + O2 + 2H2O | Kelarutan: Sempurna dalam air",
      "en": "Appearance: Clear Liquid | Composition: Catalyzed Bi-Amine | Reaction: N2H4 + O2 + 2H2O | Solubility: Completely water soluble"
    },
    "image": "/assets/products/clenol-bt-331.png",
    "msdsAvailable": True,
    "tdsAvailable": True
  },
  {
    "id": "r-1011",
    "code": "R 1011",
    "name": "Coil Cleaner",
    "category": "cleaning",
    "categoryName": "Cleaning & Degreasing",
    "description": {
      "id": "Pembersih sirip coil efektif untuk chiller, AHU, AC fins, dan elemen aluminium. Berbahan non-korosif, dapat dicampur air, tersedia dalam varian asam dan basa.",
      "en": "Effective coil fin cleaner for chillers, AHUs, industrial HVAC fins, and aluminum heat exchangers. Non-corrosive, water-dilutable formulation available in balanced acid and alkaline variants."
    },
    "packaging": "Pail 20L · Drum 200L",
    "applications": {
      "id": "Chiller HVAC, AC Industri, Radiator Aluminium, Air Handling Unit (AHU)",
      "en": "HVAC Chillers, Industrial AC Systems, Aluminum Radiators, Air Handling Units (AHU)"
    },
    "dosage": {
      "id": "Campurkan dengan air bersih rasio 1:3 hingga 1:7 sesuai tingkat kerak.",
      "en": "Dilute with clean water at 1:3 to 1:7 ratio depending on scale and grime severity."
    },
    "msdsAvailable": True,
    "tdsAvailable": True
  },
  {
    "id": "r-1103",
    "code": "R 1103",
    "name": "Super Degriser Cleaner",
    "category": "cleaning",
    "categoryName": "Cleaning & Degreasing",
    "featured": False,
    "description": {
      "id": "Pelarut tugas berat untuk membersihkan noda minyak membandel, oli, dan penumpukan oli/grease pada permukaan logam, mesin pabrik, dan alat perkakas.",
      "en": "Heavy-duty industrial solvent degreaser designed to dissolve stubborn grease, carbonized oil, and heavy residues on metal surfaces, machinery, and workshop tooling."
    },
    "packaging": "Pail 20L · Drum 200L",
    "applications": {
      "id": "Blok Mesin, Rantai Industri, Lantai Pabrik Terkontaminasi Oli, Alat Logam",
      "en": "Engine Blocks, Industrial Drive Chains, Oil-Stained Plant Floors, Heavy Metal Tools"
    },
    "dosage": {
      "id": "Gunakan langsung atau encerkan 1:2 untuk pembersihan rutin.",
      "en": "Apply directly for heavy grease or dilute 1:2 with solvent/water for routine maintenance."
    },
    "msdsAvailable": True,
    "tdsAvailable": True
  },
  {
    "id": "r-1105",
    "code": "R 1105",
    "name": "Multi Purpose Cleaner",
    "category": "cleaning",
    "categoryName": "Cleaning & Degreasing",
    "featured": False,
    "description": {
      "id": "Pembersih serbaguna yang sangat fleksibel untuk membersihkan minyak dan kotoran pada blok mesin, peralatan industri, dan area kerja workshop.",
      "en": "Versatile industrial multi-purpose cleaner for removing surface oil, grime, and grease deposits across machinery, plant walls, and workshop workstations."
    },
    "packaging": "Pail 20L · Drum 200L",
    "applications": {
      "id": "Peralatan Workshop, Dinding Pabrik, Mesin Produksi, Permukaan Terbuka",
      "en": "Workshop Equipment, Factory Walls, Production Machinery, General Facility Surfaces"
    },
    "dosage": {
      "id": "Pembersihan berat 1:2, pembersihan ringan hingga 1:10.",
      "en": "Heavy-duty cleaning at 1:2 dilution; general surface cleaning up to 1:10 dilution."
    },
    "msdsAvailable": True,
    "tdsAvailable": True
  },
  {
    "id": "r-1106",
    "code": "R 1106",
    "name": "Metal Protector",
    "category": "rust",
    "categoryName": "Rust Treatment & Protection",
    "featured": False,
    "description": {
      "id": "Cairan pencegah korosi berbasis oli pelindung untuk seluruh jenis logam dan spare part. Melindungi dies, cetakan moulding, dan komponen presisi.",
      "en": "Protective oil-barrier corrosion inhibitor formulated for all ferrous and non-ferrous alloys. Shields injection dies, molds, and precision machined components from atmospheric moisture."
    },
    "packaging": "Spray Can 400ml · Pail 20L",
    "applications": {
      "id": "Cetakan Moulding, Suku Cadang Simpanan, Poros Presisi, Alat Potong",
      "en": "Moulding Tooling, Stored Spare Parts, Precision Shafts, Machining Cutters"
    },
    "dosage": {
      "id": "Semprotkan atau kuaskan secara merata membentuk lapisan film mikron.",
      "en": "Spray or brush evenly to deposit a continuous micron-thin protective oil barrier."
    },
    "msdsAvailable": True,
    "tdsAvailable": True
  },
  {
    "id": "r-1107",
    "code": "R 1107",
    "name": "Mould Cleaner",
    "category": "specialty",
    "categoryName": "Specialty Chemicals",
    "featured": False,
    "description": {
      "id": "Pembersih khusus sisa karbon, minyak, oli, dan kerak sisa pembakaran pada permukaan moulding injeksi plastik dan logam.",
      "en": "Specialized cleaner for dissolving baked-on carbon residues, release agent buildup, and grease from plastic and metal injection mold cavities."
    },
    "packaging": "Spray Can 400ml · Pail 20L",
    "applications": {
      "id": "Mould Injeksi Plastik, Matras Die Casting, Alat Cetak Industri",
      "en": "Plastic Injection Tooling, Die Casting Dies, Industrial Moulding Equipment"
    },
    "dosage": {
      "id": "Semprotkan pada permukaan moulding saat kondisi dingin/hangat.",
      "en": "Spray directly onto mold cavity surfaces when cold or warm, allow to penetrate, then wipe clean."
    },
    "msdsAvailable": True,
    "tdsAvailable": True
  },
  {
    "id": "r-1109",
    "code": "R 1109",
    "name": "Rust Remover",
    "category": "rust",
    "categoryName": "Rust Treatment & Protection",
    "featured": False,
    "description": {
      "id": "Formulasi asam lembut yang cepat melarutkan karat pada besi dan suku cadang tanpa merusak substrat logam induk.",
      "en": "Mild acidic formulation designed to rapidly dissolve surface rust and iron oxides on metal structures and spare parts without attacking base substrate metal."
    },
    "packaging": "Pail 20L · Drum 200L",
    "applications": {
      "id": "Pipa Besi Karatan, Bejana Tekan, Tangki Logam, Komponen Mesin",
      "en": "Rusted Steel Pipes, Pressure Vessels, Storage Tanks, Machined Hardware"
    },
    "dosage": {
      "id": "Metode rendam atau oles, waktu reaksi 15-30 menit.",
      "en": "Dip bath or brush application; allow 15-30 minutes contact time then rinse with water."
    },
    "msdsAvailable": True,
    "tdsAvailable": True
  },
  {
    "id": "r-1521",
    "code": "R 1521",
    "name": "Rust Converter",
    "category": "rust",
    "categoryName": "Rust Treatment & Protection",
    "featured": False,
    "description": {
      "id": "Cairan konverter karat mutakhir yang mengubah lapisan karat aktif menjadi senyawa besi fosfat yang stabil dan siap dicat.",
      "en": "Advanced chemical rust converter that transforms active iron oxides into an inert, stable iron phosphate passivation barrier ready for direct priming and painting."
    },
    "packaging": "Pail 20L · Drum 200L",
    "applications": {
      "id": "Struktur Baja Pembatas, Tangki Penampung, Rangka Pabrik",
      "en": "Steel Frameworks, Storage Tanks, Factory Structures, Outdoor Metalwork"
    },
    "dosage": {
      "id": "Aplikasikan dengan kuas atau sprayer langsung di atas permukaan karat halus.",
      "en": "Apply directly via brush or spray over wire-brushed light rust surfaces; allow full curing."
    },
    "msdsAvailable": True,
    "tdsAvailable": True
  },
  {
    "id": "r-1522",
    "code": "R 1522",
    "name": "Electric Motor Cleaner",
    "category": "cleaning",
    "categoryName": "Cleaning & Degreasing",
    "featured": False,
    "description": {
      "id": "Solven pembersih non-konduktif khusus untuk melarutkan minyak, debu karbon, dan kotoran dari kumparan dinamo dan motor listrik tanpa merusak vernis.",
      "en": "High-dielectric, non-conductive precision cleaning solvent formulated to flush oil, carbon dust, and grime from electric motor windings without damaging insulating varnish."
    },
    "packaging": "Spray Can 400ml · Pail 20L · Drum 200L",
    "applications": {
      "id": "Stator Dinamo, Motor Listrik Industri, Panel Kontrol Off-Power",
      "en": "Dynamo Stators, Industrial Electric Motors, De-energized Switchboards & Panels"
    },
    "dosage": {
      "id": "Gunakan secara langsung tanpa dicampur air (dapat menguap cepat).",
      "en": "Use undiluted directly from spray can or wash gun; evaporates completely with zero residue."
    },
    "msdsAvailable": True,
    "tdsAvailable": True
  },
  {
    "id": "r-1523",
    "code": "R 1523",
    "name": "Handsoap Cleaner",
    "category": "cleaning",
    "categoryName": "Cleaning & Degreasing",
    "featured": False,
    "description": {
      "id": "Sabun cuci tangan pembersih minyak dan grease tingkat industri. Sangat efektif menghilangkan jelaga dan oli namun tetap lembut di kulit.",
      "en": "Industrial-grade hand cleaner formulated to remove heavy oil, soot, and grease while incorporating skin conditioning emollients to prevent dryness."
    },
    "packaging": "Galon 5L · Pail 20L",
    "applications": {
      "id": "Wastafel Workshop, Toilet Pabrik, Ruang Teknisi",
      "en": "Workshop Wash Stations, Plant Restrooms, Maintenance Rooms"
    },
    "dosage": {
      "id": "Tuang secukupnya pada tangan basah lalu bilas hingga bersih.",
      "en": "Dispense onto wet hands, rub thoroughly into lather, and rinse clean with water."
    },
    "msdsAvailable": True,
    "tdsAvailable": True
  },
  {
    "id": "r-1524",
    "code": "R 1524",
    "name": "Red Insulating Varnish",
    "category": "electrical",
    "categoryName": "Electrical & Insulation",
    "featured": False,
    "description": {
      "id": "Lapisan isolasi warna merah kering cepat untuk kawat email, gulungan dinamo motor, dan transformator. Tahan kelembaban dan perubahan asam/basa hingga 3000 Volt/mil.",
      "en": "Quick-drying red electrical insulating varnish for magnet wire, motor armatures, and transformers. Resists moisture, mild acids, and alkalis with dielectric strength up to 3000 V/mil."
    },
    "packaging": "Can 1L · Spray Can 400ml",
    "applications": {
      "id": "Rewinding Motor Listrik, Trafo, Kumparan Stator, Generator",
      "en": "Electric Motor Rewinding, Power Transformers, Stator Windings, Generators"
    },
    "dosage": {
      "id": "Semprotkan 2-3 lapis tipis dengan jeda pengeringan 10 menit.",
      "en": "Spray 2-3 uniform coats with 10-minute flash-off intervals between coats."
    },
    "msdsAvailable": True,
    "tdsAvailable": True
  },
  {
    "id": "r-1525",
    "code": "R 1525",
    "name": "Clear Insulating Varnish",
    "category": "electrical",
    "categoryName": "Electrical & Insulation",
    "featured": False,
    "description": {
      "id": "Lapisan pelindung isolator transparan kering cepat untuk mencegah hubungan arus pendek akibat kelembaban dan udara korosif pada komponen elektro.",
      "en": "Fast-drying clear conformal insulating coating engineered to protect PCBs and sensitive electrical components from moisture, fungal growth, and corrosive atmospheres."
    },
    "packaging": "Can 1L · Spray Can 400ml",
    "applications": {
      "id": "PCB Board, Komponen Elektronik Industri, Stator Transparan",
      "en": "Printed Circuit Boards (PCBs), Industrial Electronics, Clear Stator Assemblies"
    },
    "dosage": {
      "id": "Semprotkan merata pada permukaan yang bersih dan kering.",
      "en": "Apply evenly onto thoroughly cleaned, de-energized, and dry surfaces."
    },
    "msdsAvailable": True,
    "tdsAvailable": True
  },
  {
    "id": "r-1527",
    "code": "R 1527",
    "name": "Bowl Cleaner",
    "category": "cleaning",
    "categoryName": "Cleaning & Degreasing",
    "featured": False,
    "description": {
      "id": "Pembersih noda membandel, lumut, dan endapan air pada keramik, mosaik, toilet industri, dan permukaan sanitasi pabrik.",
      "en": "Potent acid-based industrial sanitizing cleaner formulated to dissolve mineral scaling, rust stains, and algae from ceramic tiles, porcelain, and plant restrooms."
    },
    "packaging": "Galon 5L · Pail 20L",
    "applications": {
      "id": "Kamar Mandi Pabrik, Area Sanitasi, Keramik Industri",
      "en": "Factory Restrooms, Sanitization Zones, Industrial Ceramic Surfaces"
    },
    "dosage": {
      "id": "Gunakan langsung atau encerkan 1:1 untuk kerak sedang.",
      "en": "Use concentrated for heavy calcification or dilute 1:1 for routine sanitary cleaning."
    },
    "msdsAvailable": True,
    "tdsAvailable": True
  },
  {
    "id": "r-1528",
    "code": "R 1528",
    "name": "Cutting and Tapping Oil",
    "category": "specialty",
    "categoryName": "Specialty Chemicals",
    "featured": False,
    "description": {
      "id": "Cairan pendingin dan pelumas proses pemotongan, pengetapan, boring, dan bubut logam. Memperpanjang umur mata pisau dan meningkatkan presisi.",
      "en": "High-lubricity cutting and tapping fluid formulated for metal machining, threading, drilling, and CNC lathing. Extends tool life and improves surface finish accuracy."
    },
    "packaging": "Pail 20L · Drum 200L",
    "applications": {
      "id": "Mesin Bubut CNC, Tapping Logam, Drilling, Milling Heavy Duty",
      "en": "CNC Machining Centers, Metal Tapping & Threading, Heavy-Duty Drilling & Milling"
    },
    "dosage": {
      "id": "Campurkan dengan air (emulsi) atau gunakan murni sesuai kebutuhan mesin.",
      "en": "Use neat or mix into water emulsion according to specific machine tooling requirements."
    },
    "msdsAvailable": True,
    "tdsAvailable": True
  },
  {
    "id": "r-1529",
    "code": "R 1529",
    "name": "Fuel Oil Treatment",
    "category": "specialty",
    "categoryName": "Specialty Chemicals",
    "featured": False,
    "description": {
      "id": "Aditif bahan bakar solar dan minyak residu. Memecah endapan gumpalan lumpur, berfungsi sebagai dispersan dan inhibitor karat pada sistem pembakaran boiler & genset.",
      "en": "Multifunctional diesel and heavy fuel oil conditioner. Disperses sludge polymers, inhibits fuel tank corrosion, and optimizes combustion atomization in boilers & gensets."
    },
    "packaging": "Pail 20L · Drum 200L",
    "applications": {
      "id": "Tangki Solar Genset, Burner Boiler Industri, Mesin Diesel Kapal",
      "en": "Generator Diesel Tanks, Industrial Boiler Burners, Marine Diesel Engines"
    },
    "dosage": {
      "id": "Dosis 1 liter R 1529 per 2.000 - 4.000 liter bahan bakar.",
      "en": "Standard dosage: 1 liter of R 1529 per 2,000 - 4,000 liters of fuel oil."
    },
    "msdsAvailable": True,
    "tdsAvailable": True
  },
  {
    "id": "r-1710",
    "code": "R 1710",
    "name": "Alga Inhibitor",
    "category": "water-treatment",
    "categoryName": "Cooling & Boiler Treatment",
    "featured": False,
    "description": {
      "id": "Bahan kimia biosida khusus untuk mencegah dan memberantas pertumbuhan lumut, ganggang, mikroba, dan bakteri pada sirkulasi cooling tower.",
      "en": "Broad-spectrum biocide formulated to control and eliminate algae, green slimes, fungi, and bacterial biofouling in open-loop industrial cooling towers."
    },
    "packaging": "Pail 20L · Drum 200L",
    "applications": {
      "id": "Cooling Tower Terbuka, Chiller Water Loop, Kolam Sirkulasi Industri",
      "en": "Open Cooling Towers, Chiller Water Circuits, Industrial Circulation Reservoirs"
    },
    "dosage": {
      "id": "Dosis awal 100-200 ppm, maintenance 50 ppm secara berkala.",
      "en": "Initial shock dose: 100-200 ppm; maintain continuous/periodic dose of 50 ppm."
    },
    "msdsAvailable": True,
    "tdsAvailable": True
  },
  {
    "id": "r-1711",
    "code": "R 1711",
    "name": "Cooling & Boiling Treatment",
    "category": "water-treatment",
    "categoryName": "Cooling & Boiler Treatment",
    "featured": False,
    "description": {
      "id": "Formulasi lengkap dengan film inhibitor korosi dan antikerak untuk menjaga efisiensi perpindahan panas pada boiler uap dan sistem pendingin.",
      "en": "Comprehensive dual-action treatment containing organic film inhibitors and anti-scalants to maximize heat transfer efficiency in steam boilers and cooling circuits."
    },
    "packaging": "Pail 20L · Drum 200L",
    "applications": {
      "id": "Steam Boiler Industri, Cooling Tower, Condenser Chiller",
      "en": "Industrial Steam Boilers, Cooling Towers, Chiller Shell Condensers"
    },
    "dosage": {
      "id": "Disesuaikan dengan analisis air feed (TDS, Hardness, Silica).",
      "en": "Dosed according to feedwater laboratory analysis (TDS, Total Hardness, Silica)."
    },
    "msdsAvailable": True,
    "tdsAvailable": True
  },
  {
    "id": "r-1712",
    "code": "R 1712",
    "name": "Cooling Treatment",
    "category": "water-treatment",
    "categoryName": "Cooling & Boiler Treatment",
    "featured": False,
    "description": {
      "id": "Formula khusus pencegah kerak kalsium/magnesium dan pembentukan lumut pada air pendingin sirkulasi chiller dan cooling tower.",
      "en": "Formulated anti-scalant and corrosion inhibitor specifically designed for recirculating water loops in industrial chillers and open evaporative cooling towers."
    },
    "packaging": "Pail 20L · Drum 200L",
    "applications": {
      "id": "Cooling Tower Sirkulasi Tertutup/Terbuka, Heat Exchanger",
      "en": "Closed & Open Evaporative Cooling Towers, Shell & Tube Heat Exchangers"
    },
    "dosage": {
      "id": "Dosis terukur sesuai laju blowdown cooling tower.",
      "en": "Metered dosing calibrated against cooling tower evaporation and blowdown rates."
    },
    "msdsAvailable": True,
    "tdsAvailable": True
  },
  {
    "id": "r-1713",
    "code": "R 1713",
    "name": "Scale Remover Powder",
    "category": "water-treatment",
    "categoryName": "Cooling & Boiler Treatment",
    "featured": False,
    "description": {
      "id": "Formulasi bubuk konsentrat untuk melarutkan kerak air keras kalsium karbonat, magnesium, atau kerak air laut pada bejana boiler dan pemipaan.",
      "en": "Concentrated dry powder descaler engineered to dissolve stubborn calcium carbonate, magnesium, and seawater mineral scales in boiler shells and heat exchangers."
    },
    "packaging": "Zzak 25kg · Pail 20kg",
    "applications": {
      "id": "Pipa Boiler, Condenser, Shell & Tube Heat Exchanger",
      "en": "Boiler Tubes, Shell & Tube Condensers, Plate Heat Exchangers"
    },
    "dosage": {
      "id": "Larutkan 5-10% bobot air sirkulasi pembersihan.",
      "en": "Dissolve at 5-10% w/v into circulation cleaning water; circulate until scale dissolves."
    },
    "msdsAvailable": True,
    "tdsAvailable": True
  },
  {
    "id": "r-1714",
    "code": "R 1714",
    "name": "Safe Heavy Duty Cleaner",
    "category": "water-treatment",
    "categoryName": "Cooling & Boiler Treatment",
    "featured": False,
    "description": {
      "id": "Cairan descaling khusus berkekuatan tinggi untuk menghancurkan kerak keras dan oksida karat pada radiator, pemipaan sirkulasi, chiller, dan boiler tanpa merusak logam induk.",
      "en": "Inhibited heavy-duty liquid descaler engineered to dissolve heavy calcium deposits, scale, and iron oxides in boilers, chillers, and radiators without attacking parent base metal."
    },
    "packaging": "Pail 20L · Drum 200L",
    "applications": {
      "id": "Descaling Boiler, Flushing Chiller System, Radiator Alat Berat",
      "en": "Steam Boiler Descaling, Chiller Circuit Flushing, Heavy Equipment Cooling Systems"
    },
    "dosage": {
      "id": "Sirkulasi 10-20% larutan selama 4-8 jam.",
      "en": "Circulate a 10-20% aqueous solution for 4-8 hours with continuous monitoring."
    },
    "msdsAvailable": True,
    "tdsAvailable": True
  },
  {
    "id": "r-1716",
    "code": "R 1716",
    "name": "Radiator Coolant",
    "category": "water-treatment",
    "categoryName": "Cooling & Boiler Treatment",
    "featured": False,
    "description": {
      "id": "Cairan pendingin radiator berinhibitor tinggi yang mencegah keretakan akibat suhu panas, pembentukan kerak, serta karat pada sirkulasi radiator mesin industri.",
      "en": "Heavy-duty industrial engine coolant formulated with long-life organic corrosion inhibitors, anti-boil protection, and anti-cavitation liners for cooling systems."
    },
    "packaging": "Pail 20L · Drum 200L",
    "applications": {
      "id": "Radiator Genset Industri, Heavy Machinery, Truk Logistik",
      "en": "Industrial Genset Radiators, Heavy Construction Machinery, Fleet Logistics"
    },
    "dosage": {
      "id": "Siap pakai (ready to use) tanpa perlu penambahan air.",
      "en": "Ready to use formulation (pre-diluted); pour directly into clean radiator system."
    },
    "msdsAvailable": True,
    "tdsAvailable": True
  },
  {
    "id": "r-1831",
    "code": "R 1831",
    "name": "Feel of Coating",
    "category": "rust",
    "categoryName": "Rust Treatment & Protection",
    "featured": False,
    "description": {
      "id": "Lapisan film pelindung sementara yang cepat kering untuk melindungi permukaan logam dan spare part dari oksidasi udara & kelembaban tinggi. Mudah dikelupas saat akan dipakai.",
      "en": "Fast-drying peelable temporary protective coating designed to safeguard machined metal components from atmospheric corrosion and scratching. Easily peeled off prior to use."
    },
    "packaging": "Spray Can 400ml · Pail 20L",
    "applications": {
      "id": "Proteksi Simpan Suku Cadang, Komponen Ekspor, Poros Presisi",
      "en": "Spare Parts Storage, Export Machinery Protection, Polished Shafts & Tooling"
    },
    "dosage": {
      "id": "Semprotkan hingga membentuk lapisan tipis merata.",
      "en": "Apply uniform spray coating to build a resilient, peelable continuous film."
    },
    "msdsAvailable": True,
    "tdsAvailable": True
  },
  {
    "id": "r-1833",
    "code": "R 1833",
    "name": "Anti Spatter",
    "category": "specialty",
    "categoryName": "Specialty Chemicals",
    "featured": False,
    "description": {
      "id": "Solusi cairan pelindung percikan las (welding spatter). Mencegah percikan logam panas menempel pada permukaan besi sekitar area pengelasan.",
      "en": "Water-based anti-spatter fluid designed to prevent molten weld spatter from adhering to metal fabrication surfaces, jigs, and welding torch nozzles."
    },
    "packaging": "Spray Can 400ml · Pail 20L",
    "applications": {
      "id": "Bengkel Fabrikasi Baja, Pengelasan Konstruksi, Nozzle Las MIG/MAG",
      "en": "Steel Fabrication Shops, Structural Construction Welding, MIG/MAG Torch Nozzles"
    },
    "dosage": {
      "id": "Semprotkan pada area sekitar sambungan las sebelum proses pengelasan.",
      "en": "Spray light mist onto parent metal surfaces surrounding weld seam prior to welding."
    },
    "msdsAvailable": True,
    "tdsAvailable": True
  },
  {
    "id": "r-1835",
    "code": "R 1835",
    "name": "Spindel Oil",
    "category": "specialty",
    "categoryName": "Specialty Chemicals",
    "featured": False,
    "description": {
      "id": "Cairan pelumas khusus mengandung silikon presisi untuk melumasi dan membersihkan kotoran pada poros spindel mesin tekstil/bubut, mencegah keausan & benang putus.",
      "en": "High-speed spindle lubricant with precision anti-wear additives designed for textile spinning frames, CNC high-speed spindles, and precision bearings."
    },
    "packaging": "Spray Can 400ml · Pail 20L",
    "applications": {
      "id": "Spindel Mesin Tekstil, Bearing Presisi Tinggi, Poros Putar Cepat",
      "en": "Textile Spinning Spindles, High-Speed CNC Bearings, Precision Machine Tooling"
    },
    "dosage": {
      "id": "Semprotkan atau teteskan pada titik pelumasan spindel.",
      "en": "Apply direct mist or drops onto dedicated spindle lubrication access points."
    },
    "msdsAvailable": True,
    "tdsAvailable": True
  }
]

with open('src/data/products.js', 'r', encoding='utf-8') as f:
    orig = f.read()

# Let's extract everything after PRODUCTS = [ ... ];
# We find export const CLIENTS
clients_idx = orig.find("export const CLIENTS")
tail = orig[clients_idx:]

categories_part = """export const CATEGORIES = [
  { id: 'all', name: 'Semua Produk' },
  { id: 'water-treatment', name: 'Cooling & Boiler Treatment' },
  { id: 'cleaning', name: 'Cleaning & Degreasing' },
  { id: 'rust', name: 'Rust Treatment & Protection' },
  { id: 'electrical', name: 'Electrical & Insulation' },
  { id: 'specialty', name: 'Specialty Chemicals' },
];

export const PRODUCTS = """

json_products = json.dumps(bilingual_products, indent=2, ensure_ascii=False)

new_content = categories_part + json_products + ";\n\n" + tail

with open('src/data/products.js', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Successfully written products.js! New length:", len(new_content))
