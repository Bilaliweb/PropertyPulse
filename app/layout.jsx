import "@/assets/styles/globals.css";
import Footer from "@/components/Footer";
import NavBar from "@/components/Navbar";
import SessionProviderComponent from "@/components/SessionProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GlobalProvider } from "@/context/GlobalContext";

export const metadata = {
  title: "Property Pulse",
  keywords: "Find the perfect rental property",
  description: "rental, property, real estate",
};

const MainLayout = ({ children }) => {
  return (
    <SessionProviderComponent>
      <GlobalProvider>
        <html lang="en">
          <body>
            <NavBar />
            <main>{children}</main>
            <Footer />
            <ToastContainer />
          </body>
        </html>
      </GlobalProvider>
    </SessionProviderComponent>
  );
};

export default MainLayout;
