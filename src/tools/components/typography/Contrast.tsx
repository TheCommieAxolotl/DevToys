import { Show, createEffect, createSignal } from "solid-js";
import Color from "colorjs.io";

import TextInput from "~/components/TextInput";
import Alert from "~/components/Alert";

import { passesContrast } from "~/tools/lib/colors/contrast";

import "./contrast.scss";

export default () => {
    const [background, setBackground] = createSignal("rgb(255 255 255)");
    const [bgHex, setBgHex] = createSignal("#ffffff");
    const [foreground, setForeground] = createSignal("rgb(0 0 0)");
    const [fgHex, setFgHex] = createSignal("#000000");

    const [passesSmall, setPassesSmall] = createSignal<"AA" | "AAA" | false>(false);
    const [passesBig, setPassesBig] = createSignal<"AA" | "AAA" | false>(false);

    createEffect(() => {
        setBgHex(new Color(background()).toString({ format: "hex", collapse: false }));
        setFgHex(new Color(foreground()).toString({ format: "hex", collapse: false }));

        setPassesBig(passesContrast(18, background(), foreground()));
        setPassesSmall(passesContrast(12, background(), foreground()));
    });

    return (
        <section class="section split" id="contrast">
            <div class="control split">
                <div>
                    <label for="color-bg">Background Color</label>
                    <input type="color" id="color-bg" value={bgHex().substring(0, 7)} onChange={(e) => setBackground(e.currentTarget.value)} />
                </div>
                <div>
                    <label for="color-fg">Foreground Color</label>
                    <input type="color" id="color-fg" value={fgHex().substring(0, 7)} onChange={(e) => setForeground(e.currentTarget.value)} />
                </div>
                <div class="inputs-vertical">
                    <label for="color-bg-in">Background Color</label>
                    <TextInput id="color-bg-in" value={background()} onChange={setBackground} />
                    <label for="color-fg-in">Foreground Color</label>
                    <TextInput id="color-fg-in" value={foreground()} onChange={setForeground} />
                </div>
            </div>
            <div class="preview">
                <div class="color-preview" style={{ background: background(), color: foreground() }}>
                    <div class="color-preview-text">
                        <Show when={passesBig()} fallback={<div class="color-preview-result fails">{"􀆄"}</div>}>
                            <div class="color-preview-result passes">
                                <div class="color-preview-result-text">{passesBig()}</div>
                                {"􀆅"}
                            </div>
                        </Show>
                        <div class="big">Big Text!!!</div>
                    </div>
                    <div class="color-preview-text">
                        <Show when={passesSmall()} fallback={<div class="color-preview-result fails">{"􀆄"}</div>}>
                            <div class="color-preview-result passes">
                                <div class="color-preview-result-text">{passesSmall()}</div>
                                {"􀆅"}
                            </div>
                        </Show>
                        <div class="small">Small Text!</div>
                    </div>
                </div>
                <Alert type="info">A minimum contrast ratio of 4.5:1 is required for normal text, and 3:1 for large text.</Alert>
                <Show
                    when={(() => {
                        try {
                            const bg = new Color(background());
                            const fg = new Color(foreground());

                            console.log(bg.alpha, fg.alpha);

                            return bg.alpha !== 1 || fg.alpha !== 1;
                        } catch {
                            return false;
                        }
                    })()}
                >
                    <Alert type="warning">Heads up! Checking contrast on a transparent background or foreground color is not supported yet.</Alert>
                </Show>
            </div>
        </section>
    );
};
