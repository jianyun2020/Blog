---
Date: 2022-01-30 05:37:18
LastEditTime: 2022-01-30 05:51:21
image: ./Images/default.jpg
type: Krpano
---


# krpano会调用的公共函数

- `registerplugin`：当插件加载的时候krpano会调用此函数，这个函数提供`krpano Interface Object` 和 `krpano Plugin Object`。
- `unloadplugin`：当插件被移除时，krpano会调用此函数。
- `onresize`：`[可选]` 插件元素大小变化时触发。


插件本身可以添加自定义函数或属性到krpano，只需要直接添加/设置到krpano object或plugin object。对于可以从 xml 设置的自定义属性，还有 registerattribute 函数 - 它允许添加具有默认值的属性，同时保留来自 xml 的值。并且 registerattribute 函数可用于添加 setter/getter 属性 - 这些属性将导致在访问变量时自动调用 get 或 set 函数 - 这可用于在属性更改时获得通知。

# HTML5 JavaScript Plugins

```js
/**
 * krpano HTML5 JavaScript Plugin Example
 */

 function krpanoplugin() {
     var local = this; // 保存当前插件对象的this指针
     
     var krpano = null; // krpano对象
     var plugin = null; // plugin对象

     var xml_value = 100.0; // 自定义xml属性的值

     // registerplugin - startup point for the plugin(required)
     // - krpanointerface = krpano interface object
     // - pluginpath = the fully qualified plugin name(e.g. "plugin[name]")
     // - pluginobject = the xml plugin object itself
     local.registerplugin = function(krpanointerface, pluginpath, pluginobject) {
         // get the krpano interface and the plugin object
        krpano = krpanointerface;
        plugin = pluginobject;

        // first - say hello
        krpano.trace(1, "hello from plugin[" + plugin.name + "]");

        // add plugin attributes
        plugin.registerattribute("mode", "normal");
        plugin.registerattribute("value", xml_value, value_setter, value_getter);

        // add plugin action (the attribute needs to be lowercase!)
        plugin.dosomething = action_dosomething;

        // optionaly - add some graphical content:

        // register the size of content
        plugin.registercontentsize(200, 200);

        // use 100% width/height for automatic scaling with the plugin size
        var text = document.createElement("div");
        text.style.cssText = `width: 100%; height: 100%; display: flex; color: #fff; background: rgba(10, 50, 100, .5); align-items: center; justify-content: center; text-align: center;`;
        text.innerHTML = "HTML5<br>TEST PLUGIN<br>click me";

        // the plugin 'sprite' variable is the internal html element of the plugin
        plugin.sprite.appendChild(text);
     }

     // unloadplugin - exit point for the plugin (optionally)
     // - will be called from krpano when the plugin will be removed
     // - everything that was added by the plugin should be removed here
     local.uploadplugin = function() {
         plugin = null;
         krpano = null;
     }

     // onresize （optionally)
     // - width, height = the new size for the plugin
     // - when not defined then only the krpano plugin html element will be sized
     local.onresize = function(width, height) {
         // not used in this example
         // the plugin content will resize automatically because
         // of the width=100%, height=100% CSS style
         return false;
     }


     function value_setter(newvalue) {
         if (newvalue != xml_value) {
             krpano.trace(1, "'value' will be changed from " + xml_value + "to" + newvalue);
         }
         xml_value = newvalue;
     }

     function value_getter() {
         return xml_value;
     }

     function action_dosomething() {
         // trace the given action arguments
         krpano.trace(1, "dosomething() was called with " + arguments.length + " arguments:");
         for (var i = 0; i < arguments.length; i++) {
             krpano.trace(1, "arguments[" + i + "]=" + arguments[i]);
         }

         // trace some infos
         krpano.trace(1, "mode=" + plugin.mode);
         krpano.trace(1, "lookat=" + krpano.view.lookat + " / " + krpano.view.vlookat);

         // call plugin actions
         plugin.accuracy = 1; // disable grid fitting for smoother size changes
         krpano.call("tween(width|height, 500|100)", plugin);
         krpano.call("lookto(0, 0, 150); wait(1.0); lookto(90, 0, 90);");
         krpano.call("tween(width|height, 200|200)", plugin);
     }
 }
```

# The krpano Plugin Interface

These are the interface functions of the plugin that will be called from krpano. In HTML5/JavaScript these functions must be members of a globally function object named `krpanoplugin`. All code need to be within that function, everything outside will get stripped.

```xml
krpanoplugin.registerplugin(krpanointerface, pluginpath, pluginobject)
```