import { useEffect } from 'react'
import { useCanvasContext } from '@components/Canvas/hooks'
import { fabric } from 'fabric'
import {
  useCustomizationHandler,
  useEventsHandler,
  useZoomHandler,
  useContainerHandler,
  useGuidelinesHandler,
} from '@components/Canvas/handlers'

function Canvas() {
  const containerRef = useContainerHandler()
  const { setCanvas, setZoomRatio } = useCanvasContext()
  useCustomizationHandler()
  useGuidelinesHandler()
  useEventsHandler()
  useZoomHandler()
  useEffect(() => {
    const initialHeigh = containerRef.current.clientHeight
    const initialWidth = containerRef.current.clientWidth
// new fabric.fr
    const canvas = new fabric.Canvas('canvas', {
      backgroundColor: 'rgba(0,0,0,0)',
      // height: 600 ,
      height: initialHeigh ,
      // width: 600,
      width: initialWidth,
      preserveObjectStacking: true,
      
    })
    console.log("Cnavas:--=", canvas)

    setCanvas(canvas)
    // new fabric.s
    const workarea = new fabric.Rect({
      //@ts-ignore
      id: 'workarea',
      width: 1920,
      height: 1080,
      absolutePositioned: true,
      fill: '#ffffff',
      selectable: false,
      hoverCursor: 'default',
      dirty: true
    })
    setZoomRatio((canvas.width + canvas.height) / (workarea.width + workarea.height)/2)
// let sx = workarea.scaleX
// let sy = workarea.scaleY

    // workarea.width = sx * 400
    // workarea.height = sy * 200

    // var size = 150;
    // var side = Math.round((size * Math.sqrt(2)) / (2 + Math.sqrt(2)));
    //     const workarea = new fabric.Polygon([
    //       {x:-side / 2, y:size / 2},
    //       {x:side / 2, y:size / 2},
    //       {x:size / 2, y:side / 2},
    //       {x:size / 2, y:-side / 2},
    //       {x:side / 2, y:-size / 2},
    //       {x:-side / 2, y:-size / 2},
    //       {x:-size / 2, y:-side / 2},
    //       {x:-size / 2, y:side / 2}], {
    //       //@ts-ignore
    //       id: 'workarea',
          
        
    //       absolutePositioned: true,
    //       // scaleX: 1,
    //       // scaleY: 1,
    //       fill: "#ffffff",
    //       selectable: false,
    //       hoverCursor: 'default',
    //     })
    //     workarea.scaleToWidth(600)
    //     workarea.scaleToHeight(400)
    canvas.add(workarea)
    workarea.center()
  }, [])
  return (
    <div className="editor-canvas" ref={containerRef}>
      <canvas id="canvas"></canvas>
    </div>
  )
}

export default Canvas
