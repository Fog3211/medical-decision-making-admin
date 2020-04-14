import BezierEasing from 'bezier-easing'
import tinycolor from 'tinycolor2'
import cssContent from './color'
import { defaultSetting, lightNavColor, darkNavColor } from "@config/theme.config"

/* basic-easiing */
const baseEasing = BezierEasing(0.26, 0.09, 0.37, 0.18)
const primaryEasing = baseEasing(0.6)
const currentEasing = (index: number) => baseEasing(index * 0.1)

/* tinycolor-mix */
tinycolor.mix = function (color1: string, color2: string, amount: number) {
    amount = (amount === 0) ? 0 : (amount || 50)

    var rgb1 = tinycolor(color1).toRgb()
    var rgb2 = tinycolor(color2).toRgb()

    var p = amount / 100

    var rgba = {
        r: ((rgb2.r - rgb1.r) * p) + rgb1.r,
        g: ((rgb2.g - rgb1.g) * p) + rgb1.g,
        b: ((rgb2.b - rgb1.b) * p) + rgb1.b,
        a: ((rgb2.a - rgb1.a) * p) + rgb1.a
    }
    return tinycolor(rgba)
}

function getPrimaryHoverColor(color: string, ratio = 5) {
    return tinycolor.mix(
        '#ffffff',
        color,
        currentEasing(ratio) * 100 / primaryEasing
    ).toHexString()
}

function getPrimaryActiveColor(color: string, ratio = 7) {
    return tinycolor.mix(
        '#333333',
        color,
        (1 - (currentEasing(ratio) - primaryEasing) / (1 - primaryEasing)) * 100
    ).toHexString()
}

function getPrimaryShadowColor(color: string, ratio = 9) {
    return tinycolor.mix(
        '#888888',
        color,
        (1 - (currentEasing(ratio) - primaryEasing) / (1 - primaryEasing)) * 100
    ).setAlpha(.2).toRgbString()
}

// 获取主题色相关颜色
export function getThemeColor(color: string) {
    return {
        primaryColor: color,
        primaryHoverColor: getPrimaryHoverColor(color),
        primaryActiveColor: getPrimaryActiveColor(color),
        primaryShadowColor: getPrimaryShadowColor(color)
    }
}

// 生成需要前置插入的style
const generateStyleHtml = () => {
    const { primaryColor, navTheme, navColor, navMode, colourWeakness } = JSON.parse(JSON.stringify(defaultSetting))
    const {
        primaryActiveColor,
        primaryHoverColor,
        primaryShadowColor
    } = getThemeColor(primaryColor)
    const cssVar = `
      :root {
        --primary-color: ${primaryColor};
        --primary-hover-color: ${primaryHoverColor};
        --primary-active-color: ${primaryActiveColor};
        --primary-shadow-color: ${primaryShadowColor};
        --nav-theme: ${navTheme};
        --nav-color: ${navColor};
        --nav-mode: ${navMode};
        --colour-weakness: ${colourWeakness}%;
      }
    `
    return `${cssVar}\n${cssContent}`
}

// 主题色初始化
export function initAntdPrimaryTheme() {
    let styleNode = document.getElementById('dynamic_antd_theme_custom_style')
    const body = document.getElementsByTagName('body')[0]
    if (!styleNode) {
        // avoid repeat insertion
        styleNode = document.createElement('style')
        styleNode.id = 'dynamic_antd_theme_custom_style'
        styleNode.innerHTML = generateStyleHtml()
        body.insertBefore(styleNode, body.childNodes[0])
    } else {
        styleNode.innerHTML = generateStyleHtml()
    }
}

// 修改主题设置
export function changeAntdTheme(key: string, value: any) {
    if (key === 'primaryColor') {
        const colorObj = getThemeColor(value)
        Object.keys(colorObj).forEach((key) => {
            setCssVarValue(key, colorObj[key])
        })
    } else if (key === 'navTheme') {
        setCssVarValue('navColor', value === 'light' ? lightNavColor : darkNavColor)
        setCssVarValue(key, value)
        emitThemeEvent(key, value)
    } else {
        setCssVarValue(key, value)
    }
}

// 修改设置时写入url
export function changeThemeUrl(type: string, value: any) {

    const url = window.location.href
    const needSplit = url.indexOf('?') !== -1
    let beforeUrl = url
    let afterUrl = ''

    if (needSplit) {
        beforeUrl = url.slice(0, url.indexOf('?'))
        afterUrl = url.substring(url.indexOf('?') + 1)
    }
    const searchParams = new URLSearchParams(afterUrl)
    if (searchParams.has(type)) {
        searchParams.set(type, value)
    } else {
        searchParams.append(type, value)
    }
    window.location.href = beforeUrl + '?' + searchParams.toString()
}

// 解析url=>json对象
export function parseThemeUrl(url: string) {
    const result = {}
    const needSplit = url.indexOf('?') !== -1
    let afterUrl = ''

    if (needSplit) {
        afterUrl = url.substring(url.indexOf('?') + 1)
    }
    const searchParams = new URLSearchParams(afterUrl)
    for (const pair of (searchParams as any).entries()) {
        result[pair[0]] = pair[1]
    }
    return result
}

// 修改css var属性的值
export function setCssVarValue(type: string, value: string | number) {
    const key = formatToVarString(type)
    const html = document.getElementsByTagName('html')[0]

    if (key === '--colour-weakness') {
        html.style.setProperty(key, value + '%')
    } else {
        html.style.setProperty(key, String(value))
    }
}

// 获取css var属性的值
export function getCssVarValue(key: string) {
    const html = document.getElementsByTagName('html')[0]
    return html.style.getPropertyValue(key)
}

// 驼峰命名转css var命名格式
export function formatToVarString(str: string) {
    if (str) {
        return '--' + str.replace(/([A-Z])/g, "-$1").toLowerCase()
    }
}

// 自定义主题change事件
export function emitThemeEvent(key: string, value: any) {
    const event = new CustomEvent("themechange", {
        detail: {
            [key]: value
        }
    })
    window.dispatchEvent(event)
}

export default {
    getPrimaryHoverColor,
    getPrimaryActiveColor,
    getPrimaryShadowColor,
    getThemeColor,
    generateStyleHtml,
    initAntdPrimaryTheme,
    changeAntdTheme,
    changeThemeUrl,
    setCssVarValue,
    getCssVarValue,
    formatToVarString,
    emitThemeEvent
}