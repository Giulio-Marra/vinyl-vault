import { Outlet } from "react-router";
import MyNavbar from "../shared/components/MyNavbar";
import MyFooter from "../shared/components/MyFooter";

export default function MainLayout() {
  return (
    <>
      <MyNavbar />
      <Outlet />
      <MyFooter />
    </>
  );
}
