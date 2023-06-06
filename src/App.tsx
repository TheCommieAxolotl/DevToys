import { For, Show, createSignal } from "solid-js";
import { invoke } from "@tauri-apps/api";

import PanelButton from "~/components/PanelButton";
import ContextMenu from "~/components/ContextMenu";
import Alert from "./components/Alert";

import { Categories, Tools } from "~/tools";
import * as tools from "~/tools/components";

import "./app.scss";

export default () => {
    const [selectedUtility, setSelectedUtility] = createSignal<"" | keyof typeof import("./tools/components/index")>("");
    const [sidebar, setSidebar] = createSignal(true);
    const [pinned, setPinned] = createSignal(false);

    return (
        <>
            <div id="window-control">
                <div class="buttons">
                    <div id="close" onClick={() => window.Current.hide()}></div>
                    <div id="minimize" onClick={() => window.Current.minimize()}></div>
                    <div id="maximize" onClick={() => window.Current.maximize()}></div>
                </div>
                <PanelButton
                    icon="􀏚"
                    action={() => {
                        setSidebar((s) => !s);
                    }}
                />
            </div>
            <div class="app">
                <aside classList={{ sidebar: true, active: sidebar() }}>
                    <div
                        classList={{
                            "sidebar-item": true,
                            selected: selectedUtility() === "",
                        }}
                        onClick={() => {
                            setSelectedUtility("");
                        }}
                    >
                        <div class="icon">{"􀕮"}</div>
                        All Utilities
                    </div>
                    <For each={Categories}>
                        {(category) => {
                            const toolsInCategory = Tools.filter((tool) => tool.category === category.id);

                            return (
                                <>
                                    <h3 class="sidebar-category">{category.name}</h3>
                                    <For each={toolsInCategory}>
                                        {(tool) => {
                                            return (
                                                <div
                                                    classList={{
                                                        "sidebar-item": true,
                                                        selected: selectedUtility() === tool.component,
                                                    }}
                                                    onClick={() => {
                                                        setSelectedUtility(tool.component);
                                                    }}
                                                >
                                                    <div class="icon">{tool.icon}</div>
                                                    {tool.name}
                                                </div>
                                            );
                                        }}
                                    </For>
                                </>
                            );
                        }}
                    </For>
                </aside>
                <main classList={{ content: true, "sidebar-active": sidebar() }}>
                    <header class="titlebar" data-tauri-drag-region>
                        <Show
                            when={selectedUtility()}
                            fallback={
                                <>
                                    <ContextMenu
                                        menu={(hide) => {
                                            return Tools.map((tool) => {
                                                return (
                                                    <ContextMenu.Item
                                                        action={() => {
                                                            setSelectedUtility(tool.component);
                                                            hide();
                                                        }}
                                                    >
                                                        <div class="icon">{tool.icon}</div> {tool.name}
                                                    </ContextMenu.Item>
                                                );
                                            });
                                        }}
                                    >
                                        <h1>All Utilities</h1>
                                    </ContextMenu>
                                </>
                            }
                        >
                            <div class="icon">{Tools.find((tool) => tool.component === selectedUtility())?.icon}</div>
                            <ContextMenu
                                menu={(hide) => {
                                    let i = false;

                                    return Categories.map((cat) => {
                                        return (
                                            <>
                                                {(() => {
                                                    const pre = i;
                                                    i = true;
                                                    return pre;
                                                })() ? (
                                                    <ContextMenu.Separator />
                                                ) : null}
                                                <For each={Tools.filter((tool) => tool.category === cat.id)}>
                                                    {(tool) => (
                                                        <ContextMenu.Item
                                                            action={() => {
                                                                setSelectedUtility(tool.component);
                                                                hide();
                                                            }}
                                                        >
                                                            <div class="icon">{tool.icon}</div> {tool.name}
                                                        </ContextMenu.Item>
                                                    )}
                                                </For>
                                            </>
                                        );
                                    });
                                }}
                            >
                                <h1>{Tools.find((tool) => tool.component === selectedUtility())?.name}</h1>
                            </ContextMenu>
                        </Show>
                        <div class="right">
                            <PanelButton
                                active={pinned()}
                                icon={pinned() ? "􀎧" : "􀎦"}
                                action={async () => {
                                    setPinned((p) => !p);

                                    await invoke("set_pin", { value: pinned() });
                                }}
                            />
                        </div>
                    </header>
                    <Show
                        when={selectedUtility()}
                        fallback={
                            <>
                                <div class="util-grid">
                                    <For each={Tools}>
                                        {(tool) => (
                                            <div
                                                classList={{
                                                    "util-item": true,
                                                }}
                                                onClick={() => {
                                                    setSelectedUtility(tool.component);
                                                }}
                                            >
                                                <div class="icon">{tool.icon}</div>
                                                <div class="name">
                                                    {Categories.find((c) => c.id === tool.category)?.name} • {tool.name}
                                                </div>
                                            </div>
                                        )}
                                    </For>
                                </div>
                                <div class="footer">
                                    <Alert>
                                        You can show or hide this window at any time by pressing <kbd>{window.Global?.platform === "macos" ? "􀆕" : "Alt"}</kbd> + <kbd>Space</kbd>
                                    </Alert>
                                </div>
                            </>
                        }
                    >
                        {tools[selectedUtility() as keyof typeof tools]()}
                    </Show>
                </main>
            </div>
        </>
    );
};
