"use client";

import { Preview } from "@/components/preview/Preview";
import { Mocker } from "@/utils/mocker/mocker";
import { useCallback, useContext, useEffect, useRef } from "react";
import { wishlist } from "welpodron.wishlist";
import "welpodron.wishlist/css/wishlist/style.css";

export const WishlistPreview = () => {
  const mockerInstance = useRef<Mocker | undefined>();
  const wishlistInstance = useRef<wishlist | undefined>();

  useEffect(() => {
    if (!mockerInstance.current) {
      mockerInstance.current = new Mocker();
    }

    wishlistInstance.current = new wishlist({ sessid: "", items: ["1"] });

    mockerInstance.current.init();
    mockerInstance.current.addMock({
      url: "/bitrix/services/main/ajax.php?action=welpodron%3Awishlist.Receiver.toggle",
      controller: (params) =>
        new Promise((resolve) => {
          if (params?.body && params.body instanceof FormData) {
            console.log(Object.fromEntries(params.body))
          }

          setTimeout(
            () =>
              resolve(
                new Response(
                  JSON.stringify({
                    status: "success",
                    data: {
                      PRODUCT_ID: 1,
                      IN_WISHLIST: true,
                      WISHLIST_COUNTER: 19,
                    },
                  }),
                  { status: 200 }
                )
              ),
            1500
          );
        }),
    });

    return () => {
      mockerInstance.current?.destroy();
      wishlistInstance.current?.destroy();
    };
  }, []);

  return (
    <Preview>
      <div className="p-4 rounded border border-slate-800 bg-slate-900 text-slate-100">
        <p
          data-w-wishlist-link=""
          className="px-4 py-2 rounded border border-slate-700 bg-slate-800 flex items-center font-medium justify-between w-full"
        >
          Счетчик
          <span data-w-wishlist-link-counter="">0</span>
        </p>
        <button
          type="button"
          className="disabled:opacity-90 disabled:cursor-progress mt-2 px-4 py-2 rounded border border-slate-700 bg-slate-800 flex items-center font-medium justify-between w-full"
          data-w-wishlist-control=""
          data-w-wishlist-action="toggle"
          data-w-wishlist-action-args="1"
        >
          <span data-w-wishlist-control-label="">В избранное</span>
        </button>
      </div>
    </Preview>
  );
};
