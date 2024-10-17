import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useMemo } from "react";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { BlurView } from "expo-blur";
import {
  Extrapolation,
  FadeInDown,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { Animated } from "react-native";
import { hp } from "../helpers/common";
import { theme } from "../constants/theme";
import { CommonFilterRow, SectionView, ColorFilter } from "./filterViews";
import { capitalize } from "lodash";
import { data } from "../constants/data";

const FiltersModal = ({
  modalRef,
  onClose,
  onApply,
  onReset,
  filters,
  setFilters,
}) => {
  const snapPoints = useMemo(() => ["75%"], []);

  return (
    <BottomSheetModal
      ref={modalRef}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      backdropComponent={CustomBackdrop}
    >
      <BottomSheetView style={styles.contentContainer}>
        <View style={styles.content}>
          <Text style={styles.filterText}>Filters</Text>
          {Object.keys(sections).map((sectionName, index) => {
            let sectionView = sections[sectionName];
            let sectionData = data.filters[sectionName];
            let title = capitalize(sectionName);
            return (
              <Animated.View
                entering={FadeInDown.delay(index * 100 + 100)
                  .springify()
                  .damping(11)}
                key={sectionName}
              >
                <SectionView
                  title={title}
                  content={sectionView({
                    data: sectionData,
                    filters,
                    setFilters,
                    filterName: sectionName,
                  })}
                />
              </Animated.View>
            );
          })}

          {/* Actions */}
          <Animated.View
            entering={FadeInDown.delay(500)
              .springify()
              .damping(11)}
            style={styles.buttons}
          >
            <Pressable style={styles.resetButton} onPress={onReset}>
              <Text
                style={[
                  styles.buttonText,
                  { color: theme.colors.neutral(0.9) },
                ]}
              >
                Reset
              </Text>
            </Pressable>
            <Pressable style={styles.applyButton} onPress={onApply}>
              <Text style={[styles.buttonText, { color: theme.colors.white }]}>
                Apply
              </Text>
            </Pressable>
          </Animated.View>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

const sections = {
  order: (props) => <CommonFilterRow {...props} />,
  orientation: (props) => <CommonFilterRow {...props} />,
  type: (props) => <CommonFilterRow {...props} />,
  colors: (props) => <ColorFilter {...props} />,
};

const CustomBackdrop = ({ animatedIndex, style }) => {
  const containerAnimatedStyle = useAnimatedStyle(() => {
    let opacity = interpolate(
      animatedIndex.value,
      [-1, 0],
      [0, 1],
      Extrapolation.CLAMP
    );
    return {
      opacity,
    };
  });

  const containerStyle = [StyleSheet.absoluteFill, style, styles.overlay];

  return (
    <Animated.View style={containerStyle}>
      {/* Blur View */}
      <BlurView style={StyleSheet.absoluteFill} tint="dark" intensity={25} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  content: {
    gap: 15, // Space between filter sections
    paddingVertical: 10, // Top & bottom padding for content
    paddingHorizontal: 20, // Left & right padding for content
  },
  filterText: {
    fontSize: hp(4), // Dynamic font size
    fontWeight: theme.fontWeights.semibold, // Semi-bold text for the heading
    color: theme.colors.neutral(0.8), // Text color from theme
    marginBottom: 5, // Margin below the heading text
  },
  buttons: {
    flexDirection: "row", // Align the buttons horizontally
    justifyContent: "space-between", // Space between the buttons
    paddingVertical: 20, // Padding to lift the buttons from the bottom
    paddingHorizontal: 10, // Horizontal padding around buttons
    marginTop: 20, // Extra margin to lift buttons above the content
  },
  applyButton: {
    flex: 1, // Button takes equal width
    backgroundColor: theme.colors.neutral(0.8), // Apply button color from theme
    paddingVertical: 12, // Padding inside the button
    alignItems: "center", // Center text horizontally
    justifyContent: "center", // Center text vertically
    borderRadius: theme.radius.md, // Rounded corners
    marginLeft: 10, // Space between buttons
  },
  resetButton: {
    flex: 1, // Button takes equal width
    backgroundColor: theme.colors.neutral(0.3), // Reset button color
    paddingVertical: 12, // Padding inside the button
    alignItems: "center", // Center text horizontally
    justifyContent: "center", // Center text vertically
    borderRadius: theme.radius.md, // Rounded corners
    marginRight: 10, // Space between buttons
    borderColor: theme.colors.grayBG, // Border color for reset button
    borderWidth: 1, // Add a border to reset button
  },
  buttonText: {
    fontSize: hp(2.2), // Font size for button text
  },
});

export default FiltersModal;

