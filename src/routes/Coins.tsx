import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface CoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
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

const CoinList = styled.ul``;

const Coin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.bgColor};
  padding: 20px;
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    display: flex;
    align-items: center;
    transition: color 0.2s ease-in-out;
  }
  a:hover {
    color: ${(props) => props.theme.accentColor};
  }
`;

const Loader = styled.span`
  display: block;
  text-align: center;
`;

const ErrorMessage = styled(Loader)`
  display: block;
  text-align: center;
  color: red;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

function Coins() {
  const [coins, setCoins] = useState<CoinInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("https://api.coinpaprika.com/v1/coins");

        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const result = await response.json();
        setCoins(result.slice(0, 100));
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
        <Title>코인</Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : (
        <CoinList>
          {coins.map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={{
                  pathname: `/${coin.id}`,
                  state: {
                    name: coin.name,
                  },
                }}
              >
                <Img src={`https://cryptoicon-api.pages.dev/icons/128/color/${coin.symbol.toLowerCase()}.png`} />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinList>
      )}
    </Container>
  );
}

export default Coins;
