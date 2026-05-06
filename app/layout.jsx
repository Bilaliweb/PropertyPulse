import "@/assets/styles/globals.css";
import Footer from "@/components/Footer";
import NavBar from "@/components/Navbar";
import SessionProviderComponent from "@/components/SessionProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
  title: "Property Pulse",
  keywords: "Find the perfect rental property",
  description: "rental, property, real estate",
};

const MainLayout = ({ children }) => {
  return (
    <SessionProviderComponent>
      <html lang="en">
        <body>
          <NavBar />
          <main>{children}</main>
          <Footer />
          <ToastContainer />
        </body>
      </html>
    </SessionProviderComponent>
  );
};

export default MainLayout;
