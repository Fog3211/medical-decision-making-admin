import React, { useState, useEffect } from 'react'
import IconMap from '@config/icon.config'
import { BgColorsOutlined } from '@ant-design/icons'
import { Switch, Drawer, Divider, Button, Slider, Radio, Popover } from 'antd'
import { SketchPicker } from 'react-color'
import { themeSettingType } from '@config/type.config'
import { defaultSetting, presetColorList, lightNavColor, darkNavColor } from '@config/theme.config'
import styles from './index.less'

interface ThemePickerProps {
    setThemeByLocalSetting: Function
}

const ThemePicker: React.FC<ThemePickerProps> = (props: ThemePickerProps) => {
    const { setThemeByLocalSetting } = props

    const [themeSetting, setThemeSetting] = useState<themeSettingType>(defaultSetting)
    const [isDrawerShow, setIsDrawerShow] = useState<boolean>(false)

    // 切换抽屉状态
    const switchDrawer = (isDrawerShow: boolean) => {
        setIsDrawerShow(isDrawerShow)
    }
    // 设置改变时
    const changeThemeSetting = (key: string, value) => {

        if (key === 'navTheme') {
            themeSetting['navTheme'] = value ? 'dark' : 'light'
            themeSetting['navColor'] = value ? darkNavColor : lightNavColor
        } else {
            themeSetting[key] = value
        }

        setThemeSetting(themeSetting)
        setThemeByLocalSetting(themeSetting)
        localStorage.setItem("af-theme-setting", JSON.stringify(themeSetting))
    }
    // 还原默认设置
    const resetThemeSetting = () => {
        setThemeSetting(defaultSetting)
        useThemeSetting(defaultSetting)
    }
    // 从本地获取主题
    const initThemeSetting = () => {
        const themeSetting = JSON.parse(localStorage.getItem("af-theme-setting"))
        if (themeSetting) {
            setThemeSetting(themeSetting)
        }
    }
    // 设置主题
    const useThemeSetting = (themeSetting: themeSettingType) => {
        Object.keys(themeSetting).forEach((key) => {
            changeThemeSetting(key, themeSetting[key])
        })
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
                    style={{ backgroundColor: 'var(--primary-color)' }}
                    onClick={() => switchDrawer(!isDrawerShow)}
                >
                    {/* <LegacyIcon
                        type={isDrawerShow ? 'close' : 'setting'}
                        style={{
                            color: '#fff',
                            fontSize: 20
                        }}
                    /> */}
                    {IconMap['setting']}
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
                <Switch checkedChildren="dark" unCheckedChildren="light" checked={themeSetting.navTheme === 'dark'} onChange={(value) => changeThemeSetting('navTheme', value)} />
                <Divider />
            </div>

            <div className={styles["nav-mode"]}>
                <h3>导航模式</h3>
                <Radio.Group value={themeSetting.navMode} onChange={(e) => changeThemeSetting('navMode', e.target.value)} >
                    <Radio value={'left'}>左侧</Radio>
                    <Radio value={'top'}>顶部</Radio>
                </Radio.Group>
                <Divider />
            </div>

            <div className={styles["colourWeakness"]}>
                <h3>色弱调整</h3>
                <Slider max={100} value={themeSetting.colourWeakness} onChange={(value) => changeThemeSetting('colourWeakness', value)} />
                <Divider />
            </div>

            <div style={{ textAlign: 'right' }} onClick={() => resetThemeSetting()}>
                <Button>还原默认设置</Button>
            </div>

        </Drawer>
    )
}


export default ThemePicker