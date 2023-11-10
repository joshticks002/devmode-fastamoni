/* eslint-disable unicorn/prefer-module */
/* eslint-disable global-require */
import { ImageSourcePropType } from "react-native";

export const countryCodes = [
  "+234",
  "+235",
  "+236",
  "+237",
  "+238",
  "+239",
  "+240",
  "+245",
];
export const homeNavigation = [
  {
    iconName: "transfer",
    id: "wdnciew",
    name: "Transfer",
  },
  {
    iconName: "paper",
    id: "csbcbwbfcw",
    name: "Bills",
  },
  {
    iconName: "wallet",
    id: "mkmiwncbb",
    name: "Fund",
  },
  {
    iconName: "clipboard",
    id: "vnduvnudnvn",
    name: "Services",
  },
];

export const getAmount = [
  {
    setValues: 50,
    values: "50",
  },
  {
    setValues: 100,
    values: "100",
  },
  {
    setValues: 200,
    values: "200",
  },
  {
    setValues: 300,
    values: "300",
  },
  {
    setValues: 500,
    values: "500",
  },
  {
    setValues: 1000,
    values: "1000",
  },
];

export interface Poster {
  poster: ImageSourcePropType;
  title: string;
  subtitle: string;
  isFree: "Yes" | "No";
  price?: string;
  id: string;
}

export const images = [
  {
    image: require("../../../../assets/images/exploreImg.png"),
    title: "First Image",
  },
  {
    image: require("../../../../assets/images/adFastamoni.png"),
    title: "Second Image",
  },
  {
    image: require("../../../../assets/images/advertFastamoni.png"),
    title: "Third Image",
  },
];

export const freePosters: Poster[] = [
  {
    id: "1",
    isFree: "Yes",
    poster: require("../../../../assets/images/loginLogo.png"),
    subtitle: "Noodlecake Studios",
    title: "Altos Odyssey",
  },
  {
    id: "2",
    isFree: "Yes",
    poster: require("../../../../assets/images/loginLogo.png"),
    subtitle: "Gameloft",
    title: "Asphalt 9",
  },
  {
    id: "3",
    isFree: "Yes",
    poster: require("../../../../assets/images/loginLogo.png"),
    subtitle: "miHoYo",
    title: "Genshin Impact",
  },
  {
    id: "4",
    isFree: "Yes",
    poster: require("../../../../assets/images/loginLogo.png"),
    subtitle: "Epic Games",
    title: "Fortnite",
  },
  {
    id: "5",
    isFree: "Yes",
    poster: require("../../../../assets/images/loginLogo.png"),
    subtitle: "The Pokémon Company",
    title: "Pokémon Unite",
  },
  {
    id: "6",
    isFree: "Yes",
    poster: require("../../../../assets/images/loginLogo.png"),
    subtitle: "Blizzard Entertainment",
    title: "Diablo 4",
  },
];

export const mtnData = [
  "Mtn 1GB valid 30 days",
  "Mtn 2GB valid 30 days",
  "Mtn 3GB valid 30 days",
  "Mtn 4GB valid 30 days",
  "Mtn 5GB valid 30 days",
  "Mtn 6GB valid 30 days",
  "Mtn 7GB valid 30 days",
  "Mtn 10GB valid 30 days",
];
export const gloData = [
  "Glo 1GB valid 30days",
  "Glo 2GB valid 30days",
  "Glo 3GB valid 30days",
  "Glo 4GB valid 30days",
  "Glo 5GB valid 30days",
  "Glo 6GB valid 30days",
  "Glo 7GB valid 30days",
  "Glo 10GB valid 30days",
];
export const nineMobile = [
  "9mobile 1GB valid 30days",
  "9mobile 2GB valid 30days",
  "9mobile 3GB valid 30days",
  "9mobile 4GB valid 30days",
  "9mobile 5GB valid 30days",
  "9mobile 6GB valid 30days",
  "9mobile 7GB valid 30days",
  "9mobile 10GB valid 30days",
];
export const airtelData = [
  "Airtel 1GB valid 30days",
  "Airtel 2GB valid 30days",
  "Airtel 3GB valid 30days",
  "Airtel 4GB valid 30days",
  "Airtel 5GB valid 30days",
  "Airtel 6GB valid 30days",
  "Airtel 7GB valid 30days",
  "Airtel 10GB valid 30days",
];
export const electricity = [
  "Eko Electric Distribution",
  "Edo Electric Distribution",
  "Kaduna Electric Distribution",
  "Kano Electric Distribution",
];
export const cableTvBillers = ["Box Office", "DSTV", "GOTv", "Star-timees"];
export const cableTvPackages = ["GOTV", "DSTV", "Startimes"];

