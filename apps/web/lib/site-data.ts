import type { Product } from "@aurum/shared";

export const categories = [
  { label: "All", value: "all" },
  { label: "Rings", value: "ring" },
  { label: "Bracelets", value: "bracelet" },
  { label: "Pendants", value: "pendant" },
  { label: "Earrings", value: "earring" }
] as const;

const standardDiamondGrades = ["SI IJ", "SI GH", "VS GH", "VVS EF"] as const;
const standardGoldPurities = ["14k", "18k"] as const;

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
      "A luminous diamond face with soft rose warmth"
    ],
    availableGoldPurities: [...standardGoldPurities],
    availableDiamondGrades: [...standardDiamondGrades],
    goldWeightG: 3.2,
    diamondWeightCt: 0.265,
    labourCharge: 3800,
    diamondFocus: "Floral cluster"
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
      "Ideal for proposal and self-purchase moments",
      "A refined shape that keeps the stone in focus"
    ],
    availableGoldPurities: [...standardGoldPurities],
    availableDiamondGrades: [...standardDiamondGrades],
    goldWeightG: 3.6,
    diamondWeightCt: 0.31,
    labourCharge: 3900,
    diamondFocus: "Solitaire-led setting"
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
      "A fluid line of diamonds with warm gold framing"
    ],
    availableGoldPurities: [...standardGoldPurities],
    availableDiamondGrades: [...standardDiamondGrades],
    goldWeightG: 7.8,
    diamondWeightCt: 0.89,
    labourCharge: 5400,
    diamondFocus: "Linear diamond line"
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
      "Diamond accents that keep the look polished and bright"
    ],
    availableGoldPurities: [...standardGoldPurities],
    availableDiamondGrades: [...standardDiamondGrades],
    goldWeightG: 5.4,
    diamondWeightCt: 0.33,
    labourCharge: 5100,
    diamondFocus: "Station-set diamonds"
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
      "Pairs beautifully with both chain and collar styling",
      "A graceful silhouette with diamond-led sparkle"
    ],
    availableGoldPurities: [...standardGoldPurities],
    availableDiamondGrades: [...standardDiamondGrades],
    goldWeightG: 4.1,
    diamondWeightCt: 0.29,
    labourCharge: 3600,
    diamondFocus: "Pear-inspired diamond drop"
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
      "Diamond accents bring light without losing softness"
    ],
    availableGoldPurities: [...standardGoldPurities],
    availableDiamondGrades: [...standardDiamondGrades],
    goldWeightG: 4.6,
    diamondWeightCt: 0.24,
    labourCharge: 3500,
    diamondFocus: "Star-set diamond accents"
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
      "Strong hero image presence with a bright diamond face",
      "A balanced piece that feels polished from every angle"
    ],
    availableGoldPurities: [...standardGoldPurities],
    availableDiamondGrades: [...standardDiamondGrades],
    goldWeightG: 3.9,
    diamondWeightCt: 0.27,
    labourCharge: 4300,
    diamondFocus: "Floral diamond cluster"
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
      "Designed for festive dressing and intimate celebrations",
      "A longer line of sparkle with soft visual weight"
    ],
    availableGoldPurities: [...standardGoldPurities],
    availableDiamondGrades: [...standardDiamondGrades],
    goldWeightG: 4.8,
    diamondWeightCt: 0.41,
    labourCharge: 4600,
    diamondFocus: "Linear drop diamonds"
  }
];
