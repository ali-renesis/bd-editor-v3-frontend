import { useCoreHandler } from "@/components/Canvas/handlers"
import { CSSProperties, useState } from "react"
import emptyColorPlaceholder from '@/assets/images/base-color-picker.png'
import { PhotoshopPicker } from 'react-color'
import { useCanvasContext } from '@/components/Canvas/hooks'
import TextToolbox from "../TextToolbox/TextToolbox"
import LayerPopup from "../Layers/LayersModal"
import AlignItemsModal from "../AlignItems/AlignItemsModal"
import Button from "@/components/common/button/Button"


const ElementToolbox = () => {
    const { activeObject,  } = useCanvasContext()
    const activeObjectType = activeObject.type

    console.log("activeObjectType:-=-=", activeObjectType)
    const { setProperty, LockObjects } = useCoreHandler()

    const [dropdown, setDropdown] = useState({
        displayColorPicker: false,
    })
    const [options, setOptions] = useState({
        color: '#ffffff',
    })

    const handleClick = () => {
        setDropdown({ ...dropdown, displayColorPicker: !dropdown.displayColorPicker })
    }
    const handleClose = () => {
        setDropdown({ ...dropdown, displayColorPicker: false })
    }

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

    const onColorChange = color => {
        setProperty('fill', color.hex)
        setOptions({ ...options, color: color.hex })
    }

    const renderColor = () => {
        return (
            <div style={{ position: 'relative', marginRight: "10px" }}>
                <div style={{ cursor: 'pointer' }} onClick={handleClick}>
                    {options.color === '#ffffff' ? (
                        <img
                            style={{ height: '30px', display: 'flex' }}
                            src={emptyColorPlaceholder}
                            alt="color picker"
                        />
                    ) : (
                        <div style={{ background: options.color }} className="editor-color-holder" />
                    )}
                </div>

                {dropdown.displayColorPicker ? <div style={popover}>
                    <div style={cover} onClick={handleClose} />
                    <PhotoshopPicker color={options.color} onChange={onColorChange} />
                </div> : null}
            </div>
        )
    }

    const renderBox = () => {
        if (activeObjectType === 'textbox' || activeObjectType === 'text') {
            return <>
                {renderColor()}
                <TextToolbox />
            </>
        }
        if (activeObjectType === 'path') {
            return <>
                {renderColor()}
            </>
        }
    }

    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                {renderBox()}
            </div>
            <div className="section-two">
                <LayerPopup />
                <AlignItemsModal />

                <div className="AtMr10" >
                    <Button onClick={() => LockObjects()}>
                        <i className='icon-lock AtTextTools'></i>
                    </Button>
                </div>
                <div className="AtMr10">
                    <OpacityIcon />
                </div>
                <DeleteIcon />
            </div>
        </>
    )
}

function OpacityIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <g fill="currentColor" fillRule="evenodd">
                <path d="M3 2h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zm0 8h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1zm0 8h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1z"></path>
                <path
                    d="M11 2h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zm0 8h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1zm0 8h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1z"
                    opacity=".45"
                ></path>
                <path
                    d="M19 2h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zm0 8h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1zm0 8h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1z"
                    opacity=".15"
                ></path>
                <path
                    d="M7 6h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1zm0 8h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1z"
                    opacity=".7"
                ></path>
                <path
                    d="M15 6h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1zm0 8h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1z"
                    opacity=".3"
                ></path>
            </g>
        </svg>
    )
}

function DeleteIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path
                fill="currentColor"
                d="M8 5a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3h4.25a.75.75 0 1 1 0 1.5H19V18a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V6.5H3.75a.75.75 0 0 1 0-1.5H8zM6.5 6.5V18c0 .83.67 1.5 1.5 1.5h8c.83 0 1.5-.67 1.5-1.5V6.5h-11zm3-1.5h5c0-.83-.67-1.5-1.5-1.5h-2c-.83 0-1.5.67-1.5 1.5zm-.25 4h1.5v8h-1.5V9zm4 0h1.5v8h-1.5V9z"
            ></path>
        </svg>
    )
}

export default ElementToolbox