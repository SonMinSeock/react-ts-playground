import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

interface RouteParams {
  coinId: string;
}

interface RouteState {
  name: string;
}

interface IInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface IQuote {
  price: number;
  volume_24h: number;
  volume_24h_change_24h: number;
  market_cap: number;
  market_cap_change_24h: number;
  percent_change_15m: number;
  percent_change_30m: number;
  percent_change_1h: number;
  percent_change_6h: number;
  percent_change_12h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  percent_change_30d: number;
  percent_change_1y: number;
  ath_price: number;
  ath_date: string;
  percent_from_price_ath: number;
}

interface IPriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: IQuote;
  };
}

const Container = styled.div`
  padding: 0 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 48px;
`;

const Loader = styled.span`
  display: block;
  text-align: center;
`;

function Coin() {
  const [loading, setLoading] = useState(true);
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<IInfoData>({});
  const [priceInfo, setPriceInfo] = useState<IPriceData>({});

  useEffect(() => {
    (async () => {
      try {
        const priceDataResponse = await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`);
        const infoDataResponse = await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`);

        if (!priceDataResponse.ok || !infoDataResponse.ok) {
          throw new Error(`HTTP Error! Status: ${priceDataResponse.status}`);
        }

        const priceData = await priceDataResponse.json();
        console.log(priceData);
        const infoData = await infoDataResponse.json();
        console.log(infoData);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("알수없는 에러 발생했습니다.");
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <Container>
      <Header>
        <Title>{state?.name || "Loading"}</Title>
      </Header>
      {loading ? <Loader>Loading...</Loader> : null}
    </Container>
  );
}

export default Coin;
