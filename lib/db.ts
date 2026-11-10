import "server-only";
import postgres from "postgres";

type Sql = ReturnType<typeof postgres>;

const globalForDb = globalThis as unknown as { sql?: Sql; schemaReady?: Promise<void> };

function client(): Sql {
  if (!globalForDb.sql) {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error("DATABASE_URL is not set");
    // One small pool per process; see cray-and-shared-postgres.md (connection budget).
    globalForDb.sql = postgres(url, { max: 5, idle_timeout: 30, connect_timeout: 10, onnotice: () => {} });
  }
  return globalForDb.sql;
}

/** Creates the orders table on first use, so an empty database needs no manual migration. */
export async function db(): Promise<Sql> {
  const sql = client();
  if (!globalForDb.schemaReady) {
    globalForDb.schemaReady = sql`
      CREATE TABLE IF NOT EXISTS orders (
        reference       text PRIMARY KEY,
        status          text NOT NULL DEFAULT 'awaiting_payment'
                        CHECK (status IN ('awaiting_payment', 'paid', 'cancelled')),
        currency        text NOT NULL,
        total           numeric(14,2) NOT NULL,
        usd_total       numeric(14,2) NOT NULL,
        fx_rate         numeric(14,4) NOT NULL,
        items           jsonb NOT NULL,
        customer_name   text NOT NULL,
        customer_email  text NOT NULL,
        customer_phone  text,
        company_name    text,
        billing_address jsonb,
        notes           text,
        paid_at         timestamptz,
        cancelled_at    timestamptz,
        created_at      timestamptz NOT NULL DEFAULT now(),
        updated_at      timestamptz NOT NULL DEFAULT now()
      );
      CREATE INDEX IF NOT EXISTS orders_created_at_idx ON orders (created_at DESC);
    `
      .simple()
      .then(() => undefined)
      .catch((err) => {
        globalForDb.schemaReady = undefined;
        throw err;
      });
  }
  await globalForDb.schemaReady;
  return sql;
}
