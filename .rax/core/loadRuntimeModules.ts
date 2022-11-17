import module0 from '/Users/yangwenjun06/Desktop/LowCode/generator_code/ali-lowcode-generated-sources/node_modules/build-plugin-rax-app/lib/runtime.js';
import module1 from '/Users/yangwenjun06/Desktop/LowCode/generator_code/ali-lowcode-generated-sources/node_modules/build-plugin-rax-router/lib/runtime.js';
import module2 from '../plugins/logger/pluginRuntime/runtime';

interface IRuntime<T> {
  loadModule: (module: { default: T } | T) => void;
}

function loadRuntimeModules(runtime: IRuntime<Function>) {
  runtime.loadModule(module0);
  runtime.loadModule(module1);
  runtime.loadModule(module2);
}

export default loadRuntimeModules;
