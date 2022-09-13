import axios from 'axios';
import { fabric } from 'fabric'

function generateId(type) {
  return `${type}-${Math.random().toString(36).substr(2, 9)}`;
}

export const CanvasObjects = {
  text: {
    render: options => {
      const { text, ...textOptions } = options
      return new fabric.Textbox(text, { ...textOptions, dirty: true })
    },
  },
  image: {
    render: options => {
      return new Promise(async (resolve, reject) => {
        const { element, ...imageOption } = options
        let img = await axios.get(element, {
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
              // angle: 45,
              width: 500,
              height: 500,
              left: 50,
              top: 70,
              scaleX: .25,
              scaleY: .25,
              dirty: true
            })
            resolve(img)
          }
          pugImg.src = base64data as string
        }

      })

    },
  },

  path: {
    render: options => {
      const { element, ...imageOption } = options
      return new Promise(async (resolve, reject) => {
        new fabric.loadSVGFromURL(element, (objects, options) => {
          var obj = fabric.util.groupSVGElements(objects, options);
          resolve(obj)
        })
      })

    },
  }
}
