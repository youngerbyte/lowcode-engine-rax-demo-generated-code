// MPA 模式下该文件无效
import { runApp, IAppConfig } from 'rax-app';

const appConfig: IAppConfig = {
  router: {
    type: 'browser',
  },
};
runApp(appConfig);
