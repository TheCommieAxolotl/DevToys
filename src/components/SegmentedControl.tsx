import { For, createSignal } from "solid-js";

import "./segmentedcontrol.scss";

export default <T,>(props: {
    id: string;
    options: {
        label: string;
        value: T;
    }[];
    value: T;
    onChange: (value: T) => void;
}) => {
    const [selected, setSelected] = createSignal<T>(props.value);

    return (
        <div class="segmented-control">
            <For each={props.options}>
                {(option) => (
                    <button
                        classList={{
                            "segmented-control-item": true,
                            selected: option.value === selected(),
                        }}
                        onClick={() => {
                            setSelected(() => option.value);

                            props.onChange(option.value);
                        }}
                    >
                        {option.label}
                    </button>
                )}
            </For>
        </div>
    );
};
