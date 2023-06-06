import * as tools from "./components";

export const Categories = [
    {
        name: "Convert",
        id: "convert",
    },
    {
        name: "Typography",
        id: "typography",
    },
    {
        name: "Format",
        id: "format",
    },
    {
        name: "Generate",
        id: "generate",
    },
] as const;

export const Tools = [
    {
        icon: "􀡅",
        name: "JSON",
        category: "format",
        component: "formatJSON",
    },
    {
        icon: "􀌀",
        name: "JavaScript",
        category: "format",
        component: "formatJS",
    },
    {
        icon: "􀅒",
        name: "Font Preview",
        category: "typography",
        component: "fontPreview",
    },
    {
        icon: "􀀂",
        name: "Contrast",
        category: "typography",
        component: "contrast",
    },
    {
        icon: "􁓘",
        name: "Number Base",
        category: "convert",
        component: "numberBase",
    },
    {
        icon: "􀆃",
        name: "Hash",
        category: "convert",
        component: "hash",
    },
] satisfies {
    icon: string;
    name: string;
    category: (typeof Categories)[number]["id"];
    component: keyof typeof tools;
}[];
