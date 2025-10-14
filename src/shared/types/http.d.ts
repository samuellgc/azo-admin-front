/** biome-ignore-all lint/suspicious/noExplicitAny: tipagem dinâmica referente ao Alova */
import type { FetchRequestInit } from "alova/fetch";
import type { ReactState } from "alova/react";
import type { AlovaDefaultCacheAdapter, AlovaGenerics } from "alova";

/**
 * Define a configuração genérica para uma instância do Alova,
 * utilizando o adaptador `fetch`, com suporte ao React como framework de estado.
 *
 * Essa tipagem serve para customizar o comportamento do Alova
 */
export type AlovaConfigOptions = AlovaGenerics<
  any,
  any,
  FetchRequestInit,
  Response,
  Headers,
  AlovaDefaultCacheAdapter,
  AlovaDefaultCacheAdapter,
  {
    name: "React";
    State: ReactState<unknown>;
    Computed: any[];
    Watched: unknown;
    StateExport: unknown;
    ComputedExport: unknown;
  }
>;
