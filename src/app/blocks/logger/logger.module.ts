/**
 * Initial module created by John Papa at: https://github.com/johnpapa/generator-hottowel
 */

export class Logger {
  showToasts: boolean = true;

  constructor(private $log: ng.ILogService, private toastr: any) { 'ngInject'; }

  // straight to console; bypass toastr
  log(...args: any[]) {
    this.$log.log(args);
  }

  error(message: string, data?: any, title?: string) {
    this.toastr.error(message, title);
    this.$log.error('Error: ' + message, '\nSummary:', title, '\nDetails:', data);
  }

  info(message: string, data?: any, title?: string) {
    this.toastr.info(message, title);
    this.$log.info('Error: ' + message, '\nSummary:', title, '\nDetails:', data);
  }

  success(message: string, data?: any, title?: string) {
    this.toastr.success(message, title);
    this.$log.info('Error: ' + message, '\nSummary:', title, '\nDetails:', data);
  }

  warning(message: string, data?: any, title?: string) {
    this.toastr.warning(message, title);
    this.$log.warn('Error: ' + message, '\nSummary:', title, '\nDetails:', data);
  }
}

export default angular.module('blocks.logger', ['toastr'])
  .service('logger', Logger)
  .name;
