import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import { useSelector } from 'react-redux'
import { useCanvasContext } from '@components/Canvas/hooks'
import { useCoreHandler } from "@/components/Canvas/handlers"
import { fabric } from 'fabric'
import axios from 'axios'

function BackgroundPanel() {
  const { canvas, } = useCanvasContext()
  const { addImageToBackground } = useCoreHandler()
  const elements = useSelector((state: any) => state.elements)

  const onAddImage = async (url: string) => {
    // let img = await axios.get(url, {
    //   responseType: "blob"
    // })
    // // res.setHeader("contentType", "image/svg+xml")
    // // let image = URL.createObjectURL(img.data)
    // var reader = new FileReader();
    // reader.readAsDataURL(img.data);
    // reader.onloadend = function () {
    //   var base64data = reader.result;

    //   fabric.Image.fromURL(base64data as string, function (img) {
    //     // add background image
    //     canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
    //       scaleX: canvas.width / img.width,
    //       scaleY: canvas.height / img.height
    //     });
    //   });
    // }
    await addImageToBackground({url})
  }

  const renderGraphics = (c: string) => {
    let array = elements.elements.filter((e: any) => e.category === c)
    return (
      array.map((vector: any, index: number) => (
        c === vector.category ?
          <div key={index} onClick={() => onAddImage(vector.url)}>
            <img

              src={vector.url}
              style={{
                width: `64px`,
                height: `64px`,
                objectFit: "contain",
                pointerEvents: "none",
                verticalAlign: "middle",
              }}
            />
          </div>
          : null
      ))

    )
  }

  return (
    <>
      <div style={{ padding: '1rem 1.5rem' }}>
      <InputGroup className='AtSearchInput'>
          <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.300" />} />
          <Input style={{ background: '#fff' }} type="tel" placeholder="Search background images" />
        </InputGroup>
        <div className='AtFlex Atscroll' >
          {renderGraphics("TEXTURES")}
        </div>

      </div>
    </>
  )
}
export default BackgroundPanel
