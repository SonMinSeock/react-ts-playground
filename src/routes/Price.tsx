import styled from "styled-components";
import { IPriceProps } from "../types/props";

const Overview = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
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

function Price({ priceInfo }: IPriceProps) {
  const dateFormat = (dateString: string) => {
    const [year, month, dayTime] = dateString.split("-"); // ex)["2025", "01", "20T07:11:03Z"]
    const [day] = dayTime.split("T");
    return `${year}.${month}.${day}`;
  };

  return (
    <Overview>
      <OverviewItem>
        <span>
          {dateFormat(priceInfo.ath_date)} <br />
          최고가 달성
        </span>
        <span className="ath__price">${priceInfo.ath_price.toFixed(2)}</span>
      </OverviewItem>
    </Overview>
  );
}

export default Price;
