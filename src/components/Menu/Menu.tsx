import React, {
    useMemo,
    useEffect,
    useCallback,
    MutableRefObject,
    RefObject
} from "react"
import { Menu as AntMenu, MenuProps } from "antd"
import { MenuInfo } from 'rc-menu/lib/interface'
import { CloudOutlined } from '@ant-design/icons'
import { Dispatch } from "redux"
import { animateScroll } from "react-scroll"

import {
    setIsLoading,
    updateAllCitiesWeatherData,
    setAsideCollapsed,
    setCurrentWeatherData
} from '../../model/weather/actions/actions'
import { DEGREE_SYMBOL } from "../../helpers/constants/weather/weather"
import { LOCAL_STORAGE_ITEMS } from "../../helpers/localStorageItems/localStorageItems"
import { WeatherTransformedData } from "../../types/weather/weather"

import './index.scss'
import MenuItem from "./MenuItem/MenuItem"

type MenuItemType = Required<MenuProps>['items'][number]

type Props = {
    allCitiesWeatherData: WeatherTransformedData[];
    isLoading: boolean;
    siderRef: RefObject<HTMLDivElement>;
    menuKeyRef: MutableRefObject<string>;
    savedWeatherDataRef: MutableRefObject<WeatherTransformedData | null>;
    dispatch: Dispatch;
}

const {
    ALL_CITIES_WEATHER_DATA,
    CURRENT_WEATHER_DATA,
    MENU_KEY_REF,
    SAVED_WEATHER_DATA_REF
} = LOCAL_STORAGE_ITEMS

const makeMenuItem = (
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
): MenuItemType => {
    return {
        label,
        key,
        icon
    } as MenuItemType
}

const Menu: React.FC<Props> = ({
    isLoading,
    menuKeyRef,
    dispatch,
    allCitiesWeatherData,
    savedWeatherDataRef,
    siderRef
}) => {
    const handleDeleteBtnClick = useCallback((): void => {
        // Handle delete menu items and set local storage items after deleting
        let currentMenyKeyRef: string = menuKeyRef.current
        const newWeatherData: WeatherTransformedData[] = allCitiesWeatherData.filter((_, index: number) => index.toString() !== currentMenyKeyRef)

        dispatch(setIsLoading(true))
        dispatch(updateAllCitiesWeatherData(newWeatherData))

        localStorage.setItem(ALL_CITIES_WEATHER_DATA, JSON.stringify(newWeatherData))

        setTimeout(() => {
            dispatch(setIsLoading(false))
        }, 200)

        if (!newWeatherData.length) {
            savedWeatherDataRef.current = null
            dispatch(setAsideCollapsed(true))
            dispatch(setCurrentWeatherData(null))

            localStorage.setItem(CURRENT_WEATHER_DATA, JSON.stringify({}))
            localStorage.setItem(SAVED_WEATHER_DATA_REF, JSON.stringify({}))
            return
        }

        if (+currentMenyKeyRef >= newWeatherData.length - 1) {
            currentMenyKeyRef = (newWeatherData.length - 1).toString()
            savedWeatherDataRef.current = newWeatherData[+currentMenyKeyRef]
            dispatch(setCurrentWeatherData(newWeatherData[+currentMenyKeyRef]))

            localStorage.setItem(MENU_KEY_REF, JSON.stringify(currentMenyKeyRef))
            localStorage.setItem(SAVED_WEATHER_DATA_REF, JSON.stringify(newWeatherData[+currentMenyKeyRef]))
            localStorage.setItem(CURRENT_WEATHER_DATA, JSON.stringify(newWeatherData[+currentMenyKeyRef]))
            return
        } else {
            dispatch(setCurrentWeatherData(newWeatherData[+currentMenyKeyRef]))
            savedWeatherDataRef.current = newWeatherData[+currentMenyKeyRef]

            localStorage.setItem(CURRENT_WEATHER_DATA, JSON.stringify(newWeatherData[+currentMenyKeyRef]))
            localStorage.setItem(SAVED_WEATHER_DATA_REF, JSON.stringify(newWeatherData[+currentMenyKeyRef]))
            return
        }
    }, [
        allCitiesWeatherData,
        menuKeyRef,
        savedWeatherDataRef,
        dispatch
    ])

    const menuItems = useMemo((): MenuItemType[] => allCitiesWeatherData.map((item, index) => {
        const menuLabel: string = item.temp + DEGREE_SYMBOL + ' ' + item.city

        return makeMenuItem(
            <MenuItem
                menuLabel={menuLabel}
                handleDeleteBtnClick={handleDeleteBtnClick}
                isLoading={isLoading}
            />,
            index,
            <CloudOutlined />
        )
    }), [
        allCitiesWeatherData,
        handleDeleteBtnClick,
        isLoading
    ])

    const handleMenuItemSelect = useCallback((menuInfo: MenuInfo): void => {
        menuKeyRef.current = menuInfo.key
        animateScroll.scrollToTop({ duration: 500 })
        dispatch(setCurrentWeatherData(allCitiesWeatherData[Number(menuInfo.key)]))
        savedWeatherDataRef.current = allCitiesWeatherData[Number(menuInfo.key)]
    }, [
        allCitiesWeatherData,
        dispatch, 
        menuKeyRef, 
        savedWeatherDataRef
    ])

    useEffect(() => {
        const handleMouseOverSider = (e: MouseEvent): void => {
            const target = e.target as HTMLDivElement

            siderRef.current && !siderRef.current.contains(target)
                ? dispatch(setAsideCollapsed(true))
                : dispatch(setAsideCollapsed(false))
        }

        if (menuItems.length) document.addEventListener('mouseover', handleMouseOverSider)

        return () => document.removeEventListener('mouseover', handleMouseOverSider)
    }, [
        siderRef,
        menuItems,
        dispatch
    ])

    return (
        <AntMenu
            selectable={!isLoading}
            selectedKeys={[menuKeyRef.current]}
            theme='dark'
            mode='inline'
            items={menuItems}
            onSelect={handleMenuItemSelect}
        />
    )
}

export default Menu