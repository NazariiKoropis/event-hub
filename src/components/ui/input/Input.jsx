import styles from './Input.module.scss'

export default function Input({
  className,
  type = 'text',
  name,
  label,
  value,
  onChange,
  error,
  ...props
}) {
  return (
    <div className={styles.inputWrapper}>
      <div className={styles.inputContainer}>
        <input
          id={name}
          name={name}
          type={type}
          className={`
            ${styles.input} 
            ${error ? styles['input--error'] : ''} 
            ${className || ''}
          `}
          placeholder=" "
          value={value}
          onChange={onChange}
          {...props}
        />

        {label && (
          <label htmlFor={name} className={styles.label}>
            {label}
          </label>
        )}
      </div>
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  )
}
