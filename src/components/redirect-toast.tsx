"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { deleteCookieByKey, getCookieByKey } from "@/app/actions/cookies";
import { usePathname } from "next/navigation";

const RedirectToast = () => {
  const pathname = usePathname();
  useEffect(() => {
    (async () => {
      const message = await getCookieByKey("toast");
      if (message) {
        toast.info(message);
        await deleteCookieByKey("toast");
      }
    })();
  }, [pathname]);

  return null;
};

export { RedirectToast };
