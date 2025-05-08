import { Link, Route, Switch, useLocation, useParams, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import Price from "./Price";
import Chart from "./Chart";
import { useQuery } from "@tanstack/react-query";
import { fetchCoinInfo, fetchCoinTickers } from "../api/coin";
import { IInfoData, IPriceData } from "../api/types";
import { RouteParams, RouteState } from "../types/route";
import { IoIosArrowBack } from "react-icons/io";
import { Helmet } from "react-helmet";
import { ICoinProps } from "../types/props";

const Container = styled.div`
  padding: 0 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  position: relative;
  a {
    position: absolute;
    left: 10px;
  }
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  grid-template-columns: repeat(2, 1fr);
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 48px;
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

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

const Description = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin: 25px 0;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) => (props.isActive ? props.theme.accentColor : props.theme.textColor)};
  a {
    display: block;
  }
`;

function Coin({ isDark }: ICoinProps) {
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();
  const priceMatch = useRouteMatch("/:coinId/price");
  const chartMatch = useRouteMatch("/:coinId/chart");
  const {
    data: info,
    isLoading: isLoadingCoinInfo,
    isError: isErrorCoinInfo,
    error: errorCoinInfo,
  } = useQuery<IInfoData>({
    queryKey: ["info", coinId],
    queryFn: () => fetchCoinInfo(coinId),
  });
  const {
    data: priceInfo,
    isLoading: isLoadingCoinPrice,
    isError: isErrorCoinPrice,
    error: errorCoinPrice,
  } = useQuery<IPriceData>({
    queryKey: ["tickers", coinId],
    queryFn: () => fetchCoinTickers(coinId),
    refetchInterval: 5000,
  });

  const errorMessages = [
    errorCoinInfo instanceof Error ? errorCoinInfo.message : null,
    errorCoinPrice instanceof Error ? errorCoinPrice.message : null,
  ].filter(Boolean); // Falsey 값 제외해서 배열로 받음

  const isLoading = isLoadingCoinInfo || isLoadingCoinPrice;
  const isError = isErrorCoinInfo || isErrorCoinPrice;

  return (
    <Container>
      <Helmet>
        <title>{state?.name ? state.name : isLoadingCoinInfo || isLoadingCoinPrice ? "Loading" : info?.name}</title>
      </Helmet>
      <Header>
        <Link to={".."}>
          <IoIosArrowBack size={30} />
        </Link>
        <Title>{state?.name ? state.name : isLoadingCoinInfo || isLoadingCoinPrice ? "Loading" : info?.name}</Title>
      </Header>
      {isLoading && <Loader>Loading...</Loader>}
      {isError && (
        <ErrorMessage>
          {errorMessages.length > 0 ? errorMessages.join(" / ") : "알 수 없는 에러가 발생했습니다."}
        </ErrorMessage>
      )}
      {!isLoading && !isError && info && priceInfo && (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank</span>
              <span>{info?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol</span>
              <span>${info?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price</span>
              <span>${priceInfo.quotes.USD.price.toFixed(3)}</span>
            </OverviewItem>
          </Overview>
          <Description>{info?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply</span>
              <span>{priceInfo?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply</span>
              <span>{priceInfo?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>price</Link>
            </Tab>
          </Tabs>
          <Switch>
            <Route path={`/:coinId/price`}>
              <Price
                priceInfo={{
                  ath_price: priceInfo.quotes.USD.ath_price,
                  ath_date: priceInfo.quotes.USD.ath_date,
                  percent_change_1h: priceInfo.quotes.USD.percent_change_1h,
                  percent_change_6h: priceInfo.quotes.USD.percent_change_6h,
                  percent_change_12h: priceInfo.quotes.USD.percent_change_12h,
                  percent_change_24h: priceInfo.quotes.USD.percent_change_24h,
                }}
              />
            </Route>
            <Route path={`/:coinId/chart`}>
              <Chart coinId={coinId} isDark={isDark} />
            </Route>
          </Switch>
        </>
      )}
    </Container>
  );
}

export default Coin;
