package com.customfp.myframeprocessor

import android.util.Log
import com.mrousavy.camera.frameprocessors.Frame
import com.mrousavy.camera.frameprocessors.FrameProcessorPlugin
import com.mrousavy.camera.frameprocessors.VisionCameraProxy

class MyFrameProcessorPlugin(
  proxy: VisionCameraProxy,
  options: Map<String, Any>?
) : FrameProcessorPlugin() {

  override fun callback(frame: Frame, arguments: Map<String, Any>?): Any? {
    val width = frame.width
    val height = frame.height

    // Convert pixelFormat enum to String (name)
    val pixelFormatName = frame.pixelFormat.name

    val timestampNs = frame.timestamp.toDouble()
    Log.d("MyFrameProcessor", "Frame - Size: ${width}x$height, Format: $pixelFormatName, Timestamp: $timestampNs")

    return mapOf(
      "width" to width,
      "height" to height,
      "pixelFormat" to pixelFormatName,  // Return string instead of enum object
      "timestamp" to timestampNs
    )
  }
}
