import { Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Portal } from '@chakra-ui/react'
import { useCoreHandler } from '@/components/Canvas/handlers'
import Button from '@/components/common/button/Button'
const AlignItemsModal = () => {
    const { UpdateLayers, ArrangeAlignments } = useCoreHandler()
    return (
        <div className='AtLayerPosition AtLayerPositionAlign'>
            <Popover >
                <PopoverTrigger>
                    <Button>
                        <i className='icon-aligncenter AttoolIcon'></i>
                    </Button>
                </PopoverTrigger>
                <PopoverContent>
                    <PopoverArrow />
                    <div className='AtPosBtns'>
                        <Button className='AtPosBtn' onClick={() => ArrangeAlignments("left")}>
                            <i className='icon-alignleft'></i>
                        </Button>
                        <Button className='AtPosBtn' onClick={() => ArrangeAlignments("center")}>
                            <i className='icon-aligncenter'></i>
                        </Button>
                        <Button className='AtPosBtn' onClick={() => ArrangeAlignments("right")}>
                            <i className='icon-alignright'></i> 
                        </Button>
                        <Button className='AtPosBtn' onClick={() => ArrangeAlignments("top")}>
                            <i className='icon-justifytop'></i> 
                        </Button>
                        {/* <Button className='AtPosBtn' onClick={() => ArrangeAlignments("middle")}>
                            <i className='icon-justifycenter'></i> 
                        </Button> */}
                        <Button className='AtPosBtn' onClick={() => ArrangeAlignments("bottom")}>
                            <i className='icon-justifyend'></i> 
                        </Button>
                
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default AlignItemsModal