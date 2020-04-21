import { Dogs } from './dogs';

export interface DogType {
    id: number,
    breed: string;
    lifeExpectancy: number;
    size: number;
    dogs: Dogs[];
}