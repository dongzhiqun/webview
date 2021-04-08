import Vue from 'vue'

const ClickControl = {
  inserted (el, binding) {
    el.addEventListener('click', () => {
      if (!el.disabled) {
        const { value } = binding
        let timeInterval = 1000
        if (value) {
          timeInterval = value
        }
        el.className += ' is-loading'
        const $loading = document.createElement('i')
        $loading.className = 'el-icon-loading'
        el.appendChild($loading)
        el.disabled = true
        setTimeout(() => {
          el.removeChild($loading)
          el.className = el.className.replace('is-loading', '')
          el.disabled = false
        }, timeInterval)
      }
    })
  }
}

const install = function (Vue) {
  Vue.directive('click-control', ClickControl)
}
ClickControl.install = install

if (window.Vue) {
  window['click-control'] = ClickControl
  Vue.use(install)
} else {
  Vue.use(ClickControl)
}

