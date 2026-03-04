import { QueryClientProvider } from "@tanstack/react-query";

import { queryClient, toast } from "./shared/config/bootstrap";
import { Outlet } from "react-router";
import { Toaster } from "./shared/components/toast";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <Toaster toasterStore={toast.store} />
    </QueryClientProvider>
  );
}

export default App;
