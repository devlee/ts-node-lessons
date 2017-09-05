import * as vm from 'vm';

import * as path from 'path';

import * as resolve from 'resolve';

import * as NativeModule from 'module';

function createContext(context) {
  const sandbox: any = {
    Buffer,
    __SSR_CONTEXT__: context,
    clearImmediate,
    clearInterval,
    clearTimeout,
    console,
    process,
    setImmediate,
    setInterval,
    setTimeout,
  };
  sandbox.global = sandbox;
  return sandbox;
}

function compileModule(files, basedir) {
  const compiledScripts = {};
  const reoslvedModules = {};

  function getCompiledScript(filename) {
    if (compiledScripts[filename]) {
      return compiledScripts[filename];
    }
    const code = files[filename];
    const wrapper = NativeModule.wrap(code);
    const script = new vm.Script(wrapper, {
      displayErrors: true,
      filename,
    });
    compiledScripts[filename] = script;
    return script;
  }

  function evaluateModule(filename, context, evaluatedModules) {
    if (evaluatedModules[filename]) {
      return evaluatedModules[filename];
    }

    const script = getCompiledScript(filename);
    const compiledWrapper = script.runInNewContext(context);
    const m = { exports: {} };
    const r = (file) => {
      /* eslint-disable no-param-reassign */
      file = path.join('.', file);
      if (files[file]) {
        return evaluateModule(file, context, evaluatedModules);
      } else if (basedir) {
        /* eslint-disable global-require */
        /* eslint-disable import/no-dynamic-require */
        return require(
          reoslvedModules[file] ||
          (reoslvedModules[file] = resolve.sync(file, { basedir })),
        );
      }
      return require(file);
    };
    compiledWrapper.call(m.exports, m.exports, r, m);

    const res = Object.prototype.hasOwnProperty.call(m.exports, 'default')
      ? (m.exports as any).default
      : m.exports;
    evaluatedModules[filename] = res;
    return res;
  }
  return evaluateModule;
}

export default function createBundleRunner(entry, files, basedir = null) {
  const evaluate = compileModule(files, basedir);
  return (userContext = {}) => new Promise((resolve2) => {
    const context = createContext(userContext);
    const res = evaluate(entry, context, {});
    resolve2(res);
  });
}
