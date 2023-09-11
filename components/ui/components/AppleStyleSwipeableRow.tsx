import React, { Component, PropsWithChildren } from 'react';
import { Animated, StyleSheet, Text, View, I18nManager } from 'react-native';

import { RectButton } from 'react-native-gesture-handler';

import Swipeable from 'react-native-gesture-handler/Swipeable';
import { colors, fontSizes } from '../../../styles/defaults';
import { store } from '../../../src/redux/store';
import { userSlice } from '../../../src/redux/reducers';
import { SvgXml } from 'react-native-svg';
import { svgThrash } from '../images/svgs';
import { foodItem } from '../../../src/database/models';

type itemProps = {
  item: foodItem;
  quantity: number;
}
export default class AppleStyleSwipeableRow extends Component<
  PropsWithChildren<itemProps>
> {
  private renderLeftActions = (
    _progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>
  ) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
      extrapolate: 'clamp',
    });
    return (
      <RectButton style={styles.leftAction} onPress={this.deleteItem}>
        <Animated.Text
          style={[
            styles.actionText,
            {
              transform: [{ translateX: trans }],
            },
          ]}>
          Remove
        </Animated.Text>
      </RectButton>
    );
  };

  private deleteItem = (() => {
    
    try {
      store.dispatch(userSlice.actions.popCart(this.props.item.id))
      console.log('Deleting item ID: ', this.props.item.id, ' (AppleStyleSwipeable)');
    } catch {
      console.log("Error on deleting from state.");
    }
    // this.close();
  })

  private addItem = (() => {
    
    try {
      console.log('Adding item ID: ', this.props.item.id, ' (AppleStyleSwipeable)');
      if (this.props.item)
        store.dispatch(userSlice.actions.appendCart(this.props.item))
    } catch {
      console.log("Error on adding from state.");
    }
    // this.close();
  })

  private deleteAllItem = (() => {
    try {
      store.dispatch(userSlice.actions.popStackCart(this.props.item.id))
      console.log('Deleting item entirely ID: ', this.props.item.id, ' (AppleStyleSwipeable)');
    } catch {
      console.log("Error on deleting all from state.");
    }
    this.close();
  })

  private renderRightAction = (
    text: string,
    color: string,
    x: number,
    progress: Animated.AnimatedInterpolation<number>,
    icon?: string | undefined,
    textColor?: string | undefined
  ) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
    });

    const pressHandler = () => {

      switch (text) {
        case '–':
          this.deleteItem();
          break;
        case '+':
          this.addItem();
          break;
        case 'X':
          this.deleteAllItem();
          break;
      }

      //TODO: add timer reset after each action
      // timeout.refresh();

      // this.close();
      // eslint-disable-next-line no-alert
      // window.alert(text);
    };

    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
        <RectButton
          style={[styles.rightAction, { backgroundColor: color }]}
          onPress={pressHandler}>
          {
            icon ? 
            <SvgXml xml={icon} width={24} height={24} fill={colors.white}/>
            :
            <Text style={[styles.actionText, textColor ? {flex: 1, textAlign: 'center', textAlignVertical: 'center', fontSize: fontSizes.m, backgroundColor: colors.quaternary, borderTopLeftRadius: 12, borderBottomLeftRadius: 12, width: 35, paddingVertical: 18, fontWeight: '700'} : {}]}>{text}</Text>
          }
        </RectButton>
      </Animated.View>
    );
  };

  private renderRightActions = (
    progress: Animated.AnimatedInterpolation<number>,
    _dragAnimatedValue: Animated.AnimatedInterpolation<number>
  ) => (
    <View
      style={{
        // width: 192,
        width: 140,
        flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
      }}>
      {this.renderRightAction('x' + this.props.quantity.toString(), colors.white, 140, progress, ``, colors.quaternary)}
      {this.renderRightAction('–', '#c8c7cd', 105, progress)}
      {this.renderRightAction('+', '#ffab00', 70, progress)}
      {this.renderRightAction('X', '#dd2c00', 35, progress, svgThrash)}
    </View>
  );

  private swipeableRow?: Swipeable;

  private updateRef = (ref: Swipeable) => {
    this.swipeableRow = ref;
  };
  private close = () => {
    this.swipeableRow?.close();
  };
  render() {
    const { children } = this.props;
    return (
      <Swipeable
        ref={this.updateRef}
        friction={2}
        enableTrackpadTwoFingerGesture
        leftThreshold={20}
        rightThreshold={20}
        // renderLeftActions={this.renderLeftActions}
        renderRightActions={this.renderRightActions}
        onSwipeableOpen={(direction) => {
          console.log(`Opening swipeable from the ${direction}`);
        }}
        onSwipeableClose={(direction) => {
          console.log(`Closing swipeable to the ${direction}`);
        }}>
        {children}
      </Swipeable>
    );
  }
}

const styles = StyleSheet.create({
  leftAction: {
    flex: 1,
    backgroundColor: colors.quaternary,
    justifyContent: 'center',
  },
  actionText: {
    color: colors.white,
    fontSize: fontSizes.xxxl,
    backgroundColor: 'transparent',
    padding: 8,
  },
  rightAction: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});