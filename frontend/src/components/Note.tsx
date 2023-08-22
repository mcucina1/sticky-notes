import styles from "../styles/Note.module.css"
import { Card } from "react-bootstrap"
import { Note as NoteModel } from "../models/note"
import { formatDate } from "../utils/formatDate"
import {MdDelete, MdEdit} from "react-icons/md"
import { useState } from "react"
import { BsThreeDots } from 'react-icons/bs'
import { AiOutlineItalic, AiOutlineBold, AiOutlineUnderline } from 'react-icons/ai'

interface NoteProps {
    note: NoteModel,
    onNoteClicked: (note: NoteModel) => void,
    onDeleteNoteClicked: (note: NoteModel) => void,
    className?: string
}

const Note = ({note, onNoteClicked,onDeleteNoteClicked,className}: NoteProps) => {
    const [hidden, setHidden] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [selectedColor, setSelectedColor] = useState('bg-[cornsilk]')
    const [textStyle, setTextStyle] = useState('')
    const [openMenu, setOpenMenu] = useState(false)
    const {
        title,
        text,
        createdAt,
        updatedAt
    } = note

    let createdUpdatedText: string
    if (updatedAt > createdAt) {
        createdUpdatedText = "Updated: " + formatDate(updatedAt)
    } else {
        createdUpdatedText = "Created " + formatDate(createdAt)
    }

    const changeColor = (color:string) => {
        setSelectedColor(color)
    }

    const changeTextStyle = (value:string) => {
        if (textStyle.trim() === ''){ 
            setTextStyle('')
        }
        if (textStyle.includes('italic')){
            if (textStyle.includes(value)){
                setTextStyle(textStyle.replace(value, ""))
                return
            }
        }
        if (textStyle.includes('font-bold')){
            if (textStyle.includes(value)){
                setTextStyle(textStyle.replace(value, ""))
                return
            }
        }
        if (textStyle.includes('underline')){
            if (textStyle.includes(value)){
                setTextStyle(textStyle.replace(value, ""))
                return
            }
        }
        setTextStyle(textStyle.concat(" ",value))
    }

    return (
        <Card className={`${className}  ${selectedColor} h-full min-h-0 min-w-0`}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <Card.Body className={`${styles.cardBody}`}>
                <Card.Title className='flex relative'>
                    <div className="flex justify-start w-[calc(100%-6rem)]">
                    {title}
                    </div>
                    <div className="absolute right-0">
                        <MdEdit
                        className="mr-3"
                        onClick={() => onNoteClicked(note)}
                        />
                        <BsThreeDots className="mr-4"
                            onClick={(e) => {
                            e.stopPropagation()
                            setOpenMenu(!openMenu)
                            }}
                        />
                        {openMenu && 
                            <div className="z-10 flex flex-row justify-evenly items-center w-28 h-10 absolute right-2 top-6 
                            rounded-sm bg-white border-solid border-2 border-slate-500">
                                <p className="cursor-pointer w-10 h-9 relative top-2 bg-[cornsilk]"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    changeColor('bg-[cornsilk]')
                                    }
                                }
                                ></p>
                                <p className="cursor-pointer w-10 h-9 relative top-2 bg-[#f4b4b0]"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    changeColor('bg-[#f4b4b0]')
                                    }
                                }
                                ></p>
                                <p className="cursor-pointer w-10 h-9 relative top-2 bg-[#e0ffcd]"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    changeColor('bg-[#e0ffcd]')
                                    }
                                }
                                ></p>
                                <p className="cursor-pointer w-10 h-9 relative top-2 bg-[#bbe4e9]"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    changeColor('bg-[#bbe4e9]')
                                    }
                                }
                                ></p>
                            </div>
                        }
                        <MdDelete className="text-muted"
                            onClick={(e) => {
                            onDeleteNoteClicked(note)
                            e.stopPropagation()
                            }}
                        />
                    </div>
                </Card.Title>
                <div className="w-full h-full flex absolute">
                    <Card.Text className={`${styles.cardText} w-[80%] ${textStyle ? textStyle : ''}`}>
                        {text}
                    </Card.Text>
                    {isHovering &&
                        <div className="fixed right-4 top-12 flex items-end justify-start flex-col w-[calc(100%-80%)]">
                            <AiOutlineItalic className="text-[18px] w-6 h-6 mt-1 p-1 bg-inherit transition-colors duration-300 ease-in-out hover:bg-black hover:bg-opacity-20"
                                onClick={() => changeTextStyle('italic')}
                            ></AiOutlineItalic>
                            <AiOutlineBold className="text-[18px] w-6 h-6 mt-1 p-1 bg-inherit transition-colors duration-300 ease-in-out hover:bg-black hover:bg-opacity-20"
                                onClick={() => changeTextStyle('font-bold')}
                            ></AiOutlineBold>
                            <AiOutlineUnderline className="text-black text-[18px] w-6 h-6 mt-1 p-1 bg-inherit transition-colors duration-300 ease-in-out hover:bg-black hover:bg-opacity-20"
                                onClick={() => changeTextStyle('underline')}
                            ></AiOutlineUnderline>
                        </div>
                    }
                </div>
                   
            </Card.Body>
            <Card.Footer className="text-muted">
                {createdUpdatedText}
            </Card.Footer>
        </Card>
    )
}

export default Note