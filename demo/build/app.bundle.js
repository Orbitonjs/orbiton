(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('@pearl-js/pearl')) :
  typeof define === 'function' && define.amd ? define(['@pearl-js/pearl'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Orbiton));
}(this, (function (Orbiton) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var Orbiton__default = /*#__PURE__*/_interopDefaultLegacy(Orbiton);

  class Tasks extends Orbiton__default['default'].Component {
    constructor(props, context) {
      super(props, context);
      this.state = {
        tasks: []
      }; //this.Fetch = this.Fetch.bind(this)
    }

    Mounted() {
      fetch('/db.json').then(resp => resp.json()).then(data => {
        setTimeout(() => {
          this.updateState({
            tasks: data
          });
        }, 5000);
      });
    }

    render() {
      return Orbiton__default['default'].createElement("div", {
        attributes: {
          className: "taskss"
        },
        events: {},
        children: [this.state.tasks.length === 0 ? Orbiton__default['default'].createElement("div", {
          attributes: {
            className: "fetchtasks"
          },
          events: {},
          children: ["Loading..."]
        }) : Orbiton__default['default'].createElement("div", {
          attributes: {
            className: "tasks"
          },
          events: {},
          children: [this.state.tasks.map(task => Orbiton__default['default'].createComponent(Task, {
            title: task.title,
            description: task.description,
            time: task.time,
            children: []
          }))]
        })]
      });
    }

  }

  class Task extends Orbiton__default['default'].Component {
    constructor(props, context) {
      super(props, context);
      this.state = {
        task: this.props,
        isEditing: false
      };
    }

    render() {
      return Orbiton__default['default'].createElement("div", {
        attributes: {
          className: "task"
        },
        events: {},
        children: [Orbiton__default['default'].createElement("div", {
          attributes: {
            className: "tasktitle"
          },
          events: {},
          children: [this.props.title]
        }), Orbiton__default['default'].createElement("div", {
          attributes: {
            className: "taskdesc"
          },
          events: {},
          children: [this.props.description.slice(0, 40) + "..."]
        }), Orbiton__default['default'].createElement("div", {
          attributes: {
            className: "time"
          },
          events: {},
          children: [this.props.time]
        }), Orbiton__default['default'].createElement("div", {
          attributes: {
            className: "taskactions"
          },
          events: {},
          children: []
        })]
      });
    }

  }

  // Add variable components

  class Header extends Orbiton__default['default'].Component {
    constructor(props, context) {
      super(props, context);
    }

    render() {
      return Orbiton__default['default'].createElement("nav", {
        attributes: {},
        events: {},
        children: [Orbiton__default['default'].createElement("div", {
          attributes: {
            className: "logo"
          },
          events: {},
          children: [Orbiton__default['default'].createElement("img", {
            attributes: {
              src: "/logo.png",
              alt: "logo"
            },
            events: {},
            children: []
          })]
        }), Orbiton__default['default'].createElement("div", {
          attributes: {
            className: "heading"
          },
          events: {},
          children: ["Todo App"]
        }), Orbiton__default['default'].createElement("div", {
          attributes: {
            className: "addtodo"
          },
          events: {},
          children: [Orbiton__default['default'].createElement("span", {
            attributes: {
              className: "add"
            },
            events: {},
            children: ["+"]
          })]
        })]
      });
    }

  }

  const Containor = Orbiton__default['default'].createElement("div", {
    attributes: {
      className: "containor"
    },
    events: {},
    children: [Orbiton__default['default'].createComponent(Tasks, {
      children: []
    })]
  });
  const App = Orbiton__default['default'].createElement("div", {
    attributes: {},
    events: {},
    children: [Orbiton__default['default'].createComponent(Header, {
      children: []
    }), Orbiton__default['default'].createComponent(Containor, {
      children: []
    })]
  });
  Orbiton__default['default'].append(App, document.getElementById('root'), () => console.log('App has mounted'));

})));
