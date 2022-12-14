import { useEffect, useState } from 'react';

const Element = props => {

    var elementAllDetail = []
    var elementSideDetail = []
    const [elementSideDetailState, setElementSideDetailState] = useState(elementSideDetail);
    const [elementCubeDetailState, setElementCubeDetailState] = useState(elementAllDetail);

    useEffect(() => {

        //console.log("props : ", props.details)

        //get all side details with props
        elementAllDetail = props.details
        elementSideDetail = elementAllDetail.sides

        //add new styles
        elementSideDetail.back = {
            ...elementSideDetail.back, 'transform': `rotateX(90deg) translateZ(${(elementAllDetail.yWidth) / 2}px)`, 'width': elementAllDetail.xWidth,
            'height': elementAllDetail.yWidth
        }

        elementSideDetail.top = {
            ...elementSideDetail.top, 'transform': `translateZ(${(elementAllDetail.yWidth) / 2}px)`,
            'height': elementAllDetail.zWidth
        }

        elementSideDetail.bottom = {
            ...elementSideDetail.bottom, 'transform': `translateZ(${-(elementAllDetail.yWidth) / 2}px)`,
            'height': elementAllDetail.zWidth
        }

        elementSideDetail.right = {
            ...elementSideDetail.right, 'transform': `rotateY(90deg) translateZ(${-(elementAllDetail.yWidth / 2) + elementAllDetail.xWidth}px)`, 'width': elementAllDetail.yWidth,
            'height': elementAllDetail.zWidth
        }

        elementSideDetail.left = {
            ...elementSideDetail.left, 'transform': `rotateY(-90deg) translateZ(${(elementAllDetail.yWidth) / 2}px)`, 'width': elementAllDetail.yWidth,
            'height': elementAllDetail.zWidth
        }

        elementSideDetail.front = {
            ...elementSideDetail.front, 'transform': `rotateX(-90deg) translateZ(${(-(elementAllDetail.yWidth) / 2) + elementAllDetail.zWidth}px)`, 'width': elementAllDetail.xWidth,
            'height': elementAllDetail.yWidth
        }

        setElementSideDetailState(elementSideDetail)


        elementAllDetail = { ...elementAllDetail, 'width': `${elementAllDetail.xWidth}px`, 'height': `${elementAllDetail.zWidth}px`, 'transform': `translateZ(${(elementAllDetail.yWidth / 2) + elementAllDetail.bottomSpace}px) rotateZ(${elementAllDetail.rotateZ}deg)  rotateY(${elementAllDetail.rotateX}deg)  rotateX(${elementAllDetail.rotateY}deg)` }
        setElementCubeDetailState(elementAllDetail)

    }, [props]);

    return (
        <div className="cube" style={elementCubeDetailState} >
            {
                Object.entries(props.details.sides).map((x, xIndex) => (
                    <div className={`side ${x[0]}`} style={elementSideDetailState[x[0]]} key={xIndex}></div>
                ))
            }
        </div>
    )
}

export default Element
