import { createEffect, createSignal } from "solid-js";

import "./formatter.scss";

// TODO: make this do something

export default (language: "js" | "json") => {
    return () => {
        return (
            <section class="section split">
                <div class="code"></div>
                <div class="code"></div>
            </section>
        );
    };
};
