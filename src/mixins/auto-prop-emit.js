/** 顶层 props 修改，适用于配置项组件拆分， 不适用于配置面板
 * 用法： mixin， 然后在组件中覆盖 FALLBACK, props 属性
 */
import { isEqual, cloneDeep, debounce } from 'lodash'

export default {
    props: {
        value: {
            default: () => ({})
        }
    },
    data() {
        return {
            FALLBACK: {},
            props: {}
        }
    },
    watch: {
        value: {
            immediate: true,
            handler: debounce(function (val, old) {
                if (!val || isEqual(val, old)) {
                    return
                }
                const { FALLBACK } = this
                Object.keys(FALLBACK).forEach(key => {
                    this.props[key] = cloneDeep(
                        (val[key] === undefined ? FALLBACK : val)[key]
                    )
                })
            }, 22, { leading: true, maxWait: 100 })
        },
        props: {
            deep: true,
            handler: debounce(function (val) {
                this.$emit('input', val)
            }, 22, { leading: true, maxWait: 100 })
        }
    }
}
