import { revalidatePath } from "next/cache";

/**
 * Revalidate the whole site (all pages share the root layout) after any CMS
 * change, so edits appear on the live site immediately instead of waiting for
 * ISR. Wrapped in try/catch because it is a no-op outside a request scope
 * (e.g. during the seed script).
 */
function revalidateAll() {
  try {
    revalidatePath("/", "layout");
  } catch {
    /* not in a request scope — ISR will pick the change up */
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export const revalidateAfterChange = ({ doc }: any) => {
  revalidateAll();
  return doc;
};
export const revalidateAfterDelete = ({ doc }: any) => {
  revalidateAll();
  return doc;
};
export const revalidateGlobalAfterChange = ({ doc }: any) => {
  revalidateAll();
  return doc;
};
