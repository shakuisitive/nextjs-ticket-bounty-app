"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { deleteCookieByKey, getCookieByKey } from "@/app/actions/cookies";

const RedirectToast = () => {
  useEffect(() => {
    (async () => {
      const message = await getCookieByKey("toast");
      if (message) {
        toast.info(message);
        await deleteCookieByKey("toast");
      }
    })();
  }, []);

  return null;
};

export { RedirectToast };
