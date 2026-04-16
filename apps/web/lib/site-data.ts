import type { Product } from "@aurum/shared";

export const categories = [
  { label: "All", value: "all" },
  { label: "Rings", value: "ring" },
  { label: "Bracelets", value: "bracelet" },
  { label: "Pendants", value: "pendant" },
  { label: "Earrings", value: "earring" }
] as const;

export const homepageMetrics = [
  { label: "Launch-ready core designs", value: "8" },
  { label: "Jewellery categories covered", value: "4" },
  { label: "Guided custom steps", value: "3" }
];

export const featuredCollections = [
  {
    tag: "Signature",
    name: "Everyday Diamond Essentials",
    description:
      "Minimal silhouettes with enough brilliance to feel special from day to night."
  },
  {
    tag: "Ceremony",
    name: "Wedding Gifting Moments",
    description:
      "Soft gold forms and graceful settings shaped for celebration and keepsake value."
  },
  {
    tag: "Modern Heirloom",
    name: "Warm Rose-Toned Statements",
    description:
      "An editorial mix of blush undertones and polished gold for contemporary Indian luxury."
  }
];

export const products: Product[] = [
  {
    id: "ring-aurora-bloom",
    slug: "aurora-bloom-ring",
    name: "Aurora Bloom Ring",
    category: "ring",
    categoryLabel: "Ring",
    shortDescription: "Floral halo ring with a soft rose-gold profile.",
    description:
      "An airy floral cluster ring designed to feel luminous without looking heavy, ideal for milestone gifting and modern bridal edits.",
    palette:
      "radial-gradient(circle at top, rgba(255,255,255,0.95), rgba(248,223,229,0.92) 48%, rgba(199,164,100,0.65) 100%)",
    highlights: [
      "Rounded halo silhouette with a delicate floral spread",
      "Balanced for daily wear with elevated occasion appeal",
      "Best suited to 18k gold with EF/VS or GH/VS lab diamonds"
    ],
    goldPurities: ["18k", "22k"],
    diamondFocus: "EF/VS centre-led cluster",
    startingWeight: 5.2,
    startingDiamondGrade: "EF/VS",
    startingDiamondCarat: 0.35
  },
  {
    id: "ring-sunveil",
    slug: "sunveil-solitaire-ring",
    name: "Sunveil Solitaire Ring",
    category: "ring",
    categoryLabel: "Ring",
    shortDescription: "Clean solitaire with tapered shoulders and warm brilliance.",
    description:
      "A contemporary solitaire with restrained side detailing, designed for buyers who want a quiet but premium centre-stone presentation.",
    palette:
      "radial-gradient(circle at 40% 20%, rgba(255,255,255,0.95), rgba(247,240,223,0.96) 44%, rgba(199,164,100,0.72) 100%)",
    highlights: [
      "Solitaire-first architecture with elevated shank detailing",
      "Ideal for proposal and self-purchase use cases",
      "Works well from 0.30ct to 1.20ct"
    ],
    goldPurities: ["18k", "22k"],
    diamondFocus: "Solitaire-led, EF/VS ideal",
    startingWeight: 4.8,
    startingDiamondGrade: "EF/VS",
    startingDiamondCarat: 0.4
  },
  {
    id: "bracelet-roseline",
    slug: "roseline-tennis-bracelet",
    name: "Roseline Tennis Bracelet",
    category: "bracelet",
    categoryLabel: "Bracelet",
    shortDescription: "Linear bracelet with soft pink undertones and light articulation.",
    description:
      "A refined tennis bracelet with a feminine rose warmth, made to sit elegantly for festive dressing and elevated evening gifting.",
    palette:
      "linear-gradient(135deg, rgba(255,255,255,0.92), rgba(248,223,229,0.9) 52%, rgba(199,164,100,0.55))",
    highlights: [
      "Comfort-focused articulation for graceful movement",
      "Elegant for gifting and ceremonial wear",
      "Looks rich in both rose and classic yellow gold finishes"
    ],
    goldPurities: ["18k", "22k"],
    diamondFocus: "GH/VS linear arrangement",
    startingWeight: 11.5,
    startingDiamondGrade: "GH/VS",
    startingDiamondCarat: 1.2
  },
  {
    id: "bracelet-vira",
    slug: "vira-charm-bracelet",
    name: "Vira Charm Bracelet",
    category: "bracelet",
    categoryLabel: "Bracelet",
    shortDescription: "Light luxury charm bracelet with polished geometric stations.",
    description:
      "A versatile bracelet with diamond-set stations that can be personalized for initials, moments, or gifting messages.",
    palette:
      "linear-gradient(135deg, rgba(247,240,223,0.98), rgba(255,255,255,0.9), rgba(248,223,229,0.78))",
    highlights: [
      "Personalisation-friendly station design",
      "Lightweight silhouette for frequent wear",
      "Easy entry point into premium gifting"
    ],
    goldPurities: ["18k", "22k"],
    diamondFocus: "GH/SI accent diamonds",
    startingWeight: 8.3,
    startingDiamondGrade: "GH/SI",
    startingDiamondCarat: 0.45
  },
  {
    id: "pendant-lustre-drop",
    slug: "lustre-drop-pendant",
    name: "Lustre Drop Pendant",
    category: "pendant",
    categoryLabel: "Pendant",
    shortDescription: "Pear-inspired pendant with a graceful diamond fringe.",
    description:
      "A pendant with a fluid drop silhouette that brings together an occasion-ready face and easy gifting appeal.",
    palette:
      "radial-gradient(circle at 50% 20%, rgba(255,255,255,0.96), rgba(247,240,223,0.94) 45%, rgba(206,141,152,0.55))",
    highlights: [
      "Pear-drop face with subtle movement",
      "Pairs well with both chain and collar styling",
      "Balances statement presence with everyday elegance"
    ],
    goldPurities: ["18k", "22k"],
    diamondFocus: "EF/VS pear-inspired layout",
    startingWeight: 5.6,
    startingDiamondGrade: "EF/VS",
    startingDiamondCarat: 0.42
  },
  {
    id: "pendant-zaria",
    slug: "zaria-sunburst-pendant",
    name: "Zaria Sunburst Pendant",
    category: "pendant",
    categoryLabel: "Pendant",
    shortDescription: "Sunburst medallion pendant with quiet diamond sparkle.",
    description:
      "A contemporary medallion form designed to read premium in close-up product imagery and ceremonial styling alike.",
    palette:
      "radial-gradient(circle, rgba(255,255,255,0.94), rgba(247,240,223,0.92) 42%, rgba(199,164,100,0.72) 100%)",
    highlights: [
      "Medallion-inspired silhouette with a radiant centre",
      "Works beautifully in yellow-gold-led styling",
      "Strong gifting piece for festive drops"
    ],
    goldPurities: ["18k", "22k"],
    diamondFocus: "GH/VS star-set accents",
    startingWeight: 6.3,
    startingDiamondGrade: "GH/VS",
    startingDiamondCarat: 0.28
  },
  {
    id: "earring-petal",
    slug: "petal-glow-earrings",
    name: "Petal Glow Earrings",
    category: "earring",
    categoryLabel: "Earring",
    shortDescription: "Floral stud earrings with compact sparkle and soft framing.",
    description:
      "Stud earrings designed to feel polished and giftable, with enough presence to suit festive wardrobes without becoming oversized.",
    palette:
      "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(248,223,229,0.88), rgba(199,164,100,0.58))",
    highlights: [
      "Compact floral silhouette for gifting and everyday wear",
      "Strong hero image potential for catalogue thumbnails",
      "Easy to scale across diamond sizes"
    ],
    goldPurities: ["18k", "22k"],
    diamondFocus: "GH/VS floral cluster",
    startingWeight: 5.1,
    startingDiamondGrade: "GH/VS",
    startingDiamondCarat: 0.38
  },
  {
    id: "earring-mira",
    slug: "mira-drape-earrings",
    name: "Mira Drape Earrings",
    category: "earring",
    categoryLabel: "Earring",
    shortDescription: "Linear drop earrings with a graceful festive movement.",
    description:
      "An elongated earring profile that feels premium in motion and fits the visual language of modern Indian occasion jewellery.",
    palette:
      "linear-gradient(145deg, rgba(247,240,223,0.96), rgba(255,255,255,0.92), rgba(206,141,152,0.62))",
    highlights: [
      "Slim drop profile with movement-led elegance",
      "Designed for high-intent festive shoppers",
      "Suited to 18k constructions with lighter diamond spread"
    ],
    goldPurities: ["18k", "22k"],
    diamondFocus: "GH/SI linear sparkle",
    startingWeight: 6.9,
    startingDiamondGrade: "GH/SI",
    startingDiamondCarat: 0.55
  }
];
