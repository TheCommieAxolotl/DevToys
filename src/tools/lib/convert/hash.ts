const crypto = new window.SubtleCrypto();

export const encrypt = async (input: string, key: CryptoKey, mode: "sha256") => {
    const inputData = new TextEncoder().encode(input);

    const hash = await crypto.encrypt({ name: mode }, key, inputData);

    return Array.from(new Uint8Array(hash))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
};

export const decrypt = async (input: string, key: CryptoKey, mode: "sha256") => {
    const inputData = new Uint8Array(input.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16)));

    const hash = await crypto.decrypt({ name: mode }, key, inputData);

    return new TextDecoder().decode(hash);
};
