import { createElement } from 'rax';
import {
  createBaseApp,
  initAppLifeCycles,
  emitLifeCycles,
  getSearchParams,
  initHistory,
  createHistory,
} from 'create-app-shared';

import {
  isMiniApp,
  isWeChatMiniProgram,
  isByteDanceMicroApp,
  isBaiduSmartProgram,
  isKuaiShouMiniProgram,
  isWeb,
  isNode,
} from 'universal-env';
import miniappRenderer from 'miniapp-renderer';
import raxAppRenderer, { RenderAppConfig } from 'rax-app-renderer';

// eslint-disable-next-line
import '../../src/global.scss';

import loadStaticModules from './loadStaticModules';
import loadRuntimeModules from './loadRuntimeModules';

import { setAppConfig } from './appConfig';
import ErrorBoundary from './ErrorBoundary';
import {
  IAppConfig,
  IBuildConfig,
  IStaticConfig,
  IRuntimeValue,
} from '../types';
import { mount, unmount } from './render';
import defaultStaticConfig from './staticConfig';

let staticConfig: IStaticConfig = defaultStaticConfig;

const inMiniApp =
  (isMiniApp ||
    isWeChatMiniProgram ||
    isByteDanceMicroApp ||
    isBaiduSmartProgram ||
    isKuaiShouMiniProgram) &&
  !isWeb;
const buildConfig: IBuildConfig = { mpa: false, icestarkType: 'normal' };
const runtimeValue: IRuntimeValue = {};

runtimeValue.enableRouter = true;

const frameworkAppBase = createBaseApp({
  loadRuntimeModules,
  createElement,
  runtimeAPI: {
    getSearchParams,

    createHistory,
  },
  runtimeValue,
});

export function runApp(
  appConfig: IAppConfig = {},
  customStaticConfig?: IStaticConfig
) {
  // server bundle will to get appConfig after run runApp
  setAppConfig(appConfig as IAppConfig);
  // load static modules before init runtime such as request
  loadStaticModules(appConfig as IAppConfig);

  if (customStaticConfig) {
    staticConfig = customStaticConfig;
  }
  // set History before GID
  initHistory && initHistory(appConfig as any, { staticConfig });

  if (process.env.__IS_SERVER__ || isNode) return;

  let renderer;
  if (inMiniApp) {
    renderer = miniappRenderer;
  } else {
    renderer = raxAppRenderer;
  }
  renderer(
    {
      appConfig: appConfig as RenderAppConfig,
      buildConfig,
      staticConfig,
      ErrorBoundary,
      appLifecycle: {
        createBaseApp: frameworkAppBase,
        initAppLifeCycles,
        emitLifeCycles,
      },
    },
    {
      mount,
      unmount,
    }
  );
}

export default {
  createBaseApp: frameworkAppBase,
  staticConfig,

  enableRouter: true,
};
