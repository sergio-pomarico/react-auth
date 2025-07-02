import { useState } from "react";
import authServices from "@/services/auth";
import type { AxiosError } from "axios";
import { useAuthStore } from "@/store/auth";
import { useNavigate } from "react-router";

export function useAuthRefresh() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [failedQueue, setFailedQueue] = useState<
    {
      query?: QuerryError["query"];
      mutation?: MutationError["mutation"];
      variables?: unknown;
    }[]
  >([]);

  const refresh = useAuthStore((state) => state.refresh);
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const processFailedQueue = () => {
    failedQueue.forEach(({ query, mutation, variables }) => {
      if (mutation) {
        const { options } = mutation;
        mutation.setOptions({ ...options, variables });
        mutation.execute();
      }
      if (query) query.fetch();
    });
    setIsRefreshing(false);
    setFailedQueue([]);
  };

  const updateQueue = (
    query?: QuerryError["query"],
    mutation?: MutationError["mutation"],
    variables?: unknown
  ) => {
    failedQueue.push({ query, mutation, variables });
    setFailedQueue(failedQueue);
  };

  const refreshTokenAndRetry = async (
    query?: QuerryError["query"],
    mutation?: MutationError["mutation"],
    variables?: unknown
  ) => {
    try {
      if (!isRefreshing) {
        setIsRefreshing(true);
        updateQueue(query, mutation, variables);
        const { accessToken } = await authServices.refreshToken();
        authServices.http.setAuthorizationToken(accessToken);
        login(accessToken, refresh!);
        processFailedQueue();
      } else {
        updateQueue(query, mutation, variables);
      }
    } catch {
      localStorage.removeItem("authentication");
      navigate("/login");
    }
  };

  const errorHandler = (
    error: QuerryError["error"] | MutationError["error"],
    query?: QuerryError["query"],
    mutation?: MutationError["mutation"],
    variables?: unknown
  ) => {
    const { status } = (error as AxiosError).response!;
    if (status === 401) {
      if (mutation) refreshTokenAndRetry(undefined, mutation, variables);
      if (query) refreshTokenAndRetry(query);
    }
  };

  const queryErrorHandler = (
    error: QuerryError["error"],
    query: QuerryError["query"]
  ) => {
    errorHandler(error, query);
  };

  const mutationErrorHandler = (
    error: MutationError["error"],
    mutation: MutationError["mutation"],
    variables: MutationError["variables"],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    __: MutationError["context"]
  ) => {
    errorHandler(error, undefined, mutation, variables);
  };

  return {
    queryErrorHandler,
    mutationErrorHandler,
  };
}
