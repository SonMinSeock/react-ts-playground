import { useQuery } from "@tanstack/react-query";
import { fetchCoinHistory } from "../api/coin";

interface IChartProps {
  coinId: string;
}

function Chart({ coinId }: IChartProps) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["ohlcv", coinId],
    queryFn: () => fetchCoinHistory(coinId),
  });

  console.log(data);

  return <h1>Chart</h1>;
}

export default Chart;
