import { Form } from "./components/Form";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Form></Form>
      </QueryClientProvider>
    </>
  );
}

export default App;
