((window) => {
  if (window.welpodron && window.welpodron.animate) {
    //! TODO: v3 Добавить поддержку событий
    //! TODO: v3 Добавить поддержку стрелок
    //! TODO: Возможно стоит https://css-tricks.com/how-to-animate-the-details-element/

    if (window.welpodron.tabs) {
      return;
    }

    const MODULE_BASE = "tabs";

    const ATTRIBUTE_BASE = `data-w-${MODULE_BASE}`;
    const ATTRIBUTE_BASE_ID = `${ATTRIBUTE_BASE}-id`;
    const ATTRIBUTE_ITEM = `${ATTRIBUTE_BASE}-item`;
    const ATTRIBUTE_ITEM_ID = `${ATTRIBUTE_ITEM}-id`;
    const ATTRIBUTE_ITEM_ACTIVE = `${ATTRIBUTE_ITEM}-active`;
    const ATTRIBUTE_CONTROL = `${ATTRIBUTE_BASE}-control`;
    const ATTRIBUTE_CONTROL_ACTIVE = `${ATTRIBUTE_CONTROL}-active`;
    const ATTRIBUTE_ACTION = `${ATTRIBUTE_BASE}-action`;
    const ATTRIBUTE_ACTION_ARGS = `${ATTRIBUTE_ACTION}-args`;
    const ATTRIBUTE_ACTION_FLUSH = `${ATTRIBUTE_ACTION}-flush`;

    type TabsConfigType = {};

    type TabsPropsType = {
      element: HTMLElement;
      config?: TabsConfigType;
    };

    type TabsItemConfigType = {};

    type TabsItemPropsType = {
      element: HTMLElement;
      tabs: Tabs;
      config?: TabsItemConfigType;
    };

    // data-tabs-id
    // data-tabs-item-id
    // data-tabs-item-active
    class TabsItem {
      supportedActions = ["hide", "show"];

      tabs: Tabs;

      element: HTMLElement;

      animation: {
        promise: Promise<unknown> & {
          resolve: (value?: unknown | PromiseLike<unknown>) => void;
        };
        timer: number;
      } | null = null;

      constructor({ element, tabs, config = {} }: TabsItemPropsType) {
        this.element = element;
        this.tabs = tabs;
      }

      show = async ({ args, event }: { args?: unknown; event?: Event }) => {
        if (this.animation) {
          window.clearTimeout(this.animation.timer);
        }

        if (this.element.getAttribute(ATTRIBUTE_ITEM_ACTIVE) != null) {
          return;
        }

        this.element.setAttribute(ATTRIBUTE_ITEM_ACTIVE, "");

        const controls = document.querySelectorAll(
          `[${ATTRIBUTE_ACTION_ARGS}="${this.element.getAttribute(
            `${ATTRIBUTE_ITEM_ID}`
          )}"]`
        );

        controls.forEach((control) => {
          control.setAttribute(ATTRIBUTE_CONTROL_ACTIVE, "");
        });

        this.element.style.opacity = `0`;
        // Магичесий хак
        this.element.scrollHeight;

        this.animation = window.welpodron.animate({
          element: this.element,
          callback: () => {
            this.element.style.opacity = `1`;
          },
        });

        await this.animation?.promise;

        this.element.style.removeProperty("opacity");

        this.animation = null;
      };

      hide = async ({ args, event }: { args?: unknown; event?: Event }) => {
        if (this.animation) {
          window.clearTimeout(this.animation.timer);
        }

        if (this.element.getAttribute(ATTRIBUTE_ITEM_ACTIVE) == null) {
          return;
        }

        this.animation = window.welpodron.animate({
          element: this.element,
          callback: () => {
            this.element.removeAttribute(ATTRIBUTE_ITEM_ACTIVE);

            const controls = document.querySelectorAll(
              `[${ATTRIBUTE_ACTION_ARGS}="${this.element.getAttribute(
                `${ATTRIBUTE_ITEM_ID}`
              )}"]`
            );

            controls.forEach((control) => {
              control.removeAttribute(ATTRIBUTE_CONTROL_ACTIVE);
            });
          },
        });

        await this.animation?.promise;

        this.animation = null;
      };
    }

    class Tabs {
      supportedActions = ["show"];

      element: HTMLElement;

      _items: TabsItem[] = [];

      constructor({ element, config = {} }: TabsPropsType) {
        this.element = element;

        document.removeEventListener("click", this.handleDocumentClick);
        document.addEventListener("click", this.handleDocumentClick);
      }

      handleDocumentClick = (event: MouseEvent) => {
        let { target } = event;

        if (!target) {
          return;
        }

        target = (target as Element).closest(
          `[${ATTRIBUTE_BASE_ID}="${this.element.getAttribute(
            `${ATTRIBUTE_BASE_ID}`
          )}"][${ATTRIBUTE_CONTROL}][${ATTRIBUTE_ACTION}]`
        );

        if (!target) {
          return;
        }

        const action = (target as Element).getAttribute(
          ATTRIBUTE_ACTION
        ) as keyof this;

        const actionArgs = (target as Element).getAttribute(
          ATTRIBUTE_ACTION_ARGS
        );

        const actionFlush = (target as Element).getAttribute(
          ATTRIBUTE_ACTION_FLUSH
        );

        if (!actionFlush) {
          event.preventDefault();
        }

        if (!action || !this.supportedActions.includes(action as string)) {
          return;
        }

        const actionFunc = this[action] as any;

        if (actionFunc instanceof Function) {
          return actionFunc({
            args: actionArgs,
            event,
          });
        }
      };

      show = async ({ args, event }: { args?: unknown; event?: Event }) => {
        if (!args) {
          return;
        }

        const tabsId = this.element.getAttribute(ATTRIBUTE_BASE_ID);

        if (!tabsId) {
          return;
        }

        const items = this.element.querySelectorAll(
          `[${ATTRIBUTE_BASE_ID}="${tabsId}"][${ATTRIBUTE_ITEM_ID}]`
        );

        if (!items) {
          return;
        }

        const item = [...items].find((element) => {
          return element.getAttribute(ATTRIBUTE_ITEM_ID) === args;
        });

        if (!item) {
          return;
        }

        for (let _item of this._items) {
          if (_item.animation) {
            window.clearTimeout(_item.animation.timer);
          }
        }

        this._items = [...items].map((element) => {
          return new TabsItem({
            element: element as HTMLElement,
            tabs: this,
          });
        });

        const promises = [];

        for (let _item of this._items) {
          if (_item.element === item) {
            promises.push(_item.show({ args, event }));
          } else {
            promises.push(_item.hide({ args, event }));
          }
        }

        await Promise.allSettled(promises);
      };
    }

    window.welpodron.tabs = Tabs;
  }
})(window);
