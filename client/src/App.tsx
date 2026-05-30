import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { PromptProvider } from "./contexts/PromptContext";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import PromptIndex from "./pages/PromptIndex";
import PromptDetail from "./pages/PromptDetail";
import AddPrompt from "./pages/AddPrompt";
import EditPrompt from "./pages/EditPrompt";
import CategoriesAdmin from "./pages/CategoriesAdmin";
import TagsAdmin from "./pages/TagsAdmin";
import MigrationAdmin from "./pages/MigrationAdmin";
import ValidationScreen from "./pages/ValidationScreen";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/prompts" component={PromptIndex} />
        <Route path="/prompts/:id" component={PromptDetail} />
        <Route path="/add" component={AddPrompt} />
        <Route path="/edit/:id" component={EditPrompt} />
        <Route path="/categories" component={CategoriesAdmin} />
        <Route path="/tags" component={TagsAdmin} />
        <Route path="/migration" component={MigrationAdmin} />
        <Route path="/validation" component={ValidationScreen} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <PromptProvider>
          <TooltipProvider>
            <Toaster position="top-center" dir="rtl" />
            <Router />
          </TooltipProvider>
        </PromptProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
