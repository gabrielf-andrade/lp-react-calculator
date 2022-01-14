import styles from './Button.module.css'

const Button = props => {
    return <button className={`
        ${styles.button} 
        ${props.operation ? styles.operation : ''} 
        ${props.double ? styles.double : ''} 
        ${props.triple ? styles.triple : ''} 
        `}
        onClick={event => props.click && props.click(props.label)}>
        {props.label}
    </button>
}

export default Button; 