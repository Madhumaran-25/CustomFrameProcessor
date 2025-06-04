import 'react-native-reanimated';

import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Camera, useCameraDevice, useFrameProcessor } from 'react-native-vision-camera';
import { VisionCameraProxy } from 'react-native-vision-camera';
import { runOnJS } from 'react-native-reanimated';

const plugin = VisionCameraProxy.initFrameProcessorPlugin('FrameDetector', {});

function FrameDetector(frame) {
  'worklet';
  if (plugin == null) throw new Error('Plugin not loaded!');
  return plugin.call(frame);
}

const App = () => {
  const device = useCameraDevice('back');
  const [frameData, setFrameData] = useState(null);

  const onFrameProcessorResult = useCallback((result) => {
    setFrameData(result);
  }, []);

  const frameProcessor = useFrameProcessor((frame) => {
    'worklet';
    const result = FrameDetector(frame);
    console.log(`Faces in Frame detected: ${JSON.stringify(result)}`);
  }, []);

  useEffect(() => {
    Camera.requestCameraPermission();
  }, []);

  if (device == null) return null;

  return (
    <View style={styles.container}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        frameProcessor={frameProcessor}
        frameProcessorFps={5}
      />
  
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoBox: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    backgroundColor: '#000000aa',
    padding: 10,
    borderRadius: 8,
  },
  text: {
    color: 'white',
  },
});
