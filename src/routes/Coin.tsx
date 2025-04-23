import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

interface RouteParams {
  coinId: string;
}

interface RouteState {
  name: string;
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
  const [info, setInfo] = useState({});
  const [priceInfo, setPriceInfo] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const priceDataResponse = await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`);
        const infoDataResponse = await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`);

        if (!priceDataResponse.ok || !infoDataResponse.ok) {
          throw new Error(`HTTP Error! Status: ${priceDataResponse.status}`);
        }

        const priceData = await priceDataResponse.json();
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
      {loading ? <Loader>Loading...</Loader> : <span>{}</span>}
    </Container>
  );
}

export default Coin;
