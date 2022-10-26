import { ChakraProvider } from "@chakra-ui/react";
import WalletPage from "./pages/Wallet";

function App() {
  return (
    <ChakraProvider>
      <WalletPage />
    </ChakraProvider>
  );
}

export default App;
