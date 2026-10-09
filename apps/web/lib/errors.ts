export type AppError =
  | { kind: "upload_failed"; message: string }
  | { kind: "user_rejected" }
  | { kind: "submit_failed"; message: string }
  | { kind: "not_configured"; missing: string };

export class ArtivaError extends Error {
  constructor(public readonly appError: AppError) {
    super(appError.kind);
    this.name = "ArtivaError";
  }
}

export function isArtivaError(err: unknown): err is ArtivaError {
  return err instanceof ArtivaError;
}

export const ArtivaError = ArtivaError;
export type ArtivaError = ArtivaError;
export const isArtivaError = isArtivaError;
