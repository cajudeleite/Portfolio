import { StrangeAttractorProps } from "../types/attractor";

export const aizawa: StrangeAttractorProps = {
    name: "Aizawa",
    strokeColor: [202, 94, 4],
    scale: [179, 269],
    dx(x, y, z) {
        return (z - 0.7) * x - 3.5 * y;
    },
    dy(x, y, z) {
        return 3.5 * x + (z - 0.7) * y;
    },
    dz(x, y, z) {
        return 0.6 + 0.95 * z - (z * z * z) / 3 - (x * x + y * y) * (1 + 0.25 * z) + 0.1 * z * x * x * x;
    },
}

export const lorenz: StrangeAttractorProps = {
    name: "Lorenz",
    strokeColor: [57, 155, 27],
    scale: [11, 17],
    dx(x, y, z) {
        return 10 * (y - x);
    },
    dy(x, y, z) {
        return (x * (28 - z) - y);
    },
    dz(x, y, z) {
        return (x * y - (8 / 3) * z)
    },
}

export const noseHoover: StrangeAttractorProps = {
    name: "Nose Hoover",
    strokeColor: [202, 94, 4],
    scale: [50, 100],
    dx(x, y, z) {
        return y;
    },
    dy(x, y, z) {
        return (-x + y * z);
    },
    dz(x, y, z) {
        return (1.5 - y ** 2);
    },
}