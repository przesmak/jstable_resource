export function colorPicker(percentage) {
    const [r1, g1, b1] = [254, 251, 233];
    const [r2, g2, b2] = [155, 138, 196];

    const middleRange = Number(percentage) / 100;

    const r_new = r1 + (r2 - r1) * middleRange;
    const g_new = g1 + (g2 - g1) * middleRange;
    const b_new = b1 + (b2 - b1) * middleRange;

    return `rgb(${r_new}, ${g_new}, ${b_new})`;
}
