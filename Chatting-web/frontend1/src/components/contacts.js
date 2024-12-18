import "../style/contacts.css";

function Contacts(props){
    return(
        <div className='Other_user'>
            <img src={props.img} alt='img'></img>
            <div className='grp_info'>
                <h2>{props.name}</h2>
                <p>{props.des}</p>
            </div>
        </div>
    )
}
export default Contacts;