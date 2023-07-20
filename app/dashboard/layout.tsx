import NavBar from "@/app/components/Navbar";
import FloatingMenu from "../components/FloatingMenu";


const Layout = ({ children}: { children: React.ReactNode }) => {
  return (
    <div>
      <NavBar />
      <main className="mx-10" >{children}</main>
      {/* Add footer or other components as needed */}
      <FloatingMenu/>
    </div>
  );
};

export default Layout;
