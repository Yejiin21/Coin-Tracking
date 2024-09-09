import { BrowserRouter, Route, Routes } from "react-router-dom";
import Coins from "./routes/Coins";
import Coin from "./routes/Coin";

interface IRouterProps {
  toggle: () => void;
  themeMode: boolean;
}

function Router({ toggle, themeMode }: IRouterProps) {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Coins themeMode={themeMode} toggle={toggle} />}
        />
        <Route path="/:coinId/*" element={<Coin themeMode={themeMode} />} />
      </Routes>
    </BrowserRouter>
  );
}
export default Router;
