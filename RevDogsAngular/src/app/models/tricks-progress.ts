import { Dogs } from './dogs';
import { Trick } from './tricks';

export interface TrickProgress{
    id?: number;
    petId: number;
    trickId: number;
    progress?: number;
    dog?: Dogs;
    trick?: Trick;
}