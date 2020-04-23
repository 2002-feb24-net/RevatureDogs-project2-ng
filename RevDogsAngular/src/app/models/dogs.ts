import { DogType } from './dog-types';
import { Users } from './users';

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

    dogType?: DogType;
    user?: Users;
}