import '../App.css';
import React, { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import PostInputType from './PostInputType';
import nextId from "react-id-generator";

function PostSettingForm() {

    const [inputTypes, setInputTypes] = useState([])

    const [showOptions, setShowOptions] = useState(false)

    const submitHandler = async (e) => {
        console.log(inputTypes);
        e.preventDefault();
    }
    
    const deleteInputType = (index) => {
        if (window.confirm('האם אתה בטוח שאתה רוצה למחוק את סוג הקלט?')) {
            console.log('sds', index)
            setInputTypes(inputTypes.filter((item, i) => i !== index));
        }
    }

    const addInputType = name => {
        if (name === 'input') {
            setInputTypes([...inputTypes, {id: nextId(), label: '', tag: name, length: '' }]);
        } else if (name === 'textarea') {
            setInputTypes([...inputTypes, {id: nextId(), label: '', tag: name, rows: '', cols: '50' }]);
        } else {
            setInputTypes([...inputTypes, {id: nextId(), label: '', tag: name, options: [] }]);
        }
        setShowOptions(!showOptions);
    }

    const reorder = (inputTypes, startIndex, endIndex) =>{
        const result = Array.from(inputTypes);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    }

    const handleDragEnd = (results) => {
        console.log(results);
       setInputTypes(reorder(inputTypes, results.source.index, results.destination.index));
    }

    return (
        <div className='post-settings'>
            <h2 style={{ textAlign: 'center' }}> הגדרות העלאת פוסט</h2>
            <h4 style={{ textAlign: 'center' }}>  :בחר את סוגי הקלט שיופיעו למשתמש בעת יצירת פוסט</h4>

            {/* {values.error ? <h3>{values.error}</h3> : <></>} */}

            <form dir='rtl' onSubmit={e => submitHandler(e)}>
                <div className="react-icon" onClick={() => setShowOptions(!showOptions)}>
                    <AiOutlinePlus color='white' size='50px' />
                </div>
                {showOptions ? <ul className="input-options">
                    <li className="input-option" onClick={() => addInputType('input')}>טקסט קצר</li>
                    <li className="input-option" onClick={() => addInputType('textarea')}>טקסט ארוך</li>
                    <li className="input-option" onClick={() => addInputType('select')}>בחירה מתוך אפשרויות</li>
                </ul> : <></>}

                {/* {inputTypes.map((inputType, index) => <PostInputType inputTypes={inputTypes} setInputTypes={setInputTypes} index={index} deleteInputType={deleteInputType} key={index} />)} */}


                <DragDropContext onDragEnd={handleDragEnd} >
                    <Droppable
                        droppableId="12345678">
                        {(provided) => {
                            return (
                                <div ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    {inputTypes.map((inputType, index) => {
                                        return (
                                            <Draggable
                                                draggableId={inputType.id}
                                                key={inputType.id}
                                                index={index}
                                            >
                                                {(provided) => {
                                                    return (
                                                        <div ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                        >
                                                            <div>
                                                                <PostInputType inputTypes={inputTypes} setInputTypes={setInputTypes} index={index} deleteInputType={deleteInputType} key={inputType.id} />
                                                            </div>
                                                        </div>
                                                    )
                                                }}
                                            </Draggable>
                                        )
                                    })}
                                    {provided.placeholder}
                                </div>
                            )
                        }}
                    </Droppable>
                </DragDropContext>
                {inputTypes.length ? <input type="submit" value="שמור"></input> : <></>}
            </form>
        </div>
    );
}

export default PostSettingForm;

