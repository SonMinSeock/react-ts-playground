import styled from "styled-components";
import { IPriceProps } from "../types/props";
import { IoMdTrendingUp, IoMdTrendingDown } from "react-icons/io";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  color: white;
  gap: 10px;
`;
const Overview = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
  grid-column: span 2;
`;

const OverviewItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  span:first-child {
    line-height: 1.5;
  }
  .ath__price {
    font-size: 2rem;
    font-weight: 300;
  }
`;

const ChangeCard = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  min-width: 120px;
  height: 100px;
`;

const Title = styled.span`
  font-size: 14px;
  font-weight: 500;
`;

const Percentage = styled.span<{ isPositive: boolean }>`
  font-size: 28px;
  font-weight: bold;
  color: ${(props) => (props.isPositive ? "red" : "blue")};
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 24px;
`;

function Price({ priceInfo }: IPriceProps) {
  const dateFormat = (dateString: string) => {
    const [year, month, dayTime] = dateString.split("-");
    const [day] = dayTime.split("T");
    return `${year}.${month}.${day}`;
  };

  const timeLabelMap: { [key: string]: string } = {
    "1h": "1시간 전보다",
    "6h": "6시간 전보다",
    "12h": "12시간 전보다",
    "24h": "24시간 전보다",
    "7d": "7일 전보다",
    "30d": "30일 전보다",
    "1y": "1년 전보다",
  };

  const percentChangeEntries = Object.entries(priceInfo)
    .filter(([key]) => key.startsWith("percent_change_"))
    .map(([key, value]) => {
      const timeKey = key.replace("percent_change_", ""); // 예: 1h, 7d
      return { timeKey, value };
    });

  return (
    <Container>
      <Overview>
        <OverviewItem>
          <span>
            {dateFormat(priceInfo.ath_date)} <br />
            최고가 달성
          </span>
          <span className="ath__price">${priceInfo.ath_price.toFixed(2)}</span>
        </OverviewItem>
      </Overview>

      {percentChangeEntries.map(({ timeKey, value }) => {
        const isPositive = +value >= 0;
        return (
          <ChangeCard key={timeKey}>
            <Title>{timeLabelMap[timeKey] ?? `${timeKey} 변화`}</Title>
            <IconWrapper>
              <Percentage isPositive={isPositive}>{value}%</Percentage>
              {isPositive ? <IoMdTrendingUp color="red" /> : <IoMdTrendingDown color="blue" />}
            </IconWrapper>
          </ChangeCard>
        );
      })}
    </Container>
  );
}

export default Price;
