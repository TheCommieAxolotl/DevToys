import { JSX, Show, Suspense, createEffect, createResource, createSignal } from "solid-js";

import { createStarryNight, all, Root } from "@wooorm/starry-night";
import { toHtml } from "hast-util-to-html";

import "./codeblock.scss";

export interface CodeblockProps {
    style?: JSX.CSSProperties;
    code: string;
    language: string;
    filename?: string;
}

const makeScope = (lang: string) => {
    return `source.${lang}`;
};

const trim = (str: string) => {
    return str.replace(/^[\s\n]+|[\s\n]+$/g, "");
};

let highlighter: null | Awaited<ReturnType<typeof createStarryNight>> = null;

export default (props: CodeblockProps) => {
    const [code, setCode] = createSignal<string | Root>(props.code);

    createResource(async () => {
        console.log("Loading codeblock", props.code);

        if (!highlighter) {
            highlighter = await createStarryNight(all);
        }

        setCode(highlighter.highlight(trim(props.code), makeScope(props.language)));
    });

    return (
        <div class="codeblock" style={props.style}>
            <Show when={props.filename && props.language}>
                <div class="codeblock-header">
                    <Show when={props.filename}>
                        <span class="codeblock-filename">{props.filename}</span>
                    </Show>
                    <Show when={props.language}>
                        <span class="codeblock-language">{props.language}</span>
                    </Show>
                </div>
            </Show>
            <div class="codeblock-content">
                <Suspense fallback={<div class="codeblock-content-inner">{trim(props.code)}</div>}>
                    <div
                        class="codeblock-content-inner"
                        innerHTML={
                            typeof code() === "string"
                                ? trim(code() as string)
                                : toHtml(
                                      (code() as Root) || {
                                          type: "root",
                                          children: [],
                                      }
                                  )
                        }
                    ></div>
                </Suspense>
            </div>
        </div>
    );
};
