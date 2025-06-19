import { useRef, useState } from "react"

export function OtpBox({number = 6}){
    const refer = useRef(Array(number).fill(0))
    const [otpValues, setOtpValues] = useState(Array(number).fill(""))
    const isAllFilled = otpValues.every((val) => val !== "");


    return (
        <div>
            <div className="flex justify-center ">
                {Array(number).fill(1).map((x,index)=> (<Box reference={e => {refer.current[index] = e}} onDone={
                    () => {
                        if(index < number - 1){
                            refer.current[index + 1].focus()
                        }
                    }
                } key={index} goBack={() => {
                    if(index > 0){
                        refer.current[index - 1].focus()
                    }
                } }
                onChange={(val) => {
                    const newOtpValues = [...otpValues];
                    newOtpValues[index] = val;
                    setOtpValues(newOtpValues);
                }}
                />) )}
            </div>

                {/* Sample Continue Button */}
            <button
                className={`mt-4 px-4 py-2 rounded ${
                isAllFilled ? "bg-green-500" : "bg-gray-500"
                } text-white`}
                disabled={!isAllFilled}
            >
                Continue
            </button>
        </div>
          
        
    )
}

function Box({ reference, onDone, goBack, onChange }){
    const [inputBoxVal, setInputBoxVal] = useState('')
    return (
        <div className="m-2">
            <input value={inputBoxVal} type="text" ref={reference} onChange={
                (e) => {
                    const val = e.target.value
                    console.log(val)
                    if(val>=0 && val<=9){
                        setInputBoxVal(val)
                        onChange(val)
                        onDone()
                    } else {
                        reference.current.value = ''
                        setInputBoxVal('')
                        onChange('')
                    }
                }
            }
            onKeyUp={e => {
                if(e.key === 'Backspace'){
                    if(inputBoxVal === '' && goBack){
                        goBack()
                        setInputBoxVal("")
                    }
                    
                }
            }} 
            className="w-12 h-13 text-white text-center bg-violet-500 rounded-xl outline-none"/>
        </div>
    )
}