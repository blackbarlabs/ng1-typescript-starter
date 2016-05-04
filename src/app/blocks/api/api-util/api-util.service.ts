import * as _ from 'lodash';

interface IMultipartResponse {
  location: string;
  statusCode: number;
  content: IMultipartContent[];
  plain?: Function;
}

interface IMultipartContent {
  eTag: string;
  location: string;
  currentLocation: string;
  lastModified: Date;
  statusCode: number;
  contentType: {
    CharSet: string;
    Parameters: string[];
    'MediaType': string;
  };
  content: any;
}

export class ApiUtil {
  constructor(private $http: ng.IHttpService,
              private $httpParamSerializerJQLike: any,
              private $log: ng.ILogService) {
    'ngInject';
  }

  returnInputAsArray<T>(data: T|T[]): T[] {
    let array            = (angular.isArray(data) ? <T[]>data : [data]),
        noNullArray      = _.compact(array),
        nullValueMessage = 'Null values were returned from server. Add Application Insights: ApiUtil 24';
    if (array.length > noNullArray.length) { this.$log.log(nullValueMessage); }
    return <T[]>noNullArray;
  }

  returnMultipartResponseAsArray(data: IMultipartResponse): any[] {
    // strip excess Restangular methods if Restangular object
    if (data.plain) { data = data.plain(); }

    return data.content.map((item: IMultipartContent) => {
      let content: any = null;
      _.forEach(item, (value, key) => {
        if (key.toLowerCase() === 'content') { content = value; }
      });
      return content;
    });
  }

  compactObject<T>(obj: T): T { return <T>_(obj).omitBy(_.isUndefined).omitBy(_.isNull).value(); }

  requestBuilder(method: string, url: string, data?: any, optionalHeaders?: ng.IHttpRequestConfigHeaders,
                 isUrlEncoded?: boolean): ng.IPromise<any> {
    if (!method) { throw new Error('An http method is required to complete the request.'); }
    if (!url) { throw new Error('A url is required to complete the request.'); }

    let headers = <{ [n: string]: string }>{};

    if (isUrlEncoded) {
      headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
      data = this.$httpParamSerializerJQLike(data);
    }

    if (optionalHeaders) { angular.extend(headers, optionalHeaders); }

    const request = { url, method, data, headers };
    return this.$http(request).then((res: any) => res.data);
  }
}

export default angular.module('api.apiUtilService', [])
  .service('ApiUtil', ApiUtil)
  .name;
