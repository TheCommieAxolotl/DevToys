import Color from "colorjs.io";

export const passesContrast = (contrastType: 12 | 18, color1: string, color2: string): "AA" | "AAA" | false => {
    const color1Obj = new Color(color1);
    const color2Obj = new Color(color2);

    const wcag21 = Color.contrastWCAG21(color1Obj, color2Obj);

    if (contrastType === 12) {
        return wcag21 >= 7 ? "AAA" : wcag21 >= 4.5 ? "AA" : false;
    }

    if (contrastType === 18) {
        return wcag21 >= 4.5 ? "AAA" : wcag21 >= 3 ? "AA" : false;
    }

    return false;
};
