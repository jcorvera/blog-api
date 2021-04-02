export interface RouterInterface {
  method: string;
  path: string | RegExp;
  controller: any;
}
