export const guidRegex: RegExp = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export class Guid {
  constructor(private $window: ng.IWindowService) { 'ngInject'; }

  isGuid(text: string): boolean {
    return guidRegex.test(text.toString());
  }

  isEmpty(text: string): boolean {
    return text.toString() === '00000000-0000-0000-0000-000000000000';
  }

  isGuidAndNotEmpty(text: string): boolean {
    return !!text && this.isGuid(text) && !this.isEmpty(text);
  }

  // todo: add enforceCanonicalForm()

  /* tslint:disable:no-bitwise */
  generate(): string {
    let $window = this.$window;

    // use crypto.getRandomValues if available
    if ($window.crypto && $window.crypto.getRandomValues && $window.crypto.getRandomValues.constructor === Function) {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c: string) {
        let r = crypto.getRandomValues(new Uint8Array(1))[0] % 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }

    // fall back to Math.random
    let d = new Date().getTime();
    if ($window.performance && $window.performance.now && $window.performance.now.constructor === Function) {
      d += performance.now(); // use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c: string) {
      let r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }

  /* tslint:enable:no-bitwise */
}

export default angular.module('blocks.guid', [])
  .constant('guidRegex', guidRegex)
  .service('guid', Guid)
  .name;
