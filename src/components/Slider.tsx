import "./slider.scss";

export default (props: { id: string; value: number; onChange: (value: number) => void; min?: number; max?: number; step?: number; disabled?: boolean; autofocus?: boolean }) => {
    return (
        <div class="slider">
            <input
                id={props.id}
                type="range"
                min={props.min ?? 0}
                max={props.max ?? 100}
                step={props.step ?? 1}
                value={props.value}
                onInput={(e) => props.onChange(e.currentTarget.valueAsNumber)}
                disabled={props.disabled}
                autofocus={props.autofocus}
            />
        </div>
    );
};
