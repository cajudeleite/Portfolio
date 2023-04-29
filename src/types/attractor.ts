export interface StrangeAttractorProps {
    name: string,
    strokeColor: [number, number, number],
    scale: [number, number],
    dx: (x: number, y: number, z: number) => number,
    dy: (x: number, y: number, z: number) => number,
    dz: (x: number, y: number, z: number) => number,
}