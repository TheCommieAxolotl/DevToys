import { createSignal } from "solid-js";

import Codeblock from "~/components/Codeblock";
import TextInput from "~/components/TextInput";
import Slider from "~/components/Slider";

import "./fontpreview.scss";

export default () => {
    const [font, setFont] = createSignal("");
    const [weight, setWeight] = createSignal(400);

    return (
        <section class="section split">
            <div class="control">
                <label for="font">Font Family</label>
                <TextInput id="font" value={font()} onChange={setFont} />
                <label for="weight">Font Weight ({weight()})</label>
                <Slider id="weight" value={weight()} onChange={setWeight} min={100} max={900} />
            </div>
            <div
                class="preview"
                style={{
                    "font-family": font(),
                    "font-weight": weight(),
                }}
            >
                This is what your font will look like when used in text! Isn't that cool?
                <p contentEditable>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas quis lacus sed elit efficitur porttitor blandit sed magna. Nullam sagittis libero et dui dictum cursus. Donec
                    lectus eros, suscipit non interdum eget, pretium eu lacus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In pulvinar molestie purus
                    ut gravida. Etiam consectetur auctor rutrum. Vivamus ultrices consequat egestas.
                </p>
                <Codeblock
                    style={{
                        "font-family": font(),
                    }}
                    code={`
// fancy some code?
export default function App() {
    return (
        <div>
            hello, world!
        </div>
    )
}
`.trim()}
                    language="tsx"
                />
            </div>
        </section>
    );
};
