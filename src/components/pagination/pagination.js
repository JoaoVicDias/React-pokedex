import classes from './pagination.module.css'


const pagination = props =>{

    return(
        <div className={classes.pagination}>
            <button  
            className={classes.pagination__btn}  
            onClick={props.startBtn}>Start</button>
            <button 
            disabled={props.prevDisabled} 
            className={classes.pagination__btn}  
            onClick={props.prevBtn}>Previous</button>
            <button 
            disabled={props.nextDisabled} 
            className={classes.pagination__btn} 
            onClick={props.nextBtn}>Next</button>
        </div>
    )
}


export default pagination