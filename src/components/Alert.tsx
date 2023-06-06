import { JSX, Show } from "solid-js";

import "./alert.scss";

export default (props: { type?: "info" | "warning" | "error"; children: JSX.Element | JSX.Element[] }) => {
    return (
        <div classList={{ alert: true, warning: props.type === "warning", error: props.type === "error" }}>
            <div class="icon">
                <Show when={props.type === "info" || !props.type}>{"􀅴"}</Show>
                <Show when={props.type === "warning"}>{"􀇾"}</Show>
                <Show when={props.type === "error"}>{"􀅎"}</Show>
            </div>
            <p>{props.children}</p>
        </div>
    );
};