export const electricityType = [
  "Postpaid",
  "Prepaid",
  "Post-prepaid",
  "Under-prepaid",
];

export const defaultData = ["Please choose a data plan"];

export const frequentTransactionList = [
  {
    accountNumber: "8012345678",
    amount: 2000,
    bankCode: "090588",
    bankName: "Fidelity Bank",
    createdAt: "2023-04-02T05:41:16.7536547Z",
    id: "_7l08iozkn",
    name: "",
    option: "Glo Quick Top-up",
    type: "debit",
  },
  {
    accountNumber: "8012345678",
    amount: 10_000,
    bankCode: "090588",
    bankName: "Sterling Bank Plc",
    createdAt: "2023-04-02T05:41:16.7536547Z",
    id: "_jr4u6on2h",
    name: "",
    option: "Airtime Purchase",
    type: "debit",
  },
  {
    accountNumber: "8012345678",
    amount: 100_000,
    bankCode: "090588",
    bankName: "First Bank Plc",
    createdAt: "2023-04-02T05:41:16.7536547Z",
    id: "_oa630ifg2",
    name: "Catherine",
    option: "Bank Transfer",
    type: "credit",
  },
  {
    accountNumber: "8012345678",
    amount: 5000,
    bankCode: "090588",
    bankName: "Access Bank Plc",
    createdAt: "2023-04-03T09:21:34.4321002Z",
    id: "_wwzzwmrun",
    name: "David",
    option: "Internet Banking",
    type: "debit",
  },
  {
    accountNumber: "8012345678",
    amount: 75_000,
    bankCode: "090588",
    bankName: "Zenith Bank Plc",
    createdAt: "2023-04-03T09:21:34.4321002Z",
    id: "_wxptqc3ut",
    name: "Ella",
    option: "Bank Transfer",
    type: "credit",
  },
  {
    accountNumber: "8012345678",
    amount: 3000,
    bankCode: "090588",
    bankName: "Guaranty Trust Bank Plc",
    createdAt: "2023-04-03T09:21:34.4321002Z",
    id: "_j334n1yj2",
    name: "",
    option: "Airtime Purchase",
    type: "debit",
  },
  {
    accountNumber: "8012345678",
    amount: 15_000,
    bankCode: "090588",
    bankName: "United Bank of Africa Plc",
    createdAt: "2023-04-04T14:58:10.1234567Z",
    id: "_p12i3a3bp",
    name: "Grace",
    option: "Bank Transfer",
    type: "credit",
  },
  {
    accountNumber: "8012345678",
    amount: 4500,
    bankCode: "090588",
    bankName: "Ecobank Nigeria Ltd",
    createdAt: "2023-04-04T14:58:10.1234567Z",
    id: "_oliip8btw",
    name: "Henry",
    option: "POS Transaction",
    type: "debit",
  },
  {
    accountNumber: "8012345678",
    amount: 60_000,
    bankCode: "090588",
    bankName: "Stanbic IBTC Bank",
    createdAt: "2023-04-04T14:58:10.1234567Z",
    id: "_reqvxgf0n",
    name: "Irene",
    option: "Bank Transfer",
    type: "credit",
  },
  {
    accountNumber: "8012345678",
    amount: 8000,
    bankCode: "090588",
    bankName: "Union Bank of Nigeria Plc",
    createdAt: "2023-04-05T20:15:45.9876543Z",
    id: "_7kn3ljcfg",
    name: "Jack",
    option: "Online Shopping",
    type: "debit",
  },
];

export type IFrequentTransaction = {
  id: string;
  amount: number;
  type: string;
  option: string;
  accountNumber: string;
  bankCode: string;
  bankName: string;
  name?: string;
  createdAt: string | Date;
};
