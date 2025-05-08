import { useQuery } from "@tanstack/react-query";
import { fetchCoinHistory } from "../api/coin";
import styled from "styled-components";
import LineChart from "../components/charts/LineChart";
import CandleChart from "../components/charts/CandleChart";
import { IHistorical } from "../api/types";
import { IChartProps } from "../types/props";

const Loader = styled.span`
  display: block;
  text-align: center;
`;

const ErrorMessage = styled(Loader)`
  display: block;
  text-align: center;
  color: red;
`;

function Chart({ coinId, isDark }: IChartProps) {
  const { data, isLoading, isError, error } = useQuery<IHistorical[]>({
    queryKey: ["ohlcv", coinId],
    queryFn: () => fetchCoinHistory(coinId),
    refetchInterval: 10000,
  });

  return (
    <>
      {isLoading && <Loader>Loading Chart...</Loader>}
      {isError && <ErrorMessage>{error ? error.message : "알 수 없는 에러가 발생했습니다."}</ErrorMessage>}
      {!isLoading && !isError && (
        <>
          <LineChart data={data ?? []} isDark={isDark} />
          <CandleChart data={data ?? []} isDark={isDark} />
        </>
      )}
    </>
  );
}

export default Chart;
