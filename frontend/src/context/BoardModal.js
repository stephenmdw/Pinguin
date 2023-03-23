import React, { useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './BoardModal.css';

const BoardModalContext = React.createContext();

export function BoardModalProvider({ children }) {
    const modalRef = useRef();
    const [value, setValue] = useState();

    useEffect(() => {
        setValue(modalRef.current);
    }, [])

    return (
    <>
        <BoardModalContext.Provider value={value}>
            {children}
        </BoardModalContext.Provider>
        <div ref={modalRef} />
    </>
    );
}

export function BoardModal({ onClose, children, buttonPosition }) {
    const modalNode = useContext(BoardModalContext);
    if (!modalNode) return null;
    let toppos = buttonPosition[1]
    console.log('bpleft', buttonPosition[0])
    console.log('bptop', buttonPosition[1])
    let leftpos = buttonPosition[0] - 400
    // console.log(leftpos)
    return ReactDOM.createPortal(
        <div id="board-modal" style={{
            position: "absolute",
            top: toppos,
            left: leftpos
            
        }}>
        <div id="board-modal-background" onClick={onClose} />
        <div id="board-modal-content">
            {children}
        </div>
        </div>,
        modalNode
    );
}

