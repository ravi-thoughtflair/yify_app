import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface FabButton {
  icon?: string;
  title?: string;
  color?: string;
  handler?: () => void | boolean;
}

interface FabToolbarProps {
  position?: 'left' | 'right' | 'bottom';
  color?: string;
  icon?: string;
  enableBackdropDismiss?: boolean;
  buttons: FabButton[];
}

export const FabToolbar: React.FC<FabToolbarProps> = ({
  position = 'left',
  color = '#01d277',
  icon = 'more',
  enableBackdropDismiss = true,
  buttons,
}) => {
  const [active, setActive] = useState(false);

  const openButton = () => setActive(true);
  const closeButton = () => setActive(false);

  const handleBackdrop = () => {
    if (enableBackdropDismiss && active) closeButton();
  };

  const handleButton = (button: FabButton) => {
    let shouldDismiss = true;
    if (button.handler) {
      if (button.handler() === false) shouldDismiss = false;
    }
    if (shouldDismiss) closeButton();
  };

  return (
    <View style={[styles.toolbar, styles[position]]}>
      {active && (
        <Modal transparent visible={active} animationType="fade">
          <TouchableOpacity
            style={styles.backdrop}
            activeOpacity={1}
            onPress={handleBackdrop}
          />
          <View style={styles.fabToolbar}>
            {buttons.map((b, idx) => (
              <TouchableOpacity
                key={idx}
                style={[
                  styles.fabButton,
                  { backgroundColor: b.color || color },
                ]}
                onPress={() => handleButton(b)}
              >
                {/* Replace with icon library as needed */}
                {b.icon && <Text style={styles.icon}>{b.icon}</Text>}
                {b.title && <Text style={styles.label}>{b.title}</Text>}
              </TouchableOpacity>
            ))}
          </View>
        </Modal>
      )}
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: color }]}
        onPress={openButton}
      >
        {/* Replace with icon library as needed */}
        <Text style={styles.icon}>{icon}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  toolbar: {
    position: 'absolute',
    width: 68,
    height: 68,
    zIndex: 100,
  },
  left: { left: 0 },
  right: { right: 0 },
  bottom: { bottom: '3%' },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  fabToolbar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  fabButton: {
    marginHorizontal: 8,
    padding: 12,
    borderRadius: 24,
    alignItems: 'center',
  },
  icon: {
    fontSize: 24,
    color: '#fff',
  },
  label: {
    color: '#fff',
    fontSize: 14,
    marginTop: 4,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
});
