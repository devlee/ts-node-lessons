import * as vm from 'vm';

import * as path from 'path';

import * as resolve from 'resolve';

import * as NativeModule from 'module';

// 创建新的上下文对象
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

// 编译模块
function compileModule(files, basedir) {
  // 编译过的脚本缓存
  const compiledScripts = {};
  // 读取过的模块缓存
  const reoslvedModules = {};

  // 获取编译过的脚本
  function getCompiledScript(filename) {
    // 如果有缓存，则直接返回
    if (compiledScripts[filename]) {
      return compiledScripts[filename];
    }
    // 读取代码字符串
    const code = files[filename];
    // 创建包裹过的代码
    const wrapper = NativeModule.wrap(code);
    // 创建可执行脚本对象
    const script = new vm.Script(wrapper, {
      displayErrors: true,
      filename,
    });
    // 缓存并返回
    compiledScripts[filename] = script;
    return script;
  }

  // 执行模块
  function evaluateModule(filename, context, evaluatedModules) {
    // 如果有执行结果，则直接返回
    if (evaluatedModules[filename]) {
      return evaluatedModules[filename];
    }

    // 得到编译后的脚本
    const script: vm.Script = getCompiledScript(filename);
    // 执行script并返回结果，这里返回的结果是包裹过的function
    // (function(exports, require, module, __filename, __dirname){ ... })
    const compiledWrapper = script.runInNewContext(context);
    // 创建模块m
    const m = { exports: {} };
    // 创建require函数
    const r = (file) => {
      file = path.join('.', file);
      if (files[file]) {
        return evaluateModule(file, context, evaluatedModules);
      } else if (basedir) {
        if (file.indexOf('.server-bundle') > -1) {
          file = './' + file;
        }
        return require(
          reoslvedModules[file] ||
          (reoslvedModules[file] = resolve.sync(file, { basedir })),
        );
      }
      return require(file);
    };
    // 执行compiledWrapper这个function
    compiledWrapper.call(m.exports, m.exports, r, m);

    // 获取模块执行结果
    const res = Object.prototype.hasOwnProperty.call(m.exports, 'default')
      ? (m.exports as any).default
      : m.exports;

    // 缓存模块执行结果并返回
    evaluatedModules[filename] = res;
    return res;
  }

  // 返回执行模块函数
  return evaluateModule;
}

export default function createBundleRunner(entry, files, basedir = null) {
  // 得到执行函数
  const evaluate = compileModule(files, basedir);
  // 返回匿名函数，该函数接收上下文对象，返回Promise对象
  return (userContext = {}) => new Promise((resolve2) => {
    // 创建沙盒
    const context = createContext(userContext);
    // 获取执行结果
    const res = evaluate(entry, context, {});
    // Promise resolve之
    resolve2(res);
  });
}
