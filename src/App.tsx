import { RouterProvider } from "react-router-dom";
import { router } from "@/routes";
import { ThemeProvider } from "@/components/theme-provider";
import { SettingsProvider } from "@/components/language-provider";

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <SettingsProvider>
        <RouterProvider router={router} />
      </SettingsProvider>
    </ThemeProvider>
  );
}

export default App;
