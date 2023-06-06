import FontPreview from "./typography/FontPreview";
import NumberBase from "./convert/NumberBase";
import Contrast from "./typography/Contrast";
import formatter from "./format/formatter";
import Hash from "./convert/Hash";

import "./index.scss";

export const numberBase = NumberBase;
export const hash = Hash;

export const fontPreview = FontPreview;
export const contrast = Contrast;

export const formatJSON = formatter("json");
export const formatJS = formatter("js");
