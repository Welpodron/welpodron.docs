export type Mock = {
  url: string;
  controller: (params?: RequestInit) => Promise<Response>
};

export class Mocker {
  mocks: Record<string, Mock['controller']> = {};
  originalFetcher = window.fetch;

  constructor() {}

  addMock = ({
    url,
    controller,
  }: Mock) => {
    if (!this.mocks[url]) {
      this.mocks[url] = controller
    }
  };

  removeMock = (url: Mock["url"]) => {
    delete this.mocks[url];
  };

  destroy = () => {
    window.fetch = this.originalFetcher;
    this.mocks = {};
  };

  init = () => {
    window.fetch = new Proxy(this.originalFetcher, {
      apply: (target, thisArg, argumentsList) => {
        if (this.mocks[String(argumentsList[0])]) {
          return this.mocks[String(argumentsList[0])](argumentsList[1])
        } else {
          return target.apply(thisArg, argumentsList as any);
        }
      },
    });
  };
}
