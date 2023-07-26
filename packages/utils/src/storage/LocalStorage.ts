import { StorageService } from './storage';

export const Local = new StorageService(window.localStorage);
