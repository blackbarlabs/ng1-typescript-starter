export class ApiExceptionMessage {
  message: any;
  data: any;

  constructor(res: any) {
    this.message = buildMessage(res);
    this.data = res;
  }
}

function buildMessage(res: any) {
  if (!res || !res.data || !res.data.Message) {
    return 'There was a problem communicating with the server.';
  }

  let message = res.data.Message;

  if (!res.data.ModelState) { return message; }
  res.data.ModelState[''].forEach((text: string) => {
    message += ' ' + text;
  });
  return message;
}
