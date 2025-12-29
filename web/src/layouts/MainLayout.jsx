import { Outlet } from "react-router";
import MyNavbar from "../shared/components/MyNavbar";

export default function MainLayout() {
  return (
    <>
      <MyNavbar />
      <Outlet />
    </>
  );
}
