import { DogType } from './dog-types';
import { Users } from './users';

export interface Dogs{
    id: number;
    dogTypeId: number;
    userId: number;
    isAliva: boolean;
    adoptionDate: Date;
    age: number;
    energy: number;

    dogType: DogType;
    user: Users;
}