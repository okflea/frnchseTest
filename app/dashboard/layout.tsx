import NavBar from "@/app/components/Navbar";


const Layout = ({ children}: { children: React.ReactNode }) => {
  return (
    <div>
      <NavBar />
      <main className="mx-10" >{children}</main>
      {/* Add footer or other components as needed */}
    </div>
  );
};

export default Layout;
