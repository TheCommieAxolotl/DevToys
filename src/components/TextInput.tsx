import { Show, JSX } from "solid-js";

import "./textinput.scss";

export default (props: { inputType?: "text" | "number"; icon?: string; value: number | string; onChange: (value: string) => void; placeholder?: string; autofocus?: boolean; id: string }) => {
    return (
        <div class="textinput">
            <Show when={props.icon}>
                <div class="icon">{props.icon}</div>
            </Show>
            <input
                id={props.id}
                type={props.inputType ?? "text"}
                placeholder={props.placeholder}
                value={props.value}
                onInput={(e) => props.onChange(e.currentTarget.value)}
                autofocus={props.autofocus}
            />
            <Show when={props.value}>
                <button aria-label="Clear Text" class="clear-button" onClick={() => props.onChange("")}>
                    {"􀁡"}
                </button>
            </Show>
        </div>
    );
};
