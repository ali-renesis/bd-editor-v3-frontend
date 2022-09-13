import { Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Portal } from '@chakra-ui/react'
import { useCoreHandler } from '@/components/Canvas/handlers'
import Button from '@/components/common/button/Button'
const LayerPopup = () => {
    const { UpdateLayers } = useCoreHandler()
    return (
        <div className='AtLayerPosition'>
            <Popover >
                <PopoverTrigger>
                    <Button>
                        <i className='icon-layers AttoolIcon'></i>
                    </Button>
                </PopoverTrigger>
                <PopoverContent>
                    <PopoverArrow />
                    <div className='AtPosBtns'>
                        <Button className='AtPosBtn' onClick={() => UpdateLayers("TOP")}>
                            <i className='icon-forward'></i>  Bring to front
                        </Button>
                        <Button className='AtPosBtn' onClick={() => UpdateLayers("BOTTOM")}>
                            <i className='icon-backward'></i> Send to back
                        </Button>
                        <Button className='AtPosBtn' onClick={() => UpdateLayers("SHIFTDOWN")}>
                            <i className='icon-bringfront'></i> Backward
                        </Button>
                        <Button className='AtPosBtn' onClick={() => UpdateLayers("SHIFTUP")}>
                            <i className='icon-bringback'></i> Forward
                        </Button>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default LayerPopup