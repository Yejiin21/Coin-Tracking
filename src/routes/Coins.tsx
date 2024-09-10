import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet";
import { InfoData } from "../interface/interfaces";
import { useSetRecoilState } from "recoil";
import { themeModeAtom } from "../atom";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-itmes: center;
`;

const CoinList = styled.ul``;

const Coin = styled.li`
  background-color: ${(props) => props.theme.boxColor};
  color: ${(props) => props.theme.textColor};
  padding: 20px;
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in;
  }
  &: hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  padding: 20px 0px;
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.div`
  display: block;
  text-align: center;
`;

const Img = styled.img`
  width: 35px;
  hight: 35px;
  margin-right: 10px;
`;

const ThemeModeButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  width: 80px;
  margin: 10px;
  border: 2px solid;
  border-radius: 10px;
  background-color: white;
  font-size: 16px;
`;

function Coins() {
  // react query가 데이터를 캐시에 저장해두기 때문에 이전페이지로 이동해도 로딩창 안뜸
  const { isLoading, data } = useQuery<InfoData[]>("allCoins", fetchCoins);

  // value를 설정(set)하는 function
  // 여기서는 function을 가져오는데, 이 function이 value를 수정 => React의 setState와 같은 방식으로 작동
  const setThemeModeAtom = useSetRecoilState<boolean>(themeModeAtom);

  const toggleThemeAtom = () => setThemeModeAtom((prev) => !prev);

  return (
    <Container>
      <Helmet>
        <title>코인</title>
      </Helmet>
      <ThemeModeButton onClick={toggleThemeAtom}>
        {setThemeModeAtom ? "🌝" : "🌚"}
      </ThemeModeButton>
      <Header>
        <Title>코인</Title>
      </Header>
      {isLoading ? (
        <Loader>"Loading..."</Loader>
      ) : (
        <CoinList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`} state={{ name: coin.name }}>
                <Img
                  src={`https://cryptoicon-api.pages.dev/api/icon/${coin.symbol.toLocaleLowerCase()}`}
                />
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
