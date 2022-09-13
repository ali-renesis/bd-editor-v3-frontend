import { useCanvasContext } from '@components/Canvas/hooks'
import { useCallback } from 'react'
import { CanvasObjects } from '@components/Canvas'
import { propertiesToInclude } from '../constants/contants'
import { fabric } from 'fabric'
import axios from 'axios'

function useCoreHandler() {
  const { canvas, activeObject, setZoomRatio } = useCanvasContext()

  // Add objects to canvas
  const addObject = useCallback(
    async options => {
      const { type, ...textOptions } = options
      const element = await CanvasObjects[type].render(textOptions)
      //@ts-ignore
      const workarea = canvas.getObjects().find(obj => obj.id === 'workarea')
      // canvas.clipPath = workarea.clipPath
      canvas.add(element)
      element.center()

      element.clipPath = workarea
      canvas.renderAll()
    },
    [canvas]
  )

  const addImageToBackground = useCallback(
    async options => {
      const { url } = options
      //@ts-ignore
      const workarea = canvas.getObjects().find(obj => obj.id === 'workarea')
      const element: any = await new Promise(async (resolve, reject) => {
        const { url, ...imageOption } = options
        let img = await axios.get(url, {
          responseType: "blob"
        })
        // res.setHeader("contentType", "image/svg+xml")
        // let image = URL.createObjectURL(img.data)
        var reader = new FileReader();
        reader.readAsDataURL(img.data);
        reader.onloadend = function () {
          var base64data = reader.result;
          var pugImg = new Image();
          pugImg.onload = function (image) {
            // var pug = new fabric.Image(pugImg,);
            let img = new fabric.Image(pugImg, {
              //@ts-ignore
              id: "background-image",
              // angle: 45,
              // width: workarea.width,
              // height: workarea.height,
              // // left: 50,
              // // top: 70,
              // scaleX: workarea.scaleX,
              // scaleY: workarea.scaleY,
              dirty: true,
              // selectable: false,
              lockMovementX: true,
              lockMovementY: true,
            })


            if ((workarea.height / workarea.width) >= (img.height / img.width)) {
              img.scaleToHeight(workarea.height);
              img.set({
                top: workarea.top,
                left: (workarea.left + (workarea.width / 2)) - (img.getBoundingRect().width / 2)
              });
            }
            else {
              img.scaleToWidth(workarea.width);
              img.set({
                top: (workarea.top + (workarea.height / 2)) - (img.getBoundingRect().height / 2),
                left: workarea.left
              });
            }

            resolve(img)
          }
          pugImg.src = base64data as string
        }

      })

      // const workarea = canvas.getObjects().find(obj => obj.id === 'workarea')
      // canvas.clipPath = workarea.clipPath
      //@ts-ignore
      const backImage = canvas.getObjects().find(obj => obj.id === 'background-image')
      if (backImage) {
        canvas.insertAt(element, 1, true)
      } else {

        canvas.insertAt(element, 1, false)
      }
      element.center()

      element.clipPath = workarea
      canvas.renderAll()
    },
    [canvas]
  )

  // Update properties, optional set metadata if present
  const setProperty = useCallback(
    (property, value) => {
      if (activeObject) {
        activeObject.set(property, value)
        activeObject.setCoords()
        canvas.fire('object:modified', { target: activeObject })
        canvas.requestRenderAll()
      }
    },
    [activeObject, canvas]
  )

  const exportJSON = useCallback(() => {
    const json = canvas.toJSON(propertiesToInclude)
    return json
  }, [canvas])

  const loadJSON = useCallback(
    json => {
      if (canvas) {
        canvas.loadFromJSON(json, () => {
          canvas.requestRenderAll()
        })
      }
    },
    [canvas]
  )

  const setCanvasBackgroundColor = useCallback(
    color => {
      // @ts-ignore
      const workarea = canvas.getObjects().find(object => object.id === 'workarea')
      if (workarea) {
        workarea.set('fill', color)
        canvas.requestRenderAll()
      }
    },
    [canvas]
  )

  const UpdateLayers = useCallback((position: string = "TOP" || "BOTTOM" || "SHIFTDOWN" || "SHIFTUP") => {
    if (position === "TOP") {
      activeObject.moveTo(canvas._objects.length - 1)
    } else if (position === "BOTTOM") {

      // activeObject.sendToBack()
      activeObject.moveTo(1)

    }
    else if (position === "SHIFTDOWN") {
      let index = canvas._objects.indexOf(activeObject)
      if (index > 1) {

        activeObject.moveTo(index - 1)
      }

    }
    else if (position === "SHIFTUP") {
      let index = canvas._objects.indexOf(activeObject)
      let total = canvas._objects.length
      if (index < total - 1) {

        activeObject.moveTo(index + 1)
      }

    }

  }, [canvas, activeObject])

  const ArrangeAlignments = useCallback((position: string) => {
    if (!activeObject) return
    let parent = canvas._objects[0]


    switch (position) {

      case 'left':
        activeObject.set({
          left: parent.left
        });
        activeObject.setCoords();
        canvas.renderAll();
        return;
      case 'right':
        activeObject.set({
          left: parent.width / 2
        });
        activeObject.setCoords();
        canvas.renderAll();
        return;
      case 'top':
        activeObject.set({
          top: parent.top
        });
        activeObject.setCoords();
        canvas.renderAll();
        return;
      case 'bottom':
        activeObject.set({
          top: parent.height / 2
        });
        activeObject.setCoords();
        canvas.renderAll();
        return;
      case 'center':
        activeObject.set({
          left: (canvas.width / 2) - ((activeObject.width * activeObject.scaleX) / 2)
        });
        activeObject.setCoords();
        canvas.renderAll();
        return;
    }
  }, [canvas, activeObject])

  const LockObjects = useCallback(() => {
    if (!activeObject) return

    if (activeObject.lockMovementX && activeObject.lockMovementY) {
      activeObject.set({
        lockMovementX: false,
        lockMovementY: false
      })
    } else {
      activeObject.set({
        lockMovementX: true,
        lockMovementY: true
      })
      canvas.renderAll();
    }

  }, [canvas, activeObject])


  const Grouping = useCallback(() => {
    if (!activeObject) {
      return
    }
    // canvas.getActiveObjects().toGr
  }, [canvas, activeObject])

  const exportPng = useCallback(() => {
    if (!canvas) {
      return
    }
    // var obj = fabric.util.groupSVGElements(canvas._objects)
    var originalTransform = canvas.viewportTransform;
    canvas.viewportTransform = fabric.iMatrix.slice(0);
    let img = canvas.toDataURL({
      format: 'png',
      multiplier: 1,
      left: canvas._objects[0].left,
      top: canvas._objects[0].top,
      width: canvas._objects[0].width * canvas._objects[0].scaleX,
      height: canvas._objects[0].height * canvas._objects[0].scaleY
    })
    canvas.viewportTransform = originalTransform;
    return img
    // canvas.getActiveObjects().toGr
  }, [canvas])

  const exportPDF = useCallback(() => {
    if (!canvas) {
      return
    }

    canvas.toSVG()

    // canvas.getActiveObjects().toGr
  }, [canvas, activeObject])

  const ImportFromSVG = useCallback((url: any) => {
    canvas.remove(...canvas.getObjects())
    canvas.viewportTransform = fabric.iMatrix.slice(0);

    new fabric.loadSVGFromURL(url, (objects: any, options: any) => {
      var obj = fabric.util.groupSVGElements(objects)
      // console.log("obe:-=-=", obj.height, obj.width)
      // const workarea = new fabric.Rect({
      //   //@ts-ignore
      //   id: 'workarea',
      //   width: obj.width,
      //   height: obj.height,
      //   absolutePositioned: true,
      //   fill: '#ffffff',
      //   selectable: false,
      //   hoverCursor: 'default',
      //   dirty: true
      // })


      // canvas.add(workarea)
      // workarea.center()

      objects.forEach(function (svg, index) {

        // svg.set({
        //   hoverCursor: 'default',
        //   dirty: true
        // })
        // svg.set({
        //    ...options[index]
        // });
        // svg.scaleToWidth(50);
        // svg.scaleToHeight(50);
        canvas.add(svg)
        // if (index === 0){
        //   svg.center()
        // }
        // svg.center()

        // svg.clipPath = workarea
        canvas.renderAll()
      });
      setZoomRatio((canvas.width + canvas.height) / (obj.width + obj.height) / 2)
    })
  }, [canvas])
  return {
    exportJSON,
    loadJSON,
    setCanvasBackgroundColor,
    addObject,
    setProperty,
    UpdateLayers,
    exportPng,
    exportPDF,
    addImageToBackground,
    ImportFromSVG,
    ArrangeAlignments,
    LockObjects
  }
}

export default useCoreHandler
