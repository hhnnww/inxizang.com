import OpenCC from "opencc-js";

const toTraditionalConverter = OpenCC.Converter({ from: "cn", to: "tw" });

export function toTraditional(text: string) {
	return toTraditionalConverter(text);
}
