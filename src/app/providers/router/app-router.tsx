import { Route, RouteProps, Routes } from "react-router-dom";
import { routeConfig } from "./router-config";

function AppRouter() {
  return (
    <Routes>
      {Object.values(routeConfig).map((route: RouteProps) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
}

export { AppRouter };
