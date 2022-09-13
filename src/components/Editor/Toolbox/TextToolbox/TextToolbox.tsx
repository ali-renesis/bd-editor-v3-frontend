// @ts-nocheck
import { ChevronDownIcon } from '@chakra-ui/icons'
import { useCanvasContext } from '@/components/Canvas/hooks'
import { useEffect, useState } from 'react'
import { Popover, PopoverTrigger, PopoverContent, PopoverBody } from '@chakra-ui/react'
import './TextToolbox.scss'
import { useCoreHandler } from '@/components/Canvas/handlers'
import { FONT_SIZES } from '@/utils/constant'
import Button from '@/components/common/button/Button'
 
const fontsList = ['Open Sans', 'Lexend', 'Comic Neue', 'Patrick Hand', 'Allison', 'Abril Fatface', 'Arial Th', 'Arial MT', 'Arima Bold', 'Arima Regular', 'Arima Semi Bold', 'Arima Light', 'Arima Extra Light', 'Arima Thin', 'Arima Medium', 'Arial GEO Bold', 'Arial Narrow', 'Arial GEO Italic', 'Aboreto', 'Arima', 'Geo_Arial', 'Ballet', 'Ballet Smaller', 'Ballet Small', 'Ballet Medium', 'Ballet Large', 'Bebas Neue', 'Bowlby One', 'Brand Light Pro', 'BLACKHAWK', 'BLACKHAWK Swash', 'BLACKHAWK Italic', 'Brand Inline Pro', 'Brande Shade Solo Pro', 'Butler Stencil Light', 'Brand Pro', 'Butler Stencil', 'Butler Stencil Two', 'Butler Stencil Black', 'Butler Stencil Bold', 'Butler Stencil Three', 'Butler Stencil Extra Bold', 'Brand Shade Pro', 'Butler Stencil Utra Light',
 'Butler Stencil Medium',
 'Cinzel Bold',
 'Cinzel Extra Bold',
 'Cinzel Regular',
 'Cinzel Semi Bold',
 'Calibri Light Italic',
 'Calibri Italic',
 'Calibri Bold Italic',
 'Calibri Bold',
 'Calibri',
 'Calibri Light',
 'Chonburi Regular',
 'Cinzel Black',
 'Charlotte',
 'Courgette',
 'Crimson Roman',
 'Crimson Bold',
 'Copperplate Std_29_AB',
 'Copperplate Std_30_BC',
 'Copperplate Std_31_AB',
 'Copperplate Std_32_BC',
 'Copperplate Std_33_BC',
 'Crimson Italic',
 'Crimson Bold Italic',
 'Crimson Semi Bold',
 'Crimson Semi Bold Italic',
 'Crimson Text Semi Bold',
 'Crimson Text Bold Italic',
 'Crimson Text Italic',
 'Crimson Text Semi Bold Italic',
 'Crimson Text Regular',
 'Crimson Text Bold',
 
]

