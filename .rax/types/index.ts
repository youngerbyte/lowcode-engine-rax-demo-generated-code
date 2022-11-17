import {
  RaxElement as FrameworkElement,
  ComponentType as FrameworkComponentType,
  RaxNode as FrameworkNode,
} from 'rax';
import { History } from 'history';

import { ILogger } from './logger/types';

export * from '../plugins/app/types';

interface IOnTabItemClickParams {
  from: string;
  path: string;
  text: string;
  index: number;
}

interface IQuery {
  [key: string]: string;
}

interface IContext {
  pathname: string;
  query?: IQuery;
  ssrError?: any;
  path?: string;
}

interface IStoreConfig {
  disableResetPageState: boolean;
}

export interface IBuildConfig {
  router?: object | boolean;
  store?: boolean | IStoreConfig;
  icestarkType?: 'es' | 'umd' | 'normal';
  web?: object;
  mpa?: boolean;
}

export interface IApp {
  rootId?: string;
  mountNode?: HTMLElement;
  addProvider?: ({ children }: { children: FrameworkNode }) => FrameworkElement;
  renderComponent?: FrameworkComponentType;
  getInitialData?: (ctx?: IContext) => Promise<any>;
  errorBoundary?: boolean;
  ErrorBoundaryFallback?: FrameworkComponentType;
  onErrorBoundaryHandler?: (error: Error, componentStack: string) => any;
  onLaunch?: (options?: any) => any;
  onShow?: () => any;
  onHide?: () => any;
  onError?: (error: Error) => any;
  onPageNotFound?: (options?: any) => any;
  onUnhandledRejection?: (options?: any) => any;
  onTabItemClick?: ({ from, path, text, index }: IOnTabItemClickParams) => any;

  [key: string]: any;
}

export interface IRouter {
  type?: 'hash' | 'browser' | 'memory' | 'static';
  // common props for BrowserRouter & HashRouter & MemoryRouter
  basename?: string;
  fallback?: FrameworkNode;
  history?: History;
}

export interface IRuntimeValue {
  [key: string]: unknown;
}

export interface IAppConfig {
  app?: IApp;
  renderComponent?: FrameworkElement;

  router?: IRouter;

  renderComponent?: FrameworkComponentType;
  logger?: ILogger;
}

declare global {
  interface Window {
    __ICE_SSR_ENABLED__: any;
    __ICE_APP_DATA__: any;
    __ICE_PAGE_PROPS__: any;
  }
}
