import { createSignal } from "solid-js";

import SegmentedControl from "~/components/SegmentedControl";
import TextInput from "~/components/TextInput";

import "./numberbase.scss";

export default () => {
    const [inputBase, setInputBase] = createSignal(10);
    const [source, setSource] = createSignal(0);

    return (
        <section class="section split" id="number-base">
            <div class="control">
                <label for="number">Number (Base 10)</label>
                <TextInput id="number" value={source()} onChange={(s) => setSource(Number(s))} />
                <label for="input-base">Input Base</label>
                <SegmentedControl
                    id="input-base"
                    options={[
                        { label: "Binary", value: 2 },
                        { label: "Octal", value: 8 },
                        { label: "Decimal", value: 10 },
                        { label: "Hexadecimal", value: 16 },
                    ]}
                    value={inputBase()}
                    onChange={setInputBase}
                />
            </div>
            <div class="preview">
                <div class="preview-result">
                    <label for="binary">Binary (Base 2)</label>
                    <div id="binary" class="preview-result-text">
                        {source().toString(2)}
                    </div>
                </div>
                <div class="preview-result">
                    <label for="octal">Octal (Base 8)</label>
                    <div id="octal" class="preview-result-text">
                        {source().toString(8)}
                    </div>
                </div>
                <div class="preview-result">
                    <label for="hex">Hexadecimal (Base 16)</label>
                    <div id="hex" class="preview-result-text">
                        {source().toString(16)}
                    </div>
                </div>
            </div>
        </section>
    );
};
