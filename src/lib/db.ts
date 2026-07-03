import Dexie, { Table } from 'dexie';
import { Workout } from '../types/workout';
import { UserProfile, DBTemplate } from '../types/database.types';

export class IronLogDB extends Dexie {
  workouts!: Table<Workout, string>;
  templates!: Table<DBTemplate, string>;
  profile!: Table<UserProfile, string>;

  constructor() {
    super('IronLogDB');
    this.version(1).stores({
      workouts: 'id, date, name', // Primary key and indexed props
      templates: 'id, name',
      profile: 'id'
    });
  }
}

export const db = new IronLogDB();
