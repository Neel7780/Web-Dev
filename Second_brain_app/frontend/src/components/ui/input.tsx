
interface inputProps {
    placeholder : string,
    reference? : any
}

export function Input({placeholder, reference} : inputProps){
    return (
        <div className="p-2 rounded-md border m-2">
            <input type="text" ref={reference} placeholder={placeholder} />
        </div>
        
    )
}