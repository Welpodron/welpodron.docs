"use strict";
((window) => {
    if (window.welpodron && window.welpodron.animate) {
        if (window.welpodron.collapse) {
            return;
        }
        //! TODO: Возможно стоит https://css-tricks.com/how-to-animate-the-details-element/
        const MODULE_BASE = "collapse";
        const ATTRIBUTE_BASE = `data-w-${MODULE_BASE}`;
        const ATTRIBUTE_BASE_ID = `${ATTRIBUTE_BASE}-id`;
        const ATTRIBUTE_BASE_ACTIVE = `${ATTRIBUTE_BASE}-active`;
        const ATTRIBUTE_CONTROL = `${ATTRIBUTE_BASE}-control`;
        const ATTRIBUTE_CONTROL_ACTIVE = `${ATTRIBUTE_CONTROL}-active`;
        const ATTRIBUTE_ACTION = `${ATTRIBUTE_BASE}-action`;
        const ATTRIBUTE_ACTION_ARGS = `${ATTRIBUTE_ACTION}-args`;
        const ATTRIBUTE_ACTION_FLUSH = `${ATTRIBUTE_ACTION}-flush`;
        class Collapse {
            supportedActions = ["hide", "show", "toggle"];
            element;
            animation = null;
            constructor({ element, config = {} }) {
                this.element = element;
                document.removeEventListener("click", this.handleDocumentClick);
                document.addEventListener("click", this.handleDocumentClick);
            }
            handleDocumentClick = (event) => {
                let { target } = event;
                if (!target) {
                    return;
                }
                target = target.closest(`[${ATTRIBUTE_BASE_ID}="${this.element.getAttribute(`${ATTRIBUTE_BASE_ID}`)}"][${ATTRIBUTE_CONTROL}][${ATTRIBUTE_ACTION}]`);
                if (!target) {
                    return;
                }
                const action = target.getAttribute(ATTRIBUTE_ACTION);
                const actionArgs = target.getAttribute(ATTRIBUTE_ACTION_ARGS);
                const actionFlush = target.getAttribute(ATTRIBUTE_ACTION_FLUSH);
                if (!actionFlush) {
                    event.preventDefault();
                }
                if (!action || !this.supportedActions.includes(action)) {
                    return;
                }
                const actionFunc = this[action];
                if (actionFunc instanceof Function) {
                    return actionFunc({
                        args: actionArgs,
                        event,
                    });
                }
            };
            show = async ({ args, event }) => {
                if (this.animation) {
                    window.clearTimeout(this.animation.timer);
                }
                if (this.element.getAttribute(ATTRIBUTE_BASE_ACTIVE) != null) {
                    return;
                }
                const controls = document.querySelectorAll(`[${ATTRIBUTE_BASE_ID}="${this.element.getAttribute(`${ATTRIBUTE_BASE_ID}`)}"][${ATTRIBUTE_CONTROL}][${ATTRIBUTE_ACTION}]`);
                controls.forEach((control) => {
                    control.setAttribute(ATTRIBUTE_CONTROL_ACTIVE, "");
                });
                this.element.style.height = `0px`;
                this.element.setAttribute(ATTRIBUTE_BASE_ACTIVE, "");
                // Магичесий хак
                this.element.scrollHeight;
                this.animation = window.welpodron.animate({
                    element: this.element,
                    callback: () => {
                        this.element.style.height = this.element.scrollHeight + "px";
                    },
                });
                await this.animation?.promise;
                this.element.style.removeProperty("height");
                this.animation = null;
            };
            hide = async ({ args, event }) => {
                if (this.animation) {
                    window.clearTimeout(this.animation.timer);
                }
                if (this.element.getAttribute(ATTRIBUTE_BASE_ACTIVE) == null) {
                    return;
                }
                this.element.style.height = this.element.scrollHeight + "px";
                this.element.style.display = "block";
                this.animation = window.welpodron.animate({
                    element: this.element,
                    callback: () => {
                        this.element.style.height = this.element.scrollHeight + "px";
                        this.element.removeAttribute(ATTRIBUTE_BASE_ACTIVE);
                        const controls = document.querySelectorAll(`[${ATTRIBUTE_BASE_ID}="${this.element.getAttribute(`${ATTRIBUTE_BASE_ID}`)}"][${ATTRIBUTE_CONTROL}][${ATTRIBUTE_ACTION}]`);
                        controls.forEach((control) => {
                            control.removeAttribute(ATTRIBUTE_CONTROL_ACTIVE);
                        });
                        this.element.style.height = `0px`;
                    },
                });
                await this.animation?.promise;
                this.element.style.removeProperty("display");
                this.element.style.removeProperty("height");
                this.animation = null;
            };
            toggle = async ({ args, event }) => {
                if (this.animation) {
                    window.clearTimeout(this.animation.timer);
                }
                return this.element.getAttribute(ATTRIBUTE_BASE_ACTIVE) != null
                    ? this.hide({ args, event })
                    : this.show({ args, event });
            };
        }
        window.welpodron.collapse = Collapse;
    }
})(window);
//# sourceMappingURL=script.js.map