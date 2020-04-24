import { TrickProgress } from './tricks-progress';

export interface Trick{
    id?: number;
    trickName: string;
    trickBenefit: number;
    diffculty: number;
    points: number;

    tricksProgress?: TrickProgress[];
}