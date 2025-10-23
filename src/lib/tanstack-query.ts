import { QueryClient } from "@tanstack/react-query";
import { useState } from "react";

export const useTanstackQuery = () => {
  const [queryClient] = useState(new QueryClient());

  return queryClient;
};
