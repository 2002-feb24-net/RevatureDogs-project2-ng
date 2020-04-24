import { DogType } from './dog-types';
import { Users } from './users';
import { TrickProgress } from './tricks-progress';

export interface Dogs{
    id?: number;
    dogTypeId: number;
    userId: number;
    petName: string;
    hunger?: number;
    mood?: number;
    isAlive?: boolean;
    adoptionDate?: Date;
    age?: number;
    energy?: number;
    tricksProgress: TrickProgress[];
}