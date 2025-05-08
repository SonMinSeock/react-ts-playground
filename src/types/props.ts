import { IHistorical } from "../api/types";

// 컴포넌트 props 관련 인터페이스
export interface IChartProps {
  coinId: string;
  isDark: boolean;
}

export interface ILineChartProps {
  data: IHistorical[];
  isDark: boolean;
}

export interface ICandleChartProps {
  data: IHistorical[];
  isDark: boolean;
}

export interface IPriceProps {
  priceInfo: {
    ath_price: number;
    ath_date: string;
    percent_change_1h: number;
    percent_change_6h: number;
    percent_change_12h: number;
    percent_change_24h: number;
  };
}

export interface ICoinProps {
  isDark: boolean;
}
