import { uiSlice } from "../state/uiSlice.js";
export async function withLoading(callback) {
  uiSlice.loadingOn();
  try {
    return await callback();
  } finally {
    uiSlice.loadingOff();
  }
}
