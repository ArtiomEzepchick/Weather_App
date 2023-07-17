import React, { useEffect, useRef, useMemo } from "react";
import classNames from "classnames";
import { InputRef, Layout } from "antd";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";

import CitySearch from "../CitySearch/CitySearch";
import GoogleSignInOut from "../GoogleSignInOut/GoogleSignInOut";
import Greeting from "../Greeting/Greeting";
import Loader from "../Loader/Loader";
import Menu from "../Menu/Menu";
import Modal from "../Modal/Modal";
import WeatherForecast from "../WeatherForecast/WeatherForecast";

import { useUserSelector, useWeatherSelector } from "../../selectors/selectors";
import { useScrollLock } from "../../hooks/useScrollLock";
import { WeatherTransformedData } from "../../types/weather/weather";
import { copyrightLinks } from "../../helpers/copyrightLinks/copyrightLinks";
import { LOCAL_STORAGE_ITEMS } from "../../helpers/localStorageItems/localStorageItems";
import { WEATHER_IMAGES_SRC } from "../../helpers/constants/weather/weather";
import { setBackgroundImage } from "../../helpers/utils/weather/setBackgroundImage";
import {
  setCurrentWeatherData,
  setInputCityValue,
  updateAllCitiesWeatherData,
} from "../../model/weather/actions/actions";

import "./index.scss";

const { Header, Content, Footer, Sider } = Layout;

const {
  ALL_CITIES_WEATHER_DATA,
  CURRENT_WEATHER_DATA,
  MENU_KEY_REF,
  SAVED_WEATHER_DATA_REF,
} = LOCAL_STORAGE_ITEMS;

