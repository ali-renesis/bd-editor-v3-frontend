import { useCallback, useEffect } from 'react'
import { useCanvasContext } from '@components/Canvas/hooks'
import { isArrow, isCtrlShiftZ, isCtrlZ } from '../utils/keyboard'

function useEventHandlers() {
  const { canvas, setActiveObject, activeObject, setZoomRatio } = useCanvasContext()

  /**
   * Canvas Mouse wheel handler
   */

  var historyUndo = [];
  var historyChanged = []
  var historyUndo = []
  var mods = 0;

  const onMouseWheel = useCallback(
    event => {
      if (canvas && event.e.ctrlKey) {
        var delta = event.e.deltaY;
        var zoomRatio = canvas.getZoom();
        zoomRatio *= 0.999 ** delta;
        if (zoomRatio > 20) zoomRatio = 20;
        if (zoomRatio < 0.01) zoomRatio = 0.01;
      
        // const delta = event.e.deltaY
        // let zoomRatio = canvas.getZoom()
        // if (delta > 0) {
        //   zoomRatio -= 0.04
        // } else {
        //   zoomRatio += 0.04
        // }
        //@ts-ignore
        canvas.zoomToPoint({ x: event.e.offsetX, y: event.e.offsetY },zoomRatio)
        setZoomRatio(zoomRatio)
      }
      event.e.preventDefault()
      event.e.stopPropagation()
    },
    [canvas]
  )

  useEffect(() => {
    if (canvas) {
      canvas.on('mouse:wheel', onMouseWheel)
    }
    return () => {
      if (canvas) {
        canvas.off('mouse:wheel', onMouseWheel)
      }
    }
  }, [canvas])

  /**
   * Canvas selection handlers
   */

  const onSelect = useCallback(
    ({ target }) => {
      console.log("on select call", target)
      if (canvas?.getActiveObject()) {
        if (canvas) {
          setActiveObject(canvas.getActiveObject())
        }
      } else {
        setActiveObject(null)
      }
    },
    [canvas]
  )

  useEffect(() => {
    if (canvas) {
      canvas.on('selection:created', onSelect)
      canvas.on('selection:cleared', onSelect)
      canvas.on('selection:updated', onSelect)
      canvas.on('object:modified', onModified)
      canvas.on('object:added', onModified)
    }
    return () => {
      if (canvas) {
        canvas.off('selection:cleared', onSelect)
        canvas.off('selection:created', onSelect)
        canvas.off('selection:updated', onSelect)
        canvas.on('object:modified', onModified)
        canvas.on('object:added', onModified)
      }
    }
  }, [canvas])

  const onModified = useCallback(
    ({ target }) => {
      updateModifications(true);
      console.log("modified:-=-=", target)
      // console.log("canvas:-=-=", canvas)
    },
    [canvas]
  )

  function updateModifications(savehistory) {
    if (savehistory === true) {
      let myjson = JSON.stringify(canvas);

    }
  }

  /**
   * Keyboard Events Handler
   */

  const undo = useCallback(() => {
    // @ts-ignore
    if (canvas._objects.length > 1) {
      historyChanged.push(canvas._objects.pop());
      canvas.renderAll();
    }
  }, [canvas])

  const redo = useCallback(() => {
    // @ts-ignore
    if (historyChanged.length > 0) {
      // isRedoing = true;
      canvas.add(historyChanged.pop());
    }
  }, [canvas])

  const moveUp = useCallback(() => {
    if (activeObject && canvas) {
      activeObject.top = activeObject.top - 2
      activeObject.setCoords()
      canvas.requestRenderAll()
    }
  }, [activeObject, canvas])

  const moveDown = useCallback(() => {
    if (activeObject && canvas) {
      activeObject.top = activeObject.top + 2
      activeObject.setCoords()
      canvas.requestRenderAll()
    }
  }, [activeObject, canvas])

  const moveRight = useCallback(() => {
    if (activeObject && canvas) {
      activeObject.left = activeObject.left + 2
      activeObject.setCoords()
      canvas.requestRenderAll()
    }
  }, [activeObject, canvas])

  const moveLeft = useCallback(() => {
    if (activeObject && canvas) {
      activeObject.left = activeObject.left - 2
      activeObject.setCoords()
      canvas.requestRenderAll()
    }
  }, [activeObject, canvas])

  const onKeyDown = useCallback(
    e => {
      isCtrlZ(e) && undo()
      isCtrlShiftZ(e) && redo()
      if (isArrow(e)) {
        e.code === 'ArrowLeft' && moveLeft()
        e.code === 'ArrowRight' && moveRight()
        e.code === 'ArrowDown' && moveDown()
        e.code === 'ArrowUp' && moveUp()
        e.code === 'Backspace' && deleteObject()
      }
    },
    [canvas, activeObject]
  )

  const deleteObject = useCallback(
    () => {

      canvas.remove(canvas.getActiveObject());
    },
    [canvas, activeObject]
  )
  useEffect(() => {
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [canvas, activeObject])
}

export default useEventHandlers
