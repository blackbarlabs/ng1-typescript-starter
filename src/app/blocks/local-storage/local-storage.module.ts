/**
 * this module is a thin wrapper around $window.localStorage to add types and enable easier test mock injection
 */

  // allows service to be injected into angular.config blocks
export class LocalStorageProvider {
  $get($window: any) {
    'ngInject';
    return new LocalStorageService($window);
  }
}

export class LocalStorageService {
  localStorage: any;

  constructor($window: any) {
    this.localStorage = $window.localStorage;
  }

  getItem(key: string): any { return JSON.parse(this.localStorage.getItem(key)); }

  setItem(key: string, value: any): boolean {
    this.localStorage.setItem(key, JSON.stringify(value));
    return true;
  }

  removeItem(key: string): boolean {
    this.localStorage.removeItem(key);
    return true;
  }
}

export default angular.module('localStorageModule', [])
  .provider('localStorage', LocalStorageProvider)
  .name;