function TextTool() {
  const { activeObject, canvas } = useCanvasContext()
  const { setProperty } = useCoreHandler()
  const [options, setOptions] = useState({
    fontFamily: 'Lexend',
    fontSize: 1,
    fontWeight: 2,
    textAlign: 'center',
    textDecoration: 'none',
    fontStyle: 'none'
  })

  const popover: CSSProperties = {
    position: 'absolute',
    zIndex: 2,
  }
  const cover: CSSProperties = {
    position: 'fixed',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
  }

  useEffect(() => {
    if (activeObject) {
      const updatedOptions = {
        fontFamily: activeObject.fontFamily,
        fontSize: activeObject.fontSize,
        fontWeight: activeObject.fontWeight,
        textAlign: activeObject.textAlign,
        fontStyle: activeObject.fontStyle,
        textDecoration: activeObject.textDecoration,
      }
      setOptions({ ...options, ...updatedOptions })
    }
  }, [activeObject])

  const onChangeFontFamily = fontFamily => {
    setProperty('fontFamily', fontFamily)
    setOptions({ ...options, fontFamily })
  }

  const onChangeFontSize = fontSize => {
    setProperty('fontSize', fontSize)
    setOptions({ ...options, fontSize })
  }

  const onBold = () => {
    if (options.fontWeight === 900) {
      setProperty('fontWeight', 300)
      setOptions({ ...options, fontWeight: 300 })
      return
    }
    setProperty('fontWeight', 900)
    setOptions({ ...options, fontWeight: 900 })
  }

  const onItalic = () => {
    if (options.fontStyle === 'italic') {
      setProperty('fontStyle', 'normal')
      setOptions({ ...options, fontStyle: 'normal' })
      return
    }
    setProperty('fontStyle', 'italic')
    setOptions({ ...options, fontStyle: 'italic' })
  }

  const onUnderline = () => {
    if (!activeObject) return
    if (activeObject.styleHas('underline')) {

      activeObject.removeStyle('underline')
    } else {
      activeObject.setSelectionStyles({ underline: true }, 0, activeObject?.text?.length)

    }
    canvas.renderAll()
    // if (options.textDecoration === 'underline') {
    //   setProperty('textDecoration', 'none')
    //   setOptions({ ...options, textDecoration: 'none' })
    //   return
    // }
    // setProperty('textDecoration', 'underline')
    // setOptions({ ...options, textDecoration: 'underline' })
  }

  const onUpperCase = () => {
    if (!activeObject) return
    if (activeObject.text === activeObject.text.toUpperCase()) {
      activeObject.text = activeObject.text.toLowerCase()

    } else {
      activeObject.text = activeObject.text.toUpperCase()

    }
    canvas.renderAll()
  }

  return (
    <div className='AtFlexCenter'>
      <div>
        <Popover placement="bottom-start" matchWidth={true}>
          <PopoverTrigger>
            <div className="font-family-selector">
              <div>{options.fontFamily}</div>
              <ChevronDownIcon />
            </div>
          </PopoverTrigger>
          <PopoverContent style={{ width: '240px' }}>
            <PopoverBody className='AtSelectFontFamily AtHideScrollbar'>
              {fontsList.map(fontItem => (
                <div
                  onClick={() => onChangeFontFamily(fontItem)}
                  style={{ fontFamily: fontItem }}
                  className="list-item"
                  key={fontItem}
                >
                  {fontItem}
                </div>
              ))}
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </div>

      <div className='AtMl10'>
        <Popover placement="bottom-start" matchWidth={true}>
          <PopoverTrigger>
            <div className="font-size-selector">
              <div>{options.fontSize}</div>
              <ChevronDownIcon />
            </div>
          </PopoverTrigger>
          <PopoverContent style={{ width: '60px', height: '200px' }}>
            <PopoverBody className='AtSelectFontSize AtHideScrollbar'>
              {FONT_SIZES.map(fontItem => (
                <div
                  onClick={() => onChangeFontSize(fontItem)}
                  className="list-item"
                  key={fontItem}
                >
                  {fontItem}
                </div>
              ))}
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </div>
      <Button className={`AtMl10 AtBtnTool ${options.fontWeight === 900 ? 'AtActive' : ''}`} onClick={() => onBold()}>
        <i className='icon-bold AtTextTools'></i>
      </Button>
      <Button className={`AtMl10 AtBtnTool ${options.fontStyle === 'italic' ? 'AtActive' : ''}`} onClick={() => onItalic()}>
        <i className='icon-italic AtTextTools'></i>
      </Button>
      <Button className={`AtMl10 AtBtnTool ${activeObject?.styleHas('underline') ? 'AtActive' : ''}`} onClick={() => onUnderline()}>
        <i className='icon-underline AtTextTools'></i>
      </Button>
      <Button className='AtMl10 AtBtnTool' onClick={() => onUpperCase()}>
        <i className='icon-lettercase AtTextTools'></i>
      </Button>
      <div className='AtLayerPosition AtLayerPositionText'>
        <Popover placement="bottom-start" matchWidth={true}>
          <PopoverTrigger>
            <Button className='AtMl10 AtBtnTool'>
              <i className='icon-textcenter AtTextTools'></i>
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className='AtPosBtns'>
              <Button className='AtPosBtn' >
                <i className='icon-textleft'></i>
              </Button>
              <Button className='AtPosBtn' >
                <i className='icon-textcenter'></i>
              </Button>
              <Button className='AtPosBtn' >
                <i className='icon-textright'></i>
              </Button>
              <Button className='AtPosBtn' >
                <i className='icon-textjustify'></i>
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
export default TextTool
