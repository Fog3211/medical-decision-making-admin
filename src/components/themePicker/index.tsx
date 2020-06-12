import React, { useState, useEffect } from 'react'
import { BgColorsOutlined, SettingOutlined } from '@ant-design/icons'
import { Switch, Drawer, Divider, Slider, Radio, Popover } from 'antd'
import { SketchPicker } from 'react-color'
import { themeSettingType } from '@config/type.config'
import { defaultSetting, presetColorList, lightNavColor, darkNavColor } from '@config/theme.config'
import { lodashUtils } from '@utils/index'
import styles from './index.less'

interface ThemePickerProps {
    changeThemeByLocalSetting: Function
}

const ThemePicker: React.FC<ThemePickerProps> = (props) => {
    const { changeThemeByLocalSetting } = props

    const [themeSetting, setThemeSetting] = useState<themeSettingType>(lodashUtils.cloneDeep(defaultSetting))
    const [isDrawerShow, setIsDrawerShow] = useState<boolean>(false)
    const [isShowThemeSetting, setIsShowThemeSetting] = useState<boolean>(false)

    // 切换抽屉状态
    const switchDrawer = (isDrawerShow: boolean) => {
        setIsDrawerShow(isDrawerShow)
    }
    // 设置改变时
    const changeThemeSetting = (key: string, value) => {
        const copyThemeSetting = JSON.parse(JSON.stringify(themeSetting))

        if (key === 'navTheme') {
            copyThemeSetting['navTheme'] = value ? 'dark' : 'light'
            copyThemeSetting['navColor'] = value ? darkNavColor : lightNavColor
        } else {
            copyThemeSetting[key] = value
        }

        setThemeSetting(copyThemeSetting)
        changeThemeByLocalSetting(copyThemeSetting)
        localStorage.setItem("af-theme-setting", JSON.stringify(copyThemeSetting))
    }
    // 从本地获取主题
    const initThemeSetting = () => {
        const themeSetting = JSON.parse(localStorage.getItem("af-theme-setting"))
        if (themeSetting) {
            setThemeSetting(themeSetting)
        }
    }

    useEffect(() => {
        initThemeSetting()
    }, [])

    return (
        <Drawer visible={isDrawerShow} className={styles["theme-picker"]}
            closable={false}
            onClose={() => switchDrawer(false)}
            handler={
                <div
                    className={styles["drawer-btn"]}
                    style={{ visibility: isShowThemeSetting ? 'hidden' : 'visible' }}
                    onClick={() => switchDrawer(!isDrawerShow)}
                >
                    <SettingOutlined style={{
                        color: '#fff',
                        fontSize: 22
                    }} />
                </div>
            }
        >
            <div className={styles["color-picker-box"]}>
                <h3>主题色</h3>
                <div className={styles["color-picker"]}>
                    {
                        presetColorList.map((color, index) => (
                            <div key={index} className={styles["color-picker-item"]} style={{ backgroundColor: color }}
                                onClick={() => changeThemeSetting('primaryColor', color)}
                            />
                        ))
                    }
                    {/* 自定义主题色部分 */}
                    <Popover content={(
                        <SketchPicker
                            disableAlpha={true}
                            color={themeSetting.primaryColor}
                            onChangeComplete={(value) => changeThemeSetting('primaryColor', value.hex)}
                            presetColors={[]}
                        />
                    )} placement="bottom">
                        <BgColorsOutlined
                            className={styles["color-picker-item"]}
                            style={{
                                fontSize: 20
                            }} />
                    </Popover>
                </div>
                <Divider />
            </div>

            <div className={styles["nav-theme"]}>
                <h3>整体风格</h3>
                <Switch checkedChildren="dark" unCheckedChildren="light" checked={themeSetting.navTheme === 'dark'}
                    onChange={(value) => changeThemeSetting('navTheme', value)} />
                <Divider />
            </div>

            <div className={styles["nav-mode"]}>
                <h3>导航模式</h3>
                <Radio.Group value={themeSetting.navMode} onChange={(e) => changeThemeSetting('navMode', e.target.value)} >
                    <Radio value={'sidemenu'}>左侧</Radio>
                    <Radio value={'topmenu'}>顶部</Radio>
                </Radio.Group>
                <Divider />
            </div>

            <div className={styles["colourWeakness"]}>
                <h3>色弱调整</h3>
                <Slider max={100} value={themeSetting.colourWeakness} onChange={(value) => changeThemeSetting('colourWeakness', value)} />
                <Divider />
            </div>

        </Drawer>
    )
}


export default ThemePicker