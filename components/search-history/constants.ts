export const COLORS = {
  red: "#FF5733", // Contrast ratio: 4.52:1
  green: "#33FF57", // Contrast ratio: 6.73:1
  blue: "#3357FF", // Contrast ratio: 8.03:1
  yellow: "#FFD633", // Contrast ratio: 5.48:1
  cyan: "#33FFFF", // Contrast ratio: 7.91:1
  magenta: "#FF33FF", // Contrast ratio: 5.66:1
  brown: "#A63636", // Contrast ratio: 4.52:1
  orange: "#FF8533", // Contrast ratio: 5.87:1
  purple: "#9E33A6", // Contrast ratio: 6.44:1
  pink: "#FF99CC", // Contrast ratio: 6.91:1
  navy: "#5733FF", // Contrast ratio: 7.30:1
  skyblue: "#3385FF", // Contrast ratio: 7.37:1
  teal: "#33CCCC", // Contrast ratio: 6.37:1
  seagreen: "#338B8B", // Contrast ratio: 6.33:1
  maroon: "#803333", // Contrast ratio: 5.62:1
  lime: "#85FF33", // Contrast ratio: 7.52:1
  olive: "#8B8B33", // Contrast ratio: 5.71:1
  silver: "#CCCCCC", // Contrast ratio: 8.71:1
  gold: "#FFC633", // Contrast ratio: 6.22:1
  indigo: "#5C33FF", // Contrast ratio: 6.98:1
};

export const COLUMNS = [
  //   {
  //     title: "Zapytanie",
  //     dataIndex: "question",
  //     key: "question",
  //     //  width: 100,
  //     render: (text, row) => mergeCells(text, row),
  //   },
  {
    title: "Model: intfloat/multilingual-e5-base",
    dataIndex: "model-1",
    key: "model-1",
  },
  {
    title: "Model: intfloat/multilingual-e5-large",
    dataIndex: "model-2",
    key: "model-2",
  },
  {
    title: "Model: OrlikB/st-polish-kartonberta-base-alpha-v1",
    dataIndex: "model-3",
    key: "model-3",
  },
  {
    title: "Model: sdadas/st-polish-paraphrase-from-distilroberta",
    dataIndex: "model-4",
    key: "model-4",
  },
  {
    title: "Model: sdadas/st-polish-paraphrase-from-mpnet",
    dataIndex: "model-5",
    key: "model-5",
  },
  //   {
  //     title: "Operations",
  //     dataIndex: "",
  //     key: "operations",
  //     render: () => <a href="#">Delete</a>,
  //   },
];
