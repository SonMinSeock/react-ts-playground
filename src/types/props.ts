import { IHistorical } from "../api/types";

// 컴포넌트 props 관련 인터페이스
export interface IChartProps {
  coinId: string;
}

export interface ILineChartProps {
  data: IHistorical[];
}

export interface ICandleChartProps {
  data: IHistorical[];
}
