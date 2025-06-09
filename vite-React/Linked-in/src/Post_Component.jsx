const style = {
    width: 300,
    backgroundColor: "white",
    borderRadius: 10,
    borderColor: "gray",
    borderWidth: 1,
    padding: 20,
    margin: 10
};

export function PostComponent({name, subtitle, time, image, description}) {
    return (
        <div style={style}>
            {/* display the name, followerCount, time, image, and description using props */}
            <div style={{ display: "flex" }}>
                <img src={image} style={{ width: 40, height: 40, borderRadius: 40 }} />
                <div style={{ fontSize: 14, marginLeft: 10 }}>
                    <b>{name}</b> 
                    <div>{subtitle}</div>
                    <div>{time}</div>
                </div>
            </div>
            
            <div style={{ fontSize: 14 }}>{description}</div>
        </div>
    );
}
