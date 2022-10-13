import React from "react";
import { SWRConfig } from "swr";

export type FallbackProps<F extends {}, P = {}> = P & {
  fallback: F;
};

export function withSwrFallback<F extends {}, P extends {} = {}>(
  Component: React.ComponentType<Omit<P, "fallback">>
) {
  return function SWRFallback({ fallback, ...props }: FallbackProps<F, P>) {
    return (
      <SWRConfig value={{ fallback }}>
        <Component {...props} />
      </SWRConfig>
    );
  };
}
