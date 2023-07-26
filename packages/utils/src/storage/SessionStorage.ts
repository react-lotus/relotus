import { StorageService } from './storage';

export const Session = new StorageService(window.sessionStorage);
