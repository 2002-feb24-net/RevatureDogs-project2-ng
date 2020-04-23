import { Dogs } from './dogs';

export interface Users{
    id?: number;
    userName: string;
    firstName: string;
    lastName: string;
    score?: number;
    dogs: Dogs[];
}