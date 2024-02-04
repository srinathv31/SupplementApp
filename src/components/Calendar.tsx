import { useRef, useCallback } from "react";
import { StyleSheet } from "react-native";
import {
  ExpandableCalendar,
  AgendaList,
  CalendarProvider,
  WeekCalendar,
} from "react-native-calendars";
import testIDs from "./Calendar/testIDs";
// import { agendaItems, getMarkedDates } from "../mocks/agendaItems";
import { agendaItems, getMarkedDates } from "./Calendar/mocks/agendaItems";
import AgendaItem from "./Calendar/mocks/AgendaItem";
// import AgendaItem from "../mocks/AgendaItem";
// import { getTheme, themeColor, lightThemeColor } from "../mocks/theme";

import leftArrowIcon from "./Calendar/mocks/previous.png";
import rightArrowIcon from "./Calendar/mocks/next.png";
import { useClientStore } from "../zustand/store";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ITEMS: any[] = agendaItems;

interface Props {
  weekView?: boolean;
}

const ExpandableCalendarScreen = (props: Props) => {
  const selectedDate = useClientStore((state) => state.selectedDate);
  const updateSelectedDate = useClientStore(
    (state) => state.updateSelectedDate,
  );
  const { weekView } = props;
  const marked = useRef(getMarkedDates());
  //   const theme = useRef(getTheme());
  //   const todayBtnTheme = useRef({
  //     todayButtonTextColor: themeColor,
  //   });

  //   const onDateChanged = useCallback((date, updateSource) => {
  //     console.log("ExpandableCalendarScreen onDateChanged: ", date, updateSource);
  //   }, []);

  // const onMonthChange = useCallback(({dateString}) => {
  //   console.log('ExpandableCalendarScreen onMonthChange: ', dateString);
  // }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderItem = useCallback(({ item }: any) => {
    return <AgendaItem item={item} />;
  }, []);

  return (
    <CalendarProvider
      //   date={ITEMS[1]?.title}
      date={selectedDate}
      onDateChanged={(e) => updateSelectedDate(e)}
      //   onDateChanged={onDateChanged}
      // onMonthChange={onMonthChange}
      showTodayButton
      // disabledOpacity={0.6}
      //   theme={todayBtnTheme.current}
      todayBottomMargin={16}
    >
      {weekView ? (
        <WeekCalendar
          testID={testIDs.weekCalendar.CONTAINER}
          firstDay={1}
          markedDates={marked.current}
        />
      ) : (
        <ExpandableCalendar
          testID={testIDs.expandableCalendar.CONTAINER}
          //   horizontal={false}
          // hideArrows
          // disablePan
          // hideKnob
          initialPosition={ExpandableCalendar.positions.OPEN}
          calendarStyle={styles.calendar}
          // headerStyle={styles.header} // for horizontal only
          // disableWeekScroll
          //   theme={theme.current}
          // disableAllTouchEventsForDisabledDays
          firstDay={0}
          markedDates={marked.current}
          leftArrowImageSource={leftArrowIcon}
          rightArrowImageSource={rightArrowIcon}
          animateScroll
          //   onDayPress={(e) => updateSelectedDate(e.dateString)}
          // closeOnDayPress={false}
        />
      )}
      <AgendaList
        sections={ITEMS}
        renderItem={renderItem}
        // scrollToNextEvent
        sectionStyle={styles.section}
        markToday
        // dayFormat={"yyyy-MM-d"}
      />
    </CalendarProvider>
  );
};

export default ExpandableCalendarScreen;

const styles = StyleSheet.create({
  calendar: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  header: {
    backgroundColor: "lightgrey",
  },
  section: {
    backgroundColor: "lightgrey",
    color: "grey",
    textTransform: "capitalize",
  },
});