const MainLayout: React.FC = () => {
  const { userData, userToken, userError } = useUserSelector();

  const {
    allCitiesWeatherData,
    currentWeatherData,
    error,
    isLoading,
    isModalOpen,
    inputCityValue,
    asideCollapsed,
    searchOptions,
  } = useWeatherSelector();

  const menuKeyRef = useRef<string>("");
  const siderRef = useRef<HTMLDivElement>(null);
  const savedWeatherDataRef = useRef<WeatherTransformedData | null>(
    currentWeatherData
  );
  const inputRef = useRef<InputRef>(null);
  const { lockScroll, unlockScroll } = useScrollLock();
  const dispatch: Dispatch = useDispatch();

  const cities = useMemo((): string[] => {
    return allCitiesWeatherData.map((item): string => item.city);
  }, [allCitiesWeatherData]);

  useEffect(() => {
    // Set state and refs depending on local storage items
    const lsAllCitiesWeatherData: WeatherTransformedData[] = JSON.parse(
      localStorage.getItem(ALL_CITIES_WEATHER_DATA) || "[]"
    );
    const lsCurrentWeatherData: WeatherTransformedData = JSON.parse(
      localStorage.getItem(CURRENT_WEATHER_DATA) || "[]"
    );
    const lsSavedWeatherDataRef: WeatherTransformedData = JSON.parse(
      localStorage.getItem(SAVED_WEATHER_DATA_REF) || "{}"
    );
    const lsMenuKeyRef: string = localStorage.getItem(MENU_KEY_REF) || "";

    if (lsAllCitiesWeatherData.length) {
      dispatch(updateAllCitiesWeatherData(lsAllCitiesWeatherData));
    }

    if (Object.keys(lsCurrentWeatherData).length) {
      dispatch(setCurrentWeatherData(lsCurrentWeatherData));
    }

    if (Object.keys(lsSavedWeatherDataRef).length) {
      savedWeatherDataRef.current = lsSavedWeatherDataRef;
    }

    if (lsMenuKeyRef) {
      menuKeyRef.current = lsMenuKeyRef;
    }
  }, [dispatch]);

  console.log(menuKeyRef.current);

  useEffect(() => {
    isLoading ? lockScroll() : unlockScroll();

    if (currentWeatherData) {
      savedWeatherDataRef.current = currentWeatherData;

      localStorage.setItem(
        CURRENT_WEATHER_DATA,
        JSON.stringify(currentWeatherData)
      );
      localStorage.setItem(
        SAVED_WEATHER_DATA_REF,
        JSON.stringify(currentWeatherData)
      );
    } else {
      const lsMenuKeyRef: string = localStorage.getItem(MENU_KEY_REF) || "";
      menuKeyRef.current = JSON.parse(lsMenuKeyRef);
      return;
    }

    if (currentWeatherData && cities.includes(currentWeatherData.city)) {
      const isCityIdNotExist: boolean = allCitiesWeatherData.every(
        (item: WeatherTransformedData) => item.id !== currentWeatherData.id
      );
      menuKeyRef.current = cities.indexOf(currentWeatherData.city).toString();

      localStorage.setItem(MENU_KEY_REF, JSON.stringify(menuKeyRef.current));

      if (isCityIdNotExist) {
        const newWeatherData: WeatherTransformedData[] =
          allCitiesWeatherData.map((item) => {
            return item.city === currentWeatherData.city
              ? (item = currentWeatherData)
              : item;
          });

        dispatch(updateAllCitiesWeatherData(newWeatherData));
        dispatch(setInputCityValue(""));

        localStorage.setItem(
          ALL_CITIES_WEATHER_DATA,
          JSON.stringify(newWeatherData)
        );
      }
    } else {
      const newWeatherData: WeatherTransformedData[] = [
        ...allCitiesWeatherData,
        currentWeatherData,
      ];
      menuKeyRef.current = allCitiesWeatherData.length.toString();

      dispatch(updateAllCitiesWeatherData(newWeatherData));
      dispatch(setInputCityValue(""));

      localStorage.setItem(
        ALL_CITIES_WEATHER_DATA,
        JSON.stringify(newWeatherData)
      );
      localStorage.setItem(MENU_KEY_REF, JSON.stringify(menuKeyRef.current));
    }
  }, [
    lockScroll,
    unlockScroll,
    cities,
    currentWeatherData,
    allCitiesWeatherData,
    isLoading,
    savedWeatherDataRef,
    error,
    dispatch,
  ]);

  return (
    <Layout
      style={{
        backgroundImage: `url(${
          WEATHER_IMAGES_SRC +
          (savedWeatherDataRef.current
            ? setBackgroundImage(savedWeatherDataRef.current?.iconId)
            : "01d")
        }.jpg)`,
        backgroundColor: `${
          savedWeatherDataRef.current?.iconId ? "none" : "#3badff"
        }`,
      }}
    >
      <Sider
        className={classNames(
          !allCitiesWeatherData.length && "hidden",
          !asideCollapsed && "opacity-initial"
        )}
        ref={siderRef}
        collapsible
        collapsed={asideCollapsed}
        trigger={null}
      >
        <Menu
          allCitiesWeatherData={allCitiesWeatherData}
          isLoading={isLoading}
          menuKeyRef={menuKeyRef}
          siderRef={siderRef}
          savedWeatherDataRef={savedWeatherDataRef}
          dispatch={dispatch}
        />
      </Sider>
      <Layout
        className={classNames(
          "site-layout",
          !allCitiesWeatherData.length && "padding-initial"
        )}
      >
        <Header>
          <GoogleSignInOut
            dispatch={dispatch}
            isLoading={isLoading}
            userError={userError}
            userToken={userToken}
            userData={userData}
          />
          <CitySearch
            dispatch={dispatch}
            searchOptions={searchOptions}
            dataLength={allCitiesWeatherData.length}
            inputRef={inputRef}
            inputCityValue={inputCityValue}
            isLoading={isLoading}
          />
        </Header>
        <Content className={classNames(isLoading && "opacity-low")}>
          {!savedWeatherDataRef.current && <Greeting />}
          {savedWeatherDataRef.current && (
            <WeatherForecast
              dispatch={dispatch}
              isLoading={isLoading}
              weatherData={savedWeatherDataRef.current}
              userToken={userToken}
            />
          )}
          {isLoading && (
            <Loader weatherDataLength={allCitiesWeatherData.length} />
          )}
        </Content>
        <Footer style={{ padding: "0 1rem", height: "3rem" }}>
          <p>&#169; 2023 Made by Artsiom Ezepchik</p>
          <section className="copyright-links">
            <p>Contact me:</p>
            {copyrightLinks.map(({ href, iconClassName }) => (
              <a key={href} target="blank" href={href}>
                <i className={iconClassName} />
              </a>
            ))}
          </section>
        </Footer>
      </Layout>
      {error && (
        <Modal
          dispatch={dispatch}
          contentText={error}
          isModalOpen={isModalOpen}
          inputRef={inputRef}
        />
      )}
    </Layout>
  );
};

export default MainLayout;
