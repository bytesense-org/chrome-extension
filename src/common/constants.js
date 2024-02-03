export const apiURL = "http://localhost:5000";
export const qualities = [144, 240, 360, 480, 720, 1080, 1440, 2160, 4320];
export const closestQualityToScreen =
  qualities[
    qualities.indexOf(
      qualities.find((quality) => quality >= window.screen.height)
    ) - 1
  ];

export const defaultPreferences = {
  categories: {
    music: "144",
    podcast: "144",
    gaming: "144",
    news: "144",
    coding: "144",
    sports: "144",
    graphics: "144",
    food: "144",
    nature: "144",
    demo: "144",
  },
  audioOnly: false,
  lowBackgroundResolution: false,
  userInitiatedPlayback: false,
  thumbnailHoverBlocking: false,
  blockThumbnailLoad: true,
  blockHomePageLoad: false,
};

export const categoryKeywords = {
  music: ["music", "song", "lyrics"],
  podcast: ["podcast","conversation","interview","Episode"],
  gaming:["gameplay","walkthrough","PC","PS","game","live"],
  news:["news","update","breaking","headlines","politics","world"],
  coding:["python","programming","tutorial","software","develop"],
  sports:["football","score","highlights","match","vs"],
  graphics:["design","animation","art","digital","creative"],
  food:["cook","ingredients","baking","muckbang","food"],
  nature:["wild","animals","survival","Scenic","nature","ocean"],
  demo:["repair","guide","how","instructions"]
};

export const currentCategory = {
  currentVideoCategory: "coding",
};

// taken from https://github.com/sameernyaupane/simple-auto-hd/
export const qualityTitles = [
  "Quality",
  "Gehalte",
  "Keyfiyyət",
  "Kualitas",
  "Kualiti",
  "Kvalitet",
  "Qualitat",
  "Kvalita",
  "Qualität",
  "Kvaliteet",
  "Calidad",
  "Kalitatea",
  "Kalidad",
  "Qualité",
  "Calidade",
  "Kvaliteta",
  "Ikhwalithi",
  "Gæði",
  "Ubora",
  "Kvalitāte",
  "Kokybė",
  "Minőség",
  "Kwaliteit",
  "Sifati",
  "Qualidade",
  "Calitate",
  "Cilësia",
  "Kakovost",
  "Laatu",
  "Chất lượng",
  "Kalite",
  "Якасць",
  "Сапаты",
  "Квалитет",
  "Качество",
  "Якість",
  "Ποιότητα",
  "Որակ",
  "איכות",
  "معیار",
  "الجودة",
  "کیفیت",
  "गुण",
  "गुणवत्ता",
  "क्वालिटी",
  "গুণাগুণ",
  "গুণমান",
  "ਗੁਣਵੱਤਾ",
  "ક્વૉલિટી",
  "ଗୁଣବତ୍ତା",
  "தரம்",
  "క్వాలిటీ",
  "ಗುಣಮಟ್ಟ",
  "നിലവാരം",
  "ගුණත්වය",
  "คุณภาพ",
  "ຄຸນນະພາບ",
  "အရည်အသွေး",
  "ხარისხი",
  "ጥራት",
  "គុណភាព​",
  "画质",
  "畫質",
  "画質",
  "화질",
];
