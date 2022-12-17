import {useRef, useEffect, useState} from 'react';
import {elementsStyles} from 'data';
import Element from 'components/Element';
import Author from 'components/Author';
import {HexColorPicker} from "react-colorful";

const App = () => {

    const colorPickerRef = useRef(null);
    const [colorPickerVisible, setColorPickerVisible] = useState(false);
    const [colorPickerSelectedSide, setColorPickerSelectedSide] = useState('');

    const [elements, setElements] = useState(elementsStyles);

    const [xAxisSize, setXAxisSize] = useState(0);
    const [yAxisSize, setYAxisSize] = useState(0);
    const [zAxisSize, setZAxisSize] = useState(0);
    const [leftSize, setLeftSize] = useState(0);
    const [topSize, setTopSize] = useState(0);
    const [bottomSize, setBottomSize] = useState(0);
    const [rotateXAxisSize, setRotateXAxisSize] = useState(0);
    const [rotateYAxisSize, setRotateYAxisSize] = useState(0);
    const [rotateZAxisSize, setRotateZAxisSize] = useState(0);
    const [cameraPosition, setCameraPosition] = useState('cam-three three-d');

    const xAxisSizeRef = useRef(null);
    const yAxisSizeRef = useRef(null);
    const zAxisSizeRef = useRef(null);
    const leftSizeRef = useRef(null);
    const topSizeRef = useRef(null);
    const bottomSizeRef = useRef(null);
    const rotateXAxisSizeRef = useRef(null);
    const rotateYAxisSizeRef = useRef(null);
    const rotateZAxisSizeRef = useRef(null);

    const [newElement, setNewElement] = useState([]);

    const [color, setColor] = useState("");

    const sidesColorsInitial = {
        top: {
            background: '#fff'
        },
        left: {
            background: '#fff'
        },
        right: {
            background: '#fff'
        },
        front: {
            background: '#fff'
        },
        back: {
            background: '#fff'
        },
        bottom: {
            background: '#fff'
        }
    }

    const [sidesColors, setSidesColors] = useState(sidesColorsInitial)


    useEffect(() => {
        console.log("renk : ", color)
        addParam()
    }, [color]);

    const addElement = e => {
        e.preventDefault();
        setElements([
            ...elements,
            newElement,
        ])
        setNewElement([])
        setXAxisSize(0)
        setYAxisSize(0)
        setZAxisSize(0)
        setLeftSize(0)
        setTopSize(0)
        setBottomSize(0)
        setRotateXAxisSize(0)
        setRotateYAxisSize(0)
        setRotateZAxisSize(0)
        setSidesColors(sidesColorsInitial)
    }


    const addParam = () => {

        setXAxisSize(xAxisSizeRef.current.value)
        setYAxisSize(yAxisSizeRef.current.value)
        setZAxisSize(zAxisSizeRef.current.value)
        setLeftSize(leftSizeRef.current.value)
        setTopSize(topSizeRef.current.value)
        setBottomSize(bottomSizeRef.current.value)
        setRotateXAxisSize(rotateXAxisSizeRef.current.value)
        setRotateYAxisSize(rotateYAxisSizeRef.current.value)
        setRotateZAxisSize(rotateZAxisSizeRef.current.value)
        setNewElement([])
        if (xAxisSizeRef.current.value > 0 && yAxisSizeRef.current.value > 0 && zAxisSizeRef.current.value > 0) {

            setNewElement({
                sides: sidesColors,
                xWidth: parseInt(xAxisSizeRef.current.value),
                yWidth: parseInt(yAxisSizeRef.current.value),
                zWidth: parseInt(zAxisSizeRef.current.value),
                top: `${
                    parseInt(topSizeRef.current.value)
                }px`,
                left: `${
                    parseInt(leftSizeRef.current.value)
                }px`,
                bottomSpace: parseInt(bottomSizeRef.current.value),
                rotateX: parseInt(rotateXAxisSizeRef.current.value),
                rotateY: parseInt(rotateYAxisSizeRef.current.value),
                rotateZ: parseInt(rotateZAxisSizeRef.current.value)
            })
        }

    }

    const camera = (position) => {
        setCameraPosition(position)
    }

    const openColorPicker = (side) => {
        setColorPickerSelectedSide(side)
        setColorPickerVisible(true)
    }

    const changeSideColor = (e) => {
        let newArr = sidesColors;
        newArr[colorPickerSelectedSide] = {
            'background': e
        };
        setSidesColors(newArr);
        setColor(e)
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (colorPickerRef.current && ! colorPickerRef.current.contains(event.target)) {
                setColorPickerVisible(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return() => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [colorPickerRef]);

    return (
        <div className="App">

            <Author/>

            <div className='camera-positions'>
                <button onClick={
                    () => camera('top')
                }>Top</button>
                <button onClick={
                    () => camera('right')
                }>Right</button>
                <button onClick={
                    () => camera('bottom')
                }>Bottom</button>
                <button onClick={
                    () => camera('left')
                }>Left</button>
                <button onClick={
                    () => camera('cam-one three-d')
                }>Camera 1</button>
                <button onClick={
                    () => camera('cam-two three-d')
                }>Camera 2</button>
                <button onClick={
                    () => camera('cam-three three-d')
                }>Camera 3</button>
            </div>

            <div className={
                `container ${cameraPosition}`
            }>
                <div className="floor floor-texture">

                    {
                    Object.keys(newElement).length > 0 && <Element details={newElement}/>
                }


                    {
                    elements ?. length > 0 && elements.map((e, index) => (

                        <Element details={e}
                            key={index}/>

                    ))
                } </div>
            </div>

            <form onSubmit={addElement}
                className='form'>

                <h3>Sizes</h3>
                <div className="dot-detail-form-element">
                    <label className="form-label">X Axis Size</label>
                    <input type="range" min="0" max="500"
                        ref={xAxisSizeRef}
                        className="form-control"
                        value={xAxisSize}
                        onInput={addParam}
                        onChange={addParam}/>
                    <span>{xAxisSize}px</span>
                </div>
                <div className="dot-detail-form-element">
                    <label className="form-label">Y Axis Size</label>
                    <input type="range" min="0" max="500"
                        ref={yAxisSizeRef}
                        className="form-control"
                        onInput={addParam}
                        value={yAxisSize}
                        onChange={addParam}/>
                    <span>{yAxisSize}px</span>
                </div>
                <div className="dot-detail-form-element">
                    <label className="form-label">Z Axis Size</label>
                    <input type="range" min="0" max="500"
                        ref={zAxisSizeRef}
                        className="form-control"
                        value={zAxisSize}
                        onInput={addParam}
                        onChange={addParam}/>
                    <span>{zAxisSize}px</span>
                </div>
                <h3>Positions</h3>
                <div className="dot-detail-form-element">
                    <label className="form-label">Left Size</label>
                    <input type="range" min="-700" max="700"
                        ref={leftSizeRef}
                        className="form-control"
                        value={leftSize}
                        onInput={addParam}
                        onChange={addParam}/>
                    <span>{leftSize}px</span>
                </div>
                <div className="dot-detail-form-element">
                    <label className="form-label">Top Size</label>
                    <input type="range" min="-700" max="700"
                        ref={topSizeRef}
                        className="form-control"
                        value={topSize}
                        onInput={addParam}
                        onChange={addParam}/>
                    <span>{topSize}px</span>
                </div>
                <div className="dot-detail-form-element">
                    <label className="form-label">Bottom Space Size</label>
                    <input type="range" min="-700" max="700"
                        ref={bottomSizeRef}
                        className="form-control"
                        value={bottomSize}
                        onInput={addParam}
                        onChange={addParam}/>
                    <span>{bottomSize}px</span>
                </div>
                <h3>Transforms</h3>
                <div className="dot-detail-form-element">
                    <label className="form-label">Rotate X Axis Size</label>
                    <input type="range" min="-180" max="180"
                        ref={rotateXAxisSizeRef}
                        className="form-control"
                        value={rotateXAxisSize}
                        onInput={addParam}
                        onChange={addParam}/>
                    <span>{rotateXAxisSize}deg</span>
                </div>
                <div className="dot-detail-form-element">
                    <label className="form-label">Rotate Y Axis Size</label>
                    <input type="range" min="-180" max="180"
                        ref={rotateYAxisSizeRef}
                        className="form-control"
                        value={rotateYAxisSize}
                        onInput={addParam}
                        onChange={addParam}/>
                    <span>{rotateYAxisSize}deg</span>
                </div>
                <div className="dot-detail-form-element">
                    <label className="form-label">Rotate Z Axis Size</label>
                    <input type="range" min="-180" max="180"
                        ref={rotateZAxisSizeRef}
                        className="form-control"
                        value={rotateZAxisSize}
                        onInput={addParam}
                        onChange={addParam}/>
                    <span>{rotateZAxisSize}deg</span>
                </div>
                <h3>Colors</h3>
                <div className="dot-detail-form-element">
                    <div className='color-side-list'>
                        <div className='color-side-list-row'>
                            <div className='color-side-list-col'
                                style={
                                    {
                                        'background': sidesColors['right']['background']
                                    }
                                }
                                onClick={
                                    () => openColorPicker('right')
                            }>
                                <span>Right</span>
                            </div>
                        </div>
                        <div className='color-side-list-row'>
                            <div className='color-side-list-col'
                                style={
                                    {
                                        'background': sidesColors['top']['background']
                                    }
                                }
                                onClick={
                                    () => openColorPicker('top')
                            }>
                                <span>Top</span>
                            </div>
                            <div className='color-side-list-col'
                                style={
                                    {
                                        'background': sidesColors['front']['background']
                                    }
                                }
                                onClick={
                                    () => openColorPicker('front')
                            }>
                                <span>Front</span>
                            </div>
                            <div className='color-side-list-col'
                                style={
                                    {
                                        'background': sidesColors['bottom']['background']
                                    }
                                }
                                onClick={
                                    () => openColorPicker('bottom')
                            }>
                                <span>Bottom</span>
                            </div>
                            <div className='color-side-list-col'
                                style={
                                    {
                                        'background': sidesColors['back']['background']
                                    }
                                }
                                onClick={
                                    () => openColorPicker('back')
                            }>
                                <span>Back</span>
                            </div>
                        </div>
                        <div className='color-side-list-row'>
                            <div className='color-side-list-col'
                                style={
                                    {
                                        'background': sidesColors['left']['background']
                                    }
                                }
                                onClick={
                                    () => openColorPicker('left')
                            }>
                                <span>Left</span>
                            </div>
                        </div>
                        <div className={
                                `color-modal ${
                                    colorPickerVisible && 'open'
                                }`
                            }
                            ref={colorPickerRef}>
                            <HexColorPicker color={color}
                                onChange={
                                    (e) => changeSideColor(e)
                                }/>
                        </div>
                    </div>
                </div>

                <button type="submit" className="save-btn">Add Block</button>

            </form>


        </div>
    );
}

export default App;
