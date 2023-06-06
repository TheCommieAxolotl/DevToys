import { JSX, Show, createEffect, createSignal, onCleanup, onMount } from "solid-js";
import { Portal } from "solid-js/web";

import "./contextmenu.scss";

export const ContextMenu = (props: { trigger?: "click" | "contextmenu"; menu: (hide: () => void) => JSX.Element | JSX.Element[]; children: JSX.Element | JSX.Element[] }) => {
    const [wrapperRef, setWrapperRef] = createSignal<HTMLElement | null>(null);
    const [menuRef, setMenuRef] = createSignal<HTMLElement | null>(null);

    const [visible, setVisible] = createSignal(false);
    const [x, setX] = createSignal(0);
    const [y, setY] = createSignal(0);

    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef() === event.target || wrapperRef() === event.target) {
            return;
        }

        if (wrapperRef()?.contains(event.target as Node) || menuRef()?.contains(event.target as Node)) {
            return;
        }

        hide();
    };

    const hide = () => {
        setVisible(false);
    };

    const handleTriggerEvent = (event: MouseEvent) => {
        event.stopPropagation();
        event.preventDefault();

        setX(event.clientX);
        setY(event.clientY);

        setVisible(true);
    };

    createEffect(() => {
        const menuHeight = menuRef()?.offsetHeight || 0;
        const windowHeight = window.innerHeight;

        const menuWidth = menuRef()?.offsetWidth || 0;
        const windowWidth = window.innerWidth;

        if (y() + menuHeight > windowHeight - 10) {
            setY((v) => v - (v + menuHeight - windowHeight) - 10);
        }

        if (x() + menuWidth > windowWidth - 10) {
            setX((v) => v - (v + menuWidth - windowWidth) - 10);
        }

        if (visible()) {
            document.addEventListener("mousedown", handleClickOutside);
            document.addEventListener(props.trigger || "contextmenu", hide);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener(props.trigger || "contextmenu", hide);
        }

        wrapperRef()?.addEventListener(props.trigger || "contextmenu", handleTriggerEvent);
    });

    return (
        <>
            <Portal mount={document.getElementById("menu-container") || document.body}>
                <Show when={visible()}>
                    <div class="context-menu-container" ref={setMenuRef} style={{ "--x": x() + "px", "--y": y() + "px" }}>
                        <div class="context-menu">{props.menu(hide)}</div>
                    </div>
                </Show>
            </Portal>
            <div class="context-menu-wrapper" ref={setWrapperRef}>
                {props.children}
            </div>
        </>
    );
};

export const ContextMenuItem = (props: { action: () => void; type?: "danger" | "default"; children: JSX.Element | JSX.Element[] }) => {
    return (
        <div
            classList={{
                "context-menu-item": true,
                danger: props.type === "danger",
            }}
            onClick={props.action}
        >
            <div class="content">{props.children}</div>
        </div>
    );
};

export const ContextMenuSeparator = () => {
    return <div class="context-menu-separator"></div>;
};

ContextMenu.Item = ContextMenuItem;
ContextMenu.Separator = ContextMenuSeparator;

export default ContextMenu;
